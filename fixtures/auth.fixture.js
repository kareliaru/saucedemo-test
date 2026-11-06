import { test as base, expect } from '@playwright/test';
import { env } from '../config/env.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

// test.extend() создаёт свою версию test. Обычный test из @playwright/test
// остаётся без авторизации: его используют проверки входа и гостевого доступа.
export const test = base.extend({
  // scope: 'worker' — вход выполняется один раз на рабочий процесс,
  // После падения Playwright может пересоздать процесс: тогда вход повторится.
  workerStorageState: [async ({ browser, playwright }, use, workerInfo) => {
    // Worker-фикстура выполняется раньше стандартной настройки test-контекста.
    // Поэтому явно задаём атрибут для getByTestId(), который использует LoginPage.
    // Иначе локаторы будут искать data-testid вместо проектного data-test.
    playwright.selectors.setTestIdAttribute(workerInfo.project.use.testIdAttribute ?? 'data-testid');

    // newContext() создаёт отдельную чистую сессию только для получения авторизации.
    // Пустой storageState исключает случайное использование сохранённой сессии.
    const context = await browser.newContext({
      baseURL: env.BASE_URL,
      storageState: { cookies: [], origins: [] },
    });

    let state;
    try {
      // newPage() открывает вкладку в подготовленной сессии.
      const page = await context.newPage();
      const loginPage = new LoginPage(page);
      // Page Object привязан к служебной странице авторизации.
      const inventoryPage = new InventoryPage(page);
      await loginPage.goto();
      await loginPage.login();

      // Сохраняем состояние только после успешного перехода в каталог.
      // Иначе можно сохранить пустую сессию и получить ошибки во всех тестах.
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.inventoryItems).toHaveCount(6);
      await expect(inventoryPage.cartBadge).toHaveCount(0);

      // storageState() получает cookies и localStorage.
      // Снимок сделан ДО добавления товаров: все тесты начнут с пустой корзиной.
      // Объект хранится только в памяти процесса, файл с сессией не создаётся.
      state = await context.storageState();
    } finally {
      // close() закрывает служебную сессию даже при ошибке авторизации.
      await context.close();
    }

    // use(state) передаёт снимок зависимым фикстурам на время работы процесса.
    await use(state);
  }, { scope: 'worker' }],

  // Подменяем встроенную настройку storageState для нашей версии test.
  // Playwright создаёт НОВЫЙ BrowserContext для каждого теста и загружает
  // в него копию снимка. Корзина и изменения одного теста не попадут в другой.
  storageState: async ({ workerStorageState }, use) => {
    await use(workerStorageState);
  },

  // Расширяем стандартную page: здесь она уже создана с авторизацией.
  // goto() открывает каталог, domcontentloaded ждёт готовности документа,
  // а expect() — появления товаров. В тесте больше не нужны goto()/login().
  page: async ({ page }, use) => {
    // Это другая page: создаём для неё отдельный экземпляр Page Object.
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
    // use(page) запускает тело теста. После его завершения встроенные фикстуры
    // Playwright сами закроют вкладку и её изолированный контекст.
    await use(page);
  },
});

export { expect };

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test('Сортировка цен', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login();
  // вызываем метод для получения массива цен
  await inventoryPage.sortByLowestPrice();
  // создаем переменную, присваиваем ей результат форматирования массива цен
  const prices = await inventoryPage.getPrices();
  // сортируем полученный массив
  const sortedPrices = [...prices].sort((a, b) => a - b);
  // сравниваем полученный и отсортированный массивы 
  expect(prices).toEqual(sortedPrices);
  // скриншот (опционально)
  // await page.locator('body').screenshot({path: 'site_1.png'})
});

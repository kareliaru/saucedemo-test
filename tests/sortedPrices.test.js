// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js'


test('Сортировка цен', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // авторизация
    await loginPage.goto();
    await loginPage.login();
    // выбор сортировки по возрастанию стоимости
    await page.locator('.product_sort_container').selectOption('lohi');
    // получение массива цен со страницы
    const priceElements = await page.locator('.inventory_item_price').allTextContents();
    
    //преобразуем строки в числа, убираем значок $
    const prices = priceElements.map(price => parseFloat(price.replace('$', '')));
    
    // копируем массив, сортируем по возрастанию
    const sortedPrices = [...prices].sort((a, b) => a - b);

    // сравниваем два массива (полученный со страницы и отсортированный) должны быть одинаковы
    expect(prices).toEqual(sortedPrices);

    // скриншот (опционально)
    //await page.locator('body').screenshot({path: 'site.png'})
});
  


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';


test('Оформление заказа без указания почтового индекса', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // авторизация
    await loginPage.goto();
    await loginPage.login();
    // добавление товаров в корзину (2 шт)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    //переход в корзину
    await page.locator('//a[@class="shopping_cart_link"]').click();
    //переход к оформлению заказа 
    await page.locator('//button[@id="checkout"]').click();
    // заполнение формы
    await page.locator('[data-test="firstName"]').fill(process.env.FIRST_NAME);
    await page.locator('[data-test="lastName"]').fill(process.env.LAST_NAME);
    //отправка формы
    await page.locator('[data-test="continue"]').click();

    // Проверка появления ошибки
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: Postal Code is required');
    //скриншот (опционально)
    await page.locator('body').screenshot({path: 'site_2.png'})
});

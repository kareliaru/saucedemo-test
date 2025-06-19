import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';


test('Успешное оформление заказа', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // авторизация
    await loginPage.goto();
    await loginPage.login();

    // добавление товаров в корзину (рюкзак и худи)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    //переход в корзину
    await page.locator('//a[@class="shopping_cart_link"]').click();

    //переход к оформлению заказа 
    await page.locator('//button[@id="checkout"]').click();

    // заполнение формы
    await page.locator('[data-test="firstName"]').fill(process.env.FIRST_NAME);
    await page.locator('[data-test="lastName"]').fill(process.env.LAST_NAME);
    await page.locator('[data-test="postalCode"]').fill(process.env.ZIP_CODE);

    //отправка формы
    await page.locator('[data-test="continue"]').click();

    //завершение оформления заказа
    await page.locator('[data-test="finish"]').click();
  

    // проверяем появление заголовка "Успешный заказ"
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    //скриншот (опционально)
    //await page.locator('body').screenshot({path: 'site_3.png'})
});

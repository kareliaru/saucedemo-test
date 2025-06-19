import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';


test('Оформление заказа с пустой корзиной', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // авторизация
    await loginPage.goto();
    await loginPage.login();

    //переход в корзину без добавления товаров
    await page.locator('//a[@class="shopping_cart_link"]').click();

    //переход к оформлению заказа 
    await page.locator('//button[@id="checkout"]').click();

    // Проверка появления ошибки "Добавьте товары в корзину!"
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: Add items to cart!');
    //скриншот (опционально)
    await page.locator('body').screenshot({path: 'site_3.png'})
});
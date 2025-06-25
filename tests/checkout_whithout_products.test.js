import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { CartPage } from '../pages/CartPage.js';

test('Оформление заказа с пустой корзиной', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login();

  // Переход в корзину (без добавления товаров)
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Переход к оформлению заказа
  await cartPage.toCheckout();

  // Проверка ошибки
  await cartPage.expectError();

 // скриншот (опционально)
 // await page.locator('body').screenshot({path: 'site_4.png'})
});


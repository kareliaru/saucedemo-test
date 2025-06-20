import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { CartPage } from '../pages/CartPage.js';

test('Оформление заказа с пустой корзиной', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login();

  // Переход в корзину (без добавления товаров)
  await page.locator('.shopping_cart_link').click();

  // Переход к оформлению заказа
  await cartPage.proceedToCheckout();

  // Проверка ошибки
  await cartPage.expectErrorVisibleWithText('Error: Add items to cart!');

  // Скриншот (опционально)
 // await page.screenshot({ path: 'empty_cart_error.png' });
});


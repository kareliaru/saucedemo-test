import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('Оформление заказа без указания почтового индекса', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login();

  await inventoryPage.addItemsToCart();
  await inventoryPage.goToCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.fillFormWithoutZip();
  await checkoutPage.continue();

  await checkoutPage.expectErrorVisibleWithText('Error: Postal Code is required');
  // скриншот (опционально)
  // await page.locator('body').screenshot({path: 'site_2.png'})
});

import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ConfirmationPage } from '../pages/ConfirmationPage.js';

test('Успешное оформление заказа', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const confirmationPage = new ConfirmationPage(page);

  await loginPage.goto();
  await loginPage.login();

  await inventoryPage.addItemsToCart();
  await inventoryPage.goToCart();

  await cartPage.proceedToCheckout();

  await checkoutPage.fillForm(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.ZIP_CODE);
  await checkoutPage.continue();
  await checkoutPage.finishOrder();

  await confirmationPage.checkSuccess();
});

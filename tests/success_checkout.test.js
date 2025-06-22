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
  // добавление товаров в корзину
  await inventoryPage.addItemsToCart();
  
  // переход в корзину
  await inventoryPage.goToCart();

  // к оформлению
  await cartPage.toCheckout();

  // заполняем форму заказа
  await checkoutPage.fillForm();
  await checkoutPage.continue();
  await checkoutPage.finishOrder();

  // подтверждение успешного заказа
  await confirmationPage.checkSuccess();
  // скриншот (опционально)
  // await page.locator('body').screenshot({path: 'site.png'})
});

import { test as guestTest } from '@playwright/test';
import { test, expect } from '../fixtures/auth.fixture.js';
import { env } from '../config/env.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ConfirmationPage } from '../pages/ConfirmationPage.js';

test('Успешное оформление заказа', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const confirmationPage = new ConfirmationPage(page);

  await inventoryPage.addItemsToCart();

  await inventoryPage.goToCart();
  const items = [
  { name: 'Sauce Labs Backpack', price: 29.99, quantity: 1 },
  { name: 'Sauce Labs Fleece Jacket', price: 49.99, quantity: 1 },
  ];
  await cartPage.expectItems(items);

  await cartPage.toCheckout();

  await checkoutPage.fillForm();
  await checkoutPage.continue();
  await checkoutPage.expectOverview(items);
  await checkoutPage.finishOrder();

  await confirmationPage.checkSuccess();
});


// Гостевой сценарий использует стандартный test: сессия остаётся чистой.
guestTest('Оформление заказа без авторизации', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/checkout-step-one.html');

  await expect(page).toHaveURL(new URL('/', env.BASE_URL).href);

  await loginPage.expectError("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
});

test('Оформление заказа без указания почтового индекса', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.addItemsToCart();
  await inventoryPage.goToCart();

  await cartPage.toCheckout();
  await checkoutPage.fillForm(env.FIRST_NAME, env.LAST_NAME, '');
  await checkoutPage.continue();

  await checkoutPage.expectError('Error: Postal Code is required');
});

test('Оформление заказа с пустой корзиной', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await expect(inventoryPage.cartBadge).toHaveCount(0);
  await inventoryPage.goToCart();

  await cartPage.expectEmpty();
  await cartPage.toCheckout();

  test.fail(true, 'EMPTY-CART-001: see BUGS.md; checkout must stay on the cart page.');
  await expect(page).toHaveURL(/\/cart\.html$/);
});

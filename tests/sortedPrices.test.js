import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test('Сортировка цен', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login();

  await inventoryPage.sortByLowestPrice();
  const prices = await inventoryPage.getPrices();

  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
  // скриншот (опционально)
  // await page.locator('body').screenshot({path: 'site_1.png'})
});

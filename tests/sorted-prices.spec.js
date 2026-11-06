import { test, expect } from '../fixtures/auth.fixture.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test('Сортировка цен по возрастанию', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await expect(inventoryPage.inventoryItems).toHaveCount(6);
  await expect(inventoryPage.priceList).toHaveCount(6);
  const originalPrices = await inventoryPage.getPrices();
  expect(originalPrices.every(Number.isFinite)).toBe(true);
  const expectedPrices = [...originalPrices].sort((a, b) => a - b);
  await inventoryPage.sortByLowestPrice();
  await expect(inventoryPage.sortingPrices).toHaveValue('lohi');
  await expect.poll(() => inventoryPage.getPrices()).toEqual(expectedPrices);
});

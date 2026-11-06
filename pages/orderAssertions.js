import { expect } from '@playwright/test';

export async function expectOrderItems(rows, items) {
  await expect(rows).toHaveCount(items.length);
  for (const item of items) {
    const row = rows.filter({ hasText: item.name });
    await expect(row).toHaveCount(1);
    await expect(row.locator('.inventory_item_name')).toHaveText(item.name);
    await expect(row.locator('.inventory_item_price')).toHaveText(`$${item.price.toFixed(2)}`);
    await expect(row.locator('.cart_quantity')).toHaveText(String(item.quantity));
  }
}

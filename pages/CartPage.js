import { expect } from '@playwright/test';
import { expectOrderItems } from './orderAssertions.js';

export class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId('checkout');
    this.items = page.locator('.cart_item');
  }

  async toCheckout() {
    await this.checkoutBtn.click();
  }

  async expectItems(items) {
    await expectOrderItems(this.items, items);
  }

  async expectEmpty() {
    await expect(this.items).toHaveCount(0);
    await expect(this.checkoutBtn).toBeVisible();
  }
}

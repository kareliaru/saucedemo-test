import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout');
    this.errorMessage = page.locator('[data-test="error"]');  // Локатор ошибки
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }

  async expectErrorVisibleWithText(expectedText) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}

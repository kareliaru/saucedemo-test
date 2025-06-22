import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('#checkout');
    this.errorMessage = page.locator('[data-test="error"]');  // Локатор ошибки
  }
   // к оформлению заказа
  async toCheckout() {
    await this.checkoutBtn.click();
  }
  // ошибка, которая должна появляться при заказе без товара
  async expectError(expectedText) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}

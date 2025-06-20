//  подтверждение заказа
import { expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('[data-test="complete-header"]');
  }

  async checkSuccess() {
    await expect(this.header).toHaveText('Thank you for your order!');
  }
}

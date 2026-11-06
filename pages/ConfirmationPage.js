import { expect } from '@playwright/test';

export class ConfirmationPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.header = page.getByTestId('complete-header');
  }

  async checkSuccess() {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.header).toHaveText('Thank you for your order!');
  }
}

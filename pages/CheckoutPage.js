import { expect } from '@playwright/test';
import { env } from '../config/env.js';
import { expectOrderItems } from './orderAssertions.js';

export class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueBtn = page.getByTestId('continue');
    this.finishBtn = page.getByTestId('finish');
    this.errorMessage = page.getByTestId('error');
  }

  async fillForm(firstName = env.FIRST_NAME, lastName = env.LAST_NAME, zip = env.ZIP_CODE) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async expectError(expectedText) {
    await expect(this.errorMessage).toHaveText(expectedText);
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
  }

  async expectOverview(items) {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expectOrderItems(this.page.locator('.cart_item'), items);
    const subtotal = items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
    // SauceDemo sales tax: 8%, rounded to cents.
    const tax = Math.round(subtotal * 0.08);
    await expect(this.page.locator('.summary_subtotal_label')).toHaveText(`Item total: $${(subtotal / 100).toFixed(2)}`);
    await expect(this.page.locator('.summary_tax_label')).toHaveText(`Tax: $${(tax / 100).toFixed(2)}`);
    await expect(this.page.locator('.summary_total_label')).toHaveText(`Total: $${((subtotal + tax) / 100).toFixed(2)}`);
  }
}

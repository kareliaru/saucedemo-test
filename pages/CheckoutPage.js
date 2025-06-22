// // класс оформления заказа
import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }
  // полное заполнение формы
  async fillForm(firstName = process.env.FIRST_NAME, lastName = process.env.LAST_NAME, zip = process.env.ZIP_CODE) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(zip);
  }

  // заполнение формы без индекса
  async fillFormWithoutZip(firstName = process.env.FIRST_NAME, lastName = process.env.LAST_NAME) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    
  }
  // отправка заказа
  async continue() {
    await this.continueBtn.click();
  }
   // завершение покупки
  async finishOrder() {
    await this.finishBtn.click();
  }

 // получение текста ошибки
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

 // проверка ошибки
  async expectError(expectedText) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}

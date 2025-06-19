// pages/LoginPage.js
import { expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

    async goto() {
    await this.page.goto(process.env.BASE_URL);
    }

  async login(username = process.env.USER_NAME, password = process.env.PASSWORD) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
/*
для негативных тестов авторизации
 */
//   async expectError(message) {
//     await expect(this.errorMessage).toBeVisible();
//     await expect(this.errorMessage).toHaveText(message);
//   }
}

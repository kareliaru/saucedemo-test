import { expect } from '@playwright/test';
import { env } from '../config/env.js';

export class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username = env.USER_NAME, password = env.PASSWORD) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectError(message) {
    await expect(this.errorMessage).toHaveText(message);
    await expect(this.page).toHaveURL(new URL('/', env.BASE_URL).href);
    await expect(this.loginButton).toBeVisible();
  }
}

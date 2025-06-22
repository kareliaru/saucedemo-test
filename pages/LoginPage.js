 // класс авторизации

import { expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]'); 
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }
 
  async login(username = process.env.USER_NAME, password = process.env.PASSWORD) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Метод проверки ошибки при редиректе или ошибках авторизации
  async expectRedirectError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in."
    );
  }
  // логин заблокированным юзером
  async blockedUserLogin (blocked_username = process.env.BLOCKED_USER_NAME, password = process.env.PASSWORD) {
    await this.usernameInput.fill(blocked_username);
    await this.passwordInput.fill(password);
    await this.loginButton.click()
  }
  // логин с не верным пароль
  async incorrectPasswordLogin (username = process.env.USER_NAME, password = process.env.WRONG_PASSWORD) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click()
  }
  // авторизация без указания юзернейм
  async whithOutUserNameLogin (_ ,password = process.env.PASSWORD ) {
    await this.passwordInput.fill(password);
    await this.loginButton.click()
  }

  // проверка ошибки при не верном  логин или пароль
  async incorrectPasswordError () {
       await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }
  
  //проверка ошибки авторизации заблокированного юзера
  async expectBlockedUserError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  }
  //проверка ошибки при отсутствия имени пользователя
  async whithOutUserNameError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(
      "Epic sadface: Username is required"
    );
  }
}

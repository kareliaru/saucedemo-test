import { env } from '../config/env.js';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('Логин заблокированного пользователя', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(env.BLOCKED_USER_NAME);
  await loginPage.expectError('Epic sadface: Sorry, this user has been locked out.');
});

test('Логин с не верным паролем', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(env.USER_NAME, env.WRONG_PASSWORD);
  await loginPage.expectError('Epic sadface: Username and password do not match any user in this service');
});

test('Логин без указания имени пользователя', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('');
  await loginPage.expectError('Epic sadface: Username is required');
});
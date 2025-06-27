import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { LoginPage } from '../pages/LoginPage';

test('Оформлени заказа без авторизации', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // CHECKOUT_URL - адрес оформления заказа
  await page.goto(process.env.CHECKOUT_URL);

  // Должен быть выполнен редирект на страницу логин
  await expect(page).toHaveURL(process.env.BASE_URL);

  // Проверяем сообщение об ошибке
  await loginPage.expectRedirectError()
 
  // скриншот (опционально)
  // await page.locator('body').screenshot({path: 'site_3.png'})
});


import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Оформлени заказа без авторизации', async ({ page }) => {
  // CHECKOUT_URL - адрес оформления заказа
  await page.goto(process.env.CHECKOUT_URL);

  // Должен быть выполнен редирект на страницу логин
  await expect(page).toHaveURL(process.env.BASE_URL);

  // Проверяем сообщение об ошибке
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
  
  // скриншот (опционально)
  // await page.locator('body').screenshot({path: 'site_3.png'})
});


import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test ('Логин заблокированного пользователя', async ({ page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    // ввод данных
    await loginPage.blockedUserLogin()
    // проверка ошибки
    await loginPage.expectBlockedUserError()
   //скриншот (опционально)
   // await page.locator('body').screenshot({path: 'site_8.png'})
})

 
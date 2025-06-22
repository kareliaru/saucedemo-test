import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test ('Логин с не верным паролем', async({page}) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto();
    // ввод данных
    await loginPage.incorrectPasswordLogin();
    // проверка ошибки
    await loginPage.incorrectPasswordError();
    //скриншот (опционально)
    //await page.locator('body').screenshot({path: 'site_1.png'})
})
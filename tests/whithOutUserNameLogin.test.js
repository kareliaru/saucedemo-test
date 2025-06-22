import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { log } from 'console';


test ('Логин без указания имени пользователя', async({page}) => {
    const loginPage = new LoginPage(page);

   await loginPage.goto();
   // ввод данных
   await loginPage.whithOutUserNameLogin();
    // проверка ошибки
   await loginPage.whithOutUserNameError();
   //скриншот (опционально)
    //await page.locator('body').screenshot({path: 'site_2.png'})
    
});

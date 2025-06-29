// // playwright.config.js
// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
//   reporter: "html",
//   use: {
//     headless: true,
//     baseURL: 'https://www.saucedemo.com',
//     screenshot: 'only-on-failure',    
//   },
// });

// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Для __dirname в ESM:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const BROWSER = process.env.BROWSER || 'all';

const projects = [];

if (BROWSER === 'chromium' || BROWSER === 'all') {
  projects.push({
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  });
}

if (BROWSER === 'firefox' || BROWSER === 'all') {
  projects.push({
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  });
}

if (BROWSER === 'webkit' || BROWSER === 'all') {
  projects.push({
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  });
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  //reporter: 'html',
  // генерация отчёта для Allure и прогресс в терминале
  reporter: [
  ['list'],              
  ['allure-playwright']   
],


  
  projects,

  use: {
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'only-on-failure',
  },
});

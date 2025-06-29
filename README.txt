 saucedemo-test

Автоматизированные end-to-end тесты для сайта https://www.saucedemo.com, написанные с использованием Playwright (https://playwright.dev/).  
Проект построен по паттерну "Page Object", с поддержкой запуска в нескольких браузерах: Chrome, Firefox и WebKit.

---
 Установка

1. Клонируй репозиторий:

git clone https://github.com/kareliaru/saucedemo-test.git

cd saucedemo-test

2. Зависимости:

npm install

3. Установи браузеры Playwright (если не установлены)

npx playwright install


4. Необходим .env (разместить в корне проекта)

USER_NAME=standard_user
PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com
CHECKOUT_URL=https://www.saucedemo.com/checkout-step-one.html 
FIRST_NAME=John
LAST_NAME=Snow
ZIP_CODE=123456
BLOCKED_USER_NAME=locked_out_user
WRONG_PASSWORD=password

5. Запуск тестов:

По умолчанию запускаются в трех браузерах (Хром, Файрфокс и Вебкит)

npm playwright test


Запуск в отдельных браузерах:

npm playwright test --project=chromium  //отдельно Chrome
npm playwright test --project=firefox   //отдельно Firefox
npm playwright test --project=webkit	// отдельно Webkit

Запуск отдного теста в трех браузерах: npm playwright test tests/<название теста>

Запуск одного теста в одном браузере: npm playwright test tests/<название теста> -- --project=<название браузера>


6. Для генерации и вывода отчёта в Allure:

npm run generate:allure



7. Тест оформления заказа с пустой корзиной фейлится, так как ошибка не обработана и не реализована, в связи с чем, даже без добавления товаров в корзину, оформление заказа не блокируется, что является багом.
После фикса необходимо доработать тест- добавить обработку ошибки для корректного прохождения теста.



8.  CI: автоматический запуск тестов через GitHub Actions

При каждом push в файл `trigger.txt` в ветке `main` автоматически запускается CI-пайплайн с помощью [GitHub Actions](https://docs.github.com/actions).  
Этот пайплайн:

- устанавливает зависимости и браузеры,
- кэширует их для ускорения следующих запусков,
- запускает все Playwright-тесты,
- сохраняет HTML-отчёт с результатами (скачиваемый в разделе **Actions > Artifacts** на GitHub).

Это позволяет проверять стабильность тестов без запуска локально.  
Файл `trigger.txt` можно использовать как триггер: изменяй и пушь его, чтобы инициировать проверку.

Пример использования:
```bash
echo "Запуск тестов" >> trigger.txt
git add trigger.txt
git commit -m "CI: запуск тестов"
git push origin main

export class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.backpack = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.jacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
    this.cartLink = page.getByTestId('shopping-cart-link');
    // Общие локаторы каталога используются и в тестах, и в фикстуре.
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortingPrices = page.locator('.product_sort_container');
    this.priceList = page.locator('.inventory_item_price');
  }

  // Открывает каталог. Наличие авторизации проверяет вызывающий код.
  async goto() {
    await this.page.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
  }

  async addItemsToCart() {
    await this.backpack.click();
    await this.jacket.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortByLowestPrice() {
    await this.sortingPrices.selectOption('lohi');
  }

  async getPrices() {
    return (await this.priceList.allTextContents()).map(price => Number(price.replace('$', '').trim()));
  }
}

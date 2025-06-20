/* страница товаров /
 добавление товаров в корзину*/
 
export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.backpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.jacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
    this.priceList = page.locator('.inventory_item_price');
  }

  async addItemsToCart() {
    await this.backpack.click();
    await this.jacket.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortByLowestPrice() {
    await this.sortDropdown.selectOption('lohi');
  }

  async getPrices() {
    const priceTexts = await this.priceList.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }
}


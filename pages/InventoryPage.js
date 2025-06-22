/* страница товаров /
 добавление товаров в корзину*/
 
export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.backpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.jacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortingPrises = page.locator('.product_sort_container');
    this.priceList = page.locator('.inventory_item_price');
  }

  async addItemsToCart() {
    await this.backpack.click();
    await this.jacket.click();
  }
 // переход в корзину
  async goToCart() {
    await this.cartLink.click();
  }
    // сортируем по возрастанию цен через селект
  async sortByLowestPrice() {
    await this.sortingPrises.selectOption('lohi');
  }
    // получаем массив цен . 
  async getPrices() {
    const priceTexts = await this.priceList.allTextContents();
    // убираем знак $ и преобразуем строки в числа
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }
}


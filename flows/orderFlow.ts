import { Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { BaseFlow } from './baseFlow';
import { ProductPage } from '../pages/productPage';
import { ShopPage } from '../pages/shopPage';
import { Basket } from '../data-types/basket';

export class OrderFlow extends BaseFlow {
  homePage: HomePage;
  productPage: ProductPage;
  readonly shopPage: ShopPage;

  constructor(protected page: Page) {
    super(page);
    this.homePage = new HomePage(page);
    this.productPage = new ProductPage(page);

    this.shopPage = new ShopPage(page);
  }

  async addProductToBasket(product: string, basket: Basket): Promise<void> {
    await this.productPage.addItemToBasket(product, basket);
  }

  async openProductDetails(item: string): Promise<void> {
    await this.shopPage.openProductDetails(item);
  }

  async checkBasket(basket: Basket): Promise<void> {
    await this.productPage.basketComponent.checkBasketContent(basket);
  }

  async removeItemInBasket(item: Item, basket: Basket): Promise<void> {
    await this.productPage.basketComponent.removeItem(item, basket);
  }
}

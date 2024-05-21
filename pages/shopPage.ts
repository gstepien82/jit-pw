import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ShopPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }

  locators = {
    product: {
      categoryFilter: this.page.locator('.aem-categoryFilter__base'), // potentially categories and their functions as a separate component
      buyNow: (name: string) =>
        this.page.locator(`[data-sku="${name}"] .aem-button__link`),
      image: (name: string) => this.page.locator(`[data-sku="${name}"]`),
      //others...
    },
  };

  async openProductDetails(name: string): Promise<void> {
    await this.locators.product.image(name).hover();
    await this.locators.product.buyNow(name).click();
  }
}

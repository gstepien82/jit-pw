import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { waitUtils } from '../utils';
import { Item, Price } from '../data-types';

export class ProductPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }

  locators = {
    checks: {
      currentBreadcrumb: this.page.locator('.aem-breadcrumb__current'),
      finalPrice: this.page.locator('[data-testid="finalPrice"]'),
    },
    buttons: {
      addToCard: this.page.locator('[data-testid="pdpAddToProduct"]'),
    },
    //filters and others
  };

  async checkSelectedItem(name: string): Promise<void> {
    await waitUtils.waitForUrlContains(this.page, name); //more detailed checks should be added
  }

  async getFinalPrice(): Promise<Price> {
    const priceText = await this.locators.checks.finalPrice.innerText();
    return { val: +priceText.slice(1), ccy: priceText.slice(0, 1) };
  }

  async addItemToBasket(itemName: string, basket: any): Promise<void> {
    await this.locators.buttons.addToCard.click();
    const finalPrice = await this.getFinalPrice();
    const newItem: Item = {
      price: finalPrice.val,
      name: itemName,
      quantity: 1,
    };
    basket.addItem(newItem);
    basket.setCcy(finalPrice.ccy);
  }
}

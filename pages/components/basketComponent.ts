import { expect, Page } from '@playwright/test';
import { Basket } from '../../data-types/basket';

export class BasketComponent {
  constructor(private page: Page) {}

  locators = {
    checks: {
      opened: this.page.locator('[data-testid="cart"] .mini-cart--open'),
      itemsCount: this.page.locator('.mini-cart__header-count'),
      totalPrice: this.page.locator('[data-testid="miniCartSubtotal"]'),
    },

    buttons: {
      openCart: this.page.locator('[data-testid="cartIcon"]'),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      removeItem: (item: string) =>
        this.page.locator('[data-testid="cartRemoveButton"]'), //should be by product, but not today
      //others...
    },
  };

  async openIfClosed(): Promise<void> {
    if (!(await this.locators.checks.opened.isVisible()))
      await this.locators.buttons.openCart.click();
    {
      await this.checkIfOpened(true);
    }
  }

  async checkIfOpened(expected: boolean): Promise<void> {
    await expect(this.locators.checks.opened).toBeVisible({
      visible: expected,
    });
  }

  async removeItem(item: Item, basket: Basket): Promise<void> {
    await this.locators.buttons.removeItem(item.name).click();
    basket.removeItem(item);
  }

  async checkBasketContent(basket: Basket): Promise<void> {
    await this.openIfClosed();
    if (basket.isNotEmpty()) {
      await this.checkNonEmptyBasketContent(basket);
    }
  }

  async checkNonEmptyBasketContent(
    expectedBasketContent: Basket
  ): Promise<void> {
    await expect(this.locators.checks.itemsCount).toContainText(
      `${expectedBasketContent.items.length} Item`
    );
    await expect(this.locators.checks.totalPrice).toContainText(
      `${expectedBasketContent.ccy}${expectedBasketContent.totalSum.toFixed(2)}`
    );
  }

  async checkEmptyBasketContent(): Promise<void> {
    await expect(this.locators.checks.itemsCount).toContainText(`0 Items`);
    await expect(this.locators.checks.totalPrice).toBeVisible({
      visible: false,
    });
  }
}

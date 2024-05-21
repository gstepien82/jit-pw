import { Page } from '@playwright/test';
import { HeaderItem } from '../data-types/enums';
import { BasePage } from '../pages/basePage';
export class BaseFlow {
  readonly basePage: BasePage;

  constructor(protected page: Page) {
    this.basePage = new BasePage(page);
  }

  async acceptCookies() {
    await this.basePage.acceptCookies();
  }

  async confirmAge() {
    await this.basePage.confirmAge();
  }

  async goToShop() {
    await this.basePage.goTo(HeaderItem.shop);
  }
}

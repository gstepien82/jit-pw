import { expect, Page } from '@playwright/test';
import { HeaderItem } from '../../data-types/enums';
import { waitUtils } from '../../utils';

export class HeaderComponent {
  constructor(private page: Page) {}

  locators = {
    logo: this.page.locator('[data-testid="headerLogo"]'),
    links: {
      item: (header: HeaderItem) =>
        this.page.locator(`.navigation__link[href*="${header}"]`),
      //...others
    },
  };

  async navigateTo(header: HeaderItem) {
    await this.locators.links.item(header).click();
    await waitUtils.waitForAllEvents(this.page);
  }

  async clickLogo() {
    await this.locators.logo.click();
    await waitUtils.waitForAllEvents(this.page);
  }

  async checkLogo() {
    await expect(this.locators.logo).toBeVisible();
  }

  async checkAllHeaders(): Promise<void> {
    await expect(this.locators.links.item(HeaderItem.shop)).toBeVisible();
    //others
  }
}

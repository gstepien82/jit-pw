import { expect, Page } from '@playwright/test';

export class CookieComponent {
  constructor(private page: Page) {}

  locators = {
    buttons: {
      accept: this.page.locator(
        '#onetrust-button-group>#onetrust-accept-btn-handler'
      ),
      //others...
    },
  };

  async gotIt(): Promise<void> {
    await expect(this.locators.buttons.accept).toContainText('GOT IT', {
      ignoreCase: true,
    });
    await this.locators.buttons.accept.click();
  }
}

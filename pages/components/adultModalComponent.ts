import { expect, Page } from '@playwright/test';

export class AdultModalComponent {
  constructor(private page: Page) {}

  locators = {
    container: this.page.locator('.modal__container'),
    buttons: {
      accept: this.page.locator(
        '.modal__container .ageconfirmation__confirmBtn'
      ),
      //others...
    },
  };

  async confirm(): Promise<void> {
    await expect(this.locators.container).toBeVisible();
    await this.locators.buttons.accept.click();
  }
}

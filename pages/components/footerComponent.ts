import { expect, Page } from '@playwright/test';
import { waitUtils } from '../../utils';

export class FooterComponent {
  constructor(private page: Page) {}

  locators = {
    links: {
      contact: this.page.locator('[data-testid="Contact Us"]'),
      //others...
    },
  };

  async checkFooter(): Promise<void> {
    await waitUtils.forElementVisible(this.locators.links.contact);
    await expect(this.locators.links.contact).toContainText('Contact us');
  }
}

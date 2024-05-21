import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }

  locators = {
    links: {
      contact: this.page.getByRole('button', { name: /get started/i }), // locator type depends on many things- tbd
      //Playwright generally suggest such ones but this is not always useful & stable
      //others...
    },
  };
}

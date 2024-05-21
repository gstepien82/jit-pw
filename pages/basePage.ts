import { Page } from '@playwright/test';
import {
  AdultModalComponent,
  BasketComponent,
  CookieComponent,
  FooterComponent,
  HeaderComponent,
} from './components';
import { HeaderItem } from '../data-types/enums';

export class BasePage {
  readonly adultModalComponent: AdultModalComponent;
  readonly basketComponent: BasketComponent;
  readonly cookieComponent: CookieComponent;
  readonly footerComponent: FooterComponent;
  readonly headerComponent: HeaderComponent;

  constructor(protected page: Page) {
    this.adultModalComponent = new AdultModalComponent(this.page);
    this.basketComponent = new BasketComponent(this.page);
    this.cookieComponent = new CookieComponent(this.page);
    this.footerComponent = new FooterComponent(this.page);
    this.headerComponent = new HeaderComponent(this.page);
  }

  async clickLogo(): Promise<void> {
    await this.headerComponent.clickLogo();
  }

  async acceptCookies(): Promise<void> {
    await this.cookieComponent.gotIt();
  }

  async confirmAge(): Promise<void> {
    await this.adultModalComponent.confirm();
  }

  async checkHeader(): Promise<void> {
    await this.headerComponent.checkAllHeaders();
  }

  async checkFooter(): Promise<void> {
    await this.headerComponent.checkAllHeaders();
  }

  async goTo(item: HeaderItem): Promise<void> {
    await this.headerComponent.navigateTo(item);
  }
}

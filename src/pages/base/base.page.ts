import { Page } from '@playwright/test';

export class BasePage {
  url: string = '';
  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState();
  }

  async title(): Promise<string> {
    return this.page.title();
  }
}

import { Page } from '@playwright/test';

export class BasePage {
  url: string = '';
  constructor(protected page: Page) {}

  async goto(parameters: string = ''): Promise<void> {
    await this.page.goto(`${this.url}${parameters}`);
    await this.page.waitForLoadState();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForUrlToBeLoaded(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  async acceptDialogPopup(): Promise<void> {
    this.page.on('dialog', async (dialog) => await dialog.accept());
  }
}

import { Page, Locator } from '@playwright/test';

export class MainMenuComponent {
  commentsButton = (): Locator => this.page.getByTestId('open-comments');
  articlesButton = (): Locator => this.page.getByTestId('open-articles');
  homePageButton = (): Locator =>
    this.page.getByRole('link', { name: '🦎 GAD' });
  userDropdown = (): Locator => this.page.getByTestId('user-dropdown');
  login = (): Locator => this.page.locator('#loginBtn');
  constructor(private page: Page) {}
}

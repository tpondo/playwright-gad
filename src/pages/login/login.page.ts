import { Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';

export class LoginPage extends BasePage {
  url: string = '/login/';
  emailInput = (): Locator => this.page.locator('input#username');
  passwordInput = (): Locator => this.page.locator('input#password');
  loginButton = (): Locator => this.page.locator('#loginButton');

  async login(email: string, password: string): Promise<void> {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await this.page.waitForLoadState();
  }
}

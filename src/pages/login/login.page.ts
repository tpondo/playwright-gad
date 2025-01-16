import { Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { LoginUserModel } from '../../models/user/user.model';

export class LoginPage extends BasePage {
  url: string = '/login/';
  loginError = (): Locator => this.page.getByTestId('login-error');
  emailInput = (): Locator => this.page.locator('input#username');
  passwordInput = (): Locator => this.page.locator('input#password');
  loginButton = (): Locator => this.page.locator('#loginButton');

  async login(loginData: LoginUserModel): Promise<void> {
    await this.emailInput().fill(loginData.userEmail);
    await this.passwordInput().fill(loginData.userPassword);
    await this.loginButton().click();
    await this.page.waitForLoadState();
  }
}

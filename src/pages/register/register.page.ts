import { Locator } from '@playwright/test';
import { BasePage } from '@_src/pages/base/base.page';
import { RegisterUserModel } from '@_src/models/user/user.model';
import { LoginPage } from '@_src/pages/login/login.page';

export class RegisterPage extends BasePage {
  url: string = 'register.html';
  userFirstNameInput = (): Locator => this.page.getByTestId('firstname-input');
  userLastNameInput = (): Locator => this.page.getByTestId('lastname-input');
  userEmailInput = (): Locator => this.page.getByTestId('email-input');
  userPasswordInput = (): Locator => this.page.getByTestId('password-input');
  registerButton = (): Locator => this.page.getByTestId('register-button');
  alertPopup = (): Locator => this.page.getByTestId('alertPopup');
  emailErrorText = (): Locator => this.page.locator('#octavalidate_email');

  async registerUser(user: RegisterUserModel): Promise<LoginPage> {
    await this.userFirstNameInput().fill(user.userFirstName);
    await this.userLastNameInput().fill(user.userLastName);
    await this.userEmailInput().fill(user.userEmail);
    await this.userPasswordInput().fill(user.userPassword);
    await this.registerButton().click();
    await this.page.waitForLoadState();
    return new LoginPage(this.page);
  }
}

import { Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { RegisterUser } from '../../models/user/user.model';

export class RegisterPage extends BasePage {
  url: string = 'register.html';
  userFirstNameInput = (): Locator => this.page.getByTestId('firstname-input');
  userLastNameInput = (): Locator => this.page.getByTestId('lastname-input');
  userEmailInput = (): Locator => this.page.getByTestId('email-input');
  userPasswordInput = (): Locator => this.page.getByTestId('password-input');
  registerButton = (): Locator => this.page.getByTestId('register-button');
  alertPopup = (): Locator => this.page.getByTestId('alertPopup');
  emailErrorText = (): Locator => this.page.locator('#octavalidate_email');

  async registerUser(user: RegisterUser): Promise<void> {
    await this.userFirstNameInput().fill(user.userFirstName);
    await this.userLastNameInput().fill(user.userLastName);
    await this.userEmailInput().fill(user.userEmail);
    await this.userPasswordInput().fill(user.userPassword);
    await this.registerButton().click();
    await this.page.waitForLoadState();
  }
}

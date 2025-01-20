import { test, expect } from '@_fixtures/fixtures';
import { prepareRandomUserData } from '@_src/factories/user/user.factory';
import { RegisterUserModel } from '@_src/models/user/user.model';
import { pageTitle } from '@_src/test-data/page-title/page-title.data';

test.describe('Verify register', () => {
  let registerUserData: RegisterUserModel;
  test.beforeEach(async ({ registerPage }) => {
    registerUserData = prepareRandomUserData();
    await registerPage.goto();
  });
  test(
    'register user with correct data',
    {
      tag: '@integration',
      annotation: {
        type: 'documentation',
        description: 'GAD-R03-01,GAD-R03-03',
      },
    },
    async ({ registerPage, loginPage, welcomePage }) => {
      await registerPage.registerUser(registerUserData);
      await loginPage.login(registerUserData);

      const title = await welcomePage.getTitle();
      expect(title).toContain(pageTitle.welcome);
    },
  );
  test(
    'not register user with incorrect data - non valid email',
    {
      tag: '@integration',
      annotation: {
        type: 'documentation',
        description: 'GAD-R03-04',
      },
    },
    async ({ registerPage }) => {
      const expectedErrorText: string = 'Please provide a valid email address';
      const incorrectEmail: string = '!@#';
      registerUserData.userEmail = incorrectEmail;

      await registerPage.registerUser(registerUserData);

      await expect(registerPage.emailErrorText()).toHaveText(expectedErrorText);
    },
  );
  test(
    'not register user with incorrect data - email not provided',
    {
      tag: '@integration',
      annotation: {
        type: 'documentation',
        description: 'GAD-R03-04',
      },
    },
    async ({ registerPage, page }) => {
      const expectedErrorText: string = 'This field is required';

      await registerPage
        .userFirstNameInput()
        .fill(registerUserData.userFirstName);
      await registerPage
        .userLastNameInput()
        .fill(registerUserData.userLastName);
      await registerPage
        .userPasswordInput()
        .fill(registerUserData.userPassword);
      await registerPage.registerButton().click();
      await page.waitForLoadState();

      await expect(registerPage.emailErrorText()).toHaveText(expectedErrorText);
    },
  );
});

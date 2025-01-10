import { test, expect } from '../../fixtures/fixtures';
import { RegisterUser } from '../../src/models/user/user.model';
import { pageTitle } from '../../src/test-data/page-title/page-title.data';
import { faker } from '@faker-js/faker/locale/en';

test.describe('Register user', () => {
  test(
    'register user with correct data',
    {
      tag: '@smoke',
      annotation: {
        type: 'documentation',
        description: 'GAD-R03-01,GAD-R03-03',
      },
    },
    async ({ registerPage, loginPage, welcomePage }) => {
      const registerUser: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        userPassword: faker.internet.password(),
      };
      registerUser.userEmail = faker.internet.email({
        firstName: registerUser.userFirstName,
        lastName: registerUser.userLastName,
      });

      await registerPage.goto();
      await registerPage.registerUser(registerUser);
      await loginPage.login(registerUser);

      const title = await welcomePage.title();
      expect(title).toContain(pageTitle.welcome);
    },
  );
  test(
    'not register user with incorrect data - non valid email',
    {
      tag: '@smoke',
      annotation: {
        type: 'documentation',
        description: 'GAD-R03-04',
      },
    },
    async ({ registerPage }) => {
      const expectedErrorText: string = 'Please provide a valid email address';
      const registerUser: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '@#!',
        userPassword: faker.internet.password(),
      };

      await registerPage.goto();
      await registerPage.registerUser(registerUser);

      await expect(registerPage.emailErrorText()).toHaveText(expectedErrorText);
    },
  );
});

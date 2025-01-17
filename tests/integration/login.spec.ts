import { faker } from '@faker-js/faker/locale/en';
import { test, expect } from '@_fixtures/fixtures';
import { pageTitle } from '@_src/test-data/page-title/page-title.data';
import { testUser1 } from '@_src/test-data/user-data/user-data';

test.describe('Verify login', () => {
  const expectedLoginError: string = 'Invalid username or password';
  test(
    'reject login with incorrect password',
    {
      tag: '@integration',
      annotation: { type: 'documentation', description: 'GAD-R02-01' },
    },
    async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login({
        userEmail: testUser1.userEmail,
        userPassword: faker.internet.password(),
      });
      const title = await loginPage.getTitle();

      await expect.soft(loginPage.loginError()).toHaveText(expectedLoginError);
      expect.soft(title).toContain(pageTitle.login);
    },
  );
  test(
    'reject login with incorrect email',
    {
      tag: '@integration',
      annotation: { type: 'documentation', description: 'GAD-R02-01' },
    },
    async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login({
        userEmail: 'incorrectEmail',
        userPassword: testUser1.userPassword,
      });
      const title = await loginPage.getTitle();

      await expect.soft(loginPage.loginError()).toHaveText(expectedLoginError);
      expect.soft(title).toContain(pageTitle.login);
    },
  );
});

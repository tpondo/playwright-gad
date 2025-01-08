import { test, expect } from '../../fixtures/fixtures';
import { pageTitle } from '../../src/test-data/page-title/page-title.data';
import { testUser1 } from '../../src/test-data/user-data/user-data';

test.describe('Verify login', () => {
  test(
    'successful login',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R02-01' },
    },
    async ({ loginPage, welcomePage }) => {
      const userEmail: string = testUser1.userName;
      const password: string = testUser1.userPassword;

      await loginPage.goto();
      await loginPage.login(userEmail, password);

      const title = await welcomePage.title();
      expect(title).toContain(pageTitle.welcome);
    },
  );
});

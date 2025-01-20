import { test as setup, expect } from '../../fixtures/fixtures';
import { STORAGE_STATE } from '../../playwright.config';
import { pageTitle } from '../../src/test-data/page-title/page-title.data';
import { testUser1 } from '../../src/test-data/user-data/user-data';

setup(
  'successful login',
  {
    tag: '@smoke',
    annotation: { type: 'documentation', description: 'GAD-R02-01' },
  },
  async ({ loginPage, welcomePage, page }) => {
    await loginPage.goto();
    await loginPage.login(testUser1);

    const title = await welcomePage.getTitle();
    expect(title).toContain(pageTitle.welcome);
    await page.context().storageState({ path: STORAGE_STATE });
  },
);

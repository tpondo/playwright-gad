import { test as setup, expect } from '@_fixtures/merge.fixture';
import { STORAGE_STATE } from '@_pw-config';
import { pageTitle } from '@_src/test-data/page-title/page-title.data';
import { testUser1 } from '@_src/test-data/user-data/user-data';

setup(
  'login and save session',
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

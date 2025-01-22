import { test, expect } from '@_fixtures/merge.fixture';

test.describe('Verify article', () => {
  test(
    'non logged user can access created article',
    {
      tag: '@integration',
      annotation: { type: 'documentation', description: 'GAD-R06-01' },
    },
    async ({ articlePage }) => {
      const expectedArticleTitle: string = 'predefined data';

      await articlePage.goto('?id=231');

      await expect(articlePage.articleTitle()).toHaveText(expectedArticleTitle);
    },
  );
  test('Login as an Admin user', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });
});

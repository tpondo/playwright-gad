import { test, expect } from '@_fixtures/fixtures';
import { pageTitle } from '@_src/test-data/page-title/page-title.data';

test.describe('Verify service main pages', () => {
  test(
    'home page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-01' },
    },
    async ({ homePage }) => {
      await homePage.goto();

      const title = await homePage.getTitle();
      expect(title).toContain(pageTitle.mainPage);
    },
  );

  test(
    'articles page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-02' },
    },
    async ({ articlesPage }) => {
      await articlesPage.goto();

      const title = await articlesPage.getTitle();
      expect(title).toContain(pageTitle.articles);
    },
  );

  test(
    'comments page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-02' },
    },
    async ({ commentsPage }) => {
      await commentsPage.goto();

      const title = await commentsPage.getTitle();
      expect(title).toContain(pageTitle.comments);
    },
  );
});

import { test, expect } from '../../fixtures/fixtures';
import { pageTitle } from '../../test-data/page-title/page-title.data';

test.describe('Verify service main pages', () => {
  test(
    'home page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-01' },
    },
    async ({ homePage }) => {
      await homePage.goto();

      const title = await homePage.title();
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

      const title = await articlesPage.title();
      expect(title).toContain(pageTitle.articlesPage);
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

      const title = await commentsPage.title();
      expect(title).toContain(pageTitle.commentsPage);
    },
  );
});

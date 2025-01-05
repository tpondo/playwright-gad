import { test, expect } from '../../fixtures/fixtures';

test.describe('Verify service main pages', () => {
  test(
    'Home page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-01' },
    },
    async ({ homePage }) => {
      await homePage.goto();

      const title = await homePage.title();
      expect(title).toContain('GAD');
    },
  );

  test(
    'Articles page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-02' },
    },
    async ({ articlesPage }) => {
      await articlesPage.goto();

      const title = await articlesPage.title();
      expect(title).toContain('Articles');
    },
  );

  test(
    'Comments page title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-02' },
    },
    async ({ commentsPage }) => {
      await commentsPage.goto();

      const title = await commentsPage.title();
      expect(title).toContain('Comments');
    },
  );
});

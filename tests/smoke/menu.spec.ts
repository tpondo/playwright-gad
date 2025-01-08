import { test, expect } from '../../fixtures/fixtures';
import { pageTitle } from '../../src/test-data/page-title/page-title.data';

test.describe('Verify navigation through menu', () => {
  test(
    'comments button navigates to comments page',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-03' },
    },
    async ({ articlesPage, commentsPage }) => {
      await articlesPage.goto();
      await articlesPage.mainMenu.commentsButton().click();

      const title = await commentsPage.title();
      expect(title).toContain(pageTitle.comments);
    },
  );

  test(
    'articles button navigates to articles page',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-03' },
    },
    async ({ commentsPage, articlesPage }) => {
      await commentsPage.goto();
      await commentsPage.mainMenu.articlesButton().click();

      const title = await articlesPage.title();
      expect(title).toContain(pageTitle.articles);
    },
  );

  test(
    'home button navigates to main page',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R01-03' },
    },
    async ({ commentsPage, homePage }) => {
      await commentsPage.goto();
      await commentsPage.mainMenu.homePageButton().click();

      const title = await homePage.title();
      expect(title).toContain(pageTitle.mainPage);
    },
  );
});

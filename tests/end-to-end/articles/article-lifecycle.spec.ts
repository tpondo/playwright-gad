import { test, expect } from '../../../fixtures/fixtures';
import { prepareRandomArticle } from '../../../src/factories/article/article.factory';
import { AddArticleModel } from '../../../src/models/article/article.model';
import { pageTitle } from '../../../src/test-data/page-title/page-title.data';
import { testUser1 } from '../../../src/test-data/user-data/user-data';

test.describe.configure({ mode: 'serial' });
test.describe('Verify article lifecycle', () => {
  let article: AddArticleModel;
  test.beforeEach(async ({ loginPage, articlesPage }) => {
    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
  });
  test(
    'create new article',
    {
      tag: '@e2e',
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ addArticleView, articlesPage, articlePage }) => {
      article = prepareRandomArticle();

      await articlesPage.addArticleButtonLogged().click();
      await addArticleView.addArticle(article);

      await expect.soft(articlePage.articleTitle()).toHaveText(article.title);
      await expect
        .soft(articlePage.articleBody())
        .toHaveText(article.body, { useInnerText: true });
    },
  );
  test(
    'user can access single article',
    {
      tag: '@e2e',
      annotation: { type: 'documentation', description: 'GAD-R04-03' },
    },
    async ({ articlesPage, articlePage }) => {
      await articlesPage.goToArticle(article.title);

      await expect.soft(articlePage.articleTitle()).toHaveText(article.title);
      await expect
        .soft(articlePage.articleBody())
        .toHaveText(article.body, { useInnerText: true });
    },
  );
  test(
    'user can delete his own article',
    {
      tag: '@e2e',
      annotation: { type: 'documentation', description: 'GAD-R04-03' },
    },
    async ({ articlePage, articlesPage }) => {
      await articlesPage.goToArticle(article.title);
      await articlePage.deleteArticle();
      await articlesPage.waitForUrlToBeLoaded();

      const title = await articlesPage.getTitle();
      expect.soft(title).toContain(pageTitle.articles);
    },
  );
  test(
    'user can not find deleted article',
    {
      tag: '@e2e',
      annotation: { type: 'documentation', description: 'GAD-R04-03' },
    },
    async ({ articlesPage }) => {
      const expectedNoArticleData: string = 'No data';
      await articlesPage.searchArticle(article.title);

      await expect
        .soft(articlesPage.noResultsText())
        .toHaveText(expectedNoArticleData);
    },
  );
});

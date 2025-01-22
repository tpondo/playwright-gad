import { test, expect } from '@_fixtures/merge.fixture';
import { prepareRandomArticle } from '@_src/factories/article/article.factory';
import { AddArticleModel } from '@_src/models/article/article.model';
import { pageTitle } from '@_src/test-data/page-title/page-title.data';

test.describe.configure({ mode: 'serial' });
test.describe('Verify article lifecycle', () => {
  let article: AddArticleModel;
  test(
    'create new article',
    {
      tag: ['@e2e', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ addArticleView, articlePage }) => {
      article = prepareRandomArticle();

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
      tag: ['@e2e', '@logged'],
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
      tag: ['@e2e', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-04' },
    },
    async ({ articlesPage, articlePage }) => {
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
      tag: ['@e2e', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-04' },
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

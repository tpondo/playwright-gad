import { ArticleCreationContext } from '@_fixtures/article.fixture';
import { test, expect } from '@_fixtures/merge.fixture';
import { prepareRandomArticle } from '@_src/factories/article/article.factory';
import { AddArticleModel } from '@_src/models/article/article.model';
import { waitForResponse } from '@_src/utils/api/response.api';
import { Response } from '@playwright/test';

test.describe('Verify articles', () => {
  const expectedErrorMessage: string = 'Article was not created';

  test(
    'create new article',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ randomArticle }) => {
      const articleContext: ArticleCreationContext = await randomArticle();

      await expect
        .soft(articleContext.articlePage.articleTitle())
        .toHaveText(articleContext.articleData.title);
      await expect
        .soft(articleContext.articlePage.articleBody())
        .toHaveText(articleContext.articleData.body, { useInnerText: true });
    },
  );

  test(
    'new article can not be created without title',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ addArticleView, page }) => {
      const expectedResponseCode: number = 422;
      const article: AddArticleModel = prepareRandomArticle();

      const responsePromise = waitForResponse(page, '/api/articles');

      await addArticleView.bodyTextarea().fill(article.body);
      await addArticleView.saveButton().click();

      const response = await responsePromise;

      await expect
        .soft(addArticleView.alertPopup())
        .toHaveText(expectedErrorMessage);
      await expect.soft(addArticleView.addNewEntryHeader()).toBeVisible();
      expect.soft(response.status()).toBe(expectedResponseCode);
    },
  );

  test(
    'new article can not be created with title exceeding 128 signs',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-02' },
    },
    async ({ addArticleView, randomArticle }) => {
      await randomArticle(prepareRandomArticle(129));

      await expect
        .soft(addArticleView.alertPopup())
        .toHaveText(expectedErrorMessage);
      await expect.soft(addArticleView.addNewEntryHeader()).toBeVisible();
    },
  );

  test(
    'new article can be created with title with 128 signs',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-02' },
    },
    async ({ randomArticle }) => {
      const articleContext: ArticleCreationContext = await randomArticle(
        prepareRandomArticle(128),
      );

      await expect
        .soft(articleContext.articlePage.articleTitle())
        .toHaveText(articleContext.articleData.title);
      await expect
        .soft(articleContext.articlePage.articleBody())
        .toHaveText(articleContext.articleData.body, { useInnerText: true });
    },
  );

  test(
    'should return created article from API',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R07-04' },
    },
    async ({ page, randomArticle }) => {
      const responsePromise = waitForResponse(page, '/api/articles', 'GET');
      const articleContext: ArticleCreationContext = await randomArticle();
      const response: Response = await responsePromise;
      const body = await response.json();

      await expect
        .soft(articleContext.articlePage.articleTitle())
        .toHaveText(articleContext.articleData.title);
      expect.soft(body.title).toBe(articleContext.articleData.title);
    },
  );
});

import { expect, test } from '../../fixtures/fixtures';
import { randomNewArticleData } from '../../src/factories/article/article.factory';
import { AddArticleModel } from '../../src/models/article/article.model';
import { testUser1 } from '../../src/test-data/user-data/user-data';

test.describe('Verify articles', () => {
  const expectedErrorMessage: string = 'Article was not created';

  test.beforeEach(async ({ loginPage, articlesPage }) => {
    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged().click();
  });
  test(
    'create new article',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R02-01' },
    },
    async ({ addArticleView, articlePage }) => {
      const article: AddArticleModel = randomNewArticleData();
      await addArticleView.addArticle(article);

      await expect.soft(articlePage.articleTitle()).toHaveText(article.title);
      await expect
        .soft(articlePage.articleBody())
        .toHaveText(article.body, { useInnerText: true });
    },
  );

  test(
    'new article can not be created without title',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ addArticleView }) => {
      const article: AddArticleModel = randomNewArticleData();

      await addArticleView.bodyTextarea().fill(article.body);
      await addArticleView.saveButton().click();

      await expect
        .soft(addArticleView.alertPopup())
        .toHaveText(expectedErrorMessage);
      await expect.soft(addArticleView.addNewEntryHeader()).toBeVisible();
    },
  );

  test(
    'new article can not be created with title exceeding 128 signs',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R04-02' },
    },
    async ({ addArticleView }) => {
      const article: AddArticleModel = randomNewArticleData(129);

      await addArticleView.addArticle(article);

      await expect
        .soft(addArticleView.alertPopup())
        .toHaveText(expectedErrorMessage);
      await expect.soft(addArticleView.addNewEntryHeader()).toBeVisible();
    },
  );

  test(
    'new article can be created with title with 128 signs',
    {
      tag: '@smoke',
      annotation: { type: 'documentation', description: 'GAD-R04-02' },
    },
    async ({ addArticleView, articlePage }) => {
      const article: AddArticleModel = randomNewArticleData(128);

      await addArticleView.addArticle(article);

      await expect.soft(articlePage.articleTitle()).toHaveText(article.title);
      await expect
        .soft(articlePage.articleBody())
        .toHaveText(article.body, { useInnerText: true });
    },
  );
});
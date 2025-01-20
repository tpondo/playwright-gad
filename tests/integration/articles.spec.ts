import { expect, test } from '../../fixtures/fixtures';
import { prepareRandomArticle } from '../../src/factories/article/article.factory';
import { AddArticleModel } from '../../src/models/article/article.model';

test.describe('Verify articles', () => {
  const expectedErrorMessage: string = 'Article was not created';

  test.beforeEach(async ({ articlesPage }) => {
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged().click();
  });

  test(
    'create new article',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ addArticleView, articlePage }) => {
      const article: AddArticleModel = prepareRandomArticle();
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
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ addArticleView }) => {
      const article: AddArticleModel = prepareRandomArticle();

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
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-02' },
    },
    async ({ addArticleView }) => {
      const article: AddArticleModel = prepareRandomArticle(129);

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
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-02' },
    },
    async ({ addArticleView, articlePage }) => {
      const article: AddArticleModel = prepareRandomArticle(128);

      await addArticleView.addArticle(article);

      await expect.soft(articlePage.articleTitle()).toHaveText(article.title);
      await expect
        .soft(articlePage.articleBody())
        .toHaveText(article.body, { useInnerText: true });
    },
  );
});

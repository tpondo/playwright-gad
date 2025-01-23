import { ArticleCreationContext } from '@_fixtures/article.fixture';
import { test, expect } from '@_fixtures/merge.fixture';
import { prepareRandomArticle } from '@_src/factories/article/article.factory';
import { AddArticleModel } from '@_src/models/article/article.model';
import { ArticlePage } from '@_src/pages/articles/article.page';

test.describe('Verify articles', () => {
  const expectedErrorMessage: string = 'Article was not created';

  test(
    'create new article',
    {
      tag: ['@integration', '@logged'],
      annotation: { type: 'documentation', description: 'GAD-R04-01' },
    },
    async ({ createRandomArticle }) => {
      const article: AddArticleModel = createRandomArticle.articleData;
      const articlePage: ArticlePage = createRandomArticle.articlePage;

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
});

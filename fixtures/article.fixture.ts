import { prepareRandomArticle } from '@_src/factories/article/article.factory';
import { AddArticleModel } from '@_src/models/article/article.model';
import { ArticlePage } from '@_src/pages/articles/article.page';
import { pageObjectTest } from '@_fixtures/page-object.fixture';

interface ArticleFixtures {
  createRandomArticle: ArticlePage;
}

export const articleTest = pageObjectTest.extend<ArticleFixtures>({
  createRandomArticle: async ({ addArticleView }, use) => {
    const articleData: AddArticleModel = prepareRandomArticle();
    const articlePage: ArticlePage =
      await addArticleView.addArticle(articleData);
    await use(articlePage);
  },
});

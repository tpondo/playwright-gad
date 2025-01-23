import { prepareRandomArticle } from '@_src/factories/article/article.factory';
import { AddArticleModel } from '@_src/models/article/article.model';
import { ArticlePage } from '@_src/pages/articles/article.page';
import { pageObjectTest } from '@_fixtures/page-object.fixture';
//import { AddArticleView } from '@_src/views/article/add-article.view';

export interface ArticleCreationContext {
  articlePage: ArticlePage;
  articleData: AddArticleModel;
}
interface ArticleFixtures {
  createRandomArticle: ArticleCreationContext;
  randomArticle: (
    articleData?: AddArticleModel,
  ) => Promise<ArticleCreationContext>;
}

export const articleTest = pageObjectTest.extend<ArticleFixtures>({
  createRandomArticle: async ({ addArticleView }, use) => {
    const articleData: AddArticleModel = prepareRandomArticle();
    const articlePage: ArticlePage =
      await addArticleView.addArticle(articleData);
    await use({ articlePage, articleData });
  },
  randomArticle: async ({ addArticleView }, use) => {
    const create = async (
      articleData?: AddArticleModel,
    ): Promise<ArticleCreationContext> => {
      const finalArticleData: AddArticleModel =
        articleData ?? prepareRandomArticle();
      const articlePage: ArticlePage =
        await addArticleView.addArticle(finalArticleData);
      return { articlePage, articleData: finalArticleData };
    };
    await use(create);
  },
});

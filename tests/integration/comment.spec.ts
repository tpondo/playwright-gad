import { test, expect } from '@_fixtures/merge.fixture';
import { prepareRandomCommentData } from '@_src/factories/comment/comment.factory';
import { AddCommentModel } from '@_src/models/comment/add-comment.model';
import { ArticleComment, ArticlePage } from '@_src/pages/articles/article.page';
import { waitForResponse } from '@_src/utils/api/response.api';

test.describe('Verify comment', () => {
  test(
    'Should return created comment',
    { tag: ['@integration', '@logged'] },
    async ({ createRandomArticle, page }) => {
      const expectedCommentCreatedPopup: string = 'Comment was created';
      const comment: AddCommentModel = prepareRandomCommentData();
      const articlePage: ArticlePage = createRandomArticle.articlePage;
      const articleComment: ArticleComment =
        articlePage.getArticleComment(comment);

      const addNewArticleCommentView =
        await articlePage.clickAddNewCommentButton();

      const responsePromise = waitForResponse(
        page,
        '/api/comments',
        'GET',
        200,
      );
      await addNewArticleCommentView.addNewComment(comment);
      const response = await responsePromise;

      await expect
        .soft(articlePage.alertPopup())
        .toHaveText(expectedCommentCreatedPopup);

      await expect.soft(articleComment.body).toHaveText(comment.body);
      expect(response.ok).toBeTruthy();
    },
  );
});

import { test, expect } from '@_fixtures/merge.fixture';
import { ArticleComment, ArticlePage } from '@_src/pages/articles/article.page';
import { prepareRandomCommentData } from '@_src/factories/comment/comment.factory';
import { AddCommentModel } from '@_src/models/comment/add-comment.model';
import { CommentPage } from '@_src/pages/comments/comment.page';

test.describe('Verify article lifecycle', () => {
  test(
    'operate on comments',
    {
      tag: ['@e2e', '@logged'],
      annotation: {
        type: 'documentation',
        description: 'GAD-R05-01,GAD-R05-02',
      },
    },
    async ({ createRandomArticle }) => {
      const comment: AddCommentModel = prepareRandomCommentData();
      const articlePage: ArticlePage = createRandomArticle;
      const articleComment: ArticleComment =
        articlePage.getArticleComment(comment);

      await test.step('add new comment', async () => {
        const expectedCommentCreatedPopup: string = 'Comment was created';

        const addNewArticleCommentView =
          await articlePage.clickAddNewCommentButton();
        await addNewArticleCommentView.addNewComment(comment);

        await expect
          .soft(articlePage.alertPopup())
          .toHaveText(expectedCommentCreatedPopup);

        await expect.soft(articleComment.body).toHaveText(comment.body);
      });

      let commentPage: CommentPage;
      await test.step('open comment', async () => {
        commentPage = await articlePage.clickArticleLink(articleComment);

        await expect.soft(commentPage.commentBody()).toHaveText(comment.body);
      });

      let updateComment: AddCommentModel;
      await test.step('update comment', async () => {
        updateComment = prepareRandomCommentData();
        const expectedCommentUpdatedPopup: string = 'Comment was updated';

        const editArticleCommentView =
          await commentPage.clickEditCommentButton();
        await editArticleCommentView.updateComment(updateComment);

        await expect
          .soft(commentPage.commentBody())
          .toHaveText(updateComment.body);
        await expect
          .soft(commentPage.alertPopup())
          .toHaveText(expectedCommentUpdatedPopup);
      });

      await test.step('return to comment view', async () => {
        await commentPage.returnLink().click();

        const updatedArticleComment: ArticleComment =
          articlePage.getArticleComment(updateComment);

        await expect
          .soft(updatedArticleComment.body)
          .toHaveText(updateComment.body);
      });

      await test.step('create and verify second comment', async () => {
        let secondComment: AddCommentModel;
        let secondArticleComment: ArticleComment;
        await test.step('add second comment', async () => {
          secondComment = prepareRandomCommentData();
          secondArticleComment = articlePage.getArticleComment(secondComment);

          const addNewArticleCommentView =
            await articlePage.clickAddNewCommentButton();
          await addNewArticleCommentView.addNewComment(secondComment);

          await expect
            .soft(secondArticleComment.body)
            .toHaveText(secondComment.body);
        });
        await test.step('verify second comment', async () => {
          await secondArticleComment.link.click();

          await expect
            .soft(commentPage.commentBody())
            .toHaveText(secondComment.body);
        });
      });
    },
  );
});

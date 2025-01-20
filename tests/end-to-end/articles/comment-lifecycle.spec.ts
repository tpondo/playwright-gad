import { test, expect } from '../../../fixtures/fixtures';
import { prepareRandomArticle } from '../../../src/factories/article/article.factory';
import { AddArticleModel } from '../../../src/models/article/article.model';
import { ArticleComment } from '../../../src/pages/articles/article.page';
import { prepareRandomCommentData } from '../../../src/factories/comment/comment.factory';
import { AddCommentModel } from '../../../src/models/comment/add-comment.model';

test.describe('Verify article lifecycle', () => {
  let article: AddArticleModel;
  test.beforeEach(async ({ articlesPage, addArticleView }) => {
    article = prepareRandomArticle();

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged().click();
    await addArticleView.addArticle(article);
  });
  test(
    'create new comment',
    {
      tag: ['@e2e', '@logged'],
      annotation: {
        type: 'documentation',
        description: 'GAD-R05-01,GAD-R05-02',
      },
    },
    async ({
      articlePage,
      addNewArticleCommentView,
      commentPage,
      editArticleCommentView,
    }) => {
      let comment: AddCommentModel;
      let articleComment: ArticleComment;
      await test.step('add new comment', async () => {
        comment = prepareRandomCommentData();
        articleComment = articlePage.getArticleComment(comment);
        const expectedCommentCreatedPopup: string = 'Comment was created';

        await articlePage.addNewCommentButton().click();
        await addNewArticleCommentView.addNewComment(comment);

        await expect
          .soft(articlePage.alertPopup())
          .toHaveText(expectedCommentCreatedPopup);

        await expect.soft(articleComment.body).toHaveText(comment.body);
      });

      await test.step('open comment', async () => {
        await articleComment.link.click();

        await expect.soft(commentPage.commentBody()).toHaveText(comment.body);
      });

      let updateComment: AddCommentModel;
      await test.step('update comment', async () => {
        updateComment = prepareRandomCommentData();
        const expectedCommentUpdatedPopup: string = 'Comment was updated';

        await commentPage.editCommentButton().click();
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

          await articlePage.addNewCommentButton().click();
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

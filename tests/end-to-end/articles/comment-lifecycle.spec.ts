import { test, expect } from '../../../fixtures/fixtures';
import { prepareRandomArticle } from '../../../src/factories/article/article.factory';
import { AddArticleModel } from '../../../src/models/article/article.model';
import { testUser1 } from '../../../src/test-data/user-data/user-data';
import { ArticleComment } from '../../../src/pages/articles/article.page';
import { prepareRandomCommentData } from '../../../src/factories/comment/comment.factory';
import { AddCommentModel } from '../../../src/models/comment/add-comment.model';

test.describe.configure({ mode: 'serial' });
test.describe('Verify article lifecycle', () => {
  let article: AddArticleModel;
  test.beforeEach(async ({ loginPage, articlesPage, addArticleView }) => {
    article = prepareRandomArticle();

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged().click();
    await addArticleView.addArticle(article);
  });
  test(
    'create new comment',
    {
      tag: '@e2e',
      annotation: {
        type: 'documentation',
        description: 'GAD-R05-01,GAD-R05-02',
      },
    },
    async ({
      articlePage,
      addNewArticleComment,
      commentPage,
      editArticleComment,
    }) => {
      const comment: AddCommentModel = prepareRandomCommentData();
      const updateComment: AddCommentModel = prepareRandomCommentData();
      const articleComment: ArticleComment =
        articlePage.getArticleComment(comment);
      const expectedCommentCreatedPopup: string = 'Comment was created';
      const expectedCommentUpdatedPopup: string = 'Comment was updated';

      // adding new comment
      await articlePage.addNewCommentButton().click();
      await addNewArticleComment.addNewComment(comment);

      await expect
        .soft(articlePage.alertPopup())
        .toHaveText(expectedCommentCreatedPopup);

      await expect.soft(articleComment.body).toHaveText(comment.body);

      // opening created comment
      await articleComment.link.click();

      await expect.soft(commentPage.commentBody()).toHaveText(comment.body);

      // editing created comment
      await commentPage.editCommentButton().click();
      await editArticleComment.updateComment(updateComment);

      await expect
        .soft(commentPage.commentBody())
        .toHaveText(updateComment.body);
      await expect
        .soft(commentPage.alertPopup())
        .toHaveText(expectedCommentUpdatedPopup);

      // returning to comment view
      await commentPage.returnLink().click();

      const updatedArticleComment: ArticleComment =
        articlePage.getArticleComment(updateComment);

      await expect
        .soft(updatedArticleComment.body)
        .toHaveText(updateComment.body);
    },
  );
});

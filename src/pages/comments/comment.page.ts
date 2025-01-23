//import { Page } from '@playwright/test';

import { Locator } from '@playwright/test';
import { BasePage } from '@_src/pages/base/base.page';
import { EditArticleCommentView } from '@_src/views/article/edit-article-comment.view';

export class CommentPage extends BasePage {
  url = '/comment.html';
  commentBody = (): Locator => this.page.getByTestId('comment-body');
  editCommentButton = (): Locator => this.page.getByTestId('edit');
  alertPopup = (): Locator => this.page.getByTestId('alert-popup');
  returnLink = (): Locator => this.page.getByTestId('return');

  async clickEditCommentButton(): Promise<EditArticleCommentView> {
    await this.editCommentButton().click();
    return new EditArticleCommentView(this.page);
  }
}

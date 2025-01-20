import { Locator, Page } from '@playwright/test';
import { AddCommentModel } from '@_src/models/comment/add-comment.model';

export class EditArticleCommentView {
  commentTextArea = (): Locator => this.page.getByTestId('body-input');
  updateCommentButton = (): Locator => this.page.getByTestId('update-button');

  constructor(private page: Page) {}

  async updateComment(comment: AddCommentModel): Promise<void> {
    await this.commentTextArea().fill(comment.body);
    await this.updateCommentButton().click();
  }
}

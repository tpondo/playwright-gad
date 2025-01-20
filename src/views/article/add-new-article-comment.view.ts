import { Locator, Page } from '@playwright/test';
import { AddCommentModel } from '@_src/models/comment/add-comment.model';

export class AddNewArticleCommentView {
  commentTextArea = (): Locator => this.page.locator('textarea#body');
  saveCommentButton = (): Locator =>
    this.page.locator('button').getByText('Save');

  constructor(private page: Page) {}

  async addNewComment(comment: AddCommentModel): Promise<void> {
    await this.commentTextArea().fill(comment.body);
    await this.saveCommentButton().click();
  }
}

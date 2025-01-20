//import { Page } from '@playwright/test';

import { Locator } from '@playwright/test';
import { BasePage } from '@_src/pages/base/base.page';

export class CommentPage extends BasePage {
  url = '/comment.html';
  commentBody = (): Locator => this.page.getByTestId('comment-body');
  editCommentButton = (): Locator => this.page.getByTestId('edit');
  alertPopup = (): Locator => this.page.getByTestId('alert-popup');
  returnLink = (): Locator => this.page.getByTestId('return');
}

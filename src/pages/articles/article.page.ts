import { Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';
import { AddCommentModel } from '../../models/comment/add-comment.model';

export interface ArticleComment {
  body: Locator;
  link: Locator;
}

export class ArticlePage extends BasePage {
  url = '/article.html';
  articleTitle = (): Locator => this.page.getByTestId('article-title');
  articleBody = (): Locator => this.page.getByTestId('article-body');
  deleteArticleIcon = (): Locator => this.page.getByTestId('delete');
  addNewCommentButton = (): Locator => this.page.locator('button#add-new');
  alertPopup = (): Locator => this.page.getByTestId('alert-popup');

  async deleteArticle(): Promise<void> {
    await this.acceptDialogPopup();
    await this.deleteArticleIcon().click();
  }

  getArticleComment(comment: AddCommentModel): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: comment.body });

    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator('[id^="gotoComment"]'),
    };
  }
}

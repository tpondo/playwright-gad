import { Locator } from '@playwright/test';
import { BasePage } from '@_src/pages/base/base.page';
import { AddCommentModel } from '@_src/models/comment/add-comment.model';
import { AddNewArticleCommentView } from '@_src/views/article/add-new-article-comment.view';
import { ArticlesPage } from '@_src/pages/articles/articles.page';

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

  async deleteArticle(): Promise<ArticlesPage> {
    await this.acceptDialogPopup();
    await this.deleteArticleIcon().click();
    return new ArticlesPage(this.page);
  }

  async clickAddNewCommentButton(): Promise<AddNewArticleCommentView> {
    await this.addNewCommentButton().click();
    return new AddNewArticleCommentView(this.page);
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

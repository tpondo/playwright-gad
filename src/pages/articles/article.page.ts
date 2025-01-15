import { Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';

export class ArticlePage extends BasePage {
  url = '/article.html';
  articleTitle = (): Locator => this.page.getByTestId('article-title');
  articleBody = (): Locator => this.page.getByTestId('article-body');
  delete = (): Locator => this.page.getByTestId('delete');

  async deleteArticle(): Promise<void> {
    await this.acceptDialogPopup();
    await this.delete().click();
  }
}

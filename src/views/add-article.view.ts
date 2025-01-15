import { Locator, Page } from '@playwright/test';
import { AddArticleModel } from '../models/article/article.model';

export class AddArticleView {
  titleInput = (): Locator => this.page.getByTestId('title-input');
  bodyTextarea = (): Locator => this.page.getByTestId('body-text');
  saveButton = (): Locator => this.page.getByTestId('save');
  alertPopup = (): Locator => this.page.getByTestId('alert-popup');
  addNewEntryHeader = (): Locator =>
    this.page.getByRole('heading', { name: 'Add New Entry' });
  constructor(private page: Page) {}

  async addArticle(article: AddArticleModel): Promise<void> {
    await this.titleInput().fill(article.title);
    await this.bodyTextarea().fill(article.body);
    await this.saveButton().click();
    await this.page.waitForLoadState();
  }
}

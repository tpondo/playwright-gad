import { Locator } from '@playwright/test';
import { MainMenuComponent } from '../../components/main-menu.component';
import { BasePage } from '../base/base.page';

export class ArticlesPage extends BasePage {
  url: string = '/articles.html';
  mainMenu: MainMenuComponent = new MainMenuComponent(this.page);
  addArticleButtonLogged = (): Locator => this.page.locator('button#add-new');
  searchInput = (): Locator => this.page.getByTestId('search-input');
  searchButton = (): Locator => this.page.getByTestId('search-button');
  noResultsText = (): Locator => this.page.getByTestId('no-results');

  async goToArticle(articleTitle: string): Promise<void> {
    await this.page.getByText(articleTitle).click();
  }

  async searchArticle(phrase: string): Promise<void> {
    await this.searchInput().fill(phrase);
    await this.searchButton().click();
  }
}

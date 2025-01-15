import { Locator } from '@playwright/test';
import { MainMenuComponent } from '../../components/main-menu.component';
import { BasePage } from '../base/base.page';

export class ArticlesPage extends BasePage {
  url: string = '/articles.html';
  mainMenu: MainMenuComponent = new MainMenuComponent(this.page);
  addArticleButtonLogged = (): Locator => this.page.locator('button#add-new');
}

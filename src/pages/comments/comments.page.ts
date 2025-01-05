import { BasePage } from '../base/base.page';
import { MainMenuComponent } from '../../components/main-menu.component';
export class CommentsPage extends BasePage {
  url: string = '/comments.html';
  mainMenu: MainMenuComponent = new MainMenuComponent(this.page);
}

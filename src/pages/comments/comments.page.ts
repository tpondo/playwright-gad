import { BasePage } from '@_src/pages/base/base.page';
import { MainMenuComponent } from '@_src/components/main-menu.component';
export class CommentsPage extends BasePage {
  url: string = '/comments.html';
  mainMenu: MainMenuComponent = new MainMenuComponent(this.page);
}

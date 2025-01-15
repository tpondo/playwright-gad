import { MainMenuComponent } from '../../components/main-menu.component';
import { BasePage } from '../base/base.page';

export class WelcomePage extends BasePage {
  url: string = '/welcome';
  mainMenu: MainMenuComponent = new MainMenuComponent(this.page);
}

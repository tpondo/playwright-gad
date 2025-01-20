import { MainMenuComponent } from '@_src/components/main-menu.component';
import { BasePage } from '@_src/pages/base/base.page';

export class WelcomePage extends BasePage {
  url: string = '/welcome';
  mainMenu: MainMenuComponent = new MainMenuComponent(this.page);
}

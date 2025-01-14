import { test as base } from '@playwright/test';
import { HomePage } from '../src/pages/home/home.page';
import { ArticlesPage } from '../src/pages/articles/articles.page';
import { CommentsPage } from '../src/pages/comments/comments.page';
import { LoginPage } from '../src/pages/login/login.page';
import { WelcomePage } from '../src/pages/welcome/welcome.page';
import { RegisterPage } from '../src/pages/register/register.page';
import { AddArticleView } from '../src/views/add-article.view';
import { ArticlePage } from '../src/pages/articles/article.page';

type MyType = {
  homePage: HomePage;
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
  loginPage: LoginPage;
  welcomePage: WelcomePage;
  registerPage: RegisterPage;
  addArticleView: AddArticleView;
  articlePage: ArticlePage;
};

export const test = base.extend<MyType>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  articlesPage: async ({ page }, use) => {
    await use(new ArticlesPage(page));
  },
  commentsPage: async ({ page }, use) => {
    await use(new CommentsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  addArticleView: async ({ page }, use) => {
    await use(new AddArticleView(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});

export { expect } from '@playwright/test';

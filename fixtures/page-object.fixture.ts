import { test as base } from '@playwright/test';
import { HomePage } from '../src/pages/home/home.page';
import { ArticlesPage } from '../src/pages/articles/articles.page';
import { CommentsPage } from '../src/pages/comments/comments.page';
import { LoginPage } from '../src/pages/login/login.page';
import { WelcomePage } from '../src/pages/welcome/welcome.page';
import { RegisterPage } from '../src/pages/register/register.page';
import { AddArticleView } from '../src/views/article/add-article.view';
import { AddNewArticleCommentView } from '../src/views/article/add-new-article-comment.view';
import { ArticlePage } from '../src/pages/articles/article.page';
import { CommentPage } from '../src/pages/comments/comment.page';
import { EditArticleCommentView } from '../src/views/article/edit-article-comment.view';

interface Pages {
  homePage: HomePage;
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
  loginPage: LoginPage;
  welcomePage: WelcomePage;
  registerPage: RegisterPage;
  addArticleView: AddArticleView;
  articlePage: ArticlePage;
  addNewArticleCommentView: AddNewArticleCommentView;
  commentPage: CommentPage;
  editArticleCommentView: EditArticleCommentView;
}

export const pageObjectTest = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage: HomePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await use(new ArticlesPage(page));
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage: CommentsPage = new CommentsPage(page);
    await commentsPage.goto();
    await use(commentsPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
  addArticleView: async ({ articlesPage }, use) => {
    const addArticleView: AddArticleView =
      await articlesPage.clickAddArticleButtonLogged();
    await use(addArticleView);
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
  addNewArticleCommentView: async ({ page }, use) => {
    await use(new AddNewArticleCommentView(page));
  },
  commentPage: async ({ page }, use) => {
    await use(new CommentPage(page));
  },
  editArticleCommentView: async ({ page }, use) => {
    await use(new EditArticleCommentView(page));
  },
});

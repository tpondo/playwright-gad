import { test as base } from '@playwright/test';
import { HomePage } from '../src/pages/home/home.page';
import { ArticlesPage } from '../src/pages/articles/articles.page';
import { CommentsPage } from '../src/pages/comments/comments.page';

type MyType = {
  homePage: HomePage;
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
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
});

export { expect } from '@playwright/test';

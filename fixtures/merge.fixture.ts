import { articleTest } from '@_fixtures/article.fixture';
import { pageObjectTest } from '@_fixtures/page-object.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, articleTest);

export { expect } from '@playwright/test';

import { expect, test } from '@_fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/api/response.api';

test.describe('Verify search component for articles', () => {
  test('go button should fetch articles', async ({ articlesPage, page }) => {
    await expect(articlesPage.searchButton()).toBeInViewport();

    const responsePromise = waitForResponse(page, '/api/articles');

    await articlesPage.searchButton().click();

    const response = await responsePromise;
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body).toHaveLength(6);
  });
});

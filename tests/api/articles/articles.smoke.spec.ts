import { test, expect } from '@_fixtures/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles API endpoint', () => {
  test(
    'GET articles returns status code 200',
    { tag: '@smoke-api' },
    async ({ request }) => {
      const statusCode: number = 200;

      const responsePromise: APIResponse = await request.get('/api/articles');

      expect(responsePromise.status()).toBe(statusCode);
    },
  );
});

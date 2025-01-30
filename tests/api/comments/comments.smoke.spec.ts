import { test, expect } from '@_fixtures/merge.fixture';
import { APIResponse } from '@playwright/test';

test('Verify comments GET endpoint', async ({ request }) => {
  const commentsUrl: string = '/api/comments';
  const response: APIResponse = await request.get(commentsUrl);

  await test.step('GET comments returns status code 200', async () => {
    const statusCode: number = 200;

    expect(response.status()).toBe(statusCode);
  });

  const responseJson = await response.json();
  await test.step('GET comments should return at least one comment object', async () => {
    expect.soft(responseJson.length).toBeGreaterThan(0);
  });

  const expectedRequiredFields: Array<string> = [
    'article_id',
    'body',
    'user_id',
    'date',
    'id',
  ];
  const comment = responseJson[0];

  expectedRequiredFields.forEach(async (key) => {
    await test.step(`GET comments should return an object with required field: ${key}`, async () => {
      expect
        .soft(comment, `Expected key "${key}" should be in object`)
        .toHaveProperty(key);
    });
  });
});

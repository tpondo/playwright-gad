import { test, expect } from '@_fixtures/merge.fixture';
import { APIResponse } from '@playwright/test';

test(
  'Verify articles GET endpoint',
  {
    tag: '@smoke-api',
    annotation: { type: 'documentation', description: 'GAD-R08-01' },
  },
  async ({ request }) => {
    const articlesUrl: string = '/api/articles';
    const response: APIResponse = await request.get(articlesUrl);

    await test.step('GET articles returns status code 200', async () => {
      const statusCode: number = 200;

      expect(response.status()).toBe(statusCode);
    });

    const responseJson = await response.json();
    await test.step('GET articles should return at least one article object', async () => {
      expect.soft(responseJson.length).toBeGreaterThan(0);
    });

    const expectedRequiredFields: Array<string> = [
      'id',
      'user_id',
      'title',
      'date',
      'body',
      'image',
    ];
    const article = responseJson[0];

    expectedRequiredFields.forEach(async (value) => {
      await test.step(`GET articles should return an object with required field: ${value}`, async () => {
        expect.soft(article).toHaveProperty(value);
      });
    });
  },
);

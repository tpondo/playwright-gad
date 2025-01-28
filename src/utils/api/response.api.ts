import { RESPONSE_TIMEOUT } from '@_pw-config';
import { Page, Response } from '@playwright/test';

export async function waitForResponse(
  page: Page,
  url: string,
  method?: string,
  status?: number,
): Promise<Response> {
  const responsePromise = page.waitForResponse(
    (response) => {
      // console.log(
      //   response.request().method(),
      //   response.status(),
      //   response.url(),
      // );
      return (
        response.url().includes(url) &&
        (!method || response.request().method() == method) &&
        (!status || response.status() == status)
      );
    },
    { timeout: RESPONSE_TIMEOUT },
  );
  return responsePromise;
}

import { expect, Locator, Page } from '@playwright/test';
import { _logger } from './logger';
import { WaitSize } from '../data-types/enums';

// =>all these waits to shared commons
export async function forElementsVisible(
  elements: any,
  message?: string
): Promise<void> {
  const arrayOfElements: Array<any> = Object.values(elements);
  for (const element of arrayOfElements) {
    await expect(element, message).toBeVisible();
  }
}

export async function forElementsNotVisible(
  elements: any,
  message?: string
): Promise<void> {
  const arrayOfElements: Array<any> = Object.values(elements);
  for (const element of arrayOfElements) {
    await expect(element, message).toBeHidden();
  }
}

export async function forElementsPresent(elements: any): Promise<void> {
  const arrayOfElements: Array<any> = Object.values(elements);
  for (const element of arrayOfElements) {
    await element.waitFor({ state: 'attached' });
  }
}

export async function forElementsNotPresent(elements: any): Promise<void> {
  const arrayOfElements: Array<any> = Object.values(elements);
  for (const element of arrayOfElements) {
    await element.waitFor({ state: 'detached' });
  }
}

export async function forElementVisible(
  locator: Locator,
  message?: string
): Promise<void> {
  await expect(locator, message).toBeVisible();
}

export async function forElementEnabled(
  locator: Locator,
  message?: string
): Promise<void> {
  await expect(locator, message).toBeEnabled();
}

export async function forElementChecked(
  locator: Locator,
  message?: string
): Promise<void> {
  await expect(locator, message).toBeChecked();
}

export async function forElementNotVisible(
  locator: Locator,
  message?: string
): Promise<void> {
  await expect(locator, message).toBeHidden();
}

export async function forUrlContainsAnyOf(
  page: Page,
  urls: string[],
  retry = 50
) {
  let found = false;
  do {
    _logger.debug(`wait for any of urls:${urls}...${retry}`);
    for (const url of urls)
      if (page.url().includes(url)) {
        found = true;
        break;
      }

    retry--;
    await waitForAllEvents(page, WaitSize.s);
  } while (retry >= 0 && !found);
  if (retry === 0) {
    throw new Error(`None of urls ${urls} found`);
  }
}

export async function waitForUrlContains(page: Page, urls: string, retry = 50) {
  await forUrlContainsAnyOf(page, [urls], retry);
}

export async function waitForAnyOfElementsPresent(
  page: Page,
  elements: Locator[],
  retry = 50
) {
  let found = false;
  do {
    _logger.debug(`wait for any of elements...${retry}`);
    for (const element of elements)
      if (await element.isVisible()) {
        found = true;
        break;
      }

    retry--;
    await waitForAllEvents(page, WaitSize.s);
  } while (retry >= 0 && !found);
  if (retry === 0) {
    throw new Error(`None of elements found`);
  }
}

export async function waitForAnyOfElementsContain(
  page: Page,
  elements: Locator[],
  match: string,
  retry = 50
) {
  let found = false;
  do {
    _logger.debug(
      `wait for any of elements to contain: ${match}... retry:${retry}`
    );
    for (const element of elements)
      if ((await element.innerText()).includes(match)) {
        found = true;
        break;
      }

    retry--;
    await waitForAllEvents(page, WaitSize.s);
  } while (retry >= 0 && !found);
  if (retry === 0) {
    throw new Error(`None of elements found`);
  }
}

export async function waitForAllEvents(
  page: Page,
  customSleep: number = WaitSize.s
) {
  await fixedSleep(page, customSleep);
  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');
  await forElementNotVisible(page.locator('button:text("Validating")'));
  await forElementNotVisible(page.locator('.ellipsisLoader'));
}

export async function fixedSleep(page: Page, timeMs: number) {
  await page.waitForTimeout(timeMs);
}

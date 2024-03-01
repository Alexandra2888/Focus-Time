import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.getByTestId('text-input-flat').click();
  await page.getByText('What would you like to focus on?+').click();
  await page.getByTestId('text-input-flat').click();
  await page.getByTestId('text-input-flat').click();
  await page.getByTestId('text-input-flat').fill('code');
  await page.getByTestId('text-input-flat').click();
  await page.getByTestId('text-input-flat').press('Enter');
  await page.getByTestId('text-input-flat').click();
  await page.getByTestId('text-input-flat').press('Enter');
  await page.getByText('+').click();
  await page.locator('div').filter({ hasText: /^start$/ }).nth(1).click();
  await page.getByText('Things we\'ve focused oncodeClear').click();
  await page.getByText('Clear').click();
  await page.locator('#root > div > div > div:nth-child(2)').click();
});
import { test, expect } from '@playwright/test'

test.describe.serial('Home Page Tests', () => {
  let page: any;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('/');
  });

  test('filters transformers by search query', async () => {
    await page.fill('input[type="text"]', 'Bravo');
    await page.click('.search-icon'); // Click on the search icon
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.locator('tbody tr td:first-child')).toHaveText('Transformer Bravo');
  });

  test('toggles chart trace visibility', async () => {
    await page.check('input[id="trace-2"]');
    await expect(page.locator('.plotly-chart')).toBeVisible();
    await expect(page.locator('.plotly-chart .scatterlayer > g:nth-child(1)')).toBeVisible(); // Check that the specific trace is visible
    await page.uncheck('input[id="trace-2"]');
    await expect(page.locator('.plotly-chart')).toBeVisible(); // The chart should still be visible
    await expect(page.locator('.plotly-chart .scatterlayer > g:nth-child(1)')).toBeHidden(); // Check that the specific trace is hidden
  });
});


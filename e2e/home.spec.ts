import { test, expect } from '@playwright/test'

test('filters transformers by search query', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[type="text"]', 'Alpha')
  await expect(page.locator('tbody tr')).toHaveCount(1)
  await expect(page.locator('tbody tr td:first-child')).toHaveText('Transformer Alpha')
})

test('toggles chart trace visibility', async ({ page }) => {
  await page.goto('/')
  await page.check('input[id="trace-1"]')
  await expect(page.locator('.plotly-chart')).toBeVisible()
  await page.uncheck('input[id="trace-1"]')
  await expect(page.locator('.plotly-chart')).toBeVisible() // The chart should still be visible even if one trace is hidden
})


import { test, expect } from '@playwright/test';
import { ParabankPages } from '../../pages/main/parabank_main_page';

test.beforeEach(async ({ page }) => {
  await page.goto('index.htm');
});

test.describe('Page Structure', () => {

test('Page has correct image and text', async ({ page }) => {
  // Parabank image and text are displayed
  const parabank = new ParabankPages(page);
  await parabank.verifyParabankImageAndText();
});

test('Footer navigation options are present', async ({ page }) => {
    // Verify footer navigation options are visible
    const parabank = new ParabankPages(page);
    await parabank.verifyParabankFooterOptions();
});

test('Left navigation options are present', async ({ page }) => {
   // Verify left navigation options
    const parabank = new ParabankPages(page);
    await parabank.verifyLeftNavigationOptions();
  });
});

import { test, expect } from '@playwright/test';
import { ParabankAboutUsPage } from '../../pages/footer/parabank_about_us';

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
});

test('About Us page has correct structure and content', async ({ page }) => {
    
    // Click on About Us link in the Header
    const aboutUs = new ParabankAboutUsPage(page);
    await aboutUs.clickAboutUsLink();
    
    // Verify page title, text and URL content
    await aboutUs.verifyAboutUsPage();
});
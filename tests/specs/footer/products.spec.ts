import { test, expect } from '@playwright/test';
import { ParabankProductsPage } from '../../pages/footer/parabank_products';

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
});

test('Products page has correct structure and content', async ({ page }) => {
    // Click on Products link in the Header
    const productsPage = new ParabankProductsPage(page);
    await productsPage.clickProductsLink();
    // Verify page title, text and URL content
    await productsPage.verifyProductsPage();
});


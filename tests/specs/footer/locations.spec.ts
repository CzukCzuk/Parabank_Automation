import { test, expect } from '@playwright/test';
import { ParabankServicesPage } from '../../pages/footer/parabank_services';

test('Services page has correct structure and content', async ({ page }) => {
    // Navigate to the Home Page
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    // Click on Services link in the Header
    const servicesPage = new ParabankServicesPage(page);
    await servicesPage.clickServicesLink();
    // Verify page title, text and URL content
    await servicesPage.verifyServicesPage();
});

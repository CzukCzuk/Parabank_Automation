import { test, expect } from '@playwright/test';
import { ParabankContactUsPage } from '../../pages/footer/parabank_contact_us';

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/contact.htm');
});

test('Contact Us page has correct structure and content', async ({ page }) => {
    // Verify page title, text and URL content
    const contactUsPage = new ParabankContactUsPage(page);
    await contactUsPage.verifyContactUsPage();
});

test('Contact Us form submission', async ({ page }) => {
    // Fill and submit the Contact Us form
    const contactUsPage = new ParabankContactUsPage(page);
    await contactUsPage.fillContactUsForm('John Doe', 'emailtest+1@test.com', '+123123123', 'This is a test message.');
    await contactUsPage.submitContactUsForm();
    // Verify submission success message
    await contactUsPage.verifyThankYouMessage();
});

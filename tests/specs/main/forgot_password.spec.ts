import { test, expect } from '@playwright/test';
import { ParabankForgotPasswordPage } from '../../pages/main/parabank_forgot_password';
import { ParabankPages } from '../../pages/main/parabank_main_page';

test.beforeEach(async ({ page }) => {
    // Navigate to Parabank Home Page
    const parabank = new ParabankPages(page);
    await page.goto('index.htm');
    // Click on Forgot Password link
    await parabank.navigateToForgotPasswordPage();
});

test.describe('Forgot Password Tests', () => {
    
    test('Forgot Password Page Elements', async ({ page }) => {
        const forgotPasswordPage = new ParabankForgotPasswordPage(page);
        // Verify Forgot Password Page Elements
        await forgotPasswordPage.verifyForgotPasswordElements();
    });

    test('Forgot Password - Submit empty fields', async ({ page }) => {
        const forgotPasswordPage = new ParabankForgotPasswordPage(page);
        // Submit empty fields
        await forgotPasswordPage.submitForgotPasswordForm();
        // Verify error message
        await forgotPasswordPage.verifyEmptyFieldErrors();
    });

    test('Forgot Password - Submit invalid data', async ({ page }) => {
        const forgotPasswordPage = new ParabankForgotPasswordPage(page);
        // Submit invalid data
        await forgotPasswordPage.fillForgotPasswordForm('invalidFirstName', 'invalidLastName', 'invalidAddress', 'invalidCity', 'invalidState', 'invalidZipCode', 'invalidSSN');
        await forgotPasswordPage.submitForgotPasswordForm();
        // Verify error message for invalid data
        await forgotPasswordPage.verifyInvalidUserErrorMessage();
    });

    test('Forgot Password - Submit valid data', async ({ page }) => {
        // The user Olivia Reed was successfully generated during global-setup.ts
        const forgotPasswordPage = new ParabankForgotPasswordPage(page);
        await forgotPasswordPage.verifyForgotPasswordElements();
        // Submit valid data
        await forgotPasswordPage.fillForgotPasswordForm('Olivia', 'Reed', '33 Willow Ln', 'Portland', 'OR', '97205', '765-98-4321');
        await forgotPasswordPage.submitForgotPasswordForm();
        // Verify success message
        await forgotPasswordPage.verifySuccessfulForgotPasswordFlow();
        await page.getByRole('paragraph', { name: 'Username: oliviareed Password: securePass1' });
    });
});

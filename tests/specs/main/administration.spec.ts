import { test, expect } from '@playwright/test';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';

test.beforeEach(async ({ page }) => {
  await page.goto('admin.htm');
});
test.describe('Administration Page Tests', () => {
test('Application settings fields are present on Admin Page', async ({ page }) => {
    const adminPage = new ParabankAdminPage(page);
    await adminPage.verifyApplicationSettingsFields();
});

test('Initial balance verification with acceptable and unacceptable values', async ({ page }) => {
    const adminPage = new ParabankAdminPage(page);
    await adminPage.verifyInitialBalanceFieldAcceptableValues();
});

test('Minimum balance verification with acceptable and unacceptable values', async ({ page }) => {
    const adminPage = new ParabankAdminPage(page);
    await adminPage.verifyMinimumBalanceFieldAcceptableValues();
});

test('Threshold percentage verification with acceptable and unacceptable values', async ({ page }) => {
    const adminPage = new ParabankAdminPage(page);
    await adminPage.verifyThresholdPercentageFieldAcceptableValues();
});

test('Verify loan provider dropdown options', async ({ page }) => {
    const adminPage = new ParabankAdminPage(page);
    await adminPage.verifyLoanProviderOptions();
});

test('Verify loan processor dropdown options', async ({ page }) => {
    const adminPage = new ParabankAdminPage(page);
    await adminPage.verifyLoanProcessorOptions();
});
});

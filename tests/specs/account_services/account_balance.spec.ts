import { test, expect } from '@playwright/test';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { ParabankRegistrationPage, type RegistrationData } from '../../pages/main/parabank_registration_page';
import { AccountsOverviewPage } from '../../pages/account_services/accounts_overview';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as RegistrationData[];

test('Set Initial Balance and register an account to verify balance', async ({ page }) => {
    // Go to Admin Page and set Initial Balance
    await page.goto('admin.htm');
    const adminPage = new ParabankAdminPage(page);
    await adminPage.initialBalanceInput.fill('3000');
    await adminPage.submitButton.click();
    // Wait for settings to be persisted before navigating away
    await page.waitForLoadState('networkidle');

    // Use records[1] directly — this account is NOT pre-registered (skipped in global-setup)
    const data = records[1];

    // Go to registration page
    await page.goto('register.htm');

    const registrationPage = new ParabankRegistrationPage(page);

    // Fill registration form
    await registrationPage.fillRegistrationFormFromCsv(data);

    // Send registration form
    await registrationPage.registerButton.click();
    // Confirm registration succeeded
    await expect(page.getByText(`Welcome ${data.username}`)).toBeVisible({ timeout: 10000 });

    // Verify account balance
    await page.goto('overview.htm');
    const accountsOverview = new AccountsOverviewPage(page);
    await expect(accountsOverview.accountBalance).toHaveText('$3000.00');
});

import { test, expect } from '@playwright/test';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { type RegistrationData } from '../../pages/main/parabank_registration_page';
import { ParabankPages } from '../../pages/main/parabank_main_page';
import { OpenAccountPage } from '../../pages/account_services/open_account';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as RegistrationData[];

test.describe('Open New Account Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');
    });

    test('Open New Account functionality', async ({ page }) => {
        const data = records[11];

        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        // Go to Open New Account page
        await page.goto('openaccount.htm');
        const openAccountPage = new OpenAccountPage(page);
        // Verify Account Type dropdown options
        await openAccountPage.verifyAccountTypeOptions();
        // Verify Open Account elements are visible
        await openAccountPage.verifyOpenAccountPageElements();
        // Open a new account
        await openAccountPage.openNewAccountSuccessfully();
        // Verify Post Open Account elements are visible
        await openAccountPage.verifyPostOpenAccountElements();
    });

    test('Check minimum balance after opening new account', async ({ page }) => {
        // Go to Admin Page and set Minimum Balance
        await page.goto('admin.htm');
        const adminPage = new ParabankAdminPage(page);
        await adminPage.setMinimumBalance('300');

        const data = records[12];

        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        // Go to Open New Account test
        await page.goto('openaccount.htm');
        const openAccountPage = new OpenAccountPage(page);
        // Verify minimum initial deposit
        await openAccountPage.verifyMinimumInitialDeposit('$300.00');
    });
});

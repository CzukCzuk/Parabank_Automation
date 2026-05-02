import { test, expect } from '@playwright/test';
import { ParabankTransferFundsPage } from '../../pages/account_services/transfer_funds';
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

test.describe('Transfer Funds Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');
    });

    test('Transfer Funds', async ({ page }) => {
        const data = records[16];

        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        // Go back to main page for Open New Account test
        await page.goto('openaccount.htm');
        const openAccountPage = new OpenAccountPage(page);
        // Verify Account Type dropdown options
        await openAccountPage.verifyAccountTypeOptions();
        // Verify Open Account elements are visible
        await openAccountPage.verifyOpenAccountPageElements();
        // Open a new account
        await openAccountPage.openNewAccountSuccessfully();
        // Go back to main page for Transfer Funds test
        await page.goto('transfer.htm');
        const transferFundsPage = new ParabankTransferFundsPage(page);
        // Verify Transfer Funds Page elements
        await transferFundsPage.verifyTransferFundsPageElements();
        // Perform a fund transfer
        await transferFundsPage.transferFunds('500', 0, 1);
    });
});

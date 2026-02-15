import { test, expect } from '@playwright/test';
import { ParabankTransferFundsPage } from '../../pages/account services/transfer_funds';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { ParabankRegistrationPage, RegistrationData } from '../../pages/main/parabank_registration_page';
import { OpenAccountPage } from '../../pages/account services/open_account';
import fs from 'fs';
import { parse } from 'csv-parse/sync';



test('Transfer Funds', async ({ page }) => {
    // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[16] as RegistrationData;

    // Register a new user
    const registrationPage = new ParabankRegistrationPage(page);
    await registrationPage.fullRegistration(data);
    // Go back to main page for Open New Account test
    await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
    const openAccountPage = new OpenAccountPage(page);
    // Verify Account Type dropdown options
    await openAccountPage.verifyAccountTypeOptions();
    // Verify Open Account elements are visible
    await openAccountPage.verifyOpenAccountPageElements();
    // Open a new account
    await openAccountPage.openNewAccountSuccessfully();
    // Go back to main page for Transfer Funds test
    await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
    const transferFundsPage = new ParabankTransferFundsPage(page);
    // Verify Transfer Funds Page elements
    await transferFundsPage.verifyTransferFundsPageElements();
    // Perform a fund transfer
    await transferFundsPage.transferFunds('500', 0, 1);
});

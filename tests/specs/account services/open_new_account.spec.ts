import { test, expect } from '@playwright/test';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { ParabankRegistrationPage, RegistrationData } from '../../pages/main/parabank_registration_page';
import { OpenAccountPage } from '../../pages/account services/open_account';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test('Open New Account functionality', async ({ page }) => {
    // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[11] as RegistrationData;

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
    // Verify Post Open Account elements are visible
    await openAccountPage.verifyPostOpenAccountElements();
});

test('Check minimum balance after opening new account', async ({ page }) => {
    // Go to Admin Page and set Minimum Balance
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');
    const adminPage = new ParabankAdminPage(page);
    await adminPage.setMinimumBalance('300');
    
    // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[12] as RegistrationData;

    // Register a new user
    const registrationPage = new ParabankRegistrationPage(page);
    await registrationPage.fullRegistration(data);
    // Go back to main page for Open New Account test
    await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
    const openAccountPage = new OpenAccountPage(page);
    // Verify minimum initial deposit
    await openAccountPage.verifyMinimumInitialDeposit('$300.00');
});

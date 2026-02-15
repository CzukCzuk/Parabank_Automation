import { test, expect } from '@playwright/test';
import { requestLoanPage } from '../../pages/account services/request_loan';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { ParabankRegistrationPage, RegistrationData } from '../../pages/main/parabank_registration_page';
import { OpenAccountPage } from '../../pages/account services/open_account';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { LoginData, ParabankPages } from '../../pages/main/parabank_main_page';

test.describe('Request Loan Tests', () => {
test('Request Loan - Approved Scenario', async ({ page }) => {
    //Navigate to admin page
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');
    //Set Initial Balance
    const adminPage = new ParabankAdminPage(page);
    await adminPage.initialBalanceInput.fill('5000');
    await adminPage.submitButton.click();

    // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[14] as RegistrationData;
    // Register a new user
    const registrationPage = new ParabankRegistrationPage(page);
    await registrationPage.fullRegistration(data);
    // Go back to main page for Request Loan test
    await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
    const requestLoan = new requestLoanPage(page);
    // Verify Request Loan Page UI
    await requestLoan.verifyRequestLoanPageUI();
    // Apply for a loan - Approved scenario
    await requestLoan.applyForLoan('100', '100');
    // Verify Loan Approved UI
    await requestLoan.verifyLoanApprovedUI();
    // Go back to main page for another Request Loan test
    await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
    // Apply for a loan - Denied scenario
    await requestLoan.applyForLoan('5000', '5000');
    // Verify Loan Denied UI
    await requestLoan.verifyLoanDeniedUI();
});

test('Request Loan - Denied Scenario', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
        // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[15] as RegistrationData;
                // Register a new user
                const registrationPage = new ParabankRegistrationPage(page);
                await registrationPage.fullRegistration(data);
    // Navigate to Request Loan page
    await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
    const requestLoan = new requestLoanPage(page);
    // Apply for a loan - Denied scenario
    await requestLoan.applyForLoan('5000', '5000');
    // Verify Loan Denied UI
    await requestLoan.verifyLoanDeniedUI();
});
});


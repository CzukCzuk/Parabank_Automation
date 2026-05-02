import { test, expect } from '@playwright/test';
import { requestLoanPage } from '../../pages/account_services/request_loan';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { type RegistrationData } from '../../pages/main/parabank_registration_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { ParabankPages } from '../../pages/main/parabank_main_page';

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as RegistrationData[];

test.describe('Request Loan Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');
    });

    test('Request Loan - Approved Scenario', async ({ page }) => {
        //Navigate to admin page
        await page.goto('admin.htm');
        //Set Initial Balance
        const adminPage = new ParabankAdminPage(page);
        await adminPage.initialBalanceInput.fill('3000');
        await adminPage.submitButton.click();

        const data = records[14];

        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        // Go back to main page for Request Loan test
        await page.goto('requestloan.htm');
        const requestLoan = new requestLoanPage(page);
        // Verify Request Loan Page UI
        await requestLoan.verifyRequestLoanPageUI();
        // Apply for a loan - Approved scenario
        await requestLoan.applyForLoan('100', '100');
        // Verify Loan Approved UI
        await requestLoan.verifyLoanApprovedUI();

        // Apply for another loan - Denied scenario
        await page.goto('requestloan.htm');
        await requestLoan.applyForLoan('3000', '3000');
        // Verify Loan Denied UI
        await requestLoan.verifyLoanDeniedUI();
    });

    test('Request Loan - Denied Scenario', async ({ page }) => {
        const data = records[15];

        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        // Navigate to Request Loan page
        await page.goto('requestloan.htm');
        const requestLoan = new requestLoanPage(page);
        // Apply for a loan - Denied scenario
        await requestLoan.applyForLoan('5000', '5000');
        // Verify Loan Denied UI
        await requestLoan.verifyLoanDeniedUI();
    });
});

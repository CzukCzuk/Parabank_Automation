import { test, expect } from '@playwright/test';
import { ParabankPages, LoginData } from '../pages/parabank_main_page';
import { ParabankAdminPage } from '../pages/parabank_admin_page';
import { ParabankRegistrationPage, RegistrationData } from '../pages/parabank_registration_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
});

test('Login functionality', async ({ page }) => {
    // Clean database before login test
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');
    const adminPage = new ParabankAdminPage(page);
    await adminPage.cleanDatabase();
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    //Click register button to go to registration page
    const parabankMainPage = new ParabankPages(page);
    await parabankMainPage.clickRegisterButton();
    
    const registrationPage = new ParabankRegistrationPage(page);
    // Loading data from CSV file
        const fileregistration = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const recordsregistration = parse(fileregistration, {
            columns: true,
            skip_empty_lines: true
        });
        const dataregistration = recordsregistration[0] as RegistrationData;
        // Fill registration form
        await registrationPage.fillRegistrationFormFromCsv(dataregistration);
    
        // Send registration form
        await registrationPage.registerButton.click();

    // Go back to main page for login test
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    // Log out after registration
    const parabankPage = new ParabankPages(page);
    await parabankPage.logoutIfLoggedIn();
    
    // Loading data from CSV file
        const file = fs.readFileSync('tests/login_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[0] as LoginData;
    
    const parabank = new ParabankPages(page);
    // Enter valid credentials
    await parabank.fillLogin(data);
    // Click on Login button
    await parabank.clickLoginButton();
    // Verify successful login by a Welcome message
    await parabank.verifySuccessfulLoginMessage()
    // Verify successful login by checking for the presence of the logout button
    await parabank.logoutBUttonVisible();
});

test('Login with invalid credentials', async ({ page }) => {
    const parabank = new ParabankPages(page);
    // Enter invalid credentials
    await parabank.fillLogin({ username: 'invalidUser', password: 'invalidPass' });
    // Click on Login button
    await parabank.clickLoginButton();
    // Verify error message is displayed
    await parabank.verifyInvalidLoginErrorMessage();
});

test('Login with empty credentials', async ({ page }) => {
    const parabank = new ParabankPages(page);
    // Leave username and password fields empty
    await parabank.fillLogin({ username: '', password: '' });
    // Click on Login button
    await parabank.clickLoginButton();
    // Verify error message is displayed
    await parabank.verifyEmptyLoginErrorMessage();
});
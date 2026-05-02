import { test, expect } from '@playwright/test';
import { ParabankPages, type LoginData } from '../../pages/main/parabank_main_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/login_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as LoginData[];

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');
    });

    test('Login functionality', async ({ page }) => {
        const data = records[18];

        const parabank = new ParabankPages(page);
        // Enter valid credentials
        await parabank.fillLogin(data);
        // Click on Login button
        await parabank.clickLoginButton();
        // Verify successful login by a Welcome message
        await parabank.verifySuccessfulLoginMessage()
        // Verify successful login by checking for the presence of the logout button
        await parabank.logoutButtonVisible();
    });

    test('Login with invalid credentials', async ({ page }) => {
        const parabank = new ParabankPages(page);
        // Enter invalid credentials
        await parabank.fillLogin({ username: 'invalidUser5032', password: 'invalidPass' });
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

    test('Log out', async ({ page }) => {
        const data = records[21];
        const parabank = new ParabankPages(page);
        
        // Log in first
        await parabank.fillLogin(data);
        await parabank.clickLoginButton();
        await parabank.verifySuccessfulLoginMessage();
        
        // Now log out
        await parabank.clickLogoutButton();
        
        // Verify that the user is logged out by checking the presence of the login button
        await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    });
});

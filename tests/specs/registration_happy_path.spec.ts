import { test, expect } from '@playwright/test';
import { ParabankRegistrationPage, RegistrationData} from '../pages/parabank_registration_page';
import { ParabankAdminPage } from '../pages/parabank_admin_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test.beforeEach(async ({ page }) => {
    // Clean up database before each test
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');
    const adminPage = new ParabankAdminPage(page);
    await adminPage.cleanDatabase();
    await expect(page.getByText('Database cleaned')).toBeVisible();
}
);

test('User registration - happy path', async ({ page }) => {
    // Loading data from CSV file
    const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
    const records = parse(file, {
        columns: true,
        skip_empty_lines: true
    });
    const data = records[0] as RegistrationData;

    // Go to registration page
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await page.getByRole('link', { name: 'Register' }).click();

    const registrationPage = new ParabankRegistrationPage(page);

    // Fill registration form
    await registrationPage.fillRegistrationFormFromCsv(data);

    // Send registration form
    await registrationPage.registerButton.click();

    // Verify successful registration
    await expect(page.getByText(`Welcome ${data.username}`)).toBeVisible();
    await expect(page.getByText(`Welcome ${data.user_first_name} ${data.user_last_name}`)).toBeVisible();
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();

    // Clean up database
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');

    const adminPage = new ParabankAdminPage(page);
    await adminPage.cleanDatabase();

    await expect(page.getByText('Database cleaned')).toBeVisible();
});
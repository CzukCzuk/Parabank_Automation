import { test, expect } from '@playwright/test';
import { ParabankRegistrationPage, type RegistrationData} from '../../pages/main/parabank_registration_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as RegistrationData[];

test('User registration - happy path', async ({ page }) => {
    // Use records[0] directly — this account is NOT pre-registered (skipped in global-setup)
    const data = records[0];

    // Go to registration page
    await page.goto('register.htm');

    const registrationPage = new ParabankRegistrationPage(page);

    // Fill registration form
    await registrationPage.fillRegistrationFormFromCsv(data);

    // Send registration form
    await registrationPage.registerButton.click();

    // Verify successful registration
    await expect(page.getByText(`Welcome ${data.username}`)).toBeVisible();
    await expect(page.getByText(`Welcome ${data.user_first_name} ${data.user_last_name}`)).toBeVisible();
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();
});

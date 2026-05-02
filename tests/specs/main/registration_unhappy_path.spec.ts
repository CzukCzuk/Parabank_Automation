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

test.beforeEach(async ({ page }) => {
  await page.goto('register.htm');
});

test.describe('Registration Unhappy Path Tests', () => {

    test('User registration - empty fields', async ({ page }) => {
        //Leave all fields empty and try to register
        const registrationPage = new ParabankRegistrationPage(page);
        await registrationPage.registerButton.click();

        // Verify error messages for required fields
        await expect(registrationPage.customerFirstNameError).toHaveText('First name is required.');
        await expect(registrationPage.customerLastNameError).toHaveText('Last name is required.');
        await expect(registrationPage.customerAddressError).toHaveText('Address is required.');
        await expect(registrationPage.customerCityError).toHaveText('City is required.');
        await expect(registrationPage.customerStateError).toHaveText('State is required.');
        await expect(registrationPage.customerZipCodeError).toHaveText('Zip Code is required.');
        await expect(registrationPage.customerPhoneNumberError).toHaveText('Phone number is required.');
        await expect(registrationPage.customerSsnError).toHaveText('SSN is required.');
        await expect(registrationPage.customerUsernameError).toHaveText('Username is required.');
        await expect(registrationPage.customerPasswordError).toHaveText('Password is required.');
        await expect(registrationPage.customerRepeatedPasswordError).toHaveText('Repeated password is required.');
    });

    test('User registration - mismatched passwords', async ({ page }) => {
        const registrationPage = new ParabankRegistrationPage(page);
        
        // Clone record and use a dynamic username to ensure we only test the password mismatch validation
        const data = { ...records[24] };
        data.username = data.username + Date.now().toString();

        await registrationPage.fillRegistrationFormFromCsv(data);
        // Send registration form
        await registrationPage.registerButton.click();
        // Verify error message for mismatched passwords
        await expect(registrationPage.customerRepeatedPasswordError).toHaveText('Passwords did not match.');
    });

    test('User registration - duplicated data', async ({ page }) => {
        const registrationPage = new ParabankRegistrationPage(page);
        
        // The user from record [20] ALREADY exists out-of-the-box thanks to global-setup.ts
        const data = records[20];
        
        // Fill out registration with existing details directly
        await registrationPage.fillRegistrationFormFromCsv(data);
        await registrationPage.registerButton.click();

        // Verify error message for duplicated username is immediately visible
        await expect(page.getByText('This username already exists.')).toBeVisible();
    });
});

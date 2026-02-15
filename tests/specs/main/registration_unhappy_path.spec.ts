import { test, expect } from '@playwright/test';
import { ParabankRegistrationPage, RegistrationData} from '../../pages/main/parabank_registration_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');
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
    // Loading data from CSV file
    const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
    const records = parse(file, {
        columns: true,
        skip_empty_lines: true
    });
    const data = records[24] as RegistrationData;
    await registrationPage.fillRegistrationFormFromCsv(data);
    // Send registration form
    await registrationPage.registerButton.click();
    // Verify error message for mismatched passwords
    await expect(registrationPage.customerRepeatedPasswordError).toHaveText('Passwords did not match.');
});

test('User registration - duplicated data', async ({ page }) => {
    const registrationPage = new ParabankRegistrationPage(page);
    // Loading data from CSV file
    const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
    const records = parse(file, {
        columns: true,
        skip_empty_lines: true
    });
    const data = records[20] as RegistrationData;
    await registrationPage.fillRegistrationFormFromCsv(data);
    // Send registration form
    await registrationPage.registerButton.click();

    // Log out from the first registered user
    await page.goto('https://parabank.parasoft.com/parabank/logout.htm');
    // Try to register again with the same username
    await page.goto('https://parabank.parasoft.com/parabank/register.htm');
    await registrationPage.fillRegistrationFormFromCsv(data);
    await registrationPage.registerButton.click();

    // Verify error message for duplicated username
    await expect(page.getByText('This username already exists.')).toBeVisible();
});
});
import {test, expect} from "@playwright/test";
import {ProfileUpdatePage} from "../../pages/account services/profile_update";
import {ParabankAdminPage} from "../../pages/main/parabank_admin_page";
import {ParabankRegistrationPage, RegistrationData} from "../../pages/main/parabank_registration_page";
import fs from "fs";
import {parse} from "csv-parse/sync";

test.beforeEach(async ({ page }) => {
    // Clean database before Profile Update test
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');
    const adminPage = new ParabankAdminPage(page);
    await adminPage.cleanDatabase();

    // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[13] as RegistrationData;

    // Register a new user
    const registrationPage = new ParabankRegistrationPage(page);
    await registrationPage.fullRegistration(data);
    // Go to Profile Update Page\
    const profileUpdatePage = new ProfileUpdatePage(page);
    await page.goto('https://parabank.parasoft.com/parabank/updateprofile.htm');
});

test.describe('Profile Update Tests', () => {

test(' Profile Update Page Elements are visible', async ({page}) => {
    const profileUpdatePage = new ProfileUpdatePage(page);
    await profileUpdatePage.verifyProfileUpdateElements();
});

test(' Update Profile Information successfully', async ({page}) => {
    const profileUpdatePage = new ProfileUpdatePage(page);
    const firstName = 'JohnUpdate';
    const lastName = 'DoeUpdate';
    const address = '123 Main St Update';
    const city = 'AnytownUpdate';
    const state = 'CAU';
    const zipCode = '54321';
    const phone = '555-54321';
    await profileUpdatePage.clearProfileFields();
    // Waiting for a short time to ensure fields are cleared before filling new data
    await page.waitForTimeout(500);
    await profileUpdatePage.updateProfile(firstName, lastName, address, city, state, zipCode, phone);
    await profileUpdatePage.submitProfileUpdate();
    await profileUpdatePage.verifyProfileUpdatedSuccessfully();
    await profileUpdatePage.verifyUpdatedProfileData(firstName, lastName, address, city, state, zipCode, phone);
});

test(' Profile Update with empty fields', async ({page}) => {
    const profileUpdatePage = new ProfileUpdatePage(page);
    await profileUpdatePage.clearProfileFields();
    await profileUpdatePage.submitProfileUpdate();
    await profileUpdatePage.verifyProfileUpdateErrorMessages();
});
});

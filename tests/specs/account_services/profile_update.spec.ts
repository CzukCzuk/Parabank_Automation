import { test, expect } from "@playwright/test";
import { ProfileUpdatePage } from "../../pages/account_services/profile_update";
import { type RegistrationData } from "../../pages/main/parabank_registration_page";
import { ParabankPages } from '../../pages/main/parabank_main_page';
import fs from "fs";
import { parse } from "csv-parse/sync";

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as RegistrationData[];

test.describe('Profile Update Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');

        const data = records[13];
        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        await page.goto('updateprofile.htm');
    });

    test('Profile Update Page Elements are visible', async ({ page }) => {
        const profileUpdatePage = new ProfileUpdatePage(page);
        await profileUpdatePage.verifyProfileUpdateElements();
    });

    test('Update Profile Information successfully', async ({ page }) => {
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

    test('Profile Update with empty fields', async ({ page }) => {
        const profileUpdatePage = new ProfileUpdatePage(page);
        await profileUpdatePage.clearProfileFields();
        await profileUpdatePage.submitProfileUpdate();
        await profileUpdatePage.verifyProfileUpdateErrorMessages();
    });
});

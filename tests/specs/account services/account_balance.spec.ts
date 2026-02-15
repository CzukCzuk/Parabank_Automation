import { test, expect } from '@playwright/test';
import { ParabankAdminPage } from '../../pages/main/parabank_admin_page';
import { ParabankRegistrationPage, RegistrationData} from '../../pages/main/parabank_registration_page';
import { AccountsOverviewPage } from '../../pages/account services/accounts_overview';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test('Set Initial Balance and register an account to verify balance', async ({ page }) => {
    // Go to Admin Page and set Initial Balance
    await page.goto('https://parabank.parasoft.com/parabank/admin.htm');
    const adminPage = new ParabankAdminPage(page);
    await adminPage.initialBalanceInput.fill('2000');
    await adminPage.submitButton.click();
    // Registration process

    // Loading data from CSV file
    const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
    const records = parse(file, {
        columns: true,
        skip_empty_lines: true
    });
    const data = records[1] as RegistrationData;

    // Go to registration page
    await page.goto('https://parabank.parasoft.com/parabank/about.htm');
    await page.getByRole('link', { name: 'Register' }).click();

    const registrationPage = new ParabankRegistrationPage(page);

    // Fill registration form
    await registrationPage.fillRegistrationFormFromCsv(data);

    // Send registration form
    await registrationPage.registerButton.click();
    // Verify account balance
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
    const accountsOverview = new AccountsOverviewPage(page);
    await expect(accountsOverview.accountBalance).toHaveText('$2000.00');
});
import {test, expect} from '@playwright/test';
import {ParabankBillPayPage} from '../../pages/account services/bill_pay';
import {ParabankAdminPage} from '../../pages/main/parabank_admin_page';
import {ParabankRegistrationPage, RegistrationData} from '../../pages/main/parabank_registration_page';
import { ParabankPages, LoginData } from '../../pages/main/parabank_main_page';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

test.describe('Bill Pay Tests', () => {

    test('Bill Pay Page Elements are visible', async ({page}) => {
        // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[2] as RegistrationData;
        // Register a new user
        const registrationPage = new ParabankRegistrationPage(page);
        await registrationPage.fullRegistration(data);
        // Go to Bill Pay Page
        await page.goto('https://parabank.parasoft.com/parabank/billpay.htm');
        const billPayPage = new ParabankBillPayPage(page);
        await billPayPage.verifyBillPayPageElements();
    });

    test(' Bill Pay successfully', async ({page}) => {
        // Navigate to main page
        await page.goto('https://parabank.parasoft.com/parabank/index.htm')
        // Loading data from CSV file
        const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
        const records = parse(file, {
            columns: true,
            skip_empty_lines: true
        });
        const data = records[3] as RegistrationData;
        // Register a new user
        const registrationPage = new ParabankRegistrationPage(page);
        await registrationPage.fullRegistration(data);
            await page.goto('https://parabank.parasoft.com/parabank/billpay.htm')
            const billPayPage = new ParabankBillPayPage(page);
            const payeeName = 'Payee Name'
            const payeeAddress = 'Payee Address'
            const payeeCity = 'Payee City'
            const payeeState = 'CA'
            const payeeZipCode = '123'
            const payeePhone = '123456789'
            const payeeAccount = '12345'
            const verifyAccount = '12345'
            const amount = '500'

            const fromAccount = await billPayPage.fillBillPayForm(payeeName, payeeAddress, payeeCity, payeeState, payeeZipCode, payeePhone, payeeAccount, verifyAccount, amount);
            await billPayPage.submitBillPayForm();
            await billPayPage.verifyBillPaySuccessMessage(payeeName, amount, fromAccount);
});
})


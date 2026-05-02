import { test, expect } from '@playwright/test';
import { ParabankBillPayPage } from '../../pages/account_services/bill_pay';
import { ParabankPages } from '../../pages/main/parabank_main_page';
import { type RegistrationData } from '../../pages/main/parabank_registration_page';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Load testing data once per spec file outside of tests
const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
const records = parse(file, {
    columns: true,
    skip_empty_lines: true
}) as RegistrationData[];

test.describe('Bill Pay Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');
    });

    test('Bill Pay Page Elements are visible', async ({ page }) => {
        const data = records[2]; // Johnnatan Duplicated

        // Log in as the user 
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        // Go to Bill Pay Page using relative path
        await page.goto('billpay.htm');
        const billPayPage = new ParabankBillPayPage(page);
        await billPayPage.verifyBillPayPageElements();
    });

    test('Bill Pay successfully', async ({ page }) => {
        const data = records[3]; // Jane Smith

        // Log in as the user
        const parabankPage = new ParabankPages(page);
        await parabankPage.fillLogin({ username: data.username, password: data.password });
        await parabankPage.clickLoginButton();

        await page.goto('billpay.htm');
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


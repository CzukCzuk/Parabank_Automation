import {test, expect} from '@playwright/test';
import { ParabankFindsTransactionPage } from '../../pages/account services/find_transaction';
import {ParabankRegistrationPage, RegistrationData} from '../../pages/main/parabank_registration_page';
import {ParabankBillPayPage} from '../../pages/account services/bill_pay';
import { ParabankTransferFundsPage } from '../../pages/account services/transfer_funds';
import { ParabankPages, LoginData } from '../../pages/main/parabank_main_page';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import { OpenAccountPage } from '../../pages/account services/open_account';

    

test.describe('Find Transaction Tests', () => {
    test('Find Transaction Page Elements are visible', async ({page}) => {
         // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });       
        const data = records[4] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
            // Go to Find Transaction Page
            await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
            const findTransactionPage = new ParabankFindsTransactionPage(page);
            await findTransactionPage.verifyFindTransactionPageElements();
    });

    test('Verify Transaction Details', async ({page}) => {
            // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[5] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
                        // Go to main page for Bill Pay test
                        await page.goto('https://parabank.parasoft.com/parabank/billpay.htm');
                        const billPayPage = new ParabankBillPayPage(page);
                        // Verify Bill Pay Page elements
                        await billPayPage.verifyBillPayPageElements();
                        // Fill Bill Pay form
                        await billPayPage.fillBillPayForm(
                            'John Doe',
                            '123 Main St',
                            'Anytown',
                            'CA',
                            '90210',
                            '555-1234',
                            '987654321',
                            '987654321',
                            '850'
                        );
                        // Submit Bill Pay form
                        await billPayPage.submitBillPayForm();
                    // Find the transaction Amount
                    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
                    const findTransactionPage = new ParabankFindsTransactionPage(page);
                    // Select account used during Open Account
                    await findTransactionPage.findByAmount('850');
                    // Click the Find Transactions button
                    await findTransactionPage.findByAmountButton.click();
                    // Click on transaction details name
                    await findTransactionPage.clickTransactionDetailsName();
                    await expect(findTransactionPage.transactionHeader).toBeVisible();
                    const transactionId = await findTransactionPage.getTransactionIdFromUrl();
                    // Verify Transaction Details
                    await findTransactionPage.verifyTransactionDetails({
                        id: transactionId as string,
                        date: findTransactionPage.getTodaysDate(),
                        description: 'Bill Payment to John Doe',
                        type: 'Debit',
                        amount: '$850.00'
                    });
            });

    test('Find Transaction successfully by ID', async ({page}) => {
       // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[6] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
                     await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
                        const openAccountPage = new OpenAccountPage(page);
                        // Verify Account Type dropdown options
                        await openAccountPage.verifyAccountTypeOptions();
                        // Verify Open Account elements are visible
                        await openAccountPage.verifyOpenAccountPageElements();
                        // Open a new account
                        await openAccountPage.openNewAccountSuccessfully();
                        // Go back to main page for Transfer Funds test
                        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
                        const transferFundsPage = new ParabankTransferFundsPage(page);
                        // Verify Transfer Funds Page elements
                        await transferFundsPage.verifyTransferFundsPageElements();
                        // Perform a fund transfer
                        await transferFundsPage.transferFunds('650', 0, 1);
                    
            
                    // Find the transaction Id
                    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
                    const overviewPage = new ParabankFindsTransactionPage(page);
                    const transactionIdValue = await overviewPage.findTransactionId();
                    
                
                    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
                    const findTransactionPage = new ParabankFindsTransactionPage(page);
                    await findTransactionPage.findByTransactionId(transactionIdValue as string);
                    await findTransactionPage.transactionFoundHeader.isVisible();
    });

    test('Find Transaction by Date', async ({page}) => {
        // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[7] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
                     await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
                        const openAccountPage = new OpenAccountPage(page);
                        // Verify Account Type dropdown options
                        await openAccountPage.verifyAccountTypeOptions();
                        // Verify Open Account elements are visible
                        await openAccountPage.verifyOpenAccountPageElements();
                        // Open a new account
                        await openAccountPage.openNewAccountSuccessfully();
                        // Go back to main page for Transfer Funds test
                        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
                        const transferFundsPage = new ParabankTransferFundsPage(page);
                        // Verify Transfer Funds Page elements
                        await transferFundsPage.verifyTransferFundsPageElements();
                        // Perform a fund transfer
                        await transferFundsPage.transferFunds('500', 0, 1);
                

                    // Find the transaction Date
                    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
                    const findTransactionPage = new ParabankFindsTransactionPage(page);
                    await findTransactionPage.findByDate(findTransactionPage.getTodaysDate());
                    // Click the Find Transactions button
                    await findTransactionPage.findByDateButton.click();
                    // Verify transaction results are displayed
                    await findTransactionPage.verifyTransactionResultsByDate();
                    await findTransactionPage.transactionFoundHeader.isVisible();

            });
    test('Find Transaction by Amount', async ({page}) => {
       // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[8] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
                     await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
                        const openAccountPage = new OpenAccountPage(page);
                        // Verify Account Type dropdown options
                        await openAccountPage.verifyAccountTypeOptions();
                        // Verify Open Account elements are visible
                        await openAccountPage.verifyOpenAccountPageElements();
                        // Open a new account
                        await openAccountPage.openNewAccountSuccessfully();
                        // Go back to main page for Transfer Funds test
                        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
                        const transferFundsPage = new ParabankTransferFundsPage(page);
                        // Verify Transfer Funds Page elements
                        await transferFundsPage.verifyTransferFundsPageElements();
                        // Perform a fund transfer
                        await transferFundsPage.transferFunds('750', 0, 1);
                    // Find the transaction Amount
                    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
                    const findTransactionPage = new ParabankFindsTransactionPage(page);
                    // Select account
                    await findTransactionPage.selectAccount(1);
                    await findTransactionPage.findByAmount('750');
                    // Click the Find Transactions button
                    await findTransactionPage.findByAmountButton.click();
                    // Verify transaction results are displayed
                    await findTransactionPage.verifyTransactionResultsByAmount('750');
                    await findTransactionPage.transactionFoundHeader.isVisible();
            });

        test('Find Transaction by Data Range', async ({page}) => {
             // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[9] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
                     await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
                        const openAccountPage = new OpenAccountPage(page);
                        // Verify Account Type dropdown options
                        await openAccountPage.verifyAccountTypeOptions();
                        // Verify Open Account elements are visible
                        await openAccountPage.verifyOpenAccountPageElements();
                        // Open a new account
                        await openAccountPage.openNewAccountSuccessfully();
                        // Go back to main page for Transfer Funds test
                        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
                        const transferFundsPage = new ParabankTransferFundsPage(page);
                        // Verify Transfer Funds Page elements
                        await transferFundsPage.verifyTransferFundsPageElements();
                        // Perform a fund transfer
                        await transferFundsPage.transferFunds('750', 0, 1);
                    
                    // Find the transaction Date
                    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
                    const findTransactionPage = new ParabankFindsTransactionPage(page);
                    await findTransactionPage.findByDateRange(findTransactionPage.getYesterdaysDate(), findTransactionPage.getTomorrowsDate());
                    // Verify transaction results are displayed
                    await findTransactionPage.verifyTransactionResultsByDate();
                    await findTransactionPage.transactionFoundHeader.isVisible();
            });


        test('Find Transaction Empty Field Errors', async ({page}) => {
            // Loading data from CSV file
                const file = fs.readFileSync('tests/registration_data.csv', 'utf-8');
                const records = parse(file, {
                    columns: true,
                    skip_empty_lines: true
                });
                const data = records[10] as RegistrationData;
        
            // Register a new user
            const registrationPage = new ParabankRegistrationPage(page);
            await registrationPage.fullRegistration(data);
                     await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
                        const openAccountPage = new OpenAccountPage(page);
                        // Verify Account Type dropdown options
                        await openAccountPage.verifyAccountTypeOptions();
                        // Verify Open Account elements are visible
                        await openAccountPage.verifyOpenAccountPageElements();
                        // Open a new account
                        await openAccountPage.openNewAccountSuccessfully();
                        // Go back to main page for Transfer Funds test
                        await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
                        const transferFundsPage = new ParabankTransferFundsPage(page);
                        // Verify Transfer Funds Page elements
                        await transferFundsPage.verifyTransferFundsPageElements();
                        // Perform a fund transfer
                        await transferFundsPage.transferFunds('750', 0, 1);
                    // Find the transaction Amount
                    await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
                    const findTransactionPage = new ParabankFindsTransactionPage(page);
                    await findTransactionPage.verifyEmptyFieldErrors();
            });
});
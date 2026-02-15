import {expect, type Locator, type Page} from "@playwright/test";
import { get } from "http";

// Find Transaction Page Locators
export class ParabankFindsTransactionPage {
    readonly page: Page;
    readonly findTransactionHeader: Locator;
    readonly selectAccountDropdown: Locator;
    readonly findByTransactionIdField: Locator;
    readonly findByTransactionIdButton: Locator;
    readonly findByDateField: Locator;
    readonly findByDateButton: Locator;
    readonly findByDateRangeFromField: Locator;
    readonly findByDateRangeToField: Locator;
    readonly findByDateRangeButton: Locator;
    readonly findByAmountField: Locator;
    readonly findByAmountButton: Locator;
    readonly findByDateError: Locator;
    readonly findByDateRangeError: Locator;
    readonly transactionHeader: Locator;
    readonly transactionID: Locator;
    readonly transactionDate: Locator;
    readonly transactionDescription: Locator;
    readonly transactionType: Locator;
    readonly transactionAmount: Locator;
    readonly transactionFoundHeader: Locator;
    readonly transactionDetailsName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.findTransactionHeader = page.getByRole('heading', { name: 'Find Transactions' });
        this.selectAccountDropdown = page.locator('#accountId');
        this.findByTransactionIdField = page.locator('#transactionId');
        this.findByTransactionIdButton = page.getByRole('button', { name: 'Find Transactions' }).first();
        this.findByDateField = page.locator('#transactionDate');
        this.findByDateButton = page.locator('#findByDate');
        this.findByDateRangeFromField = page.locator('#fromDate');
        this.findByDateRangeToField = page.locator('#toDate');
        this.findByDateRangeButton = page.locator('#findByDateRange');
        this.findByAmountField = page.locator('#amount');
        this.findByAmountButton = page.locator('#findByAmount');
        this.findByDateError = page.locator('#transactionDateError');
        this.findByDateRangeError = page.locator('#dateRangeError');
        this.transactionFoundHeader = page.getByRole('heading', { name: 'Transaction Results' });
        this.transactionHeader = page.getByRole('heading', { name: 'Transaction Details' });
        this.transactionID = this.getValueByLabel('Transaction ID');
        this.transactionDate = this.getValueByLabel('Date');
        this.transactionDescription = this.getValueByLabel('Description');
        this.transactionType = this.getValueByLabel('Type');
        this.transactionAmount = this.getValueByLabel('Amount');
        this.transactionDetailsName = page.getByText('Bill Payment to John Doe')
    }

    private getValueByLabel(label: string): Locator {
    return this.page.locator('tr', {
      has: this.page.locator('td', { hasText: label }),
    }).locator('td').nth(1);
  }

        // Verify Find Transactions Page elements
        async verifyFindTransactionPageElements() {
            await expect(this.findTransactionHeader).toBeVisible();
            await expect(this.selectAccountDropdown).toBeVisible();
            await expect(this.findByTransactionIdField).toBeVisible();
            await expect(this.findByTransactionIdButton).toBeVisible();
            await expect(this.findByDateField).toBeVisible();
            await expect(this.findByDateButton).toBeVisible();
            await expect(this.findByDateRangeFromField).toBeVisible();
            await expect(this.findByDateRangeToField).toBeVisible();
            await expect(this.findByDateRangeButton).toBeVisible();
            await expect(this.findByAmountField).toBeVisible();
            await expect(this.findByAmountButton).toBeVisible();
        }
    
    // Verify empty fields error messages
    async verifyEmptyFieldErrors() {
        await this.findByTransactionIdButton.click();
        await expect(this.page.getByText('Invalid transaction ID')).toBeVisible();
        await this.findByDateButton.click();
        await expect(this.findByDateError).toBeVisible();
        await this.findByDateRangeButton.click();
        await expect(this.findByDateRangeError).toBeVisible();
        await this.findByAmountButton.click();
        await expect(this.page.getByText('Invalid amount')).toBeVisible();
    }

    // Find Transaction ID
    async findTransactionId() {
        await this.page.locator('#accountTable > tbody > tr:nth-child(1) > td:nth-child(1) > a').click();
        await this.page.locator('#transactionTable > tbody > tr:nth-child(1) > td:nth-child(2)').click();
        const transactionId = await this.page.locator('#rightPanel > table > tbody > tr:nth-child(1) > td:nth-child(2)').textContent();
        return transactionId;
    }

    // Find by Transaction ID
    async findByTransactionId(transactionId: string) {
        await this.findByTransactionIdField.fill(transactionId);
        await this.findByTransactionIdButton.click();

    }

    // Provide a todays date in MM-DD-YYYY format
    getTodaysDate(): string {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        return `${month}-${day}-${year}`;
    }

    // Provide a yesterdays date in MM-DD-YYYY format
    getYesterdaysDate(): string {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        return `${month}-${day}-${year}`;
    }

    // Provide tomorrows date in MM-DD-YYYY format
    getTomorrowsDate(): string {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        return `${month}-${day}-${year}`;
    }

    // Find by Date
    async findByDate(date: string) {
        await this.findByDateField.fill(date);
    }

    // Find by Date Range
    async findByDateRange(fromDate: string, toDate: string) {
        await this.findByDateRangeFromField.fill(fromDate);
        await this.findByDateRangeToField.fill(toDate);
        await this.findByDateRangeButton.click();
    }

    // Confirm if transaction results are displayed by Date
    async verifyTransactionResultsByDate() {
        await expect(this.transactionFoundHeader).toBeVisible();
        await expect(this.page.locator('#transactionTable')).toBeVisible();
        await expect(this.page.locator('#transactionBody')).toContainText(new RegExp(`^.*${this.getTodaysDate()}.*$`));
        
    }

    // Select account
    async selectAccount(accountIndex: number) {
        await this.selectAccountDropdown.selectOption({ index: accountIndex });
    }
    // Find by Amount
    async findByAmount(amount: string) {
        await this.findByAmountField.fill(amount);
        await this.findByAmountButton.click();
    }

    // Confirm if transaction results are displayed by Amount
    async verifyTransactionResultsByAmount(amount: string) {
        await expect(this.transactionFoundHeader).toBeVisible();
        await expect(this.page.locator('#transactionTable')).toBeVisible();
        await expect(this.page.locator('#transactionBody')).toContainText(new RegExp(`^.*${amount}.*$`));
    }

    // Verify Transaction Details
    async verifyTransactionDetails(expectedDetails: { id: string; date: string; description: string; type: string; amount: string; }) {
        await expect(this.transactionHeader).toBeVisible();
        await expect(this.transactionID).toHaveText(expectedDetails.id);
        await expect(this.transactionDate).toHaveText(expectedDetails.date);
        await expect(this.transactionDescription).toHaveText(expectedDetails.description);
        await expect(this.transactionType).toHaveText(expectedDetails.type);
        await expect(this.transactionAmount).toHaveText(expectedDetails.amount);
    }

    // Click transaction details name
    async clickTransactionDetailsName() {
        await this.transactionDetailsName.click();
    }

    async getTransactionIdFromUrl(): Promise<string | null> {
  const url = new URL(this.page.url());
  return url.searchParams.get('id');
}
}


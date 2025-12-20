import { expect, type Locator, type Page } from "@playwright/test";


// Admin Page Locators
export class OpenAccountPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountDropdown: Locator;
  readonly openNewAccountButton: Locator;
  readonly accountOpenedHeader: Locator;
  readonly accountOpenedNumber: Locator;
  readonly successMessage: Locator;
  readonly minimumBalanceMessage: Locator;

    constructor(page: Page) {
        // Open Account Page Locators
        this.page = page;
        this.pageHeader = page.getByRole('heading', { name: 'Open New Account' });
        this.accountTypeDropdown = page.locator('#type');
        this.fromAccountDropdown = page.locator('#fromAccountId');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.successMessage = page.getByText('Congratulations, your account is now open.');
        this.accountOpenedHeader = page.getByRole('heading', { name: 'Account Opened!' });
        this.accountOpenedNumber = page.getByRole('link', { name: /^\d+$/ });
        this.minimumBalanceMessage = page.getByText('A minimum of');
    }
    // Verify account type dropdown options
    async verifyAccountTypeOptions() {
        const options = this.accountTypeDropdown.locator('option');
        await expect(options).toHaveCount(2);
        await expect(options).toHaveText([
            'CHECKING',
            'SAVINGS',
        ]);
    }
    // Verify Open Account Page elements
    async verifyOpenAccountPageElements() {
        await expect(this.pageHeader).toBeVisible();
        await expect(this.accountTypeDropdown).toBeVisible();
        await expect(this.fromAccountDropdown).toBeVisible();
        await expect(this.openNewAccountButton).toBeVisible();
    }
    // Click the Open New Account button
    async openNewAccountSuccessfully() {
  // Select account type
  await this.accountTypeDropdown.selectOption('CHECKING');

  // Select an existing account (first option)
  await this.fromAccountDropdown.selectOption({ index: 0 });

  // Click button
  await this.openNewAccountButton.click();
    }
    // Verify post Open Account elements
    async verifyPostOpenAccountElements() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.accountOpenedHeader).toBeVisible();
        await expect(this.accountOpenedNumber).toBeVisible();
    }
    // Verify minimum initial deposit message
    async verifyMinimumInitialDeposit(minimumDeposit: string) {
        await expect(this.minimumBalanceMessage).toHaveText(`A minimum of ${minimumDeposit} must be deposited into this account at time of opening. Please choose an existing account to transfer funds into the new account.`);
    }
}
import { expect, type Locator, type Page } from "@playwright/test";

// Admin Page Locators
export class ParabankAdminPage {
  readonly page: Page;
  readonly cleanDatabaseButton: Locator;
  readonly initialBalanceInput: Locator;
  readonly minimumBalanceInput: Locator;
  readonly loanProviderDropdown: Locator;
  readonly loanProcessorDropdown: Locator;
  readonly threshdolPercentageInput: Locator;
  readonly submitButton: Locator;
  

    constructor(page: Page) {
        // Admin Page Locators
        this.page = page;
        this.cleanDatabaseButton = page.getByRole('button', { name: 'Clean' });
        this.initialBalanceInput = page.locator('#initialBalance');
        this.minimumBalanceInput = page.locator('#minimumBalance');
        this.loanProviderDropdown = page.locator('#loanProvider');
        this.loanProcessorDropdown = page.locator('#loanProcessor');
        this.threshdolPercentageInput = page.locator('#loanProcessorThreshold');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async cleanDatabase() {
        await this.cleanDatabaseButton.click();
    }

    // Application Settings Verification
    async verifyApplicationSettingsFields() {
        await expect(this.initialBalanceInput).toBeVisible();
        await expect(this.minimumBalanceInput).toBeVisible();
        await expect(this.loanProviderDropdown).toBeVisible();
        await expect(this.loanProcessorDropdown).toBeVisible();
        await expect(this.threshdolPercentageInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
    }

    //Check acceptable values for Initial Balance field
    async verifyInitialBalanceFieldAcceptableValues() {
        await this.initialBalanceInput.fill('1000');
        await this.submitButton.click();
        await expect(this.initialBalanceInput).toHaveValue('1000');
        await this.initialBalanceInput.fill('0');
        await this.submitButton.click();
        await expect(this.initialBalanceInput).toHaveValue('0');
        await this.initialBalanceInput.fill('abc');
        await this.submitButton.click();
        await expect(this.page.locator('.error')).toHaveText('Please enter a valid amount.');
        await this.initialBalanceInput.fill('');
        await this.submitButton.click();
        await expect(this.page.locator('.error')).toHaveText('Initial balance is required.');
    }
    //Check acceptable values for Minimum Balance field
    async verifyMinimumBalanceFieldAcceptableValues() {
        await this.minimumBalanceInput.fill('500');
        await this.submitButton.click();
        await expect(this.minimumBalanceInput).toHaveValue('500');
        await this.minimumBalanceInput.fill('0');
        await this.submitButton.click();
        await expect(this.minimumBalanceInput).toHaveValue('0');
        await this.minimumBalanceInput.fill('abc');
        await this.submitButton.click();
        await expect(this.page.locator('.error')).toHaveText('Please enter a valid amount.');
        await this.minimumBalanceInput.fill('');
        await this.submitButton.click();
        await expect(this.page.locator('.error')).toHaveText('Minimum balance is required.');        
    }

    //Check acceptable values for Threshold Percentage field
    async verifyThresholdPercentageFieldAcceptableValues() {
        await this.threshdolPercentageInput.fill('10');
        await this.submitButton.click();
        await expect(this.threshdolPercentageInput).toHaveValue('10');
        await this.threshdolPercentageInput.fill('0');
        await this.submitButton.click();
        await expect(this.threshdolPercentageInput).toHaveValue('0');
        await this.threshdolPercentageInput.fill('abc');
        await this.submitButton.click();
        await expect(this.page.locator('.error')).toHaveText('Please enter a valid number.');
        await this.threshdolPercentageInput.fill('');
        await this.submitButton.click();
        await expect(this.page.locator('.error')).toHaveText('Threshold is required.');
        
    }

    //Loan Provider options verification
    async verifyLoanProviderOptions() {
        const options = this.loanProviderDropdown.locator('option');
        await expect(options).toHaveCount(3);
        await expect(options).toHaveText([
            'JMS',
            'Web Service',
            'Local',
  ]);
}
    //Loan Processor options verification
    async verifyLoanProcessorOptions() {
        const options = this.loanProcessorDropdown.locator('option');
        await expect(options).toHaveCount(3);
        await expect(options).toHaveText([
            'Available Funds',
            'Down Payment',
            'Combined',
  ]);
}
    // Set Minimum Balance
    async setMinimumBalance(amount: string) {
        await this.minimumBalanceInput.fill(amount);
        await this.submitButton.click();
    }
}

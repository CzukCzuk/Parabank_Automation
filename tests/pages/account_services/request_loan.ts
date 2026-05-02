import {expect, type Locator, type Page} from "@playwright/test";

export class requestLoanPage {
    readonly page: Page;
    readonly requestLoanHeader: Locator;
    readonly loanAmountInput: Locator;
    readonly downPaymentInput: Locator
    readonly fromAccountSelect: Locator;
    readonly applyNowButton: Locator;
    readonly loanApprovedHeader: Locator;
    readonly loanDeniedHeader: Locator;
    readonly loanProvider: Locator;
    readonly dateOfLoan: Locator;
    readonly loanStatus: Locator;
    readonly loanMessageApproved: Locator;
    readonly newAccountNumber: Locator;
    readonly loanMessageDenied: Locator;

    constructor(page: Page) {
        this.page = page
        this.requestLoanHeader = page.getByRole('heading', { name: 'Apply for a Loan' });
        this.loanAmountInput = page.locator('#amount');
        this.downPaymentInput = page.locator('#downPayment');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
        this.loanApprovedHeader = page.getByRole('heading', { name: 'Loan Request Processed' });
        this.loanProvider = page.locator('#loanProviderName');
        this.dateOfLoan = page.locator('#responseDate');
        this.loanStatus = page.locator('#loanStatus');
        this.loanMessageApproved = page.getByText('Congratulations, your loan has been approved.');
        this.newAccountNumber = page.locator('#newAccountId');
        this.loanMessageDenied = page.getByText('You do not have sufficient funds for the given down payment.');
        this.loanDeniedHeader = page.getByRole('heading', { name: 'Loan Request Processed' });
    }

    async verifyRequestLoanPageUI() {
        await expect(this.requestLoanHeader).toBeVisible();
        await expect(this.loanAmountInput).toBeVisible();
        await expect(this.downPaymentInput).toBeVisible();
        await expect(this.fromAccountSelect).toBeVisible();
        await expect(this.applyNowButton).toBeVisible();
    }

    async applyForLoan(loanAmount: string, downPayment: string) {
        await this.loanAmountInput.fill(loanAmount);
        await this.downPaymentInput.fill(downPayment);
        // Select first available (non-disabled) account dynamically
    const firstAccountValue = await this.fromAccountSelect
        .locator('option:not([disabled])')
        .first()
        .getAttribute('value');

        await this.fromAccountSelect.selectOption(firstAccountValue);
        await this.applyNowButton.click();
    }

    async verifyLoanApprovedUI() {
        await expect(this.loanApprovedHeader).toBeVisible();
        await expect(this.loanProvider).toBeVisible();
        await expect(this.dateOfLoan).toBeVisible();
        await expect(this.loanStatus).toBeVisible();
        await expect(this.loanMessageApproved).toBeVisible();
        await expect(this.newAccountNumber).toBeVisible();
    }

    async verifyLoanDeniedUI() {
        await expect(this.loanDeniedHeader).toBeVisible();
        await expect(this.loanProvider).toBeVisible();
        await expect(this.dateOfLoan).toBeVisible();
        await expect(this.loanStatus).toBeVisible();
        await expect(this.loanMessageDenied).toBeVisible();
    }
}
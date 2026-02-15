import { expect, type Locator, type Page } from "@playwright/test";

export class ParabankTransferFundsPage {
    readonly page: Page;
    readonly transferFundsHeader: Locator;
    readonly transferFundsAmountInput: Locator;
    readonly transferFundsFromAccountSelect: Locator;
    readonly transferFundsToAccountSelect: Locator;
    readonly transferFundsButton: Locator;
    readonly transferFundsSuccessHeader: Locator;
    readonly transferFundsSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferFundsHeader = page.getByRole('heading', { name: 'Transfer Funds' });
        this.transferFundsAmountInput = page.locator('#amount');
        this.transferFundsFromAccountSelect = page.locator('#fromAccountId');
        this.transferFundsToAccountSelect = page.locator('#toAccountId');
        this.transferFundsButton = page.getByRole('button', { name: 'Transfer' });
        this.transferFundsSuccessHeader = page.locator('text=Transfer Complete!');
        this.transferFundsSuccessMessage = page.getByText('has been transferred');
    }
    // Verify Transfer Funds Page elements
    async verifyTransferFundsPageElements() {
        await expect(this.transferFundsHeader).toBeVisible();
        await expect(this.transferFundsAmountInput).toBeVisible();
        await expect(this.transferFundsFromAccountSelect).toBeVisible();
        await expect(this.transferFundsToAccountSelect).toBeVisible();
        await expect(this.transferFundsButton).toBeVisible();
    }
    async transferFunds(amount: string, fromAccountId: number, toAccountId: number) {
    await this.transferFundsAmountInput.fill(amount);
    await this.transferFundsFromAccountSelect.selectOption({ index: fromAccountId });
    await this.transferFundsToAccountSelect.selectOption({ index: toAccountId });
    // Get actual selected account values
    const fromAccountValue = await this.transferFundsFromAccountSelect.inputValue();
    const toAccountValue = await this.transferFundsToAccountSelect.inputValue();
    await this.transferFundsButton.click();
    await expect(this.transferFundsSuccessHeader).toBeVisible();
    // Trim leading/trailing whitespace from the message
    const successText = (await this.transferFundsSuccessMessage.textContent())?.trim();
    expect(successText).toBe(
        `$${amount}.00 has been transferred from account #${fromAccountValue} to account #${toAccountValue}.`
    );
}
}

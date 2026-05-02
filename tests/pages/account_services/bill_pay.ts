import {expect, type Locator, type Page} from "@playwright/test";

export class ParabankBillPayPage {
    readonly page: Page;
    readonly billPayHeader: Locator;
    readonly billPayText: Locator;
    readonly payeeNameInput: Locator;
    readonly payeeAddressInput: Locator
    readonly payeeCityInput: Locator;
    readonly payeeStateInput: Locator
    readonly payeeZipCodeInput: Locator;
    readonly payeePhoneInput: Locator;
    readonly payeeAccountInput: Locator;
    readonly verifyAccountInput: Locator;
    readonly amountInput: Locator;
    readonly fromAccountSelect: Locator;
    readonly sendPaymentButton: Locator;
    readonly successMessageHeader: Locator;
    readonly successMessage: Locator;
    readonly payeeNameError: Locator;
    readonly payeeAddressError: Locator;
    readonly payeeCityError: Locator;
    readonly payeeStateError: Locator;
    readonly payeeZipCodeError: Locator;
    readonly payeePhoneError: Locator;
    readonly payeeAccountError: Locator;
    readonly verifyAccountError: Locator;
    readonly accountNotMatchError: Locator;
    readonly amountEmptyError: Locator;

    constructor(page: Page) {
        this.page = page
        this.billPayHeader = page.getByRole('heading', { name: 'Bill Payment Service' });
        this.billPayText = page.getByText('Enter payee information');
        this.payeeNameInput = page.locator('input[name="payee.name"]');
        this.payeeAddressInput = page.locator('input[name="payee.address.street"]');
        this.payeeCityInput = page.locator('input[name="payee.address.city"]');
        this.payeeStateInput = page.locator('input[name="payee.address.state"]');
        this.payeeZipCodeInput = page.locator('input[name="payee.address.zipCode"]');
        this.payeePhoneInput = page.locator('input[name="payee.phoneNumber"]');
        this.payeeAccountInput = page.locator('input[name="payee.accountNumber"]');
        this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
        this.amountInput = page.locator('input[name="amount"]');
        this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.successMessageHeader = page.getByRole('heading', { name: 'Bill Payment Complete' })
        this.successMessage = page.getByText('was successful');
        this.payeeNameError = page.getByText('Payee name is required.');
        this.payeeAddressError = page.getByText('Address is required.');
        this.payeeCityError = page.getByText('City is required.');
        this.payeeStateError = page.getByText('State is required.');
        this.payeeZipCodeError = page.getByText('Zip Code is required.');
        this.payeePhoneError = page.getByText('Phone number is required.');
        this.payeeAccountError = page.getByText('Account number is required.');
        this.verifyAccountError = page.getByText('Account number is required.');
        this.accountNotMatchError = page.getByText('The account numbers do not match');
        this.amountEmptyError = page.getByText('The amount cannot be empty.');
    }
    // Verify Bill Pay Page Elements
    async verifyBillPayPageElements() {
        await expect(this.billPayHeader).toBeVisible();
        await expect(this.billPayText).toBeVisible();
        await expect(this.payeeNameInput).toBeVisible();
        await expect(this.payeeAddressInput).toBeVisible();
        await expect(this.payeeCityInput).toBeVisible();
        await expect(this.payeeStateInput).toBeVisible();
        await expect(this.payeeZipCodeInput).toBeVisible();
        await expect(this.payeePhoneInput).toBeVisible();
        await expect(this.payeeAccountInput).toBeVisible();
        await expect(this.verifyAccountInput).toBeVisible();
        await expect(this.amountInput).toBeVisible();
        await expect(this.fromAccountSelect).toBeVisible();
        await expect(this.sendPaymentButton).toBeVisible();
    }

    // Fill Bill Pay Form
    async fillBillPayForm(payeeName: string, payeeAddress: string, payeeCity: string, payeeState: string, payeeZipCode: string, payeePhone: string, payeeAccount: string, verifyAccount: string, amount: string) {
        await this.payeeNameInput.fill(payeeName);
        await this.payeeAddressInput.fill(payeeAddress);
        await this.payeeCityInput.fill(payeeCity);
        await this.payeeStateInput.fill(payeeState);
        await this.payeeZipCodeInput.fill(payeeZipCode);
        await this.payeePhoneInput.fill(payeePhone);
        await this.payeeAccountInput.fill(payeeAccount);
        await this.verifyAccountInput.fill(verifyAccount);
        await this.amountInput.fill(amount);
        const fromAccount = await this.fromAccountSelect.inputValue();
  return fromAccount;
    }
    // Submit Bill Pay Form
    async submitBillPayForm() {
        await this.sendPaymentButton.click();
    }

    // Verify Bill Pay Success Message
    async verifyBillPaySuccessMessage(payeeName: string, amount: string, fromAccount: string) {
    await expect(
    this.page.getByText(
      `Bill Payment to ${payeeName} in the amount of $${amount}.00 from account ${fromAccount} was successful.`
    )
  ).toBeVisible();
}
    // Verify Bill Pay Error Messages
    async verifyBillPayEmptyErrorMessages() {
        await expect(this.payeeNameError).toBeVisible();
        await expect(this.payeeAddressError).toBeVisible();
        await expect(this.payeeCityError).toBeVisible();
        await expect(this.payeeStateError).toBeVisible();
        await expect(this.payeeZipCodeError).toBeVisible();
        await expect(this.payeePhoneError).toBeVisible();
        await expect(this.payeeAccountError).toBeVisible();
        await expect(this.verifyAccountError).toBeVisible();
        await expect(this.accountNotMatchError).toBeVisible();
        await expect(this.amountEmptyError).toBeVisible();
    }

    // Verify Account Number Mismatch Error
    async verifyAccountNumberMismatchError() {
        await this.payeeAccountInput.fill('123456');
        await this.verifyAccountInput.fill('654321');
        await this.sendPaymentButton.click();
        await expect(this.accountNotMatchError).toBeVisible();
    }
}
import {expect, type Locator, type Page} from "@playwright/test";

//Forgot Password Page Locators
export class ParabankForgotPasswordPage {
  readonly page: Page;
  readonly forgotPasswordHeader: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly ssnInput: Locator;
  readonly findMyLoginInfoButton: Locator;
  readonly forgotPasswordInfoText: Locator;
  readonly emptyFirstNameError: Locator;
  readonly emptyLastNameError: Locator
  readonly emptyAddressError: Locator;
  readonly emptyCityError: Locator;
  readonly emptyStateError: Locator;
  readonly emptyZipCodeError: Locator;
  readonly emptySsnError: Locator;
  readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.forgotPasswordHeader = page.getByRole('heading', { name: 'Customer Lookup' });
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
        this.addressInput = page.locator('[id="address.street"]');
        this.cityInput = page.locator('[id="address.city"]');
        this.stateInput = page.locator('[id="address.state"]');
        this.zipCodeInput = page.locator('[id="address.zipCode"]');
        this.ssnInput = page.locator('[id="ssn"]');
        this.findMyLoginInfoButton = page.getByRole('button', { name: 'Find My Login Info' });
        this.forgotPasswordInfoText = page.getByText('Please fill out the following information in order to validate your account.');
        this.emptyFirstNameError = page.getByText('First Name is required.');
        this.emptyLastNameError = page.getByText('Last Name is required.');
        this.emptyAddressError = page.getByText('Address is required.');
        this.emptyCityError = page.getByText('City is required.');
        this.emptyStateError = page.getByText('State is required.');
        this.emptyZipCodeError = page.getByText('Zip Code is required.');
        this.emptySsnError = page.getByText('Social Security Number is required.');
        this.errorMessage = page.getByText('The customer information provided could not be found.');
    }
    // Verify Forgot Password Page Elements
    async verifyForgotPasswordElements() {
        await expect(this.forgotPasswordHeader).toBeVisible();
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.addressInput).toBeVisible();
        await expect(this.cityInput).toBeVisible();
        await expect(this.stateInput).toBeVisible();
        await expect(this.zipCodeInput).toBeVisible();
        await expect(this.ssnInput).toBeVisible();
        await expect(this.findMyLoginInfoButton).toBeVisible();
    }

    // Fill Forgot Password Form
    async fillForgotPasswordForm(firstName: string, lastName: string, address: string, city: string, state: string, zipCode: string, ssn: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipCodeInput.fill(zipCode);
        await this.ssnInput.fill(ssn);
    }
    // Submit Forgot Password Form
    async submitForgotPasswordForm() {
        await this.findMyLoginInfoButton.click();
    }

    // Verify Empty Field Errors
    async verifyEmptyFieldErrors() {
        await expect(this.emptyFirstNameError).toBeVisible();
        await expect(this.emptyLastNameError).toBeVisible();
        await expect(this.emptyAddressError).toBeVisible();
        await expect(this.emptyCityError).toBeVisible();
        await expect(this.emptyStateError).toBeVisible();
        await expect(this.emptyZipCodeError).toBeVisible();
        await expect(this.emptySsnError).toBeVisible();
    }

    // Verify Invalid User Error Message
    async verifyInvalidUserErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }

    // Successful Forgot Password Flow Verification
    async verifySuccessfulForgotPasswordFlow() {
        await expect(this.page.getByText('Your login information was located successfully. You are now logged in.')).toBeVisible();
        
    }
}

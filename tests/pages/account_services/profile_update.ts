import {expect, type Locator, type Page} from "@playwright/test";

export class ProfileUpdatePage {
    readonly page: Page;
    readonly profileUpdateHeader: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly updateProfileButton: Locator;
    readonly successMessage: Locator;
    readonly profileUpdatedHeader: Locator;
    readonly firstNameError: Locator
    readonly lastNameError: Locator
    readonly addressError: Locator
    readonly cityError: Locator
    readonly stateError: Locator
    readonly zipCodeError: Locator
    readonly phoneError: Locator

    constructor(page: Page) {
        this.page = page
        this.profileUpdateHeader = page.getByRole('heading', { name: 'Update Profile' });
        this.firstNameInput = page.locator('[id="customer.firstName"]');
        this.lastNameInput = page.locator('[id="customer.lastName"]');
        this.addressInput = page.locator('[id="customer.address.street"]');
        this.cityInput = page.locator('[id="customer.address.city"]');
        this.stateInput = page.locator('[id="customer.address.state"]');
        this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
        this.phoneInput = page.locator('[id="customer.phoneNumber"]');
        this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
        this.successMessage = page.getByText('Your updated address and phone number have been added to the system.');
        this.profileUpdatedHeader = page.getByRole('heading', { name: 'Profile Updated' });
        this.firstNameError = page.getByRole('cell', { name: 'First name is required.' });
        this.lastNameError = page.getByRole('cell', { name: 'Last name is required.' });
        this.addressError = page.getByRole('cell', { name: 'Address is required.' });
        this.cityError = page.getByRole('cell', { name: 'City is required.' });
        this.stateError = page.getByRole('cell', { name: 'State is required.' });
        this.zipCodeError = page.getByRole('cell', { name: 'Zip Code is required.' });
        this.phoneError = page.getByRole('cell', { name: 'Phone number is required.' });
    }
    // Verify Profile Update Page Elements
    async verifyProfileUpdateElements() {
        await expect(this.profileUpdateHeader).toBeVisible();
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.addressInput).toBeVisible();
        await expect(this.cityInput).toBeVisible();
        await expect(this.stateInput).toBeVisible();
        await expect(this.zipCodeInput).toBeVisible();
        await expect(this.phoneInput).toBeVisible();
        await expect(this.updateProfileButton).toBeVisible();
    }
    // Update Profile Information
    async updateProfile(firstName: string, lastName: string, address: string, city: string, state: string, zipCode: string, phone: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipCodeInput.fill(zipCode);
        await this.phoneInput.fill(phone);
    }
    // Submit Profile Update
    async submitProfileUpdate() {
        await this.updateProfileButton.click();
    }
    // Verify Profile Updated Successfully
    async verifyProfileUpdatedSuccessfully() {
        await expect(this.profileUpdatedHeader).toBeVisible();
    }

    //Verify User Data updated in Profile Fields
    async verifyUpdatedProfileData(firstName: string, lastName: string, address: string, city: string, state: string, zipCode: string, phone: string) {
        await expect(this.firstNameInput).toHaveValue(firstName);
        await expect(this.lastNameInput).toHaveValue(lastName);
        await expect(this.addressInput).toHaveValue(address);
        await expect(this.cityInput).toHaveValue(city);
        await expect(this.stateInput).toHaveValue(state);
        await expect(this.zipCodeInput).toHaveValue(zipCode);
        await expect(this.phoneInput).toHaveValue(phone);
    }

    // Clear Profile Fields
    async clearProfileFields() {
        await this.firstNameInput.fill('');
        await this.lastNameInput.fill('');
        await this.addressInput.fill('');
        await this.cityInput.fill('');
        await this.stateInput.fill('');
        await this.zipCodeInput.fill('');
        await this.phoneInput.fill('');
    }

    // Verify Profile Update Error Messages
    async verifyProfileUpdateErrorMessages() {
        await expect(this.firstNameError).toHaveText('First name is required.');
        await expect(this.lastNameError).toHaveText('Last name is required.');
        await expect(this.addressError).toHaveText('Address is required.');
        await expect(this.cityError).toHaveText('City is required.');
        await expect(this.stateError).toHaveText('State is required.');
        await expect(this.zipCodeError).toHaveText('Zip Code is required.');
        await expect(this.phoneError).toHaveText('Phone number is required.');
    }
}
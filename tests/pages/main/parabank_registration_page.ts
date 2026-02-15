import { type Locator, type Page } from "@playwright/test";

export interface RegistrationData {
    user_first_name: string;
    user_last_name: string;
    address_street: string;
    address_city: string;
    address_state: string;
    address_zipcode: string;
    phone_number: string;
    ssn: string;
    username: string;
    password: string;
    repeated_password: string;
}

export class ParabankRegistrationPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly ssnInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly repeatedPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly cleanDataBaseButton: Locator;
    readonly customerFirstNameError: Locator;
    readonly customerLastNameError: Locator;
    readonly customerAddressError: Locator;
    readonly customerCityError: Locator;
    readonly customerStateError: Locator;
    readonly customerZipCodeError: Locator;
    readonly customerPhoneNumberError: Locator;
    readonly customerSsnError: Locator;
    readonly customerUsernameError: Locator;
    readonly customerPasswordError: Locator;
    readonly customerRepeatedPasswordError: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[id="customer.firstName"]');
        this.lastNameInput = page.locator('[id="customer.lastName"]');
        this.addressInput = page.locator('[id="customer.address.street"]');
        this.cityInput = page.locator('[id="customer.address.city"]');
        this.stateInput = page.locator('[id="customer.address.state"]');
        this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
        this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
        this.ssnInput = page.locator('[id="customer.ssn"]');
        this.usernameInput = page.locator('[id="customer.username"]');
        this.passwordInput = page.locator('[id="customer.password"]');
        this.repeatedPasswordInput = page.locator('[id="repeatedPassword"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.cleanDataBaseButton = page.getByRole('button', { name: 'Clean' });
        this.customerFirstNameError = page.locator('[id="customer.firstName.errors"]');
        this.customerLastNameError = page.locator('[id="customer.lastName.errors"]');
        this.customerAddressError = page.locator('[id="customer.address.street.errors"]');
        this.customerCityError = page.locator('[id="customer.address.city.errors"]');
        this.customerStateError = page.locator('[id="customer.address.state.errors"]');
        this.customerZipCodeError = page.locator('[id="customer.address.zipCode.errors"]');
        this.customerPhoneNumberError = page.locator('[id="customer.phoneNumber.errors"]');
        this.customerSsnError = page.locator('[id="customer.ssn.errors"]');
        this.customerUsernameError = page.locator('[id="customer.username.errors"]');
        this.customerPasswordError = page.locator('[id="customer.password.errors"]');
        this.customerRepeatedPasswordError = page.locator('[id="repeatedPassword.errors"]');
    }

    async fillRegistrationFormFromCsv(data: RegistrationData) {
        await this.firstNameInput.fill(data.user_first_name);
        await this.lastNameInput.fill(data.user_last_name);
        await this.addressInput.fill(data.address_street);
        await this.cityInput.fill(data.address_city);
        await this.stateInput.fill(data.address_state);
        await this.zipCodeInput.fill(data.address_zipcode);
        await this.phoneNumberInput.fill(data.phone_number);
        await this.ssnInput.fill(data.ssn);
        await this.usernameInput.fill(data.username);
        await this.passwordInput.fill(data.password);
        await this.repeatedPasswordInput.fill(data.repeated_password);
    }

    async fullRegistration(data: RegistrationData) {
        await this.page.goto('https://parabank.parasoft.com/parabank/about.htm');
        await this.page.getByRole('link', { name: 'Register' }).click();
        await this.fillRegistrationFormFromCsv(data);
        await this.registerButton.click();
    }
}

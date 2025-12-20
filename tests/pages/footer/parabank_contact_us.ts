import { expect, type Locator, type Page } from "@playwright/test";

// Contact Us Page Locators
export class ParabankContactUsPage {
    readonly page: Page;
    readonly contactUsHeader: Locator
    readonly contactUsText: Locator;
    readonly contactUsNameField: Locator;
    readonly contactUsEmailField: Locator;
    readonly contactUsPhoneField: Locator;
    readonly contactUsMessageField: Locator;
    readonly contactUsSubmitButton: Locator;
    readonly thankYouMessage: Locator;
    readonly contactYouMessage: Locator;

    constructor(page: Page) {
    // Contact Us Page Locators
        this.page = page;
        this.contactUsHeader = page.getByRole('heading', { name: 'Customer Care' });
        this.contactUsText = page.getByText('Email support is available by filling out the following form.');
        this.contactUsNameField = page.locator('#name');
        this.contactUsEmailField = page.locator('#email');
        this.contactUsPhoneField = page.locator('#phone');
        this.contactUsMessageField = page.locator('#message');
        this.contactUsSubmitButton = page.getByRole('button', { name: 'Send to Customer Care' });
        this.thankYouMessage = page.getByText('Thank you John Doe');
        this.contactYouMessage = page.getByText('A Customer Care Representative will be contacting you.');
    }
    // Check Contact Us Page Content
    async verifyContactUsPage() {
        await expect(this.contactUsHeader).toBeVisible();
        await expect(this.contactUsText).toBeVisible();
        await expect(this.contactUsNameField).toBeVisible();
        await expect(this.contactUsEmailField).toBeVisible();
        await expect(this.contactUsPhoneField).toBeVisible();
        await expect(this.contactUsMessageField).toBeVisible();
        await expect(this.contactUsSubmitButton).toBeVisible();
        await expect(this.page).toHaveURL(/\/contact\.htm/);
    }

    // Fill Contact Us Form
    async fillContactUsForm(name: string, email: string, phone: string, message: string) {
        await this.contactUsNameField.fill('John Doe');
        await this.contactUsEmailField.fill(email);
        await this.contactUsPhoneField.fill(phone);
        await this.contactUsMessageField.fill(message);
    }
    // Submit Contact Us Form
    async submitContactUsForm() {
        await this.contactUsSubmitButton.click();
    }
    // Verify Thank You Message after form submission
    async verifyThankYouMessage() {
        await expect(this.thankYouMessage).toBeVisible();
        await expect(this.contactYouMessage).toBeVisible();
    }
}
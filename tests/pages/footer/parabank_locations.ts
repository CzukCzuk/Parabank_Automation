import { expect, type Locator, type Page } from "@playwright/test";

// Services Page Locators
export class ParabankServicesPage {
    readonly page: Page;
    readonly servicesHeader: Locator

    constructor(page: Page) {
        // Services Page Locators
        this.page = page;
        this.servicesHeader = page.getByRole('heading', { name: 'Deliver High-Quality & Secure' });
    }
    //Click on Services link in the Header
    async clickServicesLink() {
        await this.page.locator('#footerPanel').locator('text=Locations').click();
    }

    // Check Services Page Content
    async verifyServicesPage() {
        await expect(this.servicesHeader).toBeVisible();
        await expect(this.page).toHaveURL(/\/solutions/);
    }   
}
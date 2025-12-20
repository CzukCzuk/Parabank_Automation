import { expect, type Locator, type Page } from "@playwright/test";

// Services Page Locators
export class ParabankServicesPage {
    readonly page: Page;
    readonly servicesHeader: Locator
    readonly servicesDiscussion: Locator;
    readonly headerServicesLink: Locator;

    constructor(page: Page) {
        // Services Page Locators
        this.page = page;
        this.servicesHeader = page.getByRole('heading', { name: 'Parasoft Forums' });
        this.servicesDiscussion = page.getByRole('heading', { name: 'Recent Discussions' });
        this.headerServicesLink = page.locator('#footerPanel').locator('text=Forums');
    }
    //Click on Services link in the Header
    async clickServicesLink() {
        await this.headerServicesLink.click();
    }
    // Verify Services Page Content
    async verifyServicesPage() {
        await expect(this.servicesHeader).toBeVisible();
        await expect(this.servicesDiscussion).toBeVisible();
        await expect(this.page).toHaveURL(/\/forums/);
    }   
}
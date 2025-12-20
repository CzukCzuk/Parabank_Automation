import { expect, type Locator, type Page } from "@playwright/test";

// Products Page Locators
export class ParabankProductsPage {
    readonly page: Page;
    readonly productsHeader: Locator
    readonly productsText: Locator;
    readonly headerProductsLink: Locator;

    constructor(page: Page) {
        // Products Page Locators
        this.page = page;
        this.productsHeader = page.getByText('PRODUCTS', { exact: true });
        this.productsText = page.getByRole('heading', { name: 'Innovative and Intelligent' });
        this.headerProductsLink = page.locator('#headerPanel').locator('text=Products');
    }

    //Click on Products link in the Header
    async clickProductsLink() {
        await this.headerProductsLink.click();
    }
    // Verify Products Page Content
    async verifyProductsPage() {
        await expect(this.productsHeader).toBeVisible();
        await expect(this.productsText).toBeVisible();
        await expect(this.page).toHaveURL(/\/products/);
    }   
}
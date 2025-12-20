import { expect, type Locator, type Page } from "@playwright/test";
// About Us Page Locators
export class ParabankAboutUsPage {
    readonly page: Page;
    readonly aboutUsHeader: Locator;
    readonly aboutUsText: Locator;
    readonly headerAboutUsLink: Locator;
    
    constructor(page: Page) {
        // About Us Page Locators
        this.page = page;
        this.aboutUsHeader = page.getByRole('heading', { name: 'ParaSoft Demo Website' });
        this.aboutUsText = page.locator('text=ParaBank is a demo site used for demonstration of Parasoft software solutions. All materials herein are used solely for simulating a realistic online banking website. In other words: ParaBank is not a real bank! For more information about Parasoft solutions please visit us at: www.parasoft.com or call 888-305-0041');
        this.headerAboutUsLink = page.locator('#footerPanel').locator('text=About Us');
    }
    //Click on About Us link in the Header
    async clickAboutUsLink() {
        await this.headerAboutUsLink.click();
    }
    // Verify About Us Page Content
    async verifyAboutUsPage() {
        await expect(this.aboutUsHeader).toBeVisible();
        await expect(this.aboutUsText).toBeVisible();
        await expect(this.page).toHaveURL(/\/about\.htm/);
    }
}
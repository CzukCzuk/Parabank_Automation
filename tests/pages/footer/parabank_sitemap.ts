import { expect, type Locator, type Page } from "@playwright/test";

// Sitemap Page Locators
export class ParabankSitemapPage {
    readonly page: Page;
    readonly sitemapHeader: Locator
    readonly aboutUsLink: Locator;
    readonly servicesLink: Locator;
    readonly productsLink: Locator;
    readonly locationsLink: Locator;
    readonly admingPageLink: Locator;
    readonly openNewAccountLink: Locator;
    readonly accountsOverviewLink: Locator;
    readonly transferFundsLink: Locator;
    readonly billPayLink: Locator;
    readonly findTransactionsLink: Locator; 
    readonly updateContactInfoLink: Locator;
    readonly requestLoanLink: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        // Sitemap Page Locators
        this.page = page;
        this.sitemapHeader = page.locator('#rightPanel').getByText('Solutions');
        this.aboutUsLink = page.locator('#rightPanel').getByRole('link', { name: 'About Us' });
        this.servicesLink = page.locator('#rightPanel').getByRole('link', { name: 'Products' });
        this.productsLink = page.locator('#rightPanel').getByRole('link', { name: 'Services' });
        this.locationsLink = page.locator('#rightPanel').getByRole('link', { name: 'Locations' });
        this.admingPageLink = page.locator('#rightPanel').getByRole('link', { name: 'Admin Page' });
        this.openNewAccountLink = page.locator('#rightPanel').getByRole('link', { name: 'Open New Account' });
        this.accountsOverviewLink = page.locator('#rightPanel').getByRole('link', { name: 'Accounts Overview' });
        this.transferFundsLink = page.locator('#rightPanel').getByRole('link', { name: 'Transfer Funds' });
        this.billPayLink = page.locator('#rightPanel').getByRole('link', { name: 'Bill Pay' });
        this.findTransactionsLink = page.locator('#rightPanel').getByRole('link', { name: 'Find Transactions' });
        this.updateContactInfoLink = page.locator('#rightPanel').getByRole('link', { name: 'Update Contact Info' });
        this.requestLoanLink = page.locator('#rightPanel').getByRole('link', { name: 'Request Loan' });
        this.logoutLink = page.locator('#rightPanel').getByRole('link', { name: 'Log Out' });
    }
    //Verify Sitemap Page Content
    async verifySitemapPage() {
        await expect(this.sitemapHeader).toBeVisible();
        await expect(this.page).toHaveURL(/\/sitemap\.htm/);
        await expect(this.aboutUsLink).toBeVisible();
        await expect(this.servicesLink).toBeVisible();
        await expect(this.productsLink).toBeVisible();
        await expect(this.locationsLink).toBeVisible();
        await expect(this.admingPageLink).toBeVisible();
        await expect(this.openNewAccountLink).toBeVisible();
        await expect(this.accountsOverviewLink).toBeVisible();
        await expect(this.transferFundsLink).toBeVisible();
        await expect(this.billPayLink).toBeVisible();
        await expect(this.findTransactionsLink).toBeVisible();
        await expect(this.updateContactInfoLink).toBeVisible();
        await expect(this.requestLoanLink).toBeVisible();
        await expect(this.logoutLink).toBeVisible();
    }

    //Veryfiy links on Sitemap Page redirect correctly
    async verifySitemapLinks() {
        await this.aboutUsLink.click();
        await expect(this.page).toHaveURL(/\/about\.htm/);
        await this.page.goBack();

        await this.servicesLink.click();
        await expect(this.page).toHaveURL(/\/products/);
        await this.page.goBack();

        await this.productsLink.click();
        await expect(this.page).toHaveURL(/\/services\.htm/);
        await this.page.goBack();

        await this.locationsLink.click();
        await expect(this.page).toHaveURL(/\/solutions/);
        await this.page.goBack();

        await this.admingPageLink.click();
        await expect(this.page).toHaveURL(/\/admin\.htm/);
        await this.page.goBack();

        await this.openNewAccountLink.click();
        await expect(this.page).toHaveURL(/\/openaccount\.htm/);
        await this.page.goBack();

        await this.accountsOverviewLink.click();
        await expect(this.page).toHaveURL(/\/overview\.htm/);
        await this.page.goBack();

        await this.transferFundsLink.click();
        await expect(this.page).toHaveURL(/\/transfer\.htm/);
        await this.page.goBack();

        await this.billPayLink.click();
        await expect(this.page).toHaveURL(/\/billpay\.htm/);
        await this.page.goBack();

        await this.findTransactionsLink.click();
        await expect(this.page).toHaveURL(/\/findtrans\.htm/);
        await this.page.goBack();

        await this.updateContactInfoLink.click();
        await expect(this.page).toHaveURL(/\/updateprofile\.htm/);
        await this.page.goBack();

        await this.requestLoanLink.click();
        await expect(this.page).toHaveURL(/\/requestloan\.htm/);
        await this.page.goBack();

        await this.logoutLink.click();
        await expect(this.page).toHaveURL(/\/index\.htm/);
    }
}
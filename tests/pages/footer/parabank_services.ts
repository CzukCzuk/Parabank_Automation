import { expect, type Locator, type Page } from "@playwright/test";

// Services Page Locators
export class ParabankServicesPage {
    readonly page: Page;
    readonly servicesHeader: Locator
    readonly servicesText: Locator;
    readonly headerServicesLink: Locator;

    constructor(page: Page) {
        // Services Page Locators
        this.page = page;
        this.servicesHeader = page.getByText('Available ParaBank SOAP');
        this.servicesText = page.locator('text=Endpoint address: http://parabank.parasoft.com:8080/parabank/services/LoanProcessor WSDL : {http://service.parabank.parasoft.com/}LoanProcessorServiceImplService Target namespace: http://service.parabank.parasoft.com/');
        this.headerServicesLink = page.locator('#footerPanel').locator('text=Services');
    }
    //Click on Services link in the Header
    async clickServicesLink() {
        await this.headerServicesLink.click();
    }
    // Verify Services Page Content
    async verifyServicesPage() {
        await expect(this.servicesHeader).toBeVisible();
        await expect(this.servicesText).toBeVisible();
        await expect(this.page).toHaveURL(/\/services\.htm/);
    }   
}
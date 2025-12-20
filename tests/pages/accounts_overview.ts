import { expect, type Locator, type Page } from "@playwright/test";

// Admin Page Locators
export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountHeader: Locator;
  readonly accountNumber: Locator;
  readonly accountBalance: Locator;
  readonly accountAvailableAmount: Locator;
  readonly accountTotalAmount: Locator;
  readonly accountInfoText: Locator;

    constructor(page: Page) {
        // Accounts Overview Page Locators
        this.page = page;
        this.accountHeader = page.getByRole('heading', { name: 'Accounts Overview' });
        this.accountNumber = page.getByRole('link', { name: /^\d+$/ });
        this.accountBalance = page.getByRole('cell', { name: '$' }).first();
        this.accountAvailableAmount = page.getByRole('cell', { name: '$' }).nth(1);
        this.accountTotalAmount = page.locator('b').filter({ hasText: '$' });
        this.accountInfoText = page.getByRole('cell', { name: '*Balance includes deposits that may be subject to holds' });
    }

    async verifyAccountOverviewElements() {
        await expect(this.accountHeader).toBeVisible();
        await expect(this.accountNumber).toBeVisible();
        await expect(this.accountBalance).toBeVisible();
        await expect(this.accountAvailableAmount).toBeVisible();
        await expect(this.accountTotalAmount).toBeVisible();
        await expect(this.accountInfoText).toBeVisible();
    }
}
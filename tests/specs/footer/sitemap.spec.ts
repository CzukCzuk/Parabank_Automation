import {   test, expect } from '@playwright/test';
import { ParabankSitemapPage } from '../../pages/footer/parabank_sitemap';
import { ParabankPages } from '../../pages/parabank_main_page';
import { before } from 'node:test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/sitemap.htm');
}
);

test('Services page has correct structure and content', async ({ page }) => {
    //Verify Sitemap Page Content
    const sitemapPage = new ParabankSitemapPage(page);
    await sitemapPage.verifySitemapPage();
});

test('Sitemap links navigate to correct pages', async ({ page }) => {
    // Verify Sitemap links
    const sitemapPage = new ParabankSitemapPage(page);
    await sitemapPage.verifySitemapLinks(); 
});

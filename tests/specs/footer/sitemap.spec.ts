import { test, expect } from '@playwright/test';
import { ParabankSitemapPage } from '../../pages/footer/parabank_sitemap';

test.beforeEach(async ({ page }) => {
    await page.goto('sitemap.htm');
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

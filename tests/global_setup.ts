import { chromium, type FullConfig } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { type RegistrationData } from './pages/main/parabank_registration_page';

async function globalSetup(config: FullConfig) {
  const rawBaseURL = config.projects[0].use.baseURL as string;
  // Strip any trailing slash so template literals like `${baseURL}/admin.htm` work correctly
  const baseURL = rawBaseURL.replace(/\/$/, '');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🔄 Cleaning the Parabank Database...');
  await page.goto(`${baseURL}/admin.htm`);
  await page.getByRole('button', { name: 'Clean' }).click();
  // Wait a short moment to ensure DB represents clean state
  await page.waitForTimeout(2000);

  console.log('Registering accounts from CSV...');
  const file = fs.readFileSync('tests/data/registration_data.csv', 'utf-8');
  const records = parse(file, { columns: true, skip_empty_lines: true }) as RegistrationData[];

  // Indices reserved for in-test registration — do NOT pre-register these accounts
  // [1] johnybravo  → account_balance.spec.ts registers during test
  // [0] johndoe    → registration_happy_path.spec.ts registers during test
  // [24]victorpetrov → registration_unhappy_path.spec.ts registers during test (password mismatch)
  const SKIP_INDICES = new Set([0, 1, 24]);

  for (let i = 0; i < records.length; i++) {
    const data = records[i];

    if (SKIP_INDICES.has(i)) {
        console.log(`  ⏭ Skipping record[${i}] (${data.username}) — reserved for in-test registration`);
        continue;
    }

    try {
        await page.goto(`${baseURL}/register.htm`);
        await page.locator('[id="customer.firstName"]').fill(data.user_first_name);
        await page.locator('[id="customer.lastName"]').fill(data.user_last_name);
        await page.locator('[id="customer.address.street"]').fill(data.address_street);
        await page.locator('[id="customer.address.city"]').fill(data.address_city);
        await page.locator('[id="customer.address.state"]').fill(data.address_state);
        await page.locator('[id="customer.address.zipCode"]').fill(data.address_zipcode);
        await page.locator('[id="customer.phoneNumber"]').fill(data.phone_number);
        await page.locator('[id="customer.ssn"]').fill(data.ssn);
        await page.locator('[id="customer.username"]').fill(data.username);
        await page.locator('[id="customer.password"]').fill(data.password);
        await page.locator('[id="repeatedPassword"]').fill(data.repeated_password);
        await page.getByRole('button', { name: 'Register' }).click();
        
        await page.getByText('Welcome').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await page.getByRole('link', { name: 'Log Out' }).click().catch(() => {});
    } catch (e) {
        console.error(`Failed to register ${data.username}`, e);
        throw e;
    }
  }

  console.log('Global Setup Complete!');
  await browser.close();
}

export default globalSetup;

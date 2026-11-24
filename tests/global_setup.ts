import { chromium, request, type FullConfig } from '@playwright/test';
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
  const api = await request.newContext({ baseURL: `${baseURL}/` });

  // Indices reserved for in-test registration — do NOT pre-register these accounts
  // [1] johnybravo  → account_balance.spec.ts registers during test
  // [0] johndoe    → registration_happy_path.spec.ts registers during test
  // [24]victorpetrov → registration_unhappy_path.spec.ts registers during test (password mismatch)
  const SKIP_INDICES = new Set([0, 1, 24]);

  try {
    for (let i = 0; i < records.length; i++) {
      const data = records[i];

      if (SKIP_INDICES.has(i)) {
        console.log(`  ⏭ Skipping record[${i}] (${data.username}) — reserved for in-test registration`);
        continue;
      }

      try {
        const registrationPage = await api.get('register.htm');
        if (!registrationPage.ok()) {
          throw new Error(`Could not open registration page: HTTP ${registrationPage.status()}`);
        }

        const response = await api.post('register.htm', {
          form: {
            'customer.firstName': data.user_first_name,
            'customer.lastName': data.user_last_name,
            'customer.address.street': data.address_street,
            'customer.address.city': data.address_city,
            'customer.address.state': data.address_state,
            'customer.address.zipCode': data.address_zipcode,
            'customer.phoneNumber': data.phone_number,
            'customer.ssn': data.ssn,
            'customer.username': data.username,
            'customer.password': data.password,
            repeatedPassword: data.repeated_password,
          },
        });
        const responseBody = await response.text();

        if (!response.ok() || !/Welcome/i.test(responseBody)) {
          throw new Error(`Registration failed with HTTP ${response.status()}`);
        }

      } catch (e) {
        console.error(`Failed to register ${data.username}`, e);
        throw e;
      }
    }
  } finally {
    await api.dispose();
  }

  console.log('Global Setup Complete!');
  await browser.close();
}

export default globalSetup;

import { expect, type Locator, type Page } from "@playwright/test";

 export interface LoginData {
    username: string;
    password: string;
  }

export class ParabankPages {
  // Home Page Locators
  readonly page: Page;
  readonly parabankImage: Locator;
  readonly footerHome: Locator;
  readonly footerAboutUs: Locator;
  readonly footerServices: Locator;
  readonly footerProducts: Locator;
  readonly footerLocations: Locator;
  readonly footerForum: Locator;
  readonly footerSiteMap: Locator;
  readonly footerContactUs: Locator;
  readonly leftNavSolutions: Locator;
  readonly leftNavAboutUs: Locator;
  readonly leftNavLocations: Locator;
  readonly leftNavProducts: Locator;
  readonly leftNavServices: Locator;
  readonly leftNavAdminPage: Locator;
  // Login Page Locators
  readonly usernameLoginInput: Locator;
  readonly passwordLoginInput: Locator
  // Registration Page Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatedPasswordInput: Locator;
  readonly registerButton: Locator;



    constructor(page: Page) {
        // Home Page Locators
        this.page = page;
        this.parabankImage = page.getByRole('img', { name: 'ParaBank' });
        this.footerHome = page.locator('#footermainPanel').locator('text=Home');
        this.footerAboutUs = page.locator('#footermainPanel').locator('text=About Us');
        this.footerServices = page.locator('#footermainPanel').locator('text=Services');
        this.footerProducts = page.locator('#footermainPanel').locator('text=Products');
        this.footerLocations = page.locator('#footermainPanel').locator('text=Locations');
        this.footerForum = page.locator('#footermainPanel').locator('text=Forum');
        this.footerSiteMap = page.locator('#footermainPanel').locator('text=Site Map');
        this.footerContactUs = page.locator('#footermainPanel').locator('text=Contact Us');
        this.leftNavSolutions = page.getByText('Solutions');
        this.leftNavAboutUs = page.locator('.leftmenu >> text=About Us');
        this.leftNavLocations = page.locator('.leftmenu >> text=Locations');
        this.leftNavProducts = page.locator('.leftmenu >> text=Products');
        this.leftNavServices = page.locator('.leftmenu >> text=Services');
        this.leftNavAdminPage = page.getByRole('link', { name: 'Admin Page' });
        // Login Page Locators
        this.usernameLoginInput = page.locator('input[name="username"]');
        this.passwordLoginInput = page.locator('input[name="password"]');
        // Registraion Locators
        this.firstNameInput = page.locator('[id="customer.firstName"]');
        this.lastNameInput = page.locator('[id="customer.lastName"]');
        this.addressInput = page.locator('[id="customer.address.street"]');
        this.cityInput = page.locator('[id="customer.address.city"]');
        this.stateInput = page.locator('[id="customer.address.state"]');
        this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
        this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
        this.ssnInput = page.locator('[id="customer.ssn"]');
        this.usernameInput = page.locator('[id="customer.username"]');
        this.passwordInput = page.locator('[id="customer.password"]');
        this.repeatedPasswordInput = page.locator('[id="repeatedPassword"]');
        this.registerButton = page.getByRole('link', { name: 'Register' });
    }
  // STRUCTURE AND CONTENT VERIFICATION ACTIONS
  // Verify Parabank image and text are visible
  async verifyParabankImageAndText() {
    await expect(this.parabankImage).toBeVisible();
    await expect(this.page.getByText('Experience the difference')).toBeVisible();
  }
  // Verify Parabank Footer options are visible
  async verifyParabankFooterOptions() {
    await expect(this.footerHome).toBeVisible();
    await expect(this.footerAboutUs).toBeVisible();
    await expect(this.footerServices).toBeVisible();
    await expect(this.footerProducts).toBeVisible();
    await expect(this.footerLocations).toBeVisible();
    await expect(this.footerForum).toBeVisible();
    await expect(this.footerSiteMap).toBeVisible();
    await expect(this.footerContactUs).toBeVisible();
  }
  //Verify Left Navigation options are visible
  async verifyLeftNavigationOptions() {
    await expect(this.leftNavSolutions).toBeVisible();
    await expect(this.leftNavAboutUs).toBeVisible();
    await expect(this.leftNavServices).toBeVisible();
    await expect(this.leftNavLocations).toBeVisible();
    await expect(this.leftNavAdminPage).toBeVisible();
  }

  //  LOGIN ACTIONS
  // Fill Login Form from CSV data
    async fillLogin(data: LoginData) {
            await this.usernameLoginInput.fill(data.username);
            await this.passwordLoginInput.fill(data.password);
}
  //CLick Login Button
  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Log In' }).click();
  }

  // Click register button
  async clickRegisterButton() {
    await this.registerButton.click();
  }

  // Verify successful login by a Welcome message
  async verifySuccessfulLoginMessage() {
    await expect(this.page.getByText('Welcome')).toBeVisible();
  }
  // Verify successful login by checking for the presence of the logout button
  async logoutBUttonVisible() {
    await expect(this.page.getByText('Log Out')).toBeVisible();
  }

  // Log out if already logged in
  async logoutIfLoggedIn() {
    const logoutButton = this.page.getByRole('link', { name: 'Log Out' });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }
  }

  // Verify invalid login shows error message
  async verifyInvalidLoginErrorMessage() {
    await expect(this.page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    await expect(this.page.getByText('The username and password could not be verified.')).toBeVisible();
  }

  // Verify empty login shows error message
  async verifyEmptyLoginErrorMessage() {
    await expect(this.page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    await expect(this.page.getByText('Please enter a username and password.')).toBeVisible();
  }
}
import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object for the Engenious University login flow.
 * Locators use roles, labels and visible text (what the user sees),
 * so they do not break when CSS classes change.
 */
export class LoginPage {
  readonly page: Page;
  readonly signUpLoginButton: Locator;
  readonly loginTab: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Header button on the home page. It opens /registration.
    this.signUpLoginButton = page.getByText('Sign Up / Login');
    // "Login" is a tab (link) on the registration page.
    this.loginTab = page.getByRole('link', { name: 'Login', exact: true });
    this.emailInput = page.getByLabel('Email', { exact: true });
    // exact: true, so it does not also match the "toggle password visibility" button.
    this.passwordInput = page.getByLabel('Password', { exact: true });
    // Submit button. Same name as the tab, but a different role.
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
  }

    async openHomePage(): Promise<void> {
    // The cookie consent dialog appears in every new browser session
    // and blocks clicks. If it appears, choose "Essential only".
    await this.page.addLocatorHandler(
      this.page.getByText('We value your privacy'),
      async () => {
        await this.page.getByRole('button', { name: 'Essential only' }).click();
      },
    );
    await this.page.goto('/');
  }

  async openLoginForm(): Promise<void> {
    await this.signUpLoginButton.click();
    await this.loginTab.click();
    await this.page.waitForURL('**/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

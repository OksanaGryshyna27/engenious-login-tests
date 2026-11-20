import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object for the page the user sees after login.
 * Logged-in elements are inside the side menu (drawer).
 */
export class DashboardPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;
  readonly profileLink: Locator;
  readonly signUpLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Header button that opens the side menu.
    this.menuButton = page.getByRole('button', { name: 'open drawer' });
    // Shown only to logged-in users.
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.profileLink = page.locator('a[href="/profile"]');
    // Shown only to logged-out users.
    this.signUpLoginButton = page.getByText('Sign Up / Login');
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }
}
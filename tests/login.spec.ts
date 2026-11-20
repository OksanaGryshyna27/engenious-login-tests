import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

test.describe('Login', () => {
  test.beforeAll(() => {
    if (!email || !password) {
      throw new Error('Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env (see .env.example)');
    }
  });

  test('TC-01: registered user logs in with valid email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await test.step('Open the home page', async () => {
      await loginPage.openHomePage();
      await expect(loginPage.signUpLoginButton).toBeVisible();
    });

    await test.step('Open the login form', async () => {
      await loginPage.openLoginForm();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
    });

    await test.step('Log in with valid credentials', async () => {
      await loginPage.login(email!, password!);
    });

    await test.step('Verify the user is logged in', async () => {
      await expect(page).not.toHaveURL(/\/login/);
      await expect(dashboard.signUpLoginButton).toBeHidden();
      await dashboard.openMenu();
      await expect(dashboard.logoutButton).toBeVisible();
      await expect(dashboard.profileLink).toBeVisible();
    });
  });
});

import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

// Declare the shape of the custom fixtures this file adds
type AuthFixtures = {
  authenticatedPage: Page;
};

// Extend base test with our auth fixture
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: perform login before the test runs
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    // Verify we landed on the inventory page before handing off
    await expect(page).toHaveURL(/inventory/);

    // Hand the logged-in page to the test
    await use(page);

    // Teardown: nothing needed — Playwright closes browser context automatically
  },
});

// Re-export expect so spec files only need one import
export { expect } from '@playwright/test';
import { test, expect } from '../../fixtures/auth.fixture';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';

test.beforeEach(async ({ authenticatedPage }) => {
  const inventoryPage = new InventoryPage(authenticatedPage);
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.cartLink.click();
  await expect(authenticatedPage).toHaveURL(/cart/);
  const cartPage = new CartPage(authenticatedPage);
  await cartPage.checkoutButton.click();
  await expect(authenticatedPage).toHaveURL(/checkout-step-one/);
});

test.describe('Checkout', () => {

  test('successful checkout with valid customer information', async ({ page }) => {

  });

  // Step 1
  test('page title displays \'Checkout: Your Information\'', async({ page }) => {

  });

  test('correct error message appears when first name is missing', async({ page }) => {

  });

  test('correct error message appears when last name is missing', async({ page }) => {

  });  

  test('correct error message appears when postal code is missing', async({ page }) => {

  });

  test('cancel navigates back to cart', async({ page }) => {

  });

  test('valid form submission navigates to overview', async({ page }) => {

  });

  // Step 2
  test('page title displays \'Checkout: Overview\'', async({ page }) => {

  });

  test('item names match what was added to cart', async({ page }) => {

  });

  test('item prices match what was added to cart', async ({ page }) => {

  });

  test('subtotal matches sum of item prices', async ({ page }) => {

  });

  test('cancel navigates to inventory page', async ({ page }) => {

  });

  test('finish button navigates to confirmation page', async ({ page }) => {

  });

  // Confirmation
  test('page title displays \'Checkout: Complete!\'', async ({ page }) => {

  });

  test('confirmation message displays \'Thank you for your order!\'', async ({ page }) => {

  });

  test('back home button navigates to inventory page', async ({ page }) => {

  });

});
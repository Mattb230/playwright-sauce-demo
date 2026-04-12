import { test, expect } from '../../fixtures/auth.fixture';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';
import { products } from '../../test-data/products';

test.describe('Checkout', () => {

  test.beforeEach(async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.addToCart(products.backpack.name);
    await inventoryPage.cartLink.click();
    await expect(authenticatedPage).toHaveURL(/cart/);
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.checkoutButton.click();
    await expect(authenticatedPage).toHaveURL(/checkout-step-one/);
  });
  // Full end to end flow
  test.skip('successful checkout with valid customer information', async ({ authenticatedPage }) => {

  });

  // Step 1
  test('page title displays \'Checkout: Your Information\'', async ({ authenticatedPage }) => {
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Your Information');
  });

  test('correct error message appears when first name is missing', async ({ authenticatedPage }) => {
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
  });

  test('correct error message appears when last name is missing', async ({ authenticatedPage }) => {
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.firstNameInput.fill('firstName');
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
  });

  test('correct error message appears when postal code is missing', async ({ authenticatedPage }) => {
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.firstNameInput.fill('firstName');
    await checkoutPage.lastNameInput.fill('lastName');
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
  });

  test('cancel navigates back to cart', async ({ authenticatedPage }) => {
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.cancelButton.click();
    await expect(authenticatedPage).toHaveURL(/cart/);
  });

  test('valid form submission navigates to overview', async ({ authenticatedPage }) => {
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.fillForm('firstName', 'lastName', '123456');
    await expect(authenticatedPage).toHaveURL(/checkout-step-two/);
  });

  // Step 2
  test.describe('Step 2 - Overview', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.fillForm('firstName', 'lastName', '123456');
      await expect(authenticatedPage).toHaveURL(/checkout-step-two/);
    });

    test('page title displays \'Checkout: Overview\'', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    });

    test('item names match what was added to cart', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      const names = await checkoutPage.getOverviewItemNames();
      expect(names).toContain(products.backpack.name);
    });

    test('item prices match what was added to cart', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      const prices = await checkoutPage.getOverviewItemPrices();
      expect(prices).toContain(products.backpack.price);
    });

    test.skip('item descriptions match what was added to cart', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      const descriptions = await checkoutPage.getOverviewItemDescriptions();
      expect(descriptions).toContain(products.backpack.description);
    });

    test('subtotal matches sum of item prices', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      const prices = await checkoutPage.getOverviewItemPrices();
      const numbers = prices.map(p => parseFloat(p.replace('$', '')));
      const total = numbers.reduce((acc, cur) => acc + cur, 0);

      const subTotalTxt = await checkoutPage.overviewSubtotal.textContent() ?? '0';
      const subTotalNum = parseFloat(subTotalTxt.replace(/[^0-9.]/g, ''));
      expect(total).toBeCloseTo(subTotalNum, 2);
    });

    test('cancel navigates to inventory page', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.cancelButton.click();
      await expect(authenticatedPage).toHaveURL(/inventory/)
    });

    test('finish button navigates to confirmation page', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.finishButton.click();
      await expect(authenticatedPage).toHaveURL(/checkout-complete/);
    });

  });

  test.describe('Confirmation', () => {
    test.beforeEach(async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.fillForm('firstName', 'lastName', '123456');
      await expect(authenticatedPage).toHaveURL(/checkout-step-two/);
      await checkoutPage.finishButton.click();
      await expect(authenticatedPage).toHaveURL(/checkout-complete/);
    });

    // Confirmation
    test('page title displays \'Checkout: Complete!\'', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await expect(checkoutPage.pageTitle).toHaveText('Checkout: Complete!');
    });

    test('confirmation message displays \'Thank you for your order!\'', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    });

    test('back home button navigates to inventory page', async ({ authenticatedPage }) => {
      const checkoutPage = new CheckoutPage(authenticatedPage);
      await checkoutPage.backHomeButton.click();
      await expect(authenticatedPage).toHaveURL(/inventory/)
    });

  });
});
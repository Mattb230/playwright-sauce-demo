import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Checkout - Edge Cases', () => {

  test.skip('prevents checkout with empty cart', async ({ authenticatedPage }) => {
    // SauceDemo currently allows chedkout with an empty cart
    // Expected: user should be redirected or shown an error when attempting
    // to checkout with an empty cart
    // Actual: happy path checkout flow works as normal with an empty cart
  });

});
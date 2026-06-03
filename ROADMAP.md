# Roadmap

A running view of where this test suite is and where it's headed. The goal is breadth of realistic e2e coverage and a clean, reusable Page Object / fixture layer.

## Done

- **Flagship end-to-end test** — successful checkout with valid customer information, asserting through all three steps (information → overview → confirmation).
- **Scoped per-item assertions on `CheckoutPage`** — `getItemPrice(name)` and `getItemDescription(name)` filter to a single item container (same chained-filter pattern as `InventoryPage.addToCart()`), which is what makes the price and description integrity checks reliable.
- **`getSubtotalNumber()` on `CheckoutPage`** — parses the subtotal label once and returns a number, removing duplicated regex logic from the specs.

## Planned

- **`cart.spec.ts`** — dedicated cart coverage: item count, item names and prices, remove item, continue shopping, and proceed to checkout.
- **Shared price-parsing helpers** — `priceAsNumber()` / `priceAsString()` (or a small price module) to replace the raw string parsing currently scattered across specs.
- **Additional user-type flows** — targeted assertions for `locked_out_user`, `problem_user`, and `performance_glitch_user`, each covering that account's distinct behaviour.
- **Additional fixtures** — pre-loaded cart states such as `cartWithItemPage` and `cartWithAllItemsPage` to cut setup duplication in the cart and checkout specs.

## Known issues

Application behaviour that diverges from expectation is captured as skipped tests in `tests/checkout/checkout-edge-cases.spec.ts`, each documenting expected vs. actual behaviour so the gap is tracked rather than silently ignored. For example, SauceDemo currently allows checkout with an empty cart.

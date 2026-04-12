# Project Backlog

## Project 1 — Playwright / TypeScript / SauceDemo

### Completed
- [x] `getItemPrice(productName: string)` method on `CheckoutPage` — scoped by item container, chained filter pattern matching `addToCart()` in `InventoryPage`
- [x] `getSubtotalNumber()` method on `CheckoutPage` — parses subtotal label text, returns float, eliminates duplicated regex logic across specs
- [x] `getItemDescription(productName: string)` method on `CheckoutPage` — scoped by item container, same pattern as `getItemPrice()`
- [x] Flagship e2e test: *successful checkout with valid customer information* — full three-step flow with assertions at each step

### Planned
- [ ] `cart.spec.ts` — test suite for cart behavior (item count, item names/prices, remove item, continue shopping, proceed to checkout)
- [ ] `priceAsNumber()` / `priceAsString()` helpers — utility methods or a shared price-parsing module to eliminate raw string parsing scattered across specs
- [ ] Additional user type flows — `locked_out_user`, `problem_user`, `performance_glitch_user` — each with targeted assertions for their specific behavior
- [ ] Additional fixtures — e.g., `cartWithItemPage`, `cartWithAllItemsPage` — pre-loaded cart states to reduce setup duplication in cart and checkout specs

### Ongoing
- [ ] Keep touching and improving this project in parallel with Project 2 to maintain TypeScript/Playwright fluency
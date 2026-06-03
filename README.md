# Playwright SauceDemo E2E Suite

[![Playwright Tests](https://github.com/Mattb230/playwright-sauce-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/Mattb230/playwright-sauce-demo/actions/workflows/playwright.yml)

An end-to-end UI test suite for [SauceDemo](https://www.saucedemo.com), built with Playwright and TypeScript using the Page Object Model. The suite covers authentication, the inventory page, and the full checkout flow — with assertions that verify data integrity as it moves across pages, not just that pages load.

26 tests run across three browser engines (Chromium, Firefox, and WebKit) on every push and pull request via GitHub Actions.

**Stack:** TypeScript · Playwright · Page Object Model · GitHub Actions

---

## Project Structure

```
.
├── pages/                          # Page Objects — one class per screen
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   └── auth.fixture.ts             # provides an `authenticatedPage` — tests start logged in
├── test-data/
│   ├── users.ts                    # standard, locked-out, and problem accounts
│   └── products.ts                 # product names, prices, and descriptions
├── tests/
│   ├── auth/login.spec.ts                      # login happy path + locked-out negative
│   ├── inventory/inventory.spec.ts             # product display, sorting, cart badge
│   ├── checkout/checkout.spec.ts               # full E2E flow, form validation, data integrity
│   └── checkout/checkout-edge-cases.spec.ts    # documented known issues (skipped, with rationale)
├── .github/workflows/playwright.yml
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Prerequisites

- Node.js 18+ (20 LTS recommended)
- npm

---

## Setup

```bash
git clone https://github.com/Mattb230/playwright-sauce-demo.git
cd playwright-sauce-demo
npm install
npx playwright install   # downloads the browser binaries
```

---

## Running Tests

```bash
# Run the full suite (headless)
npx playwright test

# Run a single spec
npx playwright test tests/checkout/checkout.spec.ts

# Run one folder
npx playwright test tests/inventory

# Run against a single browser
npx playwright test --project=chromium

# Watch the browser (headed)
npx playwright test --headed

# Debug interactively
npx playwright test --ui
```

By default the suite runs against all three configured engines — Chromium, Firefox, and WebKit (Desktop Safari) — so the same checks are verified cross-browser.

---

## Reporting

Playwright generates an HTML report after each run. Open the most recent one with:

```bash
npx playwright show-report
```

In CI, the same report is uploaded as a build artifact (`playwright-report`, retained 30 days), so a failed run on GitHub can be downloaded and inspected locally.

---

## Test Coverage

- **Authentication** — a standard user logs in and lands on the inventory page; a locked-out user is blocked and shown the error message.
- **Inventory** — products render; all four sort orders (name A–Z and Z–A, price low–high and high–low) are verified by reading the displayed list and asserting it matches a programmatically sorted copy; the cart badge increments correctly as items are added.
- **Checkout — full end-to-end flow** — add items, move through the cart, complete the customer-information form, review the overview, finish, and reach the confirmation page, asserting the expected URL and page title at each step.
- **Data integrity at the overview step** — item names, prices, and descriptions on the order overview match the expected product data, and the displayed subtotal equals the sum of the line items. This is the core check that data isn't dropped or altered between pages.
- **Form validation** — missing first name, last name, and postal code each surface the correct error message; cancel returns to the cart or inventory as appropriate.
- **Documented known issues** — `checkout-edge-cases.spec.ts` holds skipped tests describing application behaviour that diverges from expectation (e.g. SauceDemo allows checkout with an empty cart). Each captures the expected vs. actual behaviour so the gap is tracked rather than silently ignored.

---

## Design Notes

- **Page Object Model.** Each screen is a class that owns its locators and exposes intent-level methods (`login`, `addToCart`, `sortBy`, `fillForm`, `getItemPrice`). Specs read as user actions, and a UI change touches one Page Object instead of every test.
- **`data-test` selectors as the primary strategy.** SauceDemo exposes `data-test` attributes specifically for automation, and every locator selects on those rather than CSS classes or visible text. The suite stays stable against styling and copy changes — locators break only when behaviour actually changes.
- **Authenticated fixture.** `auth.fixture.ts` provides an `authenticatedPage` that is already logged in, so the inventory and checkout specs don't repeat the login steps. Tests that *are* about login use a plain page instead.
- **Scoped lookups for per-item assertions.** `InventoryPage.addToCart(name)` filters the item list to a single product before acting, and `CheckoutPage.getItemPrice(name)` / `getItemDescription(name)` scope to one row on the overview. Scoping to a single product is what makes the per-item price and description integrity checks reliable.
- **Test data separated from logic.** Accounts and product data live in `test-data/`, so the same specs can run against different data without editing test code.

---

## CI

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the full suite on every push and pull request to `main`/`master`. It installs dependencies with `npm ci`, installs the Playwright browsers, runs the tests on `ubuntu-latest`, and uploads the HTML report as an artifact.

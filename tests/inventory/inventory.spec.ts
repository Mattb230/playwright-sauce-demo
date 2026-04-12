import { test, expect } from '../../fixtures/auth.fixture';
import { InventoryPage } from '../../pages/InventoryPage';
import { products } from '../../test-data/products';

test.describe('Inventory', () => {

  test('products are displayed on the inventory page', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const names = await inventoryPage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
  });

  test('default sort is A to Z', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('sort Z to A works correctly', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('sort by price low to high works correctly', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const numbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });

  test('sort by price high to low works correctly', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    const numbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numbers].sort((a, b) => b - a);
    expect(numbers).toEqual(sorted);
  });

  test('adding a product increments the cart badge', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.addToCart(products.backpack.name);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });

  test('adding multiple products shows correct cart count', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.addToCart(products.backpack.name);
    await inventoryPage.addToCart(products.bikeLight.name);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(2);
  });

});
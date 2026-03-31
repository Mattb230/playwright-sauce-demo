import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { users } from '../../test-data/users'

test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(users.standard.username, users.standard.password)
  })

  test('products are displayed on the inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const names = await inventoryPage.getProductNames()
    expect(names.length).toBeGreaterThan(0)
  })

  test('default sort is A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    const names = await inventoryPage.getProductNames()
    const sorted = [...names].sort()
    expect(names).toEqual(sorted)
  })

  test('sort Z to A works correctly', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.sortBy('za')
    const names = await inventoryPage.getProductNames()
    const sorted = [...names].sort().reverse()
    expect(names).toEqual(sorted)
  })

  test('sort by price low to high works correctly', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.sortBy('lohi')
    const prices = await inventoryPage.getProductPrices()
    const numbers = prices.map(p => parseFloat(p.replace('$', '')))
    const sorted = [...numbers].sort((a, b) => a - b)
    expect(numbers).toEqual(sorted)
  })

  test('sort by price high to low works correctly', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.sortBy('hilo')
    const prices = await inventoryPage.getProductPrices()
    const numbers = prices.map(p => parseFloat(p.replace('$', '')))
    const sorted = [...numbers].sort((a, b) => b - a)
    expect(numbers).toEqual(sorted)
  })

  test('adding a product increments the cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.addToCart('Sauce Labs Backpack')
    const count = await inventoryPage.getCartCount()
    expect(count).toBe(1)
  })

  test('adding multiple products shows correct cart count', async ({ page }) => {
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.addToCart('Sauce Labs Backpack')
    await inventoryPage.addToCart('Sauce Labs Bike Light')
    const count = await inventoryPage.getCartCount()
    expect(count).toBe(2)
  })

})
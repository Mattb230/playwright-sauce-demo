import { Page, Locator } from '@playwright/test'

export class InventoryPage {
  readonly page: Page
  readonly productList : Locator
  readonly productItems: Locator
  readonly productTitles: Locator
  readonly productPrices: Locator
  readonly sortDropdown: Locator
  readonly cartBadge: Locator
  readonly cartLink: Locator

  constructor(page: Page) {
      this.page = page
      this.productList = page.locator('[data-test="inventory-container"]')
      //this.productList = page.locator('[data-test="inventory-list"]')
      this.productItems = page.locator('[data-test="inventory-item"]')
      this.productTitles = page.locator('[data-test="inventory-item-name"]')
      this.productPrices = page.locator('[data-test="inventory-item-price"]')
      this.sortDropdown = page.locator('[data-test="product-sort-container"]')
      this.cartLink = page.locator('[data-test="shopping-cart-link"]')
      this.cartBadge = this.cartLink.locator('[data-test="shopping-cart-badge"]')
  }
  async getProductNames(): Promise<string[]> {
    return this.productTitles.allTextContents()
  }
  
  async getProductPrices(): Promise<string[]> {
    return this.productPrices.allTextContents()
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option)
  }

  async addToCart(productName: string): Promise<void> {
    const item = this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
    await item.getByRole('button', { name: /add to cart/i }).click()
  }

  async getCartCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible()
    if (!isVisible) return 0
    const text = await this.cartBadge.textContent()
    return parseInt(text ?? '0', 10)
  }
    
}


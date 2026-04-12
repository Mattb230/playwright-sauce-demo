import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Shared
  readonly cancelButton: Locator;
  readonly pageTitle: Locator;

  // Step One
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Step Two
  readonly overviewItemList: Locator;
  readonly overviewItemName: Locator;
  readonly overviewItemDescription: Locator;
  readonly overviewItemPrice: Locator;
  readonly overviewSubtotal: Locator;
  readonly overviewTax: Locator;
  readonly overviewTotal: Locator;
  readonly finishButton: Locator;

  // Confirmation
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Shared
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.pageTitle = page.locator('[data-test="title"]');

    // Step One
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step Two
    this.overviewItemList = page.locator('[data-test="cart-list"]');
    this.overviewItemName = page.locator('[data-test="inventory-item-name"]');
    this.overviewItemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.overviewItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.overviewSubtotal = page.locator('[data-test="subtotal-label"]');
    this.overviewTax = page.locator('[data-test="tax-label"]');
    this.overviewTotal = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Confirmation
    this.confirmationMessage = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Step 1
  async fillForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  // Step 2
  async getItemPrice(productName: string): Promise<string> {
    const price = await this.overviewItemList
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('[data-test="inventory-item-price"]')
      .textContent();
    return price ?? '0';
  }

  async getItemDescription(productName: string): Promise<string> {
    const desc = await this.overviewItemList
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('[data-test="inventory-item-desc"]')
      .textContent();
    return desc ?? '0';
  }

  async getSubtotalNumber(): Promise<number> {
    const subTotalTxt = await this.overviewSubtotal.textContent() ?? '0';
    return parseFloat(subTotalTxt.replace(/[^0-9.]/g, ''));
  }

  async getOverviewItemNames(): Promise<string[]> {
    return this.overviewItemName.allTextContents();
  }

  async getOverviewItemDescriptions(): Promise<string[]> {
    return this.overviewItemDescription.allTextContents();
  }

  async getOverviewItemPrices(): Promise<string[]> {
    return this.overviewItemPrice.allTextContents();
  }
}
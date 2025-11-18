import { test, expect } from '@playwright/test';
import { books } from '../bookData';

test.describe('Verify navigations across all pages on app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
  });

  test('E2E => Homepage -> Details page -> Back to Library(using button)', async ({ page }) => {
    
    const firstBook = books[0];
    await page.click(`text=${firstBook.title}`);
    const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
    await backButton.waitFor({timeout: 3000});

    await backButton.click();
    const libraryHeading = page.locator("//h1");
    await expect(libraryHeading).toBeVisible();
  });

  test("E2E => Homepage -> Details page -> Back to Library(using '←' link)", async ({ page }) => {
    
    const firstBook = books[0];
    await page.click(`text=${firstBook.title}`);
    const backLink = page.getByRole('link', { name: '← Back to Library' });
    await backLink.waitFor({ timeout: 3000 });
    const bookTitle = await page.locator(`text=${firstBook.title}`).innerText();
    expect(bookTitle).toBe(firstBook.title);
    await backLink.click();
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
  });

});


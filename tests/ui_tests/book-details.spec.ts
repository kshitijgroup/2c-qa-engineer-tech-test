import { test, expect } from '@playwright/test';
import { books } from '../bookData';

test.describe('Books Details page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
  });

  test('Positive => Clicking on View Details link opens book details page', async ({ page }) => {
    
    /** This test will click on View Details link on first book on Library homepage
        and verify Book details page is open and assert book's title. **/
    const book = books[0];
    await page.locator(`//*[text()='${book.title}']//ancestor::a//*[contains(text(),'View details')]`).click();
    const backLink = page.getByRole('link', { name: '← Back to Library' });
    await backLink.waitFor({timeout: 3000});
    const bookTitle = await page.locator(`text=${book.title}`).textContent();
    expect(bookTitle).toBe(`${book.title}`);
    await backLink.click();
    const libraryHeading = page.locator("//h1");
    await expect(libraryHeading).toBeVisible();
  });

  test('E2E => Verify all default books in library have matching details on Book detail page', async ({ page }) => {
    
    /** This test will click on each book on Library homepage and verify its matching 
        details on Book details page **/
    for (let i = 0; i < books.length; i++) {

      const currentBook = books[i];
      await page.click(`text=${currentBook.title}`);

      const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
      await backButton.waitFor({ timeout: 3000 });

      const bookTitle = await page.locator("//h1").innerText();
      const bookAuthor = await page.locator("(//p)[1]").innerText();
      const bookGenre = await page.locator("(//p)[2]").innerText();
      const bookPublishedYear = await page.locator("(//p)[3]").innerText();
      const bookPages = await page.locator("(//p)[4]").innerText();
      const bookISBN = await page.locator("(//p)[5]").innerText();
      const bookDescription = await page.locator("(//p)[6]").innerText();

      expect(bookTitle).toBe(currentBook.title);
      expect(bookAuthor).toContain(currentBook.author);
      expect(bookGenre).toBe(currentBook.genre);
      expect(bookPublishedYear).toContain(currentBook.year);
      expect(bookPages).toContain(currentBook.pages);
      expect(bookISBN).toBe(currentBook.isbn);
      expect(bookDescription).toContain(currentBook.description);

      await backButton.click();
      await expect(page.locator("//h1")).toBeVisible();
    }

  });

  test('Positive => Verify book details page can be accessed using direct url', async ({ page }) => {
    const pageUrl = page.url();
    const firstBookUrl = pageUrl + 'book/1';

    await page.goto(firstBookUrl);
    const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
    await backButton.waitFor({ timeout: 3000 });

    const book = books[0];
    const bookTitle = await page.locator("//h1").innerText();
    const bookAuthor = await page.locator("(//p)[1]").innerText();
    const bookGenre = await page.locator("(//p)[2]").innerText();
    const bookPublishedYear = await page.locator("(//p)[3]").innerText();
    const bookPages = await page.locator("(//p)[4]").innerText();
    const bookISBN = await page.locator("(//p)[5]").innerText();
    const bookDescription = await page.locator("(//p)[6]").innerText();

    expect(bookTitle).toBe(book.title);
    expect(bookAuthor).toContain(book.author);
    expect(bookGenre).toBe(book.genre);
    expect(bookPublishedYear).toContain(book.year);
    expect(bookPages).toContain(book.pages);
    expect(bookISBN).toBe(book.isbn);
    expect(bookDescription).toContain(book.description);

  });

  test('Negative => Verify book not found text is displayed for non existing book url', async ({ page }) => {
    const pageUrl = page.url();
    const bookUrl = pageUrl + 'book/999';
    const response = await page.goto(bookUrl);
    expect(response?.status()).toBe(200);

    const bookNotFoundText = await page.locator("text=Book not found").textContent();
    expect(bookNotFoundText).toBe('Book not found');

    const backButton = page.getByRole('link', { name: 'Back to Library' });
    await backButton.click();
    const libraryHeading = page.locator("//h1");
    await expect(libraryHeading).toBeVisible();

  });

});
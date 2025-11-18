import { test, expect } from '@playwright/test';
import { books } from '../bookData';

test('Positive => Displays details of all default books on Books Library homepage', async ({ page }) => {
  
  /** This test will verify each book's details on Library homepage **/
  await page.goto('/');
  const libraryHeading = page.locator("//*[text()='Book Library']");
  await libraryHeading.waitFor({timeout: 5000});

  let j=1;
  for (let i = 0; i < books.length; i++) {
    const book = books[i];   // grab the object for current book

    const bookTitle = await page.locator(`(//h2)[${j}]`).innerText();
    const bookAuthor = await page.locator(`(//h2/parent::div/following-sibling::p[1])[${j}]`).innerText();
    const bookGenre = await page.locator(`(//h2/parent::div/following-sibling::div[1]/span[1])[${j}]`).innerText();
    const bookPublishedYear = await page.locator(`(//h2/parent::div/following-sibling::div[1]/span[2])[${j}]`).innerText();
    const bookPages = await page.locator(`(//h2/parent::div/following-sibling::div[1]/span[3])[${j}]`).innerText();
    const bookDescription = await page.locator(`(//h2/parent::div/following-sibling::p[2])[${j}]`).innerText();
    const bookRating = page.locator(`(//h2/parent::div//span[1])[${j}]`);

    expect(bookTitle).toBe(book.title);
    expect(bookAuthor).toContain(book.author);
    expect(bookGenre).toBe(book.genre);
    expect(bookPublishedYear).toBe(book.year);
    expect(bookPages).toContain(book.pages);
    expect(bookDescription).toContain(book.description);
    await expect(bookRating).toBeVisible();

    j++;
}

});

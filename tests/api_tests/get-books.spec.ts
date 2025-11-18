import { test, expect } from '@playwright/test';
import { Book, books as library } from '../bookData';

test('Positive => GET /api/books fetches all books in library', async ({ request }) => {
  
  const response = await request.get('/api/books');
  expect(response.ok()).toBeTruthy();

  const apiBooks = await response.json() as Book[];

  // Verify count of books to be >= default books
  expect(apiBooks.length).toBeGreaterThanOrEqual(library.length);

  // Create a map of API books by title for easy lookup
  const apiByTitle = new Map(apiBooks.map(b => [b.title, b]));

  // 3) compare each expected book to the API book
  for (const book of library) {
    const apiBook = apiByTitle.get(book.title);

  if (!apiBook) {
    throw new Error(`Book with title "${book.title}" not found in API response`);
  }

  expect(apiBook.title).toBe(book.title);
  expect(apiBook.author).toBe(book.author);
  expect(apiBook.genre).toBe(book.genre);
  expect(String(apiBook.publishedYear)).toBe(book.year);
  expect(String(apiBook.pages)).toBe(String(book.pages));
  expect(apiBook.description).toContain(book.description);
  }

});

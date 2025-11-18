import { test, expect } from '@playwright/test';
import { books } from '../bookData';

test('Positive => GET /api/books/${bookid} fetches book in library using book id', async ({ request }) => {
  
  const bookid = 2;
  const response = await request.get(`/api/books/${bookid}`);
  expect(response.ok()).toBeTruthy();

  const apiBook = await response.json();
  expect(apiBook.title).toBe(books[`${bookid-1}`].title);
  expect(apiBook.author).toBe(books[`${bookid-1}`].author);
  expect(apiBook.genre).toBe(books[`${bookid-1}`].genre);
  expect(String(apiBook.publishedYear)).toBe(books[`${bookid-1}`].year);
  expect(String(apiBook.pages)).toBe(String(books[`${bookid-1}`].pages));
  expect(apiBook.description).toContain(books[`${bookid-1}`].description);

});

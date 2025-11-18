import { test, expect } from '@playwright/test';
import { Book } from '../bookData';

test.describe('Validate POST /api/books/ endpoint and verify using GET API and UI (homepage + details)', () => {

  test('E2E => POST /api/books creates new book using only required fields', async ({ request, page }) => {
    const payload = { 
                    title: 'POST books test' + Date.now(), 
                    author: 'API BOT' 
                  };
    const post = await request.post('/api/books', { data: payload });
    expect(post.status()).toBe(201);
    const body = await post.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(payload.title);
    expect(body.author).toBe(payload.author);
    expect(body.genre).toBe('Unknown');
    expect(body.publishedYear).toBe(2025);
    expect(body.pages).toBe(0); // ** Bug found: should not create a book with 0 pages **
    expect(body.isbn).toBe('N/A');
    expect(body.description).toContain('No description available.');

    // Verify the new book is present in the GET /api/books response
    const getResponse = await request.get('/api/books/');
    expect(getResponse.status()).toBe(200);
    const booksList = await getResponse.json();
    const createdBook = booksList.find((b: Book) => b.id === body.id);
    expect(createdBook).toBeDefined();
    expect(createdBook.title).toBe(payload.title);
    expect(createdBook.author).toBe(payload.author);

    // Verify the new book is present in the GET /api/books/book.id response
    const getBookResponse = await request.get(`/api/books/${body.id}`);
    expect(getBookResponse.status()).toBe(200);
    const getBook = await getBookResponse.json();
    expect(getBook.title).toBe(payload.title);
    expect(getBook.author).toBe(payload.author);
    expect(getBook.genre).toBe('Unknown');
    expect(getBook.publishedYear).toBe(2025);
    expect(getBook.pages).toBe(0);
    expect(getBook.isbn).toBe('N/A');
    expect(getBook.description).toContain('No description available.');

    // Verify via UI that the new book is accessible on Library homepage and details page
    await page.goto('/');
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
    const bookTitleLocator = page.locator(`text=${payload.title}`);
    await bookTitleLocator.last().scrollIntoViewIfNeeded();
    await bookTitleLocator.last().click();
    const backLink = page.getByRole('link', { name: '← Back to Library' });
    await backLink.waitFor({timeout: 3000});
    const bookTitleOnDetails = await page.locator("//h1").innerText();
    expect(bookTitleOnDetails).toContain(payload.title);
  });

  test('E2E => POST /api/books creates new book using all fields', async ({ request, page }) => {
    const payload = { 
                    title: '2nd POST books test' + Date.now(), 
                    author: 'API BOT',
                    genre: 'Science Fiction',
                    publishedYear: 2023,
                    pages: 350,
                    isbn: '123-4567890123',
                    description: 'This is a test book created via API POST request using all fields.',
                    rating: 4
                  };
    const post = await request.post('/api/books', { data: payload });
    expect(post.status()).toBe(201);
    const body = await post.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(payload.title);
    expect(body.author).toBe(payload.author);
    expect(body.genre).toBe(payload.genre);
    expect(body.publishedYear).toBe(payload.publishedYear);
    expect(body.pages).toBe(payload.pages);
    expect(body.isbn).toBe(payload.isbn);
    expect(body.description).toContain(payload.description);

    // Verify the new book is present in the GET /api/books response
    const getResponse = await request.get('/api/books/');
    expect(getResponse.status()).toBe(200);
    const booksList = await getResponse.json();
    const createdBook = booksList.find((b: Book) => b.id === body.id);
    expect(createdBook).toBeDefined();
    expect(createdBook.title).toBe(payload.title);
    expect(createdBook.author).toBe(payload.author);

    // Verify the new book is present in the GET /api/books/book.id response
    const getBookResponse = await request.get(`/api/books/${body.id}`);
    expect(getBookResponse.status()).toBe(200);
    const getBook = await getBookResponse.json();
    expect(getBook.title).toBe(payload.title);
    expect(getBook.author).toBe(payload.author);
    expect(getBook.genre).toBe(payload.genre);
    expect(getBook.publishedYear).toBe(payload.publishedYear);
    expect(getBook.pages).toBe(payload.pages);
    expect(getBook.isbn).toBe(payload.isbn);
    expect(getBook.description).toContain(payload.description);

    // Verify via UI that the new book is accessible on Library homepage and details page
    await page.goto('/');
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
    const bookTitleLocator = page.locator(`text=${payload.title}`);
    await bookTitleLocator.scrollIntoViewIfNeeded()
    await bookTitleLocator.click();
    const backLink = page.getByRole('link', { name: '← Back to Library' });
    await backLink.waitFor({timeout: 3000});
    const bookTitleOnDetails = await page.locator("//h1").innerText();
    expect(bookTitleOnDetails).toContain(payload.title);

  });

});
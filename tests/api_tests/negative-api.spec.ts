import { test, expect } from '@playwright/test';

test.describe('Validate negative scenarios of GET & POST endpoints', () => {

  test('Negative => Missing required fields in POST /api/books throws 400 error', async ({ request }) => {
    
    // Using only 'title' field
    const payload = { title: 'POST books test' };
    const post = await request.post('/api/books', { data: payload });
    expect(post.status()).toBe(400);

    // Using only 'author' field
    const payload2 = { author: 'Dummy Author' };
    const post2 = await request.post('/api/books', { data: payload2 });
    expect(post2.status()).toBe(400);
    
  });

  test('Negative => Using only optional fields in payload in POST /api/books throws 400 error', async ({ request }) => {
    
    // Missing both required fields: title and author
    const payload = { genre: 'Fiction' };
    const post = await request.post('/api/books', { data: payload });
    expect(post.status()).toBe(400);
    
  });

    test('Negative => GET /api/books/${bookid} return error if book id is not found', async ({ request }) => {
    
    // Using invalid book id
    const bookid = 9999;
    const response = await request.get(`/api/books/${bookid}`);
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);

  });

  test('Negative => Invalid path parameter in GET endpoint throws 404 error', async ({ request }) => {
    
    // Using invalid path parameter 'book' instead of 'books'
    const response = await request.get('/api/book/');
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);

  });

});
import { test, expect } from '@playwright/test';
import { books } from '../bookData';

const title = `Interview preparation-${Date.now()}`;

test.describe('Add New Book form page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
  });

  test('E2E => Verify user is able Add new book from homepage', async ({ page }) => {
        
    const author = 'Playwright team';
    const genre = 'Thriller';
    const year = '2010';
    const pages = '213';
    const isbn = '82023947023';
    const rating = '5';
    const description = 'Crack any interview with this comprehensive guide.';

    const addNewBookButton = page.getByRole('link', { name: 'Add New Book' });
    await addNewBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');

    // Fill the Add New Book form
    await page.getByRole('textbox', { name: 'Title *' }).fill(title);
    await page.getByRole('textbox', { name: 'Author *' }).fill(author);
    await page.getByLabel('Genre').selectOption(genre);
    await page.getByRole('spinbutton', { name: 'Published Year' }).clear()
    await page.getByRole('spinbutton', { name: 'Published Year' }).fill(year);
    await page.getByRole('spinbutton', { name: 'Pages' }).clear();
    await page.getByRole('spinbutton', { name: 'Pages' }).fill(pages);
    await page.getByRole('textbox', { name: 'ISBN' }).fill(isbn);
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).clear();
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).fill(rating);
    await page.getByRole('textbox', { name: 'Description' }).fill(description);
    
    // Submit the form
    await page.getByRole('button', { name: 'Add Book' }).click();

    // Verify success message is displayed
    const successMessage = page.locator("text=Book Added Successfully!");
    await successMessage.waitFor({ timeout: 2000 });
    expect(await successMessage.textContent()).toBe('Book Added Successfully!');

    // Verify the new book appears on the book details page and entered details are correct
    const bookTitle = await page.locator("//h1").innerText();
    const bookAuthor = await page.locator("(//p)[1]").innerText();
    const bookGenre = await page.locator("(//p)[2]").innerText();
    const bookPublishedYear = await page.locator("(//p)[3]").innerText();
    const bookPages = await page.locator("(//p)[4]").innerText();
    const bookISBN = await page.locator("(//p)[5]").innerText();
    const bookDescription = await page.locator("(//p)[6]").innerText();

    expect(bookTitle).toBe(title);
    expect(bookAuthor).toContain(author);
    expect(bookGenre).toBe(genre);
    expect(bookPublishedYear).toContain(year);
    expect(bookPages).toContain(pages);
    expect(bookISBN).toBe(isbn);
    expect(bookDescription).toContain(description);

    // Verify the new book appears on the Book library homepage and entered details are correct
    const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
    await backButton.click();
    const newBookTitle = await page.locator(`text=${title}`).innerText();
    const newBookAuthor = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::p[1]`).innerText();
    const newBookGenre = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[1]`).innerText();
    const newBookYear = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[2]`).innerText();
    const newBookPages = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[3]`).innerText();
    const newBookDescription = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::p[2]`).innerText();
    const newBookRating = page.locator(`//h2[text()='${title}']/parent::div//span[1]`);

    expect(newBookTitle).toBe(title);
    expect(newBookAuthor).toContain(author);
    expect(newBookGenre).toBe(genre);
    expect(newBookYear).toBe(year);
    expect(newBookPages).toContain(pages);
    expect(newBookDescription).toContain(description);
    await expect(newBookRating).toBeVisible();
    
  });

  test('E2E => Verify user is able Add new book from book details page', async ({ page }) => {
    
    const title = `Coding preparation-${Date.now()}`;
    const author = 'Geeks team';
    const genre = 'Fiction';
    const year = '2016';
    const pages = '303';
    const isbn = '82045277023';
    const rating = '3';
    const description = 'Crack any coding round with this book.';

    const firstBook = books[0];
    await page.click(`text=${firstBook.title}`);

    const addAnotherBookButton = page.getByRole('link', { name: 'Add Another Book' });
    await addAnotherBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');

    // Fill the Add New Book form
    await page.getByRole('textbox', { name: 'Title *' }).fill(title);
    await page.getByRole('textbox', { name: 'Author *' }).fill(author);
    await page.getByLabel('Genre').selectOption(genre);
    await page.getByRole('spinbutton', { name: 'Published Year' }).clear()
    await page.getByRole('spinbutton', { name: 'Published Year' }).fill(year);
    await page.getByRole('spinbutton', { name: 'Pages' }).clear();
    await page.getByRole('spinbutton', { name: 'Pages' }).fill(pages);
    await page.getByRole('textbox', { name: 'ISBN' }).fill(isbn);
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).clear();
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).fill(rating);
    await page.getByRole('textbox', { name: 'Description' }).fill(description);
    
    // Submit the form
    await page.getByRole('button', { name: 'Add Book' }).click();

    // Verify success message is displayed
    const successMessage = page.locator("text=Book Added Successfully!");
    await successMessage.waitFor({ timeout: 2000 });
    expect(await successMessage.textContent()).toBe('Book Added Successfully!');

    // Verify the new book appears on the book details page and entered details are correct
    const bookTitle = await page.locator("//h1").innerText();
    const bookAuthor = await page.locator("(//p)[1]").innerText();
    const bookGenre = await page.locator("(//p)[2]").innerText();
    const bookPublishedYear = await page.locator("(//p)[3]").innerText();
    const bookPages = await page.locator("(//p)[4]").innerText();
    const bookISBN = await page.locator("(//p)[5]").innerText();
    const bookDescription = await page.locator("(//p)[6]").innerText();

    expect(bookTitle).toBe(title);
    expect(bookAuthor).toContain(author);
    expect(bookGenre).toBe(genre);
    expect(bookPublishedYear).toContain(year);
    expect(bookPages).toContain(pages);
    expect(bookISBN).toBe(isbn);
    expect(bookDescription).toContain(description);

    // Verify the new book appears on the Book library homepage and entered details are correct
    const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
    await backButton.click();
    const newBookTitle = await page.locator(`text=${title}`).innerText();
    const newBookAuthor = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::p[1]`).innerText();
    const newBookGenre = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[1]`).innerText();
    const newBookYear = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[2]`).innerText();
    const newBookPages = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[3]`).innerText();
    const newBookDescription = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::p[2]`).innerText();
    const newBookRating = page.locator(`//h2[text()='${title}']/parent::div//span[1]`);

    expect(newBookTitle).toBe(title);
    expect(newBookAuthor).toContain(author);
    expect(newBookGenre).toBe(genre);
    expect(newBookYear).toBe(year);
    expect(newBookPages).toContain(pages);
    expect(newBookDescription).toContain(description);
    await expect(newBookRating).toBeVisible();
    
  });

  test('Positive => Verify user is able to open newly added book on details page', async ({ page }) => {
    
    const author = 'Coding with KC';
    const pages = '30';

    const addNewBookButton = page.getByRole('link', { name: 'Add New Book' });
    await addNewBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');

    // Fill the Add New Book form using only required fields
    await page.getByRole('textbox', { name: 'Title *' }).fill(title);
    await page.getByRole('textbox', { name: 'Author *' }).fill(author);
    await page.getByRole('spinbutton', { name: 'Pages' }).clear();
    await page.getByRole('spinbutton', { name: 'Pages' }).fill(pages);
    
    // Submit the form
    await page.getByRole('button', { name: 'Add Book' }).click();

    // Verify success message is displayed
    const successMessage = page.locator("text=Book Added Successfully!");
    await successMessage.waitFor({ timeout: 2000 });
    expect(await successMessage.textContent()).toBe('Book Added Successfully!');
    
    const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
    await backButton.waitFor({timeout: 3000});

    await backButton.click();
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
    await page.locator("//*[contains(text(),'Interview preparation-')]").first().click();

    await backButton.waitFor({ timeout: 3000 });
    const bookTitle = await page.locator("//h1").innerText();
    expect(bookTitle).toContain('Interview preparation-');
    
  });

  test('E2E => Create new book using only required fields', async ({ page }) => {
    
    const title = `RequiredOnly-${Date.now()}`;
    const author = 'Coding with KC';
    const pages = '30';

    const addNewBookButton = page.getByRole('link', { name: 'Add New Book' });
    await addNewBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');

    // Fill the Add New Book form using only required fields
    await page.getByRole('textbox', { name: 'Title *' }).fill(title);
    await page.getByRole('textbox', { name: 'Author *' }).fill(author);
    await page.getByRole('spinbutton', { name: 'Pages' }).clear();
    await page.getByRole('spinbutton', { name: 'Pages' }).fill(pages);
    
    // Submit the form
    await page.getByRole('button', { name: 'Add Book' }).click();

    // Verify success message is displayed
    const successMessage = page.locator("text=Book Added Successfully!");
    await successMessage.waitFor({ timeout: 2000 });
    expect(await successMessage.textContent()).toBe('Book Added Successfully!');

    // Verify the new book appears on the book details page and entered details are correct
    const bookTitle = await page.locator("//h1").innerText();
    const bookAuthor = await page.locator("(//p)[1]").innerText();
    const bookGenre = await page.locator("(//p)[2]").innerText();
    const bookPublishedYear = await page.locator("(//p)[3]").innerText();
    const bookPages = await page.locator("(//p)[4]").innerText();
    const bookISBN = await page.locator("(//p)[5]").innerText();
    const bookDescription = await page.locator("(//p)[6]").innerText();

    expect(bookTitle).toBe(title);
    expect(bookAuthor).toContain(author);
    expect(bookGenre).toBe('Unknown');
    expect(bookPublishedYear).toContain('2025');
    expect(bookPages).toContain(pages);
    expect(bookISBN).toBe('N/A');
    expect(bookDescription).toContain('No description available.');

    // Verify the new book appears on the Book library homepage and entered details are correct
    const backButton = page.getByRole('link', { name: 'Back to Library', exact: true });
    await backButton.click();
    const newBookTitle = await page.locator(`text=${title}`).innerText();
    const newBookAuthor = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::p[1]`).innerText();
    const newBookGenre = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[1]`).innerText();
    const newBookYear = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[2]`).innerText();
    const newBookPages = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::div[1]/span[3]`).innerText();
    const newBookDescription = await page.locator(`//h2[text()='${title}']/parent::div/following-sibling::p[2]`).innerText();
    const newBookRating = page.locator(`//h2[text()='${title}']/parent::div//span[1]`);

    expect(newBookTitle).toBe(title);
    expect(newBookAuthor).toContain(author);
    expect(newBookGenre).toBe('Unknown');
    expect(newBookYear).toBe('2025');
    expect(newBookPages).toContain(pages);
    expect(newBookDescription).toContain('No description available.');
    await expect(newBookRating).toBeVisible();
    
  });

  test('Negative => Verify error messages for required fields viz. Title, Author and Pages field on Add New Book form page', async ({ page }) => {
    
    const title = 'TitleError';
    const author = 'AuthorError';
    const pages = '30';
    const validMessages = [
      'Value must be greater than or equal to 1.',
      'Value must be greater than or equal to 1',
      'Please select a value that is no less than 1.',
      'Please fill out this field.',
      'Fill out this field'
    ];

    const addNewBookButton = page.getByRole('link', { name: 'Add New Book' });
    await addNewBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');

    // Verify error message for Title field
    await page.getByRole('button', { name: 'Add Book' }).click();
    const titleErrorMessage = await page.locator('#title').evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validMessages).toContain(titleErrorMessage);
    await page.getByRole('textbox', { name: 'Title *' }).fill(title);

    // Verify error message for Author field
    await page.getByRole('button', { name: 'Add Book' }).click();
    const authorErrorMessage = await page.locator('#author').evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validMessages).toContain(authorErrorMessage);
    await page.getByRole('textbox', { name: 'Author *' }).fill(author);

    // Verify error message for Pages field
    await page.getByRole('button', { name: 'Add Book' }).click();
    const pagesErrorMessage = await page.locator('#pages').evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validMessages).toContain(pagesErrorMessage);
    await page.getByRole('spinbutton', { name: 'Pages' }).clear();
    await page.getByRole('spinbutton', { name: 'Pages' }).fill(pages);
    await page.getByRole('button', { name: 'Add Book' }).click();

    // Verify success message is displayed
    const successMessage = page.locator("text=Book Added Successfully!");
    await successMessage.waitFor({ timeout: 2000 });
    expect(await successMessage.textContent()).toBe('Book Added Successfully!');
    
  });

  test('Negative => Verify error messages for optional fields Published Year and Rating field on Add New Book form page', async ({ page }) => {
    
    const title = 'TitleError';
    const author = 'AuthorError';
    const pages = '30';
    const validMessages = [
      'Value must be less than or equal to 2026.',
      'Value must be less than or equal to 2026',
      'Please select a value that is no more than 2026.',
      'Value must be less than or equal to 5.',
      'Value must be less than or equal to 5',
      'Please select a value that is no more than 5.',
    ];

    const addNewBookButton = page.getByRole('link', { name: 'Add New Book' });
    await addNewBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');
    
    await page.getByRole('textbox', { name: 'Title *' }).fill(title);
    await page.getByRole('textbox', { name: 'Author *' }).fill(author);

    // Verify error message for Published Year field
    await page.getByRole('spinbutton', { name: 'Published Year' }).fill('9999999');
    await page.getByRole('button', { name: 'Add Book' }).click();
    const yearErrorMessage = await page.locator('#publishedYear').evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validMessages).toContain(yearErrorMessage);
    await page.getByRole('spinbutton', { name: 'Published Year' }).clear();
    await page.getByRole('spinbutton', { name: 'Published Year' }).fill('2020');

    // Verify error message for Rating field
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).fill('8');
    await page.getByRole('button', { name: 'Add Book' }).click();
    const ratingErrorMessage = await page.locator('#rating').evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validMessages).toContain(ratingErrorMessage);
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).clear();
    await page.getByRole('spinbutton', { name: 'Rating (1-5)' }).fill('2');

    // Verify error message for Pages field
    await page.getByRole('spinbutton', { name: 'Pages' }).fill(pages);
    await page.getByRole('button', { name: 'Add Book' }).click();

    // Verify success message is displayed
    const successMessage = page.locator("text=Book Added Successfully!");
    await successMessage.waitFor({ timeout: 2000 });
    expect(await successMessage.textContent()).toBe('Book Added Successfully!');
    
  });

  test('Positive => Clicking on Cancel button goes back to Library homepage', async ({ page }) => {

    const addNewBookButton = page.getByRole('link', { name: 'Add New Book' });
    await addNewBookButton.click();
    await page.getByRole('button', { name: 'Add Book' }).waitFor({ timeout: 3000 });
    const addBookHeading = page.locator("//form/preceding-sibling::h1");
    await addBookHeading.waitFor({ timeout: 3000 });
    expect(await addBookHeading.textContent()).toBe('Add New Book');

    await page.getByRole('link', { name: 'Cancel' }).click();
    const libraryHeading = page.locator("//*[text()='Book Library']");
    await libraryHeading.waitFor({timeout: 5000});
    
  });

});
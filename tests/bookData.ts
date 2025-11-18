export interface Book {
  [x: string]: string;
  title: string;
  author: string;
  genre: string;
  year: string;
  pages: string;
  isbn: string;
  description: string;
}

export const books: Book[] = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    year: '1925',
    pages: '180',
    isbn: '978-0743273565',
    description:
      "A story of decadence and excess, Gatsby explores the darker aspects of the Jazz Age, and in its characters' inability to achieve their dreams, it creates a portrait of the American Dream itself.",
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    year: '1960',
    pages: '281',
    isbn: '978-0446310789',
    description:
      "The story of young Scout Finch and her father Atticus in a racially divided Alabama town during the Great Depression.",
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: '1949',
    pages: '328',
    isbn: '978-0451524935',
    description:
      "A dystopian social science fiction novel and cautionary tale about totalitarianism.",
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: '1813',
    pages: '432',
    isbn: '978-0141439518',
    description:
      "The story follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments.",
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    year: '1937',
    pages: '366',
    isbn: '978-0547928241',
    description:
      "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who embarks on a quest to reclaim a dwarf kingdom.",
  },
];

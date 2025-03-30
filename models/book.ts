// Book data model and in-memory storage

// Book interface definition
export interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  published: number;
  createdAt: Date;
  updatedAt?: Date;
}

// In-memory storage for books
// Using an empty array as starting point
export const books: Book[] = [];

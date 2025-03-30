// Books routes for the API
import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Book, books } from "../models/book.ts";
import { createResponse } from "../helpers/response.ts";

export const router = new Router({ prefix: "/api/books" });

// GET all books
router.get("/", (ctx) => {
  ctx.response.body = createResponse(true, "Books retrieved successfully", books);
});

// GET a book by ID
router.get("/:id", (ctx) => {
  const id = ctx.params.id;
  
  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = createResponse(false, "Book ID is required");
    return;
  }

  const book = books.find(b => b.id === id);
  
  if (!book) {
    ctx.response.status = 404;
    ctx.response.body = createResponse(false, `Book with ID ${id} not found`);
    return;
  }

  ctx.response.body = createResponse(true, "Book retrieved successfully", book);
});

// POST a new book
router.post("/", async (ctx) => {
  try {
    const body = await ctx.request.body().value;
    
    // Validate required fields
    if (!body || !body.title || !body.author) {
      ctx.response.status = 400;
      ctx.response.body = createResponse(false, "Title and author are required fields");
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: body.title,
      author: body.author,
      pages: body.pages || 0,
      published: body.published || new Date().getFullYear(),
      createdAt: new Date()
    };

    books.push(newBook);
    
    ctx.response.status = 201;
    ctx.response.body = createResponse(true, "Book created successfully", newBook);
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = createResponse(false, `Invalid request data: ${error.message}`);
  }
});

// PUT (update) a book
router.put("/:id", async (ctx) => {
  const id = ctx.params.id;
  
  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = createResponse(false, "Book ID is required");
    return;
  }

  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    ctx.response.status = 404;
    ctx.response.body = createResponse(false, `Book with ID ${id} not found`);
    return;
  }

  try {
    const body = await ctx.request.body().value;
    
    // Update book properties
    const updatedBook: Book = {
      ...books[bookIndex],
      title: body.title || books[bookIndex].title,
      author: body.author || books[bookIndex].author,
      pages: body.pages !== undefined ? body.pages : books[bookIndex].pages,
      published: body.published || books[bookIndex].published,
      updatedAt: new Date()
    };

    books[bookIndex] = updatedBook;
    
    ctx.response.body = createResponse(true, "Book updated successfully", updatedBook);
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = createResponse(false, `Invalid request data: ${error.message}`);
  }
});

// DELETE a book
router.delete("/:id", (ctx) => {
  const id = ctx.params.id;
  
  if (!id) {
    ctx.response.status = 400;
    ctx.response.body = createResponse(false, "Book ID is required");
    return;
  }

  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    ctx.response.status = 404;
    ctx.response.body = createResponse(false, `Book with ID ${id} not found`);
    return;
  }

  // Remove the book from array
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  ctx.response.body = createResponse(true, "Book deleted successfully", deletedBook);
});

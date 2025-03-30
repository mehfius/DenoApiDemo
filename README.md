# Deno Book API

A RESTful API built with Deno and Oak framework for managing a collection of books. This API demonstrates basic CRUD (Create, Read, Update, Delete) operations with a clean architecture.

## Features

- Create, read, update, and delete books
- Middleware for logging and error handling
- Standardized response format
- CORS support
- In-memory data store

## Tech Stack

- [Deno](https://deno.land/) - A secure runtime for JavaScript and TypeScript
- [Oak](https://deno.land/x/oak) - A middleware framework for Deno's HTTP server
- TypeScript - For type safety and better developer experience

## Project Structure

```
├── helpers/        # Helper functions
│   └── response.ts # Response formatting
├── middleware/     # Middleware functions
│   ├── error.ts    # Error handling middleware
│   └── logger.ts   # Request logging middleware
├── models/         # Data models
│   └── book.ts     # Book model and in-memory storage
├── routes/         # API routes
│   └── books.ts    # Book-related endpoints
└── app.ts          # Main application entry point
```

## Running the API

To run the API, you need to have Deno installed on your system. Then run:

```bash
deno run --allow-net --allow-env app.ts
```

The server will start on port 8000 by default.

## API Endpoints

### GET /api/books
- Returns all books

### GET /api/books/:id
- Returns a specific book by ID

### POST /api/books
- Creates a new book
- Required fields in request body: `title`, `author`
- Optional fields: `pages`, `published`

Example request body:
```json
{
  "title": "The Deno Handbook",
  "author": "John Doe",
  "pages": 250,
  "published": 2023
}
```

### PUT /api/books/:id
- Updates an existing book
- At least one field required in request body: `title`, `author`, `pages`, or `published`

Example request body:
```json
{
  "title": "Updated Title",
  "pages": 300
}
```

### DELETE /api/books/:id
- Deletes a book by ID

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful message",
  "data": { ... } // Optional data object
}
```

For errors:

```json
{
  "success": false,
  "message": "Error message"
}
```

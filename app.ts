// Main application entry point for Book API
import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { router as bookRouter } from "./routes/books.ts";
import { logger } from "./middleware/logger.ts";
import { errorHandler } from "./middleware/error.ts";

const app = new Application();
const port = 8000;

// Middleware
app.use(logger);
app.use(errorHandler);
app.use(oakCors());

// Routes
app.use(bookRouter.routes());
app.use(bookRouter.allowedMethods());

// Not found handler
app.use((ctx) => {
  ctx.response.status = 404;
  ctx.response.body = {
    success: false,
    message: "Not Found: The requested resource does not exist."
  };
});

// Start server
console.log(`Server running on http://0.0.0.0:${port}`);
await app.listen({ port, hostname: "0.0.0.0" });

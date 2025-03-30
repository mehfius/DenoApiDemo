// Error handling middleware for Oak
import { Context, Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { createResponse } from "../helpers/response.ts";

export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    console.error(`[ERROR] ${err.message}`);
    
    ctx.response.status = err.status || 500;
    ctx.response.body = createResponse(
      false,
      err.message || "An unexpected error occurred",
      null,
      err.stack
    );
  }
};

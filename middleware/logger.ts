// Logging middleware for Oak
import { Context, Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export const logger = async (ctx: Context, next: Next) => {
  const start = Date.now();
  
  // Log request details
  console.log(`[${new Date().toISOString()}] ${ctx.request.method} ${ctx.request.url.pathname}`);
  
  await next();
  
  // Log response time and status
  const ms = Date.now() - start;
  const status = ctx.response.status;
  
  let statusEmoji = "✅";
  if (status >= 400) statusEmoji = "⚠️";
  if (status >= 500) statusEmoji = "🔥";
  
  console.log(`[${new Date().toISOString()}] ${statusEmoji} ${status} (${ms}ms)`);
};

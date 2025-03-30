// Response formatter helper

/**
 * Creates a standardized API response
 * @param success Indicates if the operation was successful
 * @param message Response message
 * @param data Optional data to include in the response
 * @param error Optional error details (for development)
 * @returns Formatted response object
 */
export const createResponse = (
  success: boolean,
  message: string,
  data: any = null,
  error: any = null
) => {
  const response: Record<string, any> = {
    success,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  // Include error details in non-production environments
  if (!success && error && Deno.env.get("ENVIRONMENT") !== "production") {
    response.error = error;
  }

  return response;
};

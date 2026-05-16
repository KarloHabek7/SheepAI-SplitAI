import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class for API errors with structured error codes.
 * Throw this in route handlers to get consistent JSON error responses.
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Centralized error handling middleware.
 * Catches all errors and returns a consistent APIResponse format.
 * Must be registered LAST in the Express middleware chain.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Determine status code and error details
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const code = err instanceof ApiError ? err.code : 'INTERNAL_ERROR';
  const details = err instanceof ApiError ? err.details : undefined;

  // Log server errors (not client errors)
  if (statusCode >= 500) {
    console.error(`[ERROR] ${code}: ${err.message}`, err.stack);
  }

  // Return structured APIResponse with error
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: err.message,
      details,
    },
    timestamp: new Date().toISOString(),
  });
}

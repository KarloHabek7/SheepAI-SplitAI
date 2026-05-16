import { Request, Response, NextFunction } from 'express';

/**
 * Global Error Handling Middleware
 * Ensures all errors are returned as JSON in a standardized format.
 */
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ErrorHandler]:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

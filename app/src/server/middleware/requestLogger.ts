import { Request, Response, NextFunction } from 'express';

/**
 * Simple request logging middleware.
 * Logs method, path, status code, and response time for every request.
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  // Listen for the response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusIndicator =
      status >= 500 ? '❌' : status >= 400 ? '⚠️' : '✅';

    console.log(
      `${statusIndicator} ${req.method} ${req.path} → ${status} (${duration}ms)`
    );
  });

  next();
}

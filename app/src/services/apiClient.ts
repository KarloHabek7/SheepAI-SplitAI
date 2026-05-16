import { APIResponse } from '@/types';

/**
 * API Base URL from environment variables with local fallback
 */
export const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';

/**
 * Shared fetch helper that wraps all API calls and ensures a consistent response shape.
 * 
 * @param path - The API endpoint path (e.g., '/api/chat')
 * @param options - Standard RequestInit options for fetch()
 * @returns Promise<APIResponse<T>>
 */
export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const url = `${API_BASE}${path}`;
  
  // Set default headers if not provided
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, fetchOptions);
    
    // Attempt to parse JSON response
    const result: APIResponse<T> = await response.json().catch(() => ({
      success: false,
      error: {
        code: 'PARSE_ERROR',
        message: 'Failed to parse server response as JSON'
      },
      timestamp: new Date().toISOString()
    }));

    // If HTTP status is not 2xx, ensure success is false and provide error info
    if (!response.ok && result.success !== false) {
      return {
        success: false,
        error: {
          code: String(response.status),
          message: result.error?.message || response.statusText || 'Unknown API error'
        },
        timestamp: new Date().toISOString()
      };
    }

    return result;
  } catch (err: any) {
    // Handle network errors (e.g., server down, no internet)
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err.message || 'Network request failed'
      },
      timestamp: new Date().toISOString()
    };
  }
}

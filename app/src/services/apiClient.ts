import { APIResponse } from '@/types';

/**
 * API Base URL from environment variables with local fallback
 */
export const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001';

// Toggle this to true if the backend is not deployed
const USE_MOCK_FALLBACK = import.meta.env.PROD || import.meta.env.VITE_USE_MOCK === 'true';

/**
 * Shared fetch helper that wraps all API calls and ensures a consistent response shape.
 */
export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const url = `${API_BASE}${path}`;
  
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
    
    const result: APIResponse<T> = await response.json().catch(() => ({
      success: false,
      error: {
        code: 'PARSE_ERROR',
        message: 'Failed to parse server response as JSON'
      },
      timestamp: new Date().toISOString()
    }));

    if (!response.ok && result.success !== false) {
      throw new Error(result.error?.message || response.statusText || 'Unknown API error');
    }

    return result;
  } catch (err: any) {
    console.warn(`[API] Request to ${path} failed:`, err.message);

    // Mock Fallback Logic for Demos
    if (USE_MOCK_FALLBACK) {
      console.info(`[API] Falling back to mock data for ${path}`);
      return await getMockFallback<T>(path);
    }

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

/**
 * Provides static mock data for specific endpoints when the backend is unreachable.
 */
async function getMockFallback<T>(path: string): Promise<APIResponse<T>> {
  const { MOCK_REPORTS, MOCK_LISTINGS } = await import('./mockData');
  
  let data: any = null;

  if (path.startsWith('/api/reports') || path.startsWith('/api/admin/reports')) {
    data = MOCK_REPORTS;
  } else if (path.startsWith('/api/pazar/feed') || path.startsWith('/api/pazar')) {
    data = MOCK_LISTINGS;
  } else if (path.startsWith('/api/report/analyze') || path.startsWith('/api/pazar/analyze')) {
    data = {
      classification: {
        category: 'waste_overflow',
        severity: 8,
        zone: 'zona_a',
        department: 'cistoca',
        description: 'Mock analysis: Waste overflow detected in Split City Center.',
        suggestedAction: 'Dispatch cleaning crew.',
        confidence: 0.98,
        items: path.includes('pazar') ? [{ name: 'Tomato', category: 'vegetable', price: 2.5, unit: '€/kg' }] : undefined
      }
    };
  } else if (path.startsWith('/api/report/submit') || path.startsWith('/api/pazar/submit')) {
    data = {
      ticketId: `GR-${Math.floor(Math.random() * 10000)}`,
      status: 'submitted',
      listingId: `PZ-${Math.floor(Math.random() * 10000)}`,
      expiresAt: new Date(Date.now() + 14400000).toISOString()
    };
  } else if (path.startsWith('/api/auth/login')) {
    data = {
      user: { id: 'u1', email: 'admin@split.hr', fullName: 'Admin User', role: 'admin' },
      token: 'demo-token-admin'
    };
  } else if (path.startsWith('/api/admin/stats')) {
    data = {
      totalReports: MOCK_REPORTS.length,
      openReports: MOCK_REPORTS.filter(r => r.status !== 'resolved').length,
      resolvedToday: 2,
      averageResolutionHours: 14.5,
      reportsByCategory: { pothole: 2, graffiti: 1, waste_overflow: 1, illegal_parking: 1 },
      reportsBySeverity: { '1': 0, '5': 2, '8': 1 },
      reportsByDepartment: { promet: 2, komunalni_redari: 2, cistoca: 1 },
      recentReports: MOCK_REPORTS.slice(0, 5),
      hotspots: []
    };
  } else if (path.startsWith('/api/chat')) {
    data = {
      message: {
        id: 'mock-chat-1',
        role: 'assistant',
        content: 'I am running in offline demo mode. My real AI capabilities require a backend connection, but I can show you Split city info!',
        timestamp: new Date().toISOString()
      },
      conversationId: 'demo-conv'
    };
  }

  return {
    success: true,
    data: data as T,
    timestamp: new Date().toISOString()
  };
}

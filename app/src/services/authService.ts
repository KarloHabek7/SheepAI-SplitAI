import { fetchApi } from './apiClient';
import { User, APIResponse } from '@/types';

/**
 * Authentication Service
 * Handles login and registration API calls.
 */
export const authService = {
  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<APIResponse<{ user: User; token: string }>> {
    return fetchApi<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Register a new user
   */
  async register(data: any): Promise<APIResponse<{ user: User; token: string }>> {
    return fetchApi<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

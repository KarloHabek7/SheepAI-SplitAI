import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStoreState } from '@/types';
import { authService } from '@/services/authService';

/**
 * Authentication Store
 * Manages user session, tokens, and authentication state.
 * Persists user and token to localStorage.
 */
export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(email, password);
          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ 
              error: response.error?.message || 'Login failed', 
              isLoading: false 
            });
          }
        } catch (err) {
          set({ 
            error: err instanceof Error ? err.message : 'An unexpected error occurred', 
            isLoading: false 
          });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ 
              error: response.error?.message || 'Registration failed', 
              isLoading: false 
            });
          }
        } catch (err) {
          set({ 
            error: err instanceof Error ? err.message : 'An unexpected error occurred', 
            isLoading: false 
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem('splitai-auth');
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'splitai-auth',
      // Only persist user and token
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

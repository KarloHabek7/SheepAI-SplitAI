import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppStoreState, SupportedLanguage, Theme } from '@/types';

/**
 * Global App Store
 * Manages core application state like language, theme, and connectivity.
 * Persists language and theme to localStorage.
 */
export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      language: 'hr',
      theme: 'dark',
      isOnline: true,
      cacheStatus: 'initializing',

      setLanguage: (lang: SupportedLanguage) => set({ language: lang }),
      setTheme: (theme: Theme) => set({ theme }),
      setOnline: (isOnline: boolean) => set({ isOnline }),
      setCacheStatus: (status: AppStoreState['cacheStatus']) => set({ cacheStatus: status }),
    }),
    {
      name: 'splitai-app',
      // Only persist language and theme
      partialize: (state) => ({ 
        language: state.language, 
        theme: state.theme 
      }),
    }
  )
);

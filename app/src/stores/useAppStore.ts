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
      mockMode: localStorage.getItem('splitai-mock-mode') === 'true',

      setLanguage: (lang: SupportedLanguage) => set({ language: lang }),
      setTheme: (theme: Theme) => set({ theme }),
      setOnline: (isOnline: boolean) => set({ isOnline }),
      setCacheStatus: (status: AppStoreState['cacheStatus']) => set({ cacheStatus: status }),
      setMockMode: (enabled: boolean) => {
        localStorage.setItem('splitai-mock-mode', String(enabled));
        set({ mockMode: enabled });
      },
    }),
    {
      name: 'splitai-app',
      // Persist core app settings
      partialize: (state) => ({ 
        language: state.language, 
        theme: state.theme,
        mockMode: state.mockMode
      }),
    }
  )
);

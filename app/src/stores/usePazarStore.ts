import { create } from 'zustand';
import { PazarStoreState, PazarFilters } from '@/types';
import { getFeed } from '@/services/pazarService';

/**
 * Pazar Store
 * Manages the Pazar market listings and active filters.
 */
export const usePazarStore = create<PazarStoreState>()((set) => ({
  listings: [],
  isLoading: false,
  filters: {
    activeOnly: true,
  },

  /**
   * Fetches active Pazar listings from the backend.
   */
  fetchListings: async () => {
    set({ isLoading: true });
    try {
      const response = await getFeed();
      if (response.success && response.data) {
        set({ listings: response.data });
      }
    } catch (error) {
      console.error('[PazarStore] Failed to fetch listings:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Updates feed filters.
   */
  setFilters: (filters: Partial<PazarFilters>) => 
    set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
}));

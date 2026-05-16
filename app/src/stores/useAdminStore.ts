import { create } from 'zustand';
import { AdminStoreState, AdminFilters, CivicReport, ReportStatus } from '@/types';
import { getDashboard, updateReportStatus as patchReportStatus } from '@/services/adminService';
import { getReports } from '@/services/reportService';

/**
 * Admin Store
 * Manages administrative dashboard state, report listings, and triage actions.
 */
export const useAdminStore = create<AdminStoreState>()((set) => ({
  reports: [],
  dashboardData: null,
  selectedReport: null,
  isLoading: false,
  filters: {},

  /**
   * Fetches dashboard statistics.
   */
  fetchDashboard: async () => {
    set({ isLoading: true });
    try {
      const response = await getDashboard();
      if (response.success && response.data) {
        set({ dashboardData: response.data });
      }
    } catch (error) {
      console.error('[AdminStore] Failed to fetch dashboard data:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Fetches all reports for the admin table.
   */
  fetchReports: async () => {
    set({ isLoading: true });
    try {
      // Admin gets all reports, so we pass no filters/bbox
      const response = await getReports();
      if (response.success && response.data) {
        set({ reports: response.data });
      }
    } catch (error) {
      console.error('[AdminStore] Failed to fetch reports:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Updates a report's status or assignee.
   */
  updateReportStatus: async (id: string, status: ReportStatus) => {
    try {
      const response = await patchReportStatus(id, status);
      if (response.success) {
        // Update the report in local state
        set((state) => ({
          reports: state.reports.map((r) => 
            r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
          ),
          // Also update selected report if it's the one being edited
          selectedReport: state.selectedReport?.id === id 
            ? { ...state.selectedReport, status, updatedAt: new Date().toISOString() } 
            : state.selectedReport
        }));
      }
    } catch (error) {
      console.error('[AdminStore] Failed to update report status:', error);
    }
  },

  /**
   * Updates table filters.
   */
  setFilters: (filters: Partial<AdminFilters>) => 
    set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),

  /**
   * Selects a report for detail view.
   */
  selectReport: (report: CivicReport | null) => set({ selectedReport: report }),
}));

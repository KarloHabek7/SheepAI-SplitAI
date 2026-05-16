import { fetchApi } from './apiClient';
import { 
  AdminDashboardData, 
  CivicReport, 
  ReportStatus, 
  APIResponse 
} from '@/types';

/**
 * Fetches aggregate statistics for the admin dashboard.
 * 
 * @returns Promise<APIResponse<AdminDashboardData>>
 */
export async function getDashboard(): Promise<APIResponse<AdminDashboardData>> {
  return fetchApi<AdminDashboardData>('/api/admin/dashboard');
}

/**
 * Updates the status or assignee of a civic report.
 * 
 * @param id - The report ID
 * @param status - The new status to apply
 * @returns Promise<APIResponse<CivicReport>>
 */
export async function updateReportStatus(id: string, status: ReportStatus): Promise<APIResponse<CivicReport>> {
  return fetchApi<CivicReport>(`/api/admin/reports/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/**
 * Fetches all reports for the admin management view.
 * 
 * @returns Promise<APIResponse<CivicReport[]>>
 */
export async function getReports(): Promise<APIResponse<CivicReport[]>> {
  return fetchApi<CivicReport[]>('/api/admin/reports');
}

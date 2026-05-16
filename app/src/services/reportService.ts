import { fetchApi } from './apiClient';
import { 
  ReportAnalyzeRequest, 
  ReportAnalyzeResponse, 
  ReportSubmitRequest, 
  ReportSubmitResponse,
  CivicReport,
  APIResponse,
  ReportStatus,
  SeverityLevel,
  IssueCategory,
  MapBoundingBox
} from '@/types';

/**
 * Filter parameters for fetching reports
 */
export interface GetReportsParams {
  status?: ReportStatus;
  severity?: SeverityLevel;
  severity_min?: number;
  category?: IssueCategory;
  bbox?: MapBoundingBox;
}

/**
 * Analyzes an image for civic issue classification.
 * 
 * @param req - Analysis request with base64 image and optional location
 * @returns Promise<APIResponse<ReportAnalyzeResponse>>
 */
export async function analyzeImage(req: ReportAnalyzeRequest): Promise<APIResponse<ReportAnalyzeResponse>> {
  return fetchApi<ReportAnalyzeResponse>('/api/report/analyze', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

/**
 * Submits a finalized civic report.
 * 
 * @param req - Submission request with classification and metadata
 * @returns Promise<APIResponse<ReportSubmitResponse>>
 */
export async function submitReport(req: ReportSubmitRequest): Promise<APIResponse<ReportSubmitResponse>> {
  return fetchApi<ReportSubmitResponse>('/api/report/submit', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

/**
 * Fetches reports with optional filters and spatial bounding box.
 * 
 * @param params - Optional filters (status, severity, category, bbox)
 * @returns Promise<APIResponse<CivicReport[]>>
 */
export async function getReports(params: GetReportsParams = {}): Promise<APIResponse<CivicReport[]>> {
  const query = new URLSearchParams();
  
  if (params.status) query.append('status', params.status);
  if (params.severity) query.append('severity', String(params.severity));
  if (params.severity_min) query.append('severity_min', String(params.severity_min));
  if (params.category) query.append('category', params.category);
  
  if (params.bbox) {
    // Format bbox as 'west,south,east,north' to match backend implementation in routes/report.ts
    const { west, south, east, north } = params.bbox;
    query.append('bbox', `${west},${south},${east},${north}`);
  }

  const queryString = query.toString();
  const path = `/api/reports${queryString ? `?${queryString}` : ''}`;

  return fetchApi<CivicReport[]>(path);
}

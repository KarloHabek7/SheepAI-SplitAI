import { fetchApi } from './apiClient';
import { 
  PazarAnalyzeRequest, 
  PazarAnalyzeResponse, 
  PazarSubmitRequest, 
  PazarSubmitResponse, 
  PazarListing,
  APIResponse 
} from '@/types';

/**
 * Analyzes a vendor photo for produce classification.
 * 
 * @param req - Analysis request with base64 image
 * @returns Promise<APIResponse<PazarAnalyzeResponse>>
 */
export async function analyzeVendorPhoto(req: PazarAnalyzeRequest): Promise<APIResponse<PazarAnalyzeResponse>> {
  return fetchApi<PazarAnalyzeResponse>('/api/pazar/analyze', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

/**
 * Submits a new Pazar listing.
 * 
 * @param req - Submission request with items and vendor metadata
 * @returns Promise<APIResponse<PazarSubmitResponse>>
 */
export async function submitListing(req: PazarSubmitRequest): Promise<APIResponse<PazarSubmitResponse>> {
  return fetchApi<PazarSubmitResponse>('/api/pazar/submit', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

/**
 * Fetches the active Pazar market feed.
 * 
 * @returns Promise<APIResponse<PazarListing[]>>
 */
export async function getFeed(): Promise<APIResponse<PazarListing[]>> {
  return fetchApi<PazarListing[]>('/api/pazar/feed');
}

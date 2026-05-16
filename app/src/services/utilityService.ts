import { fetchApi } from './apiClient';
import { 
  ParkingInfo, 
  TransitInfo, 
  CrowdInfo, 
  EmergencyInfo, 
  CityZone, 
  EmergencyType, 
  SupportedLanguage,
  APIResponse 
} from '@/types';

/**
 * Fetches parking availability for a specific city zone.
 * 
 * @param zone - The city zone (e.g., 'zona_a')
 * @returns Promise<APIResponse<ParkingInfo>>
 */
export async function getParking(zone: CityZone): Promise<APIResponse<ParkingInfo>> {
  return fetchApi<ParkingInfo>(`/api/parking/${zone}`);
}

/**
 * Fetches real-time transit/bus info for a specific line.
 * 
 * @param line - The bus line number (e.g., '37')
 * @returns Promise<APIResponse<TransitInfo>>
 */
export async function getTransit(line: string): Promise<APIResponse<TransitInfo>> {
  return fetchApi<TransitInfo>(`/api/transit/${line}`);
}

/**
 * Fetches crowd index (Đir Index) for a specific tourist area.
 * 
 * @param area - The area name (e.g., 'Riva')
 * @returns Promise<APIResponse<CrowdInfo>>
 */
export async function getCrowd(area: string): Promise<APIResponse<CrowdInfo>> {
  return fetchApi<CrowdInfo>(`/api/crowd/${area}`);
}

/**
 * Fetches emergency instructions and safety tips.
 * 
 * @param type - The emergency type (e.g., 'bura_wind')
 * @param lang - Optional language override
 * @returns Promise<APIResponse<EmergencyInfo>>
 */
export async function getEmergency(
  type: EmergencyType, 
  lang?: SupportedLanguage
): Promise<APIResponse<EmergencyInfo>> {
  const path = `/api/emergency/${type}${lang ? `?lang=${lang}` : ''}`;
  return fetchApi<EmergencyInfo>(path);
}

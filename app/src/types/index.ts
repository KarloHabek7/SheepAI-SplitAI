/**
 * Shared Type Interfaces for SplitAI
 * Acts as the contract across Frontend, Backend, and AI lanes.
 */

// --- Models ---

export interface Location {
  lat: number;
  lng: number;
}

export type ReportSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type ReportCategory = 'Bulk Waste' | 'Infrastructure' | 'Green Areas' | 'Graffiti' | 'Other';
export type ReportStatus = 'Pending' | 'Triaged' | 'Resolved';

export interface Report {
  id: string;
  category: ReportCategory;
  severity: ReportSeverity;
  description: string;
  location: Location | string;
  status: ReportStatus;
  imageUrl?: string;
  createdAt: string;
}

/** A single citation from a RAG source */
export interface Citation {
  sourceDocument: string;
  article?: string;
  page?: number;
  excerpt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: string;
}

// --- API Request/Response Wrappers ---

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
  language?: string; // e.g. "en", "hr"
}

export type SupportedLanguage = 'en' | 'hr' | 'it' | 'de';

export interface ChatResponse {
  reply: string;
  citations: string[];
}

// For reports, we expect a multipart/form-data request with 'image' and 'location'.
// The response will be the created Report object.
export type ReportCreateResponse = Report;

export interface GetReportsResponse {
  reports: Report[];
}

// --- Gemini / AI Service Types ---

/** Configuration for the Gemini client */
export interface GeminiConfig {
  modelName: string;
  cachedContentId?: string;
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
}

/** Context cache metadata */
export interface ContextCacheInfo {
  cacheId: string;
  displayName: string;
  model: string;
  tokenCount: number;
  createTime: string;
  expireTime: string;
}

// --- Domain Enums ---

export type CityZone = 
  | 'Gripe' 
  | 'Spinut' 
  | 'Varoš' 
  | 'Meje' 
  | 'Trstenik' 
  | 'Pujanke' 
  | 'Sućidar' 
  | 'Split 3' 
  | 'Bačvice' 
  | 'Mejaši' 
  | 'Žnjan' 
  | 'Bol' 
  | 'Grad' 
  | 'Other';


export type CityDepartment = 
  | 'Komunalno redarstvo' 
  | 'Prometno redarstvo' 
  | 'Čistoća' 
  | 'Parkovi i nasadi' 
  | 'Vodovod i kanalizacija' 
  | 'Other';

// --- Domain Models ---

export interface PazarListing {
  itemName: string;
  category: string;
  price: string;
  vendorName: string;
}

export type EmergencyType = 'Fire' | 'Medical' | 'Police' | 'Utility' | 'Other';

export interface VisionCivicReport {
  category: ReportCategory;
  severity: ReportSeverity;
  zone: CityZone;
  department: CityDepartment;
  description: string;
  confidence: number;
}

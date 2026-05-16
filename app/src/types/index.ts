// =============================================================================
// SplitAI — Shared Type Contracts
// =============================================================================
// This file is the SINGLE SOURCE OF TRUTH for all shared types.
// ALL lanes import from here. Never define parallel types elsewhere.
//
// Ownership: Lane 0 (Lead) — primary owner during architecture phase.
// All lanes may ADD new types (additive-only). Never remove or rename.
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Core Enums
// -----------------------------------------------------------------------------

/** Supported languages for the multilingual interface */
export type SupportedLanguage = 'hr' | 'en' | 'de' | 'it' | 'fr';

/** UI theme options */
export type Theme = 'light' | 'dark' | 'system';

/** Report status lifecycle */
export type ReportStatus =
  | 'analyzing'
  | 'classified'
  | 'submitted'
  | 'in_progress'
  | 'resolved'
  | 'rejected';

/** Severity level (1-10 scale) */
export type SeverityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** Municipal departments that handle reports */
export type Department =
  | 'komunalni_redari'
  | 'cistoca'
  | 'promet'
  | 'urbanizam'
  | 'zastita_okolisa'
  | 'turisticka_inspekcija'
  | 'vatrogasci'
  | 'hitna_pomoc'
  | 'policija';

/** Issue categories for civic reports */
export type IssueCategory =
  | 'pothole'
  | 'graffiti'
  | 'illegal_parking'
  | 'noise_complaint'
  | 'waste_overflow'
  | 'damaged_infrastructure'
  | 'illegal_construction'
  | 'vandalism'
  | 'abandoned_vehicle'
  | 'public_safety'
  | 'other';

/** Zone classification for Split */
export type CityZone =
  | 'zona_a'
  | 'zona_b'
  | 'zona_c'
  | 'zona_d'
  | 'unesco_core'
  | 'unesco_buffer'
  | 'marjan_park'
  | 'port_area';

/** Emergency alert types */
export type EmergencyType =
  | 'bura_wind'
  | 'flood'
  | 'earthquake'
  | 'fire'
  | 'air_quality'
  | 'general';

/** Chat message role */
export type MessageRole = 'user' | 'assistant' | 'system';

/** Pazar produce categories */
export type ProduceCategory =
  | 'fish'
  | 'fruit'
  | 'vegetable'
  | 'olive_oil'
  | 'cheese'
  | 'meat'
  | 'herbs'
  | 'other';

// -----------------------------------------------------------------------------
// 2. Geo & Location
// -----------------------------------------------------------------------------

/** Geographic coordinates */
export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  address?: string;
}

// -----------------------------------------------------------------------------
// 3. Chat Types
// -----------------------------------------------------------------------------

/** A single citation from a RAG source */
export interface Citation {
  sourceDocument: string;
  article?: string;
  page?: number;
  excerpt: string;
}

/** A single chat message */
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  citations?: Citation[];
  language?: SupportedLanguage;
  timestamp: string;
  /** If the assistant triggered a function call */
  toolCall?: ToolCallResult;
}

/** Result of a Gemini function call */
export interface ToolCallResult {
  toolName: string;
  args: Record<string, unknown>;
  result: Record<string, unknown>;
}

/** Request body for POST /api/chat */
export interface ChatRequest {
  message: string;
  conversationId?: string;
  language?: SupportedLanguage;
  /** Base64 image if user attaches a photo in chat */
  image?: string;
}

/** Response from POST /api/chat */
export interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
}

// -----------------------------------------------------------------------------
// 4. Civic Report Types
// -----------------------------------------------------------------------------

/** Classification result from Gemini Vision */
export interface CivicReportClassification {
  category: IssueCategory;
  severity: SeverityLevel;
  zone: CityZone;
  department: Department;
  description: string;
  suggestedAction: string;
  /** Confidence score 0-1 */
  confidence: number;
}

/** A full civic report with metadata */
export interface CivicReport {
  id: string;
  classification: CivicReportClassification;
  imageUrl: string;
  location?: GeoLocation;
  userNote?: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  ticketId?: string;
  assignedTo?: string;
}

/** Request body for POST /api/report/analyze */
export interface ReportAnalyzeRequest {
  image: string; // base64
  location?: GeoLocation;
}

/** Response from POST /api/report/analyze */
export interface ReportAnalyzeResponse {
  classification: CivicReportClassification;
  imagePreviewUrl?: string;
}

/** Request body for POST /api/report/submit */
export interface ReportSubmitRequest {
  classification: CivicReportClassification;
  imageUrl: string;
  location?: GeoLocation;
  userNote?: string;
}

/** Response from POST /api/report/submit */
export interface ReportSubmitResponse {
  ticketId: string;
  status: ReportStatus;
  estimatedResolution?: string;
}

// -----------------------------------------------------------------------------
// 5. Pazar Market Types
// -----------------------------------------------------------------------------

/** A single item in a Pazar listing */
export interface PazarItem {
  name: string;
  category: ProduceCategory;
  price: number;
  unit: string; // e.g., "€/kg", "€/bunch"
  quantity?: string; // e.g., "limited", "abundant"
}

/** Classification result from vendor photo */
export interface PazarListingClassification {
  items: PazarItem[];
  freshness: 'morning' | 'midday' | 'afternoon';
  confidence: number;
}

/** A full Pazar listing with metadata */
export interface PazarListing {
  id: string;
  vendor: string;
  items: PazarItem[];
  imageUrl?: string;
  freshness: 'morning' | 'midday' | 'afternoon';
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

/** Request body for POST /api/pazar/analyze */
export interface PazarAnalyzeRequest {
  image: string; // base64
}

/** Response from POST /api/pazar/analyze */
export interface PazarAnalyzeResponse {
  classification: PazarListingClassification;
}

/** Request body for POST /api/pazar/submit */
export interface PazarSubmitRequest {
  classification: PazarListingClassification;
  vendor: string;
  imageUrl?: string;
}

/** Response from POST /api/pazar/submit */
export interface PazarSubmitResponse {
  listingId: string;
  expiresAt: string;
}

// -----------------------------------------------------------------------------
// 6. Emergency Types
// -----------------------------------------------------------------------------

/** Emergency information response */
export interface EmergencyInfo {
  alertType: EmergencyType;
  title: string;
  instructions: string[];
  safetyTips: string[];
  contacts: EmergencyContact[];
  language: SupportedLanguage;
  lastUpdated: string;
}

/** Emergency contact entry */
export interface EmergencyContact {
  name: string;
  phone: string;
  description: string;
}

// -----------------------------------------------------------------------------
// 7. City Service Types (Mock Tools)
// -----------------------------------------------------------------------------

/** Parking information response */
export interface ParkingInfo {
  zone: CityZone;
  available: boolean;
  totalSpots: number;
  freeSpots: number;
  pricePerHour: number;
  currency: string;
  nearestGarage?: string;
  garageDistance?: string;
}

/** Transit/bus information response */
export interface TransitInfo {
  lineNumber: string;
  stopName: string;
  eta: number; // minutes
  nextBuses: TransitBusArrival[];
  alerts?: string[];
}

/** A single bus arrival entry */
export interface TransitBusArrival {
  lineNumber: string;
  destination: string;
  arrivalMinutes: number;
  isDelayed: boolean;
}

/** Crowd level info (Đir Index) */
export interface CrowdInfo {
  area: string;
  crowdLevel: 'low' | 'moderate' | 'high' | 'very_high';
  crowdPercentage: number;
  suggestion: string;
  alternateRoutes: AlternateRoute[];
  lastUpdated: string;
}

/** An alternate route suggestion */
export interface AlternateRoute {
  name: string;
  crowdLevel: 'low' | 'moderate' | 'high';
  estimatedWalkMinutes: number;
  description: string;
}

// -----------------------------------------------------------------------------
// 8. Admin Dashboard Types
// -----------------------------------------------------------------------------

/** Summary statistics for admin dashboard */
export interface AdminDashboardData {
  totalReports: number;
  openReports: number;
  resolvedToday: number;
  averageResolutionHours: number;
  reportsByCategory: Record<IssueCategory, number>;
  reportsBySeverity: Record<string, number>;
  reportsByDepartment: Record<Department, number>;
  recentReports: CivicReport[];
  hotspots: DashboardHotspot[];
}

/** A geographic hotspot with clustered reports */
export interface DashboardHotspot {
  location: GeoLocation;
  reportCount: number;
  dominantCategory: IssueCategory;
  averageSeverity: number;
}

// -----------------------------------------------------------------------------
// 9. API Wrapper Types
// -----------------------------------------------------------------------------

/** Standard API response wrapper */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
}

/** Standard API error */
export interface APIError {
  code: string;
  message: string;
  details?: string;
}

// -----------------------------------------------------------------------------
// 10. Gemini / AI Service Types
// -----------------------------------------------------------------------------

/** Configuration for the Gemini client */
export interface GeminiConfig {
  modelName: string;
  cachedContentId?: string;
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
}

/** A tool declaration for Gemini function calling */
export interface ToolDeclaration {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
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

// -----------------------------------------------------------------------------
// 11. Store State Types (Zustand)
// -----------------------------------------------------------------------------

/** Chat store state */
export interface ChatStoreState {
  messages: ChatMessage[];
  conversationId: string | null;
  isStreaming: boolean;
  suggestedPrompts: string[];
  language: SupportedLanguage;
  sendMessage: (message: string, image?: string) => Promise<void>;
  clearChat: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
}

/** Report store state */
export interface ReportStoreState {
  currentImage: string | null;
  classification: CivicReportClassification | null;
  submissionStatus: ReportStatus | null;
  recentReports: CivicReport[];
  isAnalyzing: boolean;
  isSubmitting: boolean;
  analyzeImage: (image: string, location?: GeoLocation) => Promise<void>;
  submitReport: (userNote?: string) => Promise<void>;
  reset: () => void;
}

/** Pazar store state */
export interface PazarStoreState {
  listings: PazarListing[];
  isLoading: boolean;
  filters: PazarFilters;
  fetchListings: () => Promise<void>;
  setFilters: (filters: Partial<PazarFilters>) => void;
}

/** Pazar filter options */
export interface PazarFilters {
  category?: ProduceCategory;
  activeOnly: boolean;
  searchTerm?: string;
}

/** Admin store state */
export interface AdminStoreState {
  reports: CivicReport[];
  dashboardData: AdminDashboardData | null;
  selectedReport: CivicReport | null;
  isLoading: boolean;
  filters: AdminFilters;
  fetchDashboard: () => Promise<void>;
  fetchReports: () => Promise<void>;
  updateReportStatus: (id: string, status: ReportStatus) => Promise<void>;
  setFilters: (filters: Partial<AdminFilters>) => void;
  selectReport: (report: CivicReport | null) => void;
}

/** Admin filter options */
export interface AdminFilters {
  status?: ReportStatus;
  severity?: SeverityLevel;
  department?: Department;
  category?: IssueCategory;
  dateRange?: { from: string; to: string };
}

/** Global app store state */
export interface AppStoreState {
  language: SupportedLanguage;
  theme: Theme;
  isOnline: boolean;
  cacheStatus: 'initializing' | 'ready' | 'error';
  setLanguage: (lang: SupportedLanguage) => void;
  setTheme: (theme: Theme) => void;
  setOnline: (isOnline: boolean) => void;
  setCacheStatus: (status: AppStoreState['cacheStatus']) => void;
}

// -----------------------------------------------------------------------------
// 12. Hook Return Types
// -----------------------------------------------------------------------------

/** Return type for useChat hook */
export interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  suggestedPrompts: string[];
  sendMessage: (message: string, image?: string) => Promise<void>;
  clearChat: () => void;
}

/** Return type for useVisionAnalysis hook */
export interface UseVisionAnalysisReturn {
  classification: CivicReportClassification | null;
  isAnalyzing: boolean;
  error: string | null;
  analyze: (image: string, location?: GeoLocation) => Promise<void>;
  reset: () => void;
}

/** Return type for usePazarFeed hook */
export interface UsePazarFeedReturn {
  listings: PazarListing[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  filters: PazarFilters;
  setFilters: (filters: Partial<PazarFilters>) => void;
}

/** Return type for useAdminDashboard hook */
export interface UseAdminDashboardReturn {
  dashboardData: AdminDashboardData | null;
  reports: CivicReport[];
  isLoading: boolean;
  selectedReport: CivicReport | null;
  updateStatus: (id: string, status: ReportStatus) => Promise<void>;
  selectReport: (report: CivicReport | null) => void;
  filters: AdminFilters;
  setFilters: (filters: Partial<AdminFilters>) => void;
}

import { create } from 'zustand';
import { 
  MapStoreState, 
  MapCameraConfig, 
  MapBoundingBox, 
  IssueGeoJSONCollection, 
  MapFilters, 
  GeoLocation, 
  SPLIT_MAP_DEFAULTS,
  CivicReport,
  IssueGeoJSONFeature,
  REPORT_TO_MAP_STATUS
} from '@/types';
import { getReports } from '@/services/reportService';

/**
 * Map Store
 * Manages Mapbox camera state, bounding box, GeoJSON data for markers,
 * filters, and report-a-pin (isReportMode) state.
 */
export const useMapStore = create<MapStoreState>()((set, get) => ({
  // --- Initial State ---
  camera: SPLIT_MAP_DEFAULTS,
  bounds: null,
  issuesGeoJson: {
    type: 'FeatureCollection',
    features: [],
  },
  selectedIssueId: null,
  hoveredIssueId: null,
  filters: {
    status: [],
    category: [],
    severityMin: 1,
  },
  isMapLoaded: false,
  isLoadingIssues: false,
  userLocation: null,
  isReportMode: false,
  draftReportLocation: null,

  // --- Actions ---
  setCamera: (camera: Partial<MapCameraConfig>) => set((state) => ({ 
    camera: { ...state.camera, ...camera } 
  })),

  setBounds: (bounds: MapBoundingBox) => set({ bounds }),

  setIssuesGeoJson: (issuesGeoJson: IssueGeoJSONCollection) => set({ issuesGeoJson }),

  selectIssue: (id: string | null) => set({ selectedIssueId: id }),

  hoverIssue: (id: string | null) => set({ hoveredIssueId: id }),

  setFilters: (filters: Partial<MapFilters>) => set((state) => ({ 
    filters: { ...state.filters, ...filters } 
  })),

  setMapLoaded: (isMapLoaded: boolean) => set({ isMapLoaded }),

  setUserLocation: (userLocation: GeoLocation | null) => set({ userLocation }),

  enterReportMode: () => set({ isReportMode: true }),

  exitReportMode: () => set({ 
    isReportMode: false, 
    draftReportLocation: null 
  }),

  setDraftReportLocation: (draftReportLocation: GeoLocation | null) => set({ draftReportLocation }),

  /**
   * Fetches issues from the backend based on current map bounds
   * and transforms them into GeoJSON format.
   */
  fetchIssuesByBounds: async () => {
    const { bounds, filters } = get();
    if (!bounds) return;

    set({ isLoadingIssues: true });

    try {
      const response = await getReports({
        bbox: bounds,
        // Backend filters are slightly different than map display filters,
        // but we pass them if they match.
        category: filters.category && filters.category.length > 0 ? filters.category[0] : undefined,
        severity: filters.severityMin,
      });

      if (response.success && response.data) {
        const reports: CivicReport[] = response.data;
        
        // Transform CivicReport[] to IssueGeoJSONCollection
        const features: IssueGeoJSONFeature[] = reports.map((report) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [report.location?.lng || 0, report.location?.lat || 0],
          },
          properties: {
            id: report.id,
            title: report.classification.category,
            description: report.classification.description,
            category: report.classification.category,
            status: REPORT_TO_MAP_STATUS[report.status] || 'open',
            severity: report.classification.severity,
            imageUrl: report.imageUrl,
            createdAt: report.createdAt,
            updatedAt: report.updatedAt,
            department: report.classification.department,
            zone: report.classification.zone,
            address: report.location?.address,
          },
        }));

        set({
          issuesGeoJson: {
            type: 'FeatureCollection',
            features,
          },
        });
      }
    } catch (error) {
      console.error('[MapStore] Failed to fetch issues:', error);
    } finally {
      set({ isLoadingIssues: false });
    }
  },
}));

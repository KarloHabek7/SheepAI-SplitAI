import { create } from 'zustand';
import { ReportStoreState, GeoLocation, ReportSubmitRequest } from '@/types';
import { analyzeImage, submitReport } from '@/services/reportService';

/**
 * Report Store
 * Manages the civic report creation workflow: image capture, AI analysis, and submission.
 */
export const useReportStore = create<ReportStoreState>()((set, get) => ({
  currentImage: null,
  classification: null,
  submissionStatus: null,
  recentReports: [],
  isAnalyzing: false,
  isSubmitting: false,

  /**
   * Sends an image for AI classification.
   */
  analyzeImage: async (image: string, location?: GeoLocation) => {
    set({ 
      isAnalyzing: true, 
      currentImage: image, 
      classification: null,
      submissionStatus: null 
    });

    try {
      const response = await analyzeImage({ image, location });
      if (response.success && response.data) {
        set({ classification: response.data.classification });
      }
    } catch (error) {
      console.error('[ReportStore] Analysis failed:', error);
      set({ classification: null });
    } finally {
      set({ isAnalyzing: false });
    }
  },

  /**
   * Submits the finalized report with user notes.
   */
  submitReport: async (userNote?: string) => {
    const { classification, currentImage } = get();

    if (!classification || !currentImage) {
      console.warn('[ReportStore] Missing classification or image for submission');
      return;
    }

    set({ isSubmitting: true });

    try {
      const req: ReportSubmitRequest = {
        classification,
        imageUrl: currentImage, // Note: In a real app, this might be a blob/url from a storage service
        userNote,
      };

      const response = await submitReport(req);
      if (response.success && response.data) {
        set({ submissionStatus: 'submitted' });
      }
    } catch (error) {
      console.error('[ReportStore] Submission failed:', error);
      set({ submissionStatus: null });
    } finally {
      set({ isSubmitting: false });
    }
  },

  /**
   * Resets the store state for a new report.
   */
  reset: () => set({ 
    currentImage: null, 
    classification: null, 
    submissionStatus: null, 
    isAnalyzing: false, 
    isSubmitting: false 
  }),
}));

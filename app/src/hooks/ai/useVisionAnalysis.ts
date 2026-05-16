import { useState, useCallback } from 'react';
import { 
  UseVisionAnalysisReturn, 
  CivicReportClassification, 
  GeoLocation,
  APIResponse,
  ReportAnalyzeResponse,
  ReportAnalyzeRequest
} from '@/types';

export const useVisionAnalysis = (): UseVisionAnalysisReturn => {
  const [classification, setClassification] = useState<CivicReportClassification | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (image: string, location?: GeoLocation) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const requestBody: ReportAnalyzeRequest = { image, location };
      const response = await fetch('/api/report/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: APIResponse<ReportAnalyzeResponse> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error?.message || 'Failed to analyze image');
      }

      setClassification(result.data.classification);
    } catch (err: any) {
      console.error('Vision analysis error:', err);
      setError(err.message || 'An unexpected error occurred during vision analysis');
      setClassification(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setClassification(null);
    setIsAnalyzing(false);
    setError(null);
  }, []);

  return {
    classification,
    isAnalyzing,
    error,
    analyze,
    reset,
  };
};

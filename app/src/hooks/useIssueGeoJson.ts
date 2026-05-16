import { useState, useEffect, useCallback } from 'react';
import { 
  IssueGeoJSONCollection, 
  IssueGeoJSONFeature, 
  REPORT_TO_MAP_STATUS 
} from '@/types';
import { getReports } from '@/services/reportService';

export const useIssueGeoJson = () => {
  const [geoJson, setGeoJson] = useState<IssueGeoJSONCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getReports();
      if (response.success && response.data) {
        const features: IssueGeoJSONFeature[] = response.data
          .filter(report => report.location) // Only show reports with valid location
          .map(report => ({
            type: 'Feature',
            geometry: { 
              type: 'Point', 
              coordinates: [report.location!.lng, report.location!.lat] 
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
            }
          }));
        
        setGeoJson({
          type: 'FeatureCollection',
          features,
        });
      }
    } catch (err) {
      console.error('[useIssueGeoJson] Fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    geoJson,
    isLoading,
    refresh
  };
};

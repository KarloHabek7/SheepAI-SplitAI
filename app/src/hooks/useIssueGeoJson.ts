import { useMemo } from 'react';
import { IssueGeoJSONCollection, IssueGeoJSONFeature, IssueCategory, SeverityLevel, MapMarkerStatus } from '@/types';

// Mock issues data
const MOCK_ISSUES: Array<{
  id: string;
  lngLat: [number, number];
  title: string;
  category: IssueCategory;
  status: MapMarkerStatus;
  severity: SeverityLevel;
}> = [
  { id: '1', lngLat: [16.4391, 43.5085], title: 'Broken Pavement', category: 'damaged_infrastructure', status: 'open', severity: 6 },
  { id: '2', lngLat: [16.4421, 43.5095], title: 'Graffiti on Heritage Wall', category: 'graffiti', status: 'in_progress', severity: 4 },
  { id: '3', lngLat: [16.4351, 43.5075], title: 'Trash Overflow', category: 'waste_overflow', status: 'open', severity: 8 },
  { id: '4', lngLat: [16.4402, 43.5115], title: 'Illegal Parking', category: 'illegal_parking', status: 'resolved', severity: 3 },
  { id: '5', lngLat: [16.4451, 43.5065], title: 'Broken Street Light', category: 'damaged_infrastructure', status: 'open', severity: 5 },
  { id: '6', lngLat: [16.4371, 43.5125], title: 'Vandalism in Park', category: 'vandalism', status: 'in_progress', severity: 7 },
  { id: '7', lngLat: [16.4411, 43.5055], title: 'Pothole on Main Road', category: 'pothole', status: 'open', severity: 9 },
  { id: '8', lngLat: [16.4381, 43.5105], title: 'Noise Complaint', category: 'noise_complaint', status: 'resolved', severity: 2 },
];

export function useIssueGeoJson() {
  const geoJson = useMemo((): IssueGeoJSONCollection => {
    const features: IssueGeoJSONFeature[] = MOCK_ISSUES.map((issue) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: issue.lngLat,
      },
      properties: {
        id: issue.id,
        title: issue.title,
        description: `Description for ${issue.title}`,
        category: issue.category,
        status: issue.status,
        severity: issue.severity,
        createdAt: new Date().toISOString(),
      },
    }));

    return {
      type: 'FeatureCollection',
      features,
    };
  }, []);

  return { geoJson, isLoading: false, refresh: async () => {} };
}

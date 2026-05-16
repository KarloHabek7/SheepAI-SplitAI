import { useMemo } from 'react';
import { IssueGeoJSONCollection, IssueGeoJSONFeature } from '@/types';

const MOCK_ISSUES: IssueGeoJSONFeature[] = [
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [16.4402, 43.5081] },
    properties: {
      id: '1',
      title: 'Waste Overflow',
      description: 'Garbage bins overflowing near the Riva entrance.',
      category: 'waste_overflow',
      status: 'open',
      severity: 8,
      createdAt: new Date().toISOString(),
      zone: 'unesco_buffer',
      department: 'cistoca'
    }
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [16.4380, 43.5095] },
    properties: {
      id: '2',
      title: 'Broken Infrastructure',
      description: 'Lamp post #42 flickering and making noise.',
      category: 'damaged_infrastructure',
      status: 'in_progress',
      severity: 4,
      createdAt: new Date().toISOString(),
      zone: 'zona_a',
      department: 'komunalni_redari'
    }
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [16.4420, 43.5110] },
    properties: {
      id: '3',
      title: 'Pothole on Road',
      description: 'Large pothole causing traffic slowdown.',
      category: 'pothole',
      status: 'open',
      severity: 9,
      createdAt: new Date().toISOString(),
      zone: 'zona_b',
      department: 'promet'
    }
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [16.4450, 43.5075] },
    properties: {
      id: '4',
      title: 'Graffiti on Wall',
      description: 'Unauthorized graffiti on a residential building.',
      category: 'graffiti',
      status: 'resolved',
      severity: 2,
      createdAt: new Date().toISOString(),
      zone: 'zona_c',
      department: 'komunalni_redari'
    }
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [16.4350, 43.5060] },
    properties: {
      id: '5',
      title: 'Illegal Parking',
      description: 'Car blocking pedestrian access on the sidewalk.',
      category: 'illegal_parking',
      status: 'open',
      severity: 6,
      createdAt: new Date().toISOString(),
      zone: 'zona_a',
      department: 'promet'
    }
  }
];

export const useIssueGeoJson = () => {
  const geoJson = useMemo<IssueGeoJSONCollection>(() => ({
    type: 'FeatureCollection',
    features: MOCK_ISSUES,
  }), []);

  return {
    geoJson,
    isLoading: false,
    refresh: async () => { console.log('Refreshing map data...'); }
  };
};

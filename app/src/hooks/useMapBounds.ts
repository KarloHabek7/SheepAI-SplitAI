import { useEffect, useState } from 'react';
import { MapBoundingBox } from '@/types';
import type { Map } from 'mapbox-gl';

export function useMapBounds(map: Map | null) {
  const [bounds, setBounds] = useState<MapBoundingBox | null>(null);

  useEffect(() => {
    if (!map) return;

    const updateBounds = () => {
      const b = map.getBounds();
      if (!b) return;
      
      setBounds({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      });
    };

    map.on('moveend', updateBounds);
    updateBounds(); // Initial bounds

    return () => {
      map.off('moveend', updateBounds);
    };
  }, [map]);

  return bounds;
}

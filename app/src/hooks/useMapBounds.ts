import { useEffect, useState } from 'react';
import { MapBoundingBox } from '@/types';
import { useMapStore } from '@/stores/useMapStore';
import type { Map } from 'mapbox-gl';

export function useMapBounds(map: Map | null) {
  const [bounds, setLocalBounds] = useState<MapBoundingBox | null>(null);
  const setStoreBounds = useMapStore(state => state.setBounds);

  useEffect(() => {
    if (!map) return;

    const updateBounds = () => {
      const b = map.getBounds();
      if (!b) return;
      
      const newBounds = {
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      };
      
      setLocalBounds(newBounds);
      setStoreBounds(newBounds);
    };

    map.on('moveend', updateBounds);
    updateBounds(); // Initial bounds

    return () => {
      map.off('moveend', updateBounds);
    };
  }, [map, setStoreBounds]);

  return bounds;
}

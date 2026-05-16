import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { SPLIT_MAP_DEFAULTS, SPLIT_MAP_BOUNDS } from '@/types';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export function useMapboxMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!MAPBOX_TOKEN) {
      setError('Mapbox token is missing. Please add VITE_MAPBOX_TOKEN to your .env file.');
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11', // Starting with light-v11 for grayscale look
      center: SPLIT_MAP_DEFAULTS.center,
      zoom: SPLIT_MAP_DEFAULTS.zoom,
      pitch: SPLIT_MAP_DEFAULTS.pitch,
      bearing: SPLIT_MAP_DEFAULTS.bearing,
      maxBounds: SPLIT_MAP_BOUNDS,
      antialias: true,
      dragRotate: false, // Lock rotation for isometric look
      touchZoomRotate: false,
    });

    map.on('load', () => {
      // Apply grayscale desaturation to map layers
      // This makes issue markers pop
      const layers = map.getStyle().layers;
      if (layers) {
        layers.forEach((layer) => {
          if (layer.type === 'fill' || layer.type === 'line' || layer.type === 'background') {
            // We'll apply filters or just trust the light-v11 style for now
          }
        });
      }

      setIsLoaded(true);
    });

    map.on('error', (e) => {
      console.error('Mapbox error:', e);
      setError(e.error?.message || 'Failed to load map');
    });

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  return { mapContainerRef, mapInstance, isLoaded, error };
}

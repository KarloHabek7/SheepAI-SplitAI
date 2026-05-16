import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SPLIT_MAP_DEFAULTS, SPLIT_MAP_BOUNDS } from '@/types';

// Access token from env
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

export const useMapboxMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!mapboxgl.accessToken) {
      setError('Mapbox access token is missing. Please check your .env file.');
      return;
    }

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11', // Starting with light style
        center: SPLIT_MAP_DEFAULTS.center,
        zoom: SPLIT_MAP_DEFAULTS.zoom,
        pitch: SPLIT_MAP_DEFAULTS.pitch,
        bearing: SPLIT_MAP_DEFAULTS.bearing,
        maxBounds: SPLIT_MAP_BOUNDS,
        antialias: true,
        dragRotate: false, // Lock rotation for isometric feel
        touchZoomRotate: false,
      });

      map.on('load', () => {
        // Add 3D buildings
        const layers = map.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
        )?.id;

        map.addLayer(
          {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 13,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                13.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                13.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          },
          labelLayerId
        );

        // Apply grayscale filters to common layers if possible
        // Note: For real desaturation, a custom style in Mapbox Studio is better.
        // Here we just use the light-v11 style which is already quite neutral.

        setMapInstance(map);
        setIsLoaded(true);
      });

      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Failed to load map. Check console for details.');
      });

      return () => {
        map.remove();
      };
    } catch (err: any) {
      console.error('Map initialization failed:', err);
      setError(err.message || 'Map initialization failed');
    }
  }, []);

  return { mapContainerRef, mapInstance, isLoaded, error };
};

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

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const styleUrl = isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11';
    const buildingColor = isDarkMode ? '#242424' : '#aaa';

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: styleUrl,
        center: SPLIT_MAP_DEFAULTS.center,
        zoom: SPLIT_MAP_DEFAULTS.zoom,
        pitch: SPLIT_MAP_DEFAULTS.pitch,
        bearing: SPLIT_MAP_DEFAULTS.bearing,
        maxBounds: SPLIT_MAP_BOUNDS,
        antialias: true,
        dragRotate: false,
        touchZoomRotate: false,
      });

      map.on('load', () => {
        // Add 3D buildings layer
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
              'fill-extrusion-color': buildingColor,
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

        setMapInstance(map);
        setIsLoaded(true);
      });

      const handleThemeChange = (e: MediaQueryListEvent) => {
        const newStyle = e.matches ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11';
        const newBuildingColor = e.matches ? '#242424' : '#aaa';
        map.setStyle(newStyle);
        map.once('style.load', () => {
          if (map.getLayer('3d-buildings')) {
            map.setPaintProperty('3d-buildings', 'fill-extrusion-color', newBuildingColor);
          }
        });
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleThemeChange);

      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Failed to load map. Check console for details.');
      });

      return () => {
        mediaQuery.removeEventListener('change', handleThemeChange);
        map.remove();
      };
    } catch (err: any) {
      console.error('Map initialization failed:', err);
      setError(err.message || 'Map initialization failed');
    }
  }, []);

  return { mapContainerRef, mapInstance, isLoaded, error };
};

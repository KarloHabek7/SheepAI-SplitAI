import React, { useEffect } from 'react';
import { useMapboxMap } from '@/hooks/useMapboxMap';
import './MapView.css';

interface MapViewProps {
  children?: (map: mapboxgl.Map) => React.ReactNode;
}

const MapView: React.FC<MapViewProps> = ({ children }) => {
  const { mapContainerRef, mapInstance, isLoaded, error } = useMapboxMap();

  useEffect(() => {
    if (isLoaded && mapInstance) {
      // Add 3D buildings layer
      const layers = mapInstance.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
      )?.id;

      mapInstance.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
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
            'fill-extrusion-opacity': 0.55
          }
        },
        labelLayerId
      );
    }
  }, [isLoaded, mapInstance]);

  return (
    <div className="map-view-container">
      <div ref={mapContainerRef} className="map-canvas" />
      {error && <div className="map-error-overlay">{error}</div>}
      {isLoaded && mapInstance && children && children(mapInstance)}
    </div>
  );
};

export default MapView;

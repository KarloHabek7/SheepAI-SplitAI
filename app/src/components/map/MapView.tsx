import React from 'react';
import { useMapboxMap } from '@/hooks/useMapboxMap';
import './MapView.css';

interface MapViewProps {
  children?: (map: mapboxgl.Map) => React.ReactNode;
}

const MapView: React.FC<MapViewProps> = ({ children }) => {
  const { mapContainerRef, mapInstance, isLoaded, error } = useMapboxMap();

  return (
    <div className="map-view-root">
      <div ref={mapContainerRef} className="map-container" />
      
      {error && (
        <div className="map-error-overlay">
          <span className="material-symbols-outlined">error</span>
          <p>{error}</p>
        </div>
      )}
      
      {!isLoaded && !error && (
        <div className="map-loading-overlay">
          <div className="spinner-large"></div>
          <p>Initializing Split 3D Engine...</p>
        </div>
      )}

      {isLoaded && mapInstance && children && children(mapInstance)}
    </div>
  );
};

export default MapView;

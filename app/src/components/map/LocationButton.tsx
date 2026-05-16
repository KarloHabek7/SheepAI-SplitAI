import React from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import './LocationButton.css';

interface LocationButtonProps {
  map: mapboxgl.Map | null;
}

const LocationButton: React.FC<LocationButtonProps> = ({ map }) => {
  const { location, isLocating, locate } = useUserLocation();

  const handleLocate = async () => {
    await locate();
  };

  // Fly to location when it changes
  React.useEffect(() => {
    if (location && map) {
      map.flyTo({
        center: [location.lng, location.lat],
        zoom: 15,
        essential: true
      });
    }
  }, [location, map]);

  return (
    <button 
      className={`location-button ${isLocating ? 'locating' : ''}`} 
      onClick={handleLocate}
      disabled={isLocating}
      title="Find my location"
    >
      <span className="material-symbols-outlined">
        {isLocating ? 'near_me_disabled' : 'near_me'}
      </span>
    </button>
  );
};

export default LocationButton;

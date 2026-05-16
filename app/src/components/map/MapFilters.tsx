import React from 'react';
import './MapFilters.css';

interface MapFiltersProps {
  onFilterChange: (filters: any) => void;
}

const MapFilters: React.FC<MapFiltersProps> = () => {
  return (
    <div className="map-filters-overlay">
      <div className="filter-chips">
        <button className="filter-chip active">All Issues</button>
        <button className="filter-chip">Critical</button>
        <button className="filter-chip">Waste</button>
        <button className="filter-chip">Traffic</button>
        <button className="filter-chip">Vandalism</button>
      </div>
      
      <div className="filter-actions">
        <button className="icon-action-btn">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>
    </div>
  );
};

export default MapFilters;

import React from 'react';
import './MapFilters.css';

interface MapFiltersProps {
  activeCount: number;
  onReset: () => void;
}

const MapFilters: React.FC<MapFiltersProps> = ({ activeCount, onReset }) => {
  return (
    <div className="map-filters-overlay">
      <div className="filter-chips-list">
        <button className="filter-chip active">All Statuses</button>
        <button className="filter-chip">All Categories</button>
        <button className="filter-chip">Severity 5+</button>
      </div>
      {activeCount > 0 && (
        <button className="filter-reset-btn" onClick={onReset}>
          Reset ({activeCount})
        </button>
      )}
    </div>
  );
};

export default MapFilters;

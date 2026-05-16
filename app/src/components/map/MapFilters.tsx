import React from 'react';
import { useMapStore } from '@/stores/useMapStore';
import { IssueCategory, SeverityLevel } from '@/types';
import './MapFilters.css';

const MapFilters: React.FC = () => {
  const { filters, setFilters } = useMapStore();

  const handleChipClick = (category?: IssueCategory, severityMin?: SeverityLevel) => {
    // If clicking same category, toggle it off
    if (category && filters.category?.includes(category)) {
      setFilters({ category: [], severityMin: 1 });
    } else {
      setFilters({ 
        category: category ? [category] : [], 
        severityMin: severityMin || 1 
      });
    }
  };

  const isActive = (category?: IssueCategory, severityMin?: SeverityLevel) => {
    if (severityMin && severityMin > 1) {
      return filters.severityMin === severityMin;
    }
    if (!category) {
      return (!filters.category || filters.category.length === 0) && filters.severityMin === 1;
    }
    return filters.category?.includes(category);
  };

  return (
    <div className="map-filters-overlay">
      <div className="filter-chips">
        <button 
          className={`filter-chip ${isActive() ? 'active' : ''}`}
          onClick={() => handleChipClick()}
        >
          All Issues
        </button>
        <button 
          className={`filter-chip ${isActive(undefined, 7) ? 'active' : ''}`}
          onClick={() => handleChipClick(undefined, 7)}
        >
          Critical
        </button>
        <button 
          className={`filter-chip ${isActive('waste_overflow') ? 'active' : ''}`}
          onClick={() => handleChipClick('waste_overflow')}
        >
          Waste
        </button>
        <button 
          className={`filter-chip ${isActive('illegal_parking') ? 'active' : ''}`}
          onClick={() => handleChipClick('illegal_parking')}
        >
          Traffic
        </button>
        <button 
          className={`filter-chip ${isActive('vandalism') ? 'active' : ''}`}
          onClick={() => handleChipClick('vandalism')}
        >
          Vandalism
        </button>
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

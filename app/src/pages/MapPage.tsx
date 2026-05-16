import React, { useState, useEffect } from 'react';
import MapView from '@/components/map/MapView';
import IssueLayer from '@/components/map/IssueLayer';
import IssueDetailPanel from '@/components/map/IssueDetailPanel';
import MapFilters from '@/components/map/MapFilters';
import StatusLegend from '@/components/map/StatusLegend';
import LocationButton from '@/components/map/LocationButton';
import { useMapStore } from '@/stores/useMapStore';
import { useMapBounds } from '@/hooks/useMapBounds';
import { IssueFeatureProperties } from '@/types';
import './MapPage.css';

const MapSync: React.FC<{ map: mapboxgl.Map }> = ({ map }) => {
  useMapBounds(map); // This now syncs with the store automatically
  return null;
};

const MapPage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueFeatureProperties | null>(null);
  const { 
    issuesGeoJson, 
    fetchIssuesByBounds, 
    filters,
    bounds
  } = useMapStore();

  const handleIssueClick = (issueId: string) => {
    const feature = issuesGeoJson.features.find(f => f.properties.id === issueId);
    if (feature) {
      setSelectedIssue(feature.properties);
    }
  };

  // Trigger fetch when filters or bounds change
  useEffect(() => {
    fetchIssuesByBounds();
  }, [filters, bounds, fetchIssuesByBounds]);

  return (
    <div className="map-page-container">
      <MapView>
        {(map) => (
          <>
            <MapSync map={map} />
            <IssueLayer map={map} onIssueClick={handleIssueClick} />
            <LocationButton map={map} />
          </>
        )}
      </MapView>

      <MapFilters />
      <StatusLegend />

      {selectedIssue && (
        <IssueDetailPanel 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      )}

      {/* Report FAB overlaying the map */}
      <div className="map-fab-container">
        <button className="map-report-fab" onClick={() => window.location.href = '/report'}>
          <span className="material-symbols-outlined">add_photo_alternate</span>
          <span className="fab-label">Report Issue</span>
        </button>
      </div>
    </div>
  );
};

export default MapPage;

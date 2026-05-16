import React, { useState } from 'react';
import MapView from '@/components/map/MapView';
import IssueLayer from '@/components/map/IssueLayer';
import IssueDetailPanel from '@/components/map/IssueDetailPanel';
import MapFilters from '@/components/map/MapFilters';
import StatusLegend from '@/components/map/StatusLegend';
import LocationButton from '@/components/map/LocationButton';
import { useIssueGeoJson } from '@/hooks/useIssueGeoJson';
import { IssueFeatureProperties } from '@/types';
import './MapPage.css';

const MapPage: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<IssueFeatureProperties | null>(null);
  const { geoJson } = useIssueGeoJson();

  const handleIssueClick = (issueId: string) => {
    const feature = geoJson.features.find(f => f.properties.id === issueId);
    if (feature) {
      setSelectedIssue(feature.properties);
    }
  };

  return (
    <div className="map-page-container">
      <MapView>
        {(map) => (
          <>
            <IssueLayer map={map} onIssueClick={handleIssueClick} />
            <LocationButton map={map} />
          </>
        )}
      </MapView>

      <MapFilters onFilterChange={() => {}} />
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

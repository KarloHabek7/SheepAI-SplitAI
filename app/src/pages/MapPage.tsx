import React, { useState, useCallback } from 'react';
import MapView from '@/components/map/MapView';
import IssueLayer from '@/components/map/IssueLayer';
import IssueDetailPanel from '@/components/map/IssueDetailPanel';
import MapFilters from '@/components/map/MapFilters';
import StatusLegend from '@/components/map/StatusLegend';
import LocationButton from '@/components/map/LocationButton';
import ReportPinOverlay from '@/components/map/ReportPinOverlay';
import { useMapFilters } from '@/hooks/useMapFilters';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useIssueGeoJson } from '@/hooks/useIssueGeoJson';
import { IssueFeatureProperties } from '@/types';
import './MapPage.css';

const MapPage: React.FC = () => {
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isReportMode, setIsReportMode] = useState(false);
  
  const { activeFilterCount, resetFilters } = useMapFilters();
  const { locate, isLocating } = useUserLocation();
  const { geoJson } = useIssueGeoJson();

  const handleIssueClick = useCallback((id: string) => {
    setSelectedIssueId(id);
  }, []);

  const selectedIssue = selectedIssueId 
    ? geoJson.features.find(f => f.properties.id === selectedIssueId)?.properties as IssueFeatureProperties
    : null;

  return (
    <div className="map-page-root">
      <MapView>
        {(map) => (
          <>
            <IssueLayer map={map} onIssueClick={handleIssueClick} />
            
            <MapFilters 
              activeCount={activeFilterCount} 
              onReset={resetFilters} 
            />
            
            <StatusLegend />
            
            <LocationButton 
              onLocate={() => {
                locate();
                // In a real app, we would fly the map to the location
              }} 
              isLoading={isLocating} 
            />
            
            {selectedIssue && (
              <IssueDetailPanel 
                issue={selectedIssue} 
                onClose={() => setSelectedIssueId(null)} 
              />
            )}

            {isReportMode && (
              <ReportPinOverlay 
                onCancel={() => setIsReportMode(false)} 
                onConfirm={() => {
                  console.log('Location confirmed');
                  setIsReportMode(false);
                  // In a real app, navigate to report page with coords
                }}
              />
            )}

            {!isReportMode && !selectedIssue && (
              <button 
                className="report-fab" 
                onClick={() => setIsReportMode(true)}
              >
                <span className="fab-icon">+</span>
                <span className="fab-text">Report Issue</span>
              </button>
            )}
          </>
        )}
      </MapView>
    </div>
  );
};

export default MapPage;

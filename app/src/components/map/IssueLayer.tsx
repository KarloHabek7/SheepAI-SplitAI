import React, { useEffect } from 'react';
import type { Map, GeoJSONSource, MapLayerMouseEvent } from 'mapbox-gl';
import { useIssueGeoJson } from '@/hooks/useIssueGeoJson';
import { MAP_MARKER_COLORS } from '@/types';

interface IssueLayerProps {
  map: Map;
  onIssueClick: (issueId: string) => void;
}

const IssueLayer: React.FC<IssueLayerProps> = ({ map, onIssueClick }) => {
  const { geoJson } = useIssueGeoJson();

  useEffect(() => {
    if (!map || !geoJson) return;

    // Add source
    if (!map.getSource('issues')) {
      map.addSource('issues', {
        type: 'geojson',
        data: geoJson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });
    } else {
      (map.getSource('issues') as mapboxgl.GeoJSONSource).setData(geoJson);
    }

    // Add cluster layer
    if (!map.getLayer('clusters')) {
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'issues',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#51bbd6',
          'circle-radius': ['step', ['get', 'point_count'], 20, 5, 30, 15, 40],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'issues',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#ffffff'
        }
      });
    }

    // Add unclustered layer (individual issues)
    if (!map.getLayer('unclustered-point')) {
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'issues',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': [
            'match',
            ['get', 'status'],
            'open', MAP_MARKER_COLORS.open,
            'in_progress', MAP_MARKER_COLORS.in_progress,
            'resolved', MAP_MARKER_COLORS.resolved,
            '#ccc'
          ],
          'circle-radius': 10,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff'
        }
      });
    }

    // Handlers
    const handleClusterClick = (e: MapLayerMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      const clusterId = features[0].properties?.cluster_id;
      (map.getSource('issues') as GeoJSONSource).getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;
          map.easeTo({
            center: (features[0].geometry as any).coordinates,
            zoom: zoom || undefined
          });
        }
      );
    };

    const handlePointClick = (e: MapLayerMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
      if (features.length > 0) {
        onIssueClick(features[0].properties?.id);
      }
    };

    map.on('click', 'clusters', handleClusterClick);
    map.on('click', 'unclustered-point', handlePointClick);

    // Mouse styling
    const setPointer = () => map.getCanvas().style.cursor = 'pointer';
    const setDefault = () => map.getCanvas().style.cursor = '';
    
    map.on('mouseenter', 'clusters', setPointer);
    map.on('mouseleave', 'clusters', setDefault);
    map.on('mouseenter', 'unclustered-point', setPointer);
    map.on('mouseleave', 'unclustered-point', setDefault);

    return () => {
      // Cleanup if needed, though map.remove() in useMapboxMap handles most
    };
  }, [map, geoJson, onIssueClick]);

  return null; // This component just manages map layers
};

export default IssueLayer;

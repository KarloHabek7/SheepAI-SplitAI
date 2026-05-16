import React, { useEffect } from 'react';
import type { Map, GeoJSONSource } from 'mapbox-gl';
import { useIssueGeoJson } from '@/hooks/useIssueGeoJson';
import { MAP_MARKER_COLORS } from '@/types';

interface IssueLayerProps {
  map: Map;
  onIssueClick: (id: string) => void;
}

const IssueLayer: React.FC<IssueLayerProps> = ({ map, onIssueClick }) => {
  const { geoJson } = useIssueGeoJson();

  useEffect(() => {
    if (!map) return;

    map.addSource('issues', {
      type: 'geojson',
      data: geoJson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    // Clusters Layer
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'issues',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#444',
        'circle-radius': ['step', ['get', 'point_count'], 15, 5, 20, 15, 25],
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    });

    // Cluster Count Layer
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'issues',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
      paint: {
        'text-color': '#ffffff',
      },
    });

    // Unclustered Points Layer
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
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    });

    // Click Handlers
    map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
      const clusterId = features[0].properties?.cluster_id;
      const source = map.getSource('issues') as GeoJSONSource;
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || zoom === null || zoom === undefined) return;
        map.easeTo({
          center: (features[0].geometry as any).coordinates,
          zoom: zoom,
        });
      });
    });

    map.on('click', 'unclustered-point', (e) => {
      const feature = e.features?.[0];
      const id = feature?.properties?.id;
      if (id) onIssueClick(id);
    });

    // Cursor changes
    const onMouseEnter = () => map.getCanvas().style.cursor = 'pointer';
    const onMouseLeave = () => map.getCanvas().style.cursor = '';
    map.on('mouseenter', 'clusters', onMouseEnter);
    map.on('mouseleave', 'clusters', onMouseLeave);
    map.on('mouseenter', 'unclustered-point', onMouseEnter);
    map.on('mouseleave', 'unclustered-point', onMouseLeave);

    return () => {
      if (map.getLayer('clusters')) map.removeLayer('clusters');
      if (map.getLayer('cluster-count')) map.removeLayer('cluster-count');
      if (map.getLayer('unclustered-point')) map.removeLayer('unclustered-point');
      if (map.getSource('issues')) map.removeSource('issues');
    };
  }, [map, geoJson, onIssueClick]);

  return null;
};

export default IssueLayer;

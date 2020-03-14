// import mapboxgl from 'mapbox-gl';

class HeatMapLayer {
  constructor(map, data) {
    this.map = map;
    const filterExp = ['>=', ['get', 'confirmedNum'], 1];

    const heatPaint = {
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        1,
        9,
        3,
      ],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(112,83,243,0)',
        0.1,
        'rgba(12,13,243,0.5)',
        0.2,
        'rgba(42,204,209,0.8)',
        0.4,
        'rgba(66,240,0,0.8)',
        0.6,
        'rgba(255,221,0,0.8)',
        0.8,
        'rgba(245,108,67,0.8)',
        1,
        'rgba(255,13,37,0.8)',
      ],
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        ['interpolate', ['linear'], ['get', 'confirmedNum'], 1, 1, 1000, 10],
        3,
        ['interpolate', ['linear'], ['get', 'confirmedNum'], 1, 1, 1000, 30],
        9,
        ['interpolate', ['linear'], ['get', 'confirmedNum'], 1, 1, 1000, 150],
      ],
      'heatmap-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        3,
        1,
        7,
        0,
      ],
    };

    const circlePaint = {
      'circle-color': 'rgba(200,10,10,0.9)',
      'circle-stroke-color': 'rgba(255,255,255,0.2)',
      'circle-stroke-width': 3,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        ['interpolate', ['linear'], ['get', 'confirmedNum'], 1, 1, 1000, 30],
        8,
        ['interpolate', ['linear'], ['get', 'confirmedNum'], 1, 5, 1000, 150],
      ],
      'circle-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        8,
        1,
      ],
    };

    const textLayout = {
      'text-field': ['get', 'confirmedNum'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        12,
        8,
        18,
      ],
    };

    const textPaint = {
      'text-color': [
        'step',
        ['zoom'],
        '#000',
        7,
        '#fff',
      ],
    };

    this.map.addSource('world-geo', {
      type: 'geojson',
      data,
    });

    this.map.addLayer({
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'world-geo',
      filter: filterExp,
      paint: heatPaint,
    });

    this.map.addLayer({
      id: 'circle-layer',
      type: 'circle',
      source: 'world-geo',
      minzoom: 5,
      filter: filterExp,
      paint: circlePaint,
    });

    this.map.addLayer({
      id: 'count-layer',
      type: 'symbol',
      source: 'world-geo',
      minzoom: 5,
      layout: textLayout,
      paint: textPaint,
    });
  }

  update(data) {
    this.map.getSource('world-geo').setData(data);
  }
}

export default HeatMapLayer;

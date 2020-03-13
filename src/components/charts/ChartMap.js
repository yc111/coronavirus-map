

import { convertProvinceData, convertProvinceDataWithCp } from '../../utils/dataHandle';

const LEVE_1 = '>1000人';
const LEVE_2 = '500-999人';
const LEVE_3 = '100-499人';
const LEVE_4 = '10-99人';
const LEVE_5 = '1-9人';
const COLOR_LEVE_1 = '#7F1818';
const COLOR_LEVE_2 = '#BF2121';
const COLOR_LEVE_3 = '#FF7B69';
const COLOR_LEVE_4 = '#FFAA85';
const COLOR_LEVE_5 = '#FFEDCC';
let max;
const min = 1;
const pinMax = 100;
const pinMin = 30;

class ChartMap {
  constructor(chartInstance, mapName, geo, data) {
    this.chart = chartInstance;
    this.mapName = mapName;
    this.geo = geo;
    this.data = data;
    this.render(this.mapName, this.geo, this.data);
  }

  render(mapName, geo, data) {
    this.chart.setOption({

      title: {
        text: 'CHINA',
        subtext: 'Update on 2020.01.01 00:09',
        x: 'center',
        y: '60',
        textStyle: {
          fontWeight: 'normal',
        },
      },
      toolbox: {
        show: true,
        x: 'center',
        bottom: 20,
        feature: {
          saveAsImage: {},
        },
      },
      visualMap: {
        type: 'piecewise',
        show: true,
        min: 0,
        max: 200000,
        left: '200',
        top: 80,
        padding: 30,
        calculable: true,
        seriesIndex: [1],
        categories: [LEVE_1, LEVE_2, LEVE_3, LEVE_4, LEVE_5],
        inRange: {
          color: [COLOR_LEVE_1, COLOR_LEVE_2, COLOR_LEVE_3, COLOR_LEVE_4, COLOR_LEVE_5],
        },
      },
      geo: {
        show: true,
        map: mapName,
        roam: true,
        label: {
          show: true,
          position: 'right',
          // distance: '10',
          offset: [0, 5],
          color: '#000',
          fontWeight: 'bold',
          fontSize: '11',
        },
        itemStyle: {
          normal: {
            // areaColor: '#031525',
            // borderColor: '#fff',
          },
          emphasis: {
            areaColor: '#e7e7e7',
            borderColor: '#FF6258',
            borderWidth: '5',
          },
        },
      },
      series: [
        {
          name: '气泡',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertProvinceDataWithCp(geo, data),
          symbol: 'pin',
          symbolSize: (val) => {
            max = data.map(item => item.value).sort((a, b) => a - b).pop();
            const d = (pinMax - pinMin) / (max - min);
            return pinMax - (max - val[2]) * d;
          },

          label: {
            normal: {
              formatter(val) {
                return val.value[2];
              },
              show: true,
              textStyle: {
                color: '#000',
                fontSize: 9,
              },
            },
          },
          itemStyle: {
            normal: {
              color: '#FFC900',
            },
          },
          zLevel: 6,
        },
        {
          type: 'map',
          map: mapName,
          geoIndex: 0,
          data: convertProvinceData(data),
          aspectScale: 0.75,
          zoom: 1,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [
            [-180, 90],
            [180, -90],
          ],
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside',
                color: '#000',
                fontWeight: 'bold',
              },
            },
            areaColor: '#fff',
          },
        },
      ],

    });
  }

  update(data) {
    this.data = data;
    this.render(this.mapName, this.geo, this.data);
  }
}

export default ChartMap;

<template>
  <div>
      <el-button
      title='reset map'
      icon='el-icon-refresh-left'
      circle
      size='mini'
      style='position:fixed; right: 10px; top: 10px; z-index: 9'
      @click='handleReset'
      ></el-button>
      <div
        class='big-map'
        id='big_map'
        :style='style'
      >
      </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import HeatMapLayer from './maps/HeatMapLayer';
import dataToGeo from '../utils/data2geo';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieWMxMTEiLCJhIjoiY2s3MDA2dWt6MWMzcTNkcWF5dmY0azRkMyJ9.1FF9zAxaXYfHScMq6fKKbw';
const { mapState } = createNamespacedHelpers('situation');
const MAP_INIT_CENTER = [106.90, 38.39];
const MAP_INIT_ZOOM = 1;

export default {
  name: 'mapbox-map',

  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight}px` },
      layerInstance: {},
      mapOnLoad: false,
    };
  },
  computed: {
    ...mapState(['worldData']),
    mapInstance() {
      return new this.$mapbox.Map({
        container: 'big_map',
        center: MAP_INIT_CENTER,
        zoom: MAP_INIT_ZOOM,
        style: 'mapbox://styles/mapbox/streets-v11',
      });
    },
  },
  watch: {
    worldData(newData) {
      if (this.mapOnLoad) {
        this.updateMap(newData);
      }
    },
  },
  methods: {
    initMap() {
      this.$mapbox.accessToken = MAPBOX_TOKEN;
      this.mapInstance.on('load', () => {
        this.mapOnLoad = true;
        this.layerInstance.HeatMapLayer = new HeatMapLayer(this.mapInstance, dataToGeo(this.worldData).leafRootGeoJoin);
        // console.log(this.mapInstance.getStyle().layers);
      });
    },
    updateMap(data) {
      if (this.layerInstance.HeatMapLayer) {
        this.layerInstance.HeatMapLayer.update(dataToGeo(data).leafRootGeoJoin);
      }
    },
    handleReset() {
      this.mapInstance.flyTo({
        center: MAP_INIT_CENTER,
        zoom: MAP_INIT_ZOOM,
        essential: true,
      });
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped lang='stylus'>
.big-map
  position: fixed;
</style>

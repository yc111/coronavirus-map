<template>
  <div>
    <el-radio-group
      v-model='themeStyle'
      size='mini'
      class='theme-control'
      fill='rgba(80,100,120,0.8)'
      @change='handleThemeChange'
    >
      <el-radio-button label='bright'>Bright</el-radio-button>
      <el-radio-button label='dark'>Dark</el-radio-button>
    </el-radio-group>
    <el-switch
      title='Dashboard control'
      style='display: block; position:fixed; right: 90px; top: 15px; z-index: 9'
      v-model='showDashBoard'
      active-color='rgba(80,100,120,0.8)'
      inactive-color='rgba(80,100,120,0.2)'
      @change='handleSwitchChange'
    >
    </el-switch>
      <el-button
      title='reset map'
      icon='el-icon-refresh-left'
      circle
      size='mini'
      style='position:fixed; right: 10px; top: 10px; z-index: 9'
      @click='handleReset'
      ></el-button>
      <el-button
      title='clear marker'
      icon='el-icon-brush'
      circle
      size='mini'
      style='position:fixed; right: 50px; top: 10px; z-index: 9'
      @click='handleClear'
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
import getCenter from '../utils/getCenter';
import * as types from '../store/actions-type';

const MAPBOX_TOKEN = 'pk.eyJ1IjoieWMxMTEiLCJhIjoiY2s3MDA2dWt6MWMzcTNkcWF5dmY0azRkMyJ9.1FF9zAxaXYfHScMq6fKKbw';
const { mapState, mapMutations } = createNamespacedHelpers('situation');
const MAP_INIT_CENTER = [106.90, 38.39];
const MAP_INIT_ZOOM = 1;

export default {
  name: 'mapbox-map',

  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight}px` },
      layerInstance: {},
      showDashBoard: true,
      themeStyle: 'bright',
    };
  },
  computed: {
    ...mapState(['worldData', 'mapOnLoad']),
    mapInstance() {
      let id = 'streets-v11';
      if (this.themeStyle === 'dark') {
        id = 'dark-v10';
      }
      return new this.$mapbox.Map({
        container: 'big_map',
        center: MAP_INIT_CENTER,
        zoom: MAP_INIT_ZOOM,
        style: `mapbox://styles/mapbox/${id}`,
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
    ...mapMutations([types.SET_MAPONLOAD]),
    initMap() {
      this.$mapbox.accessToken = MAPBOX_TOKEN;
      this.mapInstance.on('load', () => {
        this[types.SET_MAPONLOAD](true);
        this.layerInstance.HeatMapLayer = new HeatMapLayer(this.mapInstance, dataToGeo(this.worldData).leafRootGeo);
        // console.log(this.mapInstance.getStyle().layers);
      });
    },
    updateMap(data) {
      if (this.layerInstance.HeatMapLayer) {
        this.layerInstance.HeatMapLayer.update(dataToGeo(data).leafRootGeo);
      }
    },
    handleReset() {
      this.mapInstance.flyTo({
        center: MAP_INIT_CENTER,
        zoom: MAP_INIT_ZOOM,
        essential: true,
      });
    },
    handleClear() {
      const el = document.querySelector('#marker');
      if (el) {
        el.parentNode.removeChild(el);
      }
    },
    handleSwitchChange(val) {
      this.$bus.$emit('displayControl', val);
    },
    handleThemeChange(val) {
      this.$bus.$emit('themeChange', val);
      this.initMap();
    },
    showMarker(poi) {
      let el = document.querySelector('#marker');
      if (!el) {
        el = document.createElement('div');
        el.style.width = '20px';
        el.style.height = '20px';
        el.id = 'marker';
      }
      new this.$mapbox.Marker(el)
        .setLngLat(poi)
        .addTo(this.mapInstance);
    },
    locateAddr(addr) {
      const poi = getCenter(addr);
      if (poi) {
        this.mapInstance.flyTo({
          center: poi,
          zoom: 3,
          speed: 1,
          curve: 2,
        });
        this.showMarker(poi);
      } else {
        this.$message({
          message: `Missing coordinate: ${addr}`,
          type: 'warning',
        });
      }
    },
  },
  mounted() {
    this.initMap();
    this.$bus.$on('locate', (addr) => {
      this.locateAddr(addr);
    });
  },
};
</script>

<style scoped lang='stylus'>
.big-map
  position: fixed;

.theme-control
  display: block;
  position: fixed;
  top: 10px;
  right: 287px;
  z-index: 9;

@media (max-width: 719px)
  .theme-control
    display: none;

</style>

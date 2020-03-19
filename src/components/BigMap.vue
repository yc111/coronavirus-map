<template>
  <div>
    <el-radio-group
      v-model='themeStyle'
      size='mini'
      class='theme-control'
      fill='rgba(80,100,120,0.8)'
      @change='handleThemeChange'
    >
      <el-radio-button label='bright'>
        <lan en='Bright' zh='白天'></lan>
      </el-radio-button>
      <el-radio-button label='dark'>
        <lan en='Dark' zh='夜晚'></lan>
      </el-radio-button>
    </el-radio-group>
    <el-switch
      :title='language === "zh" ? "面板控制" : "Dashboard control"'
      class='dashboard-control-btn'
      v-model='showDashBoard'
      active-color='rgba(80,100,120,0.8)'
      inactive-color='rgba(80,100,120,0.2)'
      @change='handleSwitchChange'
    >
    </el-switch>
    <el-button
      ref='resetBtn'
      :title='language === "zh" ? "重置地图" : "reset map"'
      class='reset-map-btn'
      icon='el-icon-refresh-left'
      circle
      size='mini'
      @click='handleReset'
    ></el-button>
    <el-button
      ref='clearBtn'
      :title='language === "zh" ? "清除标记" : "clear marker"'
      class='clear-marker-btn'
      icon='el-icon-brush'
      circle
      size='mini'
      @click='handleClear'
    ></el-button>
    <div class='mode-btn'>
      <el-button
        icon='el-icon-moon'
        circle
        size='mini'
        v-if='themeStyle==="bright"'
        @click='changeMode("dark")'
      >
      </el-button>
      <el-button
        icon='el-icon-sunny'
        circle
        size='mini'
        v-if='themeStyle==="dark"'
        @click='changeMode("bright")'
      >
      </el-button>
    </div>
    <div class='lang-btn'>
      <el-button
        title='Chinese'
        circle
        size='mini'
        v-if='language==="en"'
        @click='changeLanguage("zh")'
      >
      <span class='btn-text'>中</span>
      </el-button>
      <el-button
        title='英文'
        circle
        size='mini'
        v-if='language==="zh"'
        @click='changeLanguage("en")'
      >
      <span class='btn-text'>EN</span>
      </el-button>
    </div>
    <div
        class='big-map'
        id='big_map'
        :style='style'
    ></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
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
    ...mapState(['worldData', 'mapOnLoad', 'language']),
    mapInstance() {
      let id = 'streets-v10';
      if (this.themeStyle === 'dark') {
        id = 'dark-v9';
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
    ...mapMutations([types.SET_MAPONLOAD, types.SET_LANGUAGE]),
    initMap(cb) {
      this.$mapbox.accessToken = MAPBOX_TOKEN;
      this.mapLan = new MapboxLanguage({
        defaultLanguage: this.language,
      });
      this.mapInstance.addControl(this.mapLan);
      this.mapInstance.on('load', () => {
        this[types.SET_MAPONLOAD](true);
        this.layerInstance.HeatMapLayer = new HeatMapLayer(this.mapInstance, dataToGeo(this.worldData).leafRootGeo);
        if (cb) {
          cb();
        }
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
      this.initMap(() => {
        this.$bus.$emit('themeChange', val);
      });
    },
    changeMode(val) {
      this.themeStyle = val;
      this.handleThemeChange(val);
    },
    changeLanguage(val) {
      this[types.SET_LANGUAGE](val);
      const layer = this.mapLan.setLanguage(this.mapInstance.getStyle(), val);
      this.mapInstance.setStyle(layer, { diff: true });
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

.dashboard-control-btn
  display: block;
  position:fixed;
  right: 125px;
  top: 15px;
  z-index: 9;

.mode-btn
  display: none;
  position: fixed;
  right: 120px;
  top: 10px;
  z-index: 9;

.lang-btn
  position: fixed;
  right: 80px;
  top: 10px;
  z-index: 9;
  .btn-text
    font-weight: 200;

.clear-marker-btn
   position: fixed;
   right: 45px;
   top: 10px;
   z-index: 9;

.reset-map-btn
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 9;

@media (max-width: 719px)
  .mode-btn
    display: block;

  .theme-control
    display: none;

  .dashboard-control-btn
    right: 155px;


</style>

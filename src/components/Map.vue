<template>
  <div class='map-wrapper'>
    <button
     style='position: absolute; top:200px; z-index:99'
     @click='changedata'
     >更新</button>
    <div
    id='myChart'
    :style='style'
    >
    </div>
  </div>
</template>

<script>
import chinaJson from 'echarts/map/json/china.json';
import _ from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import ChartMap from './charts/ChartMap';
import * as types from '../store/actions-type';

const { mapActions, mapState } = createNamespacedHelpers('situation');

export default {
  name: 'Map',

  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight}px` },
    };
  },
  computed: {
    ...mapState(['provinceData']),
    echartsInstance() {
      return this.$echarts.init(document.getElementById('myChart'));
    },
  },
  watch: {
    provinceData(newData) {
      if (newData) {
        this.updateMap(newData);
      }
    },
  },
  methods: {
    ...mapActions([types.SET_PROVINCEDATA]),
    resize() {
      return _.throttle(() => {
        this.style.height = `${window.innerHeight}px`;
        this.echartsInstance.resize();
      }, 400);
    },
    initMap(data) {
      const mapName = 'china';
      this.$echarts.registerMap(mapName, chinaJson, {});
      this.map = new ChartMap(this.echartsInstance, mapName, chinaJson, data);
    },
    updateMap(data) {
      this.map.update(data);
    },
    changedata() {
      this[types.SET_PROVINCEDATA]('2020-02-02');
    },
  },
  mounted() {
    this.initMap(this.provinceData);
    window.addEventListener('resize', this.resize());
  },
  destroyed() {
    window.removeEventListener('resize', this.resize());
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.map-wrapper
  width: 100%
  height: 100%
</style>

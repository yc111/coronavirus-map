<template>
    <div
      class='big-map'
      id='big_map'
      :style='style'
    ></div>
</template>

<script>
const MAPBOX_TOKEN = 'pk.eyJ1IjoieWMxMTEiLCJhIjoiY2s3MDA2dWt6MWMzcTNkcWF5dmY0azRkMyJ9.1FF9zAxaXYfHScMq6fKKbw';

export default {
  name: 'mapbox-map',

  data() {
    return {
      style: { width: '100%', height: `${window.innerHeight}px` },
    };
  },
  computed: {
    mapInstance() {
      return new this.$mapbox.Map({
        container: 'big_map',
        center: [106.90, 38.39],
        zoom: 1,
        style: 'mapbox://styles/mapbox/streets-v11',
      });
    },
  },
  methods: {
    initMap() {
      this.$mapbox.accessToken = MAPBOX_TOKEN;
      this.mapInstance.on('load', () => {
        console.log(this.mapInstance.getStyle().layers);
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

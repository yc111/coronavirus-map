import Vue from 'vue';
import mapboxgl from 'mapbox-gl';
import App from './App.vue';
import router from './router';
import store from './store';
import 'mapbox-gl/dist/mapbox-gl.css';
import './plugins/element';
import './plugins/echarts';
import './theme/index.css';

Vue.prototype.$mapbox = mapboxgl;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

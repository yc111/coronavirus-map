import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import * as echarts from 'echarts';
import mapboxgl from 'mapbox-gl';
import App from './App.vue';
import router from './router';
import store from './store';
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.use(ElementUI, { locale });
Vue.prototype.$echarts = echarts;
Vue.prototype.$mapbox = mapboxgl;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

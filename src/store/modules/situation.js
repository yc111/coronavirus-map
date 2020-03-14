import { fetchData, fetchAssets, fetchWorldData } from '@/api';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    provinceData: {},
    worldData: {},
  },
  mutations: {
    [types.SET_PROVINCEDATA](state, payload) {
      state.provinceData = payload;
    },
    [types.SET_WORLDDATA](state, payload) {
      state.worldData = payload;
    },
  },
  actions: {
    async [types.SET_PROVINCEDATA]({ commit }, args) {
      let data = await fetchData(args);
      if (!data || data === -1) {
        data = await fetchAssets(`${args}.json`);
      }
      commit(types.SET_PROVINCEDATA, data ? data.data : {});
    },
    async [types.SET_WORLDDATA]({ commit }, args) {
      const data = await fetchWorldData(args);
      commit(types.SET_WORLDDATA, data.data);
    },
  },
};

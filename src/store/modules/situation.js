import { fetchData, fetchAssets, fetchWorldData } from '@/api';
import * as types from '../actions-type';
import { getGlobalData } from '../../utils/getGlobalData';

export default {
  namespaced: true,
  state: {
    provinceData: {},
    worldData: {},
    worldDataList: [],
    globalTotal: {},
    currentDate: '',
    mapOnLoad: false,
  },
  mutations: {
    [types.SET_PROVINCEDATA](state, payload) {
      state.provinceData = payload;
    },
    [types.SET_WORLDDATA](state, payload) {
      state.worldData = payload;
    },
    [types.SET_WORLDDATALIST](state, payload) {
      state.worldDataList = payload;
    },
    [types.SET_GLOBALTOTAL](state, payload) {
      state.globalTotal = payload;
    },
    [types.SET_CURRENTDATE](state, payload) {
      state.currentDate = payload;
    },
    [types.SET_MAPONLOAD](state, payload) {
      state.mapOnLoad = payload;
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
      commit(types.SET_WORLDDATALIST, getGlobalData(data.data).list);
      commit(types.SET_GLOBALTOTAL, getGlobalData(data.data).globalTotal);
      commit(types.SET_CURRENTDATE, args);
    },
  },
};

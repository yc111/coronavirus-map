import { fetchData, fetchAssets, fetchWorldData } from '@/api';
import * as types from '../actions-type';
import { getGlobalData } from '../../utils/getGlobalData';

const dataCache = [];

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
      if (!dataCache[args]) {
        dataCache[args] = {};
        if (!dataCache[args].provinceData) {
          let data = await fetchData(args);
          if (!data || data === -1) {
            data = await fetchAssets(`${args}.json`);
          }
          dataCache[args].provinceData = data.data;
        }
      }
      commit(types.SET_PROVINCEDATA, dataCache[args].provinceData);
    },
    async [types.SET_WORLDDATA]({ commit }, args) {
      if (!dataCache[args]) {
        dataCache[args] = {};
        if (!dataCache[args].worldData) {
          const data = await fetchWorldData(args);
          dataCache[args].worldData = data.data;
          dataCache[args].worldDataList = getGlobalData(dataCache[args].worldData).list;
          dataCache[args].globalTotal = getGlobalData(dataCache[args].worldData).globalTotal;
        }
      }
      commit(types.SET_WORLDDATA, dataCache[args].worldData);
      commit(types.SET_WORLDDATALIST, dataCache[args].worldDataList);
      commit(types.SET_GLOBALTOTAL, dataCache[args].globalTotal);
      commit(types.SET_CURRENTDATE, args);
    },
  },
};

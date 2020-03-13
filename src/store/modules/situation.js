import { fetchData, fetchAssets } from '@/api';
import * as types from '../actions-type';

export default {
  namespaced: true,
  state: {
    provinceData: [],
  },
  mutations: {
    [types.SET_PROVINCEDATA](state, payload) {
      state.provinceData = payload;
    },
  },
  actions: {
    async [types.SET_PROVINCEDATA]({ commit }) {
      let data = await fetchData('2020-02-01');
      if (!data || data === -1) {
        data = await fetchAssets('2020-02-01.json');
      }
      commit(types.SET_PROVINCEDATA, data ? data.data : []);
    },
  },
};

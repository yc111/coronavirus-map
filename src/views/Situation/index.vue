<template>
    <div>
      <Dashboard/>
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';
import Dashboard from '../../components/Dashboard.vue';

const { mapState, mapActions } = createNamespacedHelpers('situation');
export default {
  name: 'situation',

  components: {
    Dashboard,
  },
  computed: {
    ...mapState(['worldData']),
  },
  watch: {
    worldData(newData) {
      this.$bus.$emit('updateList', this.getList(newData));
    },
  },
  methods: {
    ...mapActions([types.SET_WORLDDATA]),
    getList(data) {
      const { world, nationTotal } = data;
      // const globalNum = {};
      const list = [];
      const chinaData = {
        name: '中国',
        confirmedNum: nationTotal.confirmedTotal,
        deathsNum: nationTotal.deathsTotal,
        curesNum: nationTotal.curesTotal,
      };
      const newWorld = world.map(country => ({
        name: country.name,
        confirmedNum: country.confirmedNum,
        deathsNum: country.deathsNum,
        curesNum: country.curesNum,
      }));
      list.push(...newWorld);
      list.push(chinaData);
      list.sort((a, b) => b.confirmedNum - a.confirmedNum);
      return list;
    },
  },
  mounted() {
    this[types.SET_WORLDDATA]('2020-03-14');
  },
};
</script>

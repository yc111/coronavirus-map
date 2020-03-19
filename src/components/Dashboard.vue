<template>
  <div class='dashboard-wrapper'>
    <div class='dashboard total'>
      <div
        class='data-cell'
        v-for='(item) in typeList'
        :key='item'
      >
        <span class='num' :class='item'>{{globalTotal[item] | formatterNum}}</span>
        <span class='num-title'>
          <lan :en="'Total ' + item | upperCase" :zh="item | toZh"></lan>
        </span>
      </div>
    </div>
    <div
      class='dashboard country'
      v-if='isShow'
    >
      <table class='table-header'>
        <colgroup>
          <col span='1' class='col-number'>
          <col span='1' class='col-country'>
          <col span='1' class='col-confirmed'>
          <col span='1' class='col-death'>
          <col span='1' class='col-cured'>
        </colgroup>
        <tr>
          <th><lan en='No.' zh='序号'></lan></th>
          <th><lan en='Country' zh='国家'></lan></th>
          <th
          class='thead-sort'
          v-for='(item, index) in typeList'
          :key='item'
          >
          <lan :en='item | upperCase' :zh='typeListCN[index]'></lan>
            <label
            class='el-icon-caret-bottom'
            :class='item === sortType ? "active" : ""'
            @click='handleSort(item)'
            >
              <input class='origin-radio' type="radio" v-model='sortType' :value='item'>
            </label>
          </th>
        </tr>
      </table>

      <div class='table-body'>
        <table width=100%>
          <colgroup>
            <col span='1' class='col-number'>
            <col span='1' class='col-country'>
            <col span='1' class='col-confirmed'>
            <col span='1' class='col-death'>
            <col span='1' class='col-cured'>
          </colgroup>
          <tr
            class='data-row'
            v-for='(country, index) in worldDataList'
            :key='country.name'
            @click='handleLocate(country.name)'
          >
            <td>{{index + 1}}</td>
            <td>
              <lan :en='countries[country.name] || country.name' :zh='country.name'></lan>
            </td>
            <td class='column-confirmed'>{{country.confirmedNum | formatterNum}}</td>
            <td class='column-deaths'>{{country.deathsNum | formatterNum}}</td>
            <td class='column-cures'>{{country.curesNum | formatterNum}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../store/actions-type';
import countries from '../assets/counties';

const { mapState, mapActions } = createNamespacedHelpers('situation');
export default {
  name: 'dashboard',

  data() {
    return {
      sortType: 'confirmed',
      typeList: ['confirmed', 'death', 'cured'],
      typeListCN: ['确诊', '死亡', '治愈'],
      countryData: [],
      isShow: true,
    };
  },
  filters: {
    formatterNum(num) {
      if (!num) {
        return 0;
      }
      const tempstr = num.toString();
      let newnum = '';
      for (let i = 0; i < tempstr.length; i++) {
        if ((tempstr.length - i) % 3 === 0 && i !== 0) {
          newnum = newnum.concat(',');
        }
        newnum = newnum.concat(tempstr[i]);
      }
      return newnum;
    },
    upperCase(str) {
      let newStr = '';
      newStr = str.slice(0, 1).toUpperCase().concat(str.slice(1));
      return newStr;
    },
    toZh(str) {
      const pool = {
        confirmed: '累计确诊',
        death: '累计死亡',
        cured: '累计治愈',
      };
      return pool[str];
    },
  },
  computed: {
    ...mapState(['worldDataList', 'globalTotal']),
    countries() {
      return countries;
    },
  },
  methods: {
    ...mapActions([types.SORT_WORLDDATA]),
    handleLocate(addr) {
      this.$bus.$emit('locate', addr);
    },
    handleSort(val) {
      this[types.SORT_WORLDDATA](val);
    },
  },
  mounted() {
    this.$bus.$on('displayControl', (val) => {
      this.isShow = val;
    });
  },
};

</script>
<style lang="stylus" scoped>
.dashboard-wrapper
  position: fixed;
  top: 110px;
  right: 10px;
  z-index: 9;
  width: 400px;
  box-sizing: border-box;

.dashboard
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;

.dashboard.total
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 10px 20px;

.dashboard.country
  text-align: left;
  padding: 10px 20px;

.division
  padding: 0 10px;

.label
  vertical-align: middle;
  padding-left: 3px;
  cursor: pointer;

.table-body
  height: 400px;
  overflow: auto;

  table
    border-collapse: collapse;
    font-size: 14px;

.table-header
  width: 100%;
  font-size: 12px;
  line-height: 30px;

.thead-sort label
  color: rgba(0,0,0,0.2)
  cursor: pointer;

.thead-sort label:hover
  color: gray

.thead-sort label.active
  color: #13404e

.data-row
  border-bottom: solid 1px rgba(0,0,0,0.1);
  cursor: pointer;

.data-row:hover
  background: rgba(255,255,255,0.3);

.col-number
 width: 40px;

.col-country
 width: 110px;

.col-confirmed
  width: 100px;

.col-death,
.col-cured
  width: 80px;

.column-confirmed,
.column-deaths,
.column-cures
  text-align: right;

.column-confirmed
  padding-right: 15px;
.column-deaths
  padding-right: 25px;
.column-cures
  padding-right: 35px;

.origin-radio
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;

@media (max-width: 719px)
  .dashboard-wrapper
    width: 100%;
    right: 0;
  .dashboard.total
    height: auto;

.data-cell
  display: flex;
  flex-direction: column;

.num
  font-weight: 800;
  font-size: 30px;

.num-title
  font-size: 12px;

.confirmed
  color: #bf2b2b;

.cured
  color: #01865b;

.death
  color: #13404e;

</style>

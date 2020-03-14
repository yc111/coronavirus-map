<template>
  <div class='dashboard-wrapper'>
    <div class='dashboard total'>
      <div
        class='data-cell'
        v-for='(item) in dataList'
        :key='item.type'
      >
        <span class='num' :class='item.type'>{{item.data | formatterNum}}</span>
        <span class='num-title'>{{item.label}}</span>
      </div>
    </div>
    <div class='dashboard country'>
      <div class='data-table'>
        <table style='width: 100%'>
          <tr>
            <!-- 序号国家确诊死亡治愈 -->
            <th>No.</th>
            <th>Country</th>
            <th
            class='thead-sort'
            v-for='(item) in typeList'
            :key='item'
            >
              {{item | upperCase}}
              <label
               class='el-icon-caret-bottom'
               :class='item === sortType ? "active" : ""'
              >
                <input class='origin-radio' type="radio" v-model='sortType' :value='item'>
              </label>
            </th>
          <tr class='data-row'>
            <td>1</td>
            <td>China</td>
            <td>80,982</td>
            <td>3173</td>
            <td>62917</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dashboard',

  data() {
    return {
      dataList: [
        { type: 'confirmed', data: '128229', label: 'Total Confirmed' },
        { type: 'death', data: '4724', label: 'Total Death' },
        { type: 'cured', data: '68361', label: 'Total Cured' },
      ],
      sortType: 'confirmed',
      typeList: ['confirmed', 'death', 'cured'],
    };
  },
  filters: {
    formatterNum(num) {
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
  },
};

</script>
<style lang="stylus" scoped>
.dashboard-wrapper
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 9;
  width: 400px;
  box-sizing: border-box;

.dashboard
  background: rgba(255, 255, 255, 0.3);
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
  height: 500px;

.division
  padding: 0 10px;

.label
  vertical-align: middle;
  padding-left: 3px;
  cursor: pointer;

.data-table
  padding: 10px 20px;

.data-table table
  border-collapse: collapse;

.data-table th
  padding-right: 10px;
  font-size: 12px;
  line-height: 20px;

.thead-sort label
  color: rgba(0,0,0,0.2)
  cursor: pointer;

.thead-sort label:hover
  color: gray

.thead-sort label.active
  color: #13404e

.data-row
  border-bottom: solid 1px rgba(0,0,0,0.1);

.statictics-title
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 10px 20px;
  background: rgba(255,255,255,0.3);

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

<template>
    <div class='dashboard-wrapper'>
        <div
        class='data-cell'
        v-for='(item) in dataList'
        :key='item.type'
        >
            <span class='num' :class='item.type'>{{item.data | formatterNum}}</span>
            <span class='num-title'>{{item.label}}</span>
        </div>
    </div>
</template>

<script>

export default {
  name: 'dashboard',

  data() {
    return {
      dataList: [
        { type: 'confirmed', data: '126258', label: 'Total Confirmed' },
        { type: 'cured', data: '68284', label: 'Total Cured' },
        { type: 'death', data: '4638', label: 'Total Death' },
      ],
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
  },
};

</script>
<style lang="stylus" scoped>
.dashboard-wrapper
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 9;
  background: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  width: 400px;
  height: 100px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center

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

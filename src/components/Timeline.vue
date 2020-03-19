<template>
    <div class='timeline-wrapper'>
    <span class='date'>{{currentDate}}</span>
    <div class='control-bar'>
      <button
        :title='language === "zh" ? "前一天" : "prev"'
        class='bar-item el-icon-arrow-left'
        :class='this.index <= 0 ? "disabled" : ""'
        :disabled='this.index <= 0'
        @click='handlePrev'
      ></button>
      <button
        :title='language === "zh" ? "播放" : "play"'
        class='bar-item el-icon-video-play'
        v-if='!isPlaying'
        @click='handlePlay'
      ></button>
      <button
        :title='language === "zh" ? "暂停" : "pause"'
        class='bar-item el-icon-video-pause'
        :class='isPlaying ? "pause" : ""'
        v-else
        @click='handlePause'
      ></button>
      <button
        :title='language === "zh" ? "后一天" : "next"'
        class='bar-item next-btn el-icon-arrow-right'
        :class='this.index >= dates.length - 1 ? "disabled" : ""'
        :disabled='this.index >= dates.length - 1'
        @click='handleNext'
      ></button>
    </div>
    <div class='time-horizon'>
      <span
        v-for='(date, timeindex) in dates'
        :key='date'
        :style='{left:(400 / dates.length) * timeindex + "px"}'
        :title='date'
        :class='timeindex === index ? "active" : ""'
        @click='handleTimelineChange(timeindex)'
      ></span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import getDates from '../utils/dateHandle';
import * as types from '../store/actions-type';

const { mapState, mapActions } = createNamespacedHelpers('situation');

export default {
  name: 'timeline',

  data() {
    return {
      isPlaying: false,
      index: 0,
    };
  },
  computed: {
    ...mapState(['mapOnLoad', 'currentDate', 'language']),
    dates() {
      return getDates('2020-01-21');
    },
  },

  methods: {
    ...mapActions([types.SET_WORLDDATA]),
    play() {
      if (this.mapOnLoad) {
        this.isPlaying = true;
        this.time = setInterval(() => {
          if (this.index === this.dates.length - 1) {
            this.index = 0;
          }
          const date = this.dates[this.index];
          this[types.SET_WORLDDATA](date);
          this.index++;
        }, 1000);
      }
    },
    handlePlay() {
      this.play();
    },
    handlePause() {
      clearInterval(this.time);
      this.isPlaying = false;
    },
    handlePrev() {
      clearInterval(this.time);
      this.isPlaying = false;
      this.index--;
      this[types.SET_WORLDDATA](this.dates[this.index]);
    },
    handleNext() {
      clearInterval(this.time);
      this.isPlaying = false;
      this.index++;
      this[types.SET_WORLDDATA](this.dates[this.index]);
    },
    handleTimelineChange(timeIndex) {
      clearInterval(this.time);
      this.isPlaying = false;
      this.index = timeIndex;
      this[types.SET_WORLDDATA](this.dates[timeIndex]);
    },
  },
  mounted() {
    this.index = this.dates.length - 1;
  },
  destroyed() {
    clearInterval(this.time);
  },
};
</script>

<style scoped lang='stylus'>
.timeline-wrapper
  position: fixed;
  top: 50px;
  right: 10px;
  height: 50px;
  width: 400px;
  background: rgba(255,255,255,0.5);
  z-index: 9;

@media (max-width:719px)
  .timeline-wrapper
    width: 100%;
    right: 0;

.control-bar
  display: flex;
  width: 100px;

.bar-item
  cursor: pointer;
  padding: 10px;
  background: rgba(80,100,120,0.8);
  color: #fff
  border: none;
  font-size: 16px;

.bar-item:hover
  background: rgba(80,100,120,0.5);

.bar-item.pause
  background: rgba(80,100,120,1);

.bar-item.disabled
  background: rgba(80,100,120,0);
  color: rgba(100,100,100,0.5);
  cursor: not-allowed;

.date
  font-size: 12px;
  font-weight: 800;
  position: absolute;
  top: 10px;
  left: 180px;


.time-horizon
  border-bottom: 1px solid rgba(0,0,0,0.5);
  position: relative;
  top: 10px;
  span
    display: inline-block;
    position: absolute;
    left: 0;
    top: -7px;
    cursor: pointer;
    &:before
      content: '';
      display: block;
      width: 1px;
      height: 7px;
      background: #4c4c4c;
    &:after
      visibility: hidden;
      position: absolute;
      content: '';
      display: block;
      width: 9px;
      height: 9px;
      border: 1px solid #38a;
      border-radius: 50%
      top: -3px;
      left: -5px;
    &:hover
      &:before
        background: #38a;
      &:after
        visibility: visible
    &.active
      &:before
        background: rgba(180,50,100, 0.6);
      &:after
        visibility: visible
        background: rgba(180,50,100, 0.6);
        border: 1px solid rgba(180,50,100, 0.6);
    &:nth-of-type(even)
      padding: 2px 0;
      &:before
        width: 1px;
        height: 5px;

</style>

<template>
  <div class='logo-wrapper' ref='logo'>
      <div class="sidebar-button" @click='handleOptions'></div>
      <div class='logo'></div>
      <div class='app-title'>
        <span>CoVMap</span>
        <span class='subtitle'>COVID_19</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ncov-header',

  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    handleOptions() {

    },
  },
  mounted() {
    this.$bus.$on('themeChange', (val) => {
      if (val === 'dark') {
        this.$refs.logo.classList.add('dark');
      } else {
        this.$refs.logo.classList.remove('dark');
      }
    });
  },
};
</script>

<style lang="stylus">
.logo-wrapper
  text-align: left

.sidebar-button
  position: relative
  top: 4px
  margin-left: 20px
  display none
  width: 20px
  height: 20px
  background: url('../assets/bars.svg') no-repeat center

.logo
  position relative
  top: -5px
  margin-left: 20px
  vertical-align middle
  display: inline-block
  width: 30px;
  height: 30px;
  background url('../assets/logo.png')  no-repeat
  background-size 100%

.app-title
  display: inline-block
  color: #000;
  font-size: 24px
  font-weight: 600

.subtitle
  font-size: 12px
  font-weight: 400
  margin-left: 5px

.dark
  .logo
    background-image url('../assets/logo-white.png')
  .app-title
    color: rgba(255,255,255,1);


@media (max-width:719px)
  .app-title
    font-size: 18px
    font-weight: 800
    // margin-left: 5px

  .logo
    margin-left: 10px
  //   display: none

  // .sidebar-button
  //     display: inline-block;
</style>

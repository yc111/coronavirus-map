<template>
  <div id="app">
    <div class='header'>
      <Header/>
    </div>
    <div class='top'>
      <TopNav/>
    </div>
    <div class='main'>
      <router-view/>
      <BigMap/>
    </div>
    <div class='footer'>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import TopNav from './components/TopNav.vue';
import BigMap from './components/BigMap.vue';

export default {
  components: {
    Header,
    Footer,
    TopNav,
    BigMap,
  },
};
</script>

<style lang="stylus">
*
  margin: 0
  padding: 0

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.header
  position: fixed;
  line-height: 60px;
  z-index: 9;

.aside
  position: fixed;
  top: 80px;
  z-index: 9;
  text-align: center;
  height: 100%;
  overflow: auto;

.main
  width: 100%
  height: 100%

.footer
  position: fixed;
  left: 50%;
  translate: transformX(-50%);
  bottom: 0;
  z-index: 9;
  margin-left: -12px;
  font-size: 12px;

@media (max-width:719px) {
  .app-title {
    font-size: 18px
    font-weight: 800
    margin-left: 10px
  }

  .logo {
    display: none
  }

  .sidebar-button {
      display: inline-block;
  }
}

</style>

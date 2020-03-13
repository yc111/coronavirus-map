<template>
    <div class='logo-wrapper'>
        <div class="sidebar-button"></div>
        <div class='logo'></div>
        <div class='app-title'>
          <span>CoVMap</span>
          <span class='subtitle'>COVID_19</span>
          </div>
    </div>
</template>


<style lang="stylus">
.logo-wrapper
  text-align: left
  padding-left: 20px

.sidebar-button
  position: relative
  top: 4px
  display none
  width: 20px
  height: 20px
  background: url('../assets/bars.svg') no-repeat center

.logo
  position relative
  top: -5px
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


</style>

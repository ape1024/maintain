<template>
  <div id="app">
    <div :style="{ background: 'url(static/img/back.png) no-repeat' }" class="wrapper">
      <main-loading></main-loading>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainLoading from 'base/main-loading/main-loading'
export default {
  name: 'App',
  created () {
  },
  components: {
    MainLoading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 #app
   position relative
   width 100%
   height 100%
   overflow auto
   background-size cover
   .wrapper
     width 100%
     min-width 1900px
     min-height 1040px
     overflow hidden
     background-size cover!important
</style>

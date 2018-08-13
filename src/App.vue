<template>
  <div id="app">
    <main-loading></main-loading>
    <router-view></router-view>
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
 html body
   width 100%
   height 100%
   overflow hidden
 #app
   position relative
   width 100%
   height 100%
   background-size 100% 100%!important

</style>

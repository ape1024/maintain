<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
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

<template>
  <div id="app">
    <Management></Management>
  </div>
</template>

<script>
import Management from 'components/maintain-header/maintain-header'
import Mainrouter from 'components/maintain-router/maintain-router'
export default {
  name: 'App',
  components: {
    Management,
    Mainrouter
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
   background url("../static/img/back.png") no-repeat
   background-size cover
</style>

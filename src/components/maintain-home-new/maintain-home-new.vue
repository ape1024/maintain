<template>
  <div class="home-new">
    <div class="left">
      <area-nav></area-nav>
      <area-info></area-info>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AreaNav from 'components/maintain-area-nav/maintain-area-nav'
import AreaInfo from 'components/maintain-area-info/maintain-area-info'

export default {
  created () {
    const showMap = JSON.parse(window.sessionStorage.getItem('showMap'))
    if (showMap === 1) {
      this.$router.replace({
        path: '/home/maintain-home-new/map'
      })
    } else {
      this.$router.replace({
        path: '/home/maintain-home-new/table'
      })
    }
  },
  components: {
    AreaNav,
    AreaInfo
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .home-new
    position relative
    width 100%
    height 960px
    padding 12px 12px 0
    box-sizing border-box
    display flex
    justify-content space-between
    color $color-text
    .left
      display flex
      flex-direction column
      justify-content space-between
    .right
      width 100%
      height 100%
</style>

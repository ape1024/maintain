<template>
  <div class="home-another">
    <div class="middle">
      <area-view></area-view>
    </div>
    <div class="right">
      <floor-plans></floor-plans>
      <area-graph></area-graph>
    </div>
  </div>
</template>

<script>
import AreaView from 'components/maintain-area-view/maintain-area-view'
import FloorPlans from 'components/maintain-floor-plans/maintain-floor-plans'
import AreaGraph from 'components/maintain-area-graph/maintain-area-graph'

export default {
  components: {
    AreaView,
    FloorPlans,
    AreaGraph
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .home-another
    position relative
    width 100%
    height 100%
    display flex
    justify-content space-between
    .middle
      position relative
      padding 0 15px
      height 100%
    .right
      width 100%
      display flex
      flex-direction column
      justify-content space-between
</style>

<template>
  <div class="home-table">
    <area-table></area-table>
    <area-graph></area-graph>
  </div>
</template>

<script>
import AreaTable from 'components/maintain-area-table/maintain-area-table'
import AreaGraph from 'components/maintain-area-graph/maintain-area-graph'

export default {
  components: {
    AreaTable,
    AreaGraph
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .home-table
    position relative
    width 100%
    height 100%
    padding 0 0 0 15px
    box-sizing border-box
    display flex
    flex-direction column
    justify-content space-between
</style>

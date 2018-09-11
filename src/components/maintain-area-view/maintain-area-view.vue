<template>
  <div class="area-view">
    <div class="title">{{title}}</div>
    <div class="area">
      <map-city></map-city>
      <map-factory></map-factory>
      <map-building></map-building>
    </div>
  </div>
</template>

<script>
import MapCity from 'components/maintain-map-city/maintain-map-city'
import MapFactory from 'components/maintain-map-factory/maintain-map-factory'
import MapBuilding from 'components/maintain-map-building/maintain-map-building'
export default {
  created () {
    this.title = '区域视图'
  },
  components: {
    MapCity,
    MapFactory,
    MapBuilding
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .area-view
    position relative
    width 430px
    height 100%
    background url("../../common/img/block.png")
    .title
      padding-left 10px
      line-height 50px
      font-size $font-size-medium-x
    .area
      position absolute
      left 15px
      right 15px
      top 50px
      bottom 0
      display flex
      flex-direction column
</style>

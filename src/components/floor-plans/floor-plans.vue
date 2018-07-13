<template>
  <div class="floor-plans">
    <div class="loading" v-show="loadingState">{{loadingText}}</div>
    <div class="header">
      <div class="title">{{title}}</div>
    </div>
    <div ref="map" class="map" id="floorPlans1"></div>
    <icon-list-popup ref="iconListPopup" :list="iconList" :pos="iconListPos"></icon-list-popup>
    <icon-popup ref="iconPopup" :details="details" :pos="iconDataPos"></icon-popup>
    <polygon-popup ref="polygonPopup" :list="polygonData" :pos="polygonPos"></polygon-popup>
  </div>
</template>

<script>
import { mapMixin } from 'common/js/mixin'
import IconListPopup from 'base/icon-list-popup/icon-list-popup'
import IconPopup from 'base/icon-popup/icon-popup'
import PolygonPopup from 'base/polygon-popup/polygon-popup'
import { mapGetters } from 'vuex'

export default {
  mixins: [mapMixin],
  computed: {
    ...mapGetters([
      'floorPlansAreaId'
    ])
  },
  mounted () {
    this.running = setInterval(() => {
      this.remove()
      this.reset()
      this.configure(this.floorPlansAreaId)
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.running)
  },
  watch: {
    floorPlansAreaId (newVal) {
      this.remove()
      this.reset()
      this.configure(newVal)
    }
  },
  components: {
    IconListPopup,
    IconPopup,
    PolygonPopup
  },
  created () {
    this.type = null
    this.loadingText = '暂无数据'
    this.map1 = 'floorPlans1'
    // 设置标题
    this.title = '楼层平面'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .floor-plans
    position relative
    width 100%
    height 100%
    background url("../../common/img/block.png")
    color #fff
    .loading
      position absolute
      left 15px
      right 15px
      top 65px
      bottom 20px
      box-shadow 0 10px 20px #0b121c
      z-index: $z-index-small
      background #2D456C url("../../common/img/block.png")
      display flex
      justify-content center
      align-items center
      color #777777
    .header
      position relative
      .title
        padding-left 10px
        line-height 50px
        font-size $font-size-medium-x
      .switch
        position absolute
        right 10px
        top 15px
    .map
      position absolute
      left 15px
      right 15px
      top 65px
      bottom 20px
      box-shadow 0 10px 20px #0b121c
      background #0f1928
      &:hover
        .icon
          display block
      .icon
        display none
        position absolute
        right 0
        bottom 0
        width 32px
        height 32px
        background url("../../common/img/full-screen.png") no-repeat
        z-index $z-index-medium-x
        cursor pointer
    .full-screen
      full-screen()
      background $color-background-black-o
      display flex
      justify-content center
      align-items center
      z-index $z-index-large
      .full-screen-map
        width 100%
        height 100%
        &:hover
          .icon
            display block
        .icon
          display none
          position absolute
          right 0
          bottom 0
          width 32px
          height 32px
          background url("../../common/img/full-screen-back.png") no-repeat
          z-index $z-index-medium-x
          cursor pointer
</style>

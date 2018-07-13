<template>
  <div class="city">
    <div class="title">
      <div class="icon"></div>
      <div class="text">{{title}}</div>
    </div>
    <div class="loading" v-show="loadingState">{{loadingText}}</div>
    <div ref="map" class="map" id="mapCity1"></div>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  mixins: [mapMixin],
  computed: {
    ...mapGetters([
      'cityAreaId'
    ])
  },
  methods: {
    ...mapMutations({
      update: 'UPDATE_FACTORY_AREA_ID'
    })
  },
  mounted () {
    this.running = setInterval(() => {
      this.remove()
      this.reset()
      this.configure(this.cityAreaId)
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.running)
  },
  watch: {
    cityAreaId (newVal) {
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
    this.loadingText = '暂无数据'
    this.map1 = 'mapCity1'
    // 设置标题
    this.title = '区域1'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .city
    position relative
    width 100%
    height 100%
    .title
      title()
    .loading
      position absolute
      left 0
      right 0
      top 30px
      bottom 20px
      box-shadow 0 10px 20px #0b121c
      background #2D456C url("../../common/img/block.png")
      z-index: $z-index-small
      display flex
      justify-content center
      align-items center
      color #777777
    .map
      position absolute
      left 0
      right 0
      top 30px
      bottom 20px
      box-shadow 0 10px 20px #0b121c
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

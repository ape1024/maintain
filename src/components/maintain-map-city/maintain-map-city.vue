<template>
  <div class="city" @keyup.esc="fullScreenESC">
    <div class="title">
      <div class="icon"></div>
      <div class="text">{{title}}</div>
    </div>
    <div class="loading" v-show="loadingState">{{loadingText}}</div>
    <div ref="map" class="map" id="mapCity1">
      <div class="icon" @click="openFullScreen"></div>
    </div>
    <div class="full-screen" v-show="state">
      <div class="full-screen-map" id="mapCity2">
        <div class="icon" @click="closeFullScreen"></div>
      </div>
    </div>
    <icon-list-popup ref="iconListPopup" :list="iconListData" :pos="iconListPos" @select="selectAlarmIconList"></icon-list-popup>
    <icon-popup ref="iconPopup" :details="details" :pos="iconDataPos" @receive="receive" @handle="handle" @close="close"></icon-popup>
    <polygon-popup ref="polygonPopup" :list="polygonData" :pos="polygonPos"></polygon-popup>
  </div>
</template>

<script>
import { mapMixin } from 'common/js/mixin'
import IconListPopup from 'base/icon-list-popup/icon-list-popup'
import IconPopup from 'base/icon-popup/icon-popup'
import PolygonPopup from 'base/polygon-popup/polygon-popup'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  mixins: [mapMixin],
  computed: {
    ...mapGetters([
      'cityData',
      'cityDataMq',
      'cityDataDelete'
    ])
  },
  methods: {
    ...mapActions([
      'setDeviceTree'
    ]),
    ...mapMutations({
      update: 'UPDATE_MAP_FACTORY',
      updateMq: 'UPDATE_MAP_FACTORY_MQ',
      loading: 'UPDATE_MAP_LOADING_STATE_1',
      updateAlarmId: 'UPDATE_ALARM_ID'
    })
  },
  watch: {
    cityData (newVal) {
      if (!newVal.selectData || !newVal.selectData.areaId) {
        if (!this.areaId) return
        this.deleteMapHandle()
        this.areaId = ''
        return
      }
      if (!this.loadingState) {
        this.remove()
      }
      this.reset()
      this.areaId = newVal.selectData.areaId
      this.configure(newVal.selectData, newVal.deviceData)
    },
    cityDataMq (newVal) {
      if (this.areaId === newVal.treeData.areaId) {
        this.mqToUpdateMap(newVal.treeData, newVal.deviceData)
      }
    },
    cityDataDelete (newVal) {
      if (newVal) {
        this.deleteMapHandle()
      }
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
    this.map2 = 'mapCity2'
    // 设置缩放大小
    this.maxSize = 0
    this.minSize = -2
    // 设置标题
    this.title = '用户单位'
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

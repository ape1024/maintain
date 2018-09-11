<template>
  <div class="building" @keyup.esc="fullScreenESC">
    <div class="title">
      <div class="icon"></div>
      <div class="text">{{title}}</div>
    </div>
    <div class="loading" v-show="loadingState">{{loadingText}}</div>
    <div ref="map" class="map" id="mapBuilding1">
      <div class="icon" @click="openFullScreen"></div>
    </div>
    <div class="full-screen" v-show="state">
      <div class="full-screen-map" id="mapBuilding2">
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
      'buildingData',
      'buildingDataMq',
      'buildingDataDelete'
    ])
  },
  methods: {
    ...mapActions([
      'setDeviceTree'
    ]),
    ...mapMutations({
      update: 'UPDATE_FLOOR_PLANS',
      updateMq: 'UPDATE_FLOOR_PLANS_MQ',
      loading: 'UPDATE_MAP_LOADING_STATE_3',
      updateAlarmId: 'UPDATE_ALARM_ID'
    })
  },
  watch: {
    buildingData (newVal) {
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
    buildingDataMq (newVal) {
      if (newVal.treeData.areaId === this.areaId) {
        this.mqToUpdateMap(newVal.treeData, newVal.deviceData)
      }
    },
    buildingDataDelete (newVal) {
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
    this.map1 = 'mapBuilding1'
    this.map2 = 'mapBuilding2'
    // 设置缩放大小
    this.maxSize = 0
    this.minSize = -2
    // 设置标题
    this.title = '区域3'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .building
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
      z-index: $z-index-small
      background #2D456C url("../../common/img/block.png")
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

<template>
  <div class="floor-plans" @keyup.esc="fullScreenESC">
    <div class="loading" v-show="loadingState">{{loadingText}}</div>
    <div class="header">
      <div class="title">{{currentTitle}}</div>
      <switch-sys class="switch" :list="list" @select="selectType" @switch="switchItem"></switch-sys>
    </div>
    <div ref="map" class="map" id="floorPlans1">
      <div class="icon" @click="openFullScreen"></div>
    </div>
    <div class="full-screen" v-show="state">
      <div class="full-screen-map" id="floorPlans2">
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
import SwitchSys from 'base/switch-sys/switch-sys'
import IconListPopup from 'base/icon-list-popup/icon-list-popup'
import IconPopup from 'base/icon-popup/icon-popup'
import PolygonPopup from 'base/polygon-popup/polygon-popup'
import { getDeviceTypeList } from 'api/map'
import { mapGetters, mapMutations } from 'vuex'
import { errorText } from 'common/js/config'

export default {
  mixins: [mapMixin],
  data () {
    return {
      list: [],
      currentTitle: '',
      sysShowState: false
    }
  },
  computed: {
    ...mapGetters([
      'floorData',
      'floorDataMq',
      'floorDataDelete'
    ])
  },
  methods: {
    selectType ({name, id}) {
      const type = this.resetTypeAndResetList({name, id})
      this.remove()
      this.reset()
      this.configure({areaId: this.areaId}, null, type)
    },
    resetTypeAndResetList ({name, id}) {
      // 更改数组
      this.list.forEach((item) => {
        if (item.typename === name) {
          item.typeList.forEach((t) => {
            if (t.devicetypeid === id) {
              t.isdefault = t.isdefault === 0 ? 1 : 0
            }
          })
        }
      })
      // 更改选中类型
      let type = this.type.filter((t) => t !== id)
      if (type.length === this.type.length) {
        type.push(id)
      }
      this.type = type
      return type.length === 0 ? '' : this.type.join(',')
    },
    switchItem (item) {
      // 整合选中类型
      const type = this.resetType(item)
      this.remove()
      this.reset()
      this.configure({areaId: this.areaId}, null, type)
    },
    resetType (item) {
      let type = []
      item.typeList.forEach((t) => {
        if (t.isdefault === 1) {
          type.push(t.devicetypeid)
        }
      })
      this.type = type
      return type.length === 0 ? '' : type.join(',')
    },
    getDeviceType () {
      getDeviceTypeList().then((data) => {
        if (!data) {
          this.$message.error(errorText.network)
        }
        this.list = data
        this.sysShowState = true
      })
    },
    adjust () {
      // 重新加载地图
      this.remove()
      this.initCRSMap('floorPlans1')
      this.redraw()
    },
    ...mapMutations({
      loading: 'UPDATE_MAP_LOADING_STATE_4',
      updateAlarmId: 'UPDATE_ALARM_ID'
    })
  },
  watch: {
    floorData (newVal) {
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
      this.getDeviceType()
      this.configure(newVal.selectData, newVal.deviceData)
    },
    floorDataMq (newVal) {
      if (this.areaId === newVal.treeData.areaId) {
        this.mqToUpdateMap(newVal.treeData, newVal.deviceData)
      }
    },
    floorDataDelete (newVal) {
      if (newVal) {
        this.sysShowState = false
        this.deleteMapHandle()
      }
    }
  },
  components: {
    SwitchSys,
    IconListPopup,
    IconPopup,
    PolygonPopup
  },
  created () {
    this.type = null
    this.loadingText = '暂无数据'
    this.map1 = 'floorPlans1'
    this.map2 = 'floorPlans2'
    // 设置缩放大小
    this.maxSize = 0
    this.minSize = -3
    // 设置标题
    this.title = '区域4'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .floor-plans
    position relative
    width 100%
    height 610px
    background url("../../common/img/block.png")
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

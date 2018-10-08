<template>
  <div class="area-table">
    <div class="table-title">{{title}}</div>
    <div class="content">
      <div class="type-list">
        <div class="header">
          <div class="title time">{{timeText}}</div>
          <div class="title type">{{typeText}}</div>
          <div class="title control">{{countText}}</div>
          <div class="title code">{{codeText}}</div>
          <div class="title pos">{{posText}}</div>
          <div class="title made">{{madeDateText}}</div>
          <div class="title model">{{modelText}}</div>
          <div class="title manufacture">{{manufactureText}}</div>
          <div class="title state">{{stateText}}</div>
          <div class="title handle">{{handleText}}</div>
        </div>
        <div class="body" v-show="list.length">
          <div :key="index" class="item" v-for="(item, index) in list">
            <div class="group">
              <div class="title time">{{item.effectiveTime}}</div>
              <div class="title type">{{item.deviceTypeName}}</div>
              <div class="title control">{{item.deviceCount}}</div>
              <div class="title code">{{item.deviceCode}}</div>
              <div class="title pos">{{item.locationDescription}}</div>
              <div class="title made">{{item.madeDate}}</div>
              <div class="title model">{{item.modelName}}</div>
              <div class="title manufacture">{{item.manufactureName}}</div>
              <div class="title state">{{item.action}}</div>
              <div class="title handle" @click.stop="toggle(item.deviceId)">详情</div>
            </div>
          </div>
        </div>
        <div class="loading" v-show="!list.length">{{loading}}</div>
      </div>
    </div>
    <section v-if="lookOverState" @click.stop class="area-table-review">
      <!--查看-->
      <look-over :inspection="examineInspection" :information="examineInformation" :msg="lookOverState" @look="close"></look-over>
    </section>
  </div>
</template>

<script>
import { getDeviceData, adminfindDeviceDetail, adminFindInspectionMaintenance } from 'api/user'
import { projectMixin, currentAreaMixin } from 'common/js/mixin'
// import { resetTime } from 'common/js/utils'
import { stateCode, stateData, layer } from 'common/js/config'
import LookOver from 'components/adminChild-operation/adminChild-lookover'
export default {
  mixins: [projectMixin, currentAreaMixin],
  data () {
    return {
      selected: -1,
      list: [],
      repairList: [],
      lookOverState: false,
      examineInspection: '',
      examineInformation: ''
    }
  },
  methods: {
    init () {
      this.getDeviceData(this.maintainProject, this.currentAreaId)
    },
    getDeviceData (projectId, areaId) {
      this.axios.post(getDeviceData(projectId, areaId)).then(res => {
        if (res && res.data.code === 0) {
          this.list = res.data.data.map(t => {
            return {
              effectiveTime: t.effectivedate,
              deviceTypeName: t.devicetypename,
              deviceCount: t.devicecount,
              deviceCode: t.devicecode,
              locationDescription: t.position,
              action: this.getDeviceState(t.devicestate),
              deviceId: t.deviceid,
              madeDate: t.madedate,
              modelName: t.devicemodelname,
              manufactureName: t.manufacturename
            }
          })
        }
      })
    },
    getDeviceState (stateVal) {
      let state = ''
      if ((stateVal & stateCode.shield) === stateCode.shield) {
        state = stateData[layer.shield].name
      } else if ((stateVal & stateCode.fire) === stateCode.fire) {
        state = stateData[layer.fire].name
      } else if ((stateVal & stateCode.supervise) === stateCode.supervise) {
        state = stateData[layer.supervise].name
      } else if ((stateVal & stateCode.start) === stateCode.start) {
        state = stateData[layer.start].name
      } else if ((stateVal & stateCode.feedback) === stateCode.feedback) {
        state = stateData[layer.feedback].name
      } else if ((stateVal & stateCode.fault) === stateCode.fault) {
        state = stateData[layer.fault].name
      } else if ((stateVal & stateCode.state) === stateCode.state) {
        state = stateData[layer.state].name
      } else if ((stateVal & stateCode.other) === stateCode.other) {
        state = stateData[layer.other].name
      } else {
        state = layer.normal
      }
      return state
    },
    toggle (deviceId) {
      this.axios.post(adminfindDeviceDetail(deviceId)).then((response) => {
        if (response.data.code === 0) {
          this.examineInformation = response.data.data
          this.axios.post(adminFindInspectionMaintenance(deviceId)).then((data) => {
            if (data.data.code === 0) {
              this.examineInspection = data.data.data
              this.lookOverState = true
            }
          })
        }
      })
    },
    close (ev) {
      this.lookOverState = ev
    }
  },
  components: {
    LookOver
  },
  created () {
    this.title = '设备信息'
    this.timeText = '有效时间'
    this.typeText = '设施类别'
    this.countText = '数量'
    this.codeText = '管理编码'
    this.posText = '位置描述'
    this.madeDateText = '生产日期'
    this.modelText = '规格型号'
    this.manufactureText = '生产厂家'
    this.stateText = '运行状态'
    this.handleText = '操作'
    this.loading = '暂无数据'
    this.init()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .area-table
    position relative
    width 100%
    height 610px
    background url("../../common/img/block.png")
    .table-title
      padding-left 10px
      line-height 50px
      font-size $font-size-medium-x
    .content
      position absolute
      left 15px
      right 15px
      top 50px
      bottom 15px
      background $color-background-black-o
      .type-list
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        display flex
        flex-direction column
        .header
          flex-shrink 0
          display flex
          background $color-background-button
          .title
            box-sizing border-box
            line-height 32px
            padding-left 10px
            font-size $font-size-small
        .body
          height 100%
          overflow auto
          padding-top 10px
          background rgba(0, 0, 0, .35)
          &::-webkit-scrollbar
            display none
            width 6px
            border-radius 3px/3px
            background-color $color-background-scroll
          &::-webkit-scrollbar-thumb
            border-radius 3px/3px
            box-shadow inset 0 0 6px rgba(0, 0, 0, .3)
            background-color $color-background-scroll-thumb
          .item
            position relative
            .group
              display flex
              margin-top 5px
              border-bottom 1px solid #444d5b
              .title
                box-sizing border-box
                line-height 38px
                height 38px
                padding-left 10px
                font-size $font-size-small
                color $color-text-2
                no-wrap()
            .reason
              padding 10px 30px
              border-bottom 1px solid #444d5b
              display flex
              flex-wrap wrap
              .reason-desc
                padding 10px 0
                width 50%
                box-sizing border-box
                display flex
                justify-content space-around
                &:nth-child(odd)
                  border-right 1px solid #999
                .reason-desc-item
                  width 50%
                  box-sizing border-box
                  text-align center
                  font-size $font-size-small
                  color #d5d5d5
              .reason-loading
                width 100%
                height 100px
                display flex
                justify-content center
                align-items center
                color #777777
        .loading
          height 100%
          background rgba(0, 0, 0, .35)
          display flex
          justify-content center
          align-items center
          color #777777
        .time
          width 8%
        .type
          width 12%
        .control
          width 5%
        .code
          width 15%
        .pos
          width 20%
        .made
          width 8%
        .model
          width 15%
        .manufacture
          width 15%
        .state
          width 7%
        .handle
          width 5%
          cursor pointer
    .area-table-review
      full-screen()
      background $color-barckground-transparent
      z-index $z-index-large
</style>

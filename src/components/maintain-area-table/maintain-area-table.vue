<template>
  <div class="area-table">
    <div class="table-title">{{title}}</div>
    <div class="content">
      <div class="type-list">
        <div class="header">
          <div class="title time">{{timeText}}</div>
          <div class="title type">{{typeText}}</div>
          <div class="title control">{{controlText}}</div>
          <div class="title code">{{codeText}}</div>
          <div class="title pos">{{posText}}</div>
          <div class="title state">{{stateText}}</div>
          <div class="title handle">{{handleText}}</div>
        </div>
        <div class="body" v-show="list.length">
          <div :key="index" class="item" v-for="(item, index) in list">
            <div class="group">
              <div class="title time">{{item.alarmTime}}</div>
              <div class="title type">{{item.deviceTypeName}}</div>
              <div class="title control">{{item.controllerName}}</div>
              <div class="title code">{{item.deviceCode}}</div>
              <div class="title pos">{{item.locationDescription}}</div>
              <div class="title state">{{item.action}}</div>
              <div class="title handle" @click.stop="toggle(index)">详情</div>
            </div>
            <div class="reason" v-show="index === selected">
              <div :key="m" class="reason-desc" v-for="(t, m) in 5">
                <div class="reason-desc-item">维保信息</div>
                <div class="reason-desc-item">待审核</div>
                <div class="reason-desc-item">2018-02-12</div>
              </div>
            </div>
          </div>
        </div>
        <div class="loading" v-show="!list.length">{{loading}}</div>
      </div>
    </div>
  </div>
</template>

<script>
let arr = []
for (let i = 0; i < 30; i++) {
  arr.push({
    alarmTime: '2017-12-03',
    deviceTypeName: '123',
    controllerName: '1231',
    deviceCode: '333',
    locationDescription: '222',
    action: '555'
  })
}
export default {
  data () {
    return {
      selected: -1,
      list: arr
    }
  },
  methods: {
    toggle (index) {
      if (this.selected === index) {
        this.selected = -1
      } else {
        this.selected = index
      }
    }
  },
  created () {
    this.title = '设备信息'
    this.timeText = '报警时间'
    this.typeText = '设备类型'
    this.controlText = '控制器'
    this.codeText = '设备编码'
    this.posText = '位置描述'
    this.stateText = '状态'
    this.handleText = '操作'
    this.reasonText = '报警原因：'
    this.loading = '暂无数据'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
                  font-size $font-size-small
                  color #d5d5d5
        .loading
          height 100%
          background rgba(0, 0, 0, .35)
          display flex
          justify-content center
          align-items center
          color #777777
        .time
          width 12%
        .type
          width 12%
        .control
          width 15%
        .code
          width 15%
        .pos
          width 30%
        .state
          width 8%
        .handle
          width 8%
          cursor pointer
</style>
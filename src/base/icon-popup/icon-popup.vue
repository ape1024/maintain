<template>
  <div class="icon-popup" v-show="state" @click="close">
    <div class="wrapper" ref="wrapper" @click.stop>
      <div class="head">
        <div class="title"></div>
        <i class="el-icon-close" @click="close"></i>
      </div>
      <div class="body">
        <div class="nav">
          <div class="tab" :class="{'selected-tab':selectedTab === 0}" @click="selectTab(0)">{{tab1}}</div>
          <div class="tab" :class="{'selected-tab':selectedTab === 1}" @click="selectTab(1)">{{tab2}}</div>
        </div>
        <div class="content">
          <div class="content1" v-show="selectedTab === 0">
            <div :key="index" class="group" v-for="(item, index) in details.device">
              <div class="name">{{item.name}}</div>
              <div class="val">{{item.val}}</div>
            </div>
          </div>
          <div class="content2" v-show="selectedTab === 1">
            <div :key="index" class="group" v-for="(item, index) in details.maintenance">
              <div class="name">{{item.name}}</div>
              <div class="val">{{item.val}}</div>
              <div class="time">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resize } from 'common/js/utils'
const width = 300
const height = 320
export default {
  props: {
    pos: {
      type: Object,
      default: function () {
        return {}
      }
    },
    details: {
      type: Object,
      default: function () {
        return {}
      }
    },
    alarm: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
      selectedTab: 0,
      state: false,
      toggleState: false
    }
  },
  methods: {
    open () {
      this.state = true
    },
    close () {
      this.state = false
      this.selectedTab = 0
      this.toggleState = false
      this.$emit('close')
    },
    selectTab (index) {
      this.selectedTab = index
    },
    alarmReceive () {
      this.$emit('receive', this.details.alarmId)
    },
    alarmHandle () {
      this.$emit('handle', this.details.alarmId)
    }
  },
  watch: {
    pos (newVal) {
      const currentX = resize(newVal.x, width, document.body.clientWidth)
      const currentY = resize(newVal.y, height, document.body.clientHeight)
      this.$refs.wrapper.style.transform = `translate(${currentX}px,${currentY}px)`
    },
    details () {
      this.selectedTab = 0
    }
  },
  created () {
    this.tab1 = '设备属性'
    this.tab2 = '维保信息'
    this.tab3 = '报警响应'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .icon-popup
    full-screen()
    background transparent
    z-index $z-index-large
    .wrapper
      position relative
      width 300px
      height 320px
      display flex
      flex-direction column
      background rgba(13, 19, 28, 0.95)
      font-size $font-size-small-s
      border 1px solid #303947
      .head
        flex-shrink 0
        width 100%
        height 24px
        box-sizing border-box
        padding 0 5px
        display flex
        justify-content space-between
        align-items center
        background #253652
        .title
          font-size $font-size-small-s
        i
          cursor pointer
      .body
        height 100%
        box-sizing border-box
        position relative
        .nav
          display flex
          .tab
            width 100%
            line-height 25px
            text-align center
            border-bottom 1px solid #666
            cursor pointer
            &.selected-tab
              border-bottom 1px solid #1895ff
        .content
          position absolute
          left 0
          right 0
          top 26px
          bottom 0
          padding 10px
          overflow auto
          &::-webkit-scrollbar
            display none
          .content1
            position relative
            .group
              padding 5px 0
              display flex
          .content2
            position relative
            .group
              padding 5px 0
              display flex
              justify-content space-between
          .content3
            position relative
            .group
              padding 5px 0
              display flex
            .handle
              margin 10px auto
              width 120px
              line-height 28px
              text-align center
              background red
              cursor pointer
            .tip
              position relative
              .small-title
                display flex
                justify-content space-between
              .desc
                position relative
                p
                  padding-top 10px
                  text-indent 1em
</style>

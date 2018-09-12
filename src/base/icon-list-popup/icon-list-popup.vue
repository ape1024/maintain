<template>
  <div class="icon-list-popup" v-show="state" @click="close">
    <div class="wrapper" ref="wrapper" @click.stop>
      <div class="header">
        <i class="el-icon-close" @click="close"></i>
      </div>
      <div class="body">
        <div class="t-head">
          <div class="desc desc1">{{desc1}}</div>
          <div class="desc desc2">{{desc2}}</div>
          <div class="desc desc3">{{desc3}}</div>
          <div class="desc desc4">{{desc4}}</div>
        </div>
        <div class="t-body">
          <div :key="index" class="group" v-for="(item, index) in list">
            <div class="content" @click="selectItem(item)">
              <div class="desc desc1">{{item.startTime}}</div>
              <div class="desc desc2">{{item.deviceName}}</div>
              <div class="desc desc3">{{item.deviceDesc}}</div>
              <div class="desc desc4" @click.stop="select(index)">{{item.deviceState}}</div>
            </div>
            <div class="reason" v-show="item.deviceReasonState && selected === index">{{item.deviceReason}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resize } from 'common/js/utils'
const width = 400
const height = 250
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    pos: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      state: false,
      selected: -1
    }
  },
  methods: {
    open () {
      this.state = true
    },
    close () {
      this.state = false
      this.selected = -1
      this.$emit('close')
    },
    select (index) {
      if (this.selected === index) {
        this.selected = -1
      } else {
        this.selected = index
      }
    },
    selectItem (item) {
      console.log(item)
      this.$emit('select', item)
    }
  },
  watch: {
    pos (newVal) {
      const currentX = resize(newVal.x, width, document.body.clientWidth)
      const currentY = resize(newVal.y, height, document.body.clientHeight)
      this.$refs.wrapper.style.transform = `translate(${currentX}px,${currentY}px)`
    }
  },
  created () {
    this.desc1 = '报警时间'
    this.desc2 = '设备类型'
    this.desc3 = '位置描述'
    this.desc4 = '状态'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .icon-list-popup
    full-screen()
    background transparent
    z-index $z-index-large
    .wrapper
      position relative
      display flex
      flex-direction column
      width 400px
      height 250px
      box-sizing border-box
      border 1px solid #303947
      padding-bottom 10px
      background rgba(13, 19, 28, 0.95)
      .header
        flex-shrink 0
        height 24px
        box-sizing border-box
        display flex
        flex-direction row-reverse
        align-items center
        background #253652
        i
          cursor pointer
      .body
        display flex
        flex-direction column
        height 100%
        .t-head
          flex-shrink 0
          height 24px
          box-sizing border-box
          align-items center
          display flex
          background #18212d
          .desc
            font-size $font-size-small-s
            padding-left 5px
            &.desc1
              width 20%
            &.desc2
              width 20%
            &.desc3
              width 40%
            &.desc4
              width 20%
        .t-body
          height 100%
          overflow auto
          &::-webkit-scrollbar
            display none
          .group
            font-size $font-size-small-s
            position relative
            .content
              display flex
              padding 12px 0
              border-bottom 1px solid #1a222d
              &:hover
                background #1b2432
              .desc
                box-sizing border-box
                padding-left 5px
                no-wrap()
                &.desc1
                  width 20%
                &.desc2
                  width 20%
                &.desc3
                  width 40%
                &.desc4
                  width 20%
                  cursor pointer
            .reason
              padding 8px 5px
              border-bottom 1px solid #1a222d
</style>

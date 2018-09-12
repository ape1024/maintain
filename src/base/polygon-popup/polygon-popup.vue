<template>
  <div class="polygon-popup" v-show="state" @click="close">
    <div class="wrapper" ref="wrapper" @click.stop>
      <div class="header">
        <div class="title">{{title}}</div>
        <i class="el-icon-close" @click="close"></i>
      </div>
      <div class="body">
        <div :key="index" class="group" v-for="(item, index) in list">
          <div class="name">{{item.name}}</div>
          <div class="val">{{item.val}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resize } from 'common/js/utils'
const width = 340
const height = 380
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
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
      state: false
    }
  },
  methods: {
    open () {
      this.state = true
    },
    close () {
      this.state = false
      this.$emit('close')
    }
  },
  watch: {
    pos (newVal) {
      const currentX = resize(newVal.x, width, document.body.clientWidth)
      const currentY = resize(newVal.y, height, document.body.clientHeight)
      this.$refs.wrapper.style.transform = `translate(${currentX}px,${currentY}px)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .polygon-popup
    full-screen()
    background transparent
    z-index $z-index-large
    .wrapper
      position relative
      width 340px
      height 380px
      display flex
      flex-direction column
      background rgba(13, 19, 28, 0.95)
      font-size $font-size-small-s
      border 1px solid #303947
      .header
        flex-shrink 0
        width 100%
        height 24px
        box-sizing border-box
        padding 0 5px
        display flex
        justify-content space-between
        align-items center
        background #253652
        i
          cursor pointer
      .body
        height 100%
        box-sizing border-box
        padding 10px 0
        .group
          display flex
          padding 5px 15px
</style>

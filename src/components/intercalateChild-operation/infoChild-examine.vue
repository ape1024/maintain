<template>
  <div class="info-add" v-show="show">
    <div class="info-add-pos">
      <div class="info-add-wrap">
        <div class="title">通知内容</div>
        <p class="desc">{{message}}</p>
        <div class="handle">
          <div class="handle-val close" @click="close">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .info-add
    full-screen()
    z-index $z-index-small-s
    background $color-background-black-o
    .info-add-pos
      width 100%
      box-sizing border-box
      margin-top 12%
      background #111A28
      .info-add-wrap
        width 800px
        margin 0 auto
        .title
          padding 50px 0
          font-size $font-size-medium
          color #fff
        .desc
          width 100%
          box-sizing border-box
          padding 0 20px
          line-height 30px
          word-wrap break-word
          font-size $font-size-small
          color #d5d5d5
        .handle
          padding 120px 0 50px
          text-align center
          .handle-val
            display inline-block
            margin 0 35px
            padding 10px 30px
            border-radius 5px
            font-size $font-size-small
            color #fff
            cursor pointer
            &.close
              background #202F49
</style>

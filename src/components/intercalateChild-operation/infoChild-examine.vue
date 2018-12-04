<template>
  <div class="info-add" v-show="show">
    <div class="info-add-pos">
      <div class="info-add-wrap">
        <div class="title">通知内容</div>
        <div class="info-content">
          <div class="info-content-title">
            <div class="info-desc">标题：</div>
            <div class="info-val">{{message.title}}</div>
          </div>
          <div class="info-content-name">
            <div class="info-desc">{{message.state === 0 ? '收件' : '发件'}}人员：</div>
            <div class="info-val">{{message.person}}</div>
          </div>
          <div class="info-content-group">
            <div class="info-content-time">
              <div class="info-desc">{{message.state === 0 ? '发件' : '收件'}}时间：</div>
              <div class="info-val">{{message.time}}</div>
            </div>
            <div class="info-content-level">
              <div class="info-desc">消息级别：</div>
              <div class="info-val">{{message.level}}</div>
            </div>
          </div>
          <div class="info-content-desc">
            <div class="info-desc">通知内容：</div>
            <div class="info-val">{{message.content}}</div>
          </div>
        </div>
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
      type: Object,
      default: function () {
        return {
          state: 0,
          title: '',
          person: '',
          time: '',
          level: '',
          content: ''
        }
      }
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
      margin-top 13%
      background #111A28
      .info-add-wrap
        width 800px
        margin 0 auto
        .title
          padding 40px 0
          font-size $font-size-medium
          color #fff
        .info-content
          position relative
          box-sizing border-box
          padding 0 20px
          color #fff
          .info-content-title, .info-content-name, .info-content-group, .info-content-desc
            position relative
            width 100%
            box-sizing border-box
            height 40px
            .info-content-time
              position absolute
              left 0
              top 0
              width 50%
              box-sizing border-box
            .info-content-level
              position absolute
              left 50%
              top 0
              width 50%
              box-sizing border-box
            .info-desc
              position absolute
              left 0
              top 0
              width 80px
              color #666
              font-size $font-size-small
              line-height 20px
            .info-val
              position absolute
              left 80px
              top 0
              right 0
              font-size $font-size-small
              word-break break-all
              line-height 20px
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

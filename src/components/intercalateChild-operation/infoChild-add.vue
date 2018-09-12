<template>
  <div class="info-add" v-show="show">
    <div class="info-add-pos">
      <div class="info-add-wrap">
        <div class="title">发布通知</div>
        <div class="content">
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="key"><span class="space-change">标</span>题：</div>
              <div class="val">
                <el-input class="long-change" v-model="titleName" size="mini" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="content-wrap-item">
              <div class="key">消息级别：</div>
              <div class="val">
                <el-radio-group v-model="messageLevel">
                  <el-radio :label="3">一般</el-radio>
                  <el-radio :label="6">重要</el-radio>
                  <el-radio :label="9">紧急</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="key">截止日期：</div>
              <div class="val">
                <el-date-picker
                  class="long-change"
                  size="mini"
                  v-model="finishTimeVal"
                  type="datetime"
                  placeholder="选择截止时间">
                </el-date-picker>
              </div>
            </div>
            <div class="content-wrap-item">
              <div class="key">发送日期：</div>
              <div class="val">
                <el-date-picker
                  class="long-change"
                  size="mini"
                  v-model="sendTimeVal"
                  type="datetime"
                  placeholder="选择发送时间">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-desc">
              <div class="key">通知内容：</div>
              <div class="val">
                <el-input
                  resize="none"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="messageDesc">
                </el-input>
              </div>
            </div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="key">接收对象：</div>
              <div class="val">
                <el-cascader
                  size="mini"
                  class="long-change"
                  :options="options"
                  v-model="selectedOptions">
                </el-cascader>
              </div>
            </div>
          </div>
        </div>
        <div class="handle">
          <div class="handle-val save">保存</div>
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
    }
  },
  data () {
    return {
      titleName: '',
      messageLevel: 0,
      finishTimeVal: '',
      sendTimeVal: '',
      messageDesc: '',
      selectedOptions: [],
      options: []
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
        .content
          padding 0 20px
          color #d5d5d5
          .content-wrap
            padding 10px 0
            overflow hidden
            .content-wrap-item
              float left
              width 50%
              box-sizing border-box
              .key
                float left
                width 25%
                box-sizing border-box
                text-align center
                height 30px
                line-height 30px
                .space-change
                  margin-right 34px
              .val
                float left
                width 65%
                box-sizing border-box
                height 30px
                line-height 30px
                .long-change
                  width 100%
            .content-wrap-desc
              float left
              width 100%
              box-sizing border-box
              .key
                float left
                width 12.5%
                box-sizing border-box
                text-align center
                height 30px
                line-height 30px
              .val
                float left
                width 82.5%
                box-sizing border-box
                .long-change
                  width 100%
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
            &.save
              background #3279A6
            &.close
              background #202F49
</style>

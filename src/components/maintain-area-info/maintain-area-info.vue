<template>
  <div class="area-info">
    <div class="title">{{title}}</div>
    <div class="content">
      <div class="content-left">
        <div class="content-left-info"><span class="content-left-info-all">{{allInfo}}</span><span class="content-left-info-all-span">条消息</span></div>
        <div class="content-left-info">待查收：{{awaitInfo}}</div>
      </div>
      <div class="content-right">
        <div v-if="JurisdictionSelect" class="look-info" @click="lookInfo">立即查看</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageCount } from 'api/user'
export default {
  data () {
    return {
      allInfo: 0,
      awaitInfo: 0,
      JurisdictionSelect: ''
    }
  },
  methods: {
    lookInfo () {
      console.log(this.$router)
      this.$router.push({
        path: '/home/intercalate/info'
      })
    },
    getMessageCount () {
      this.axios.post(getMessageCount()).then((res) => {
        if (res && res.data.code === 0) {
          this.allInfo = res.data.data.messageCount
          this.awaitInfo = res.data.data.unReadMessageCount
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.interVal)
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'info') {
        this.JurisdictionSelect = val.select
      }
    })
    const delay = 1000 * 60 * 10
    this.title = '消息通知'
    this.getMessageCount()
    this.interVal = setInterval(() => {
      this.getMessageCount()
    }, delay)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .area-info
    position relative
    width 325px
    height 220px
    background url("../../common/img/block.png")
    .title
      padding-left 10px
      line-height 50px
      font-size $font-size-medium-x
    .content
      position absolute
      left 0
      right 0
      top 50px
      bottom 20px
      background $color-background-black-o
      display flex
      .content-left
        height 100%
        width 60%
        display flex
        flex-direction column
        justify-content center
        padding-left 40px
        box-sizing border-box
        .content-left-info
          font-size $font-size-small
          &:first-child
            margin-bottom 25px
          .content-left-info-all
            margin-right 25px
            font-size $font-size-large-x
          .content-left-info-all-span
            color #999
      .content-right
        height 100%
        width 40%
        display flex
        flex-direction column
        justify-content center
        align-items center
        .look-info
          width 100px
          line-height 32px
          text-align center
          background $color-background-button
          border-bottom-width 2px
          border-bottom-style solid
          border-bottom-color $color-border-b-normal
          font-size $font-size-small
          cursor pointer
</style>

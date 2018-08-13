<template>
  <div class="map-loading" v-show="state">
    <div class="wrapper">
      <div class="el-icon-loading"></div>
      <div class="text">{{text}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      state: false
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  watch: {
    loading (newVal) {
      if (newVal) {
        this.state = true
        return
      }
      setTimeout(() => {
        this.state = false
      }, 500)
    }
  },
  created () {
    this.text = '数据加载中...'
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .map-loading
    full-screen()
    background rgba(0, 0, 0, .6)
    display flex
    justify-content center
    align-items center
    z-index $z-index-large
    .wrapper
      display flex
      flex-direction column
      align-items center
      .el-icon-loading
        font-size $font-size-large-x
        margin-bottom 20px
        color #fff
      .text
        color #fff
</style>

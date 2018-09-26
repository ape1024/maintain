<template>
  <div class="intercalate">
    <header class="header">
      <ul class="headerUl">
        <router-link to="/home/archives/adminFile"><li class="headerLi">消防设施归档</li></router-link>
        <router-link to="/home/archives/dailyFile"><li class="headerLi">日常巡检归档</li></router-link>
        <router-link to="/home/archives/inspectFile"><li class="headerLi">检查测试归档</li></router-link>
        <router-link to="/home/archives/maintainFile"><li class="headerLi">维护保养归档</li></router-link>
      </ul>
    </header>
    <div class="intercalateRouter">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'maintain-archives'
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .intercalate
    margin 12px 12px 0
    overflow hidden
    position relative
    background rgba(000, 000, 000, .4)
    .header
      overflow hidden
      position relative
      padding 15px 0
      margin 10px 10px
      background rgba(000, 000, 000,.47)
      .headerUl
        border-radius 5px
        overflow hidden
        text-align center
        line-height 34px
        color $color-border-b-fault
        border 1px solid #2e3d54
        background #202f49
        font-size  16px
        margin 0 10px
        .headerLi
          float left
          width 175px
          cursor pointer
  .intercalateRouter
    margin 0 10px 18px
    overflow hidden
    position relative
  .router-link-active .headerLi
    color #d5d5d5
    background #152135
</style>

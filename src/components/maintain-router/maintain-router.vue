<template>
    <ul class="ul">
        <router-link to="/home">
          <li>
            <img src="../../../static/img/home.png" alt="">
            首页
          </li>
        </router-link>
        <router-link to="/admin">
          <li>
            <img src="../../../static/img/admin.png" alt="">
            消防设施管理
          </li>
        </router-link>
        <router-link to="/daily">
          <li>
            <img src="../../../static/img/daily.png" alt="">
            日常巡检
          </li>
        </router-link>
        <router-link to="/inspect">
          <li>
            <img src="../../../static/img/inspect.png" alt="">
            检查测试
          </li>
        </router-link>
        <router-link to="/maintain">
          <li>
            <img src="../../../static/img/inspect.png" alt="">
            维护保养
          </li>
        </router-link>
        <router-link to="/repair">
          <li>
            <img src="../../../static/img/repair.png" alt="">
            故障维修
          </li>
        </router-link>
       <router-link to="/archives">
         <li>
           <img src="../../../static/img/archives.png" alt="">
           工作档案管理
         </li>
       </router-link>
       <router-link to="/report">
         <li>
           <img src="../../../static/img/report.png" alt="">
           上报问题管理
         </li>
       </router-link>
        <router-view></router-view>
    </ul>
</template>

<script>
export default {
  name: 'maintain-router'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
 .ul
    width 100%
    height 95px
    font-size $font-size-small-s
    color #7A8287
    margin-top 10px
    overflow hidden
  li
    float left
    width 83px
    height 72px
    text-align center
    margin-left 20px
    border-bottom 4px solid transparent
    overflow hidden
    img
       display block
       margin 12px auto 6px
  .ul li:hover
     background #1C2B44
     color $color-text
     border-color #5ea8d7
</style>

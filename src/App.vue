<template>
  <div id="app">
    <header class="header">
      <div class="header_left">
        <ul class="ul_router">
          <router-link to="/home">
            <li>
              <img src="../static/img/home.png" alt="">
              首页
            </li>
          </router-link>
          <router-link to="/admin">
            <li>
              <img src="../static/img/admin.png" alt="">
              消防设施管理
            </li>
          </router-link>
          <router-link to="/daily">
            <li>
              <img src="../static/img/daily.png" alt="">
              日常巡检
            </li>
          </router-link>
          <router-link to="/inspect">
            <li>
              <img src="../static/img/inspect.png" alt="">
              检查测试
            </li>
          </router-link>
          <router-link to="/maintain">
            <li>
              <img src="../static/img/inspect.png" alt="">
              维护保养
            </li>
          </router-link>
          <li>
            <router-link to="/repair">
              <img src="../static/img/repair.png" alt="">
              故障维修
            </router-link>
          </li>
          <router-link to="/archives">
            <li>
              <img src="../static/img/archives.png" alt="">
              工作档案管理
            </li>
          </router-link>
          <router-link to="/report">
            <li>
              <img src="../static/img/report.png" alt="">
              上报问题管理
            </li>
          </router-link>

        </ul>
      </div>
      <div class="header_right">
        <MaintainheaderRight></MaintainheaderRight>
      </div>
    </header>
    <section class="subject">
      <router-view>

      </router-view>
    </section>
  </div>
</template>

<script>
import Management from 'components/maintain-header/maintain-header'
import MaintainheaderRight from 'components/maintain-headerRight/maintain-headerRight'
export default {
  name: 'App',
  components: {
    Management,
    MaintainheaderRight
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 html body
   width 100%
   height 100%
   overflow hidden
 #app
   position relative
   width 100%
   height 100%
   background url("../static/img/back.png") no-repeat
   background-size cover
   .header
     width 100%
     overflow hidden
     position relative
     background url("/static/img/header.png") no-repeat
     background-size cover
    .header_left
          overflow hidden
          float: left
     .header_right
         float right
         height: 95px;
         margin-right 25px
 .ul_router
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
  .subject
    width 100%
    overflow hidden
    position relative
    margin-bottom: 12px;
</style>

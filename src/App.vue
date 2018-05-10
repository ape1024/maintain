<template>
  <div id="app">
    <header class="header">
      <div class="header_left">
        <ul class="ul_router">
          <router-link to="/home">
            <li>
              <i class="headerHome"></i>
              首页
            </li>
          </router-link>
          <router-link to="/admin">
            <li>
              <i class="headerAdmin"></i>
              消防设施管理
            </li>
          </router-link>
          <router-link to="/daily">
            <li>
              <i class="headerDaily"></i>
              日常巡检
            </li>
          </router-link>
          <router-link to="/inspect">
            <li>
              <i class="headerInspect"></i>
              检查测试
            </li>
          </router-link>
          <router-link to="/maintain">
            <li>
              <i class="headerMaintain"></i>
              维护保养
            </li>
          </router-link>
          <router-link to="/repair">
            <li>
              <i class="headerRepair"></i>
              故障维修
            </li>
          </router-link>
          <router-link to="/archives">
            <li>
              <i class="headerArchives"></i>
              工作档案管理
            </li>
          </router-link>
          <router-link to="/report">
            <li>
              <i class="headerReport"></i>
              上报问题管理
            </li>
          </router-link>
          <router-link to="/intercalate">
            <li>
              <i class="headerIntercalate"></i>
              系统设置
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
import MaintainheaderRight from 'components/maintain-headerRight/maintain-headerRight'
export default {
  name: 'App',
  components: {
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
     transition .6s
     padding-bottom: 2px;
   img
     display block
     margin 6px auto 6px
 .ul li:hover
   background #1C2B44
   color $color-text
   border-color #5ea8d7
  .subject
    overflow hidden
    position relative
    margin-bottom: 12px;
    min-height 985px
  .headerHome
    headerRouter("../static/img/home.png")
  .headerAdmin
    headerRouter("../static/img/admin.png")
   .headerDaily
     headerRouter("../static/img/daily.png")
   .headerInspect
     headerRouter("../static/img/inspect.png")
   .headerMaintain
     headerRouter("../static/img/maintain.png")
   .headerRepair
     headerRouter("../static/img/repair.png")
   .headerArchives
     headerRouter("../static/img/archives.png")
   .headerReport
     headerRouter("../static/img/report.png")
   .headerIntercalate
     headerRouter("../static/img/intercalate.png")
  .router-link-active li
    background rgba(255,255,255,.1)
    color $color-text
    border-bottom 4px solid #5ea8d7
 .router-link-active .headerHome
   background url("../static/img/home_select.png") no-repeat
   background-size cover
 .router-link-active .headerAdmin
   background url("../static/img/admin_select.png") no-repeat
   background-size cover
 .router-link-active .headerDaily
   background url("../static/img/daily_select.png") no-repeat
   background-size cover
 .router-link-active .headerInspect
   background url("../static/img/inspect_select.png") no-repeat
   background-size cover
 .router-link-active .headerMaintain
   background url("../static/img/maintain_select.png") no-repeat
   background-size cover
 .router-link-active .headerRepair
   background url("../static/img/repair_select.png") no-repeat
   background-size cover
 .router-link-active .headerArchives
   background url("../static/img/archives_select.png") no-repeat
   background-size cover
 .router-link-active .headerReport
   background url("../static/img/report_select.png") no-repeat
   background-size cover
 .router-link-active .headerIntercalate
   background url("../static/img/intercalate_select.png") no-repeat
   background-size cover

</style>

<template>
  <div id="home">
    <div  class="macrocosm">
      <header class="header" :style="{ background: 'url(static/img/header.png) no-repeat' }">
        <div class="header_left">
          <ul class="ul_router">
            <router-link to="/home/maintain-home-new">
              <li>
                <i class="headerHome"></i>
                首页
              </li>
            </router-link>
            <router-link to="/home/admin">
              <li>
                <i class="headerAdmin"></i>
                消防设施
              </li>
            </router-link>
            <router-link to="/home/daily">
              <li>
                <i class="headerDaily"></i>
                日常巡检
              </li>
            </router-link>
            <router-link to="/home/inspect">
              <li>
                <i class="headerInspect"></i>
                检查测试
              </li>
            </router-link>
            <router-link to="/home/maintain">
              <li>
                <i class="headerMaintain"></i>
                维护保养
              </li>
            </router-link>
            <router-link to="/home/repair">
              <li>
                <i class="headerRepair"></i>
                故障维修
              </li>
            </router-link>
            <router-link to="/home/archives">
              <li>
                <i class="headerArchives"></i>
                工作档案
              </li>
            </router-link>
            <router-link to="/home/report">
              <li>
                <i class="headerReport"></i>
                现场反馈
              </li>
            </router-link>
            <router-link to="/home/plan">
              <li>
                <i class="headerArranged"></i>
                定制计划
              </li>
            </router-link>
            <router-link to="/home/intercalate">
              <li>
                <i class="headerIntercalate"></i>
                系统设置
              </li>
            </router-link>
          </ul>
        </div>
        <div class="header_right">
          <MaintainheaderRight :name="username"></MaintainheaderRight>
        </div>
      </header>
      <section class="subject">
        <router-view>
        </router-view>
      </section>
    </div>
  </div>
</template>

<script>
import login from '../login/login'
import MaintainheaderRight from '../maintain-headerRight/maintain-headerRight'
// import { judgeToken } from 'api/user'
export default {
  components: {
    MaintainheaderRight,
    login
  },
  data () {
    return {
      tokenStatus: '',
      isShowed: false,
      headername: '',
      portrait: '',
      textarea: '',
      username: ''
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #home
    position relative
    width 100%
    height 100%
    background-size cover!important
  .debarkation
    position fixed
    top 0
    left 0
    overflow hidden
    z-index 111111
  .macrocosm
    init()
    .header
      width 100%
      overflow hidden
      position relative
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
    margin-bottom 12px
    min-height 900px
  .headerHome
    headerRouter("../../common/img/home.png")
  .headerAdmin
    headerRouter("../../common/img/admin.png")
  .headerDaily
    headerRouter("../../common/img/daily.png")
  .headerInspect
    headerRouter("../../common/img/inspect.png")
  .headerMaintain
    headerRouter("../../common/img/maintain.png")
  .headerRepair
    headerRouter("../../common/img/repair.png")
  .headerArchives
    headerRouter("../../common/img/archives.png")
  .headerReport
    headerRouter("../../common/img/report.png")
  .headerIntercalate
    headerRouter("../../common/img/intercalate.png")
  .headerArranged
    headerRouter("../../common/img/headerArrangedtwo.png")
  .router-link-active li
    background rgba(255,255,255,.1)
    color $color-text
    border-bottom 4px solid #5ea8d7
  .router-link-active .headerHome
    background url("../../common/img/home_select.png") no-repeat
    background-size cover
  .router-link-active .headerAdmin
    background url("../../common/img/admin_select.png") no-repeat
    background-size cover
  .router-link-active .headerDaily
    background url("../../common/img/daily_select.png") no-repeat
    background-size cover
  .router-link-active .headerInspect
    background url("../../common/img/inspect_select.png") no-repeat
    background-size cover
  .router-link-active .headerMaintain
    background url("../../common/img/maintain_select.png") no-repeat
    background-size cover
  .router-link-active .headerRepair
    background url("../../common/img/repair_select.png") no-repeat
    background-size cover
  .router-link-active .headerArchives
    background url("../../common/img/archives_select.png") no-repeat
    background-size cover
  .router-link-active .headerReport
    background url("../../common/img/report_select.png") no-repeat
    background-size cover
  .router-link-active .headerIntercalate
    background url("../../common/img/intercalate_select.png") no-repeat
    background-size cover
  .router-link-active .headerArranged
    background url("../../common/img/headerArranged.png") no-repeat
    background-size cover
</style>

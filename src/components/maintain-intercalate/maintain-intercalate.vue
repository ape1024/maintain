<template>
  <div class="intercalate">
    <header class="header">
      <ul class="headerUl">
        <!--<router-link to="/intercalate/department"><li class="headerLi">维保部门管理</li></router-link>-->
        <router-link to="/home/intercalate/structure"><li class="headerLi">组织机构</li></router-link>
        <router-link to="/home/intercalate/karakters"><li class="headerLi">角色管理</li></router-link>
        <router-link to="/home/intercalate/consumer"><li class="headerLi">用户设置</li></router-link>
        <router-link to="/home/intercalate/project"><li class="headerLi">项目设置</li></router-link>
        <router-link to="/home/intercalate/taskrules"><li v-if="true" class="headerLi">维管标准</li></router-link>
        <router-link to="/home/intercalate/info"><li class="headerLi">消息管理</li></router-link>
      </ul>
    </header>
    <div class="intercalateRouter">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maintain-intercalate'
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

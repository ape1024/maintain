<template>
  <div class="intercalate">
    <header class="header">
      <ul class="headerUl">
        <!--<router-link to="/intercalate/department"><li class="headerLi">维保部门管理</li></router-link>-->
        <!--<router-link to="/home/intercalate/structure"><li class="headerLi">组织机构</li></router-link>-->
        <router-link v-if="organizationSelect" to="/home/intercalate/structureNew"><li class="headerLi">组织机构</li></router-link>
        <router-link v-if="roleSelect" to="/home/intercalate/karakters"><li class="headerLi">角色管理</li></router-link>
        <router-link v-if="userSelect" to="/home/intercalate/consumer"><li class="headerLi">用户设置</li></router-link>
        <router-link v-if="basedeviceSelect" to="/home/intercalate/equipmentManagement"><li class="headerLi">基本设备管理</li></router-link>
        <router-link v-if="projectSelect" to="/home/intercalate/project"><li class="headerLi">项目设置</li></router-link>
        <router-link v-if="standardSelect" to="/home/intercalate/taskrules"><li v-if="true" class="headerLi">维管标准</li></router-link>
        <!--<router-link v-show="infoSelect" to="/home/intercalate/info"><li class="headerLi">消息管理</li></router-link>-->
        <router-link v-if="infoSelect" to="/home/intercalate/info"><li class="headerLi">消息管理</li></router-link>
      </ul>
    </header>
    <div class="intercalateRouter">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maintain-intercalate',
  data () {
    return {
      organizationSelect: false,
      roleSelect: false,
      userSelect: false,
      projectSelect: false,
      standardSelect: false,
      infoSelect: true,
      basedeviceSelect: false
    }
  },
  methods: {
    // 权限判断
    authority () {
      let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
      Jurisdiction.forEach((val) => {
        if (val.functioncode === 'organization') {
          this.organizationSelect = val.select
          this.jump(this.organizationSelect, '/home/intercalate/structureNew')
        }
        if (val.functioncode === 'role') {
          this.roleSelect = val.select
          this.jump(this.roleSelect, '/home/intercalate/karakters')
        }
        if (val.functioncode === 'user') {
          this.userSelect = val.select
          this.jump(this.userSelect, '/home/intercalate/consumer')
        }
        if (val.functioncode === 'project') {
          this.projectSelect = val.select
          this.jump(this.projectSelect, '/home/intercalate/project')
        }
        if (val.functioncode === 'standard') {
          this.standardSelect = val.select
          this.jump(this.standardSelect, '/home/intercalate/taskrules')
        }
        // if (val.functioncode === 'info') {
        //   this.infoSelect = val.insert
        //   this.jump(this.infoSelect, '/home/intercalate/info')
        // }
        if (val.functioncode === 'basedevice') {
          this.basedeviceSelect = val.select
          this.jump(this.basedeviceSelect, '/home/intercalate/equipmentManagement')
        }
      })
      this.flag = false
    },
    jump (currentFlag, path) {
      if (this.flag) return
      currentFlag && this.$router.push({ path })
      this.flag = true
    }
  },
  created () {
    const data = this.$route.query
    if (data.jump) {
      this.$router.push({path: '/home/intercalate/info'})
      this.flag = true
    }
    this.authority()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    if (to.path === '/home/intercalate') {
      this.authority()
    }
  }
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

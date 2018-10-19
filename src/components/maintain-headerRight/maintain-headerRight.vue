<template>
  <div class="headerRight">
     <div class="headerRight_left">
       <div class="headerRight_leftImgLeft">
         <img class="headerRight_left__img" :src="logo" alt="">
       </div>
       <div class="headerRight_leftImg">
         <div>
           <p :title="organization" class="headerRight_left__p">
             {{organization}}
           </p>
           <!--<h4 class="headerRight_left_h4">-->
             <!--维护管理系统-->
           <!--</h4>-->
         </div>
       </div>
       <div class="headerRight_bottom">
          <img class="project" src="../../common/img/project.png" alt="">
          <div class="headerRight headerRightMaintain">
            <el-select size="mini" v-model="value"  @change="patternSwitch">
              <el-option
                v-for="item in options"
                :key="item.projectid"
                :label="item.projectname"
                :value="item.projectid">
              </el-option>
            </el-select>
          </div>
        </div>
     </div>
     <div class="headerRight_right">
       <div @click="personalInformation" class="portrait">
         <img class="portraitImg" :src="portrait" alt="">
       </div>
       <div class="userOperation">
         <p class="userOperationP">
           <!--{{username?username:''}}-->
           <!--{{name}}-->
           {{username}}
         </p>
         <div @click="signout" class="userBottom">
           <img class="userBottomImg" src="../../common/img/secede.png" alt="">
           <span>安全退出</span>
         </div>
       </div>
     </div>
    <section v-if="modifyBoolean" class="modifyInformation">
      <Information :communication="moDifynews" @informa="inFourma"></Information>
    </section>
  </div>
</template>

<script>
import { secede, getPorjectByUserID, consumerFindUser, managementgetUserOrganization } from '../../api/user'
import { mapActions } from 'vuex'
import Information from './consumerHeaderRight'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [ projectMixin ],
  name: 'maintain-headerRight',
  components: {
    Information
  },
  props: ['name'],
  data () {
    return {
      portrait: !sessionStorage.userInfo ? '' : JSON.parse(sessionStorage.userInfo).icon,
      username: !sessionStorage.userInfo ? '' : JSON.parse(sessionStorage.userInfo).username,
      options: [],
      value: this.$store.state.maintainProject,
      modifyBoolean: false,
      logo: JSON.parse(sessionStorage.userInfo).logo,
      organization: ''
    }
  },
  methods: {
    init () {

    },
    inFourma (ev) {
      this.modifyBoolean = ev
    },
    patternSwitch (ev) {
      this.updateProjectAndUpdateLocal(ev)
    },
    signout () {
      let signouttoken = JSON.parse(window.sessionStorage.token)
      this.axios.post(secede(signouttoken)).then((response) => {
      //   用户点击退出 清除sessionStorage
        this.$router.push({path: '/login'})
        sessionStorage.clear()
      })
    },
    ...mapActions([
      'updateProjectAndUpdateLocal'
    ]),
    personalInformation () {
      let user = JSON.parse(window.sessionStorage.userInfo).userid
      this.axios.post(consumerFindUser(user)).then((response) => {
        if (response.data.code === 0) {
          this.moDifynews = response.data.data
          this.modifyBoolean = true
        }
      })
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    let userid = JSON.parse(window.sessionStorage.userInfo).userid
    this.axios.post(getPorjectByUserID(token, userid)).then((response) => {
      if (response.data.code === 0) {
        this.options = response.data.data
        if (!response.data.data.length) {
          this.value = ''
          this.updateProjectAndUpdateLocal('')
        }
      }
    })
    this.axios.post(managementgetUserOrganization(token)).then((response) => {
      if (response.data.code === 0) {
        this.organization = response.data.data.organizationname
      }
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .headerRight
      overflow hidden
      position relative
    .headerRight_left
       float left
       position relative
       overflow hidden
    .headerRight_left__p
      margin-top 30px
      margin-bottom 6px
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      color $color-text
    .headerRight_left_h4
      font-size 12px
      color #d5d5d5
      margin 4px 0
    .headerRight_bottom
       overflow hidden
    .project
      float left
      margin 8px 8px 0 0
    .headerRight_right
      float right
      position relative
      margin 18px 0px 0 40px
      .portrait
         float left
         width 55px
         height 55px
         border-radius 50%
         margin-right 14px
         border 5px solid #202f49
         -moz-box-shadow 0px 3px 2px #000
         -webkit-box-shadow 0px 3px 2px #000
         box-shadow 0px 3px 2px #000
         .portraitImg
           width 55px
           height 55px
           display inline-block
           border-radius 50%
      .userOperation
         margin-left 12px
         overflow hidden
         .userOperationP
            font-size 14px
            color $color-text
            margin-top 25px
            overflow hidden
         .userBottom
            font-size $font-size-small-s
            color #cc5966
            cursor pointer
            margin-top 6px
            overflow hidden
            .userBottomImg
               display inline-block
               margin-top -2px
               vertical-align middle
  .headerRight_left__img
    width 50px
    height 50px
    display inline-block
    vertical-align middle
  .headerRight_leftImgLeft
    float left
    margin 25px 8px 0 0
    overflow hidden
    position relative
  .modifyInformation
    position fixed
    left 0
    top 0
    z-index 1111
    background rgba(000,000,000,.8)
    height 100%
    width 100%
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .headerRightMaintain .el-input--suffix .el-input__inner
    background transparent!important
    border-bottom 1px solid #3f4856
    border-left none
    border-right none
    border-top none
    border-radius 0
    color #eee
</style>

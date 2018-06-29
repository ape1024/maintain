<template>
  <div class="headerRight">
     <div class="headerRight_left">
        <h4 class="headerRight_left_h4">
          维护管理系统
        </h4>
        <div class="headerRight_bottom">
          <img class="project" src="../../../static/img/project.png" alt="">
          <div class="headerRight">
            <el-select v-model="value" placeholder=""  @change="patternSwitch">
              <el-option
                v-for="item in options"
                :key="item.projectid"
                :label="item.proprietorname"
                :value="item.projectid">
              </el-option>
            </el-select>
          </div>
        </div>
     </div>
     <div class="headerRight_right">
       <div class="portrait">
         <img class="portraitImg" :src="portrait?portrait:''" alt="">
       </div>
       <div class="userOperation">
         <p class="userOperationP">
           {{username?username:''}}
         </p>
         <div @click="signout" class="userBottom">
           <img class="userBottomImg" src="../../../static/img/secede.png" alt="">
           <span>安全退出</span>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import { secede } from '../../api/user'
export default {
  name: 'maintain-headerRight',
  data () {
    return {
      portrait: sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo).icon : '',
      username: sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo).username : '',
      options: [],
      value: []
    }
  },
  methods: {
    patternSwitch (ev) {
      window.localStorage.pattern = ev
      console.log(window.localStorage.pattern)
    },
    signout () {
      console.log(window.localStorage.token)
      let signouttoken = JSON.parse(window.sessionStorage.token)
      this.axios.post(secede(signouttoken)).then((response) => {
      //   用户点击退出 清除sessionStorage
        console.log(response)
        sessionStorage.clear()
        this.$router.push({path: '/login'})
      })
    }
  },
  created () {
    if (window.sessionStorage.length !== 0) {
      this.portrait = JSON.parse(sessionStorage.userInfo).icon
      this.username = JSON.parse(sessionStorage.userInfo).username
    }
    if (window.localStorage.pattern !== undefined) {
      this.value = JSON.parse(window.localStorage.pattern)
    }
    this.axios.post(`http://172.16.6.181:8920/projects/findAllProjects`).then((response) => {
      if (response.data.code === 0) {
        console.log(response)
        this.options = response.data.data
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
    .headerRight_left_h4
      font-size $font-size-large-x
      color $color-text
      margin 14px 0
    .headerRight_bottom
       overflow hidden
    .project
      float left
      margin 8px 8px 0 0
    .headerRight_right
      float right
      position relative
      margin 18px 20px 0 75px
      .portrait
         float left
         width 55px
         height 55px
         border-radius 50%
         margin-right 14px
         border 5px solid #202f49
         -moz-box-shadow 0px 3px 2px #000
         -webkit-box-shadow: 0px 3px 2px #000;
         box-shadow: 0px 3px 2px #000;
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
  .el-input--suffix .el-input__inner
      background transparent
      height 30px
      border none
      line-height 30px
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
      height 30px
      line-height 30px
</style>

<template>
  <div class="headerRight">
     <div class="headerRight_left">
        <h4 class="headerRight_left_h4">
          维护管理系统
        </h4>
        <div class="headerRight_bottom">
          <img class="project" src="../../common/img/project.png" alt="">
          <div class="headerRight">
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
       <div class="portrait">
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
  </div>
</template>

<script>
// import $ from 'jquery'
import { secede, findUserProjects } from '../../api/user'
export default {
  name: 'maintain-headerRight',
  props: ['name'],
  data () {
    return {
      portrait: sessionStorage.userInfo !== undefined ? JSON.parse(sessionStorage.userInfo).icon : '',
      username: sessionStorage.userInfo !== undefined ? JSON.parse(sessionStorage.userInfo).username : '',
      options: [],
      value: [],
      tokenData: this.$store.state.userToken
    }
  },
  watch: {
    tokenData (vl) {
      alert(vl)
    }
  },
  methods: {
    patternSwitch (ev) {
      window.localStorage.pattern = ev
      console.log(window.localStorage.pattern)
    },
    signout () {
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
    console.log('啦啦啦啦啦啦啦')
    console.log(this.$store.state.userToken)
    if (window.sessionStorage.token === undefined) {
      console.log('%c Hello World', 'color: red;font-size: 24px;font-weight: bold;text-decoration: underline;')
      let token = this.$store.state.userToken
      this.axios.post(findUserProjects(token)).then((response) => {
        if (response.data.code === 0) {
          this.options = response.data.data
          if (window.localStorage.pattern !== undefined) {
            this.value = JSON.parse(window.localStorage.pattern)
          } else {
            this.value = response.data.data[0].projectid
            window.localStorage.pattern = response.data.data[0].projectid
          }
        }
      })
    } else {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(findUserProjects(token)).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          console.log(response.data.data)
          this.options = response.data.data
          let pattern = JSON.parse(window.localStorage.pattern)
          let patternBo = false
          if (window.localStorage.pattern !== undefined) {
            console.log('./')
            console.log(response.data.data)
            if (response.data.data) {
              response.data.data.forEach((val) => {
                if (val.projectid === pattern) {
                  patternBo = true
                }
              })
            }
            if (patternBo) {
              this.value = pattern
            } else {
              if (response.data.data) {
                this.value = response.data.data[0].projectid
                window.localStorage.pattern = response.data.data[0].projectid
              }
            }
          } else {
            this.value = response.data.data[0].projectid
            window.localStorage.pattern = response.data.data[0].projectid
          }
        }
      })
    }
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
      margin 18px 20px 0 30px
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
</style>

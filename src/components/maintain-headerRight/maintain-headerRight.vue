<template>
  <div class="headerRight">
     <div class="headerRight_left">
        <h4 class="headerRight_left_h4">
          维护管理系统
        </h4>
        <div class="headerRight_bottom">
          <img class="project" src="../../../static/img/project.png" alt="">
          <div class="headerRight">
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
         <p class="userOperationP" v-html="headername">

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
export default {
  name: 'maintain-headerRight',
  data () {
    return {
      //  用户名
      headername: '',
      //  用户头像
      portrait: '../../../static/img/portrait.png',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    getDate () {
      // let headername = sessionStorage.userInfo.username
      // let portrait = sessionStorage.userInfo.icon
      // this.headername = headername
      // this.portrait = portrait
      // console.log(sessionStorage.userInfo)
    },
    signout () {
      let this_ = this
      let signouttoken = sessionStorage.token.token
      let strIng = `http://172.16.6.99:8910/auth/logout?token=${signouttoken}`
      this.axios.post(strIng).then(function (response) {
        //   用户点击退出 清除sessionStorage
        sessionStorage.clear()
        this_.$router.push({path: '/login'})
      })
    }
  },
  mounted () {
    this.getDate()
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
      overflow hidden
      margin 18px 20px 0 75px
      .portrait
         float left
         width 55px
         height 55px
         border-radius 50%
         margin-right 14px
         border 5px solid #202f49
         .portraitImg
           width 55px
           height 55px
           display inline-block
           border-radius 50%
           -moz-box-shadow 0px 3px 2px #000
           -webkit-box-shadow 0px 3px 2px #000
           box-shadow 0px 3px 2px #000
      .userOperation
         margin-left 12px
         overflow hidden
         .userOperationP
            font-size $font-size-small-s
            color $color-text
            margin-top 18px
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

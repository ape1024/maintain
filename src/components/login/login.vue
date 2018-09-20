<template>
  <div v-if="true" :style="{ background: 'url(static/img/weblogin.png) no-repeat top' }" class="subject">
    <div class="subjectDiv">
      <div class="content">
        <el-input size="mini" v-model="account" placeholder="请输入账号"></el-input>
      </div>
      <div class="content">
        <el-input size="mini" type="password" v-model="password" placeholder="请输入密码"></el-input>
      </div>
      <div class="content">
        <div class="drag">
          <div class="drag_bg"></div>
          <div class="drag_text">{{confirmWords}}</div>
          <div @mousedown="mousedownFn($event)" class="handler handler_bg"></div>
        </div>
      </div>
      <div class="contentDiv">
        <div class="fastener">
          <div @click="signin($event)" class="fastenerDiv">
            登 录 1.5.4
          </div>
          <!--<span>2.3Bate</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapActions, mapGetters } from 'vuex'
import { TOKEN_STATE_TRUE } from 'api/config'
import { userLogin, getUserFuncions, findUserProjects } from '../../api/user'
export default {
  name: 'login',
  components: {},
  props: {},
  computed: {
    ...mapGetters([
      'clientId'
    ])
  },
  data () {
    return {
      //  权限
      authority: [],
      icon: '',
      username: '',
      //  检验是否有token
      tokenStatus: '',
      //  账号
      account: '',
      //  密码
      password: '',
      //  用户信息
      userInformation: {},
      //  默认的图片src
      defaultSrc: 'static/img/login.png',
      //  距离屏幕左端距离
      beginClientX: 0,
      //  触发拖动状态  判断
      mouseMoveStata: false,
      //  拖动最大宽度
      maxwidth: 332,
      //  滑块文字
      confirmWords: '拖动滑块验证',
      // 验证成功判断
      confirmSuccess: false
    }
  },
  methods: {
    mousedownFn (e) {
      this.mouseMoveStata = true
      this.beginClientX = e.clientX
      //  按下滑块函数
    },
    successFunction () {
      $('.handler').removeClass('handler_bg').addClass('handler_ok_bg')
      this.confirmWords = '验证通过'
      $('.drag_text').css({'color': '#fff'})
      $('.handler').css({'left': this.maxwidth})
      $('.drag_bg').css({'width': this.maxwidth})
      $('body').unbind('mousemove')
      $('body').unbind('mouseup')
      this.confirmSuccess = true
      //  验证成功函数
    },
    signin (e) {
      if (this.confirmSuccess) {
        let account = this.account
        let password = this.password
        //  获取登录 url
        let pstDate = userLogin(account, password, this.clientId)
        // 登陆时重置token状态
        window.sessionStorage.setItem('tokenState', JSON.stringify(TOKEN_STATE_TRUE))
        this.axios.post(pstDate).then((response) => {
          let data = response.data
          if (data.code === 0) {
            if (data.data.code === -1) {
              alert('账号错误，请重新登录！')
              return false
            } else {
              //  用户已登录
              if (data.data.code === -3) {
                alert('密码错误，请重新登录！')
                return false
              } else {
                if (data.data.code === 0) {
                  let userinfo = JSON.stringify(response.data.data.userInfo)
                  let token = JSON.stringify(response.data.data.token)
                  let showMap = JSON.stringify(response.data.data.systemConfig.showMap)
                  window.sessionStorage.setItem('userInfo', userinfo)
                  window.sessionStorage.setItem('token', token)
                  window.sessionStorage.setItem('showMap', showMap)
                  let newToken = JSON.parse(token)
                  this.axios.post(getUserFuncions(newToken)).then((data) => {
                    console.log(data)
                    data.data.forEach((val) => {
                      let approval = ''
                      let deleteData = ''
                      let insertData = ''
                      let selectData = ''
                      let updateData = ''
                      let assignData = ''
                      let checkData = ''
                      if (val.approval === 0) {
                        approval = false
                      } else {
                        approval = true
                      }
                      if (val.delete === 0) {
                        deleteData = false
                      } else {
                        deleteData = true
                      }
                      if (val.insert === 0) {
                        insertData = false
                      } else {
                        insertData = true
                      }
                      if (val.select === 0) {
                        selectData = false
                      } else {
                        selectData = true
                      }
                      if (val.update === 0) {
                        updateData = false
                      } else {
                        updateData = true
                      }
                      if (val.assign === 0) {
                        assignData = false
                      } else {
                        assignData = true
                      }
                      if (val.check === 0) {
                        checkData = false
                      } else {
                        checkData = true
                      }
                      let obj = {
                        functioncode: val.functioncode,
                        approval: approval,
                        delete: deleteData,
                        insert: insertData,
                        select: selectData,
                        update: updateData,
                        assign: assignData,
                        check: checkData
                      }
                      this.authority.push(obj)
                    })
                    console.log(this.authority)
                    let authority = JSON.stringify(this.authority)
                    window.sessionStorage.setItem('Jurisdiction', authority)
                  })
                  // let dom = e.target
                  this.axios.post(findUserProjects(JSON.parse(token))).then((data) => {
                    if (data.data.code === 0) {
                      if (!window.localStorage.pattern) {
                        let projects = ''
                        if (data.data.data.length) {
                          projects = data.data.data[0].projectid
                          this.updateProjectAndUpdateLocal(projects)
                        } else {
                          this.updateProjectAndUpdateLocal(projects)
                        }
                      } else {
                        let pattern = window.localStorage.pattern
                        let patternBoolean = false
                        if (data.data.data.length) {
                          data.data.data.forEach((val) => {
                            if (val.projectid === pattern) {
                              patternBoolean = true
                            }
                          })
                          if (patternBoolean) {
                            this.updateProjectAndUpdateLocal(pattern)
                          } else {
                            this.updateProjectAndUpdateLocal(data.data.data[0].projectid)
                          }
                        }
                      }
                    }
                    this.$router.push('/loginBlank')
                  })
                } else {
                  this.$message.error('登录失败')
                }
              }
            }
          } else {
            this.$message.error('请求失败，请刷新，重新输入！')
          }
        })
      } else {
        this.$message({
          message: '请先拖动验证',
          type: 'warning'
        })
      }
    },
    ...mapActions([
      'updateProjectAndUpdateLocal'
    ])
  },
  mounted () {
    $('body').on('mousemove', (e) => {
      if (this.mouseMoveStata) {
        var width = e.clientX - this.beginClientX
        if (width > 0 && width <= this.maxwidth) {
          $('.handler').css({'left': width})
          $('.drag_bg').css({'width': width})
        } else if (width > this.maxwidth) {
          this.successFunction()
        }
      }
    })
    $('body').on('mouseup', (e) => {
      //  鼠标放开
      this.mouseMoveStata = false
      let width = e.clientX - this.beginClientX
      if (width < this.maxwidth) {
        $('.handler').css({'left': 0})
        $('.drag_bg').css({'width': 0})
      }
    })
  },
  created () {
    // let account = 1006
    // let password = 123456
    // let pstDate = userLogin(account, password)
    // this.axios.post(pstDate).then((response) => {
    //   let data = response.data
    //   if (data.code === 0) {
    //     if (data.data.code === -1) {
    //       alert('账号错误，请重新登录！')
    //       return false
    //     } else {
    //       //  用户已登录
    //       if (data.data.code === -3) {
    //         alert('密码错误，请重新登录！')
    //         return false
    //       } else {
    //         if (data.data.code === 0) {
    //           let userinfo = JSON.stringify(response.data.data.userInfo)
    //           let token = JSON.stringify(response.data.data.token)
    //           window.sessionStorage.setItem('userInfo', userinfo)
    //           window.sessionStorage.setItem('token', token)
    //           let newToken = JSON.parse(token)
    //           this.axios.post(getUserFuncions(newToken)).then((data) => {
    //             data.data.forEach((val) => {
    //               let approval = ''
    //               let deleteData = ''
    //               let insertData = ''
    //               let selectData = ''
    //               let updateData = ''
    //               let assignData = ''
    //               let checkData = ''
    //               if (val.approval === 0) {
    //                 approval = false
    //               } else {
    //                 approval = true
    //               }
    //               if (val.delete === 0) {
    //                 deleteData = false
    //               } else {
    //                 deleteData = true
    //               }
    //               if (val.insert === 0) {
    //                 insertData = false
    //               } else {
    //                 insertData = true
    //               }
    //               if (val.select === 0) {
    //                 selectData = false
    //               } else {
    //                 selectData = true
    //               }
    //               if (val.update === 0) {
    //                 updateData = false
    //               } else {
    //                 updateData = true
    //               }
    //               if (val.assign === 0) {
    //                 assignData = false
    //               } else {
    //                 assignData = true
    //               }
    //               if (val.check === 0) {
    //                 checkData = false
    //               } else {
    //                 checkData = true
    //               }
    //               let obj = {
    //                 functioncode: val.functioncode,
    //                 approval: approval,
    //                 delete: deleteData,
    //                 insert: insertData,
    //                 select: selectData,
    //                 update: updateData,
    //                 assign: assignData,
    //                 check: checkData
    //               }
    //               this.authority.push(obj)
    //             })
    //             let authority = JSON.stringify(this.authority)
    //             window.sessionStorage.setItem('Jurisdiction', authority)
    //           })
    //           // let dom = e.target
    //           this.axios.post(findUserProjects(JSON.parse(token))).then((data) => {
    //             if (data.data.code === 0) {
    //               if (!window.localStorage.pattern) {
    //                 let projects = ''
    //                 if (data.data.data.length) {
    //                   projects = data.data.data[0].projectid
    //                   this.updateProjectAndUpdateLocal(projects)
    //                 } else {
    //                   this.updateProjectAndUpdateLocal(projects)
    //                 }
    //               } else {
    //                 let pattern = window.localStorage.pattern
    //                 let patternBoolean = false
    //                 if (data.data.data.length) {
    //                   data.data.data.forEach((val) => {
    //                     if (val.projectid === pattern) {
    //                       patternBoolean = true
    //                     }
    //                   })
    //                   if (patternBoolean) {
    //                     this.updateProjectAndUpdateLocal(pattern)
    //                   } else {
    //                     this.updateProjectAndUpdateLocal(data.data.data[0].projectid)
    //                   }
    //                 }
    //               }
    //             }
    //             this.$router.push('/loginBlank')
    //           })
    //         } else {
    //           this.$message.error('登录失败')
    //         }
    //       }
    //     }
    //   } else {
    //     this.$message.error('请求失败，请刷新，重新输入！')
    //   }
    // })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    width 100%
    height 100%
    overflow hidden
    background-size cover
    .subjectP
      font-size 30px
      color $color-text
      position absolute
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      bottom 10.5%
      left 40%
    .subjectDiv
       position absolute
       bottom 35%
       right 6%
       width 374px
       padding 48px 62px 20px
       border-radius 5px
       background #fff
       overflow hidden
       .content
         init()
         margin-bottom 20px
  .drag
    position relative
    background-color #e8e8e8
    width 100%
    height 34px
    line-height 34px
    text-align center

  .handler
    position absolute
    top 0
    left 0
    width 40px
    height 32px
    border 1px solid #ccc
    cursor move
  .handler_bg
    background #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;

  .handler_ok_bg
    background #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
  .drag_bg
    background-color #7ac23c
    height 34px
    width: 0px
  .contentDiv
    margin-top
  .drag_text
    position absolute
    top 0px
    width 100%
    color $color-border-b-fault
    -moz-user-select none
    -webkit-user-select none
    user-select none
    -o-user-select none
    -ms-user-select none
  .fastener
    init()
    padding 10px 0
    text-align center
    .fastenerDiv
       display inline-block
       position relative
       cursor pointer
       background #5497c2
       background-size cover
       font-size $font-size-medium-x
       color $color-text
       width 160px
       transition .2s
       line-height 46px
       border-radius 5px
       height 46px
       -moz-box-shadow 0 0 8px #5497C2
       -webkit-box-shadow 0 0 8 #5497C2
       box-shadow 0 0 8px #5497C2
       &:hover
         background #5da7d6
</style>

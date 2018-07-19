<template>
  <div class="section">
    <div class="sectionDiv">
      <h4 class="sectionH">
        授权
      </h4>
      <ul class="sectionUl">
        <li :key="index" v-for="(item, index) in sectionLi" class="sectionLi">
          <el-checkbox v-model="item.flag">{{item.rolename}}</el-checkbox>
        </li>
      </ul>
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div @click="closedown" class="closedown">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'consumerChild-accredit',
  props: ['userid'],
  data () {
    return {
      sectionLi: ''
    }
  },
  methods: {
    conserve () {
      console.log(this.userid)
      let roles = []
      this.sectionLi.forEach((val) => {
        if (val.flag === true) {
          roles.push(val.roleid)
        }
      })
      console.log()
      this.axios.post(`http://172.16.6.181:8920/users/setUserRoles?userid=${this.userid}`, roles).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.$emit('acredit', false)
        }
      })
    },
    closedown () {
      this.$emit('acredit', false)
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    console.log(token)
    console.log('+-+')
    let getUserRoles = []
    this.axios.post(`http://172.16.6.181:8920/users/getRolesList?token=${token}`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        console.log('++++++')
        console.log(response)
        response.data.data.forEach((val) => {
          val.flag = false
        })
        this.sectionLi = response.data.data
        console.log('啦啦啦')
        console.log(this.sectionLi)
        this.axios.post(`http://172.16.6.181:8920/users/getUserRoles?userid=${this.userid}`).then((response) => {
          console.log('000')
          console.log(this.userid)
          console.log(response.data)
          if (response.data.length !== 0) {
            console.log('11')
            response.data.forEach((val) => {
              console.log(val)
              getUserRoles.push(val.roleid)
            })
            console.log(getUserRoles)
            for (let i = 0; i < getUserRoles.length; i++) {
              this.sectionLi.forEach((val) => {
                if (val.roleid === getUserRoles[i]) {
                  val.flag = true
                }
              })
            }
            console.log('-----------------------------------')
            console.log(getUserRoles)
          } else {
            return false
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .section
    margin 180px 0 0
    width 100%
    overflow hidden
    background #111a28
  .sectionDiv
    margin  50px auto
    overflow hidden
    position relative
    width 1200px
  .sectionH
    margin-bottom 40px
    color #eee
    font-size 18px
  .sectionUl
    width 100%
    overflow hidden
    position  relative
  .sectionLi
    overflow hidden
    position relative
    margin-right 40px
    float left
  .fastener
    init()
    margin-top 50px
    color $color-text
    text-align center
    .conserve
      conserve()
      margin-right 100px
    .closedown
      closedown()
</style>

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
import { setUserRoles, getRolesList, getUserRoles } from '../../api/user'
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
      let roles = []
      this.sectionLi.forEach((val) => {
        if (val.flag === true) {
          roles.push(val.roleid)
        }
      })
      this.axios.post(setUserRoles(this.userid), roles).then((response) => {
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
    let getUserRolesData = []

    this.axios.post(getRolesList(token)).then((response) => {
      if (response.data.code === 0) {
        response.data.data.forEach((val) => {
          val.flag = false
        })
        this.sectionLi = response.data.data
        this.axios.post(getUserRoles(this.userid)).then((response) => {
          if (response.data.length !== 0) {
            response.data.forEach((val) => {
              getUserRolesData.push(val.roleid)
            })
            for (let i = 0; i < getUserRolesData.length; i++) {
              this.sectionLi.forEach((val) => {
                if (val.roleid === getUserRolesData[i]) {
                  val.flag = true
                }
              })
            }
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

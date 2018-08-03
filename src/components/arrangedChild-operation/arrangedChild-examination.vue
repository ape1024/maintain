<template>
  <section class="section">
    <div class="sectionDiv">
      <div class="sectionRadio">
        <span class="sectionSpan">审核结论:</span>
        <el-radio-group v-model="radio">
          <el-radio :key="index" v-for="(item ,index) in approvalState" :label="item.value">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div class="sectionTextarea">
        <span class="sectionSpan">审核意见:</span>
        <span class="sectionSpantwo">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        </span>
      </div>
      <div class="button">
        <div @click="conserve" class="conserve">审批</div>
        <div @click="closedown" class="closedown">取消</div>
      </div>
    </div>
  </section>
</template>

<script>
import { approvalCheckPlan, getApprovalItems } from '../../api/user'
export default {
  name: 'arrangedChild-examination',
  props: ['Checkplaniddata'],
  data () {
    return {
      radio: '',
      textarea: '',
      approvalState: ''
    }
  },
  methods: {
    conserve () {
      let token = JSON.parse(window.sessionStorage.token)
      let checkPlanId = this.Checkplaniddata
      let approvalOpinion = this.textarea
      let approvalState = this.radio
      console.log(token)
      console.log(checkPlanId)
      console.log(approvalOpinion)
      console.log(approvalState)
      if (approvalState === '') {
        this.$message({
          message: '请选择审核结论!',
          type: 'warning'
        })
        return false
      } else if (approvalOpinion === '') {
        this.$message({
          message: '请填写审核意见!',
          type: 'warning'
        })
      } else {
        this.axios.post(approvalCheckPlan(token, checkPlanId, approvalOpinion, approvalState)).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$emit('closeup', false)
            this.$message({
              message: '审批成功',
              type: 'success'
            })
          }
        })
      }
    },
    closedown () {
      this.$emit('closeup', false)
    }
  },
  created () {
    //  获取审批状态
    this.axios.post(getApprovalItems()).then((response) => {
      if (response.data.code === 0) {
        this.approvalState = response.data.data
        this.radio = this.approvalState[0].value
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .section
    overflow hidden
    position relative
    background #111a28
    padding 80px 0 80px
    margin 200px 0 0
    width 100%
    .sectionDiv
      margin 0 auto
      width 600px
      position relative
      overflow hidden
      .sectionRadio
        position relative
        margin-bottom 40px
        overflow hidden
  .button
    overflow hidden
    color #fff
    margin-top 40px
    text-align center
    width 100%
  .sectionSpan
    float left
    display inline-block
    width 100px
    font-size 16px
    color #eee
  .sectionSpantwo
    width 500px
    overflow hidden
    display inline-block
  .conserve
    margin-right 40px
    conserve()
  .closedown
     closedown()
</style>

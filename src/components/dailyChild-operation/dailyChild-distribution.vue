<template>
  <section class="distriBution">
    <div class="distriBution_div">
      <h4 class="distriButionH">
        处理方式
      </h4>
      <div class="distriButionDiv">
        <div class="distriButionDiv_div">
          <p class="distriButionDiv_p">
            检查项目
          </p>
          <p class="distriButionDiv_line"></p>
        </div>
        <div class="distriButionOption">
          <el-radio-group v-model="radio2">
            <el-radio :key="index" v-for="(item, index) in getrepairDate" :label="item.value">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="explain">
        <div class="distriButionDiv_div">
          <p class="distriButionDiv_p">
            异常情况
          </p>
          <p class="distriButionDiv_line"></p>
        </div>
        <div class="distributionExplain">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="instrucTion">
          </el-input>
        </div>
        <div class="distriButionDiv_div">
          <p class="distriButionDiv_p">
            处理意见
          </p>
          <p class="distriButionDiv_line"></p>
        </div>
        <div class="distributionExplain">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入内容"
            v-model="objection">
          </el-input>
        </div>
        <div class="personnelTwo">
          <p class="personChargePThree">项目选择：</p>
          <p class="personChargePTwo">
            <el-select size="mini" v-model="projectSelectionData" placeholder="请选择">
            <el-option
              v-for="item in projectSelection"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </p>
        </div>
        <div class="personnel">
          <div class="personCharge">
            <p class="personChargeP">维保单位：</p>
            <div class="personChargeDiv">
              <el-checkbox-group v-model="maintenanceList">
                <el-tree
                  class="tree"
                  :data="maintenance"
                  default-expand-all
                  node-key="id"
                  :props="proprietorProps">
                  <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div>{{ node.label }}</div>
                    <div class="tree-checkbox">
                      <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                        <el-checkbox :label="item.userid" :disabled="proprietorCheckList.length > 0">{{item.username}}</el-checkbox>
                      </div>
                    </div>
                  </div>
                </el-tree>
              </el-checkbox-group>
            </div>
          </div>
          <div v-if="organizationtype === 1" class="maintenance">
            <p class="personChargeP">
              业主单位：
            </p>
            <div class="tree-wrapper">
              <el-checkbox-group v-model="repairCheckList">
                <el-tree
                  class="tree"
                  :data="proprietor"
                  node-key="id"
                  default-expand-all
                  :props="ownerProps">
                  <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div>{{ node.label }}</div>
                    <div class="tree-checkbox">
                      <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                        <el-checkbox :label="item.userid" :disabled="proprietorCheckList.length > 0">{{item.username}}</el-checkbox>
                      </div>
                    </div>
                  </div>
                </el-tree>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="explainBottom">
          <div @click.stop="conserve" class="conserve">
            安排任务
          </div>
          <div @click.stop="closedown" class="closedown">
            关闭
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { maintainDailygetProprietorOrgTree, maintainDailyassignedTask, managementgetUserOrganization, maintainDailygetRepairOrgTreeByDeviceId } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [ projectMixin ],
  name: 'dailyChild-distribution',
  props: ['distriBoolean', 'getrepairDate', 'instruction', 'equipment'],
  data () {
    return {
      radio2: '',
      // 快速分配 显示/隐藏
      distrBoolean: false,
      textarea: '',
      instrucTion: '',
      objection: '',
      proprietor: [],
      proprietorProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      maintenance: [],
      repairCheckList: [],
      ownerProps: {
        children: 'subOrgnizations',
        label: 'organizationName'
      },
      proprietorCheckList: [],
      maintenanceList: [],
      organizationtype: '',
      projectSelection: [],
      projectSelectionData: '',
      maintenanceData: []
    }
  },
  watch: {
    projectSelectionData (el) {
      console.log(el)
      this.maintenanceData.forEach((val) => {
        if (val.projectId === el) {
          this.maintenance = val.subOrgnizations
        }
      })
    }
  },
  methods: {
    conserve () {
      if (this.radio2 === '') {
        this.$message({
          message: '请选择检查项目!',
          type: 'warning'
        })
        return false
      } else {
        let string = ``
        let desc = this.instrucTion
        let disposeopinion = this.objection
        let faultTypeId = this.radio2
        let projectid = this.projectSelectionData
        let usersNumber = this.maintenanceList.concat(this.repairCheckList)
        let users = []
        this.instruction.forEach((val) => {
          string += `${val.checktaskdetailid},`
        })
        string = string.substring(0, string.length - 1)
        if (usersNumber.length !== 0) {
          usersNumber.forEach((val) => {
            let obj = {
              userid: val
            }
            users.push(obj)
          })
        } else {
          this.$message({
            message: '请选择维保单位或业主单位!',
            type: 'warning'
          })
          return false
        }
        let token = JSON.parse(window.sessionStorage.token)
        this.axios.post(maintainDailyassignedTask(projectid, token, string, desc, disposeopinion, faultTypeId), users).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '分配成功',
              type: 'success'
            })
            this.$emit('distribution', false)
          } else if (response.data.code === -1) {
            this.$message({
              message: '异常状态!',
              type: 'warning'
            })
          }
        })
      }
    },
    closedown () {
      this.$emit('dist', false)
    }
  },
  created () {
    console.log(this.getrepairDate)
    console.log(this.instruction)
    console.log(this.equipment)
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(managementgetUserOrganization(token)).then((response) => {
      if (response.data.code === 0) {
        this.organizationtype = response.data.data.organizationtype
      }
    })
    this.instruction.forEach((val, index) => {
      let data = `${index + 1},工作事项: ${val.matters},工作记录:${val.workrecord}, 工作结论: ${val.conclusion === null ? ' ' : val.conclusion}\n`
      this.instrucTion += data
    })
    //  业主单位
    this.axios.post(maintainDailygetProprietorOrgTree()).then((response) => {
      if (response.data.code === 0) {
        this.proprietor = response.data.data
      }
    })
    //  维保单位 this.equipment
    this.axios.post(maintainDailygetRepairOrgTreeByDeviceId(this.equipment, token)).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.length) {
          this.maintenanceData = response.data.data
          response.data.data.forEach((val) => {
            // this.projectSelection
            let obj = {
              label: val.organizationName,
              value: val.projectId
            }
            this.projectSelection.push(obj)
          })
          this.projectSelectionData = response.data.data[0].projectId
        }
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .distriBution
    margin 80px auto 0
    width 950px
    height 800px
    background #111a28
    border 1px solid #444d5b
    .distriBution_div
      margin 40px 90px
      overflow hidden
      position relative
      .distriButionH
        font-size $font-size-medium-x
        color $color-text-title
      .distriButionDiv
        overflow hidden
        color $color-border-b-fault
        font-size $font-size-small
        margin-top 16px
        min-height 60px
      .distriButionDiv_div
        init()
      .distriButionDiv_p
        float left
      .distriButionDiv_line
        float right
        width 613px
        height 1px
        background #444d5b
        margin-top 6px
      .distriButionOption
        margin 22px 20px
        overflow hidden
      .explain
        init()
        .distributionExplain
          overflow hidden
          margin 10px 0
          position relative
        .personCharge
          width 50%
          float left
          overflow hidden
          position relative
          .personChargeP
            float left
            font-size $font-size-small
            color $color-border-b-fault
            line-height 20px
            margin-right 6px
          .personChargeDiv
            float left
            width 300px
            overflow auto
            height 260px
        .explainBottom
          init()
          margin-top 50px
          overflow hidden
          text-align center
          .conserve
            conserve()
            margin-right 110px
          .closedown
            closedown()
  .data
    width 100%
    display flex
    .type-group
      display flex
      justify-content left
      .type
        display block
    .owner
      width 45%
      height 185px
      box-sizing border-box
      overflow auto
      &::-webkit-scrollbar
        display none
    .maintenance
      width 55%
      box-sizing border-box
      .desc
        padding 8px 0 15px
        font-size $font-size-small
        color #999
        line-height 20px

  .arrange
    padding 15px
    display flex
    .item
      display flex
      font-size $font-size-medium
      margin-right 50px
      .desc
        margin-right 8px
        color #999
  .func
    margin 10px auto
    width 60%
    display flex
    justify-content space-around
    padding 10px 0
    .button
      width 100px
      line-height 30px
      text-align center
      background $color-background-button
      border-bottom 2px solid #1895ff
      cursor pointer
  .tree
    background transparent
    color $color-text-desc
    .custom-tree-node
      padding-top 7px
      font-size $font-size-small
      .tree-checkbox
        padding 10px 0 0 10px
        .tree-checkbox-item
          padding 5px 0
    .el-tree-node__children .custom-tree-node
      background none
    .el-tree-node__content
      height auto
      align-items flex-start
  .maintenance
    width 50%
    float right
    overflow-y auto
    overflow-x hidden
    min-height 260px
    max-height 260px
  .tree-wrapper
    float left
    box-sizing border-box
    height 260px
    overflow auto
    &::-webkit-scrollbar
      display none
  .personnel
    width 100%
    overflow hidden
    position relative
    .personChargeP
      float left
      font-size $font-size-small
      color $color-border-b-fault
      line-height 20px
      margin-right 6px
  .personnelTwo
    overflow hidden
    margin-bottom 10px
    width 100%
  .personChargePTwo
    margin-left 10px
    float left
  .personChargePThree
    line-height 28px
    float left
    font-size 14px
    color #999
    margin-right 6px
</style>

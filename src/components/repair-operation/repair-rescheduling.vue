<template>
    <div class="subject">
      <section class="content">
        <h4 class="contentH">
          任务安排
        </h4>
        <div class="situation">
          <div class="situationTop">
            <p class="situationTopP">
              任务类型：
            </p>
            <el-radio-group v-model="getrepairRadio">
              <el-radio :key="index" v-for="(item, index) in getrepairDate" :label="item.value">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="situationDiv">
            <p class="situationDivP">
              异常情况：
            </p>
            <div class="situationdivRight">
              <el-input
                size="mini"
                type="textarea"
                :rows="4"
                resize="none"
                placeholder=""
                v-model="abnormalCondition">
              </el-input>
            </div>
          </div>
          <div class="situationDiv">
            <p class="situationDivP">
              处理意见：
            </p>
            <div class="situationdivRight">
              <el-input
                size="mini"
                type="textarea"
                :rows="4"
                resize="none"
                placeholder=""
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <div class="situationDiv">
            <div class="personnelone">
              <span class="personneloneSpan">安排人员：</span>
              <span>
              {{msg.creatername}}
              </span>
            </div>
            <div class="personnelone">
              <span class="personneloneSpan">安排时间：</span>
              <span>
              {{fmtDate(msg.createtime)}}
              </span>
            </div>
          </div>
          <div class="personnel">
            <div class="personCharge">
              <p class="personChargeP">维保单位：</p>
              <div class="personChargeDiv">
                <el-checkbox-group v-model="maintenanceList">
                  <el-tree
                    class="tree"
                    :data="maintenance"
                    node-key="id"
                    :props="proprietorProps">
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                      <div>{{ node.label }}</div>
                      <div class="tree-checkbox">
                        <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                          <el-checkbox :label="item.userid"
                                       :disabled="proprietorCheckList.length > 0">
                            <svg class="icon" style="color: lightblue;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1593"><path d="M717.664 612.195c-52.734 47.461-121.289 79.102-200.391 79.102s-147.656-31.641-205.664-79.102c-131.836 68.555-221.484 158.203-221.484 321.68l843.75 0c0-163.477-89.648-247.852-216.211-321.68zM512 628.016c131.836 0 237.305-110.742 237.305-242.578s-105.469-242.578-237.305-242.578-237.305 110.742-237.305 242.578c0 137.109 110.742 242.578 237.305 242.578z" p-id="1594"></path></svg>
                            <span class="nodeLabel">{{item.username}}</span>
                          </el-checkbox>
                        </div>
                      </div>
                    </div>
                  </el-tree>
                </el-checkbox-group>
              </div>
            </div>
            <div v-if="organizationtype === 1" class="maintenance">
              <p class="personChargeP">业主单位：</p>
              <div class="personChargeDiv">
                <el-checkbox-group v-model="repairCheckList">
                  <el-tree
                    class="tree"
                    :data="proprietor"
                    node-key="id"
                    :props="ownerProps">
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                      <div>{{ node.label }}</div>
                      <div class="tree-checkbox">
                        <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                          <el-checkbox :label="item.userid"
                                       :disabled="proprietorCheckList.length > 0">
                            <svg class="icon" style="color: lightblue;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1593"><path d="M717.664 612.195c-52.734 47.461-121.289 79.102-200.391 79.102s-147.656-31.641-205.664-79.102c-131.836 68.555-221.484 158.203-221.484 321.68l843.75 0c0-163.477-89.648-247.852-216.211-321.68zM512 628.016c131.836 0 237.305-110.742 237.305-242.578s-105.469-242.578-237.305-242.578-237.305 110.742-237.305 242.578c0 137.109 110.742 242.578 237.305 242.578z" p-id="1594"></path></svg>
                            <span class="nodeLabel">{{item.username}}</span>
                          </el-checkbox>
                        </div>
                      </div>
                    </div>
                  </el-tree>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="fastener">
          <div @click="conserve" class="conserve">
            保存
          </div>
          <div @click="closedown" class="closedown">
            关闭
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
import { getRepairUsers, maintainRepairreAssignedTask, maintainDailygetRepairTypes, maintainDailygetProprietorOrgTree, maintainDailygetRepairOrgTreeByDeviceId, managementgetUserOrganization } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin],
  name: 'repair-rescheduling',
  props: ['msg'],
  data () {
    return {
      thispage: false,
      checked: true,
      textarea: '',
      options: [],
      value: '',
      //  异常情况
      abnormalCondition: '',
      getrepairDate: '',
      getrepairRadio: '',
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
      conserveStore: false
    }
  },
  methods: {
    // 格式化时间
    fmtDate (obj) {
      return formatDate(obj, 'yyyy/MM/dd HH:mm')
    },
    conserve () {
      let users = []
      let token = JSON.parse(window.sessionStorage.token)
      let repairid = this.msg.repairtaskid
      let desc = this.abnormalCondition
      let disposeopinion = this.textarea
      let faultTypeId = this.getrepairRadio
      let usersNumber = this.maintenanceList.concat(this.repairCheckList)
      if (usersNumber.length !== 0) {
        usersNumber.forEach((val) => {
          let obj = {
            userid: val
          }
          users.push(obj)
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择维保单位或业主单位!',
          type: 'warning'
        })
        return false
      }
      if (desc === '') {
        this.$message({
          showClose: true,
          message: '异常情况不能为空!',
          type: 'warning'
        })
        return
      } else if (disposeopinion === '') {
        this.$message({
          showClose: true,
          message: '处理意见不能为空!',
          type: 'warning'
        })
        return
      } else if (usersNumber.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择维保单位或者业主单位人员!',
          type: 'warning'
        })
        return
      } else if (this.getrepairRadio === '') {
        this.$message({
          showClose: true,
          message: '请选择任务类型!',
          type: 'warning'
        })
        return false
      }
      if (this.conserveStore) {
        this.$message({
          showClose: true,
          message: '请勿重复提交,耐心等待!',
          type: 'warning'
        })
        return false
      }
      this.conserveStore = true
      this.axios.post(maintainRepairreAssignedTask(token, repairid, desc, disposeopinion, faultTypeId), users).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            showClose: true,
            message: '安排成功',
            type: 'success'
          })
          this.$emit('quipment', this.thispage)
        }
      })
    },
    closedown () {
      this.$emit('quipment', this.thispage)
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(managementgetUserOrganization(token)).then((response) => {
      if (response.data.code === 0) {
        this.organizationtype = response.data.data.organizationtype
      }
    })
    // 异常情况
    this.abnormalCondition += `情况说明: ${this.msg.exception === null ? ' ' : this.msg.exception}\n处理情况:${this.msg.treatment === null ? ' ' : this.msg.treatment}`
    // 任务类型
    this.getrepairRadio = this.msg.repairtype
    // 处理意见
    this.textarea = this.msg.disposeopinion
    //  业主单位
    this.axios.post(maintainDailygetProprietorOrgTree()).then((response) => {
      if (response.data.code === 0) {
        this.proprietor = response.data.data
      }
    })
    //  维保单位 this.equipment
    this.axios.post(maintainDailygetRepairOrgTreeByDeviceId(this.msg.deviceid, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.length) {
          this.maintenance = response.data.data
        } else {
          this.maintenance = []
        }
      }
    })
    // 绑定人员
    this.axios.post(getRepairUsers(this.msg.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data
        data.forEach((val) => {
          this.maintenanceList.push(val.userid)
          if (this.organizationtype === 1) {
            this.repairCheckList.push(val.userid)
          }
        })
      }
    })
    this.axios.post(maintainDailygetRepairTypes()).then((response) => {
      if (response.data.code === 0) {
        this.getrepairDate = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    width 100%
    overflow hidden
    position relative
    margin-top 100px
    background #111a28
    padding 40px 0
    .content
      overflow hidden
      position relative
      width 1220px
      margin 0 auto
     .contentH
       color $color-text-title
       margin-bottom 26px
       font-size $font-size-medium-x
     .situation
        margin-left 80px
        overflow hidden
        position relative
        .situationTop
           init()
           margin-bottom 20px
           color $color-border-b-fault
           font-size $font-size-medium
           .situationTopP
              margin-right 10px
              float left
        .situationDiv
           init()
           margin-bottom 40px
        .situationdivRight
            float right
            width 1050px
       .personnelone
          float left
          width 50%
          overflow hidden
          position relative
          color $color-text
          font-size $font-size-medium
          .personneloneSpan
            color $color-border-b-fault
    .fastener
      init()
      text-align center
      margin-top 50px
      .conserve
         conserve()
         margin-right 40px
       .closedown
         closedown()
  .situationDivP
    float left
    line-height 30px
    color $color-border-b-fault
    font-size $font-size-medium
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
            color $color-border-b-fault
            line-height 20px
            margin-right 6px
          .personChargeDiv
            float left
            width 228px
            overflow-y scroll
            height 130px
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
    height 240px
    float right
    overflow-y auto
    overflow-x hidden
  .tree-wrapper
    float left
    box-sizing border-box
    height 130px
    overflow auto
    &::-webkit-scrollbar
      display none
  .personnel
    width 100%
    overflow hidden
    position relativemax-height
    .personChargeP
      float left
      color $color-border-b-fault
      line-height 20px
      margin-right 6px
  .distriBution
  margin 117px auto 0
  width 894px
  height 680px
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
    color $color-border-b-fault
    line-height 20px
    margin-right 6px
  .personChargeDiv
    float left
    width 450px
    overflow auto
    height 240px
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
  /*::-webkit-scrollbar*/
    /*display none*/
</style>

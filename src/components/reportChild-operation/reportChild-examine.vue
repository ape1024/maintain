<template>
  <div class="subject">
    <section class="content">
      <h4 class="contentH">
        现场反馈信息安排
      </h4>
      <div class="information">
        <div class="informationTop">
          <ul class="informationTopUl">
            <li class="informationTopLitwo">
              <span>设施名称：</span>
              <span class="informationTopSpan">{{examine.devicename}}</span>
            </li>
            <li class="informationTopLi">
              <span>设备编码：</span>
              <span class="informationTopSpan">{{examine.devicecode}}</span>
            </li>
            <li class="informationTopLi">
              <span>设施位置：</span>
              <span class="informationTopSpan">{{examine.areaname}}{{examine.position}}</span>
            </li>
          </ul>
        </div>
        <ul class="informationTopUl">
          <li class="informationTopLitwo">
            <span>维保单位：</span>
            <span class="informationTopSpan">{{examine.vindicatorname}}</span>
          </li>
          <li class="informationTopLitwo">
            <span>项目负责人：</span>
            <span class="informationTopSpan">{{examine.leader}}</span>
          </li>
          <li class="informationTopLitwo">
            <span>联系电话：</span>
            <span class="informationTopSpan">{{examine.leadertel}}</span>
          </li>
        </ul>
        <div class="tabulation">
          <div class="tabulationLeft">
            <div class="tleftTop">
              <div class="tlefttopHeader">
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">反馈时间：</span>
                  <span class="tlefttopli_Span">{{examine.createtime}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">反馈人员：</span>
                  <span class="tlefttopli_Span">{{examine.creatername}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">反馈情况：</span>
                    <span class="tlefttopli_Span">{{examine.feedbackinfo}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">处理意见：</span>
                    <span class="tlefttopli_Span">{{examine.disposeopinion}}</span>
                  </p>
                </li>
                <li class="tlefttoplitwo">
                  <p class="">
                    <span class="tlefttopHeaderSpantwo">现场照片：</span>
                    <img class="tlefttopli_img" :key="index" v-for="(item, index) in photograph" :src="item" alt="">
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="tabulationRight">
            <div class="tleftTop">
              <div class="tlefttopHeader">
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">处理时间：</span>
                  <span class="tlefttopli_Span">{{examine.repairtime}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">处理人员：</span>
                  <span class="tlefttopli_Span">{{examine.repairpersonname}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="tlefttopHeaderPDivtwo">
                    <span class="tlefttopHeaderSpan">处理状态：</span>
                  </p>
                  <div class="tlefttopHeaderPDiv">
                    <el-select size="mini" v-model="processingsdisplay" placeholder="请选择">
                      <el-option
                        v-for="item in processingstate"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderPDivtwo">
                    <span class="tlefttopHeaderSpan">确认状态：</span>
                  </p>
                  <div class="tlefttopHeaderPDiv">
                    <el-select size="mini" v-model="Confirmationsdisplay" placeholder="请选择">
                      <el-option
                        v-for="item in Confirmationstate"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">确认时间：</span>
                    <span class="tlefttopli_Span">{{examine.confirmpertime}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">确认人员：</span>
                    <span class="tlefttopli_Span">{{examine.confirmpersonname}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section class="classification">
        <header class="ficationHeader">
          <p class="ficationHeaderP">故障信息分类</p>
          <p class="ficationHeaderX"></p>
        </header>
        <div class="assortment">
          <ul class="assortmentUl">
            <li class="assortmentLi">
              <div class="assortmentLi_div">
                <p class="assortmentliP">
                  异常情况：
                </p>
                <div class="assortmentliDiv">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    placeholder="请输入内容"
                    v-model="circumstances">
                  </el-input>
                </div>
              </div>
              <div class="assortmentLi_div">
                <p class="assortmentliP">
                  处理意见：
                </p>
                <div class="assortmentliDiv">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    placeholder="请输入内容"
                    v-model="objection">
                  </el-input>
                </div>
              </div>
            </li>
            <li class="assortmentLitwo">
              <div class="assortmentLi_div">
                <p class="assortmentLi_divP">请选择处理异常情况的方式：</p>
                <el-radio-group v-model="choice">
                  <el-radio :key="index" v-for="(item, index) in choiceData" :label="item.value">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </li>
          </ul>
          <div class="personnel">
            <div class="assortmentLi_divtwo">
              <p class="assortmentliP">
                维保执行人员:
              </p>
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
                          <el-checkbox :label="item.userid" :disabled="proprietorCheckList.length > 0">{{item.username}}</el-checkbox>
                        </div>
                      </div>
                    </div>
                  </el-tree>
                </el-checkbox-group>
              </div>
            </div>
            <div class="assortmentLi_div">
              <p class="assortmentliP">业主执行人员</p>
              <div class="tree-wrapper">
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
                          <el-checkbox :label="item.userid" :disabled="proprietorCheckList.length > 0">{{item.username}}</el-checkbox>
                        </div>
                      </div>
                    </div>
                  </el-tree>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="fastener">
            <!--<div class="examine">重新安排</div>-->
            <div @click="conserve" class="conserve">保存</div>
            <div class="closedown" @click="closedown">关闭</div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { maintainReportassignedTask, maintainReportgetConfrimStates, maintainReportgetFeedbackstateStates, maintainDailygetProprietorOrgTree, maintainDailygetRepairOrgTreeByDeviceId, maintainDailygetRepairTypes } from '../../api/user'
export default {
  name: 'reportChild-examine',
  props: ['examine'],
  data () {
    return {
      options: [],
      thisPage: false,
      examineBoolean: false,
      value: '',
      maintenance: [],
      repairCheckList: [],
      proprietorCheckList: [],
      maintenanceList: [],
      proprietor: [],
      proprietorProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      ownerProps: {
        children: 'subOrgnizations',
        label: 'organizationName'
      },
      choice: '',
      choiceData: '',
      objection: '',
      circumstances: '',
      photograph: [],
      Confirmationstate: '',
      Confirmationsdisplay: '',
      processingsdisplay: '',
      processingstate: ''
    }
  },
  methods: {
    conserve () {
      let token = JSON.parse(window.sessionStorage.token)
      //  执行人员
      let usersNumber = this.maintenanceList.concat(this.repairCheckList)
      let users = []
      if (usersNumber.length !== 0) {
        usersNumber.forEach((val) => {
          let obj = {
            userid: val
          }
          users.push(obj)
        })
      } else {
        this.$message({
          message: '请选择执行人员!',
          type: 'warning'
        })
        return false
      }
      //  问题描述
      let desc = this.circumstances
      if (desc === '') {
        this.$message({
          message: '异常情况不能为空!',
          type: 'warning'
        })
        return false
      }
      //  处理意见
      let disposeopinion = this.objection
      if (disposeopinion === '') {
        this.$message({
          message: '处理意见不能为空!',
          type: 'warning'
        })
        return false
      }
      //  故障/问题 类型
      let faultTypeId = this.choice
      if (this.choice === '') {
        this.$message({
          message: '请选择故障/问题 类型!',
          type: 'warning'
        })
        return false
      }
      this.axios.post(maintainReportassignedTask(token, desc, disposeopinion, this.examine.feedbackid, faultTypeId), users).then((response) => {
        if (response.data.code === 0) {
          this.$emit('mine', this.examineBoolean)
        }
      })
    },
    closedown () {
      this.$emit('mine', this.examineBoolean)
    }
  },
  created () {
    this.axios.post(maintainReportgetConfrimStates()).then((response) => {
      this.Confirmationstate = response.data
      this.Confirmationsdisplay = this.examine.feedbackstate
    })
    this.axios.post(maintainReportgetFeedbackstateStates()).then((response) => {
      console.log(response)
      this.processingstate = response.data
      this.processingsdisplay = this.examine.comfirmstate
    })
    this.examine.photos.split(',').forEach((val) => {
      this.photograph.push(val)
    })
    this.circumstances = this.examine.feedbackinfo
    //  业主单位
    this.axios.post(maintainDailygetProprietorOrgTree()).then((response) => {
      if (response.data.code === 0) {
        this.proprietor = response.data.data
      }
    })
    //  维保单位 this.equipment
    let deviceid = this.examine.deviceid
    this.axios.post(maintainDailygetRepairOrgTreeByDeviceId(deviceid)).then((response) => {
      if (response.data.code === 0) {
        this.maintenance = response.data.data
      }
    })
    this.axios.post(maintainDailygetRepairTypes()).then((response) => {
      if (response.data.code === 0) {
        this.choiceData = response.data.data
        console.log(this.choiceData)
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
    .information
      overflow hidden
      position relative
      margin-left 70px
      .informationTop
        overflow hidden
        position relative
        padding-bottom 14px
        margin-bottom 14px
        border-bottom 1px solid #444d5b
      .informationTopUl
        init()
        .informationTopLitwo
          width 33%
          font-size $font-size-medium
          color $color-border-b-fault
          float left
        .informationTopLi
          width 33%
          font-size $font-size-medium
          color $color-border-b-fault
          float left
        .informationTopSpan
          color $color-text
          margin-left 10px
      .tabulation
        init()
        margin-top 20px
        .tabulationLeft
          overflow hidden
          float left
        .tabulationRight
          overflow hidden
          float right
        .tleftTop
          width 543px
          background #0b111a
          overflow hidden
          margin-bottom 14px
          border 1px solid #444d5b
        .tleftBottom
          width 543px
          background #0b111a
          overflow hidden
          margin-bottom 14px
          font-size $font-size-small
          border 1px solid #444d5b
          justify-content center
          align-items center
          display -webkit-flex
        .tlefttopHeader
          init()
          padding 10px 0
          border-bottom 1px solid #444d5b
          color $color-text
          font-size $font-size-medium
        .tlefttopHeaderP
          width 50%
          overflow hidden
          float left
          line-height 30px
        .tlefttopHeaderSpan
          margin 0 12px
          color $color-border-b-fault
        .tlefttopUl
          init()
        .tlefttopli
          overflow hidden
          position relative
          border-bottom 1px solid #444d5b
          padding 28px 0
        .tlefttopUl .tlefttopli:last-child
          border none
        .tlefttopLeft
          float left
          text-align center
          font-size $font-size-small
          width 80px
          vertical-align middle
        .tlefttopRight
          float right
          border-left 1px solid #444d5b
          width 462px
        .tlefttopRight .tlefttoprightLi:last-child
          border none
        .tlefttoprightLi
          init()
          border-bottom 1px solid #444d5b
          padding 10px 0
        .tlefttoprightliP
          float left
          width 50%
          color $color-text
        .tlefttoprightliSpan
          margin 0 10px
          color $color-border-b-fault
    .classification
      overflow hidden
      position relative
      margin-left 30px
      .ficationHeader
        init()
        font-size $font-size-small
        color $color-header-b-normal
        .ficationHeaderP
          float left
          background #111a28
          padding-right 40px
        .ficationHeaderX
          height 1px
          width 100%
          margin-top 5px
          background #444d5b
      .assortment
        overflow hidden
        position relative
        margin-left 40px
        .assortmentUl
          init()
          margin-bottom 10px
          .assortmentLi
            float left
            width 60%
            margin-top 20px
            color $color-border-b-fault
            font-size $font-size-medium
            overflow hidden
            .assortmentLi_div
              width 100%
              overflow hidden
              margin-bottom 10px
              position relative
            .assortmentliP
              float left
              line-height 30px
            .assortmentliDiv
              float left
              overflow hidden
              width 490px
      .fastener
        init()
        text-align center
        .examine
          examine()
          margin-right 30px
          display inline-block
        .conserve
          conserve()
          margin-right 30px
          display inline-block
        .closedown
          closedown()
          display inline-block
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
  .personChargeDiv
    overflow hidden
    max-height 300px
  .personnel
    init()
    margin-bottom 20px
    .assortmentliP
      float left
      color $color-border-b-fault
      line-height 30px
    .assortmentLi_div
      width 50%
      max-height 150px
      min-height 150px
      overflow-y scroll
  .assortmentLi_divtwo
    float left
    width 44%
    margin-right 6%
    margin-bottom 10px
    overflow hidden
  .tree-wrapper
    overflow hidden
  .assortmentLitwo
     width 40%
     float left
     margin-top 20px
     .assortmentLi_div
       init()
       .assortmentLi_divP
         color $color-border-b-fault
         margin-bottom 20px
  .tlefttopli_Span
     color #fff
  .tlefttopli_img
    display inline-block
    margin-right 20px
    width 40px
    height 40px
    margin-top 0px
  .tlefttopHeaderSpantwo
    margin 0 12px
    display inline-block
    color #999
  .tlefttoplitwo
    overflow hidden
    position relative
    border-bottom 1px solid #444d5b
    padding 6px 0 23px
  .tlefttopHeaderPDivtwo
    float left
    line-height 26px
  .tlefttopHeaderPDiv
    float left
</style>

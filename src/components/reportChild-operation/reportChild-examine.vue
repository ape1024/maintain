<template>
  <div class="subject">
    <section class="content">
      <h4 class="contentH">
        任务安排
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
                  <span class="tlefttopli_Span">{{fmtDate(examine.createtime)}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">反馈人员：</span>
                  <span class="tlefttopli_Span">{{examine.creatername}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="tlefttopHeaderPPP" :title="examine.feedbackinfo">
                    <span class="tlefttopHeaderSpan">反馈情况：</span>
                    <span class="tlefttopli_Span">{{examine.feedbackinfo}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderPPP" :title="examine.disposeopinion">
                    <span class="tlefttopHeaderSpan">处理意见：</span>
                    <span class="tlefttopli_Span">{{examine.disposeopinion}}</span>
                  </p>
                </li>
                <li class="tlefttoplitwo">
                  <p class="">
                    <span class="tlefttopHeaderSpantwo">现场照片：</span>
                    <img class="tlefttopli_img" @click="selectImg(index)" :key="index" v-for="(item, index) in photograph" :src="item" alt="">
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
                    <el-select disabled size="mini" v-model="Confirmationsdisplay" placeholder="请选择">
                      <el-option
                        v-for="item in Confirmationstate"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </li>
                <li class="tlefttoplitwo tlefttoplitwoSpan">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">确认时间：</span>
                    <span class="tlefttopli_Span">{{fmtDate(examine.confirmpertime)}}</span>
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
            <!--分割线开始-->
            <p class="boundary"></p>
            <!--分割线结束-->
            <div class="assortmentLi_divtwo">
              <div class="assortmentLiTop">
                <p class="assortmentliP">
                  维保执行人员
                </p>
              </div>
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
            <div class="assortmentLi_div" v-if="organizationtype === 1">
              <div class="assortmentLiTop">
                <p class="assortmentliP">业主执行人员</p>
              </div>
              <div style=" float: left">
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
            <!--<div class="examine">重新安排</div>-->
            <div @click="conserve" class="conserve">确定</div>
            <div class="closedown" @click="closedown">关闭</div>
          </div>
        </div>
      </section>
    </section>
    <dialog-img ref="dialogImg" :list="photograph"></dialog-img>
  </div>
</template>

<script>
import DialogImg from 'base/dialog-img/dialog-img'
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
import { managementgetUserOrganization, maintainReportassignedTask, maintainReportgetConfrimStates, maintainReportgetFeedbackstateStates, maintainDailygetProprietorOrgTree, maintainDailygetRepairTypes, maintainDailygetRepairOrgTreeByDeviceId } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin],
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
      processingstate: '',
      organizationtype: ''
    }
  },
  methods: {
    fmtDate (obj) {
      return formatDate(obj, 'yyyy/MM/dd HH:mm:ss')
    },
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
    },
    selectImg (index) {
      this.$refs.dialogImg.switchIndex(index)
      this.$refs.dialogImg.open()
    }
  },
  components: {
    DialogImg
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(managementgetUserOrganization(token)).then((response) => {
      if (response.data.code === 0) {
        this.organizationtype = response.data.data.organizationtype
      }
    })
    this.axios.post(maintainReportgetConfrimStates()).then((response) => {
      this.Confirmationstate = response.data
      this.Confirmationsdisplay = this.examine.comfirmstate
    })
    this.axios.post(maintainReportgetFeedbackstateStates()).then((response) => {
      this.processingstate = response.data
      this.processingsdisplay = this.examine.feedbackstate
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
    this.axios.post(maintainDailygetRepairOrgTreeByDeviceId(this.examine.deviceid, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.maintenance = response.data.data
      }
    })
    this.axios.post(maintainDailygetRepairTypes()).then((response) => {
      if (response.data.code === 0) {
        this.choiceData = response.data.data
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
    margin-top 40px
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
          padding 10px 0
          height 29px
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
    overflow auto
    max-height 285px
    min-height 285px
  .personnel
    init()
    margin-bottom 20px
    .assortmentliP
      float left
      line-height 30px
    .assortmentLi_div
      width 50%
      max-height 285px
      min-height 285px
      overflow auto
  .assortmentLi_divtwo
    float left
    width 44%
    max-height 285px
    min-height 285px
    margin-right 6%
    margin-bottom 10px
    overflow auto
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
    margin 0 12px 0 12px
    display inline-block
    color #999
  .tlefttoplitwo
    overflow hidden
    position relative
    border-bottom 1px solid #444d5b
    height 50px
    padding-top 10px
  .tlefttoplitwoSpan
    padding-top 15px
    height 45px
  .tlefttopHeaderPDivtwo
    float left
    line-height 26px
  .tlefttopHeaderPDiv
    float left
  .boundary
    height 1px
    width 100%
    margin-top 1px
    margin-bottom 5px
    background #444d5b
  .assortmentLiTop
    float left
    overflow hidden
    font-size 16px
    color #fff
    background #354d76
    line-height 40px
    width 120px
    padding-left 10px
    height 30px
  .tlefttopHeaderPPP
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>

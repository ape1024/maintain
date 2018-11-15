<template>
  <div class="subject">
    <section class="content">
      <h4 class="contentH">
        {{title}} 查看
      </h4>
      <div class="information">
        <div class="informationTop">
          <ul class="informationTopUl">
            <li class="informationTopLitwo">
              <span>设施类别：</span>
              <span :title="examine.devicename" class="informationTopSpan">{{examine.devicename}}</span>
            </li>
            <li class="informationTopLi">
              <span>设备编码：</span>
              <span :title="examine.devicecode" class="informationTopSpan">{{examine.devicecode}}</span>
            </li>
            <li class="informationTopLiTwo">
              <span>设置位置：</span>
              <span :title="examine.areaname + examine.position" class="informationTopSpan">{{examine.areaname}}{{examine.position}}</span>
            </li>
            <li class="informationTopLiTree">
              <span>设施数量：</span>
              <span :title="examine.devicecount + examine.unit" class="informationTopSpan">{{examine.devicecount}}{{examine.unit}}</span>
            </li>
          </ul>
        </div>
        <ul class="informationTopUl">

        </ul>
        <div class="tabulation">
          <div class="tabulationLeft">
            <div class="flagSpanDiv">
              <span :key="index" class="flagSpanTwo" :class="{ flagSpan:item.flag }" @click="switchingData(index)" v-for="(item, index) in inspectUp">{{index + 1}}</span>
              <span class="repairSpan">检查情况</span>
            </div>
            <div class="tleftTop">
              <div class="tlefttopHeader">
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">检查时间：</span>
                  <span>{{fmtDate(inspectUpData.checktime)}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">检查人员：</span>
                  <span>{{inspectUpData.checkpersonname}}{{inspectUp.others}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="">
                    <span class="tlefttopHeaderSpan">检查项目：</span>
                    <span class="tlefttoprightLiSpans">{{inspectUpData.workitem}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="">
                    <span class="tlefttopHeaderSpan">检查记录：</span>
                    <span class="tlefttoprightLiSpans">{{inspectUpData.workrecord}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderImg">
                    <span class="tlefttopHeaderSpan">现场照片：</span>
                    <span>
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphotoTwo(inspectUpData.photos), index)" :key="index" v-for="(data, index) in fieldphotoTwo(inspectUpData.photos)" :src="data" alt="">
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="tabulationRight">
            <div class="flagSpanDiv">
              <span class="repairSpan">检查情况</span>
            </div>
            <div class="tleftBottom tabulationRightfirst">
              <ul class="tlefttopRight">
                <li class="tlefttoprightLi">
                  <p class="tlefttoprightliP">
                    <span class="tlefttoprightliSpan">安排人员：</span>
                    <span>{{examine.creatername}}</span>
                  </p>
                  <p class="tlefttoprightliP">
                    <span class="tlefttoprightliSpan">安排时间：</span>
                    <span >{{fmtDate(examine.createtime)}}</span>
                  </p>
                </li>
                <li class="tlefttoprightLi">
                  <span class="tlefttoprightliSpan">处理意见：</span>
                  <span class="tlefttoprightLiSpans">{{examine.disposeopinion}}</span>
                </li>
              </ul>
            </div>
            <div class="tleftBottom">
              <ul class="tlefttopRight">
                <li class="tlefttoprightLi">
                  <span class="tlefttoprightliSpan">执行人员：</span>
                  <span class="tlefttoprightLiSPan">{{repairtasks}}</span>
                </li>
                <li class="tlefttoprightLi tlefttoprightLiLast">
                  <span class="tlefttoprightliSpan">异常情况：</span>
                  <span class="tlefttoprightLiSPan">{{examine.exception}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section class="classification">
        <div class="flagSpanDiv">
          <span class="repairSpanOne">处理情况</span>
          <span class="repairSpanTwo">审查情况</span>
        </div>
        <ul class="ficationUl">
          <li :key="index" v-for="(item ,index) in reworkData" class="ficationLi">
            <div @click.stop="ficationClick(item, reworkData)" class="ficationLiDiv">
              <p class="ficationLiDivP">
                    <span class="ficationLiDivSpan">
                 {{fmtDate(item.repairtime)}}
                </span>
                <span class="ficationLiDivSpantwo">
                  {{obtainState(item.repairstate)}}
                </span>
              </p>
              <p class="ficationLiDivPtwo">
                <i v-show="item.flag" class="el-icon-arrow-down"></i>
                <i v-show="!item.flag" class="el-icon-arrow-up"></i>
              </p>
              <p class="ficationLiDivPthree">
                <!--{{obtainState(item.repairstate)}}-->
                返工
              </p>
            </div>
            <div v-show="item.flag" class="ficationEnsconce">
              <ul class="ficationEnsconceUl">
                <li class="ficationEnsconceLi">
                  <p class="ficationEnsconceLiP">
                      <span class="ficationEnsconceLiSpan">
                        处理时间:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{fmtDate(item.repairtime)}}
                      </span>
                  </p>
                  <p class="ficationEnsconceLiP">
                      <span class="ficationEnsconceLiSpan">
                        处理人员:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{item.repairpersonname}}
                      </span>
                  </p>
                </li>
                <li class="ficationEnsconceLi">
                  <span class="ficationEnsconceLitwoSpan">
                    问题原因:
                  </span>
                  <span class="ficationEnsconceLitwoSpantwo">
                    {{item.reason}}
                  </span>
                </li>
                <li class="ficationEnsconceLi">
                  <span class="ficationEnsconceLitwoSpan">
                    处理情况:
                  </span>
                  <span class="ficationEnsconceLitwoSpantwo">
                    {{item.treatment}}
                  </span>
                </li>
                <li class="ficationEnsconceLitwo">
                  <span class="ficationEnsconceLitwoSpan">
                    现场照片:
                  </span>
                  <span class="ficationEnsconceLitwoSpanThree">
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphoto(item.afterphotos), imgIndex)" :key="imgIndex" v-for="(data , imgIndex) in fieldphoto(item.afterphotos)" :src="data" alt="">
                  </span>
                </li>
              </ul>
              <ul class="ficationEnsconceUlRight">
                <li class="ficationEnsconceLi">
                  <p class="ficationEnsconceLiP">
                    <span class="ficationEnsconceLiSpan">
                      审核时间：
                    </span>
                    <span class="ficationEnsconceLiSpantwo">
                      {{fmtDate(item.approvaltime)}}
                    </span>
                  </p>
                  <p class="ficationEnsconceLiP">
                    <span class="ficationEnsconceLiSpan">
                      审查人员：
                    </span>
                    <span class="ficationEnsconceLiSpantwo">
                      {{item.approvername}}
                    </span>
                  </p>
                </li>
                <li class="ficationEnsconceLi">
                  <span class="ficationEnsconceLitwoSpan">
                    审查结论:
                  </span>
                  <span class="tlefttoprightLiSPan">
                    {{ergodicStor(item.approvalstate)}}
                  </span>
                </li>
                <li class="ficationEnsconceLi">
                  <span class="ficationEnsconceLitwoSpan">
                    审查意见:
                  </span>
                  <span class="tlefttoprightLiSPan">
                    {{item.approvalopinion}}
                  </span>
                  <p v-show="AuditorsPersonnel && JurisdictionApproval" v-if="item.approvalid" class="header_p_twelve threelevel_litwo_ptwo" @click.stop="updateAuditorsmodify(item)">修改</p>
                </li>
              </ul>
            </div>
          </li>
          <li class="ficationLi">
            <div @click="approvalClick" class="ficationLiDiv">
              <p class="ficationLiDivP">
                    <span class="ficationLiDivSpan">
                 {{fmtDate(examine.repairtime)}}
                </span>
                <span class="ficationLiDivSpantwo">
                  {{obtainState(examine.repairstate)}}
                </span>
              </p>
              <p class="ficationLiDivPtwo">
                <i v-show="ficationBoolean" class="el-icon-arrow-down"></i>
                <i v-show="!ficationBoolean" class="el-icon-arrow-up"></i>
              </p>
            </div>
            <div v-show="ficationBoolean" class="ficationEnsconce">
              <ul class="ficationEnsconceUl">
                <li class="ficationEnsconceLi">
                  <p class="ficationEnsconceLiP">
                      <span class="ficationEnsconceLiSpan">
                        处理时间:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{fmtDate(examine.repairtime)}}
                      </span>
                  </p>
                  <p class="ficationEnsconceLiPtwo">
                      <span class="ficationEnsconceLiSpan">
                        处理人员:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{examine.repairpersonname}}
                      </span>
                  </p>
                </li>
                <li class="ficationEnsconceLitwo">
                  <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        问题原因:
                      </span>
                    <span class="ficationEnsconceLitwoSpantwo">
                        {{examine.reason}}
                      </span>
                  </div>
                </li>
                <li class="ficationEnsconceLitwo">
                  <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        处理情况:
                      </span>
                    <span class="ficationEnsconceLitwoSpantwo">
                        {{examine.treatment}}
                      </span>
                  </div>
                </li>
                <li class="ficationEnsconceLitwo">
                      <span class="ficationEnsconceLitwoSpan">
                        现场照片:
                      </span>
                  <span class="ficationEnsconceLitwoSpanThree">
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphoto(examine.afterphotos), index)" v-for="(data ,index) in fieldphoto(examine.afterphotos)" :key="index" :src="data" alt="">
                      </span>
                </li>
              </ul>
              <ul class="ficationEnsconceUlRight">
                <li class="ficationEnsconceLi">
                  <p class="ficationEnsconceLiP">
                    <span class="ficationEnsconceLiSpan">
                      审核时间：
                    </span>
                    <span class="ficationEnsconceLiSpantwo">
                      {{fmtDate(AuditorsTimer)}}
                    </span>
                  </p>
                  <p class="ficationEnsconceLiP">
                    <span class="ficationEnsconceLiSpan">
                      审核人员：
                    </span>
                    <span class="ficationEnsconceLiSpantwo">{{AuditorsPersonnel}}</span>
                  </p>
                </li>
                <li class="ficationEnsconceLi">
                  <span class="ficationEnsconceLitwoSpan">
                    审查结论:
                  </span>
                  <span class="tlefttoprightLiSPan">
                    {{tateReview}}
                  </span>
                </li>
                <li class="ficationEnsconceLi">
                    <span class="ficationEnsconceLitwoSpan">审核意见：</span>
                    <span class="tlefttoprightLiSPan">{{Auditorsstate}}</span>
                    <p v-show="AuditorsPersonnel && JurisdictionApproval" class="header_p_twelve threelevel_litwo_ptwo" @click.stop="updateAuditors(Auditorsstate)">修改</p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
      <section class="classification">
        <div class="assortment">
          <div class="fastener">
            <!--<div @click="conserve" class="conserve">确认</div>-->
            <div @click="conserve" class="closedown">关闭</div>
          </div>
        </div>
      </section>
    </section>
    <!--修改审核内容 开始-->
    <div class="classificationDDiv" v-if="classificationBoolean" >
      <h4 class="classificationDDivH4">审核结论 修改</h4>
      <div class="classificationDDivUl">
        <span class="sectionTopliSpanfour">审核结论:</span>
        <span class="sectionTopliSpanfive">
                   <el-input
                     type="textarea"
                     :rows="2"
                     resize="none"
                     placeholder="请输入内容"
                     v-model="auditConclusion">
                   </el-input>
                </span>
      </div>
      <div class="classificationDDivUlLiexamine"
           @click="confirmAuditors">
        确定
      </div>
      <div @click="closeDialog"
           class="closeDialog">
        关闭
      </div>
    </div>
    <!--修改审核内容 结束-->
    <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
  </div>
</template>

<script>
import DialogImg from 'base/dialog-img/dialog-img'
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
import { maintainRepairModifyApprovalOptionByTaskid, maintainRepairfindReworksByTaskid, maintainRepairgetApprovalInfos, getCheckTaskByRepairTaskId, maintainRepairgetgetRepariTaskQueryApprovalItem, maintainRepairModifyApprovalOptionByTaskidTwo } from '../../api/user'
export default {
  name: 'repair-lookover',
  props: ['examine', 'state', 'repairtasks', 'title'],
  data () {
    return {
      options: [],
      thisPage: false,
      value: '',
      reworkData: '',
      ficationBoolean: false,
      getApprovalInfos: '',
      AuditorsPersonnel: '',
      AuditorsTimer: '',
      Auditorsstate: '',
      Auditorsopinion: '',
      inspectUp: [],
      inspectUpData: {},
      imgList: [],
      // 弹出框
      classificationBoolean: false,
      // 审核结论
      auditConclusion: '',
      // 审核权限
      JurisdictionApproval: '',
      imgUrl: '',
      tateReview: '',
      ApprovalItem: [],
      auditConclusionItemId: '',
      variableValue: ''
    }
  },
  methods: {
    updateAuditorsmodify (item) {
      this.variableValue = 1
      this.auditConclusionItemId = item.approvalid
      this.auditConclusion = item.approvalopinion
      this.classificationBoolean = true
    },
    ergodicStor (nub) {
      let Name = ''
      this.ApprovalItem.forEach((val) => {
        if (val.value === nub) {
          Name = val.name
        }
      })
      return Name
    },
    switchingData (index) {
      this.inspectUp.forEach((val, idx) => {
        if (idx === index) {
          val.flag = true
        } else {
          val.flag = false
        }
      })
      this.inspectUpData = this.inspectUp[index]
    },
    // 格式化时间
    fmtDate (obj) {
      return formatDate(obj, 'yyyy/MM/dd HH:mm')
    },
    approvalClick () {
      this.ficationBoolean = !this.ficationBoolean
    },
    ficationClick (item, data) {
      item.flag = !item.flag
    },
    conserve () {
      this.$emit('look', this.thisPage)
    },
    closedown () {
      this.$emit('look', this.thisPage)
    },
    // 现场照片
    fieldphoto (src) {
      let arr = []
      if (!src) {
        return arr
      } else {
        if (src.indexOf(',') !== -1) {
          src.split(',').forEach((val) => {
            arr.push(val)
          })
        } else {
          arr.push(src)
        }
        return arr
      }
    },
    fieldphotoTwo (src) {
      let arr = []
      if (!src) {
        return arr
      } else {
        if (src.indexOf(',') !== -1) {
          src.split(',').forEach((val) => {
            arr.push(`${this.imgUrl}${val}`)
          })
        } else {
          arr.push(`${this.imgUrl}${src}`)
        }
        return arr
      }
    },
    selectImg (list, index) {
      this.imgList = list
      setTimeout(() => {
        this.$refs.dialogImg.switchIndex(index)
        this.$refs.dialogImg.open()
      }, 200)
    },
    // 获取任务状态
    obtainState (number) {
      let arr = ''
      this.state.forEach((val) => {
        if (val.value === number) {
          arr = val.name
        }
      })
      if (arr === '') {
        return number
      }
      return arr
    },
    // 关闭对话窗口
    closeDialog () {
      this.classificationBoolean = false
    },
    updateAuditors (Auditorsstate) {
      this.variableValue = 2
      this.auditConclusion = Auditorsstate
      this.classificationBoolean = true
    },
    confirmAuditors () {
      if (this.variableValue === 1) {
        if (this.auditConclusion) {
          let token = JSON.parse(window.sessionStorage.token)
          let approvalid = this.auditConclusionItemId
          let approvalopinion = this.auditConclusion
          this.axios.post(maintainRepairModifyApprovalOptionByTaskidTwo(token, approvalid, approvalopinion)).then((response) => {
            if (response.data.code === 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.axios.post(maintainRepairfindReworksByTaskid(this.examine.repairtaskid)).then((response) => {
                if (response.data.code === 0) {
                  if (response.data.data.length !== 0) {
                    response.data.data.forEach((val) => {
                      val.flag = false
                    })
                    response.data.data[0].flag = true
                    this.reworkData = response.data.data
                  } else {
                    this.ficationBoolean = true
                  }
                  this.classificationBoolean = false
                }
              })
            } else {
              this.$message({
                message: '修改失败',
                type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            message: '审查意见不能为空',
            type: 'warning'
          })
        }
      } else {
        if (this.auditConclusion) {
          this.axios.post(maintainRepairModifyApprovalOptionByTaskid(this.auditConclusion, this.examine.repairtaskid)).then((response) => {
            if (response.data.code === 0) {
              this.classificationBoolean = false
              this.Auditorsstate = this.auditConclusion
            }
          })
        } else {
          this.$message({
            message: '请填写审批内容!',
            type: 'warning'
          })
        }
      }
    }
  },
  components: {
    DialogImg
  },
  created () {
    // 权限
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_gzwx') {
        this.JurisdictionApproval = val.approval
      }
    })
    this.axios.post(maintainRepairgetgetRepariTaskQueryApprovalItem()).then((response) => {
      if (response.data.code === 0) {
        this.ApprovalItem = response.data.data
      }
    })
    this.axios.post(maintainRepairgetApprovalInfos(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        this.getApprovalInfos = response.data.data
        if (this.getApprovalInfos.length !== 0) {
          this.AuditorsPersonnel = this.getApprovalInfos[0].approvername
          this.AuditorsTimer = !this.getApprovalInfos[0].approvaltime ? '' : this.fmtDate(this.getApprovalInfos[0].approvaltime)
          this.Auditorsstate = this.getApprovalInfos[0].approvalopinion
          this.tateReview = this.ergodicStor(this.getApprovalInfos[0].approvalstate)
        }
      }
    })
    this.axios.post(getCheckTaskByRepairTaskId(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        if (!response.data.data.length) return
        response.data.data.forEach((val, index) => {
          if (index === 0) {
            val.flag = true
          } else {
            val.flag = false
          }
        })
        this.imgUrl = response.data.data[0].path
        this.inspectUpData = response.data.data[0]
        this.inspectUp = response.data.data
      }
    })
    this.axios.post(maintainRepairfindReworksByTaskid(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.length !== 0) {
          response.data.data.forEach((val) => {
            val.flag = false
          })
          response.data.data[0].flag = true
          this.reworkData = response.data.data
        } else {
          this.ficationBoolean = true
        }
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
    margin-top 90px
    background #111a28
    padding 30px 0
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
        border-bottom 1px solid $color-border-list
      .informationTopUl
        init()
        .informationTopLitwo
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          width 20%
          font-size $font-size-medium
          color $color-border-b-fault
          float left
        .informationTopLi
          width 26%
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          font-size $font-size-medium
          color $color-border-b-fault
          float left
        .informationTopSpan
          color $color-text
          margin-left 10px
        .informationTopLiTwo
          width 42%
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          font-size $font-size-medium
          color $color-border-b-fault
          float left
        .informationTopLiTree
          width 12%
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          font-size $font-size-medium
          color $color-border-b-fault
          float left
      .tabulation
        init()
        .tabulationLeft
          overflow hidden
          float left
        .tabulationRight
          overflow hidden
          float right
          margin-top 5px
        .tleftTop
          width 536px
          background #0b111a
          overflow hidden
          margin-bottom 14px
          border 1px solid $color-border-list
        .tleftBottom
          width 543px
          background #0b111a
          overflow hidden
          border 1px solid $color-border-list
          justify-content center
          align-items center
          display -webkit-flex
        .tlefttopHeader
          init()
          padding 10px 0
          border-bottom 1px solid $color-border-list
          color $color-text
          font-size $font-size-medium
          width 98%
          padding-left 2%
        .tlefttopHeaderP
          float left
          width 50%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .tlefttopHeaderSpan
          color $color-border-b-fault
        .tlefttopUl
          init()
        .tlefttopli
          overflow hidden
          position relative
          border-bottom 1px solid $color-border-list
          padding 16px 0
          width 98%
          padding-left 2%
        .tlefttopUl .tlefttopli:last-child
          border none
        .tlefttopLeft
          float left
          text-align center
          font-size $font-size-small
          width 80px
          vertical-align middle
        .tlefttopRight
          init()
        .tlefttopRight .tlefttoprightLi:last-child
          border none
        .tlefttoprightLi
          init()
          width 98%
          border-bottom 1px solid $color-border-list
          padding 10px 0
          padding-left 2%
        .tlefttoprightliP
          float left
          width 50%
          color $color-text
        .tlefttoprightliSpan
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
          margin-bottom 7px
        .ficationHeaderX
          height 1px
          width 100%
          margin-top 5px
          background $color-border-list
      .assortment
        overflow hidden
        position relative
        margin-top 20px
        .assortmentUl
          init()
          margin-bottom 30px
          .assortmentLi
            float left
            width 33%
            margin-top 20px
            color $color-border-b-fault
            font-size $font-size-medium
            overflow hidden
            .assortmentliP
              float left
              line-height 30px
            .assortmentliDiv
              float left
              overflow hidden
              width 217px
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
  .tlefttoprightLiSpans
    color #fff
  .ficationEnsconceLitwoSpanThreeImg
    display inline-block
    margin-right 20px
    width 40px
    height 40px
    cursor pointer
  .tlefttopHeaderImg
    min-height 40px
    overflow hidden
    position relative
  .ficationUl
    overflow hidden
    position relative
    height 260px
    overflow-y auto
    margin-left 40px
  .ficationLi
    width 100%
    margin-bottom 10px
    position relative
    overflow hidden
    .ficationLiDiv
      overflow hidden
      height 30px
      cursor pointer
      line-height 30px
      font-size 14px
      background #1c273a
      position relative
      width 100%
    .ficationLiDivP
      float left
  .ficationLiDivSpan
      width 150px
      display inline-block
      color #fff
      margin 0 60px 0 15px
  .ficationLiDivPtwo
    float right
    color #fff
    font-size 18px
    cursor pointer
    margin-right 20px
  .ficationEnsconce
    margin-top 10px
    //  border 1px solid $color-border-list
    position relative
    overflow hidden
  .ficationEnsconceUl
    float left
    width 536px
    background #0b111a
    position relative
    overflow hidden
  .ficationEnsconceLi
    border-bottom 1px solid $color-border-list
    height 40px
    line-height 40px
    width 100%
  .ficationEnsconceLiP
    float left
    overflow hidden
    width 47%
    padding-left 3%
  .ficationEnsconceLiSpan
    color #999
    margin-right 10px
  .ficationEnsconceLiSpantwo
    color #fff
  .ficationEnsconceLiPtwo
    float left
    overflow hidden
    width 33%
  .ficationEnsconceLitwo
    border-bottom 1px solid $color-border-list
    width 100%
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .ficationEnsconceLitwoDiv
    position relative
    overflow hidden
  .ficationEnsconceLitwoSpan
    margin 0 15px 0
    line-height 40px
    color #999
  .ficationEnsconceLitwoSpantwo
    color #fff
    padding 10px 0
    word-break break-all
    word-wrap break-word
  .ficationEnsconceLitwoSpanThree
    color #fff
    margin-top 12px
    word-break break-all
    word-wrap break-word
  .tlefttopli__Div
    float left
    width 49%
    position relative
    overflow hidden
    padding-left 1%
  .tlefttopli_Img
    width 40px
    height 40px
    display inline-block
    margin-top 22px
    margin-right 20px
  .tlefttopli__Span
    float left
    color #999
    padding-left 1%
    line-height 80px
  .ficationLiDivSpantwo
    color #fff
  .differingOpinion
    width 350px
    display inline-block
  .ficationEnsconceLitwoSpanThreeImg
    display inline-block
    margin-right 20px
    width 40px
    height 40px
  .ficationLiDivPthree
    float right
    margin-right 20px
    color #cf763a
  .classificationLeft
    overflow hidden
    position relative
  .classificationRight
    float right
    overflow hidden
    position relative
    width 49%
  .classificationDiv
    margin-left 40px
    overflow hidden
    position relative
  .verificationLithreeDivPP
    width 50%
    overflow hidden
    float left
  .verificationLithreeDivPPtwo
    width 50%
    float right
  .verificationLithreeDiv_Spantwo
    margin-right 12px
  .verificationdiv
    width 107px
    border-radius 5px
    height 36px
    text-align center
    line-height 36px
    background #3292a6
    -webkit-transition 0.2s
    transition 0.2s
    cursor pointer
    color #fff
    margin-right 30px
    display inline-block
  .verificationdiv:hover
    background #44a7bb
  .classificationDDiv
    position fixed
    top 200px
    left 50%
    margin-left -450px
    background #111a28
    text-align center
    padding 20px 40px 40px
    border 1px solid #444d5b
    width 820px
  .classificationDDivH4
    font-size 20px
    margin-bottom 40px
    text-align left
    color #eee
  .classificationDDivUl
    margin-bottom 20px
    init()
  .classificationDDivUlLi
    width 50%
    overflow hidden
    position relative
    margin-bottom 20px
    float left
  .classificationDDivUlLiSpan
    line-height 48px
    margin-right 10px
    color #999
  .classificationDDivUlLiexamine
    color #fff
    examine()
    margin-right 30px
  .closeDialog
    color #fff
    closedown()
  .ficationClass
    width 210px
    display inline-block
  .tlefttopli_SpanThree
    width 460px
    overflow hidden
    color #fff
    display inline-block
    margin 12px 0
  .tlefttoprightLiSPan
    color #fff
    line-height 22px
  .header_p_twelve
    cursor pointer
    float right
    margin-right 20px
    color #3279a6
  .threelevel_litwo_ptwo
    color #3acf76
    cursor pointer
  // 弹出框样式
  .classificationDDiv
    position fixed
    top 200px
    left 50%
    margin-left -450px
    background #111a28
    text-align center
    padding 20px 40px 40px
    border 1px solid #444d5b
    width 820px
  .closeDialog
    color #fff
    closedown()
  .sectionTopliSpanfour
    float left
    color #d5d5d5
    font-size 16px
    margin-top 20px
    margin-right 16px
  .sectionTopliSpanfive
    width 650px
    float left
  .flagSpan
    background #354d76!important
  .flagSpanTwo
    width 25px
    height 25px
    cursor pointer
    text-align center
    line-height 25px
    margin-left 10px
    border-radius 2px
    background #202f49
    color #eee
    display inline-block
  .flagSpanDiv
    margin-bottom 10px
    text-align right
    overflow hidden
  .ficationEnsconceUl li:last-child
    border none
  .ficationEnsconceUlRight
    float right
    width 543px
    background #0b111a
    overflow hidden
    justify-content center
    align-items center
    display inline-block
  .ficationEnsconceUlRight li:last-child
    border none
  .tlefttoprightLiLast
    height 70px
  .tabulationRightfirst
    border-bottom none!important
  .repairSpan
    color #7fdbf9
    font-size 18px
    float left
  .repairSpanOne
    width 536px
    margin-left 40px
    color #7fdbf9
    font-size 18px
    float left
    text-align left
  .repairSpanTwo
    width 536px
    color #7fdbf9
    text-align left
    font-size 18px
    float right
</style>

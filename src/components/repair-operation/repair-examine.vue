<template>
    <div class="subject">
      <section class="content">
        <h4 class="contentH">
          故障维修审核
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
                <span>设施数量：</span>
                <span class="informationTopSpan">
                  {{examine.devicecount}}
                </span>
              </li>
            </ul>
          </div>
          <ul class="informationTopUl">
            <li class="informationTopLitwo">
              <span>设施位置：</span>
              <span class="informationTopSpan">
                  {{examine.areaname}}
                  {{examine.position}}
              </span>
            </li>
          </ul>
          <div class="tabulation">
            <div class="tabulationLeft">
              <div class="tleftTop">
                <div class="tlefttopHeader">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">安排人员：</span>
                    <span>
                       {{examine.creatername}}
                    </span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">安排时间：</span>
                    <span>{{fmtDate(examine.createtime)}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">审核人员：</span>
                    <span>{{AuditorsPersonnel}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">审核时间：</span>
                    <span>{{(AuditorsTimer)}}</span>
                  </p>
                </div>
                <ul class="tlefttopUl">
                  <li class="tlefttopli">
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">处理意见：</span>
                      <span class="tlefttopli_Spantwo">{{examine.creater}}</span>
                    </div>
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">审核结论：</span>
                      <span>{{Auditorsstate}}</span>
                    </div>
                  </li>
                  <li class="tlefttopli">
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">异常情况：</span>
                      <span class="tlefttopli_Spantwo">{{examine.exception}}</span>
                    </div>
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">审核意见：</span>
                      <!--<span class="tlefttopli_Spantwo">-->
                        <!--{{examina.approvalopinion}}-->
                      <!--</span>-->
                      <span>{{Auditorsopinion}}</span>
                    </div>
                  </li>
                  <li class="tlefttopli">
                    <span class="tlefttopli__Span">现场照片：</span>
                    <img class="tlefttopli_Img" :key="index" v-for="(item, index) in srcData" :src="item" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section class="classification">
          <div class="classificationDiv">
            <div class="classificationLeft">
              <header class="ficationHeader">
                <p class="ficationHeaderP">故障维修审核</p>
                <p class="ficationHeaderX"></p>
              </header>
              <ul class="verificationUl">
                <li class="verificationLifour">
                  <div class="verificationLithreeDiv">
                    <span>审核结论：</span>
                    <el-radio-group v-model="approvalradio">
                      <el-radio :key="index" v-for="(item, index) in approvaloptions" :label="item.value">{{item.name}}</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="verificationLithreeDivtwo">
                    <span>审核意见：</span>
                    <span class="differingOpinion"><el-input v-model="approvalOpinionInput" placeholder="请输入内容"></el-input></span>
                  </div>
                  <div class="verificationLithreeDiv">
                    <span class="verificationLithreeDiv_Spantwo">返工时间:</span>
                    <span class="verificationLithreeDiv_Span">
                      <el-date-picker
                        v-model="waatitime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="classificationRight">
              <header class="ficationHeader">
                <p class="ficationHeaderP">故障维修验证</p>
                <p class="ficationHeaderX"></p>
              </header>
              <ul class="verificationUl">
                <li class="verificationLithree">
                  <div class="verificationLithreeDiv">
                    <p class="verificationLithreeDivPP">
                      <span>验证人员：</span>
                      <span class="verificationLithreeDivSpan">{{examine.checktime}}</span>
                    </p>
                    <p class="verificationLithreeDivPPtwo">
                      <span>验证时间：</span>
                      <span class="verificationLithreeDivSpan">
                      {{examine.checkpersonname}}
                    </span>
                    </p>
                  </div>
                  <div class="verificationLitwoDiv">
                    <p class="verificationLiP">
                      <el-radio v-model="radio" label="1">经确认，故障问题已处理</el-radio>
                    </p>
                    <p class="verificationLiP">
                      <el-radio v-model="radio" label="2">
                        其他意见
                        <div class="inputDiv">
                          <el-input v-model="Otheropinions" placeholder="请输入内容"></el-input>
                        </div>
                      </el-radio>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--<div class="verification">-->
          <!--</div>-->
        </section>
        <section class="classification">
          <header class="ficationHeader">
            <p class="ficationHeaderP">维修记录</p>
          </header>
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
                  <i v-show="item.flag" class="el-icon-arrow-down
"></i>
                  <i v-show="!item.flag" class="el-icon-arrow-up"></i>
                </p>
                <p class="ficationLiDivPthree">
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
                    <p class="ficationEnsconceLiPtwo">
                      <span class="ficationEnsconceLiSpan">
                        处理人员:
                      </span>
                      <span class="ficationEnsconceLiSpantwo">
                        {{item.repairpersonname}}
                      </span>
                    </p>
                    <p class="ficationEnsconceLiPtwo">
  <span class="ficationEnsconceLiSpan">
                        处理结果:
                      </span>
                      <span class="ficationEnsconceLiSpantwo">
                        {{obtainState(item.repairstate)}}
                      </span>
                    </p>
                  </li>
                  <li class="ficationEnsconceLitwo">
                    <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        问题原因:
                      </span>
                      <span class="ficationEnsconceLitwoSpantwo">
                        {{item.reason}}
                      </span>
                    </div>
                    <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        处理情况:
                      </span>
                      <span class="ficationEnsconceLitwoSpantwo">
                        {{item.treatment}}
                      </span>
                    </div>
                  </li>
                  <li class="ficationEnsconceLitwo">
                      <span class="ficationEnsconceLitwoSpan">
                        现场照片:
                      </span>
                    <span class="ficationEnsconceLitwoSpanThree">
                      <img class="ficationEnsconceLitwoSpanThreeImg" :key="index" v-for="(data ,index) in fieldphoto(item.afterphotos)" :src="data" alt="">
                    </span>
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
                  <i v-show="ficationBoolean" class="el-icon-arrow-down
"></i>
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
                    <p class="ficationEnsconceLiPtwo">
  <span class="ficationEnsconceLiSpan">
                        处理结果:
                      </span>
                      <span class="ficationEnsconceLiSpantwo">
                        {{obtainState(examine.repairstate)}}
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
                      <img class="ficationEnsconceLitwoSpanThreeImg" v-for="(data ,index) in fieldphoto(examine.afterphotos)" :key="index" :src="data" alt="">
                      </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="assortment">
            <div class="fastener">
              <div class="examine" @click="rescheduling">重新安排</div>
              <div @click="conserve" class="conserve">审核</div>
              <div class="verificationdiv" @click="verificationdiv">验证</div>
              <div @click="closedown" class="closedown">关闭</div>
            </div>
          </div>
        </section>
        <transition enter-active-class="fadeInUp"
                    leave-active-class="fadeOutDown">
        <div v-if="classificationBoolean" class="classificationDDiv">
          <h4 class="classificationDDivH4">故障信息分类</h4>
          <ul class="classificationDDivUl">
            <li class="classificationDDivUlLi">
              <span class="classificationDDivUlLiSpan">故障现象：</span>
              <el-select v-model="faultphenomenonData" placeholder="请选择">
                <el-option
                  v-for="item in faultphenomenon"
                  :key="item.faulttypeid"
                  :label="item.faulttypename"
                  :value="item.faulttypeid">
                </el-option>
              </el-select>
            </li>
            <li class="classificationDDivUlLi">
              <span class="classificationDDivUlLiSpan">故障范围：</span>
              <el-select v-model="faultrangeData" placeholder="请选择">
                <el-option
                  v-for="item in faultrange"
                  :key="item.faulttypeid"
                  :label="item.faulttypename"
                  :value="item.faulttypeid">
                </el-option>
              </el-select>
            </li>
            <li class="classificationDDivUlLi">
              <span class="classificationDDivUlLiSpan">故障类型：</span>
              <el-select v-model="faulttypeData" placeholder="请选择">
                <el-option
                  v-for="item in faulttype"
                  :key="item.faulttypeid"
                  :label="item.faulttypename"
                  :value="item.faulttypeid">
                </el-option>
              </el-select>
            </li>
            <li class="classificationDDivUlLi">
              <span class="classificationDDivUlLiSpan">故障原因：</span>
              <el-select v-model="faultreasonData" placeholder="请选择">
                <el-option
                  v-for="item in faultreason"
                  :key="item.faulttypeid"
                  :label="item.faulttypename"
                  :value="item.faulttypeid">
                </el-option>
              </el-select>
            </li>
            <li class="classificationDDivUlLi">
              <span class="classificationDDivUlLiSpan">处理办法：</span>
              <el-select v-model="faulttreatmentData" placeholder="请选择">
                <el-option
                  v-for="item in faulttreatment"
                  :key="item.faulttypeid"
                  :label="item.faulttypename"
                  :value="item.faulttypeid">
                </el-option>
              </el-select>
            </li>
          </ul>
          <div class="classificationDDivUlLiexamine" @click="classificationDDivUlLiexamine">
            审核
          </div>
        </div>
        </transition>
      </section>
    </div>
</template>

<script>
import { maintainRepairapprovalTask, maintainRepaircheckTask, maintainRepairgetFaultSelectItems, maintainRepairgetRepariTaskApprovalItem, maintainRepairfindReworksByTaskid } from '../../api/user'
export default {
  name: 'repair-examine',
  props: ['examine', 'rework', 'examina', 'state', 'approval'],
  data () {
    return {
      options: [],
      thisPage: false,
      value: '',
      radio: '',
      input: '',
      ficationBoolean: false,
      srcData: [],
      approvaloptions: '',
      approvalradio: '',
      taskState: [],
      reworkData: '',
      waatitime: '',
      approvalOpinionInput: '',
      Otheropinions: '',
      classificationBoolean: false,
      //  处理办法
      faulttreatment: '',
      faulttreatmentData: '',
      //  故障原因
      faultreason: '',
      faultreasonData: '',
      //  故障范围
      faultrange: '',
      faultrangeData: '',
      //  故障类型
      faulttype: '',
      faulttypeData: '',
      // 故障现象
      faultphenomenon: '',
      faultphenomenonData: '',
      AuditorsPersonnel: '',
      AuditorsTimer: '',
      Auditorsstate: '',
      Auditorsopinion: ''
    }
  },
  methods: {
    classificationDDivUlLiexamine () {
      let token = JSON.parse(window.sessionStorage.token)
      let repairtaskid = this.examine.repairtaskid
      let approvalOpinion = this.approvalOpinionInput
      let approvalState = this.approvalradio
      let assignmenttime = this.waatitime
      console.log('++++=')
      console.log(approvalOpinion)
      console.log(approvalState)
      console.log(assignmenttime)

      this.axios.post(maintainRepairapprovalTask(token, repairtaskid, approvalOpinion, approvalState, assignmenttime, this.faulttypeData, this.faultreasonData, this.faultrangeData, this.faultphenomenonData, this.faulttreatmentData)).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.$message({
            message: '审批成功',
            type: 'success'
          })
          this.$emit('mine', this.thisPage)
        }
      })
    },
    rescheduling () {
      this.$emit('newly', this.examine)
    },
    verificationdiv () {
      let token = JSON.parse(window.sessionStorage.token)
      let repairtaskid = this.examine.repairtaskid
      let confirmopinion = ``
      console.log()
      if (parseInt(this.radio) === 1) {
        confirmopinion += '经确认，故障问题已处理'
      } else {
        confirmopinion = this.Otheropinions
      }
      if (confirmopinion !== '') {
        this.axios.post(maintainRepaircheckTask(token, repairtaskid, confirmopinion)).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.$message({
              message: '验证成功',
              type: 'success'
            })
            this.$emit('mine', this.thisPage)
          }
        })
      } else {
        this.$message({
          message: '验证意见不能为空!',
          type: 'warning'
        })
      }
    },
    conserve () {
      // let token = JSON.parse(window.sessionStorage.token)
      // let repairtaskid = this.examine.repairtaskid
      let approvalOpinion = this.approvalOpinionInput
      let approvalState = this.approvalradio
      let assignmenttime = this.waatitime
      if (approvalOpinion !== '') {
        if (approvalState !== '') {
          if (approvalState === 30) {
            if (assignmenttime !== '' && assignmenttime !== null) {
              this.axios.post(maintainRepairgetFaultSelectItems()).then((response) => {
                if (response.data.code === 0) {
                  this.faulttreatment = response.data.data.faulttreatment
                  this.faultreason = response.data.data.faultreason
                  this.faultrange = response.data.data.faultrange
                  this.faulttype = response.data.data.faulttype
                  this.faultphenomenon = response.data.data.faultphenomenon
                  this.classificationBoolean = true
                }
              })
            } else {
              this.$message({
                message: '返工时间不能为空!',
                type: 'warning'
              })
              return false
            }
          } else {
            this.axios.post(maintainRepairgetFaultSelectItems()).then((response) => {
              if (response.data.code === 0) {
                this.classificationBoolean = true
                this.faulttreatment = response.data.data.faulttreatment
                this.faultreason = response.data.data.faultreason
                this.faultrange = response.data.data.faultrange
                this.faulttype = response.data.data.faulttype
                this.faultphenomenon = response.data.data.faultphenomenon
              }
            })
          }
        } else {
          this.$message({
            message: '审核结论不能为空!',
            type: 'warning'
          })
          return false
        }
      } else {
        this.$message({
          message: '审核意见不能为空!',
          type: 'warning'
        })
        return false
      }
    },
    closedown () {
      this.$emit('mine', this.thisPage)
    },
    approvalClick () {
      this.ficationBoolean = !this.ficationBoolean
    },
    //  现场照片
    fieldphoto (src) {
      let arr = []
      if (src === '' || src === null) {
        return arr
      } else {
        src.split(',').forEach((val) => {
          arr.push(val)
        })
        return arr
      }
    },
    ficationClick (item, data) {
      item.flag = !item.flag
    },
    //  获取任务状态
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
    //  获取审批状态
    approvalStatus (status) {
      let arr = ''
      this.approval.forEach((val) => {
        if (val.value === status) {
          arr = val.name
        }
      })
      if (arr === '') {
        return status
      }
      return arr
    },
    // 时间戳改格式
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
  },
  created () {
    if (this.examina !== undefined) {
      this.AuditorsPersonnel = this.examina.approvername
      this.AuditorsTimer = fmtDate(this.examina.approvaltime)
      console.log(this.examina.approvaltime)
      this.Auditorsstate = this.examina.approvalstate
      this.Auditorsopinion = this.examina.approvalopinion
    }
    function fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
    // beforephotos  上面的现场照片
    if (this.examine.beforephotos === null) {
      this.srcData = []
    } else {
      let src = this.examine.beforephotos.split(',')
      this.srcData = src
    }
    //  任务审批选项
    this.axios.post(maintainRepairgetRepariTaskApprovalItem()).then((response) => {
      if (response.data.code === 0) {
        this.approvaloptions = response.data.data
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
    margin-top 10px
    background #111a28
    padding 10px 0
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
             width 33%
             margin-left 1%
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
           .tabulationRight
             overflow hidden
             float right
           .tleftTop
              background #0b111a
              overflow hidden
              margin-bottom 10px
              border 1px solid $color-border-list
           .tleftBottomTwo
             float right
             width 543px
             background #0b111a
             overflow hidden
             margin-bottom 14px
             font-size $font-size-small
             border 1px solid $color-border-list
             justify-content center
             align-items center
             display -webkit-flex
           .tleftBottom
             float left
             width 543px
             background #0b111a
             overflow hidden
             margin-bottom 14px
             font-size $font-size-small
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
           .tlefttopHeaderP
             width 25%
             float left
           .tlefttopHeaderSpan
             margin 0 12px
             color $color-border-b-fault
           .tlefttopUl
              init()
           .tlefttopli
             overflow hidden
             position relative
             border-bottom 1px solid $color-border-list
             height 80px
             .tlefttopli_Span
               float left
               color #999
               line-height 40px
             .tlefttopli_Spantwo
               color #fff
               float left
               width 480px
               padding-top 12px
           .tlefttopUl .tlefttopli:last-child
             border none
           .tlefttopLeft
              float left
              text-align center
              font-size $font-size-small
              width 80px
              color #999
              vertical-align middle
           .tlefttopRight
              float right
              border-left 1px solid $color-border-list
              width 462px
           .tlefttopRight .tlefttoprightLi:last-child
                border none
           .tlefttoprightLi
               init()
               border-bottom 1px solid $color-border-list
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
         margin 10px 0
         font-size $font-size-small
         color $color-header-b-normal
         .ficationHeaderP
           float left
           background #111a28
           padding-right 40px
           color #999
         .ficationHeaderX
           height 1px
           width 100%
           margin-top 5px
           background $color-border-list
       .assortment
         overflow hidden
         position relative
         margin-left 40px
         margin-top 10px
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
           color #fff
           margin-right 30px
           display inline-block
         .conserve
           conserve()
           margin-right 30px
           display inline-block
         .closedown
           closedown()
           display inline-block
  .arrange
    overflow hidden
    position relative
    width 100%
  .verification
    background #0b111a
    overflow hidden
    margin-bottom 14px
    margin-left 40px
    border 1px solid $color-border-list
    .verificationUl
     init()
     height 97px
     .verificationLi
       float left
       line-height 97px
       text-align center
       color #999
       border-right 1px solid $color-border-list
       width 80px
     .verificationLitwo
       width 340px
       height 97px
       overflow hidden
       border-right 1px solid $color-border-list
       float left
     .verificationLifour
        overflow hidden
        float left
  .verificationLiP
     margin 16px 0 0 20px
     overflow hidden
  .inputDiv
    display inline-block
    margin-left 6px
    width 200px
  .verificationLithree
    width 100%
    float left
    overflow hidden
    position relative
  .verificationLithreeDiv
    height 48px
    line-height 48px
    color #999
  .verificationLithreeDivSpan
     color #fff
  .verificationLithreeDivtwo
    width 100%
    height 48px
    line-height 48px
    color #999
  .ficationUl
    overflow hidden
    position relative
    height: 250px
    overflow-y: scroll
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
    border 1px solid $color-border-list
    position relative
    overflow hidden
  .ficationEnsconceUl
    width 100%
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
    width 33%
    padding-left 1%
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
    height 80px
    width 100%
  .ficationEnsconceLitwoDiv
    float left
    position relative
    overflow hidden
    width 50%
  .ficationEnsconceLitwoSpan
    float left
    margin 0 15px 0
    line-height 40px
    color #999
  .ficationEnsconceLitwoSpantwo
    float left
    color #fff
    width 460px
    padding 10px 0
    word-break break-all
    word-wrap break-word
  .ficationEnsconceLitwoSpanThree
    float left
    color #fff
    width 1030px
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
    float left
    overflow hidden
    position relative
    margin-right 2%
    width 49%
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
</style>

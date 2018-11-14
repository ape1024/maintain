<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        工作记录
      </h4>
      <section class="examine">
        <header class="examine_header">
          <div class="header_left">
            <p class="examine_p">计划名称：</p>
            <div class="header_div">{{examineName}}</div>
          </div>
        </header>
        <div class="examine_div">
          <ul class="examine_div_ul">
            <li class="examine_div_li">
              <p>设施名称：</p>
              <div :title="equipmentData.devicename">{{equipmentData.devicename}}</div>
            </li>
            <li class="examine_div_li">
              <p>设备编码：</p>
              <div :title="equipmentData.devicecode">{{equipmentData.devicecode}}</div>
            </li>
            <li class="examine_div_li">
              <p>设备位置：</p>
              <div :title="equipmentData.position">{{equipmentData.position}}</div>
            </li>
            <li class="examine_div_li examine_div_liTwo">
              <p>设施数量：</p>
              <div>{{equipmentData.devicecount}}{{equipmentData.unit}}</div>
            </li>
          </ul>
        </div>
        <div class="proceeding">
          <div class="matters">
            <div class="mattersHeaderdiv">
              <header class="matters_header">
                <ul class="matters_ul">
                  <li class="matters_lithree">
                    <el-checkbox @change="checkedChang" v-model="checked"></el-checkbox>
                    工作事项
                  </li>
                  <li class="matters_li">
                    巡检人员
                  </li>
                  <li class="matters_liThree">
                    巡检时间
                  </li>
                  <li class="matters_litwo">
                    工作记录
                  </li>
                  <li class="matters_li">
                    工作结论
                  </li>
                  <li class="matters_li">
                    审核状态
                  </li>
                  <li class="matters_li">
                    安排状态
                  </li>
                  <li class="matters_litwo">
                    现场照片
                  </li>
                </ul>
              </header>
            </div>
            <div class="content">
              <ul :title="item.titleData" class="content_ul" v-for="(item, index) in equipment" :key="index" @click.stop="determine($event, item.checktaskdetailid)" :class="[!item.refid ? '' : 'content_repeat']">
                <li class="matters_lithree" :title="item.workitem">
                  <span @click.stop><el-checkbox v-bind:disabled="item.disabled" v-model="item.fuleco"></el-checkbox></span>
                  {{item.workitem}}
                </li>
                <li class="matters_li">
                  {{item.checkperson}}
                  {{item.others}}
                </li>
                <li class="matters_liThree">
                  {{!item.checktime ? '' : fmtDate(item.checktime)}}
                </li>
                <li class="matters_litwo" :title="item.workrecord">
                  {{item.workrecord}}
                </li>
                <li class="matters_li" :class="[item.conclusion === 1 ? 'martters_normal' : 'matters_problem']">
                  {{item.conclusionname}}
                </li>
                <li class="matters_li">
                  <!--之前的处理状态,-->
                  <!--{{item.approvalstate}}-->
                  {{item.approvalstatename}}
                </li>
                <li class="matters_li">
                  {{item.isassignedName}}
                </li>
                <li class="matters_litwo">
                  <!--{{item.photosArr}}-->
                  <img class="photosImg" @click="selectImg(fieldphoto(item.photosArr, item.path), index)" :key="index" v-for="(data, index) in item.photosArr" :src="`${item.path}${data}`" alt="">
                </li>
                <li class="matters_lifour">
                  <span @click.stop="amputatematters(item.checktaskdetailid)" v-if="JurisdictionData.delete && (item.approvalstate !== 20 && item.approvalstate !== 100)" class="">删除</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="opinion">
            <div class="opinion_left">
              <div class="left_header">
                <p class="left_hederP">技术要求判定</p>
              </div>
              <div class="opinion_title">
                <div class="opinion_ulDiv">
                  <ul class="opinion_ul">
                    <li class="opinion_li">
                      技术要求
                    </li>
                    <li class="opinion_litwo">
                      缺陷类型
                    </li>
                    <li class="opinion_litwo">
                      工作结论
                    </li>
                  </ul>
                </div>
                <ul class="title_ul">
                  <li class="title_li" v-for="(item ,index) in determinant" :key="index">
                    <ul class="title_li_ul">
                      <li class="opinion_li">
                        {{item.requirement}}
                      </li>
                      <li class="opinion_litwo">
                        {{item.faulttype}}
                      </li>
                      <li class="opinion_litwo">
                        {{item.conclusionname}}
                      </li>
                    </ul>
                  </li>
                </ul>
                <div class="">
                  <div class="left_header">
                    <p class="left_hederP">检测项</p>
                  </div>
                  <div class="opinion_title">
                    <div class="opinion_ulDiv">
                      <ul class="opinion__ul">
                        <li class="opinion_li">
                          检测名称
                        </li>
                        <li class="opinion_litwo">
                          检测范围
                        </li>
                        <li class="opinion_litwo">
                          检测值
                        </li>
                      </ul>
                    </div>
                    <ul class="title_ul">
                      <li class="title_li" v-for="(item ,index) in Testing" :key="index">
                        <ul class="title_li_ul">
                          <li class="opinion_li">
                            {{item.paramname}}
                          </li>
                          <li class="opinion_litwo">
                            {{item.minvalue ? item.minvalue : ''}} -
                            {{item.maxvalue ? item.maxvalue : ''}}
                          </li>
                          <li class="opinion_litwo">
                            {{item.checkvalue}}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="opinion_right">
              <div class="left_header">
                <p class="left_hederP">工作记录审查</p>
              </div>
              <div class="opinion_title">
                <div class="opinion_ulDiv">
                  <ul class="opinion_ul">
                    <li class="opinion_li_two"  :title="historicalExamination.approvaltime ? fmtDate(historicalExamination.approvaltime) : ''">
                      审批时间: <span class="opinion_li_twoSpan">{{historicalExamination.approvaltime ? fmtDate(historicalExamination.approvaltime) : ''}}</span>
                    </li>
                    <li :title="historicalExamination.approvername" class="opinion_li_two">
                      审批人员: <span class="opinion_li_twoSpan">{{historicalExamination.approvername}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div class="choices">
                  <p class="choicesP">
                    审核结论：
                  </p>
                  <div class="choicesDiv">
                    <el-radio-group v-model="radio">
                      <el-radio :key="index" v-for="(item, index) in approvaloptions" :label="item.value">{{item.name}}</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="differing">
                  <p class="choicesP">
                    审核意见：
                  </p>
                  <div class="differingDiv">
                    <el-input
                      type="textarea"
                      :rows="3"
                      resize="none"
                      placeholder="请明确审核意见"
                      v-model="textarea">
                    </el-input>
                  </div>
                </div>
                <div class="arrange">
                  <div v-if="JurisdictionData.assign" @click="assignment" class="assignment">
                    安排任务
                  </div>
                  <div v-if="JurisdictionData.approval" @click="preservation" class="preservation">
                    审 核
                  </div>
                  <div @click="closeup" class="closeup">
                    关 闭
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="opinion">

          </div>
        </div>

      </section>
      <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
    </section>
  </div>
</template>

<script>
import { maintainDailyapprovalTaskDetail, maintainDailygetDetailsByDeviceId, maintainDailygetEquirementjudgments2, maintainDailygetTaskApprovalItems, deleteTaskDetail, getTaskParams, findAllApproval } from '../../api/user'
import DialogImg from 'base/dialog-img/dialog-img'
import $ from 'jquery'
export default {
  name: 'dailyChild-examine',
  props: ['examineName', 'equipmentCode', 'taskidCode', 'JurisdictionData'],
  data () {
    return {
      checked: false,
      radio: 100,
      textarea: '',
      examine_Boolean: false,
      determinant: '',
      approvaloptions: '',
      equipment: '',
      equipmentData: '',
      Testing: '',
      imgList: [],
      historicalExamination: '',
      examineStore: false
    }
  },
  methods: {
    approvalFuntion (value) {
      let name = ''
      this.approvaloptions.forEach((val) => {
        if (val.value === value) {
          name = val.name
        }
      })
      return name
    },
    fieldphoto (src, path) {
      let arr = []
      if (!src) {
        return arr
      } else {
        src.forEach((val) => {
          arr.push(`${path}${val}`)
        })
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
    amputatematters (checktaskdetailid) {
      this.$confirm('是否删除此设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(deleteTaskDetail(checktaskdetailid)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.DetailsByDeviceId()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    checkedChang () {
      if (this.checked === true) {
        this.equipment.forEach((val) => {
          val.fuleco = true
        })
      } else {
        this.equipment.forEach((val) => {
          val.fuleco = false
        })
      }
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let Y = date.getFullYear() + '/'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      return Y + M + D + h + m + s
    },
    assignment () {
      let arrData = []
      this.equipment.forEach((val) => {
        if (val.fuleco === false || val.disabled === true) {
          return false
        } else {
          let data = {
            matters: val.workitem,
            conclusion: val.conclusionname,
            checktaskdetailid: val.checktaskdetailid,
            isassigned: val.isassigned,
            conclusionCode: val.conclusion,
            workrecord: val.workrecord,
            isapproval: val.isapproval,
            iswaitapproval: val.iswaitapproval,
            approvalstate: val.approvalstate
          }
          arrData.push(data)
        }
      })
      let flga = true
      arrData.forEach((val) => {
        if (val.isassigned || val.conclusionCode > 0) {
          flga = false
          if (!val.isapproval || !val.iswaitapproval) {
            flga = false
          }
        }
        if (val.approvalstate === 20) {
          flga = false
        }
      })
      if (arrData.length === 0) {
        this.$message({
          message: '请选择设备!',
          type: 'warning'
        })
        return false
      } else if (flga) {
        this.$emit('examineMine', arrData)
      } else {
        this.$message({
          message: '已安排工作项,正常工作项与修改工作项,不能安排!',
          type: 'warning'
        })
      }
    },
    preservation () {
      let token = JSON.parse(window.sessionStorage.token)
      let radio = this.radio
      let taskDetailArr = []
      let flag = true
      let textarea = this.textarea
      this.equipment.forEach((val) => {
        if (val.fuleco === false) {
          return false
        } else if (!val.isapproval && val.iswaitapproval) {
          taskDetailArr.push(val.checktaskdetailid)
        } else {
          flag = false
        }
      })
      if (flag) {
        if (taskDetailArr.length === 0) {
          this.$message({
            message: '请选择工作事项,只有待审批状态,才可以审批',
            type: 'warning'
          })
          return false
        } else {
          if (radio === 0) {
            this.$message({
              message: '请选择审核结论',
              type: 'warning'
            })
            return false
          }
          if (textarea === '') {
            this.$message({
              message: '请输入审核意见!',
              type: 'warning'
            })
            return false
          } else {
            if (this.examineStore) {
              this.$message({
                message: '耐心等待,请勿重复提交!',
                type: 'warning'
              })
              return
            }
            this.examineStore = true
            taskDetailArr.forEach((val) => {
              this.axios.post(maintainDailyapprovalTaskDetail(token, val, textarea, radio)).then((response) => {
                if (response.data.code === 0) {
                  this.$message({
                    message: '审批成功',
                    type: 'success'
                  })
                  this.examineStore = false
                  this.DetailsByDeviceId()
                }
              })
            })
          }
        }
      } else {
        this.$message({
          message: '请选择工作事项,只有待审批状态,才可以审批',
          type: 'warning'
        })
      }
    },
    closeup () {
      this.$emit('mineupdate')
    },
    determine (event, checktaskdetailid) {
      let el = event.currentTarget
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(findAllApproval(token, checktaskdetailid)).then((data) => {
        if (data.data.code === 0) {
          //  data.data.data 之前是一个数组, 多个对象, 先取第一条,修改时间11月9日
          if (data.data.data.length) {
            this.historicalExamination = data.data.data[data.data.data.length - 1]
            this.radio = this.historicalExamination.approvalstate ? this.historicalExamination.approvalstate : ''
            this.textarea = this.historicalExamination.approvalopinion ? this.historicalExamination.approvalopinion : ''
          } else {
            let obj = {
              approvaltime: '',
              approvername: ''
            }
            this.historicalExamination = obj
          }
        }
      })
      $('.content_ul').each(function (index, item) {
        $(item).removeClass('content_ulBack')
      })
      $(el).addClass('content_ulBack')
      this.axios.post(maintainDailygetEquirementjudgments2(checktaskdetailid)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length !== 0) {
            response.data.data.forEach((val) => {
              if (!val.checkvalue) {
                val.Testvalue = ``
              } else {
                val.Testvalue = `${val.checkvalue}${val.unit}`
              }
            })
          }
          this.determinant = response.data.data
        }
      })

      this.axios.post(getTaskParams(checktaskdetailid)).then((response) => {
        if (response.data.code === 0) {
          this.Testing = response.data.data
        }
      })
    },
    picturedetails (item) {
      item.pathBoolem = !item.pathBoolem
    },
    DetailsByDeviceId () {
      this.axios.post(maintainDailygetDetailsByDeviceId(this.taskidCode, this.equipmentCode)).then((response) => {
        if (response.data.code === 0) {
          let arrData = []
          response.data.data.details.forEach((val) => {
            if (val) {
              if (val.path) {
                let arr = []
                if (val.path.indexOf(',') !== -1) {
                  arr = val.path.split(',')
                  val.path = arr
                } else {
                  arr = [val.path]
                  val.path = arr
                }
              } else {
                val.path = []
              }
              val.fuleco = false
              val.pathBoolem = false
              if (val.conclusion) {
                if (!val.refid) {
                  val.disabled = false
                } else {
                  val.disabled = true
                }
              } else {
                val.disabled = true
              }
              if (!val.iswaitapproval) {
                if (!val.isapproval) {
                  val.iswaitapprovalName = ''
                } else {
                  val.iswaitapprovalName = '已审批'
                  val.titleData = `审核结论: ${val.approvalstatename} 审核意见: ${val.approvalopinion} 审核人员: ${val.approvername} 审核时间: ${this.fmtDate(val.checktime)}`
                }
              } else {
                val.iswaitapprovalName = '待审批'
                val.titleData = ''
              }
              if (val.conclusionname) {
                if (val.isassigned) {
                  val.isassignedName = '已安排'
                } else {
                  val.isassignedName = '未安排'
                }
              } else {
                val.isassignedName = ''
              }
              arrData.push(val)
              if (val.photos) {
                val.photosArr = []
                if (val.photos.indexOf(',') !== -1) {
                  let arr = val.photos.split(',')
                  val.photosArr = arr
                } else {
                  val.photosArr.push(val.photos)
                }
              }
            }
          })
          this.equipment = arrData
          this.equipmentData = response.data.data
        }
      })
    }
  },
  watch: {
    // radio (el) {
    //   if (el === 100) {
    //     this.textarea = ``
    //   } else if (el === 20) {
    //     this.textarea = ``
    //   }
    // }
  },
  components: {
    DialogImg
  },
  created () {
    this.DetailsByDeviceId()
    //  任务审批选项
    this.axios.post(maintainDailygetTaskApprovalItems()).then((response) => {
      if (response.data.code === 0) {
        this.approvaloptions = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .newlyadded
    margin 50px 0 0
    width 100%
    overflow hidden
    background #111a28
  .increase
    width 1245px
    margin 0 auto
    overflow hidden
    position relative
    padding 45px 0
    .increase_h4
      font-size $font-size-medium-x
      color $color-text-title
      margin-bottom 14px
    .examine
      width 1173px
      margin 0 auto
      overflow hidden
      color $color-text-title
      font-size $font-size-medium
      .examine_header
        width 100%
        padding-bottom 12px
        border-bottom 1px solid #444d5b
        overflow hidden
        .header_left
          float left
          overflow hidden
          margin-left 10px
          letter-spacing:2px
        .header_right
          float right
          overflow hidden
          letter-spacing:2px
        .header_div
          float left
          letter-spacing 2px
        .examine_p
          float left
          margin-right 6px
          color $color-border-b-fault
    .proceeding
      width 100%
      height calc(100% - 50px)
      overflow-y auto
      overflow-x hidden
    .examine_div
      margin-left 6px
      overflow hidden
      position relative
      .examine_div_ul
        overflow hidden
        font-size $font-size-medium
        color $color-text-title
        padding-top 10px
        .examine_div_li
          width 30%
          float left
          overflow hidden
          margin-bottom 30px
          p
            float left
            margin-right 6px
            color $color-border-b-fault
          div
            float left
      .examine_div_ul li:nth-child(3)
        margin-right 0
    .matters
      width 100%
      position relative
      margin-bottom 10px
      .mattersHeaderdiv
        width 100%
        background #202f49
        overflow hidden
      .matters_header
        width calc(100% - 20px)
        overflow hidden
        background #202f49
        color $color-text-title
        font-size $font-size-small
      .content
        width 100%
        max-height 120px
        min-height 120px
        overflow auto
        position relative
        background #0c121b
        color $color-header-b-normal
        font-size $font-size-small
      .matters_ul
        overflow hidden
        padding 14px 0
        .matters_li
          float left
          width 8%
        .matters_litwo
          float left
          width 16%
          position relative
          padding 0 1%
        .matters_lithree
          float left
          padding-left 2%
          width 8%
      .content_ul
        cursor pointer
        height 30px
        line-height 30px
        padding 6px 0
        transition .2s
        .matters_li
          float left
          width 8%
          height 30px
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
        .matters_litwo
          position relative
          overflow hidden
          float left
          width 16%
          height 30px
          padding 0 1%
          text-overflow ellipsis
          white-space nowrap
        .matters_lithree
          float left
          padding-left 2%
          width 8%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      .content_ulBack
        background #263652
      .content_ul:hover
        background #1c273a
    .opinion
      width 100%
      overflow hidden
      font-size $font-size-small
      color $color-text-title
      position relative
      .opinion_left
        float left
        width 45%
        overflow hidden
      .opinion_right
        float right
        width 45%
        overflow hidden
      .left_header
        overflow hidden
        width 100%
        margin 12px 0
      .left_hederPtwo
        float right
        width 400px
        height 1px
        background #444d5b
        margin-top 6px
      .left_hederP
        float left
        font-size 16px
        color #7fdbf9
      .opinion_title
        width 100%
        overflow hidden
        .opinion_ulDiv
          width 100%
          overflow hidden
          background #202f49
        .opinion_ul
          width calc(100% - 20px)
          background #202f49
          overflow hidden
          padding 14px 0
        .opinion_li
          float left
          padding-left 5%
          width 55%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .opinion_litwo
          float left
          width 20%
        .title_ul
          width 100%
          max-height 120px
          min-height 120px
          background #0e1520
          overflow auto
          color $color-header-b-normal
      .title_li
        width 100%
        padding 13px 0
        overflow hidden
      .title_li_ul
        overflow hidden
      .choices
        overflow hidden
        position relative
        margin: 20px 0;
      .choicesP
        float left
        margin-right 20px
      .choicesDiv
        float left
      .differing
        overflow hidden
        position relative
        margin 10px 0
      .differingDiv
        width 430px
        float left
        overflow hidden
    .arrange
      width 100%
      text-align center
      overflow hidden
      margin-top 40px
      margin-bottom 20px
      .assignment
        display inline-block
        cursor pointer
        width 107px
        height 29px
        background #32a692
        border-radius 5px
        text-align center
        line-height 29px
        transition .2s
        margin-right 30px
        &:hover
          background #4eb7a5
      .preservation
        display inline-block
        cursor pointer
        width 107px
        height 29px
        background $color-background-query
        border-radius 5px
        text-align center
        line-height 29px
        transition .2s
        margin-right 30px
        prohibit()
        &:hover
          background: #4b92bf;
      .closeup
        closedown()
        prohibit()
  .photosImg
    display inline-block
    margin-right 6px
    cursor pointer
    width 30px
    height 30px
  .picturedetails
    position absolute
    top 30px
    left -60px
    width 240px
    overflow hidden
    background #fff
    border-radius 5px
    z-index 1
    padding 20px 10px 20px 20px
  .matters_lifour
    float right
    overflow hidden
    color #cc5966 !important
    margin-right 2%
    width 3%
  .opinion__li
    float left
    padding-left 5%
    width 35%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .opinion__ul
    background #202f49
    overflow hidden
    padding 14px 0
  .matters_problem
    color #cfb53a
  .martters_normal
    color #3acf76
  .content_repeat
    background #3a271c!important
  .opinion_li_two
    float left
    height 14px
    color #999
    padding-left 2%
    width 48%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .opinion_litwo_two
    float left
    height 14px
    padding 0 2%
    width 40%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .matters_liThree
    float left
    width 12%
  .examine_div_liTwo
    width 10%!important
  .opinion_li_twoSpan
    color #fff
    margin-left 10px
</style>

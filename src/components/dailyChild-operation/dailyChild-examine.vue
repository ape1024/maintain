<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        审核
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
                <div>{{equipmentData.devicename}}</div>
              </li>
              <li class="examine_div_li">
                <p>设备编码：</p>
                <div>{{equipmentData.devicecode}}</div>
              </li>
              <li class="examine_div_li">
                <p>设备位置：</p>
                <div>{{equipmentData.position}}</div>
              </li>
              <li class="examine_div_li">
                <p>设施数量：</p>
                <div>{{equipmentData.devicecount}}</div>
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
                  <li class="matters_li">
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
              <ul class="content_ul" v-for="(item, index) in equipment" :key="index" @click.stop="determine($event, item.checktaskdetailid)" :class="[!item.refid ? '' : 'content_repeat']">
                <li class="matters_lithree" :title="item.workitem">
                  <el-checkbox v-bind:disabled="item.disabled" v-model="item.fuleco"></el-checkbox>
                  {{item.workitem}}
                </li>
                <li class="matters_li">
                  {{item.checkperson}}
                  {{item.others}}
                </li>
                <li class="matters_li">
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
                  {{item.iswaitapprovalName}}
                </li>
                <li class="matters_li">
                  {{item.isassignedName}}
                </li>
                <li class="matters_litwo">
                  <!--{{item.photosArr}}-->
                  <img class="photosImg" @click="selectImg(fieldphoto(item.photosArr, item.path), index)" :key="index" v-for="(data, index) in item.photosArr" :src="`${item.path}${data}`" alt="">
                </li>
                <li class="matters_lifour">
                  <i @click.stop="amputatematters(item.checktaskdetailid)" v-if="!item.refid ? false : true" class="el-icon-close"></i>
                </li>
              </ul>
            </div>
          </div>
          <div class="opinion">
            <div class="opinion_left">
              <div class="left_header">
                <p class="left_hederP">技术要求判定</p>
                <p class="left_hederPtwo"></p>
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
              </div>
            </div>
            <div class="opinion_right">
              <div class="left_header">
                <p class="left_hederP">记录审计情况</p>
                <p class="left_hederPtwo"></p>
              </div>
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
                    placeholder=""
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="opinion">
            <div class="opinion_left">
              <div class="left_header">
                <p class="left_hederP">检测项</p>
                <p class="left_hederPtwo"></p>
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
                        {{item.Testvalue}}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="arrange">
          <div @click="assignment" class="assignment">
            安排任务
          </div>
          <div @click="preservation" class="preservation">
            审 核
          </div>
          <div @click="closeup" class="closeup">
            关 闭
          </div>
        </div>
      </section>
      <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
    </section>
  </div>
</template>

<script>
import { maintainDailyapprovalTaskDetail, maintainDailygetDetailsByDeviceId, maintainDailygetEquirementjudgments2, maintainDailygetTaskApprovalItems, deleteTaskDetail, getTaskParams } from '../../api/user'
import DialogImg from 'base/dialog-img/dialog-img'
import $ from 'jquery'
export default {
  name: 'dailyChild-examine',
  props: ['examine', 'examineName', 'equipmentCode', 'taskidCode'],
  data () {
    return {
      checked: false,
      radio: 0,
      textarea: '同意归档',
      examine_Boolean: false,
      determinant: '',
      approvaloptions: '',
      equipment: '',
      equipmentData: '',
      Testing: '',
      imgList: []
    }
  },
  methods: {
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
      this.axios.post(deleteTaskDetail(checktaskdetailid)).then((response) => {
        if (response.data.code === 0) {
          this.axios.post(maintainDailygetDetailsByDeviceId(this.taskidCode, this.equipmentCode)).then((response) => {
            if (response.data.code === 0) {
              let arrData = []
              response.data.data.details.forEach((val) => {
                if (val.path !== '') {
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
                  }
                } else {
                  val.iswaitapprovalName = '待审批'
                }
                if (val.isassigned) {
                  val.isassignedName = '已安排'
                } else {
                  val.isassignedName = '未安排'
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
              })
              this.equipment = arrData
              this.equipmentData = response.data.data
            }
          })
        }
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
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
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
            conclusionCode: val.conclusion
          }
          arrData.push(data)
        }
      })
      let flga = true
      arrData.forEach((val) => {
        if (val.isassigned || val.conclusionCode > 0) {
          if (!val.isapproval && !val.iswaitapproval) {
            flga = false
          }
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
          message: '已安排工作项与正常工作项,不能安排!',
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
            taskDetailArr.forEach((val) => {
              this.axios.post(maintainDailyapprovalTaskDetail(token, val, textarea, radio)).then((response) => {
                if (response.data.code === 0) {
                  this.examine_Boolean = this.examine
                  this.examine_Boolean = !this.examine_Boolean
                  this.$message({
                    message: '审批成功',
                    type: 'success'
                  })
                  this.$emit('mine', this.examine_Boolean)
                  return false
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
      this.examine_Boolean = this.examine
      this.examine_Boolean = !this.examine_Boolean
      this.$emit('mine', this.examine_Boolean)
    },
    determine (event, checktaskdetailid) {
      let el = event.currentTarget
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
    }
  },
  components: {
    DialogImg
  },
  created () {
    this.axios.post(maintainDailygetDetailsByDeviceId(this.taskidCode, this.equipmentCode)).then((response) => {
      if (response.data.code === 0) {
        let arrData = []
        response.data.data.details.forEach((val) => {
          if (val.path !== '') {
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
            }
          } else {
            val.iswaitapprovalName = '待审批'
          }
          if (val.isassigned) {
            val.isassignedName = '已安排'
          } else {
            val.isassignedName = '未安排'
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
        })
        this.equipment = arrData
        this.equipmentData = response.data.data
      }
    })
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
    padding-top 45px
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
          padding-top 30px
          .examine_div_li
            float left
            overflow hidden
            margin-right 40px
            margin-bottom 30px
            p
              float left
              margin-right 6px
              color $color-border-b-fault
            div
              width 276px
              float left
         .examine_div_ul li:nth-child(3)
           margin-right 0
      .matters
        width 100%
        position relative
        margin-bottom 20px
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
          padding 13px 0
          .matters_li
            float left
            width 10%
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
          transition .2s
          .matters_li
            float left
            width 10%
            height 30px
            text-overflow ellipsis
            white-space nowrap
          .matters_litwo
            position relative
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
           margin-bottom 12px
         .left_hederPtwo
           float right
           width 400px
           height 1px
           background #444d5b
           margin-top 6px
         .left_hederP
           float left
         .opinion_title
            width 100%
            background #0e1520
            overflow hidden
            .opinion_ulDiv
              width 100%
              overflow hidden
              background #202f49
            .opinion_ul
               width calc(100% - 20px)
               background #202f49
               overflow hidden
               padding 5px 0
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
          height 36px
          background #32a692
          border-radius 5px
          text-align center
          line-height 36px
          transition .2s
          margin-right 30px
          &:hover
            background #4eb7a5
        .preservation
          display inline-block
          cursor pointer
          width 107px
          height 36px
          background $color-background-query
          border-radius 5px
          text-align center
          line-height 36px
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
    float left
    overflow hidden
    width 2%
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
    padding 5px 0
  .matters_problem
    color #cfb53a
  .martters_normal
     color #3acf76
  .content_repeat
    background #3a271c!important
</style>

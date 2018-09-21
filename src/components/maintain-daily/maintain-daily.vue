<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域：</p>
          <div class="div_input">
              <el-cascader
                size="mini"
                clearable
                :options="regionDate"
                v-model="regionModel"
                :props="regionProps"
                change-on-select>>
              </el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">设备类型：</p>
          <div class="div_input">
            <el-cascader
              size="mini"
              clearable
              change-on-select
              v-model="equipmentDate"
              :options="equipment"
              :props="equipmentProps"
            ></el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">审核状态：</p>
          <div class="div_inputTwo">
            <el-select size="small" v-model="Auditstatus" multiple placeholder="">
              <el-option
                v-for="item in AuditstatusDate"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div @click.stop="query" class="query">
          查 询
        </div>
      </div>
    </section>
    <section class="subject_bottom">
      <ul class="header_ul">
        <li class="header_lithree">
         任务名称
        </li>
        <li class="header_li">
          开始时间
        </li>
        <li class="header_li">
          结束时间
        </li>
        <li class="header_litwo">
          设备总数
        </li>
        <li class="header_litwo">
          已完成项
        </li>
        <li class="header_litwo">
          故障问题
        </li>
        <li class="header_litwo">
          待审核
        </li>
        <li class="header_litwo">
          已分配任务项
        </li>
      </ul>
      <ul class="table_ul">
        <li v-for="(item,$index) in tableDatataskStat" class="table_li" :key="item.id" @click="selectStyle (item, $index, tableDatataskStat, $event)">
          <ul class="inline_ul">
            <li :title="item.taskName" class="header_lithree">{{item.taskName}}</li>
            <li class="header_li">{{fmtDate(item.startTime)}}</li>
            <li class="header_li">{{fmtDate(item.endTime)}}</li>
            <li class="header_litwo">{{item.sum}}</li>
            <li class="header_li_five">{{item.finish}}</li>
            <li class="header_li_six">{{item.error + item.problem}}</li>
            <li class="header_li_Seven">
              {{item.waitapproval}}
            </li>
            <li class="header_litwo">{{item.assign}}</li>
            <li class="header_litwo">
              <div v-if="(timestamp - (item.endTime + 86400000)) > 86400000  && JurisdictionCheck" @click.stop="pigeonhole(item.taskID)" class="pigeonhole">
                归 档
              </div>
              <div v-if="JurisdictionApproval" @click.stop="batchAudit" class="batchDiv">
                批量审核
              </div>
            </li>
          </ul>
          <transition enter-active-class="fadeInUp"
            leave-active-class="fadeOutDown">
          <div @click.stop v-if="item.flag" class="inline_div">
              <!--<dailytwo :taskid="item.taskID" :taskName="item.taskName" :dailyData="dailyChild" ></dailytwo>-->
            <dailytwoNew :clickId="click_id" @requestdata="requestData" :dailychild="dailyChild" :clicktaskname="clicktaskName" @examinationApproval="ExaminationApproval"></dailytwoNew>
          </div>
          </transition>
        </li>
      </ul>
    </section>
    <!--目前不需要修改-->
    <!--<section v-show="modifyBoolean" class="review">-->
      <!--<modify :sag="modifyBoolean" @say="Say"></modify>-->
    <!--</section>-->
  </div>
</template>

<script>
import dailytwo from '../dailyChild-two/dailyChild-two'
import dailytwoNew from '../dailyChild-Newmodification/dailyChild-Newmodification'
import { findAreasTreeByProjectid, findAllDeviceType, getTaskQueryApprovalItems, maintainDailyCurrentTaskStat, SetCheckTaskFiled, getCurrentTaskDeviceStatJson, getCurrentTaskDeviceStatJsonTwo, batchApprovalCheckTaskByDetailIDs } from '../../api/user'
// 修改
// import modify from '../dailyChild-operation/dailyChild-modify'
import { projectMixin, loadingMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin, loadingMixin],
  name: 'maintain-daily',
  components: {
    dailytwo,
    dailytwoNew
  },
  methods: {
    pigeonhole (taskID) {
      this.$confirm('此操作将归档此任务,归档后将不能查看 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(SetCheckTaskFiled(taskID)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '归档成功!'
            })
            this.axios.post(maintainDailyCurrentTaskStat(2, this.maintainProject)).then((response) => {
              if (response.data.code === 0) {
                this.tableDatataskStat = response.data.data
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '归档失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    init () {
      //  获取区域
      this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.regionDate = response.data.data
        }
      })
      //  展示任务
      this.axios.post(maintainDailyCurrentTaskStat(2, (this.maintainProject))).then((response) => {
        if (response.data.code === 0) {
          this.tableDatataskStat = response.data.data
        }
      })
    },
    ExaminationApproval (el) {
      // let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(maintainDailyCurrentTaskStat(2, this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.tableDatataskStat = response.data.data
        }
      })
    },
    query () {
      let flag = false
      this.tableDatataskStat.forEach((val) => {
        if (val.flag === true) {
          flag = true
          return false
        } else {
          return false
        }
      })
      if (flag === true) {
        let clickId = this.click_id
        let areaid = this.regionModel.length !== 0 ? this.regionModel[this.regionModel.length - 1] : ''
        let basedevicecode = this.equipmentDate.length !== 0 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        basedevicecode = basedevicecode === null ? '' : basedevicecode
        let approvalstates = this.Auditstatus.length !== 0 ? this.Auditstatus.join() : ''
        this.openLoadingDialog()
        let token = JSON.parse(window.sessionStorage.token)
        this.axios.post(getCurrentTaskDeviceStatJsonTwo(token, clickId, areaid, basedevicecode, approvalstates)).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data.length !== 0) {
              response.data.data.forEach((val) => {
                val.choose = false
                if (val.details) {
                  val.details.forEach((data) => {
                    data.flag = false
                    if (data.photos) {
                      data.photosArr = []
                      if (data.photos.indexOf(',') !== -1) {
                        let arr = data.photos.split(',')
                        data.photosArr = arr
                      } else {
                        data.photosArr.push(data.photos)
                      }
                    }
                    if (!data.iswaitapproval) {
                      if (!data.isapproval) {
                        data.iswaitapprovalName = ''
                        data.disabled = true
                      } else {
                        data.iswaitapprovalName = '已审批'
                        data.disabled = true
                      }
                    } else {
                      data.iswaitapprovalName = '待审批'
                      data.disabled = false
                    }
                    if (data.isassigned) {
                      data.isassignedName = '已安排'
                      data.disabled = true
                    } else {
                      data.isassignedName = '未安排'
                    }
                  })
                }
              })
              this.dailyChild = response.data.data
            } else {
              this.dailyChild = response.data.data
            }
          }
          this.closeLoadingDialog()
        })
      } else {
        this.$message({
          message: '请展开任务,才可对应查询',
          type: 'warning'
        })
      }
    },
    selectStyle (item, index, tableData, $event) {
      if (item.flag === false) {
        this.tableDatataskStat.forEach((val) => {
          val.flag = false
        })
        this.clicktaskName = item.taskName
        let itemAreaid = item.taskID
        this.click_id = itemAreaid
        let token = JSON.parse(window.sessionStorage.token)
        this.openLoadingDialog()
        this.axios.post(getCurrentTaskDeviceStatJson(token, itemAreaid)).then((response) => {
          if (!response) {
            this.closeLoadingDialog()
            return
          }
          if (response.data.code === 0) {
            if (response.data.data.length !== 0) {
              response.data.data.forEach((val) => {
                val.choose = false
                if (val.details) {
                  val.details.forEach((data) => {
                    data.flag = false
                    if (data.photos) {
                      data.photosArr = []
                      if (data.photos.indexOf(',') !== -1) {
                        let arr = data.photos.split(',')
                        data.photosArr = arr
                      } else {
                        data.photosArr.push(data.photos)
                      }
                    }
                    if (!data.iswaitapproval) {
                      if (!data.isapproval) {
                        data.iswaitapprovalName = ''
                        data.disabled = true
                      } else {
                        data.iswaitapprovalName = '已审批'
                        data.disabled = true
                      }
                    } else {
                      data.iswaitapprovalName = '待审批'
                      data.disabled = false
                    }
                    if (data.isassigned) {
                      data.isassignedName = '已安排'
                    } else {
                      data.isassignedName = '未安排'
                    }
                    if (data.conclusion !== 1) {
                      data.disabled = true
                    }
                  })
                }
              })
              this.dailyChild = response.data.data
              item.flag = !item.flag
            } else {
              this.dailyChild = response.data.data
              item.flag = !item.flag
            }
          }
          this.closeLoadingDialog()
        })
      } else {
        item.flag = !item.flag
      }
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    // 修改逻辑
    amend ($event) {
      this.modifyBoolean = true
    },
    Say (ev) {
      this.modifyBoolean = ev
    },
    requestData () {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(getCurrentTaskDeviceStatJson(token, this.click_id)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length !== 0) {
            response.data.data.forEach((val) => {
              val.choose = false
              if (val.details) {
                val.details.forEach((data) => {
                  data.flag = false
                  if (!data.iswaitapproval) {
                    if (!data.isapproval) {
                      data.iswaitapprovalName = ''
                    } else {
                      data.iswaitapprovalName = '已审批'
                    }
                  } else {
                    data.iswaitapprovalName = '待审批'
                  }
                  if (data.isassigned) {
                    data.isassignedName = '已安排'
                  } else {
                    data.isassignedName = '未安排'
                  }
                })
              }
            })
            this.dailyChild = response.data.data
          } else {
            this.dailyChild = response.data.data
          }
        }
        this.closeLoadingDialog()
      })
    },
    batchAudit () {
      let arr = []
      this.dailyChild.forEach((val) => {
        val.details.forEach((data) => {
          if (data.flag === true) {
            arr.push(data.detailId)
          }
        })
      })
      if (!arr.length) {
        this.$message({
          message: '请选择审核项!',
          type: 'warning'
        })
        return false
      } else {
        arr = arr.join()
        let token = JSON.parse(window.sessionStorage.token)
        this.axios.post(batchApprovalCheckTaskByDetailIDs(token, this.click_id, arr)).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            this.axios.post(maintainDailyCurrentTaskStat(2, this.maintainProject)).then((response) => {
              if (response.data.code === 0) {
                this.tableDatataskStat = response.data.data
              }
            })
          }
        })
      }
    }
  },
  data () {
    return {
      //  区域
      regionProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      regionDate: [],
      regionModel: [],
      //  设备类别
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'code'
      },
      //  审核状态
      AuditstatusDate: [],
      Auditstatus: '',
      equipment: [],
      equipmentDate: [],
      modifyBoolean: false,
      options: [],
      value: '',
      // 获取点击的id
      click_id: '',
      tableDatataskStat: [],
      dailyChild: '',
      timestamp: '',
      clicktaskName: '',
      JurisdictionCheck: '',
      JurisdictionApproval: ''
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_xj') {
        this.JurisdictionCheck = val.check
        this.JurisdictionApproval = val.approval
      }
    })
    //  归档时间判断  + 86400  延迟一天
    let timestamp = (new Date()).getTime()
    this.timestamp = timestamp
    console.log(timestamp)
    //  获取区域
    this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.regionDate = response.data.data
      }
    })
    //  获取设备类别
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.equipment = response.data.data
      }
    })
    //  审核状态
    this.axios.post(getTaskQueryApprovalItems()).then((response) => {
      if (response.data.code === 0) {
        this.AuditstatusDate = response.data.data
        response.data.data.forEach((val) => {
          if (val.isdefault === 1) {
            this.Auditstatus.push(val.value)
          }
        })
      }
    })
    //  展示任务
    this.axios.post(maintainDailyCurrentTaskStat(2, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.tableDatataskStat = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
     margin 12px
     overflow hidden
     position relative
     background rgba(000,000,000, .47)
    .subject_top
        margin 10px
        overflow hidden
        background #111a28
        padding 20px 0
        display flex
      .ul_input
         margin-left 30px
         overflow hidden
         float left
         position relative
         display flex
        .li_input
          float left
          overflow hidden
          margin-right 20px
          display flex
          .div_p
           float left
           font-size $color-text-title
           color $color-text-title
           margin-right 10px
           line-height 40px
          .div_input
           float left
           width 167px
           margin-top 5px
           display flex

      .button
         display flex
         float right
         overflow hidden
         position relative
         margin-left 90px
         text-align center
         line-height 36px
         font-size $font-size-medium
         color $color-text-title
         .query
           width 106px
           height 36px
           border-radius 5px
           float left
           margin-right 30px
           background $color-background-query
           cursor pointer
           transition .2s
         .query:hover
           background #4b92bf
         .newly
           width 106px
           height 36px
           border-radius 5px
           float right
           background $color-background-newly
           cursor pointer
           transition .2s
         .newly:hover
           background #4baabe
     .table
       width 100%
       overflow hidden
       position relative
       color $color-text-title
       font-size $font-size-medium
       text-align left
       th,td
         padding 10px 0
       .table_header
         background yellowgreen

  .header_ul
      width 100%
      overflow hidden
      position relative
      color $color-header-b-normal
      font-size $font-size-medium
      line-height 32px
      height 32px
      padding 4px 0
      background #354d76
     .header_li
       float left
       width 10%
       line-height 32px
       height 32px
     .header_litwo
       float left
       width 10%
       line-height 32px
       text-align center
       height 32px
     .header_lithree
       float left
       width 18%
       line-height 32px
       height 32px
       padding-left 1%
       padding-right 1%
       overflow hidden
       text-overflow ellipsis
       display -webkit-box
       -webkit-box-orient vertical
       -webkit-line-clamp 2
     .header_li_five
       float left
       width 10%
       line-height 32px
       height 32px
       text-align center
       color  $color-text-tile-complete
     .header_li_six
       float left
       width 10%
       line-height 32px
       height 32px
       text-align center
       color  $color-text-tile-fault
     .header_li_Seven
       float left
       width 10%
       line-height 32px
       height 32px
       text-align center
       color  $color-text-tile-fault
    .header_p_one
      color $color-text-tile-state
    .header_p_two
      color $color-text-tile-state-two
    .header_p_three
      color $color-text-tile-complete
    .header_p_four
      color $color-text-tile-handle
    .header_p_six
      color $color-text-tile-complete
    .header_p_seven
      color $color-text
    .header_p_eight
      color $color-background-query
    .header_p_nine
      color #333333
  .table_ul
      width 100%
      overflow hidden
      position relative
      color $color-text
      font-size $font-size-medium
    .table_li
      width 100%
      overflow hidden
      position relative
      .inline_ul
        width: 100%;
        overflow: hidden;
        position: relative;
        padding: 4px 0;
        line-height: 32px;
  .table_ul .table_li:nth-child(odd)
    background #1c273a
   .table_ul .table_li:nth-child(even)
    background #141D2C
  .modify
    width 106px
    height 32px
    background $color-background-newly
    text-align center
    line-height 32px
    font-size $font-size-medium
    color $color-text-title
    cursor pointer
    transition .2s
  .modify:hover
    background #4baabe
  .examine
    width 106px
    height 32px
    background $color-background-query
    text-align center
    line-height 32px
    font-size $font-size-medium
    color $color-text-title
    cursor pointer
    transition .2s
  .examine:hover
    background #4b92bf
  .inline_div
     width 100%
     overflow hidden
     position relative
     .inline_fill
       margin 6px 10px
       overflow hidden
       position relative
       .list_heder
         margin 4px
         overflow hidden
         position relative
         background #354d76
         padding 12px 0
         .list_heder_li
            float left
            width 16%
            overflow hidden
         .list_heder_litwo
            float left
            width 14%
            overflow hidden
            padding-left 2%
       .inline_list
          width 100%
          overflow hidden
          position relative
         .inline_list_li
           width 100%
           overflow hidden
           position relative
           font-size $font-size-medium
           color $color-text-title
       .list_data
         width 100%
         padding 12px 0
         overflow hidden
         .list_data_li
           float left
           overflow hidden
           width 16%
         .list_data_litwo
           float: left;
           width: 14%;
           overflow: hidden;
           padding-left: 2%;
         .list_data_li_p
           float left
           color #3279A6
           margin-right 37px
           cursor pointer
           text-decoration underline
         .list_data_li_ptwo
           float left
           color $color-text-tile-project
           cursor pointer
           text-decoration underline
  .threelevel
     margin 0 10px
     overflow hidden
     position relative
     color $color-text-title
     font-size $font-size-medium
     .threelevel_header
       margin 4px
       overflow hidden
       position relative
       padding 12px 0
       background #354d76
       .threelevel_li
         float left
         width 11%
       .threelevel_litwo
         float left
         width 17%
         overflow hidden
       .threelevel_lithree
         float left
         width 9%
         padding-left 2%
     .threelevel_list
       margin 4px
       overflow hidden
       position relative
       .threelevel_list_li
         width 100%
         overflow hidden
         position relative
         .threelevel_list_ul
           width 100%
           overflow hidden
           padding 12px 0
           .threelevel_li
             float left
             width 11%
           .threelevel_litwo
             float left
             width 17%
             overflow hidden
           .threelevel_lithree
             float left
             width 9%
             padding-left 2%
  .threelevel_litwo p
      float left
      margin-right 35px
      text-decoration underline
      cursor pointer
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(000,000,000,.4)
    z-index 11
    overflow hidden
  .div_inputTwo
    float left
    width 300px
    margin-top 5px
    display flex
    .el-select
     width 100%
  .pigeonhole
    conserve()
    width 70px
    height 30px
    line-height 30px
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
  .subject_bottom
    min-height 800px
    background rgba(0,0,0,0.35)
    margin 10px
  .batchDiv
    display inline-block
    width 80px
    height 30px
    line-height 30px
    border-radius 5px
    text-align center
    background $color-background-newly
    cursor pointer
    transition .2s
    &:hover
      background #4baabe
</style>

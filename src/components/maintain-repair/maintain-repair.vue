<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">建筑区域：</p>
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
          <p class="div_p">处理状态：</p>
          <div class="div_inputTow">
            <el-select clearable size="mini" v-model="maintenanceData" placeholder="请选择">
              <el-option
                v-for="item in maintenance"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">审查状态：</p>
          <div class="div_inputTwo">
            <el-select clearable size="mini" v-model="Auditstatus" placeholder="请选择" multiple>
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
    <section class="subject_bottomDIv">
      <ul class="header_ul">
        <li class="repair_li">
          维修编号
        </li>
        <li class="repair_lifvie">
          设施类别
        </li>
        <li class="repair_litwo">
          设置位置
        </li>
        <li class="repair_lithree">
          数量
        </li>
        <li class="repair_lithree">
          任务类型
        </li>
        <li class="repair_lifour">
          异常情况
        </li>
        <li class="repair_lithree">
          安排人员
        </li>
        <li class="repair_lithree">
          安排时间
        </li>
        <li class="repair_lithree">
          处理人员
        </li>
        <li class="repair_lithree">
          处理结果
        </li>
        <li class="repair_lithree">
          结束时间
        </li>
        <li class="repair_lithree">
          审核状态
        </li>
        <li class="repair_lifive textAlign">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li :key="index" v-for="(item, index) in tabulationData" class="table_li" :class="!item.refid ? '' : 'table_liRepeat'">
          <ul class="inline_ul">
            <li class="repair_li">
              {{item.repairtaskid}}
            </li>
            <li :title="item.devicename" class="repair_lifvie">
              {{item.devicename}}
            </li>
            <li :title="item.areaname + item.position" class="repair_litwo">
              {{item.areaname}}{{item.position}}
            </li>
            <li class="repair_lithree">
              {{item.devicecount}} {{item.unit}}
            </li>
            <li class="repair_lithree">
              {{item.repairtypename}}
            </li>
            <li :title="item.exception" class="repair_lifour">
              {{item.exception}}
            </li>
            <li class="repair_lithree">
              {{item.creatername}}
            </li>
            <li :title="fmtDate(item.createtime)" class="repair_lithree">
              {{fmtDate(item.createtime)}}
            </li>
            <li class="repair_lithree">
              {{item.repairpersonname}}{{item.others}}
            </li>
            <li class="repair_lithree">
              {{item.repairstatename}}
            </li>
            <li :title="fmtDate(item.repairtime)" class="repair_lithree">
              {{fmtDate(item.repairtime)}}
            </li>
            <li class="repair_lithree">
              {{approvalStatusfn(item.approvalstatename)}}
            </li>
            <li class="repair_lifive">
              <p v-if="JurisdictionAssign && item.repairBoolean" @click.stop="equipment(item.repairtaskid)" class="header_p_twelve">
                重新安排
              </p>
              <p v-if="JurisdictionAssign && !item.repairBoolean" class="header_p_twelve threelevel_litwo_ptwo">
                重新安排
              </p>
              <p v-if="JurisdictionSelect" @click.stop="examine(item)" class="header_p_ten">查看</p>
              <p v-if="JurisdictionApproval && item.approvalBoolean" @click.stop="question(item.repairtaskid, item)" class="header_p_eight threelevel_litwo_p">
                审核
              </p>
              <p v-if="JurisdictionApproval && !item.approvalBoolean" class="header_p_eight threelevel_litwo_p threelevel_litwo_ptwo">
                审核
              </p>
              <p v-if="item.verification && JurisdictionCheck" @click.stop="verification(item.repairtaskid)" class="header_p_thirteen">
                验证
              </p>
              <p v-if="!item.verification && JurisdictionCheck" class="header_p_thirteen threelevel_litwo_ptwo">
                验证
              </p>
              <p v-if="JurisdictionDelete && item.amputate" class="header_p_eleven" @click.stop="amputate(index, tabulationData,item.repairtaskid)">删除</p>
              <p v-if="JurisdictionDelete && !item.amputate" class="header_p_eleven threelevel_litwo_ptwo" >删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section v-if="review_boolean" @click.stop class="review">
      <increase v-if="review_boolean" :msg="review_boolean" @say="onSay"></increase>
    </section>
    <section v-if="examineBoolean" @click.stop class="review">
      <!--审核-->
      <!--<childExamine v-if="examineBoolean" :examine="examineData" :title="examinationTitle" :rework="reworkData" :examina="examination"  :approval="approvalStatus" :state="taskState" @mine="Mine" @newly="Newly"></childExamine>-->
      <examineTwo v-if="examineBoolean" :examine="examineData" :title="examinationTitle" :state="taskState" :repairtasks="repairtasksName" @mine="Mine" @newly="Newly"></examineTwo>
    </section>
    <section v-if="lookoverBoolean" @click.stop class="review">
      <!--查看-->
      <childLookover :examine="examineData" :title="examinationTitle" :state="taskState" :repairtasks="repairtasksName" @look="Onlook"></childLookover>
    </section>
    <section v-if="quipmentBoolean" class="review" @click.stop>
      <!--重新安排-->
      <childquipment v-if="quipmentBoolean" :msg="quipmentData" @quipment="Quipment"></childquipment>
    </section>
    <section v-if="verificationBoolean" class="review" @click.stop>
      <childVerification :examine="examineData" :rework="reworkData" :examina="examination"  :approval="approvalStatus" :state="taskState" @mine="Mine" @newly="Newly"></childVerification>
    </section>
  </div>
</template>

<script>
import repairchild from '../repair-child/repair-child'
import increase from '../admin-child/adminChild-review'
import childLookover from '../repair-operation/repair-lookover'
import childModify from '../repair-operation/repair-arrange'
import childExamine from '../repair-operation/repair-examine'
import childquipment from '../repair-operation/repair-rescheduling'
import childVerification from '../repair-operation/repair-Verification'
import examineTwo from '../repair-operation/repair-examineTwo'
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
import { findAreasTreeByProjectid, maintainRepairgetRepairStates, maintainRepairgetRepariTaskApprovalItem, maintainRepairfindRepairTasks, maintainRepairmaintainRepairfindRepairTasksTwo, maintainRepairfindTaskByTaskid, maintainRepairremoveRepairtasks, maintainRepairfindReworksByTaskid, maintainRepairgetApprovalInfos, getRepairUsers, maintainRepairgetgetRepariTaskQueryApprovalItem } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin],
  name: 'maintain-repair',
  components: {
    repairchild,
    increase,
    childLookover,
    childModify,
    childExamine,
    childquipment,
    examineTwo,
    childVerification
  },
  methods: {
    // 格式化时间
    fmtDate (obj) {
      return formatDate(obj, 'yyyy/MM/dd HH:mm')
    },
    init () {
      this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.regionDate = response.data.data
        }
      })
      this.axios.post(maintainRepairfindRepairTasks(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.functionalJudgment(response.data.data)
          this.tabulationData = response.data.data
        }
      })
    },
    approvalStatusfn (status) {
      let arr = ''
      this.approvalStatus.forEach((val) => {
        if (val.value === status) {
          arr = val.name
        }
      })
      if (arr === '') {
        return status
      }
      return arr
    },
    query () {
      let regionModel = ''
      let approvalStates = this.Auditstatus.length ? this.Auditstatus.join() : ''
      if (this.regionModel.length !== 0) {
        regionModel = this.regionModel[this.regionModel.length - 1]
      } else {
        regionModel = ''
      }
      this.axios.post(maintainRepairmaintainRepairfindRepairTasksTwo(this.maintainProject, regionModel, this.maintenanceData, approvalStates)).then((response) => {
        if (response.data.code === 0) {
          this.functionalJudgment(response.data.data)
          this.tabulationData = response.data.data
        }
      })
    },
    Newly (ev) {
      this.examineBoolean = false

      this.axios.post(maintainRepairfindTaskByTaskid(ev.repairtaskid)).then((response) => {
        if (response.data.code === 0) {
          this.quipmentData = response.data.data
          this.quipmentBoolean = true
        }
      })
    },
    selectStyle (item, index, tableData) {
      // 点击一级出现二级
      event.cancelBubble = true
      this.tableData.forEach(function (item) {
        if (index !== item.index) {
          item.active = false
        }
      })
      item.active = !item.active
    },
    auditing () {
      // 点击新增 出现 新增组件
      this.review_boolean = true
    },
    preservation (item) {
      // 一级 审核 保存
      item.admin_show = !item.admin_show
      item.auditin = !item.auditin
    },
    cancel (item) {
      // 一级 审核 取消
      item.admin_show = !item.admin_show
      item.auditin = !item.auditin
    },
    onSay (ev) {
      // 子级组件传递 参数 让新增组件 隐藏
      this.review_boolean = ev
    },
    amputate (index, content, repairtaskid) {
      // 删除
      this.$confirm('是否删除此设施?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(maintainRepairremoveRepairtasks(repairtaskid)).then((response) => {
          if (response.data.code === 0) {
            content.splice([index], 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.axios.post(maintainRepairfindRepairTasks(this.maintainProject)).then((response) => {
              if (response.data.code === 0) {
                this.functionalJudgment(response.data.data)
                this.tabulationData = response.data.data
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    examine (item) {
      // 点击查看
      let id = !item.refid ? item.repairtaskid : item.refid
      this.examinationTitle = item.repairtypename
      this.axios.post(maintainRepairfindTaskByTaskid(id)).then((response) => {
        if (response.data.code === 0) {
          this.axios.post(getRepairUsers(id)).then((data) => {
            if (data.data.data.length !== 0) {
              let arr = []
              data.data.data.forEach((val) => {
                arr.push(val.username)
              })
              this.repairtasksName = arr.join(',')
            }
            this.examineData = response.data.data
            this.lookoverBoolean = true
          })
        }
      })
      this.getTaskState()
    },
    modify () {
      // 点击修改
      this.modifyBoolean = true
    },
    getTaskState () {
      //  获取维修任务状态
      this.axios.post(maintainRepairgetRepairStates()).then((response) => {
        if (response.data.code === 0) {
          this.taskState = response.data.data
        }
      })
    },
    // 审核
    question (ID, item) {
      // 点击审核
      let id = !item.refid ? item.repairtaskid : item.refid
      this.examinationTitle = item.repairtypename
      this.axios.post(maintainRepairfindTaskByTaskid(id)).then((response) => {
        if (response.data.code === 0) {
          this.axios.post(getRepairUsers(id)).then((data) => {
            if (data.data.data.length !== 0) {
              let arr = []
              data.data.data.forEach((val) => {
                arr.push(val.username)
              })
              this.repairtasksName = arr.join(',')
            }
            this.examineData = response.data.data
            this.examineBoolean = true
          })
        }
      })
      this.getTaskState()
      //  -----
      // this.examinationTitle = item.repairtypename
      // this.axios.post(maintainRepairfindTaskByTaskid(ID)).then((response) => {
      //   if (response.data.code === 0) {
      //     this.examineData = response.data.data
      //     this.axios.post(maintainRepairfindReworksByTaskid(ID)).then((response) => {
      //       if (response.data.code === 0) {
      //         this.reworkData = response.data.data
      //         this.axios.post(maintainRepairgetApprovalInfos(ID)).then((response) => {
      //           if (response.data.code === 0) {
      //             // 审批记录  目前 只要第一条,待定
      //             this.examination = response.data.data[0]
      //             this.getTaskState()
      //             this.examineBoolean = true
      //           }
      //         })
      //       }
      //     })
      //   }
      // })
      // this.axios.post(maintainRepairfindRepairTasks(ID)).then((response) => {
      //   if (response.data.code === 0) {
      //     this.functionalJudgment(response.data.data)
      //     this.tabulationData = response.data.data
      //   }
      // })
      //  ----
    },
    verification (ID) {
      this.axios.post(maintainRepairfindTaskByTaskid(ID)).then((response) => {
        if (response.data.code === 0) {
          this.examineData = response.data.data
          this.axios.post(maintainRepairfindReworksByTaskid(ID)).then((response) => {
            if (response.data.code === 0) {
              this.reworkData = response.data.data
              this.axios.post(maintainRepairgetApprovalInfos(ID)).then((response) => {
                if (response.data.code === 0) {
                  // 审批记录  目前 只要第一条,待定
                  this.examination = response.data.data[0]
                  this.getTaskState()
                  this.verificationBoolean = true
                }
              })
            }
          })
        }
      })
    },
    Mine (ev) {
      // 审核 传递的参数
      this.axios.post(maintainRepairfindRepairTasks(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.functionalJudgment(response.data.data)
          this.tabulationData = response.data.data
          this.examineBoolean = ev
          this.verificationBoolean = false
        }
      })
    },
    Onlook (ev) {
      this.lookoverBoolean = ev
    },
    Modify (ev) {
      this.modifyBoolean = ev
    },
    // 重新安排
    equipment (ID) {
      this.axios.post(maintainRepairfindTaskByTaskid(ID)).then((response) => {
        if (response.data.code === 0) {
          this.quipmentData = response.data.data
          this.quipmentBoolean = true
        }
      })
    },
    Quipment (ev) {
      this.quipmentBoolean = ev
    },
    //  功能判断
    functionalJudgment (data) {
      data.forEach((val) => {
        //  重新分配
        if (!val.refid && val.repairstate !== null) {
          if (val.repairstate === 0 || val.repairstate === -5) {
            val.repairBoolean = true
          } else {
            val.repairBoolean = false
          }
        } else {
          val.repairBoolean = false
        }
        //  审核
        if (!val.refid && val.approvalstate) {
          if (val.approvalstate === 5) {
            val.approvalBoolean = true
          } else {
            val.approvalBoolean = false
          }
        } else {
          val.approvalBoolean = false
        }
        //  验证
        if (!val.refid && val.approvalstate) {
          if (val.approvalstate === 100) {
            val.verification = true
          } else {
            val.verification = false
          }
        } else {
          val.verification = false
        }
        //  删除
        if (val.refid) {
          val.amputate = true
        } else {
          if (val.repairstate === 0) {
            val.amputate = true
          } else {
            val.amputate = false
          }
        }
      })
    }
  },
  data () {
    return {
      tabulationData: '',
      review_boolean: false,
      // 获取点击的id
      click_id: '',
      regionProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      regionDate: [],
      regionModel: [],
      tableData: [],
      AuditstatusDate: [],
      Auditstatus: [],
      examineBoolean: false,
      lookoverBoolean: false,
      modifyBoolean: false,
      quipmentBoolean: false,
      verificationBoolean: false,
      examineData: '',
      reworkData: '',
      examination: '',
      taskState: [],
      approvalStatus: [],
      quipmentData: '',
      maintenance: '',
      maintenanceData: '',
      JurisdictionSelect: '',
      JurisdictionInsert: '',
      JurisdictionDelete: '',
      JurisdictionCheck: '',
      repairtasksName: '',
      JurisdictionApproval: '',
      JurisdictionAssign: ''
    }
  },
  created () {
    // 权限
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_gzwx') {
        this.JurisdictionSelect = val.select
        this.JurisdictionApproval = val.approval
        this.JurisdictionDelete = val.delete
        this.JurisdictionCheck = val.check
        this.JurisdictionAssign = val.assign
      }
    })
    //  获取区域
    this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.regionDate = response.data.data
      }
    })
    //  审核状态
    //  this.axios.post(maintainRepairgetRepariTaskApprovalItem()).then((response) => {
    this.axios.post(maintainRepairgetgetRepariTaskQueryApprovalItem()).then((response) => {
      if (response.data.code === 0) {
        this.AuditstatusDate = response.data.data
      }
    })
    //  获取列表
    this.axios.post(maintainRepairfindRepairTasks(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.functionalJudgment(response.data.data)
        this.tabulationData = response.data.data
      }
    })
    //  获取处理状态
    this.axios.post(maintainRepairgetRepairStates()).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data
        this.maintenance = data.length === 0 ? [] : data.slice(0, data.length - 1)
      }
    })
    // 审批状态
    this.axios.post(maintainRepairgetRepariTaskApprovalItem()).then((response) => {
      if (response.data.code === 0) {
        this.approvalStatus = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    overflow hidden
    margin 12px
    position relative
    background rgba(0,0,0,0.45)
  .subject_top
    margin 10px
    overflow hidden
    background #111a28
    padding 20px 0
    display flex
  .ul_input
    padding-left 10px
    overflow hidden
    float left
    position relative
    display flex
  .li_input
    display flex
    float left
    overflow hidden
    margin-left 20px
    .div_p
      float left
      font-size $color-text-title
      color $color-text-title
      margin-right 10px
      line-height 29px
    .div_input
      float left
      width 167px
  .button
    display flex
    float right
    overflow hidden
    position relative
    margin-left 60px
    text-align center
    line-height 36px
    font-size $font-size-medium
    color $color-text-title
    .query
      queryDiv()
    .newly
      width 106px
      height 36px
      border-radius 5px
      float right
      background $color-background-newly
      cursor pointer
      transition .2s
      &:hover
        background #4baabe
    .introduce
      width 106px
      height 36px
      border-radius 5px
      float left
      margin-right 30px
      background $color-background-introduce
      cursor pointer
      transition .2s
      &:hover
        background #4275ba
  .table
    width 100%
    overflow hidden
    position relative
    color $color-text-title
    font-size $font-size-medium
    text-align left
  .header_ul
    width 100%
    overflow hidden
    position relative
    color $color-header-b-normal
    font-size $font-size-medium
    padding 4px 0
    line-height 32px
    background #354d76
  .header_li
    float left
    width 22.5%
    .admin_show
      overflow hidden
      font-size $font-size-small
      color $color-text-title
      .admin_selve
        width 106px
        float left
        margin-right 35px
        .admin_select
          width: 100px
          overflow: hidden
          padding: 5px 0
          border-radius: 5px
          padding-left 6px
      .admin_preservation
        float: left
        margin 4px 18px 0 0
        width 72px
        height 24px
        text-align center
        line-height 24px
        border-radius 5px
        cursor pointer
        background $color-background-newly
      .cancel
        float left
        width 72px
        margin-top 4px
        height 24px
        text-align center
        line-height 24px
        border-radius 5px
        cursor pointer
        background $color-background-introduce
  .header_lithree
    float left
    width 9%
    height 32px
    padding-left 1%
  .repair_li
    width 6%
    padding-left 1%
    height 32px
    float left
    text-align left
  .repair_lifvie
    width 5%
    height 32px
    float left
    text-align left
  .repair_litwo
    width 10%
    height 32px
    float left
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-align center
  .repair_lithree
    width 6%
    height 32px
    float left
    text-align center
  .repair_lifour
    width 14%
    float left
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    height 32px
    text-align center
  .repair_lifive
    width 16%
    float left
    height 32px
    overflow hidden
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
    cursor pointer
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
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-barckground-transparent
    z-index 11
    overflow hidden
  .header_p_eight
    float left
    margin-right 20px
    color $color-background-query
  .header_p_ten
    cursor pointer
    float left
    margin-right 20px
    color $color-background-newly
  .header_p_twelve
    cursor pointer
    float left
    margin-right 20px
    color #3279a6
  .header_p_thirteen
    cursor pointer
    float left
    margin-right 20px
    color $color-text-tile-complete
  .header_pe_quipment
    float left
    margin-right 20px
    color #32a697
  .header_p_eleven
    cursor pointer
    float left
    margin-right 20px
    color #cc5966
  .subject_bottomDIv
    margin 10px
    position relative
    overflow hidden
    min-height 800px
    background rgba(000,000,000,.35)
  .threelevel_litwo_ptwo
    color #444
    cursor initial
  .div_inputTwo
    float left
    width 300px
    line-height 26px
    display flex
  .table_liRepeat
    background #3a271c!important
  .div_inputTow
    float left
    margin-top 1px
    width 167px
  .textAlign
    text-align center
</style>

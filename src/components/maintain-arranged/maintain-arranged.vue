<template>
  <div class="subject">
    <div class="subjectDiv">
      <div v-if="JurisdictionInsert" @click="superinduce" class="conserve">
        新 增
      </div>
    </div>
    <section class="subject_bottomDIv">
      <ul class="header_ul">
        <li class="repair_li">
          计划名称
        </li>
        <li class="repair_litwo">
          任务类型 <i class="el-icon-caret-bottom"></i>
          <div class="headerDiv">
            <el-select size="mini" @change="scheduleChange" v-model="scheduleData" placeholder="请选择" >
              <el-option
                v-for="item in worktypeData"
                :key="item.worktypeid"
                :label="item.worktypename"
                :value="item.worktypeid">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="repair_litwo">
          计划编号
        </li>
        <li class="repair_litwo">
          计划状态<i class="el-icon-caret-bottom"></i>
          <div class="headerDiv">
            <el-select size="mini" @change="initPlan" v-model="stateData" placeholder="请选择" >
              <el-option
                v-for="item in stateOptions"
                :key="item.stateId"
                :label="item.stateName"
                :value="item.stateId">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="repair_litwo">
          定制时间
        </li>
        <li class="repair_litwo">
          创建人
        </li>
        <li class="repair_lithree">
          计划说明
        </li>
        <li class="repair_liFour">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li class="table_li" :key="index" v-for="(item, index) in arrangedData">
          <ul class="inline_ul">
            <li :title="item.planname" class="repair_li">
              {{item.planname}}
            </li>
            <li class="repair_litwo">
              {{conversion(item.worktypeid)}}
            </li>
            <li :title="item.plancode" class="repair_litwo">
              {{item.plancode}}
            </li>
            <li class="repair_litwo">
              {{conversionPlanState(item.planstate)}}
            </li>
            <li :title="item.createTime" class="repair_litwo">
              {{(item.createTime)}}
            </li>
            <li :title="item.creatername" class="repair_litwo">
              {{item.creatername}}
            </li>
            <li :title="item.plandesc" class="repair_lithree">
              {{item.plandesc}}
            </li>
            <li class="repair_liFour">
              <div v-if="JurisdictionUpdate">
                <p v-if="item.planstate !== 100"  @click.stop="setPlan(item.checkplanid)" class="header_p_eight threelevel_litwo_p">
                  启用
                </p>
                <p v-if="item.planstate === 100" class="header_p_eleven" @click.stop="setPlan(item.checkplanid)" >禁用</p>
              </div>
              <div v-if="JurisdictionUpdate">
                <p @click.stop="examine(item.checkplanid)" class="header_p_ten">修改</p>
              </div>
              <div v-if="JurisdictionSelect">
                <p @click.stop="selectPlan(item.checkplanid)" class="header_p_twelve">查看</p>
              </div>
              <!--<div v-if="JurisdictionInsert">-->
                <!--<p v-if="item.planstate !== 5" class="header_p_twelve" @click.stop="generate(item.checkplanid)">生成计划</p>-->
                <!--<p v-if="item.planstate === 5" class="header_p_fourteen">生成计划</p>-->
              <!--</div>-->
              <div v-if="JurisdictionDelete">
                <p class="header_p_thirteen" @click.stop="amputate(item.checkplanid)">删除</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <!--修改-->
    <section v-if="review_boolean" @click.stop class="review">
      <lookup @lookup="Lookup" v-if="review_boolean" :showFlag="showFlag" :checkplan="CheckPlan" :Checkplanid="CheckPlanid"></lookup>
    </section>
    <!--审批-->
    <section v-if="examinaBoolean" class="review">
      <examination :Checkplaniddata="itemCheckplanid" v-if="examinaBoolean" @closeup="Closeup"></examination>
    </section>
    <!--新增-->
    <section v-if="newlybuildBoolean" class="review">
      <newlybuild v-if="newlybuildBoolean" @build="Build"></newlybuild>
    </section>

  </div>
</template>

<script>
import lookup from '../arrangedChild-operation/arrangedChild-lookup'
import examination from '../arrangedChild-operation/arrangedChild-examination'
import newlybuild from '../arrangedChild-operation/arrangedChild-newlybuild'
import { dateTransfer } from '../../common/js/utils'
import { maintainArrangsetPlan, maintainArrangeddeletePlan, maintainArrangegetAllPlans, maintainArranggetCheckPlan, getPlanState, maintainArranggetAllPlanTypes, createChecktask, maintainArrangegetAllPlansTwo } from '../../api/user'
import { projectMixin, loadingMixin } from 'common/js/mixin'
export default {
  name: 'maintain-arranged',
  mixins: [projectMixin, loadingMixin],
  components: {
    lookup,
    examination,
    newlybuild
  },
  methods: {
    scheduleChange (el) {
      el = el === -999 ? '' : el
      this.maintainArrangegetAll(this.maintainProject, el)
    },
    init () {
      this.initPlan()
    },
    generate (checkplanid) {
      this.$confirm('此操作将生成该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(createChecktask(checkplanid)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '生成成功!'
            })
          } else {
            this.$message.error(`${response.data.message}`)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    superinduce () {
      this.newlybuildBoolean = true
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
    amputate (checkplanid) {
      // 删除
      this.$confirm('此操作将删除该计划, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(maintainArrangeddeletePlan(checkplanid)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initPlan()
          } else {
            this.$message({
              message: `${response.data.message}`,
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    question (checkplanid, data) {
      this.itemCheckplanid = checkplanid
      this.examinaBoolean = true
    },
    Closeup (ev) {
      this.initPlan()
      this.examinaBoolean = ev
    },
    Build (ev) {
      this.initPlan()
    },
    Lookup (ev) {
      this.initPlan()
    },
    examine (checkplanid) {
      this.CheckPlanid = checkplanid
      this.showFlag = false
      this.axios.post(maintainArranggetCheckPlan(checkplanid)).then((response) => {
        if (response.data.code === 0) {
          this.CheckPlan = response.data.data
          this.review_boolean = true
        }
      })
    },
    // 查看计划
    selectPlan (checkplanid) {
      this.CheckPlanid = checkplanid
      this.showFlag = true
      this.axios.post(maintainArranggetCheckPlan(checkplanid)).then((response) => {
        if (response.data.code === 0) {
          this.CheckPlan = response.data.data
          this.review_boolean = true
        }
      })
    },
    conversion (worktypeid) {
      for (let i = 0; i < this.worktypeData.length; i++) {
        if (this.worktypeData[i].worktypeid === worktypeid) {
          return this.worktypeData[i].worktypename
        }
      }
    },
    conversionPlanState (planstate) {
      for (let i = 0; i < this.planStateData.length; i++) {
        if (this.planStateData[i].value === planstate) {
          return this.planStateData[i].name
        }
      }
    },
    // 设置计划可用或不可用
    setPlan (planId) {
      this.$confirm('是否操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(maintainArrangsetPlan(planId)).then((response) => {
          if (response.data.code === 0) {
            this.initPlan()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 初始化
    initPlan () {
      this.axios.post(maintainArrangegetAllPlans(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length) {
            response.data.data.forEach((val) => {
              val.createTime = dateTransfer(val.createtime)
            })
            this.arrangedData = response.data.data.filter(t => {
              if (this.stateData === 999) {
                return t
              }
              return t.planstate === this.stateData
            })
            this.newlybuildBoolean = false
            this.review_boolean = false
          } else {
            this.arrangedData = []
            this.arrangedData = response.data.data
            this.newlybuildBoolean = false
            this.review_boolean = false
          }
        }
      })
    },
    // 查询事件
    maintainArrangegetAll (maintainProject, el) {
      el = !el ? '' : el
      this.axios.post(maintainArrangegetAllPlansTwo(maintainProject, el)).then((response) => {
        if (response.data.code === 0) {
          this.arrangedData = response.data.data
          this.review_boolean = false
          this.examinaBoolean = false
          this.newlybuildBoolean = false
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
      tableData: [],
      AuditstatusDate: [],
      Auditstatus: [],
      examineBoolean: false,
      lookoverBoolean: false,
      modifyBoolean: false,
      quipmentBoolean: false,
      examineData: '',
      reworkData: '',
      examination: '',
      taskState: [],
      approvalStatus: [],
      quipmentData: '',
      maintenanceData: '',
      maintenance: [],
      repairCheckList: [],
      ownerProps: {
        children: 'subOrgnizations',
        label: 'organizationName'
      },
      proprietorCheckList: [],
      maintenanceList: [],
      arrangedData: '',
      examinaBoolean: false,
      itemCheckplanid: '',
      newlybuildBoolean: false,
      CheckPlan: '',
      CheckPlanid: '',
      worktypeData: [],
      planStateData: [],
      JurisdictionInsert: '',
      JurisdictionUpdate: '',
      JurisdictionDelete: '',
      JurisdictionApproval: '',
      scheduleData: '',
      showFlag: false, // true查看计划信息 false 修改计划信息
      // 计划状态
      stateOptions: [{
        stateId: 999,
        stateName: '全部'
      }, {
        stateId: 100,
        stateName: '启用'
      }, {
        stateId: 5,
        stateName: '禁用'
      }],
      stateData: 999
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'plan') {
        this.JurisdictionApproval = val.approval
        this.JurisdictionUpdate = val.update
        this.JurisdictionDelete = val.delete
        this.JurisdictionInsert = val.insert
        this.JurisdictionSelect = val.select
      }
    })
    this.initPlan()
    this.axios.post(maintainArranggetAllPlanTypes(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        let obj = {
          worktypename: '所有',
          worktypeid: -999
        }
        response.data.data.unshift(obj)
        this.worktypeData = response.data.data
      }
    })
    // 获取计划状态
    this.axios.post(getPlanState()).then((response) => {
      if (response.data.code === 0) {
        this.planStateData = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    .subjectDiv
      overflow hidden
      padding 20px 0
      background #111a28
      position relative
      .subjectLeft
        float left
        margin-left 20px
        margin-right 50px
        overflow hidden
        .subjectP
          color $color-text-title
          line-height 30px
          float left
          font-size $font-size-medium
      .conserve
        float right
        color $color-text-title
        font-size $font-size-medium
        newlyDiv()
      .subjectRight
        float left
    min-height 900px
    position relative
    background rgba(000, 000, 000, .45)
    margin 12px
    overflow auto
  .subject_top
    margin 38px 15px 20px 15px
    overflow hidden
    position relative
    background #111a28
    padding 30px 0 30px
  .ul_input
    margin-left 30px
    overflow hidden
    float left
    position relative
    display flex
  .li_input
    display flex
    float left
    overflow hidden
    margin-right 20px
    .div_p
      float left
      font-size $color-text-title
      color $color-text-title
      margin-right 10px
      line-height 40px
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
    width 16%
    padding-left 1%
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
    position relative
  .repair_lithree
    width 20%
    padding-right 1%
    height 32px
    float left
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    text-align left
  .repair_liFour
    width 11%
    padding-right 1%
    height 32px
    float left
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    text-align center
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
    cursor:pointer
    float left
    margin-right 20px
    color $color-background-query
  .header_p_ten
    cursor:pointer
    float left
    margin-right 20px
    color $color-background-newly
  .header_p_twelve
    cursor:pointer
    float left
    margin-right 20px
    color $color-background-introduce
  .header_p_fourteen
    float left
    margin-right 20px
    color $color-text-tile-false
  .header_pe_quipment
    float left
    margin-right 20px
    color #32a697
  .header_p_eleven
    cursor pointer
    float left
    margin-right 20px
    color #ffaa00
  .header_p_twelve
    cursor pointer
    float left
    margin-right 20px
    color #3acf76
  .header_p_thirteen
    cursor pointer
    float left
    color #cc5966
  .subject_bottomDIv
    margin 12px
    background rgba(000,000,000,.35)
    min-height 900px
    position relative
    overflow hidden
  .superinduce
    position fixed
    bottom 80px
    left 50%
    margin-left -53px
    background $color-background-newly
    color $color-text
    text-align center
    line-height 36px
    width 106px
    height 36px
    margin-right 20px
    border-radius 5px
    cursor pointer
    transition .2s
  .superinduce:hover
    background #4baabe
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
      width 228px
      overflow-y scroll
      height 130px
  .explainBottom
    init()
    margin-top 50px
    overflow hidden
    text-align center
  .repair_lithree div
    float left
    overflow hidden
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
  .headerDiv
    position absolute
    top 0
    left 0
    overflow hidden
    opacity 0
    z-index 11
    width 100%
</style>

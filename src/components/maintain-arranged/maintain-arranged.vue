<template>
  <div class="subject">
    <section class="subject_bottomDIv">
      <ul class="header_ul">
        <li class="repair_li">
          计划名称
        </li>
        <li class="repair_litwo">
          计划类型
        </li>
        <li class="repair_litwo">
          计划编号
        </li>
        <li class="repair_litwo">
          计划状态
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
        <li class="repair_lithree">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li class="table_li" :key="index" v-for="(item, index) in arrangedData">
          <ul class="inline_ul">
            <li class="repair_li">
              {{item.planname}}
            </li>
            <li class="repair_litwo">
              {{conversion(item.worktypeid)}}
            </li>
            <li class="repair_litwo">
              {{item.plancode}}
            </li>
            <li class="repair_litwo">
              {{conversionPlanState(item.planstate)}}
            </li>
            <li class="repair_litwo">
              {{item.createtime}}
            </li>
            <li class="repair_litwo">
              {{item.creatername}}
            </li>
            <li class="repair_lithree">
              {{item.plandesc}}
            </li>
            <li class="repair_lithree">
              <p v-if="item.planstate === 0"  @click.stop="question(item.checkplanid, item)" class="header_p_eight threelevel_litwo_p">
                审核
              </p>
              <p v-if="item.planstate !== 0" class="header_p_fourteen" >审核</p>
              <p @click.stop="examine(item.checkplanid)" class="header_p_ten">修改</p>
              <p class="header_p_eleven" @click.stop="amputate(index, arrangedData,item.checkplanid)">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section v-if="review_boolean" @click.stop class="review">
      <lookup @lookup="Lookup" v-if="review_boolean" :checkplan="CheckPlan" :Checkplanid="CheckPlanid"></lookup>
    </section>
    <section v-if="examinaBoolean" class="review">
      <examination :Checkplaniddata="itemCheckplanid" v-if="examinaBoolean" @closeup="Closeup"></examination>
    </section>
    <section v-if="newlybuildBoolean" class="review">
      <newlybuild v-if="newlybuildBoolean" @build="Build"></newlybuild>
    </section>
    <div @click="superinduce" class="superinduce">
      新 增
    </div>
  </div>
</template>

<script>
import lookup from '../arrangedChild-operation/arrangedChild-lookup'
import examination from '../arrangedChild-operation/arrangedChild-examination'
import newlybuild from '../arrangedChild-operation/arrangedChild-newlybuild'
import { maintainArrangeddeletePlan, maintainArrangegetAllPlans, maintainArranggetCheckPlan, maintainArranggetAllApprovalItems, maintainArranggetAllPlanTypes } from '../../api/user'
export default {
  name: 'maintain-arranged',
  components: {
    lookup,
    examination,
    newlybuild
  },
  methods: {
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
    amputate ($index, content, checkplanid) {
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
            content.splice([$index], 1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    question (checkplanid, data) {
      this.itemCheckplanid = checkplanid
      this.examinaBoolean = true
    },
    Closeup (ev) {
      this.examinaBoolean = ev
    },
    Build (ev) {
      this.axios.post(maintainArrangegetAllPlans()).then((response) => {
        if (response.data.code === 0) {
          this.arrangedData = response.data.data
          this.newlybuildBoolean = false
        }
      })
    },
    Lookup (ev) {
      this.axios.post(maintainArrangegetAllPlans()).then((response) => {
        if (response.data.code === 0) {
          this.arrangedData = response.data.data
          this.review_boolean = false
        }
      })
    },
    examine (checkplanid) {
      this.CheckPlanid = checkplanid
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
      planStateData: []
    }
  },
  created () {
    this.axios.post(maintainArrangegetAllPlans()).then((response) => {
      if (response.data.code === 0) {
        this.arrangedData = response.data.data
      }
    })
    this.axios.post(maintainArranggetAllPlanTypes()).then((response) => {
      if (response.data.code === 0) {
        this.worktypeData = response.data.data
      }
    })
    // 获取计划状态
    this.axios.post(maintainArranggetAllApprovalItems()).then((response) => {
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
    overflow hidden
    min-height 760px
    max-height 750px
    position relative
    padding-bottom 70px
    background #141e30
    overflow-y scroll
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
    width 9%
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
  .repair_lithree
    width 20%
    height 32px
    float left
    text-align left
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
    background rgba(000,000,000,.9)
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
    color $color-text-tile-handle
  .header_pe_quipment
    float left
    margin-right 20px
    color #32a697
  .header_p_eleven
    cursor:pointer
    float left
    margin-right 20px
    color #83292b
  .subject_bottomDIv
    margin 15px
    position relative
    overflow hidden
  .superinduce
    position fixed
    bottom 50px
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
</style>

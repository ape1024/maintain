<template>
  <div class="inline_fill">
    <ul class="list_heder">
      <li @click.stop class="list_heder_litwo">
        <span class="list_data_litwoSpan">
          <el-checkbox @change="checkedChange(checked)" v-model="checked"></el-checkbox>
        </span>
        设备名称
      </li>
      <li class="list_heder_li">
        待巡检
      </li>
      <li class="list_heder_li">
        已巡检
      </li>
      <li class="list_heder_li">
        问题数量
      </li>
      <li class="list_heder_li">
        待审核
      </li>
      <li class="list_heder_li">
        已分配任务项
      </li>
      <li class="list_heder_li">
        操作
      </li>
      <li @click.stop="batch" class="list_heder_li_three">
        批量审批
      </li>
    </ul>
    <ul class="inline_list">
      <li :key="index" v-for="(item,index) in dailyData" class="inline_list_li" @click.stop>
        <ul :id="item.id" :class="[item.error + item.problem > 0?'list_dataUl':'list_data']">
          <li class="list_data_litwo">
            <span class="list_data_litwoSpan">
                <el-checkbox v-model="item.judge" v-bind:disabled="item.available && item.repeat === 0"></el-checkbox>
            </span>
            {{item.deviceName}}
          </li>
          <li class="list_data_li">
            {{item.sum - item.finish}}
          </li>
          <li class="list_data_li">
            {{item.finish}}
          </li>
          <li class="list_data_li">
            {{item.error + item.problem}}
          </li>
          <li class="list_data_li">
            {{item.waitapproval}}
          </li>
          <li class="list_data_li">
            {{item.assign}}
          </li>
          <li class="list_data_li">
            <p v-if="JurisdictionInsert" @click.stop="examine(item.deviceID)" class="list_data_li_p">审核</p>
            <!--<p @click.stop="distriBoolean" class="list_data_li_ptwo">快速分配</p>-->
            <p @click.stop="ArrBoolean(item.deviceID)" class="list_data_li_ptwo">
              快速分配
            </p>
          </li>
        </ul>
        <!--第三级，目前不需要了-->
        <!--<transition enter-active-class="fadeInUp"-->
        <!--leave-active-class="fadeOutDown">-->
        <!--<div v-show="item.active" class="threelevel">-->
        <!--<dailythree></dailythree>-->
        <!--</div>-->
        <!--</transition>-->
      </li>
      <section v-if="examineBoolean" @click.stop class="review">
        <!--审核-->
        <childExamine :examine="examineBoolean"  :examineName="taskName" @examineMine="examineDistribution" :taskidCode="taskid" :equipmentCode="equipmentID" @mine="mineSwitch"></childExamine>
      </section>
      <!--安排任务-->
      <section v-if="distributionBoolean" @click.stop class="distribution">
        <childDistribution :getrepairDate="getrepair" :instruction="instructionData" :distriBoolean="distributionBoolean" :equipment="equipmentID"  @dist="Dist"></childDistribution>
      </section>
      <!--安排任务查看-->
      <section v-if="ArrangetheviewBoolean" @click.stop  class="review">
        <childArrangethview :examine="examineBoolean"  :examineName="taskName" @examineMine="examineDistribution" :taskidCode="taskid" :equipmentCode="equipmentID" @mine="arrangSwitch"></childArrangethview>
      </section>
    </ul>
  </div>
</template>

<script>
import dailythree from '../dailyChild-three/dailyChild-three'
import childExamine from '../dailyChild-operation/dailyChild-examine'
import childArrangethview from '../dailyChild-operation/daily-Arrangetheview'
import childDistribution from '../dailyChild-operation/dailyChild-distribution'
import { maintainDailygetRepairTypes, batchApprovalCheckTaskByDeviceids } from '../../api/user'
export default {
  name: 'dailyChild-two',
  props: ['dailyData', 'taskid', 'taskName'],
  components: {
    dailythree,
    childExamine,
    childDistribution,
    childArrangethview
  },
  data () {
    return {
      // 审核 显示/隐藏
      examineBoolean: false,
      // 快速分配
      distributionBoolean: false,
      ArrangetheviewBoolean: false,
      content: [],
      examineDate: '',
      getrepair: '',
      instructionData: '',
      // 点击哪个设备的id
      equipmentID: '',
      JurisdictionInsert: '',
      JurisdictionAssign: '',
      checked: false,
      dailyChild: ''
    }
  },
  methods: {
    // selectStyle (item, index, content, $event) {
    //   $event.cancelBubble = true
    //   this.content.forEach(function (item) {
    //     if (index !== item.index) {
    //       item.active = false
    //     }
    //   })
    //   item.active = !item.active
    // },
    batch () {
      let arr = []
      this.dailyData.forEach((val) => {
        if (val.judge === true && val.available === false) {
          arr.push(val.deviceID)
        }
      })
      if (!arr.length) {
        this.$message({
          message: '请选择',
          type: 'warning'
        })
        return false
      }
      let token = JSON.parse(window.sessionStorage.token)
      let taskid = this.taskid
      let deviceids = arr.join(',')
      this.axios.post(batchApprovalCheckTaskByDeviceids(token, taskid, deviceids)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '审批成功',
            type: 'success'
          })
          this.$emit('examinationApproval', this.taskid)
        } else {
          this.$message.error('审批失败')
        }
      })
    },
    arrangSwitch (ev) {
      this.ArrangetheviewBoolean = ev
      this.$emit('examinationApproval', this.taskid)
    },
    ArrBoolean (deviceID) {
      this.equipmentID = deviceID
      this.ArrangetheviewBoolean = true
    },
    checkedChange (data) {
      if (data) {
        this.dailyData.forEach((val) => {
          if ((val.error + val.problem) <= 0) {
            val.judge = true
          }
        })
      } else {
        this.dailyData.forEach((val) => {
          val.judge = false
        })
      }
    },
    mineSwitch (ev) {
      this.examineBoolean = ev
      this.$emit('examinationApproval', this.taskid)
    },
    // 开启审核
    examine (deviceID) {
      this.equipmentID = deviceID
      this.examineBoolean = true
    },
    examineDistribution (ev) {
      this.instructionData = ev
      this.ArrangetheviewBoolean = false
      this.examineBoolean = false
      this.axios.post(maintainDailygetRepairTypes()).then((response) => {
        if (response.data.code === 0) {
          this.getrepair = response.data.data
          this.distributionBoolean = true
        }
      })
    },
    // 快速分配
    distriBoolean () {

    },
    // 审核
    Mine (ev) {
      this.examineBoolean = ev
      this.$emit('examinationApproval', this.taskid)
    },
    // 快速分配
    Dist (ev) {
      this.distributionBoolean = ev
      this.$emit('examinationApproval', this.taskid)
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_xj') {
        this.JurisdictionInsert = val.insert
        this.JurisdictionAssign = val.assign
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
    background #141e30
  .subject_top
    margin 38px 15px 20px 15px
    overflow hidden
    background #111a28
    padding 38px 0 58px
  .ul_input
    margin-left 30px
    overflow hidden
    float left
    position relative
  .li_input
    float left
    overflow hidden
    margin-right 20px
    .div_p
      float left
      font-size $color-text-title
      color $color-text-title
      margin-right 10px
      line-height: 40px;
    .div_input
      float left
      width 167px
  .button
    float right
    overflow hidden
    position relative
    margin-right 60px
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
    padding 12px 0
    background #354d76
  .header_li
    float left
    width 7.2%
  .header_litwo
    float left
    width 10.3%
  .header_lithree
    float left
    width 6.4%
    padding-left 1%
  .header_li_four
    float left
    width 7.2%
    color $color-text-tile-project
  .header_li_five
    float left
    width 7.2%
    color  $color-text-tile-complete
  .header_li_six
    float left
    width 7.2%
    color $color-text-tile-fault
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
    background #0b111a
    .inline_fill
      margin 6px 10px
      overflow hidden
      position relative
      .list_heder
        margin 4px 0
        overflow hidden
        position relative
        background #354d76
        line-height 40px
        height 40px
        .list_heder_li
          float left
          text-align center
          width 12%
          overflow hidden
        .list_heder_litwo
          float left
          width 14%
          text-align left
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
      .list_dataUl
        width 100%
        padding 12px 0
        overflow hidden
        background #3a271c
      .list_data
        width 100%
        padding 12px 0
        overflow hidden
        transition .2s
        &:hover
          background #253147
      .list_data_li
        float left
        text-align center
        overflow hidden
        width 12%
      .list_data_litwo
        float left
        text-align left
        width 14%
        overflow hidden
        padding-left 2%
      .list_data_li_p
        display inline-block
        margin 0 auto
        color #3279A6
        cursor pointer
      .list_data_li_ptwo
        display inline-block
        color $color-text-tile-project
        cursor pointer
  .threelevel
    margin 0 10px
    overflow hidden
    position relative
    color $color-text-title
    font-size $font-size-medium
    .threelevel_header
      margin: 4px;
      overflow: hidden;
      position: relative;
      padding: 12px 0;
      background: #354d76;
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
      margin: 4px;
      overflow: hidden;
      position: relative;
      .threelevel_list_li
        width 100%
        overflow hidden
        position relative
        .threelevel_list_ul
          width 100%
          overflow hidden
          padding: 12px 0;
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
  .distribution
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background transparent
    z-index 11
    overflow hidden
  .list_heder_li_three
    float left
    cursor pointer
    text-align center
    width 12%
    background #3279a6
    transition .2s
    overflow hidden
    &:hover
      background #4b92bf
  .list_data_litwoSpan
    margin-right 10px
</style>

<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域：</p>
          <div class="div_input">
              <el-cascader
                size="mini"
                :options="regionDate"
                v-model="regionModel"
                :props="regionProps"
                change-on-select>>
              </el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">设备类型</p>
          <div class="div_input">
            <el-cascader
              size="mini"
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
            <li class="header_lithree">{{item.taskName}}</li>
            <li class="header_li">{{fmtDate(item.startTime)}}</li>
            <li class="header_li">{{fmtDate(item.endTime)}}</li>
            <li class="header_litwo">{{item.sum}}</li>
            <li class="header_li_five">{{item.finish}}</li>
            <li class="header_li_six">{{item.error + item.problem}}</li>
            <li class="header_li_Seven">
              {{item.waitapproval}}
            </li>
            <li class="header_litwo">{{item.assign}}</li>
          </ul>
          <transition enter-active-class="fadeInUp"
            leave-active-class="fadeOutDown">
          <div v-if="item.flag" class="inline_div">
              <dailytwo :taskid="item.taskID" :taskName="item.taskName" :dailyData="dailyChild" @examinationApproval="ExaminationApproval"></dailytwo>
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
import { findAreasTreeByProjectid, findAllDeviceType, getTaskQueryApprovalItems, maintainDailyCurrentTaskStat, maintainDailygetCurrentTaskDeviceData, maintainDailygetCurrentTaskDeviceStat } from '../../api/user'
// 修改
// import modify from '../dailyChild-operation/dailyChild-modify'
export default {
  name: 'maintain-daily',
  components: {
    dailytwo
    // modify
  },
  methods: {
    ExaminationApproval (el) {
      this.axios.post(maintainDailygetCurrentTaskDeviceStat(el)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length !== 0) {
            response.data.data.forEach((val) => {
              val.judge = false
              if ((val.error + val.problem) <= 0 && (val.waitapproval > 0)) {
                val.available = false
              } else {
                val.available = true
              }
            })
            this.dailyChild = response.data.data
          } else {
            this.dailyChild = response.data.data
          }
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
        console.log(this.regionModel)
        let clickId = this.click_id
        let areaid = this.regionModel.length !== 0 ? this.regionModel[this.regionModel.length - 1] : ''
        console.log(areaid)
        let basedevicecode = this.equipmentDate.length !== 0 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        basedevicecode = basedevicecode === null ? '' : basedevicecode
        let approvalstates = this.Auditstatus.length !== 0 ? this.Auditstatus.join() : ''
        console.log(clickId)
        this.axios.post(maintainDailygetCurrentTaskDeviceData(clickId, areaid, basedevicecode, approvalstates)).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            if (response.data.data.length !== 0) {
              response.data.data.forEach((val) => {
                val.judge = false
                if ((val.error + val.problem) > 0) {
                  val.available = true
                } else {
                  val.available = false
                }
              })
              this.dailyChild = response.data.data
            } else {
              this.dailyChild = response.data.data
            }
            console.log(this.dailyChild)
          }
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
        console.log(item)
        this.tableDatataskStat.forEach((val) => {
          val.flag = false
        })
        let itemAreaid = item.taskID
        this.click_id = itemAreaid
        this.axios.post(maintainDailygetCurrentTaskDeviceStat(itemAreaid)).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data.length !== 0) {
              response.data.data.forEach((val) => {
                val.judge = false
                if ((val.error + val.problem) <= 0 && (val.waitapproval > 0)) {
                  val.available = false
                } else {
                  val.available = true
                }
              })
              this.dailyChild = response.data.data
              item.flag = !item.flag
            } else {
              this.dailyChild = response.data.data
              item.flag = !item.flag
            }
          }
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
      // $event.cancelBubble = true
      this.modifyBoolean = true
    },
    Say (ev) {
      this.modifyBoolean = ev
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
      dailyChild: ''
    }
  },
  created () {
    //  获取区域
    let projectid = window.localStorage.pattern
    this.axios.post(findAreasTreeByProjectid(projectid)).then((response) => {
      if (response.data.code === 0) {
        this.regionDate = response.data.data
      }
    })
    //  获取设备类别
    this.axios.post(findAllDeviceType()).then((response) => {
      if (response.data.code === 0) {
        this.equipment = response.data.data
      }
    })
    //  审核状态
    console.log('----------------')
    console.log(getTaskQueryApprovalItems())
    this.axios.post(getTaskQueryApprovalItems()).then((response) => {
      if (response.data.code === 0) {
        this.AuditstatusDate = response.data.data
        response.data.data.forEach((val) => {
          console.log(val)
          if (val.isdefault === 1) {
            this.Auditstatus.push(val.value)
          }
        })
      }
    })
    //  展示任务
    this.axios.post(maintainDailyCurrentTaskStat(2, projectid)).then((response) => {
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
     background rgba(000,000,000, .45)
    .subject_top
        margin 38px 15px 20px 15px
        overflow hidden
        background #111a28
        padding 38px 0 58px
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
           line-height: 30px;
          .div_input
           float left
           width 167px
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
       width 12%
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
       width 12%
       line-height 32px
       height 32px
       text-align center
       color  $color-text-tile-complete
     .header_li_six
       float left
       width 12%
       line-height 32px
       height 32px
       text-align center
       color  $color-text-tile-fault
     .header_li_Seven
       float left
       width 12%
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
     background #0b111a
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
  .div_inputTwo
    float left
    width 300px
    display flex
    .el-select
     width 100%
</style>

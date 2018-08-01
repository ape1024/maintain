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
              change-on-select
            ></el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">处理状态</p>
          <div class="div_input">
            <el-select size="mini" v-model="dispose" placeholder="请选择">
              <el-option
                v-for="item in disposeData"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">确认状态</p>
          <div class="div_input">
            <el-select size="mini" v-model="identification" placeholder="请选择">
              <el-option
                v-for="item in identificationData"
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
        <div class="query" @click="query">
          查 询
        </div>
      </div>
    </section>
    <section class="subject_bottom">
      <ul class="header_ul">
        <li class="header_lithree">
          设施名称
        </li>
        <li class="header_litwo">
          设施位置
        </li>
        <li class="header_li">
          设备数量
        </li>
        <li class="header_litwo">
          异常情况
        </li>
        <li class="header_litwo">
          反馈部门
        </li>
        <li class="header_li">
          反馈人员
        </li>
        <li class="header_li">
          反馈时间
        </li>
        <li class="header_li">
          处理状态
        </li>
        <li class="header_li">
          确认状态
        </li>
        <li class="header_litwo">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li v-for="(item,index) in exhibition" class="table_li" :key="index">
          <ul class="inline_ul">
            <li class="header_lithree">{{item.devicename}}</li>
            <li class="header_litwo">{{item.areaname}}{{item.position}}</li>
            <li class="header_li">{{item.devicecount}}</li>
            <li class="header_litwo">{{item.feedbackinfo}}</li>
            <li class="header_litwo">{{item.feedbackorgname}}</li>
            <li class="header_li"></li>
            <li class="header_li">{{item.createtime}}</li>
            <li class="header_li">{{item.feedbackstatename}}</li>
            <li class="header_li">{{item.comfirmstatename}}</li>
            <li class="header_litwo">
              <p v-if="JurisdictionSelect" @click.stop="examine(item.ID)" class="header_p_ten">查看</p>
              <p v-if="JurisdictionInsert" @click.stop="modify(item.ID)" class="header_p_twelve">
                确认
              </p>
              <p v-if="JurisdictionInsert" @click.stop="question(item.ID)" class="header_p_eight threelevel_litwo_p">
                安排
              </p>
              <p v-if="JurisdictionDelete" class="header_p_eleven" @click.stop="amputate(item.ID, index, exhibition)">删除</p>
            </li>
          </ul>
          <!--<transition enter-active-class="fadeInUp"-->
            <!--leave-active-class="fadeOutDown">-->
            <!--<div v-show="true" class="inline_div">-->
              <!--<reportchild></reportchild>-->
            <!--</div>-->
          <!--</transition>-->
        </li>
      </ul>
    </section>
    <!--新增-->
    <!--<section v-if="review_boolean" @click.stop class="review">-->
      <!--<increase :msg="review_boolean" @say="onSay"></increase>-->
    <!--</section>-->
    <section v-if="examineBoolean" @click.stop class="review">
      <!--安排-->
      <childExamine :examine="arrangeData" @mine="Mine"></childExamine>
    </section>
    <section v-if="lookoverBoolean" @click.stop class="review">
      <!--查看-->
      <childLookover :msg="examineData" @look="Onlook"></childLookover>
    </section>
    <section v-if="modifyBoolean" @click.stop class="review">
      <!--确认-->
      <childModify :examine="arrangeData" @say="Modify"></childModify>
    </section>
  </div>
</template>

<script>
import reportchild from '../report-child/report-child'
import increase from '../admin-child/adminChild-review'
import childLookover from '../reportChild-operation/reportChild-lookover'
import childModify from '../reportChild-operation/reportChild-modify'
import childExamine from '../reportChild-operation/reportChild-examine'
import { findAllDeviceType, maintainReportgetFeedbackstateStates, maintainReportgetConfrimStates, findAreasTreeByProjectid, maintainReportfindFeedback, maintainReportfindFeedbackTwo, maintainReportfindFeedbacksByFeedbackid, maintainReportremoveFeedbacks } from '../../api/user'
export default {
  name: 'maintain-admin',
  components: {
    reportchild,
    increase,
    childLookover,
    childModify,
    childExamine
  },
  methods: {
    amputate (ID, index, data) {
      this.$confirm('是否删除此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(maintainReportremoveFeedbacks(ID)).then((response) => {
          if (response.data.code === 0) {
            data.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
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
    // auditing () {
    //   // 点击新增 出现 新增组件
    //   this.review_boolean = true
    // },
    preservation (item) {
      // 一级 审核 保存
      console.log(item.value)
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
    examine (ID) {
      // 点击查看
      console.log(ID)
      this.axios.post(maintainReportfindFeedbacksByFeedbackid(ID)).then((response) => {
        if (response.data.code === 0) {
          this.examineData = response.data.data
          console.log(response.data.data)
        }
      })
      this.lookoverBoolean = true
    },
    modify (Id) {
      // 点击修改
      this.axios.post(maintainReportfindFeedbacksByFeedbackid(Id)).then((response) => {
        if (response.data.code === 0) {
          this.arrangeData = response.data.data
          console.log(response.data.data)
          this.modifyBoolean = true
        }
      })
    },
    question (Id) {
      // 点击安排
      this.axios.post(maintainReportfindFeedbacksByFeedbackid(Id)).then((response) => {
        if (response.data.code === 0) {
          this.arrangeData = response.data.data
          this.examineBoolean = true
        }
      })
    },
    Mine (ev) {
      // 审核 传递的参数
      this.examineBoolean = ev
    },
    Onlook (ev) {
      this.lookoverBoolean = ev
    },
    Modify (ev) {
      this.modifyBoolean = ev
    },
    query () {
      let projectid = window.localStorage.pattern
      let areaid = this.regionModel.length !== 0 ? this.regionModel[this.regionModel.length - 1] : ''
      let basedevicecode = this.equipmentDate.length !== 0 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
      this.axios.post(maintainReportfindFeedbackTwo(projectid, areaid, basedevicecode, this.dispose, this.identification)).then((response) => {
        if (response.data.code === 0) {
          this.exhibition = response.data.data
        }
      })
    }
  },
  data () {
    return {
      options: [],
      value: '',
      examineData: '',
      review_boolean: false,
      // 获取点击的id
      click_id: '',
      tableData: [{
        active: false,
        // 审核按钮 显示 隐藏
        auditin: true,
        // 一级列表 审核  显示 隐藏
        admin_show: false,
        index: 0,
        id: '1',
        date: '1号车间',
        quantum: '100',
        await: '30',
        normal: '1000',
        child: [],
        value: ''
      }, {
        active: false,
        // 审核按钮 显示 隐藏
        auditin: true,
        // 一级列表 审核  显示 隐藏
        admin_show: false,
        index: 1,
        id: '2',
        date: '2号车间',
        quantum: '10',
        await: '303',
        normal: '1',
        child: [],
        value: ''
      }],
      examineBoolean: false,
      lookoverBoolean: false,
      modifyBoolean: false,
      exhibition: '',
      regionDate: [],
      regionModel: [],
      //  设备类别
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'code'
      },
      equipment: [],
      equipmentDate: [],
      //  区域
      regionProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      dispose: '',
      disposeData: [],
      identification: '',
      identificationData: [],
      arrangeData: '',
      JurisdictionSelect: '',
      JurisdictionInsert: '',
      JurisdictionDelete: ''
    }
  },
  created () {
    //  权限
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_wtcl') {
        this.JurisdictionSelect = val.select
        this.JurisdictionInsert = val.insert
        this.JurisdictionDelete = val.delete
      }
    })
    let projectid = window.localStorage.pattern
    console.log(projectid)
    this.axios.post(maintainReportfindFeedback(projectid)).then((response) => {
      if (response.data.code === 0) {
        this.exhibition = response.data.data
        console.log(this.exhibition)
      }
    })
    //  获取区域
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
    //  获取处理状态
    this.axios.post(maintainReportgetFeedbackstateStates()).then((response) => {
      this.disposeData = response.data
    })
    //  获取确认状态
    this.axios.post(maintainReportgetConfrimStates()).then((response) => {
      this.identificationData = response.data
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
    display flex
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
      line-height 30px
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
      width 106px
      height 36px
      border-radius 5px
      float left
      margin-right 30px
      background $color-background-query
      cursor pointer
      transition .2s
      &:hover
        background #4b92bf
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
    height 32px
    line-height 32px
    background #354d76
  .header_li
    float left
    width 4%
    height 32px
    text-align center
    padding 0  .5%
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
    width 14%
    height 32px
    line-height 32px
    padding-left 1%
  .header_litwo
    float left
    height 32px
    line-height 32px
    width 15%
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
      width 100%
      overflow hidden
      position relative
      padding 4px 0
      line-height 32px
      height 32px
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
    background rgba(000,000,000,.4)
    z-index 11
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
    float left
    cursor pointer
    margin-right 20px
    color $color-background-query
  .header_p_nine
    color #333333
  .header_p_ten
    float left
    cursor pointer
    margin-right 20px
    color $color-background-newly
  .header_p_eleven
    float left
    color #83292b
    cursor pointer
  .header_p_twelve
    float left
    cursor pointer
    margin-right 20px
    color $color-background-introduce
  .header_li p
    cursor pointer
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .div_input .el-select
    height 40px
    line-height 40px
</style>

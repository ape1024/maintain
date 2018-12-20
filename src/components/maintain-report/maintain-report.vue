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
          <p class="div_p">设备类型：</p>
          <div class="div_input">
            <el-cascader
              size="mini"
              clearable
              v-model="equipmentDate"
              :options="equipment"
              :props="equipmentProps"
              change-on-select
            ></el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">处理状态：</p>
          <div class="div_input">
            <el-select clearable size="mini" v-model="dispose" placeholder="请选择">
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
          <p class="div_p">确认状态：</p>
          <div class="div_input">
            <el-select clearable size="mini" v-model="identification" placeholder="请选择">
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
          设施类别
        </li>
        <li class="header_litwo">
          设置位置
        </li>
        <li class="header_li">
          数量
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
        <li class="header_litwo">
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
            <li :title="item.devicename" class="header_lithree">{{item.devicename}}</li>
            <li :title="item.areaname + item.position" class="header_litwo">{{item.areaname}}{{item.position}}</li>
            <li class="header_li">{{item.devicecount}} {{item.unit}}</li>
            <li :title="item.feedbackinfo" class="header_litwo">{{item.feedbackinfo}}</li>
            <li :title="item.feedbackorgname" class="header_litwo">{{item.feedbackorgname}}</li>
            <li class="header_li">{{item.creatername}}</li>
            <li class="header_litwo">{{item.createtime}}</li>
            <li class="header_li">{{item.feedbackstatename}}</li>
            <li class="header_li">{{item.comfirmstatename}}</li>
            <li class="header_litwo">
              <p v-if="JurisdictionSelect"
                 @click.stop="examine(item.ID)"
                 class="header_p_ten">查看
              </p>
              <p v-if="JurisdictionApproval && item.comfirmstate === 2"
                 @click.stop="modify(item.ID)" class="header_p_twelve">
                 确认
              </p>
              <p v-if="JurisdictionApproval && item.comfirmstate !== 2"
                 class="header_p_fourteen" >确认
              </p>
              <p v-if="JurisdictionAssign && !item.repairtaskid" @click.stop="question(item.ID)" class="header_p_eight threelevel_litwo_p">
              安排
              </p>
              <p v-if="JurisdictionAssign && !!item.repairtaskid"
                 class="header_p_fourteen" >安排
              </p>
              <!--<p v-if="JurisdictionAssign && item.comfirmstate === 4"-->
                 <!--@click.stop="question(item.ID)"-->
                 <!--class="header_p_eight threelevel_litwo_p">-->
                 <!--安排-->
              <!--</p>-->

              <p v-if="JurisdictionDelete"
                 class="header_p_eleven"
                 @click.stop="amputate(item.ID, index, exhibition)">
                 删除
              </p>
              <!--<p v-if="JurisdictionDelete && item.comfirmstate !== 2"-->
                 <!--class="header_p_fourteen" >-->
                 <!--删除-->
              <!--</p>-->
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
      <div class="numberPages" v-if="numberPagesBoolean">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="numberPagesChange"
          :current-page="currentPage"
          :page-count="numberPages">
        </el-pagination>
      </div>
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
import childLookover from '../reportChild-operation/reportChild-lookover-'
import childModify from '../reportChild-operation/reportChild-modify'
import childExamine from '../reportChild-operation/reportChild-examine'
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
import { findAllDeviceType, maintainReportgetFeedbackstateStates, maintainReportgetConfrimStates, findAreasTreeByProjectid, maintainReportfindFeedback, maintainReportfindFeedbackTwo, maintainReportfindFeedbacksByFeedbackid, maintainReportremoveFeedbacks } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin],
  name: 'maintain-admin',
  components: {
    reportchild,
    increase,
    childLookover,
    childModify,
    childExamine
  },
  methods: {
    init () {
      this.initReport()
      //  获取区域
      this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.regionDate = response.data.data
        }
      })
    },
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
      this.axios.post(maintainReportfindFeedbacksByFeedbackid(ID)).then((response) => {
        if (response.data.code === 0) {
          this.examineData = response.data.data
          this.lookoverBoolean = true
        }
      })
    },
    // 确认
    modify (Id) {
      // 点击修改
      this.axios.post(maintainReportfindFeedbacksByFeedbackid(Id)).then((response) => {
        if (response.data.code === 0) {
          this.arrangeData = response.data.data
          this.modifyBoolean = true
        }
      })
    },
    // 安排
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
      this.query()
    },
    Onlook (ev) {
      this.lookoverBoolean = ev
    },
    Modify (ev) {
      this.modifyBoolean = ev
      this.query()
    },
    query () {
      let basedevicecode = ''
      if (this.equipmentDate.length) {
        if (this.equipmentDate[this.equipmentDate.length - 1]) {
          basedevicecode = this.equipmentDate[this.equipmentDate.length - 1]
        } else {
          basedevicecode = ''
        }
      } else {
        basedevicecode = ''
      }
      let areaid = this.regionModel.length !== 0 ? this.regionModel[this.regionModel.length - 1] : ''
      // let basedevicecode = this.equipmentDate.length !== 0 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
      this.axios.post(maintainReportfindFeedbackTwo(this.maintainProject, areaid, basedevicecode, this.dispose, this.identification, this.currentPage, this.pageSize)).then((response) => {
        if (response.data.code === 0) {
          const data = response.data.data
          if (data.length > 0) {
            this.numberPages = data[0].pagecount
            this.numberPagesBoolean = true
          } else {
            this.numberPages = 0
            this.numberPagesBoolean = false
          }
          this.exhibition = response.data.data.map(t => {
            return {
              ...t,
              createtime: formatDate(t.createtime, 'yyyy/MM/dd HH:mm:ss')
            }
          })
        }
      })
    },
    // 初始化数据
    initReport () {
      this.axios.post(maintainReportfindFeedback(this.maintainProject, this.currentPage, this.pageSize)).then((response) => {
        if (response.data.code === 0) {
          const data = response.data.data
          if (data.length > 0) {
            this.numberPages = data[0].pagecount
            this.numberPagesBoolean = true
          } else {
            this.numberPages = 0
            this.numberPagesBoolean = false
          }
          this.exhibition = data.map(t => {
            return {
              ...t,
              createtime: formatDate(t.createtime, 'yyyy/MM/dd HH:mm:ss')
            }
          })
        }
      })
    },
    // 分页事件
    numberPagesChange (el) {
      this.currentPage = el
      this.query()
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
      JurisdictionDelete: '',
      JurisdictionAssign: '',
      JurisdictionApproval: '',
      // 分页
      currentPage: 1,
      numberPages: 1,
      pageSize: 20,
      numberPagesBoolean: false
    }
  },
  created () {
    //  权限
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'feedback') {
        this.JurisdictionSelect = val.select
        this.JurisdictionApproval = val.approval
        this.JurisdictionDelete = val.delete
        this.JurisdictionAssign = val.assign
      }
    })
    this.axios.post(maintainReportfindFeedback(this.maintainProject, this.currentPage, this.pageSize)).then((response) => {
      if (response.data.code === 0) {
        const data = response.data.data
        if (data.length > 0) {
          this.numberPages = data[0].pagecount
          this.numberPagesBoolean = true
        } else {
          this.numberPages = 0
          this.numberPagesBoolean = false
        }
        this.exhibition = data.map(t => {
          return {
            ...t,
            createtime: formatDate(t.createtime, 'yyyy/MM/dd HH:mm:ss')
          }
        })
      }
    })
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
    //  获取处理状态
    this.axios.post(maintainReportgetFeedbackstateStates()).then((response) => {
      this.disposeData = response.data.slice(1)
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
    overflow hidden
    position relative
    background rgba(0,0,0,0.45)
    margin 12px
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
    float right
    overflow hidden
    position relative
    margin-left 90px
    text-align center
    line-height 36px
    font-size $font-size-medium
    color $color-text-title
    margin-top -6px
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
    height 32px
    padding 4px 0
    line-height 32px
    background #354d76
  .header_li
    float left
    width 6%
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
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .header_litwo
    float left
    height 32px
    text-align center
    line-height 32px
    width 11%
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
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
    min-height 800px
    max-height 800px
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
    background $color-barckground-transparent
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
    color #cc5966
    cursor pointer
  .header_p_twelve
    float left
    cursor pointer
    margin-right 20px
    color $color-background-introduce
  .header_p_fourteen
    float left
    margin-right 20px
    color $color-text-tile-false
  .header_li p
    cursor pointer
  .subject_bottom
    margin 10px
    min-height 800px
    background rgba(0,0,0,0.35)
    overflow hidden
  .numberPages
    overflow hidden
    margin 20px 0
    text-align center
</style>

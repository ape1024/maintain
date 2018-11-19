<template>
  <div class="subject">
    <section class="subject_top">
      <div class="subject_top__div">
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
        </ul>
        <div class="button">
          <!--查询-->
          <div class="query" @click="query">
            查 询
          </div>
          <!--新增-->
          <div v-if="JurisdictionInsert" @click.stop="auditing" class="newly">
            新 增
          </div>
        </div>
      </div>
    </section>
    <section class="subject_bottom">
      <ul class="header_ul">
        <li class="header_lithree">
          建筑区域
        </li>
        <li class="header_li">
          设施总数量
        </li>
        <li class="header_li">
          待审批数量
        </li>
        <li class="header_li">
          已存档数量
        </li>
        <li class="header_li">
          需修改数量
        </li>
        <li class="header_li">
          停用数量
        </li>
      </ul>
      <ul class="table_ul">
        <li v-for="(item) in tableData" class="table_li" :key="item.deviceid" :id="item.areaid">
          <ul :id="item.id" class="inline_ul" @click="selectStyle (item)">
            <li class="header_lithree">
              <i class="header_lithreeII" :class="!item.flag ? 'el-icon-circle-plus-outline' : 'el-icon-remove-outline'"></i>
              {{item.areaname}}
            </li>
            <li class="header_li">{{item.alldevcount}}</li>
            <li class="header_li">{{item.checkdevnum}}</li>
            <li class="header_li">{{item.filedevnum}}</li>
            <li class="header_li">{{item.updatedevnum}}</li>
            <li class="header_li">{{item.stopdevnum}}</li>
          </ul>
          <transition enter-active-class="fadeInUp"
                      leave-active-class="fadeOutDown">
            <div v-if="item.flag" class="inline_div">
              <adminchild :adminid="adminAreaid" :tabChild="tableChild" @transmission="Transmission"></adminchild>
            </div>
          </transition>
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
    <section v-if="review_boolean" @click.stop class="review">
      <increase v-if="review_boolean" :msg="review_boolean" @transmission="Transmission" @say="onSay" ></increase>
    </section>
  </div>
</template>

<script>
import adminchild from '../intercalateChild-operation/equipmentManagement-Child'
import increase from '../admin-child/adminChild-review'
import { maintainReportfindManufactures, CalcDevCount, findAllDeviceType, FindDevAllstate, FindDevAllApprovalstate, findAllRootAreasTree } from '../../api/user'
import { projectMixin } from 'common/js/mixin'

export default {
  mixins: [projectMixin],
  name: 'maintain-admin',
  components: {
    adminchild,
    increase
  },
  methods: {
    numberPagesChange (el) {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(findAllRootAreasTree(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.regionDate = response.data.data
          this.regionModel.push((this.regionDate)[0].areaid)
          //  获取 列表数据 默认第一页 20个
          let regionId = (this.regionModel).shift()
          this.axios.post(CalcDevCount(token, -1, regionId, el, 20)).then((data) => {
            if (data.data.code === 0) {
              this.tableData = data.data.data.datas
              this.numberPagesBoolean = true
              this.numberPages = data.data.data.totalPage
            }
          })
        }
      })
    },
    Transmission (el) {
      this.regionModel = el
      this.numberPagesBoolean = false
      this.review_boolean = false
      let token = JSON.parse(window.sessionStorage.token)
      //  获取 列表数据 默认第一页 20个
      let regionId = el[el.length - 1]
      this.axios.post(CalcDevCount(token, -1, regionId, 1, 20)).then((data) => {
        if (data.data.code === 0) {
          this.tableData = data.data.data.datas
          this.numberPages = data.data.data.totalPage
          this.numberPagesBoolean = true
        }
      })
    },
    // init () {
    //   this.numberPagesBoolean = false
    //   this.currentPage = 1
    //   this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
    //     if (response.data.code === 0) {
    //       this.regionDate = response.data.data
    //       this.regionModel.push((this.regionDate)[0].areaid)
    //       //  获取 列表数据 默认第一页 20个
    //       let regionId = (this.regionModel).shift()
    //       let token = JSON.parse(window.sessionStorage.token)
    //       this.axios.post(CalcDevCount(token, this.maintainProject, regionId, 1, 20)).then((data) => {
    //         if (data.data.code === 0) {
    //           this.tableData = data.data.data.datas
    //           this.numberPages = data.data.data.totalPage
    //           this.numberPagesBoolean = true
    //         }
    //       })
    //     } else {
    //       this.tableData = []
    //     }
    //   })
    // },
    query () {
      // 接口 getDevListDetailProjectsTwo
      // 区域id
      if (!this.regionModel.length) {
        this.$message({
          message: '请选择区域',
          type: 'warning'
        })
        return false
      } else {
        let token = JSON.parse(window.sessionStorage.token)
        let areaid = this.regionModel[this.regionModel.length - 1]
        this.axios.post(CalcDevCount(token, -1, areaid, 1, 30)).then((response) => {
          if (response.data.code === 0) {
            this.tableData = response.data.data.datas
            this.numberPages = response.data.data.totalPage
          }
        })
      }
    },
    selectStyle (item) {
      this.adminAreaid = item.areaid
      if (item.flag) {
        item.flag = false
      } else {
        this.tableData.forEach((val) => {
          if (val.areaid !== item.areaid) {
            val.flag = false
          }
        })
        item.flag = true
      }
    },
    examine (item) {
      // 一级审核
      item.auditin = !item.auditin
      item.admin_show = !item.admin_show
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
    focus (event) {
      let region = this.equipmentDate
      if (region.length === 0) {
        this.$message({
          message: '设备类型！',
          type: 'warning'
        })
        return false
      } else {
        region = region[region.length - 1]
        this.axios.post(maintainReportfindManufactures(region)).then((response) => {
          if (response.data.code === 0) {
            this.manufactor = response.data.data
          }
        })
      }
    }
  },
  data () {
    return {
      // 区域
      regionProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      regionDate: [],
      regionModel: [],
      // 设备类别
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'code'
      },
      equipment: [],
      equipmentDate: [],
      // 厂家
      manufactorModel: '',
      manufactor: [],
      // 运行状态
      runningstateDate: [],
      runningState: '',
      // 审核状态
      AuditstatusDate: [],
      AuditstatusD: '',
      // 传给子级值
      tableChild: '',
      options: [],
      value: '',
      review_boolean: false,
      // 获取点击的id
      click_id: '',
      tableData: [],
      JurisdictionInsert: '',
      adminAreaid: '',
      numberPages: 1,
      numberPagesBoolean: false,
      currentPage: 1
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    // 权限
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'device') {
        this.JurisdictionInsert = val.insert
      }
    })
    // 获取区域
    this.axios.post(findAllRootAreasTree(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.regionDate = response.data.data
        this.regionModel.push((this.regionDate)[0].areaid)
        //  获取 列表数据 默认第一页 20个
        let regionId = (this.regionModel)[0]
        this.axios.post(CalcDevCount(token, -1, regionId, 1, 20)).then((data) => {
          if (data.data.code === 0) {
            this.tableData = data.data.data.datas
            this.numberPagesBoolean = true
            this.numberPages = data.data.data.totalPage
          }
        })
      }
    })
    // 获取设备类别
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.equipment = response.data.data
      }
    })
    // 获取运行状态
    this.axios.post(FindDevAllstate()).then((response) => {
      if (response.data.code === 0) {
        this.runningstateDate = response.data.data
      }
    })
    // 审核状态
    this.axios.post(FindDevAllApprovalstate()).then((response) => {
      if (response.data.code === 0) {
        this.AuditstatusDate = response.data.data
      }
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    width 100%
    overflow hidden
    position relative
    margin 0 12px
    background rgba(000,000,000,.47)
  .subject_top
    overflow hidden
    background #111a28
    position relative
    margin 10px 10px 0
    padding 20px 0
  .ul_input
    margin-left 30px
    float left
    overflow hidden
    position relative
  .li_input
    float left
    overflow hidden
    margin-right 90px
    .div_p
      float left
      font-size $color-text-title
      color $color-text-title
      margin-right 10px
      line-height 30px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .div_input
      float left
      width 167px
  .button
    display flex
    overflow hidden
    position relative
    margin-left 1%
    text-align center
    line-height 36px
    font-size $font-size-medium
    color $color-text-title
    .query
      queryDiv()
    .newly
      newlyDiv()
    .introduce
      height 36px
      border-radius 5px
      display inline-block
      background $color-background-introduce
      cursor pointer
      transition .2s
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
    padding 12px 0
    background #354d76
  .header_li
    float left
    width 15%
    text-align center
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
    width 24%
    padding-left 1%
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
    max-height 800px
    min-height 800px
    overflow auto
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
  .subject_top__div
    overflow hidden
  .el-container
    margin 12px 12px 0
  .el-main
    padding 10px
  .subject_bottom
    overflow hidden
    margin 10px
    min-height 800px
    background rgba(000,000,000,.35)
    .numberPages
      overflow hidden
      margin 20px 0
      text-align center
    .header_lithreeII
      color #4ea4db
      margin-right 10px
</style>

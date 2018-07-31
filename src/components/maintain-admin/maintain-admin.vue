<template>
  <el-container>
    <div class="subject">
      <el-header>
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
              <p class="div_p">设备类型：</p>
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
              <p class="div_p">厂家：</p>
              <div class="div_input">
                <el-select @focus="focus" size="mini" v-model="manufactorModel" placeholder="">
                  <el-option
                    v-for="item in manufactor"
                    :key="item.manufacturerid"
                    :label="item.name"
                    :value="item.manufacturerid">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="li_input">
              <p class="div_p">运行状态：</p>
              <div class="div_input">
                <el-select v-model="runningState" size="mini" placeholder="">
                  <el-option
                    v-for="item in runningstateDate"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="li_input">
              <p class="div_p">审核状态：</p>
              <div class="div_input">
                <el-select v-model="Auditstatus" size="mini" placeholder="">
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
            <div class="query" @click="query">
              查 询
            </div>
            <!--新增-->
            <div v-if="JurisdictionApproval" @click.stop="auditing" class="newly">
              新 增
            </div>
            <!--导入-->
            <div class="introduce">
              <el-dropdown size="medium" split-button type="primary">
                导入选择
                <el-dropdown-menu slot="dropdown" trigger="click">
                  <el-dropdown-item>批量导入</el-dropdown-item>
                  <el-dropdown-item>导入</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

          </div>
        </section>
      </el-header>
      <el-main>
        <section class="subject_bottom">
          <ul class="header_ul">
            <li class="header_lithree">
              区域
            </li>
            <li class="header_li">
              设备数量
            </li>
            <li class="header_li">
              待审核设备数量
            </li>
            <li class="header_li">
              正常运行数量
            </li>
          </ul>
          <ul class="table_ul">
            <li v-for="(item) in tableData" class="table_li" :key="item.deviceid" :id="item.areaid" @click="selectStyle (item)">
              <ul :id="item.id" class="inline_ul">
                <li class="header_lithree">{{item.areaname}}</li>
                <li class="header_li">{{item.alldevcount}}</li>
                <li class="header_li">{{item.approvedevnum}}</li>
                <li class="header_li">{{item.statedevnum}}</li>
                <li class="header_li">
                  <!--<div v-show="item.auditin" @click.stop="examine(item)"  class="examine">审 核</div>-->
                  <!--<div class="admin_show" v-show="item.admin_show">-->
                    <!--<div class="admin_selve">-->
                      <!--<el-select v-model="item.value" placeholder="">-->
                        <!--<el-option-->
                          <!--v-for="data in item.child"-->
                          <!--:key="data.value"-->
                          <!--:label="data.label"-->
                          <!--:value="data.label">-->
                        <!--</el-option>-->
                      <!--</el-select>-->
                    <!--</div>-->
                    <!--<div @click.stop="preservation(item)" class="admin_preservation">-->
                      <!--保存-->
                    <!--</div>-->
                    <!--<div @click.stop="cancel(item)" class="cancel">-->
                      <!--取消-->
                    <!--</div>-->
                  <!--</div>-->
                </li>
              </ul>
              <transition enter-active-class="fadeInUp"
                          leave-active-class="fadeOutDown">
                <div v-show="item.flag" class="inline_div">
                  <adminchild :tabChild="tableChild"></adminchild>
                </div>
              </transition>
            </li>
          </ul>
        </section>
        <section v-if="review_boolean" @click.stop class="review">
          <increase :msg="review_boolean" @say="onSay"></increase>
        </section>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import adminchild from '../admin-child/admin-child'
import increase from '../admin-child/adminChild-review'
import { admingetDevListDetailProjects, getDevListDetailProjectsTwo, maintainReportfindManufactures, findAreasTreeByProjectid, CalcDevCount, findAllDeviceType, FindDevAllstate, FindDevAllApprovalstate } from '../../api/user'
export default {
  name: 'maintain-admin',
  components: {
    adminchild,
    increase
  },
  methods: {
    //  查询
    query () {
      //  区域id
      let areaid = this.regionModel[this.regionModel.length - 1]
      if (areaid === undefined) {
        this.$message({
          message: '请先选择区域!',
          type: 'warning'
        })
        return false
      } else {
        //  设备类型 code  basedevicecode
        if (this.equipmentDate[0] !== undefined && this.equipmentDate.length !== 0) {
          let basedevicecode = this.equipmentDate[this.equipmentDate.length - 1]

          this.axios.post(getDevListDetailProjectsTwo(basedevicecode, areaid)).then((response) => {
            if (response.data.code === 0) {
              console.log(response)
              this.tableData = response.data.data
            }
          })
        } else {
          this.axios.post(admingetDevListDetailProjects(areaid)).then((response) => {
            if (response.data.code === 0) {
              console.log(response.data.data)
              this.tableData = response.data.data
            }
          })
        }
      }
    },
    selectStyle (item) {
      this.tableData.forEach((val) => {
        val.flag = false
      })
      let itemAreaid = item.areaid
      this.axios.post(admingetDevListDetailProjects(itemAreaid)).then((response) => {
        console.log(response.data.data)
        if (response.data.code === 0) {
          this.tableChild = response.data.data
        }
      })
      item.flag = !item.flag
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
      equipment: [],
      equipmentDate: [],
      //  厂家
      manufactorModel: '',
      manufactor: [],
      //  运行状态
      runningstateDate: [],
      runningState: '',
      //  审核状态
      AuditstatusDate: [],
      Auditstatus: '',
      //  传给子级值
      tableChild: '',
      options: [],
      value: '',
      review_boolean: false,
      // 获取点击的id
      click_id: '',
      tableData: [],
      JurisdictionApproval: ''
    }
  },
  created () {
    //  权限
    console.log(JSON.parse(window.sessionStorage.Jurisdiction))
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'device') {
        this.JurisdictionApproval = val.approval
      }
    })
    const token = JSON.parse(window.sessionStorage.token)
    console.log(token)

    //  获取区域
    let projectid = window.localStorage.pattern
    this.axios.post(findAreasTreeByProjectid(projectid)).then((response) => {
      console.log(response)
      console.log('------++=-------')
      if (response.data.code === 0) {
        this.regionDate = response.data.data
        this.regionModel.push((this.regionDate)[0].areaid)
        //  获取 列表数据 默认第一页 20个
        let regionId = (this.regionModel).shift()
        this.axios.post(CalcDevCount(regionId, 1, 20)).then((data) => {
          console.log('----------------------')
          console.log(data)
          if (data.data.code === 0) {
            this.tableData = data.data.data.datas
            console.log(this.tableData)
          }
        })
      }
    })
    //  获取设备类别
    this.axios.post(findAllDeviceType()).then((response) => {
      if (response.data.code === 0) {
        this.equipment = response.data.data
        console.log(response.data.data)
      }
    })
    //  获取运行状态
    this.axios.post(FindDevAllstate()).then((response) => {
      if (response.data.code === 0) {
        this.runningstateDate = response.data.data
      }
    })
    //  审核状态
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
    background #141e30
  .subject_top
    overflow hidden
    background #111a28
    position relative
  .ul_input
    margin-left 30px
    float left
    overflow hidden
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
      line-height 40px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .div_input
      float left
      width 167px
      margin-top 5px
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
      width 106px
      height 36px
      border-radius 5px
      text-align center
      display inline-block
      margin-right 6%
      background $color-background-query
      cursor pointer
      transition .2s
      &:hover
        background #4b92bf
    .newly
      width 106px
      height 36px
      border-radius 5px
      text-align center
      display inline-block
      margin-right 6%
      background $color-background-newly
      cursor pointer
      transition .2s
      &:hover
        background #4baabe
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
    width 25%
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
    min-height 660px
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
    background rgba(000,000,000,.4)
    z-index 11
    overflow hidden
.el-header
  padding 38px 20px 58px
  margin-bottom 20px
.el-container
  margin 12px 12px 0
.el-main
  padding 10px
</style>

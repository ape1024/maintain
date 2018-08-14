<template>
  <div class="admin_child">
    <ul class="threelevel_header">
      <li class="threelevel_lithree">
        设施编码
      </li>
      <li class="threelevel_lithree">
        设备名称 <i class="el-icon-caret-bottom"></i>
        <div class="threelevel_ensconce">
          <el-cascader
            size="mini"
            clearable
            @change="ensconce(equipmentDate)"
            v-model="equipmentDate"
            :options="equipmentinformation"
            :props="equipmentProps"
            change-on-select
          ></el-cascader>
        </div>
      </li>
      <li class="threelevel_lithree">
        设备位置
      </li>
      <li class="threelevel_lithree">
        数量
      </li>
      <li class="threelevel_lithree">
        生产厂家 <i class="el-icon-caret-bottom"></i>
        <div class="threelevel_ensconce">
          <el-select @change="manufactorChange(manufactorModel)" @focus="focus" size="mini" v-model="manufactorModel" placeholder=""  multiple collapse-tags>
            <el-option
              v-for="item in manufactor"
              :key="item.manufacturerid"
              :label="item.name"
              :value="item.manufacturerid">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="threelevel_lithree">
        规格型号
      </li>
      <li class="threelevel_lithree">
        生产时间
      </li>
      <li class="threelevel_lithree">
        运行状态 <i class="el-icon-caret-bottom"></i>
        <div class="threelevel_ensconce">
          <el-select @change="runningChange" v-model="runningState" size="mini" placeholder="">
            <el-option
              v-for="item in runningstateDate"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="threelevel_lithree">
        审核状态 <i class="el-icon-caret-bottom"></i>
        <div class="threelevel_ensconce">
          <el-select @change="AuditstatusChang" v-model="AuditstatusD" size="mini" placeholder="">
            <el-option
              v-for="item in AuditstatusDate"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="threelevel_litwo">
        操作
      </li>
    </ul>
    <ul class="threelevel_list">
      <li :key="dataset.deviceid" :id="dataset.areaid"  v-for="(dataset, $index) in tabChild" class="threelevel_list_li">
        <ul :id="dataset.id" class="threelevel_list_ul">
          <li class="threelevel_lithree">
            {{dataset.basedevicecode}}
          </li>
          <li :title="dataset.devicename" class="threelevel_lithree">
            {{dataset.devicename}}
          </li>
          <li :title="dataset.position" class="threelevel_lithree">
            {{dataset.position}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.devicecount}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.manufacturename}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.devicemodel}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.madedate}}
          </li>
          <li class="threelevel_lithree">
            <p :style="{color: devicestatecodeColor(dataset.devicestatecode)}">{{devicestateCode(dataset.devicestatecode)}}</p>
          </li>
          <li class="threelevel_lithree">
            <p :style="{color: examineCodeColor(dataset.approvalstatecode)}">
              {{examineCode(dataset.approvalstatecode)}}
            </p>
            <!--{{dataset.approvalstatecode}}-->
          </li>
          <li class="threelevel_litwo">
            <!--<p @click.stop="question" class="header_p_eight threelevel_litwo_p">-->
              <!--审核-->
            <!--</p>-->
            <p v-if="JurisdictionSelect" @click.stop="examine(dataset.deviceid)" class="header_p_ten">查看</p>
            <p v-if="JurisdictionUpdate" @click.stop="modify(dataset, dataset.deviceid)" class="header_p_twelve">
              修改
            </p>
            <!--<p @click.stop="equipment" class="header_pe_quipment">-->
              <!--更换设备-->
            <!--</p>-->
            <!--<p class="header_p_eleven" @click.stop="amputate($index, content)">删除</p>-->
            <p v-if="JurisdictionDelete" class="header_p_eleven" @click.stop="">
              <el-button type="text" @click="amputate($index, tabChild, dataset.deviceid)">删除</el-button>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <section v-show="examineBoolean" @click.stop class="review">
      <!--审核-->
      <childExamine :examine="examineBoolean" @mine="Mine"></childExamine>
    </section>
    <section v-if="lookoverBoolean" @click.stop class="review">
      <!--查看-->
      <childLookover :inspection="examineInspection" :information="examineInformation" :msg="lookoverBoolean" @look="Onlook"></childLookover>
    </section>
    <section v-if="modifyBoolean" @click.stop class="review">
      <!--修改-->
      <childModify :msg="modifyBoolean" :modify="modifyDate" @say="Modify"></childModify>
    </section>
    <section v-show="quipmentBoolean" class="review" @click.stop>
      <!--更换设备-->
      <childquipment :msg="quipmentBoolean" @quipment="Quipment"></childquipment>
    </section>
  </div>
</template>

<script>
import childLookover from '../adminChild-operation/adminChild-lookover'
import childModify from '../adminChild-operation/adminChild-modify'
import childExamine from '../adminChild-operation/adminChild-examine'
import childquipment from '../adminChild-operation/adminChild-quipment'
import {stateData, examineDate} from '../../common/js/utils'
import { admindelDevice, adminfindDeviceDetail, adminFindInspectionMaintenance, admingetDevListDetailProjects, findAllDeviceType, maintainReportfindManufactures, FindDevAllstate, FindDevAllApprovalstate } from '../../api/user'
import { projectMixin, loadingMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [projectMixi, loadingMixin ],
  name: 'admin-child',
  props: ['adminid'],
  components: {
    childLookover,
    childModify,
    childExamine,
    childquipment
  },
  data () {
    return {
      datasetAreaid: '',
      content: [],
      examineBoolean: false,
      lookoverBoolean: false,
      modifyBoolean: false,
      quipmentBoolean: false,
      examineInformation: '',
      examineInspection: '',
      modifyDate: '',
      examineDataset: '',
      JurisdictionSelect: '',
      JurisdictionInsert: '',
      JurisdictionDelete: '',
      JurisdictionApproval: '',
      JurisdictionUpdate: '',
      equipmentinformation: [],
      equipmentDate: [],
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'code'
      },
      manufactorModel: '',
      manufactor: [],
      runningstateDate: [],
      runningState: '',
      //  审核状态
      AuditstatusDate: [],
      AuditstatusD: '',
      tabChild: ''
    }
  },
  methods: {
    AuditstatusChang () {
      this.jueryCurrent(this.equipmentDate, this.manufactorModel, this.runningState, this.AuditstatusD)
    },
    runningChange () {
      this.jueryCurrent(this.equipmentDate, this.manufactorModel, this.runningState, this.AuditstatusD)
    },
    manufactorChange () {
      this.jueryCurrent(this.equipmentDate, this.manufactorModel, this.runningState, this.AuditstatusD)
    },
    jueryCurrent (equipmentDate, manufactorModel, runningState, AuditstatusD) {
      //  basedevicecode  设备名称
      //  devicestate  运行状态
      //  approvalstate  审核状态
      //  areaid  区域id
      //  manufacturerid  厂家id
      let equipmentdata = ''
      console.log(equipmentDate)
      if (equipmentDate.length) {
        if (equipmentDate[equipmentDate.length - 1]) {
          equipmentdata = equipmentDate[equipmentDate.length - 1]
        } else {
          equipmentdata = ''
        }
      } else {
        equipmentdata = ''
      }
      console.log(manufactorModel)
      manufactorModel = manufactorModel.length && manufactorModel[manufactorModel.length - 1] !== -1 ? manufactorModel : ''
      runningState = typeof runningState === 'number' ? runningState : ''
      AuditstatusD = AuditstatusD && AuditstatusD !== -1 ? AuditstatusD : ''
      this.axios.post(`http://172.16.6.181:8920/dev/getDevListDetailProjects?basedevicecode=${equipmentdata}&devicestate=${runningState}&approvalstate=${AuditstatusD}&areaid=${this.adminid}&manufacturerid=${manufactorModel}`).then((response) => {
        if (response.data.code === 0) {
          this.tabChild = response.data.data
        }
      })
    },
    focus (event) {
      let region = this.equipmentDate
      if (region.length === 0) {
        this.$message({
          message: '设备类型！',
          type: 'warning'
        })
        return false
      } else if (region[region.length - 1]) {
        region = region[region.length - 1]
        this.axios.post(maintainReportfindManufactures(region)).then((response) => {
          if (response.data.code === 0) {
            this.manufactor = response.data.data
          }
        })
      } else {
        this.$message({
          message: '不可以选择全部！',
          type: 'warning'
        })
      }
    },
    ensconce (item) {
      this.jueryCurrent(this.equipmentDate, this.manufactorModel, this.runningState, this.AuditstatusD)
    },
    amputate ($index, content, deviceid) {
      // 删除
      this.$confirm('此操作将删除该内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            content.splice([$index], 1)
            this.axios.post(admindelDevice(deviceid)).then((response) => {
              if (response.data.code === 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              } else {
                this.$message.error('删除失败')
              }
            })
          }
        },
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    examine (deviceid) {
      // 点击查看

      this.lookoverBoolean = true
      this.axios.post(adminfindDeviceDetail(deviceid)).then((response) => {
        if (response.data.code === 0) {
          this.examineInformation = response.data.data
        }
      })
      this.axios.post(adminFindInspectionMaintenance(deviceid)).then((response) => {
        if (response.data.code === 0) {
          this.examineInspection = response.data.data
        }
      })
    },
    modify (dataset, deviceId) {
      // 点击修改
      this.datasetAreaid = dataset.areaid
      this.modifyBoolean = true
      this.axios.post(adminfindDeviceDetail(deviceId)).then((response) => {
        if (response.data.code === 0) {
          this.modifyDate = response.data.data
        }
      })
    },
    question () {
      // 点击审核
      this.examineBoolean = true
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
      this.axios.post(admingetDevListDetailProjects(this.datasetAreaid)).then((response) => {
        if (response.data.code === 0) {
          this.tabChild = response.data.data
        }
      })
    },
    equipment () {
      this.quipmentBoolean = true
    },
    Quipment (ev) {
      this.quipmentBoolean = ev
    },
    devicestateCode (data) {
      if (data === '') {
        return ''
      } else {
        return stateData[data].name
      }
    },
    devicestatecodeColor (data) {
      if (data === '') {
        return '#fff'
      } else {
        return stateData[data].color
      }
    },
    examineCode (data) {
      if (data === '') {
        return ''
      } else {
        return examineDate[data].name
      }
    },
    examineCodeColor (data) {
      if (data === '') {
        return '#fff'
      } else {
        return examineDate[data].color
      }
    }
  },
  created () {
    this.axios.post(admingetDevListDetailProjects(this.adminid)).then((response) => {
      if (!response) {
        // 请求失败关闭加载
        this.closeLoadingDialog()
        return
      }
      if (response.data.code === 0) {
        this.tabChild = response.data.data
      }
      // 请求成功关闭数据加载
      this.closeLoadingDialog()
    })
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'device') {
        this.JurisdictionSelect = val.select
        this.JurisdictionInsert = val.insert
        this.JurisdictionDelete = val.delete
        this.JurisdictionApproval = val.approval
        this.JurisdictionUpdate = val.update
      }
    })
    //  获取设备类别
    this.axios.post(findAllDeviceType()).then((response) => {
      if (response.data.code === 0) {
        this.equipmentinformation = response.data.data
      }
    })
    //  获取运行状态
    this.axios.post(FindDevAllstate()).then((response) => {
      if (response.data.code === 0) {
        this.runningstateDate = response.data.data
      }
    })
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
  .admin_child
    overflow hidden
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
  .header_p_ten
    color $color-background-newly
  .header_p_eleven
    color #83292b
  .header_p_twelve
    color $color-background-introduce
  .header_pe_quipment
    color #32a697
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
  .threelevel_header
    margin: 4px;
    overflow: hidden;
    position: relative;
    padding: 12px 0;
    background: #354d76;
    .threelevel_li
      float left
      width 8.5%
    .threelevel_litwo
      float left
      width 23.5%
      overflow hidden
     .threelevel_lithree
       float left
       width 7.5%
       padding-left 1%
       position relative
  .threelevel_list
      margin: 4px;
      overflow: hidden;
      position: relative;
    .threelevel_list_li
        width 100%
        overflow hidden
        height 40px
        line-height 40px
        position relative
        .threelevel_list_ul
          width 100%
          overflow hidden
          height 40px
          .threelevel_li
            float left
            width 8.5%
            height 40px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .threelevel_litwo
            float left
            width 23.5%
            height 40px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .threelevel_lithree
            float left
            width 7.5%
            height 40px
            padding-left 1%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
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
  .threelevel_ensconce
    overflow hidden
    z-index 1111
    position absolute
    top 0
    height 100%
    width 100%
    left 0
    opacity 0
</style>

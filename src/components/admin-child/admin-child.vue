<template>
  <div class="admin_child">
    <ul class="threelevel_header">
      <li class="threelevel_lithree">
        <el-checkbox v-model="checkedData" @change="checkedChange"></el-checkbox>
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
      <li class="threelevel_liL">
        mac地址
      </li>
      <li class="threelevel_lithree">
        设备位置
      </li>
      <li class="threelevel_lithree">
        数量
      </li>
      <li class="threelevel_lithree">
        生产厂家
      </li>
      <li class="threelevel_lithree">
        规格型号
      </li>
      <li class="threelevel_lithree">
        生产时间
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
      <li v-if="JurisdictionApproval" @click="approvalstateS" class="threelevel_lifive">
        批量审批
      </li>
    </ul>
    <ul class="threelevel_list">
      <li :key="dataset.deviceid" :id="dataset.areaid"  v-for="(dataset, $index) in tabChild" class="threelevel_list_li">
        <ul :id="dataset.id" class="threelevel_list_ul">
          <li class="threelevel_lithree">
            <el-checkbox v-model="dataset.checked" :disabled="dataset.disabled"></el-checkbox>
            {{dataset.devicecode}}
          </li>
          <li :title="dataset.devicename" class="threelevel_lithree">
            {{dataset.devicename}}
          </li>
          <li :title="dataset.mac" class="threelevel_liL">
            {{dataset.mac}}
          </li>
          <li :title="dataset.position" class="threelevel_lithree">
            {{dataset.position}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.devcount2}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.manufacturename}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.devicemodelname}}
          </li>
          <li class="threelevel_lithree">
            {{dataset.madedate}}
          </li>
          <!--<li class="threelevel_lithree">-->
            <!--<p :style="{color: devicestatecodeColor(dataset.devicestatecode)}">{{devicestateCode(dataset.devicestatecode)}}</p>-->
          <!--</li>-->
          <li class="threelevel_lithree">
            <p :style="{color: examineCodeColor(dataset.approvalstatecode)}">
              {{examineCode(dataset.approvalstatecode)}}
            </p>
            <!--{{dataset.approvalstatecode}}-->
          </li>
          <li class="threelevel_litwo">
            <p v-if="JurisdictionApproval && dataset.disabledBoolean" @click.stop="question(dataset.deviceid)" class="header_p_eight threelevel_litwo_p">
              审核
            </p>
            <p v-if="JurisdictionApproval && !dataset.disabledBoolean" class="header_p_Eleven threelevel_litwo_p">
              审核
            </p>
            <p v-if="JurisdictionSelect" @click.stop="examine(dataset.deviceid)" class="header_p_ten">查看</p>
            <p v-if="JurisdictionUpdate && dataset.disabledBoolean" @click.stop="modify(dataset, dataset.deviceid)" class="header_p_twelve">
              修改
            </p>
            <p v-if="JurisdictionUpdate && !dataset.disabledBoolean" class="header_p_Eleven">
              修改
            </p>
            <p v-if="JurisdictionDelete&&dataset.disabledBoolean" class="header_p_eleven" @click.stop="">
              <el-button type="text" @click="amputate($index, tabChild, dataset.deviceid)">删除</el-button>
            </p>
            <p v-if="JurisdictionDelete&&!dataset.disabledBoolean" class="header_p_Eleven" @click.stop="">
             删除
            </p>
            <p class="superJurisdiction" v-if="JurisdictionSuper && !dataset.disabledBoolean" @click="amputate($index, tabChild, dataset.deviceid)">
              超级删除
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <section v-if="examineBoolean" @click.stop class="review">
      <!--审核-->
      <childExamine v-if="examineBoolean" :question="questionData" :examine="examineBoolean" @mine="Mine" @modifysay="modiFysay"></childExamine>
    </section>
    <section v-if="lookoverBoolean" @click.stop class="review">
      <!--查看-->
      <childLookover :inspection="examineInspection" :information="examineInformation" :msg="lookoverBoolean" @look="Onlook"></childLookover>
    </section>
    <section v-if="modifyBoolean" @click.stop class="review">
      <!--修改-->
      <childModify @click.stop v-if="modifyBoolean" :msg="modifyBoolean" :modify="modifyDate" @say="Modify" @modifysay="modiFysay"></childModify>
    </section>
    <section v-if="quipmentBoolean" class="review" @click.stop>
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
import { admindelDevice, adminfindDeviceDetail, adminFindInspectionMaintenance, admingetDevListDetailProjects, findAllDeviceType, maintainReportfindManufactures, FindDevAllstate, getDevListDetailProjectsThree, PojectdeviceApprovals2, getApproveType } from '../../api/user'
import { projectMixin, loadingMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin, loadingMixin],
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
      JurisdictionSuper: '',
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
      tabChild: '',
      checkedData: false,
      checkedChangeData: [],
      questionData: ''
    }
  },
  methods: {
    modiFysay (ev) {
      this.modifyBoolean = ev
      this.examineBoolean = ev
      this.$emit('transmission')
    },
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
      if (equipmentDate.length) {
        if (equipmentDate[equipmentDate.length - 1]) {
          equipmentdata = equipmentDate[equipmentDate.length - 1]
        } else {
          equipmentdata = ''
        }
      } else {
        equipmentdata = ''
      }
      manufactorModel = manufactorModel.length && manufactorModel[manufactorModel.length - 1] !== -1 ? manufactorModel : ''
      runningState = typeof runningState === 'number' ? runningState : ''
      AuditstatusD = AuditstatusD && AuditstatusD !== -1 ? AuditstatusD : ''

      this.axios.post(getDevListDetailProjectsThree(equipmentdata, runningState, AuditstatusD, this.adminid, manufactorModel, this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          response.data.data.forEach((val) => {
            val.checked = false
            if (val.approvalstate === 100) {
              val.disabledBoolean = false
              val.disabled = true
            } else if (val.approvalstate === 5 || val.approvalstate === 20) {
              val.disabledBoolean = true
              val.disabled = false
            } else {
              val.disabledBoolean = false
              val.disabled = true
            }
          })
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
      this.axios.post(adminfindDeviceDetail(deviceid)).then((response) => {
        if (response.data.code === 0) {
          this.examineInformation = response.data.data
          this.axios.post(adminFindInspectionMaintenance(deviceid)).then((data) => {
            if (data.data.code === 0) {
              this.examineInspection = data.data.data
              this.lookoverBoolean = true
            }
          })
        }
      })
    },
    modify (dataset, deviceId) {
      // 点击修改
      this.axios.post(adminfindDeviceDetail(deviceId)).then((response) => {
        if (response.data.code === 0) {
          this.modifyDate = response.data.data
          this.datasetAreaid = dataset.areaid
          this.modifyBoolean = true
        }
      })
    },
    question (question) {
      // 点击审核
      this.axios.post(adminfindDeviceDetail(question)).then((response) => {
        if (response.data.code === 0) {
          this.questionData = response.data.data
          this.examineBoolean = true
        }
      })
    },
    Mine (ev) {
      // 审核 传递的参数
      this.axios.post(admingetDevListDetailProjects(this.adminid, this.maintainProject)).then((response) => {
        if (!response) {
          // 请求失败关闭加载
          this.closeLoadingDialog()
          return
        }
        if (response.data.code === 0) {
          response.data.data.forEach((val) => {
            val.checked = false
            if (val.approvalstate === 100) {
              val.disabledBoolean = false
              val.disabled = true
            } else if (val.approvalstate === 5 || val.approvalstate === 20) {
              val.disabledBoolean = true
              val.disabled = false
            } else {
              val.disabledBoolean = false
              val.disabled = true
            }
          })
          this.tabChild = response.data.data
        }
        // 请求成功关闭数据加载
        this.closeLoadingDialog()
      })
      this.examineBoolean = ev
    },
    Onlook (ev) {
      this.lookoverBoolean = ev
    },
    Modify (ev) {
      this.modifyBoolean = ev
      this.axios.post(admingetDevListDetailProjects(this.datasetAreaid, this.maintainProject)).then((response) => {
        if (!response) {
          // 请求失败关闭加载
          this.closeLoadingDialog()
          return
        }
        if (response.data.code === 0) {
          response.data.data.forEach((val) => {
            val.checked = false
            if (val.approvalstate === 100) {
              val.disabledBoolean = false
              val.disabled = true
            } else if (val.approvalstate === 5 || val.approvalstate === 20) {
              val.disabledBoolean = true
              val.disabled = false
            } else {
              val.disabledBoolean = false
              val.disabled = true
            }
          })
          this.tabChild = response.data.data
        }
        // 请求成功关闭数据加载
        this.closeLoadingDialog()
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
    },
    checkedChange (ev) {
      if (ev === true) {
        this.tabChild.forEach((val) => {
          if (val.disabled !== true) {
            val.checked = true
          }
        })
      } else {
        this.tabChild.forEach((val) => {
          if (val.disabled !== true) {
            val.checked = false
          }
        })
      }
    },
    approvalstateS () {
      this.$confirm('是否将所选择的内容全部审核为归档', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let arr = []
        this.tabChild.forEach((val) => {
          if (!val.disabled) {
            if (val.checked) {
              arr.push(val.deviceid)
            }
          }
        })
        if (!arr.length) {
          this.$message({
            message: '请选择对应的设备',
            type: 'warning'
          })
          return false
        } else {
          let checkedChangeData = arr.join()
          // 审批状态 设定为100
          this.axios.post(PojectdeviceApprovals2(checkedChangeData, 100)).then((response) => {
            if (response.data.code === 0) {
              this.$message({
                message: '审批成功',
                type: 'success'
              })
              this.$emit('transmission')
            } else {
              this.$message({
                message: '审批失败',
                type: 'warning'
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  created () {
    this.openLoadingDialog()
    this.axios.post(admingetDevListDetailProjects(this.adminid, this.maintainProject)).then((response) => {
      if (!response) {
        // 请求失败关闭加载
        this.closeLoadingDialog()
        return
      }
      if (response.data.code === 0) {
        response.data.data.forEach((val) => {
          val.checked = false
          if (val.approvalstate === 100) {
            val.disabledBoolean = false
            val.disabled = true
          } else if (val.approvalstate === 5 || val.approvalstate === 20) {
            val.disabledBoolean = true
            val.disabled = false
          } else {
            val.disabledBoolean = false
            val.disabled = true
          }
        })
        this.tabChild = response.data.data
      }
      // 请求成功关闭数据加载
      this.closeLoadingDialog()
    })
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'device') {
        this.JurisdictionSelect = val.select
        this.JurisdictionDelete = val.delete
        this.JurisdictionApproval = val.approval
        this.JurisdictionUpdate = val.update
      } else if (val.functioncode === 'task_admin') {
        this.JurisdictionSuper = val.delete
      }
    })

    //  获取设备类别
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
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
    this.axios.post(getApproveType(token)).then((response) => {
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
  .header_p_eleven .el-button--text
    color #cc5966!important
    font-size 16px
  .header_p_Eleven
    color #444
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
    margin 4px
    overflow hidden
    position relative
    background #354d76
    .threelevel_li
      float left
      width 7.5%
    .threelevel_litwo
      float left
      width 18.5%
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
            margin-right 20px
            cursor pointer
  .threelevel_list_ul:hover
    background #253147
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-barckground-transparent
    z-index 1111
    overflow hidden
  .threelevel_ensconce
    overflow hidden
    z-index 1
    position absolute
    top 0
    height 100%
    width 100%
    left 0
    opacity 0
  .threelevel_lifive
    float left
    width 5.5%
    background #3279a6
    text-align center
    overflow hidden
    cursor pointer
    transition .2s
    &:hover
      background #4b92bf
  .threelevel_header li
    height 40px
    line-height 40px
  .threelevel_liL
    float left
    width 6.5%
    height 40px
    overflow hidden
    padding-left 1%
    position relative
  .superJurisdiction
    color #ff0000
</style>

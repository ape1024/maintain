<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域：</p>
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
              change-on-select
              v-model="equipmentDate"
              :options="equipment"
              :props="equipmentProps"
            ></el-cascader>
          </div>
        </li>
        <li class="li_input" v-show="false">
          <p class="div_p">审核状态：</p>
          <div class="div_input">
            <el-select size="small" v-model="Auditstatus" multiple placeholder="" :disabled="true">
              <el-option
                v-for="item in AuditstatusDate"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">工作结论：</p>
          <div class="div_input">
            <el-cascader
              size="mini"
              clearable
              change-on-select
              v-model="workconclusionData"
              :options="workconclusion"
              :props="workconclusionProps">
            </el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">时间：</p>
          <div class="div_input">
            <el-date-picker
              size="mini"
              v-model="startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">—</p>
          <p class="div_p"> </p>
          <div class="div_input">
            <el-date-picker
              size="mini"
              v-model="endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div @click.stop="query" class="query">
          查 询
        </div>
        <div @click.stop="query" class="query">
          导出Excel
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
            <li :title="item.taskName" class="header_lithree">{{item.taskName}}</li>
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
            <div @click.stop v-if="item.flag" class="inline_div">
              <dailytwoNew :Jurisdiction="JurisdictionData" :clickId="click_id" @requestdata="requestData" :dailychild="dailyChild" :clicktaskname="clicktaskName" @examinationApproval="ExaminationApproval"></dailytwoNew>
            </div>
          </transition>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import dailytwoNew from '../archivesChild-operation/dailyChild-modification'
import { projectMixin, loadingMixin } from 'common/js/mixin'
import { getWorkconclusion, getCurrentTaskDeviceStatJson, getCurrentTaskDeviceStatJsonTwo, findAreasTreeByProjectid, findAllDeviceType, getTaskQueryApprovalItems, maintainDailyCurrentTaskStat } from '../../api/user'
export default {
  mixins: [projectMixin, loadingMixin],
  name: 'dailyFile',
  components: {
    dailytwoNew
  },
  methods: {
    init () {
      //  获取区域
      this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.regionDate = response.data.data
        }
      })
      //  展示任务
      this.axios.post(maintainDailyCurrentTaskStat(2, (this.maintainProject))).then((response) => {
        if (response.data.code === 0) {
          this.tableDatataskStat = response.data.data
        }
      })
    },
    ExaminationApproval (el) {
      this.axios.post(maintainDailyCurrentTaskStat(2, this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.tableDatataskStat = response.data.data
        }
      })
    },
    // 查询
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
        let clickId = this.click_id
        let areaid = this.regionModel.length !== 0 ? this.regionModel[this.regionModel.length - 1] : ''
        let basedevicecode = this.equipmentDate.length !== 0 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        basedevicecode = basedevicecode === null ? '' : basedevicecode
        let approvalstates = this.Auditstatus.length !== 0 ? this.Auditstatus.join() : ''
        this.openLoadingDialog()
        let token = JSON.parse(window.sessionStorage.token)
        this.axios.post(getCurrentTaskDeviceStatJsonTwo(token, clickId, areaid, basedevicecode, approvalstates)).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data.length !== 0) {
              response.data.data.forEach((val) => {
                val.choose = false
                if (val.details) {
                  val.details.forEach((data) => {
                    data.flag = false
                    if (data.photos) {
                      data.photosArr = []
                      if (data.photos.indexOf(',') !== -1) {
                        let arr = data.photos.split(',')
                        data.photosArr = arr
                      } else {
                        data.photosArr.push(data.photos)
                      }
                    }
                    if (!data.iswaitapproval) {
                      if (!data.isapproval) {
                        data.iswaitapprovalName = ''
                        data.disabled = true
                      } else {
                        data.iswaitapprovalName = '已审批'
                        data.disabled = true
                      }
                    } else {
                      data.iswaitapprovalName = '待审批'
                      data.disabled = false
                    }
                    if (data.isassigned) {
                      data.isassignedName = '已安排'
                      data.disabled = true
                    } else {
                      data.isassignedName = '未安排'
                    }
                  })
                }
              })
              this.dailyChild = response.data.data
            } else {
              this.dailyChild = response.data.data
            }
          }
          this.closeLoadingDialog()
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
        this.tableDatataskStat.forEach((val) => {
          val.flag = false
        })
        this.clicktaskName = item.taskName
        let itemAreaid = item.taskID
        this.click_id = itemAreaid
        let token = JSON.parse(window.sessionStorage.token)
        this.openLoadingDialog()
        this.axios.post(getCurrentTaskDeviceStatJson(token, itemAreaid)).then((response) => {
          if (!response) {
            this.closeLoadingDialog()
            return
          }
          if (response.data.code === 0) {
            if (response.data.data.length !== 0) {
              response.data.data.forEach((val) => {
                val.choose = false
                if (val.details) {
                  val.details.forEach((data) => {
                    data.flag = false
                    if (data.photos) {
                      data.photosArr = []
                      if (data.photos.indexOf(',') !== -1) {
                        let arr = data.photos.split(',')
                        data.photosArr = arr
                      } else {
                        data.photosArr.push(data.photos)
                      }
                    }
                    if (!data.iswaitapproval) {
                      if (!data.isapproval) {
                        data.iswaitapprovalName = ''
                        data.disabled = true
                      } else {
                        data.iswaitapprovalName = '已审批'
                        data.disabled = true
                      }
                    } else {
                      data.iswaitapprovalName = '待审批'
                      data.disabled = false
                    }
                    if (data.isassigned) {
                      data.isassignedName = '已安排'
                    } else {
                      data.isassignedName = '未安排'
                    }
                    if (data.conclusion !== 1) {
                      data.disabled = true
                    }
                  })
                }
              })
              this.dailyChild = response.data.data
              item.flag = !item.flag
            } else {
              this.dailyChild = response.data.data
              item.flag = !item.flag
            }
          }
          this.closeLoadingDialog()
        })
      } else {
        item.flag = !item.flag
      }
    },
    // 格式化时间
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
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
      dailyChild: [],
      timestamp: '',
      clicktaskName: '',
      JurisdictionData: {},
      // 工作结论
      workconclusion: [],
      workconclusionData: [],
      workconclusionProps: {
        label: 'name',
        value: 'value'
      },
      // 开始时间
      startTime: '',
      // 结束时间
      endTime: ''
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_xj') {
        let obj = {
          approval: val.approval,
          check: val.check,
          assign: val.assign,
          delete: val.delete,
          insert: val.insert,
          select: val.select,
          update: val.update
        }
        this.JurisdictionData = obj
      }
    })
    // 归档时间判断  + 86400  延迟一天
    let timestamp = (new Date()).getTime()
    this.timestamp = timestamp
    // 获取区域
    this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.regionDate = response.data.data
      }
    })
    // 获取设备类别
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.equipment = response.data.data
      }
    })
    // 审核状态
    this.axios.post(getTaskQueryApprovalItems()).then((response) => {
      if (response.data.code === 0) {
        this.AuditstatusDate = response.data.data
        response.data.data.forEach((val) => {
          if (val.value === 100) {
            this.Auditstatus.push(val.value)
          }
        })
      }
    })
    // 展示任务
    this.axios.post(maintainDailyCurrentTaskStat(2, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.tableDatataskStat = response.data.data
      }
    })
    // 获得结论
    this.axios.post(getWorkconclusion()).then((response) => {
      if (response.data.code === 0) {
        console.log(response.data.data)
        this.workconclusion = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/file"
</style>

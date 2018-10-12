<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
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
        <div @click.stop="derivation" class="derivation">
          导出Excel
        </div>
      </div>
    </section>
    <section class="subject_bottom">
      <dailytwoNew :dailychild="dailychildData"></dailytwoNew>
    </section>
  </div>
</template>

<script>
import dailytwoNew from '../archives-Child-operation/archives-Child-operation'
import { projectMixin, loadingMixin } from 'common/js/mixin'
import { getCurrentTaskFileDeviceStatJson, exportMaintenanceReportForMonth } from '../../api/user'
export default {
  mixins: [projectMixin, loadingMixin],
  name: 'maintainFile',
  components: {
    dailytwoNew
  },
  methods: {
    derivation () {
      let token = JSON.parse(window.sessionStorage.token)
      let myDate = new Date()
      let month = myDate.getMonth() + 1
      let day = myDate.getDate()
      month = (month.toString().length === 1) ? ('0' + month) : month
      day = (day.toString().length === 1) ? ('0' + day) : day
      let result = myDate.getFullYear() + '-' + month + '-' + day
      console.log(result)
      let beginTime = this.startTime ? this.startTime : result
      let endTime = this.endTime ? this.endTime : result
      this.axios.post(exportMaintenanceReportForMonth(token, this.maintainProject, beginTime, endTime, 2)).then((response) => {
        console.log(response)
      })
    },
    init () {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(getCurrentTaskFileDeviceStatJson(token, 1, this.maintainProject, this.startTime, this.endTime)).then((response) => {
        if (response.data.code === 0) {
          console.log(response)
          this.dailychildData = response.data.data
        }
      })
    },
    // 查询
    query () {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(getCurrentTaskFileDeviceStatJson(token, 1, this.maintainProject, this.startTime, this.endTime)).then((response) => {
        if (response.data.code === 0) {
          console.log(response)
          this.dailychildData = response.data.data
        }
      })
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
      endTime: '',
      dailychildData: ''
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
    let timestamp = (new Date()).getTime()
    this.startTime = this.fmtDate(timestamp - 3600 * 24 * 30 * 1000)
    this.endTime = this.fmtDate(timestamp + 3600 * 24 * 1000)
    this.timestamp = timestamp
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(getCurrentTaskFileDeviceStatJson(token, 1, this.maintainProject, this.startTime, this.endTime)).then((response) => {
      if (response.data.code === 0) {
        console.log(response)
        this.dailychildData = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/file"
</style>

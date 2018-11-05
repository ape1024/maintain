<template>
  <div class="subject">
    <div class="section">
      <div class="sectionDiv">
        <h4 class="sectionH4">工作计划 新增</h4>
        <div class="section_div">
          <div class="sectionTop">
            <ul class="sectionTopul">
              <li class="sectionTopli">
                <span class="sectionTopliSpan">计划名称:</span>
                <span class="sectionTopliSpantwo">
                  <el-input  size="mini" v-model="planName" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <li class="sectionTopli">
                <span class="sectionTopliSpan">计划编号:</span>
                <span class="sectionTopliSpantwo">
                  <el-input size="mini" v-model="planCode" placeholder="请输入内容"></el-input>
                </span>
              </li>
            </ul>
            <ul class="sectionTopul">
              <li class="sectionTopli">
                <span class="sectionTopliSpan">开始时间:</span>
                <span class="sectionTopliSpantwo">
                <el-date-picker
                  size="mini"
                  v-model="startTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                </span>
              </li>
              <li class="sectionTopli">
                <span class="sectionTopliSpan">结束时间:</span>
                <span class="sectionTopliSpantwo">
                   <el-date-picker
                     size="mini"
                     v-model="endTime"
                     type="date"
                     value-format="yyyy-MM-dd"
                     placeholder="选择日期">
                   </el-date-picker>
                </span>
              </li>
            </ul>
          </div>
          <div class="sectionbottom">
            <div class="sectionbottomLeft">
              <div class="sectionbottomLefttop">
              </div>
              <div class="sectionbottomLeftbottom">
                <span class="sectionTopliSpanfour">计划说明:</span>
                <span class="sectionTopliSpanfive">
                   <el-input
                     type="textarea"
                     :rows="2"
                     resize="none"
                     placeholder="请输入内容"
                     v-model="planDescription">
                   </el-input>
                </span>
              </div>
            </div>
            <div class="sectionbottomRight">
              <div class="sectionbottomRightDiv">
                <span class="sectionTopliSpanSeven">任务类型:</span>
                <span class="sectionTopliSpansix">
                    <el-select size="mini" @change="scheduleChange" v-model="scheduleData" placeholder="请选择">
                      <el-option
                        v-for="item in schedule"
                        :key="item.worktypeid"
                        :label="item.worktypename"
                        :value="item.worktypeid">
                      </el-option>
                    </el-select>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="lookupChoose">
          <ul class="lookupChooseUl">
            <li class="lookupChooseLi">
              <div class="lookupChooseLiTop">
                <p class="lookupChooseLiTop_p">选择执行人</p>
              </div>
              <div class="lookupChooseLiBottom">
                <div class="personCharge">
                  <div class="personChargeDiv">
                    <el-checkbox-group v-model="maintenanceList">
                      <el-tree
                        class="tree"
                        :data="maintenance"
                        node-key="value"
                        :props="proprietorProps">
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                          <div class="nodeLabel">{{ node.label }}</div>
                          <div class="tree-checkbox">
                            <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                              <el-checkbox :label="`${item.userid},${item.organizationid}`"
                                           :disabled="proprietorCheckList.length > 0">
                                <svg class="icon" style="color:lightblue ;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1593"><path d="M717.664 612.195c-52.734 47.461-121.289 79.102-200.391 79.102s-147.656-31.641-205.664-79.102c-131.836 68.555-221.484 158.203-221.484 321.68l843.75 0c0-163.477-89.648-247.852-216.211-321.68zM512 628.016c131.836 0 237.305-110.742 237.305-242.578s-105.469-242.578-237.305-242.578-237.305 110.742-237.305 242.578c0 137.109 110.742 242.578 237.305 242.578z" p-id="1594"></path></svg>
                                <span class="nodeLabel">{{item.username}}</span>
                              </el-checkbox>
                            </div>
                          </div>
                        </div>
                      </el-tree>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </li>
            <li class="lookupChooseLi">
              <div class="lookupChooseLiTop">
                <p class="lookupChooseLiTop_p">选择建筑范围</p>
              </div>
              <div class="lookupChooseLiBottom">
                <div class="personCharge">
                  <div class="personChargeDiv">
                    <el-tree
                      :data="purview"
                      show-checkbox
                      accordion
                      @check="lookupchooseChange"
                      node-key="value"
                      :props="defaultProps">
                      <div class="custom-tree-node" slot-scope="{ node, data }">
                        <div class="nodeLabel">{{ node.label }}</div>
                      </div>
                    </el-tree>
                  </div>
                </div>
              </div>
            </li>
            <li class="lookupChooseLi">
              <div class="lookupChooseLiTop">
                <p class="lookupChooseLiTop_p">选择消防设施</p>
              </div>
              <div class="lookupChooseLiBottom">
                <div class="personCharge">
                  <div class="personChargeDiv">
                    <el-tree
                      :data="facilities"
                      show-checkbox
                      node-key="id"
                      accordion
                      @check="handleCheckChange"
                      :props="facilitiesProps">
                      <div class="custom-tree-node" slot-scope="{ node, data }">
                        <div class="nodeLabel">{{ node.label }}</div>
                      </div>
                    </el-tree>
                  </div>
                </div>
              </div>
            </li>
            <li class="lookupChooseLi">
              <div class="lookupChooseLiTop">
                <p class="lookupChooseLiTop_p">{{lookupChooseLiTopText}}</p>
              </div>
              <div class="frequency">
                <el-radio-group v-if="groupBoolean" v-model="frequencyradio">
                  <ul class="frequencyUl">
                    <li class="frequencyLi" @change="frequencyChange(item)" :key="index" v-for="(item,index) in frequency">
                      <el-radio class="nodeLabel" :label="item.value">{{item.desc}}</el-radio>
                    </li>
                    <li v-show="monthsNumber" class="frequencyLi">
                     <p class="frequencyLi_P">
                       <span>每天</span>
                       <el-input-number :disabled="dayShift" size="mini" v-model="manyClasses" controls-position="right" @change="handleChange" :min="1"></el-input-number>
                       <span>班</span>
                     </p>
                      <p>
                        每班
                        <el-input-number size="mini" v-model="classesGrades" controls-position="right" :disabled="true" ></el-input-number>
                        小时
                      </p>
                    </li>
                    <li v-show="!monthsNumber" class="frequencyLi">
                      <p class="frequencyLi_P">
                       <span>
                        每月
                        <el-input-number v-model="numbers" controls-position="right"  size="mini" :min="1" :max="28"></el-input-number> 号巡检
                       </span>
                      </p>
                    </li>
                  </ul>
                </el-radio-group>
                <ul v-if="!groupBoolean"  class="frequencyUl">
                    <li class="frequencyLi">
                      <el-radio v-model="groupradio" v-show="!scheduleBoolean" label="3">巡检频次-按月</el-radio>
                     <p class="frequencyLi_P">
                        <span>
                        固定每月
                        <el-input-number v-model="numbers" controls-position="right"  size="mini" :min="1" :max="28"></el-input-number>
                          号生成计划
                      </span>
                     </p>
                    </li>
                  </ul>
              </div>
             <div v-show="scheduleBoolean">
               <div class="lookupChooseLiTop">
                 <p class="lookupChooseLiTop_p">选择工作类型</p>
               </div>
               <div class="frequencytwo">
                 <ul class="frequencyUl">
                   <li :key="index" v-for="(item, index) in Worktype" class="frequencyLi">
                     <el-checkbox v-model="item.flag">{{item.workmodename}}</el-checkbox>
                   </li>
                 </ul>
               </div>
             </div>
            </li>
          </ul>
        </div>
        <div class="fastener">
          <div @click="conserve" class="conserve">
            保存
          </div>
          <div @click="closedown" class="closedown">
            关闭
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectMixin } from 'common/js/mixin'
import { maintainArranggetGetPlanCode, createChecktask, createPlan, maintainArranggetWorkModesByWorkType, getAllOrgTreeeByProjectId, findAreasTreeByProjectid, findAllDeviceType, maintainArranggetAllPlanTypes, maintainArranggetAllCheckFrequency } from '../../api/user'
export default {
  mixins: [projectMixin],
  name: 'arrangedChild-newlybuild',
  data () {
    return {
      maintenanceData: '',
      maintenance: [],
      repairCheckList: [],
      proprietorCheckList: [],
      maintenanceList: [],
      input: '',
      textarea: '',
      proprietorProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      value1: '',
      purview: [],
      defaultProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      facilities: [],
      facilitiesProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      schedule: [],

      manyClasses: '',
      frequencyradio: '',
      frequency: '',
      classesGrades: '24',
      Worktype: [],
      handleCheckData: [],
      groupBoolean: true,
      dayShift: true,
      //  计划名称
      planName: '',
      //  计划编号
      planCode: '',
      //  开始时间
      startTime: '',
      //  结束时间
      endTime: '',
      //  技术说明
      planDescription: '',
      //  任务类型
      scheduleData: '',
      //  工作类型
      checkList: [],
      groupradio: '3',
      //  巡检范围
      lookupchooseData: [],
      numbers: '1',
      monthsNumber: true,
      //  频次data
      frequencyData: '',
      // 当前时间
      dateNow: '',
      // 存储计划编号
      planCodeTemp: '',
      scheduleBoolean: false,
      lookupChooseLiTopText: '选择计划生成时间',
      conserveStore: false
    }
  },
  methods: {
    getDate () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate
      this.dateNow = currentdate
    },
    conserve () {
      this.getDate()
      let token = JSON.parse(window.sessionStorage.token)
      let worktypeid = this.scheduleData
      let projectid = this.maintainProject
      let planName = this.planName
      let planCode = this.planCode
      let planDesc = this.planDescription
      let startDate = this.startTime
      let endDate = this.endTime
      if (planName === '') {
        this.$message({
          message: '请填写计划名称!',
          type: 'warning'
        })
        return false
      }
      if (planCode === '') {
        this.$message({
          message: '请填写计划编号!',
          type: 'warning'
        })
        return false
      }
      if (planDesc === '') {
        this.$message({
          message: '请填写计划说明!',
          type: 'warning'
        })
        return false
      }
      if (startDate === '') {
        this.$message({
          message: '请填写开始时间!',
          type: 'warning'
        })
        return false
      }
      if (endDate === '') {
        this.$message({
          message: '请填写结束时间!',
          type: 'warning'
        })
        return false
      }
      if (startDate > endDate) {
        this.$message({
          message: '开始时间大于结束时间!',
          type: 'warning'
        })
        return false
      }
      if (this.dateNow > endDate) {
        this.$message({
          message: '结束时间不能小于当前时间!',
          type: 'warning'
        })
        return false
      }
      // workmodes  工作类型
      // let worktype = []
      let worktypeData = []
      if (this.Worktype.length !== 0) {
        this.Worktype.forEach((val) => {
          if (val.flag) {
            let data = {
              'workmodeid': val.workmodeid
            }
            worktypeData.push(data)
          } else {
            return false
          }
        })
        if (worktypeData.length === 0) {
          this.$message({
            message: '没有选择工作类型!',
            type: 'warning'
          })
          return
        }
      } else {
      // 没有选择任务类型
        this.$message({
          message: '没有选择任务类型!',
          type: 'warning'
        })
        return false
      }
      // 选择消防设施
      let newArr = []
      if (this.handleCheckData.length !== 0) {
        this.handleCheckData.forEach((val) => {
          if (val.hierarchy === 2) {
            let obj = {
              basedevicecode: val.code,
              basedeviceid: val.id,
              basedevicename: val.name
            }
            newArr.push(obj)
          } else {
            return false
          }
        })
      } else {
      //  没有选择消防设施
        this.$message({
          message: '没有选择消防设施!',
          type: 'warning'
        })
        return false
      }
      // newArr = this.handleCheckData.filter((val) => wipeOff.indexOf(val) === -1)
      // 执行人
      let users = []
      if (this.maintenanceList.length !== 0) {
        this.maintenanceList.forEach((val) => {
          let arr = val.split(',')
          let data = {
            userid: arr[0],
            organizationid: arr[1]
          }
          users.push(data)
        })
      } else {
      //  没有选择执行人
        this.$message({
          message: '没有选择执行人!',
          type: 'warning'
        })
        return false
      }
      //   巡检范围
      let scopeInspection = []
      if (this.lookupchooseData.length !== 0) {
        this.lookupchooseData.forEach((val) => {
          let data = {
            areaid: val.areaid,
            areacode: val.areacode,
            areaname: val.areaname
          }
          scopeInspection.push(data)
        })
      } else {
      //  没有选 巡检范围
        this.$message({
          message: '没有选择巡检范围!',
          type: 'warning'
        })
        return false
      }
      //  频次
      //   let checkFrequency = this.frequencyradio
      //  间隔时间
      //  制定创建时间  createTaskTime
      //   d 是 月  w是周
      let interval = ''
      let createTaskTime = ''
      if (this.groupBoolean) {
        if (!this.frequencyData) {
          this.$message({
            message: '没有选择频次!',
            type: 'warning'
          })
          return false
        }
        if (this.frequencyData === 1) {
          interval = '1d'
          createTaskTime = ''
        } else if (this.frequencyData === 2) {
          interval = '1w'
          createTaskTime = 'w1'
        } else if (this.frequencyData === 3) {
          interval = '1m'
          createTaskTime = `d${this.numbers}`
        } else if (this.frequencyData === 5) {
          interval = `${this.manyClasses}b`
          createTaskTime = `b${this.manyClasses}`
        }
      } else {
        interval = `1m`
        createTaskTime = `d${this.numbers}`
        this.frequencyData = 3
      }
      //  巡检范围  scopeInspection
      //  消防设施  checkplandetails
      //  执行人   users
      //  工作模式  workmodes
      let param = {
        areas: scopeInspection,
        checkplandetails: newArr,
        users: users,
        workmodes: worktypeData
      }
      // 频次
      if (this.conserveStore) {
        this.$message({
          message: '请勿重复提交,耐心等待!',
          type: 'warning'
        })
        return false
      }
      this.conserveStore = false
      let checkFrequency = this.frequencyData
      this.axios.post(createPlan(token, worktypeid, projectid, planName, planCode, planDesc, startDate, endDate, checkFrequency, interval, createTaskTime), param).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          let planId = response.data.data
          if (this.dateNow >= startDate && this.dateNow <= endDate) {
            this.$confirm('计划已创建成功, 是否立即生成任务?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.axios.post(createChecktask(planId)).then((response) => {
                if (response.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '生成成功!'
                  })
                } else {
                  this.$message.error(`${response.data.message}`)
                }
              })
            })
          }
          this.$emit('build', false)
        } else {
          this.$message.error('创建失败')
        }
      })
    },
    lookupchooseChange (data, checked, indeterminate) {
      this.lookupchooseData = checked.checkedNodes
    },
    scheduleChange (value) {
      this.axios.post(maintainArranggetWorkModesByWorkType(value)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length === 1) {
            response.data.data.forEach(val => {
              val.flag = true
            })
          } else {
            response.data.data.forEach(val => {
              val.flag = false
            })
          }
          this.Worktype = response.data.data
        }
      })
      if (value === 2) {
        this.groupBoolean = true
      } else {
        this.groupBoolean = false
      }
      // 获取计划编号
      if (!this.planCode || this.planCode === this.planCodeTemp) {
        this.axios.post(maintainArranggetGetPlanCode(this.maintainProject, value)).then((response) => {
          if (response.data.code === 0) {
            this.planCode = response.data.data
            this.planCodeTemp = response.data.data
          }
        })
      }
    },
    closedown () {
      this.$emit('build', false)
    },
    handleCheckChange (data, checked, indeterminate) {
      this.handleCheckData = checked.checkedNodes
    },
    frequencyChange (data) {
      this.frequencyData = data.value
      if (data.value === 5) {
        this.dayShift = false
        this.monthsNumber = true
        return false
      } if (data.value === 3) {
        this.monthsNumber = false
        return false
      } else {
        this.dayShift = true
        this.monthsNumber = true
      }
    },
    handleChange (value) {
      let num = 24 / value
      this.classesGrades = num.toFixed(2)
    }
  },
  watch: {
    scheduleData (el) {
      if (el === 3) {
        this.scheduleBoolean = true
      } else {
        this.scheduleBoolean = false
      }
      if (el === 1 || el === 3) {
        this.lookupChooseLiTopText = `选择计划生成时间`
      } else {
        this.lookupChooseLiTopText = `选择巡检频次`
      }
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    //  维保单位 this.equipment
    // maintainDailygetRepairOrgTreeByDeviceId
    this.axios.post(getAllOrgTreeeByProjectId(this.maintainProject, token)).then((response) => {
      if (response.data.code === 0) {
        this.maintenance = response.data.data
      }
    })
    //  获取巡检范围
    this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.purview = response.data.data
      }
    })
    //  获取消防设施
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        let recursion = (data) => {
          data.forEach((val) => {
            val.hierarchy = 1
            if (val.children !== null) {
              val.children.forEach((record) => {
                record.hierarchy = 2
              })
            }
          })
        }
        recursion(response.data.data)
        let arr = [{
          'id': 0,
          'name': '全部',
          'code': null,
          'unit': null,
          'ischeck': false,
          'children': response.data.data
        }]
        this.facilities = arr
      }
    })
    //  获取计划类型
    this.axios.post(maintainArranggetAllPlanTypes(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.schedule = response.data.data
      }
    })
    this.axios.post(maintainArranggetAllCheckFrequency()).then((response) => {
      if (response.data.code === 0) {
        this.frequency = response.data.data
      }
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    margin-top 40px
    background #111a28
    .section
      overflow hidden
      position relative
      background #111a28
      padding 30px 0
      margin 80px 0
    .section
      overflow hidden
      position relative
      width: 1235px
      margin: 0 auto
      .sectionH4
        margin-bottom 22px
        color $color-text-title
        font-size 18px
      .section_div
        position relative
        overflow hidden
        margin-left 75px
        .sectionTop
          overflow hidden
          font-size 18px
          color #d5d5d5
          border-bottom 1px solid #263652
          padding-bottom 10px
          width 100%
          .sectionTopul
            position relative
            margin-bottom 10px
            overflow hidden
            .sectionTopli
              float left
              overflow hidden
              position relative
              font-size 16px
              width 33.5%
        .sectionbottom
          overflow hidden
          position relative
          .sectionbottomLeft
            overflow hidden
            float left
            position relative
            width 780px
            .sectionbottomLefttop
              overflow hidden
              margin 10px 0
              position relative
              .sectionbottomLefttopone
                overflow hidden
                float left
                position relative
                width 50%
            .sectionbottomLeftbottom
              overflow hidden
              position relative
          .sectionbottomRight
            float right
            margin-right 15px
            margin-top 40px
            position relative
            overflow hidden
            .sectionbottomRightDiv
              margin-bottom 10px
              overflow hidden
      .lookupChoose
        margin 10px 0 0  23px
        position relative
        overflow hidden
        .lookupChooseUl
          position relative
          overflow hidden
          .lookupChooseLi
            float left
            overflow hidden
            margin-left 5px
            width 295px
            .lookupChooseLiTop
              overflow hidden
              font-size 16px
              color #fff
              background #354d76
              line-height 40px
              height 40px
              width 100%
              .lookupChooseLiTop_p
                padding-left 14px
            .lookupChooseLiBottom
              width 100%
              background #0b111a
              height 460px
              overflow-y auto
  .sectionTopliSpantwo
    width 202px
    line-height 38px
    display inline-block
  .sectionTopliSpan
    display inline-block
    font-size 16px
    color #d5d5d5
    margin-right 10px
  .sectionTopliSpanthree
    display inline-block
    width 593px
  .sectionTopliSpanfour
    float left
    color #d5d5d5
    font-size 16px
    margin-top 20px
    margin-right 16px
  .sectionTopliSpanfive
    width 594px
    float left
  .sectionTopliSpansix
    display inline-block
    overflow hidden
    width 202px
  .sectionTopliSpanSeven
    float left
    color #d5d5d5
    font-size 16px
    margin-top 10px
    margin-right 16px
  .el-tree
    background transparent
  .personChargeP
    margin 20px 0 20px 10px
    color #fff
  .personCharge
    overflow hidden
    position relative
  .sectionToplitwo
    width 25%
    overflow hidden
    float right
  .frequency
    width 100%
    background #0b111a
    height 240px
    margin-bottom 5px
  .frequencytwo
    width 100%
    background #0b111a
    height 151px
  .fastener
    init()
    text-align center
    margin-top 10px
    .conserve
      conserve()
      margin-right 40px
    .closedown
      closedown()
  .el-date-editor.el-input
    width 202px
  .el-input__icon
    line-height 30px
  .personChargeDiv
    color #d5d5d5
    margin-top 20px
    overflow hidden
    position relative
    line-height 26px
  .el-input-number
    position relative
    display inline-block
    width 130px
    line-height 28px
  .frequencyUl
    overflow hidden
    margin 12px 0 0 16px
    .frequencyLi
      font-size 12px
      color #d5d5d5
      margin-bottom 18px
  .nodeLabel
    color #d5d5d5
    font-size 14px
  .frequencyLi_P
    margin 20px 0
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 16px;
    height: 16px;
    background-color: #F5F5F5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
</style>

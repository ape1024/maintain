<template>
  <div class="subject">
    <div class="section">
      <div class="sectionDiv">
        <h4 class="sectionH4">新增计划</h4>
        <div class="section_div">
          <div class="sectionTop">
            <ul class="sectionTopul">
              <li class="sectionTopli">
                <span class="sectionTopliSpan">计划名称:</span>
                <span class="sectionTopliSpantwo">
                  <el-input v-model="planName" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <li class="sectionTopli">
                <span class="sectionTopliSpan">计划编号:</span>
                <span class="sectionTopliSpantwo">
                  <el-input v-model="planCode" placeholder="请输入内容"></el-input>
                </span>
              </li>
            </ul>
            <ul class="sectionTopul">
              <li class="sectionTopli">
                <span class="sectionTopliSpan">开始时间:</span>
                <span class="sectionTopliSpantwo">
                <el-date-picker
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
                    <el-select @change="scheduleChange" v-model="scheduleData" placeholder="请选择">
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
                        node-key="id"
                        :props="proprietorProps">
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                          <div class="nodeLabel">{{ node.label }}</div>
                          <div class="tree-checkbox">
                            <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                              <el-checkbox :label="item.userid" :disabled="proprietorCheckList.length > 0">{{item.username}}</el-checkbox>
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
                <p class="lookupChooseLiTop_p">选择巡检范围</p>
              </div>
              <div class="lookupChooseLiBottom">
                <div class="personCharge">
                  <div class="personChargeDiv">
                    <el-tree
                      :data="purview"
                      show-checkbox
                      accordion
                      @check="lookupchooseChange"
                      node-key="id"
                      :props="defaultProps">
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
                    </el-tree>
                  </div>
                </div>
              </div>
            </li>
            <li class="lookupChooseLi">
              <div class="lookupChooseLiTop">
                <p class="lookupChooseLiTop_p">选择巡检频次</p>
              </div>
              <div class="frequency">
                <el-radio-group v-if="groupBoolean" v-model="frequencyradio">
                  <ul class="frequencyUl">
                    <li class="frequencyLi" @change="frequencyChange(item)" :key="index" v-for="(item,index) in frequency">
                      <el-radio :label="item.value">{{item.desc}}</el-radio>
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
                        <el-input-number v-model="numbers" controls-position="right"  size="mini" :min="1" :max="31"></el-input-number> 号巡检
                       </span>
                      </p>
                    </li>
                  </ul>
                </el-radio-group>
                <ul v-if="!groupBoolean"  class="frequencyUl">
                    <li class="frequencyLi">
                      <el-radio v-model="groupradio" label="3">巡检频次-按月</el-radio>
                     <p class="frequencyLi_P">
                        <span>
                        每月
                        <el-input-number v-model="numbers" controls-position="right"  size="mini" :min="1" :max="31"></el-input-number>
                          号巡检
                      </span>
                     </p>
                    </li>
                  </ul>
              </div>
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
export default {
  name: 'arrangedChild-lookup',
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
      monthsNumber: true
    }
  },
  methods: {
    conserve () {
      console.log(this.frequencyradio)
      let token = JSON.parse(window.sessionStorage.token)
      let worktypeid = this.scheduleData
      let projectid = JSON.parse(window.localStorage.pattern)
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
      console.log(token)
      console.log(worktypeid)
      console.log(planName)
      console.log(planCode)
      console.log(planDesc)
      console.log(startDate)
      console.log(endDate)
      console.log(this.maintenanceList)
      console.log(this.maintenance)
      //   workmodes  工作类型
      console.log(this.Worktype)
      let worktype = []
      let worktypeData = []
      if (this.Worktype.length !== 0) {
        this.Worktype.forEach((val) => {
          if (val.flag) {
            worktype.push(val.workmodeid)
          } else {
            return false
          }
        })
      } else {
      //   没有工作类型 ,意味着没有选择任务类型
        this.$message({
          message: '没有选择任务类型!',
          type: 'warning'
        })
        return false
      }
      if (worktype.length !== 0) {
        worktype.forEach((val) => {
          let data = {
            'workmodeid': val.workmodeid
          }
          worktypeData.push(data)
        })
      } else {
      //  没有选择工作类型
        this.$message({
          message: '没有选择工作类型!',
          type: 'warning'
        })
        return false
      }
      //  选择消防设施
      let newArr = []
      console.log('11111111111111111')
      console.log(this.handleCheckData)
      if (this.handleCheckData.length !== 0) {
        this.handleCheckData.forEach((val) => {
          if (val.hierarchy === 2) {
            let obj = {
              code: val.code,
              id: val.id,
              name: val.name
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

      console.log(newArr)
      // newArr = this.handleCheckData.filter((val) => wipeOff.indexOf(val) === -1)
      //  执行人
      let users = []
      if (this.maintenanceList.length !== 0) {
        this.maintenanceList.forEach((val) => {
          console.log(val)
          let data = {
            userid: val
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
            id: val.areaid,
            code: val.areacode,
            name: val.areaname
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
      let interval = ''
      let createTaskTime = ''
      console.log('00000000')
      console.log(this.frequencyradio)
      console.log('00000000')
      if (this.groupBoolean) {
        console.log(this.frequencyradio)
        if (this.frequencyradio === 1) {
          interval = '1d'
          createTaskTime = 'd1'
        } else if (this.frequencyradio === 2) {
          interval = '1w'
          createTaskTime = 'w1'
        } else if (this.frequencyradio === 3) {
          interval = '1m'
          createTaskTime = `m${this.numbers}`
        } else if (this.frequencyradio === 5) {
          interval = `${this.manyClasses}b`
          createTaskTime = `b${this.manyClasses}`
        }
        console.log(interval)
      } else {
        interval = `1m`
        createTaskTime = `m${this.numbers}`
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
      //  频次
      let checkFrequency = this.frequencyradio
      this.axios.post(`http://172.16.6.181:8920/plan/createPlan?token=${token}&worktypeid=${worktypeid}&projectid=${projectid}&planName=${planName}&planCode=${planCode}&planDesc=${planDesc}&startDate=${startDate}&endDate=${endDate}&checkFrequency=${checkFrequency}&interval=${interval}&createTaskTime=${createTaskTime}`, param).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$emit('')
        } else {
          this.$message.error('创建失败')
        }
      })
    },
    lookupchooseChange (data, checked, indeterminate) {
      console.log(checked.checkedNodes)
      this.lookupchooseData = checked.checkedNodes
    },
    scheduleChange (value) {
      console.log(value)
      this.frequencyradio = value
      this.axios.post(`http://172.16.6.181:8920/plan/getWorkModesByWorkType?workType=${value}`).then((response) => {
        if (response.data.code === 0) {
          response.data.data.forEach(val => {
            val.flag = false
          })
          this.Worktype = response.data.data
        }
      })
      if (value === 2) {
        this.groupBoolean = true
      } else {
        this.groupBoolean = false
      }
    },
    closedown () {
      console.log(this.Worktype)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      this.handleCheckData = checked.checkedNodes
    },
    frequencyChange (data) {
      console.log(data)
      if (data.value === 5) {
        this.dayShift = false
        console.log('1')
        this.monthsNumber = true
        return false
      } if (data.value === 3) {
        this.monthsNumber = false
        console.log('2')
        return false
      } else {
        this.dayShift = true
        this.monthsNumber = true
        console.log('3')
      }
    },
    handleChange (value) {
      console.log(value)
      let num = 24 / value
      console.log(num)
      this.classesGrades = num.toFixed(2)
    }
  },
  created () {
    //  维保单位 this.equipment
    this.axios.post(`http://172.16.6.181:8920/organization/getRepairOrgTreeByDeviceId?deviceid=12690`).then((response) => {
      if (response.data.code === 0) {
        this.maintenance = response.data.data
      }
    })
    let projectid = window.localStorage.pattern
    console.log(projectid)
    //  获取巡检范围
    this.axios.post(`http://172.16.6.181:8920/areas/findAreasTreeByProjectid?projectid=${projectid}`).then((response) => {
      if (response.data.code === 0) {
        this.purview = response.data.data
      }
    })
    //  获取消防设施
    this.axios.post(`http://172.16.6.181:8920/dev/findAllDeviceType`).then((response) => {
      if (response.data.code === 0) {
        console.log('122333')
        response.data.data.splice(0, 1)
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
    this.axios.post(`http://172.16.6.181:8920/plan/getAllPlanTypes`).then((response) => {
      if (response.data.code === 0) {
        this.schedule = response.data.data
      }
    })
    this.axios.post(`http://172.16.6.181:8920/plan/getAllCheckFrequency`).then((response) => {
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
    margin-top 60px
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
            margin-top 40px
            position relative
            overflow hidden
            .sectionbottomRightDiv
              margin-bottom 10px
              overflow hidden
      .lookupChoose
        margin 30px 0 0  23px
        position relative
        overflow hidden
        .lookupChooseUl
          position relative
          overflow hidden
          .lookupChooseLi
            float left
            overflow hidden
            margin-left 53px
            width 250px
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
              overflow-y scroll
  .sectionTopliSpantwo
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
    margin-top 40px
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
      color #eee
      margin-bottom 18px
  .nodeLabel
    color #666
    font-size 14px
  .frequencyLi_P
    margin 20px 0
</style>

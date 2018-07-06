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
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <li class="sectionTopli">
                <span class="sectionTopliSpan">计划编号:</span>
                <span class="sectionTopliSpantwo">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </span>
              </li>
              <li class="sectionToplitwo">
                <span class="sectionTopliSpan">计划状态:</span>
                <span class="sectionTopliSpantwo">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
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
                     v-model="textarea">
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
                          <div>{{ node.label }}</div>
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
                <el-radio-group v-model="radio2">
                  <ul class="frequencyUl">
                    <li class="frequencyLi" :key="index" v-for="(item,index) in frequency">
                      <el-radio :label="item.value">{{item.desc}}</el-radio>
                    </li>
                    <li class="frequencyLi">
                      <span>每天</span>
                      <el-input-number size="mini" v-model="num8" controls-position="right" @change="handleChange" :min="1"></el-input-number>
                      <span>班</span>
                    </li>
                    <li class="frequencyLi">
                      每班
                      <el-input-number size="mini" v-model="classesGrades" controls-position="right" :disabled="true" ></el-input-number>
                      小时
                    </li>
                  </ul>
                </el-radio-group>
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
          <div class="conserve">
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
      scheduleData: '',
      num8: '',
      radio2: '',
      frequency: '',
      classesGrades: '',
      Worktype: ''
    }
  },
  methods: {
    scheduleChange (value) {
      console.log(value)
      this.axios.post(`http://172.16.6.181:8920/plan/getWorkModesByWorkType?workType=${value}`).then((response) => {
        if (response.data.code === 0) {
          response.data.data.forEach(val => {
            val.flag = false
          })
          this.Worktype = response.data.data
        }
      })
    },
    closedown () {
      console.log(this.Worktype)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
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
        this.facilities = response.data.data
        console.log(this.facilities)
      }
    })
    //  获取计划类型
    this.axios.post(`http://172.16.6.181:8920/plan/getAllPlanTypes`).then((response) => {
      if (response.data.code === 0) {
        this.schedule = response.data.data
        console.log(this.schedule)
      }
    })
    this.axios.post(`http://172.16.6.181:8920/plan/getAllCheckFrequency`).then((response) => {
      if (response.data.code === 0) {
        this.frequency = response.data.data
        console.log('1111111111111111111111')
        console.log(this.frequency)
      }
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    margin-top 70px
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
          padding-bottom 20px
          width 100%
          .sectionTopul
            position relative
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
              margin 20px 0
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
            margin-top 50px
            position relative
            overflow hidden
            .sectionbottomRightDiv
              margin-bottom 20px
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
    height 165px
    margin-bottom 5px
  .frequencytwo
    width 100%
    background #0b111a
    height 250px
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
      margin-bottom 6px
</style>

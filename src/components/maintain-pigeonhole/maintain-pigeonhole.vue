<template>
  <div class="subject">
    <div class="subjectDiv">
      <div class="pigeonholeLeft">
        <div class="leftHeader">
          <img class="subjectImg" src="../../common/img/department.png" alt="">
          <p class="subjectP">
            维保工作档案
          </p>
        </div>
        <div class="leftSubject">
          <div class="leftSubjectDiv">
            <el-tree
              ref="treeDom"
              default-expand-all
              highlight-current
              :data="data"
              node-key="id"
              :props="defaultProps"
              @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
      <div class="pigeonholeRight">
        <!--检查测试 2-->
        <div v-if="InspectionFalse" class="pigeonholeRightDiv">
          <Inspection></Inspection>
        </div>
        <!--维护保养 2-->
        <div v-if="maintenanceFalse" class="pigeonholeRightDiv">
          <maintenance></maintenance>
        </div>
        <!--日常巡检  2-->
        <div class="pigeonholeRightDiv" v-if="routineInspectionFalse">
          <routineInspection></routineInspection>
        </div>
        <!--维保项目  4-->
        <div v-if="MaintenanceprojectFalse" class="pigeonholeRightDiv">
          <Maintenanceproject></Maintenanceproject>
        </div>
        <!--故障问题 5-->
        <div v-if="faultproblemFalse" class="pigeonholeRightDiv">
          <faultproblem></faultproblem>
        </div>
        <!--现场反馈  3-->
        <div v-if="feedbackFalse" class="pigeonholeRightDiv">
          <feedback></feedback>
        </div>
        <!--消防设施 1-->
        <div v-if="protectionFacilities" class="pigeonholeRightDiv">
          <protectionFacilities></protectionFacilities>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Inspection from '../pigeonhole-operation/pigeonhole-Inspection'
import maintenance from '../pigeonhole-operation/pigeonhole-maintenance'
import routineInspection from '../pigeonhole-operation/pigeonhole-routineInspection'
import Maintenanceproject from '../pigeonhole-operation/pigeonhole-Maintenanceproject'
import faultproblem from '../pigeonhole-operation/pigeonhole-faultproblem'
import feedback from '../pigeonhole-operation/pigeonhole-feedback'
import protectionFacilities from '../pigeonhole-operation/pigeonhole-protectionFacilities'
export default {
  name: 'maintain-pigeonhole',
  components: {
    Inspection,
    maintenance,
    routineInspection,
    Maintenanceproject,
    faultproblem,
    feedback,
    protectionFacilities
  },
  data () {
    return {
      data: [{
        label: '单位基本情况',
        children: [{
          label: '维保项目',
          id: 4,
          category: 4
        }, {
          label: '消防设施',
          category: 1,
          id: 1
        }]
      }, {
        id: 2,
        label: '维保工作记录',
        children: [{
          label: '日常巡检',
          category: 2,
          id: 22
        }, {
          label: '检查测试',
          id: 33,
          category: 2
        }, {
          label: '维护保养',
          category: 2,
          id: 11
        }, {
          label: '故障问题',
          category: 5,
          id: 5
        }, {
          label: '现场反馈',
          category: 3,
          id: 3
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      categoryId: '',
      //  检查测试
      InspectionFalse: false,
      //  维护保养
      maintenanceFalse: false,
      //  日常巡检
      routineInspectionFalse: false,
      //  维保项目
      MaintenanceprojectFalse: true,
      //  故障问题
      faultproblemFalse: false,
      //  现场反馈
      feedbackFalse: false,
      //  消防设施
      protectionFacilities: false
    }
  },
  methods: {
    handleNodeClick (data) {
      this.maintenanceFalse = false
      this.routineInspectionFalse = false
      this.InspectionFalse = false
      this.MaintenanceprojectFalse = false
      this.feedbackFalse = false
      this.protectionFacilities = false
      this.faultproblemFalse = false
      if (data.category === 2) {
        if (data.id === 11) {
          this.maintenanceFalse = true
        } else if (data.id === 22) {
          this.routineInspectionFalse = true
        } else if (data.id === 33) {
          this.InspectionFalse = true
        }
      } else if (data.category === 4) {
        this.MaintenanceprojectFalse = true
      } else if (data.category === 3) {
        this.feedbackFalse = true
      } else if (data.category === 1) {
        this.protectionFacilities = true
      } else if (data.category === 5) {
        this.faultproblemFalse = true
      }
    }
  },
  mounted () {
    this.$refs.treeDom.setCurrentKey(4)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    overflow hidden
    margin 12px
    position relative
    background rgba(0,0,0,0.45)
    .pigeonholeLeft
      overflow hidden
      float left
      margin-right 20px
      position relative
      width 240px
      .leftHeader
        width 100%
        overflow hidden
        position relative
        height 40px
        line-height 40px
        background #354d76
        .subjectImg
          margin 0 4px
          display inline-block
          width 40px
          float left
          height 40px
        .subjectP
          float left
          color #fff
          line-height 40px
  .subjectDiv
    margin 12px
    position relative
    overflow hidden
    .leftSubject
      width 100%
      min-height 836px
      max-height 836px
      position relative
      background rgba(000,000,000,.47)
      .leftSubjectDiv
        padding 10px 0 0
        line-height 22px
        overflow hidden
        position relative
    .pigeonholeRight
      background rgba(0,0,0,0.47)
      overflow hidden
      position relative
      .pigeonholeRightDiv
        margin 22px 8px
        overflow hidden
        position relative
  .el-tree
    background transparent
</style>

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
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
      <div class="pigeonholeRight">
        <div class="pigeonholeRightDiv">
          <!--检查测试-->
          <Inspection></Inspection>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Inspection from '../pigeonhole-operation/pigeonhole-Inspection'
export default {
  name: 'maintain-pigeonhole',
  components: {
    Inspection
  },
  data () {
    return {
      data: [{
        label: '单位基本情况',
        children: [{
          label: '建筑信息',
          category: 1
        }, {
          label: '维保项目',
          category: 1
        }, {
          label: '消防设施',
          category: 1
        }]
      }, {
        label: '维保工作记录',
        children: [{
          label: '工作计划',
          category: 2
        }, {
          label: '日常巡检',
          category: 2
        }, {
          label: '检查测试',
          id: 3,
          category: 2
        }, {
          label: '维护保养',
          category: 2
        }, {
          label: '故障问题',
          category: 2
        }]
      }, {
        label: '维保工作报告',
        category: 3
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      input: '',
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
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
      height 1064px
      background rgba(0,0,0,0.47)
      overflow hidden
      position relative
      .pigeonholeRightDiv
        margin 12px 8px
        overflow hidden
        position relative
  .el-tree
    background transparent
</style>

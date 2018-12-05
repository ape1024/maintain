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
          <div class="rightHeader">
            <ul class="rightHeaderUl">
              <li class="rightHeaderLi">
                <p class="rightHeaderLiP">计划名称：</p>
                <div class="rightHeaderLiDiv">
                  <el-input size="mini" v-model="input" placeholder="请输入内容"></el-input>
                </div>
              </li>
              <li class="rightHeaderLi">
                <p class="rightHeaderLiP">时间：</p>
                <div class="rightHeaderLiDiv">
                  <el-date-picker
                    size="mini"
                    v-model="startTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </li>
              <li class="rightHeaderLi">
                <p class="rightHeaderLiPtwo">—</p>
                <div class="rightHeaderLiDiv">
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
            <div class="query">
              查询
            </div>
            <div class="rightHeaderRight">
              <!--明细表-->
              <div class="schedule">
                明细表
              </div>
              <!--汇总表-->
              <div class="summary">
                汇总表
              </div>
            </div>
          </div>
          <div class="principalPart">
            <div class="principalHeader">
              <ul class="principalHeaderUl">
                <li class="principalHeaderLi principalHeaderLiOne principalPartI">设施类别
                <i class="el-icon-caret-bottom"></i>
                </li>
                <li class="principalHeaderLi principalHeaderLiOne principalPartI">设施位置
                  <i class="el-icon-caret-bottom"></i>
                </li>
                <li class="principalHeaderLi principalHeaderLiTwo">工作方式</li>
                <li class="principalHeaderLi principalHeaderLiOne">工作事项</li>
                <li class="principalHeaderLi principalHeaderLiOne">工作记录</li>
                <li class="principalHeaderLi principalHeaderLiTwo">工作人员</li>
                <li class="principalHeaderLi principalHeaderLiTwo">工作时间</li>
                <li class="principalHeaderLi principalHeaderLiTwo">工作结论</li>
                <li class="principalHeaderLi principalHeaderLiTwo">现场照片</li>
                <li class="principalHeaderLi principalHeaderLiTwo">操作</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maintain-pigeonhole',
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
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
      width 368px
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
      height 876px
      background rgba(0,0,0,0.47)
      overflow hidden
      position relative
      .pigeonholeRightDiv
        margin 12px 8px
        overflow hidden
        position relative
        .principalPart
          width 100%
          position relative
          overflow hidden
          .principalHeader
            width 100%
            overflow hidden
            position relative
            color #d5d5d5
            font-size 16px
            line-height 32px
            height 32px
            padding 4px 0
            background #354d76
            .principalHeaderUl
              overflow hidden
              position relative
              .principalHeaderLi
                overflow hidden
                text-align center
                text-overflow ellipsis
                white-space nowrap
                min-height 40px
                float left
                box-sizing border-box
      .rightHeader
        overflow hidden
        background #111a28
        padding 20px 0
        display flex
        .rightHeaderUl
          margin-left 30px
          overflow hidden
          float left
          position relative
          display flex
          .rightHeaderLi
            float left
            overflow hidden
            margin-right 20px
            display flex
            .rightHeaderLiP
              color #eee
              float left
              margin-right 10px
              line-height 29px
            .rightHeaderLiDiv
              float left
              display flex
              width 167px
        .query
          queryDiv()
          float left
        .rightHeaderRight
           float right
           position relative
           overflow hidden
           .schedule, .summary
             newlyDiv()
             float left
             color #fff
    .principalHeaderLiOne
       width 16%
    .principalHeaderLiTwo
       width 6%
    .principalPartI
      cursor pointer
    .rightHeaderLiPtwo
      color #eee
      float left
      line-height 26px
      margin-right 20px
  .el-tree
    background transparent
</style>

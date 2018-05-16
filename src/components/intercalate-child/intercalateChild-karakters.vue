<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../../static/img/department.png" alt="">
        <p class="subjectP">角色管理</p>
      </header>
      <div class="leftBottom">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </section>
    <section class="subjectRight">
      <div class="rightHeader"></div>
      <div class="karakters">
        <div class="jurisdictionBottom">
          <div class="header">
            <p class="headerP">角色名称：</p>
            <div class="headerDiv">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div @click="increasd" class="increased">
              新增角色信息
            </div>
          </div>
          <div class="definition">
            <ul class="definitionUl">
              <li class="definitionLi">
                模块
              </li>
              <li class="definitionLitwo">
                权限
              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section v-show="basis" class="popup">
      <increased :increaSed="basis" @baSis="Basis"></increased>
    </section>
  </div>
</template>

<script>
import increased from '../intercalateChild-operation/karaktersChild-increased'
export default {
  name: 'intercalateChild-karakters',
  components: {
    increased
  },
  data () {
    return {
      data: [{
        label: '项目一',
        personnel: '王大，曹大，赵大，越大',
        children: [{
          label: '部门一',
          personnel: '曹大',
          children: [{
            label: '研发部',
            personnel: '王大',
            children: [{
              label: '下属',
              personnel: '李大，赵大'
            }]
          }]
        }]
      }, {
        label: '项目二',
        personnel: '邱大，慕大，乔大，刘大',
        children: [{
          label: '人事部',
          personnel: '习大',
          children: [{
            label: '下属',
            personnel: '邱大，慕大，乔大'
          }]
        }, {
          label: '工程部',
          personnel: '朱大，蔺大，王大，习大',
          children: [{
            label: '下属',
            personnel: '曹大'
          }]
        }]
      }, {
        label: '项目三',
        personnel: '孙大，搭大，港大，泽大, 姬大，周大，红大',
        children: [{
          label: '人事部',
          personnel: '孙大',
          children: [{
            label: '下属',
            personnel: '搭大，港大'
          }]
        }, {
          label: '后勤部',
          personnel: '姬大',
          children: [{
            label: '下属',
            personnel: '周大，红大'
          }]
        }]
      }],
      basis: false,
      value: '',
      checked: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      structureDate: {
        label: '',
        personnel: ''
      }
    }
  },
  methods: {
    increasd () {
      this.basis = true
    },
    Basis (ev) {
      this.basis = ev
    },
    handleNodeClick (data) {

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 56px
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
        color $color-text
        line-height 40px
      .leftBottom
        width 100%
        min-height 800px
        max-height 800px
        overflow hidden
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      overflow hidden
      position relative
      .rightHeader
        init()
        background #354d76
        height 40px
      .karakters
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden

        min-height 800px
        max-height 800px
        overflow hidden
        position relative
        background #101826
      .jurisdictionBottom
        margin 20px 30px
        overflow hidden
        .header
          init()
          margin-bottom 20px
          .headerP
            float left
            line-height 30px
            margin-right 8px
            color $color-border-b-fault
            font-size $font-size-medium
          .headerDiv
            float left
            overflow hidden
          .increased
            float right
            margin-right 20px
            background $color-background-newly
            text-align center
            padding 8px 28px
            color $color-text-title
            border-radius 5px
            cursor pointer
            transition .2s
            &:hover
              background #4baabe
        .definition
          init()
          margin-bottom 55px
          .definitionUl
            text-align center
            color $color-text
            border-left 1px solid #444d5b
            border-top 1px solid #444d5b
            border-right 1px solid #444d5b
            .definitionLi
              float left
              padding 10px 0
              border-right 1px solid #444d5b
              width 338px
            .definitionLitwo
              padding 10px 0
          .content
            border 1px solid #444d5b
            position relative
            overflow hidden
            .contentLi
              float left
              padding 10px 0
              border-right 1px solid #444d5b
              width 338px
              text-align center
            .contentLitwo
              padding 10px 0
        .fastener
          init()
          color $color-text
          text-align center
          .conserve
            conserve()
            margin-right 100px
          .closedown
            closedown()
  .popup
    position fixed
    top 0
    left 0
    background rgba(000, 000, 000, .4)
    z-index 11
    width 100%
    height 100%
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
</style>

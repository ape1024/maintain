<template>
  <div class="subject">
    <section class="content">
      <h4 class="contentH">
        任务安排
      </h4>
      <div class="information">
        <div class="informationTop">
          <ul class="informationTopUl">
           <li class="informationTopLitwo">
            <span>设施名称：</span>
            <span class="informationTopSpan">111</span>
           </li>
           <li class="informationTopLi">
            <span>设备编码：</span>
            <span class="informationTopSpan">111</span>
           </li>
           <li class="informationTopLi">
            <span>设施位置：</span>
            <span class="informationTopSpan">111</span>
           </li>
           </ul>
        </div>
        <ul class="informationTopUl">
          <li class="informationTopLitwo">
            <span>设施数量：</span>
            <span class="informationTopSpan">111</span>
          </li>
        </ul>
        <div class="listDiv">
          <ul class="listUl">
            <li class="listLione">
              消防设施及工作事项
            </li>
            <li class="listLi">
              异常情况
            </li>
            <li class="listLitwo">
              检查人员
            </li>
            <li class="listLitwo">
              检查时间
            </li>
            <li class="listLithree">
              现场照片
            </li>
          </ul>
          <ul class="contentUli">
            <li class="listLione">
              嘤嘤嘤
            </li>
            <li class="listLi">
              嘤嘤嘤
            </li>
            <li class="listLitwo">
              嘤嘤嘤
            </li>
            <li class="listLitwo">
              嘤嘤嘤
            </li>
            <li class="listLithree">
              嘤嘤嘤
            </li>
          </ul>
        </div>
      </div>
      <header class="ficationHeader">
        <p class="ficationHeaderP">任务安排</p>
        <p class="ficationHeaderX"></p>
      </header>
      <div class="information">
        <div class="informationLeft">
          <p class="informationLeftP">异常情况</p>
          <div class="informationLeftDiv">
            <el-input
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <p class="informationLeftP">处理意见</p>
          <div class="informationLeftDiv">
            <el-input
              type="textarea"
              :rows="3"
              resize="none"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div class="choice">
            <p class="choiceP">
              任务类型
            </p>
            <el-checkbox v-model="checked">故障维修</el-checkbox>
            <el-checkbox v-model="checked">问题处理</el-checkbox>
          </div>
        </div>
        <div class="informationRight">
          <p class="informationRightP">
            执行人员
          </p>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div class="closedown">保存</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'repair-arrange',
  props: ['msg'],
  data () {
    return {
      textarea: '',
      checked: true,
      thispage: false,
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
      }
    }
  },
  methods: {
    conserve () {
      console.log(this.msg)
      this.thispage = this.msg
      this.thispage = !this.thispage
      this.$emit('say', this.thispage)
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    width 100%
    overflow hidden
    position relative
    margin-top 100px
    background #111a28
    padding 40px 0
    .content
      overflow hidden
      position relative
      width 1220px
      margin 0 auto
    .contentH
      color $color-text-title
      margin-bottom 26px
      font-size $font-size-medium-x
    .information
      overflow hidden
      position relative
      margin-left 70px
      margin-top 32px
  .informationTop
    overflow hidden
    position relative
    padding-bottom 14px
    margin-bottom 14px
    border-bottom 1px solid #444d5b
  .informationTopUl
    init()
    .informationTopLitwo
      width 33%
      margin-left 1%
      font-size $font-size-medium
      color $color-border-b-fault
      float left
    .informationTopLi
      width 33%
      font-size $font-size-medium
      color $color-border-b-fault
      float left
    .informationTopSpan
      color $color-text
      margin-left 10px
  .listDiv
    init()
    margin-top 35px
  .listUl
    init()
    background #202f49
    padding 5px 0
  .listLi
    overflow hidden
    position relative
    float left
    width 30%
  .listLione
    overflow hidden
    position relative
    float left
    width 28%
    padding-left 2%
  .listLitwo
    width 10%
    overflow hidden
    position relative
    float left
  .listLithree
    width 20%
    overflow hidden
    position relative
    float left
  .contentUli
    init()
    background #0c121c
    font-size $font-size-small
    color $color-text-title
    padding 30px 0 70px
  .contentLi
    float left
    init()
  .ficationHeader
    init()
    margin-left 40px
    margin-top 22px
    font-size $font-size-small
    color $color-header-b-normal
    .ficationHeaderP
      float left
      background #111a28
      padding-right 40px
    .ficationHeaderX
      height 1px
      width 100%
      margin-top 5px
      background #444d5b
  .informationLeft
    float left
    overflow hidden
    width 490px
    .informationLeftP
      color $color-border-b-fault
      margin-bottom 8px
      font-size $font-size-medium
    .informationLeftDiv
       margin-bottom 12px
       init()
  .choice
     init()
     .choiceP
       float left
       margin-right 20px
       color $color-header-b-normal
       font-size $font-size-medium
  .informationRight
    float right
    overflow hidden
    width 490px
    .informationRightP
       color $color-header-b-normal
       font-size $font-size-medium
  .fastener
    init()
    text-align center
    .conserve
      conserve()
      margin-right 40px
    .closedown
      closedown()
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
</style>

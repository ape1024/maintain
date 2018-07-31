<template>
    <div class="member">
      <section class="memberS">
        <h4 class="memberH">
          成员
        </h4>
        <div class="content">
          <div class="contentLeft">
            <div class="leftHeader">
              <img class="HeaderImg" src="../../common/img/department.png" alt="">
              部门结构
            </div>
            <div class="leftBottom">
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
          <div class="contentRight">
            <div class="leftHeader">
              <img class="HeaderImg" src="../../common/img/department.png" alt="">
              部门结构
            </div>
            <div class="rightBottom">
              <!--组内用户-->
              <div class="intragroup">
                <div class="intraLeft">
                  <el-checkbox v-model="checked">组内用户</el-checkbox>
                </div>
                <ul class="intragroupUl">
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                </ul>
              </div>
              <!--组外用户-->
              <div class="intragroup">
                <div class="intraLeft">
                  <el-checkbox v-model="checked">组外用户</el-checkbox>
                </div>
                <ul class="intragroupUl">
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                  <li class="intragroupLi">
                    <el-checkbox v-model="checked">备选项</el-checkbox>
                  </li>
                </ul>
              </div>
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
      </section>
    </div>
</template>

<script>
export default {
  name: 'structureChild-member',
  props: ['menBer'],
  data () {
    return {
      // 本页面的现实隐藏
      oneself: false,
      checked: false,
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
    handleNodeClick (data) {
      console.log(data)
    },
    conserve () {
      this.oneself = this.menBer
      this.oneself = !this.oneself
      this.$emit('back', this.oneself)
    },
    closedown () {

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .member
    width 100%
    background #111a28
    padding 60px 0 40px
    position relative
    margin-top 210px
    overflow hidden
    .memberS
      width 1247px
      margin 0 auto
      position relative
      overflow hidden
      .memberH
        margin-bottom 30px
        font-size $font-size-medium-x
        color $color-text
    .content
      init()
      .contentLeft
        float left
        width 368px
        position relative
        margin-right 20px
        overflow hidden
      .leftHeader
        background #354d76
        overflow hidden
        line-height 40px
        font-size $font-size-medium
        color $color-text
        width 100%
        .HeaderImg
          margin 0 4px
          display inline-block
          width 40px
          float left
          height 40px
      .leftBottom
        init()
        max-height 360px
        min-height 360px
        background #0b111a
    .contentRight
      overflow hidden
    .rightBottom
      init()
      background #0b111a
      max-height 360px
      min-height 360px
    .intragroup
      margin 22px
      overflow hidden
    .intraLeft
      float left
    .intragroupUl
      margin-left 100px
      overflow hidden
      .intragroupLi
        float left
        margin-left 20px
        margin-bottom 20px
        overflow hidden
        position relative
    .fastener
       init()
       margin-top 40px
       text-align center
      .conserve
        conserve()
        margin-right 110px
      .closedown
        closedown()
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
</style>
<style>
</style>

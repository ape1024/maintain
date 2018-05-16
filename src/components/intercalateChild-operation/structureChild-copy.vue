<template>
  <div class="bluepencil">
    <section class="memberS">
      <h4 class="memberH">复制</h4>
      <div class="content">
        <!--部门名称-->
        <div class="contentLeft">
          <p class="contentP">部门名称：</p>
          <div class="contentDiv">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <!--分组名称-->
        <div class="contentRight">
          <p class="contentP">分组名称：</p>
          <div class="contentDiv">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="option">
        <p class="optionP">选项:</p>
        <div class="optionDiv">
          <el-checkbox v-model="checked">复制权限</el-checkbox>
          <el-checkbox v-model="checked">复制用户</el-checkbox>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'structureChild-copy',
  props: ['copyboolean'],
  data () {
    return {
      input: '',
      reality: false,
      checked: false
    }
  },
  methods: {
    conserve () {
      this.reality = this.copyboolean
      this.reality = !this.reality
      this.$emit('wind', this.reality)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .bluepencil
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
        margin-bottom 130px
        font-size $font-size-medium-x
        color $color-text
      .content
        init()
        .contentLeft
          float left
          margin-left: 150px;
          display inline-block
          overflow hidden
          color $color-text-tile-handle
        .contentRight
          width 50%
          float left
          text-align center
          color $color-text-tile-handle
      .option
         init()
         font-size $font-size-medium
         margin-top 60px
         .optionP
           float left
           margin-left 150px
           margin-right 50px
           color $color-border-b-fault
         .optionDiv
           float left
      .fastener
        init()
        margin-top 280px
        text-align center
        .conserve
          conserve()
          margin-right 110px
        .closedown
          closedown()
      .contentP
        display inline-block
      .contentDiv
        display inline-block
</style>

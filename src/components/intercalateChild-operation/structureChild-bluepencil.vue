<template>
  <div class="bluepencil">
    <section class="memberS">
      <h4 class="memberH">编辑</h4>
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
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'structureChild-bluepencil',
  props: ['bluePencil'],
  data () {
    return {
      input: '',
      reality: false
    }
  },
  methods: {
    conserve () {
      this.reality = this.bluePencil
      this.reality = !this.reality
      this.$emit('circle', this.reality)
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
         text-align center
         .contentLeft
            display inline-block
            overflow hidden
            color $color-text-tile-handle
         .contentRight
           width 50%
           float left
           text-align center
           color $color-text-tile-handle
      .fastener
         init()
         margin-top 328px
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

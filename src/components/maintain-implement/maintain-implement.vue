<template>
  <div class="container">
    <div class="container_top">
      <div class="top_left">
        <el-progress type="circle" :percentage='30' color="#59cba4" stroke-width='10'></el-progress>
       <p>日常巡检完成率</p>
      </div>
      <div class="top_right">
        <el-progress type="circle" :percentage='20' color="#8a5ea3" stroke-width='10'></el-progress>
        <p>维保计划完成率</p>
      </div>
    </div>
    <div class="container_middle">
      <div>
        <el-progress type="circle" :percentage='20' color="#8a5ea3" stroke-width='10'></el-progress>
        <p>维保计划完成率</p>
      </div>
    </div>
    <div class="container_bottom">
      <div class="bottom_left">
        <el-progress type="circle" :percentage='20' color="#8a5ea3" stroke-width='10'></el-progress>
        <p>维保计划完成率</p>
      </div>
      <div class="bottom_right">
        <el-progress type="circle" :percentage='20' color="#8a5ea3" stroke-width='10'></el-progress>
        <p>维保计划完成率</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maintain-implement'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .container
     width 100%
     overflow header
     position relative
    .container_top, .container_middle, .container_bottom
       overflow hidden
       .top_left
          float left
       .top_right
          float right
  .container_middle
      margin-top -26px
  .container_bottom
      margin-top -16px
  .bottom_left
      float left
  .bottom_right
      float right
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-progress-circle
     width 94px!important
     height 94px!important

</style>

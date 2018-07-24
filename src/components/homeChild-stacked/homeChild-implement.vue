<template>
  <div class="container">
    <div class="container_top">
      <div class="top_left">
        <el-progress type="circle" :percentage='maintenance.rate' :color="maintenance.color" :stroke-width='10'></el-progress>
       <p>{{maintenance.typename}}</p>
      </div>
      <div class="top_right">
        <el-progress type="circle" :percentage='inspection.rate' :color="inspection.color" :stroke-width='10'></el-progress>
        <p>{{inspection.typename}}</p>
      </div>
    </div>
    <div class="container_middle">
      <div>
        <el-progress type="circle" :percentage='checkTest.rate' :color="checkTest.color" :stroke-width='10'></el-progress>
        <p>{{checkTest.typename}}</p>
      </div>
    </div>
    <div class="container_bottom">
      <div class="bottom_left">
        <el-progress type="circle" :percentage='problemHandling.rate' :color="problemHandling.color" :stroke-width='10'></el-progress>
        <p>{{problemHandling.typename}}</p>
      </div>
      <div class="bottom_right">
        <el-progress type="circle" :percentage='troubleshooting.rate' :color="troubleshooting.color" :stroke-width='10'></el-progress>
        <p>{{troubleshooting.typename}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeChild-implement',
  data () {
    return {
      implement: [],
      //  维护保养完成率
      maintenance: '',
      //  日常巡检完成率
      inspection: '',
      //  检查测试完成率
      checkTest: '',
      //  问题处理完成率
      problemHandling: '',
      //  故障维修完成率
      troubleshooting: ''
    }
  },
  created () {
    let pattern = JSON.parse(window.localStorage.pattern)
    this.axios.post(`http://172.16.6.16:8920/dev/statTaskDoneState?projectid=${pattern}`).then((response) => {
      if (response.data.code === 0) {
        console.log('+-+')
        console.log(response.data.data)
        let color = ['#53dcad', '#ad65d6', '#fc9e7d', '#f78540', '#69d4e2']
        response.data.data.forEach((val, index) => {
          val.rate = val.rate * 100
          val.color = color[index]
          this.implement.push(val)
        })
        this.maintenance = this.implement[0]
        this.inspection = this.implement[1]
        this.checkTest = this.implement[2]
        this.problemHandling = this.implement[3]
        this.troubleshooting = this.implement[4]
        console.log(this.maintenance)
        console.log(this.inspection)
        console.log(this.checkTest)
        console.log(this.problemHandling)
        console.log(this.troubleshooting)
      }
    })
  }
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

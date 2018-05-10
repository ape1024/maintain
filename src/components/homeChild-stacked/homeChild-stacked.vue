<template>
  <div class="charts">
     <div id="myChart" :style="{width:'300px',height:'300px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'homeChild-stacked',
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['系统故障', '设备故障', '附件损坏', '元器件损坏', '管线损坏'],
          textStyle: {
            color: '#fff'
          },
          y: 'top',
          x: 'left'
        },
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            name: 'name',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 10, name: '系统故障'},
              {value: 10, name: '设备故障'},
              {value: 10, name: '附件损坏'},
              {value: 10, name: '元器件损坏'},
              {value: 10, name: '管线损坏'}
            ]
          }
        ]
      })
      window.onresize = myChart.resize
    }
  }
}

</script>

<style scoped>

</style>

<template>
  <div class="charts">
    <div id="myChartFour" :style="{width:'300px',height:'300px'}"></div>
  </div>
</template>

<script>
import { statDevFaultState } from '../../api/user'
export default {
  name: 'homeChild-inspectionRight',
  data () {
    return {
      msg: '',
      equipment: [],
      equipmentData: []
    }
  },
  mounted () {
    this.axios.post(statDevFaultState()).then((response) => {
      if (response.data.code === 0) {
        console.log(response.data.data)
        let equipment = []
        let equipmentData = []
        response.data.data.forEach((val) => {
          let obj = {
            value: val.Faultdevcount,
            name: val.Faulttypename
          }
          console.log(obj)
          equipment.push(val.Faulttypename)
          equipmentData.push(obj)
        })
        this.drawLine(equipmentData, equipment)
      }
    })
  },
  methods: {
    drawLine (equipmentData, equipment) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChartFour'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: equipment,
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
            data: equipmentData
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

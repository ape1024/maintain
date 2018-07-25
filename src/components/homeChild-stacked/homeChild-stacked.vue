<template>
  <div class="charts">
     <div id="myChart" :style="{width:'300px',height:'300px'}"></div>
  </div>
</template>

<script>
import { maintainHomeStacked } from '../../api/user'
export default {
  name: 'homeChild-stacked',
  data () {
    return {
      msg: '',
      equipment: [],
      equipmentData: []
    }
  },
  mounted () {
    let pattern = window.localStorage.pattern
    this.axios.post(maintainHomeStacked(pattern)).then((response) => {
      if (response.data.code === 0) {
        const equipment = []
        const equipmentData = []
        response.data.data.forEach((val) => {
          let obj = {
            value: val.count,
            name: val.faulttypename
          }
          equipment.push(val.faulttypename)
          equipmentData.push(obj)
        })
        this.drawLine(equipmentData, equipment)
        console.log('----')
      }
    })
  },
  methods: {
    drawLine (equipmentData, equipment) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      console.log('啦啦啦')
      console.log(equipmentData)
      console.log(equipment)
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

<template>
  <div>
    <div id="Chart" :style="{width:'500px',height:'280px'}"></div>
  </div>
</template>

<script>
import { maintainHomeInspection } from '../../api/user'
export default {
  name: 'homeChild-inspection',
  mounted () {
    let pattern = window.localStorage.pattern
    this.axios.post(maintainHomeInspection(pattern)).then((response) => {
      if (response.data.code === 0) {
        console.log('=-====')
        console.log(response)
        let nameData = []
        let stateData = ['未开始', '问题', '错误', '完好']
        let seriesData = []
        let nostart = []
        let problem = []
        let error = []
        let complete = []
        let aggregate = []
        response.data.data.forEach((val, index) => {
          nameData.push(val.typename)
          // 未开始
          nostart.push(val.num_nostart)
          //  问题
          problem.push(val.num_problem)
          //  错误
          error.push(val.num_error)
          //  完成
          complete.push(val.num_ok)
          // let keys = []
          // for (let property in val) {
          //   keys.push(val[property])
          // }
          // keys.pop()
          // console.log(keys)

          // let obj = {
          //   name: `${stateData[index]}`,
          //   type: 'bar',
          //   stack: '总量',
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'insideRight'
          //     }
          //   },
          //   data: keys
          // }
          // seriesData.push(obj)
        })
        aggregate.push(nostart)
        aggregate.push(problem)
        aggregate.push(error)
        aggregate.push(complete)
        stateData.forEach((val, index) => {
          let obj = {
            name: `${val}`,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: aggregate[index]
          }
          seriesData.push(obj)
        })

        console.log(nameData)
        console.log('-----')
        console.log(stateData)
        let stateDataTwo = []
        stateData.forEach((val) => {
          let obj = {
            name: val,
            textStyle: {color: '#fff'}
          }
          stateDataTwo.push(obj)
        })
        console.log('aaa')
        console.log(stateDataTwo)

        this.drawline(nameData, seriesData, stateDataTwo)
      }
    })
  },
  methods: {
    drawline (name, seriesData, stateDa) {
      let Chart = this.$echarts.init(document.getElementById('Chart'))
      Chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: stateDa
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          data: name
        },
        series: seriesData
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

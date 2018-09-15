<template>
  <div class="area-graph">
    <div class="title">{{title}}</div>
    <div class="more">{{more}}</div>
    <div class="content">
      <div class="each move" @click="prev" :class="{'error-style' : !prevState, 'normal-style': !switchState}">
        <i class="el-icon-arrow-left" v-show="switchState"></i>
      </div>
      <div class="each wrap" ref="wrap">
        <div class="graph-wrap" :style="{transform: `translateX(${moveVal}px)`}">
          <div class="graph-wrap-item" ref="nestedRing"></div>
          <div class="graph-wrap-item">
            <div :key="index" class="graph-wrap-item-circle" v-for="(item, index) in list">
              <progress-circle :show-color="item.color" :percent="item.percent" :desc="item.desc"></progress-circle>
            </div>
          </div>
          <div class="graph-wrap-item" ref="lineGraph"></div>
        </div>
      </div>
      <div class="each move" @click="next" :class="{'error-style' : !nextState, 'normal-style': !switchState}">
        <i class="el-icon-arrow-right" v-show="switchState"></i>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressCircle from 'base/progress-circle/progress-circle'
import { getDevFaultCountForYear, getTaskProgress } from 'api/user'
const STEP = 600
const LONG = 1800
export default {
  data () {
    return {
      moveVal: 0,
      switchState: false,
      prevState: false,
      nextState: true,
      list: []
    }
  },
  methods: {
    prev () {
      if (!this.switchState) return
      const lastVal = this.moveVal
      const currentVal = lastVal + STEP
      if (currentVal >= 0) {
        this.moveVal = 0
        this.prevState = false
      } else {
        this.moveVal = currentVal
      }
      this.nextState = true
    },
    next () {
      if (!this.switchState) return
      const lastVal = this.moveVal
      const currentVal = lastVal - STEP
      const width = this.$refs.wrap.clientWidth
      const long = LONG - width
      if (currentVal <= -long) {
        this.moveVal = -long
        this.nextState = false
      } else {
        this.moveVal = currentVal
      }
      this.prevState = true
    },
    drawNestedRing (dom) {
      const myChart = this.$echarts.init(dom)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直达', selected: true},
              {value: 679, name: '营销广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              {value: 335, name: '直达'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1048, name: '百度'},
              {value: 251, name: '谷歌'},
              {value: 147, name: '必应'},
              {value: 102, name: '其他'}
            ]
          }
        ]
      })
    },
    drawLineGraph (dom, data) {
      const myChart = this.$echarts.init(dom)
      myChart.setOption({
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          type: 'category',
          data: data.map(t => t.month)
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          type: 'value'
        },
        series: [{
          data: data.map(t => t.vcount),
          type: 'line'
        }]
      })
    }
  },
  mounted () {
    const width = this.$refs.wrap.clientWidth
    this.switchState = LONG > width
    // 嵌套环形
    this.drawNestedRing(this.$refs.nestedRing)
    // 折线图数据
    const yearVal = new Date().getFullYear()
    this.axios.post(getDevFaultCountForYear(yearVal)).then((res) => {
      this.drawLineGraph(this.$refs.lineGraph, res.data.data)
    })
    // 饼图
    this.axios.post(getTaskProgress()).then((res) => {
      this.list = res.data.data.map((t, i) => {
        return {
          percent: t.progess,
          desc: t.worktypename,
          color: this.colorList[i]
        }
      })
    })
  },
  components: {
    ProgressCircle
  },
  created () {
    this.title = '图表统计'
    this.more = '更多'
    this.colorList = ['#53DCAD', '#AD65D6', '#FC9E7D', '#F78540', '#69D4E2']
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .area-graph
    position relative
    width 100%
    height 319px
    background url("../../common/img/block.png")
    .title
      padding-left 10px
      line-height 50px
      font-size $font-size-medium-x
    .more
      position absolute
      right 25px
      top 0
      height 50px
      line-height 50px
      font-size $font-size-small
      color aquamarine
      cursor pointer
    .content
      position absolute
      left 0
      right 0
      height 245px
      bottom 20px
      text-align center
      .each
        float left
        height 100%
        &.move
          width 5%
          line-height 245px
          font-size $font-size-large-x
          cursor pointer
        &.error-style
          cursor not-allowed
        &.normal-style
          cursor default
        &.wrap
          box-sizing border-box
          width 90%
          overflow hidden
          .graph-wrap
            margin 0 auto
            width 1800px
            height 100%
            transition transform 200ms linear
            .graph-wrap-item
              float left
              width 600px
              height 100%
              .graph-wrap-item-circle
                display inline-block
                margin 0 10px 20px
                width 150px
                height 100px
</style>

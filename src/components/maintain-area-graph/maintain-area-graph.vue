<template>
  <div class="area-graph">
    <div class="title">{{title}}</div>
    <div class="more">{{more}}</div>
    <div class="content">
      <div class="each move" @click="prev" :class="{'error-style' : !prevState, 'normal-style': !switchState}">
        <i class="el-icon-arrow-left" v-show="switchState"></i>
      </div>
      <div class="each wrap" ref="wrap">
        <div class="graph-wrap" :style="{transform: `translateX(${moveVal}px)`}" ref="graphWrap">
          <div class="graph-wrap-item" ref="nestedRing"></div>
          <div class="graph-wrap-item">
            <div :key="index" class="graph-wrap-item-circle" v-for="(item, index) in list">
              <progress-circle :show-color="item.color" :percent="item.percent" :desc="item.desc"></progress-circle>
            </div>
            <div class="loading" v-show="!list.length">{{loadingText}}</div>
          </div>
          <div class="graph-wrap-item">
            <div class="graph-wrap-item-line" ref="lineGraph" v-show="!lineGraphLoading"></div>
            <div class="loading" v-show="lineGraphLoading">{{loadingText}}</div>
          </div>
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
import { getDevFaultCountForYear, getTaskProgress, getCircleData } from 'api/user'
import { projectMixin, currentAreaMixin } from 'common/js/mixin'
const STEP = 600
export default {
  mixins: [projectMixin, currentAreaMixin],
  data () {
    return {
      moveVal: 0,
      switchState: false,
      prevState: false,
      nextState: true,
      list: [],
      lineGraphLoading: true
    }
  },
  methods: {
    init () {
      this.resetCount()
      // 嵌套环形
      this.axios.post(getCircleData(this.maintainProject, this.currentAreaId)).then(res => {
        if (res && res.data.code === 0) {
          const data = res.data.data
          this.drawNestedRing(this.$refs.nestedRing, data.devfaultcount, data.devstatecount)
        }
      })
      // 折线图数据
      const yearVal = new Date().getFullYear()
      this.axios.post(getDevFaultCountForYear(this.maintainProject, this.currentAreaId, yearVal)).then((res) => {
        if (res && res.data.code === 0) {
          console.log(res.data.data.length)
          if (!res.data.data.length) {
            this.lineGraphLoading = true
          } else {
            this.lineGraphLoading = false
          }
          this.drawLineGraph(this.$refs.lineGraph, res.data.data)
        }
      })
      // 饼图
      this.axios.post(getTaskProgress(this.maintainProject, this.currentAreaId)).then((res) => {
        if (res && res.data.code === 0) {
          this.list = res.data.data.map((t, i) => {
            return {
              percent: t.progess,
              desc: t.worktypename,
              color: this.colorList[i]
            }
          })
        }
      })
    },
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
      const LONG = this.$refs.graphWrap.clientWidth
      const long = LONG - width
      if (currentVal <= -long) {
        this.moveVal = -long
        this.nextState = false
      } else {
        this.moveVal = currentVal
      }
      this.prevState = true
    },
    drawNestedRing (dom, outsideData, innerData) {
      const myChart = this.$echarts.init(dom)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          // show: false,
          // orient: 'vertical',
          x: 'left',
          textStyle: {
            color: '#fff'
          },
          data: outsideData.map(t => t.faulttypename).concat(innerData.map(t => t.name))
        },
        series: [
          {
            name: '',
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
            center: ['50%', '60%'],
            data: innerData.map(t => {
              return {value: t.count, name: t.name}
            })
          },
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: ' {b|{b}：}{c}  {per|{d}%} ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  b: {
                    fontSize: 12,
                    lineHeight: 30
                  }
                }
              }
            },
            center: ['50%', '60%'],
            data: outsideData.map(t => {
              return {value: t.devcount, name: t.faulttypename}
            })
          }
        ]
      })
    },
    drawLineGraph (dom, data) {
      const myChart = this.$echarts.init(dom)
      myChart.setOption({
        title: {
          text: '设备故障趋势统计图',
          textStyle: {
            color: '#fff'
          },
          left: 'center'
        },
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
    },
    resetCount () {
      const width = this.$refs.wrap.clientWidth
      const LONG = this.$refs.graphWrap.clientWidth
      this.switchState = LONG > width
    }
  },
  mounted () {
    this.init()
  },
  updated () {
    this.resetCount()
  },
  components: {
    ProgressCircle
  },
  created () {
    this.title = '图表统计'
    this.more = '更多'
    this.loadingText = '暂无数据'
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
              position relative
              float left
              width 600px
              height 100%
              .loading
                position absolute
                left 0
                right 0
                top 0
                bottom 0
                z-index $z-index-small-s
                line-height 245px
                text-align center
              .graph-wrap-item-circle
                display inline-block
                margin 0 10px 20px
                width 150px
                height 100px
              .graph-wrap-item-line
                width 600px
                height 245px
</style>

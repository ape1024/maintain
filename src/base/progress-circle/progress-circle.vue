<template>
  <div class="progress-circle">
    <canvas class="canvas-wrap" ref="canvasWrap"></canvas>
    <div class="progress-circle-percent">{{parseInt(percent * 100)}}%</div>
    <div class="progress-circle-desc">{{desc}}</div>
  </div>
</template>

<script>
const startVal = 3 / 4 * Math.PI
const endVal = 9 / 4 * Math.PI
const lineWidth = 10
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
      default: ''
    },
    backColor: {
      type: String,
      default: '#666'
    },
    showColor: {
      type: String,
      default: '#f00'
    }
  },
  methods: {
    init (dom) {
      this.ctx = dom.getContext('2d')
      this.width = dom.width = dom.offsetWidth
      this.height = dom.height = dom.offsetHeight
    },
    draw () {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.drawCircle({
        color: this.backColor,
        lineWidth: lineWidth,
        startVal: startVal,
        endVal: endVal
      })
      this.drawCircle({
        color: this.showColor,
        lineWidth: lineWidth,
        startVal: startVal,
        endVal: ((endVal - startVal) * this.percent + startVal)
      })
    },
    drawCircle (option) {
      this.ctx.beginPath()
      const r1 = this.width / 2
      const r2 = this.height / 2
      const r = Math.min(r1, r2) - option.lineWidth
      this.ctx.arc(r1, r2, r, option.startVal, option.endVal)
      this.ctx.strokeStyle = option.color
      this.ctx.lineWidth = option.lineWidth
      this.ctx.stroke()
      this.ctx.closePath()
    }
  },
  mounted () {
    this.init(this.$refs.canvasWrap)
    this.draw()
  },
  watch: {
    percent () {
      this.draw()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .progress-circle
    position relative
    width 100%
    height 100%
    .canvas-wrap
      width 100%
      height 100%
    .progress-circle-percent
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      text-align center
      padding-top 28%
    .progress-circle-desc
      position absolute
      left 0
      right 0
      bottom -20px
      height 20px
      line-height 20px
      text-align center
</style>

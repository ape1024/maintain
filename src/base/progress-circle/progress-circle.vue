<template>
  <div class="progress-circle">
    <canvas class="canvas-wrap" ref="canvasWrap"></canvas>
    <div class="progress-circle-percent">{{percent * 100}}%</div>
    <div class="progress-circle-desc">{{desc}}</div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
      default: ''
    }
  },
  methods: {
    init (dom) {
      this.ctx = dom.getContext('2d')
      this.width = dom.width = dom.offsetWidth
      this.height = dom.height = dom.offsetHeight
    },
    draw (backOpt, showOpt) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.drawCircle(backOpt)
      this.drawCircle(showOpt)
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
    this.draw({
      color: '#999',
      lineWidth: 10,
      startVal: this.startVal,
      endVal: this.endVal
    }, {
      color: '#456541',
      lineWidth: 10,
      startVal: this.startVal,
      endVal: this.endVal * 0.8
    })
  },
  created () {
    this.startVal = 3 / 4 * Math.PI
    this.endVal = 9 / 4 * Math.PI
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

<template>
  <div class="dialog-img" @click="close" v-show="state">
    <div class="wrapper" @click.stop v-if="state">
      <el-carousel ref="carousel" :initial-index="initialIndex" :autoplay="false" trigger="click" class="carousel">
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <div class="item">
            <img :src="item">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      state: false,
      initialIndex: 0
    }
  },
  methods: {
    close () {
      this.state = false
    },
    open () {
      this.state = true
    },
    switchIndex (index) {
      if (index > (this.list.length - 1)) return
      this.initialIndex = index
    }
  }
}
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .dialog-img
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 1000
    background rgba(0, 0, 0, .6)
    .wrapper
      width 600px
      height 300px
      margin 15% auto 0
      .carousel
        width 100%
        height 100%
        .item
          width 100%
          height 100%
          img
            display block
            height 100%
            width auto
            margin 0 auto
</style>

<template>
  <div class="headerRight">
     <div class="headerRight_left">
        <h4 class="headerRight_left_h4">
          维护管理系统
        </h4>
        <div class="headerRight_bottom">
          <el-select v-model="value" placeholder="">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'maintain-headerRight',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .headerRight
      overflow hidden
      position relative
    .headerRight_left
          float left
    .headerRight_left_h4
          font-size $font-size-large-x
          color $color-text
          margin 16px 0 18px 0
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
    width 185px
    height 20px
    line-height 20px
    background-color transparent
    border none
    border-radius 0
    color $color-text
    border-bottom 1px solid rgba(255,255,255,.4)

  .el-input__inner:hover
    border-color  rgba(255,255,255,.4)
  .el-select .el-input__inner:focus
    border-color  rgba(255,255,255,.4)
  .el-select .el-input.is-focus .el-input__inner
    border-color  rgba(255,255,255,.4)

</style>

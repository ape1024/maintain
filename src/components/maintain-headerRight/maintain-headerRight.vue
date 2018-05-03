<template>
  <div class="headerRight">
     <div class="headerRight_left">
        <h4 class="headerRight_left_h4">
          维护管理系统
        </h4>
     </div>
  </div>
</template>

<script>
export default {
  name: "maintain-headerRight"
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .headerRight
      overflow hidden
      position relative
    .headerRight_left
          float left
       h4
          font-size $font-size-large-x
          color $color-text
          margin 16px 0 18px 0
</style>

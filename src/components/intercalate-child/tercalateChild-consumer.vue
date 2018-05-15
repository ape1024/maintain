<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../../static/img/department.png" alt="">
        <p class="subjectP">用户设置</p>
      </header>
      <div class="leftBottom">

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'tercalateChild-consumer'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 56px
      .leftHeader
        width 100%
        overflow hidden
        position relative
        height 40px
        line-height 40px
        background #354d76
      .subjectImg
        margin 0 4px
        display inline-block
        width 40px
        float left
        height 40px
      .subjectP
        float left
        color $color-text
        line-height 40px
      .leftBottom
        width 100%
        min-height 800px
        max-height 800px
        overflow hidden
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      overflow hidden
      position relative
</style>

<template>
    <div class="subject">
      <section class="section">
        <h4 class="subjectH">
          新增项目信息
        </h4>
        <div class="information">

        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'consumerChild-increase'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    padding 50px 0 40px
    margin-top 50px
    background #111a28
    .section
      width 1245px
      margin 0 auto
      overflow hidden
      position relative
    .subjectH
      margin-bottom 35px
      font-size $font-size-medium-x
      color $color-text-title
    .information
      margin-left 55px
      overflow hidden
</style>

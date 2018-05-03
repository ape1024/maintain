<template>
  <div class="header">

    <div class="header_left">
      <MaintainRouter></MaintainRouter>
    </div>
    <div class="header_right">
      <MaintainheaderRight></MaintainheaderRight>
    </div>
  </div>
</template>

<script>
import MaintainRouter from '../maintain-router/maintain-router'
import MaintainheaderRight from '../maintain-headerRight/maintain-headerRight'
export default {
  components: {
    MaintainRouter,
    MaintainheaderRight
  },
  data () {
    return {
      msg: '123'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header
        width 100%
        overflow hidden
        position relative
        background url("/static/img/header.png") no-repeat
        background-size cover
       .header_left
              overflow hidden
              float: left
       .header_right
              float right
              height: 95px;
              margin-right 25px
</style>

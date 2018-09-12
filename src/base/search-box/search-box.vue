<template>
  <div class="search-box">
    <i class="el-icon-search"></i>
    <input ref="query" @blur="blur" @keydown="keyDown" v-model="query" class="input" type="text">
    <i class="el-icon-close" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from 'common/js/utils'
import { searchBoxState } from 'common/js/config'

export default {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    setBlur () {
      this.$refs.query.blur()
    },
    blur () {
      this.$emit('blur')
    },
    keyDown (e) {
      if (e.keyCode === searchBoxState.up) {
        this.$emit('toggle', -1)
        e.preventDefault()
      } else if (e.keyCode === searchBoxState.down) {
        this.$emit('toggle', 1)
        e.preventDefault()
      } else if (e.keyCode === searchBoxState.ok) {
        this.$emit('confirm')
        e.preventDefault()
      }
    }
  },
  created () {
    this.$watch('query', debounce((newVal) => {
      this.$emit('query', newVal)
    }, 200))
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-box
    position relative
    width 100%
    height 100%
    box-sizing border-box
    display flex
    align-items center
    .el-icon-search
      position absolute
      left 5px
      top 12px
    .input
      display block
      width 100%
      height 60%
      padding 0 25px
      border-radius 10px/10px
      background $color-background-black-o
      color $color-text
      font-size $font-size-small
      border 1px solid $color-background-black
      outline none
      &:focus
        border 1px solid $color-border-b-normal
    .el-icon-close
      position absolute
      right 5px
      top 12px
      cursor pointer
</style>

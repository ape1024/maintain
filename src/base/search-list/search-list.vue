<template>
  <div class="search-list">
    <ul class="list">
      <li :key="index" class="item"
          :class="{'selected' : index === selected}"
          v-for="(item, index) in list" @click="selectItem(item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () { return [] }
    },
    selected: {
      type: Number,
      default: -1
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .search-list
    width 100%
    height 100%
    box-sizing border-box
    background $color-background-black
    border-radius 5px/5px
    padding 10px
    overflow auto
    .list
      width 100%
      height 100%
      overflow auto
      &::-webkit-scrollbar
        width 0
        display none
      .item
        line-height 30px
        font-size $font-size-small
        border-bottom 1px solid $color-border-b
        cursor pointer
        &:hover
          background $color-background
      .selected
        background $color-background
</style>

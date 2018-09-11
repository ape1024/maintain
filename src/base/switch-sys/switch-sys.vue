<template>
  <div class="switch-sys">
    <div :key="index"
         v-for="(item, index) in list"
         class="sys">
      <div class="name"
           :class="{'selected' : selected === index}"
           @click="switchType(item, index)">{{item.typename}}</div>
      <div class="children" v-show="showState && selected === index">
        <div class="child" :key="i" v-for="(t, i) in item.typeList" @click="selectItem(item.typename, t.devicetypeid)">
          <img class="icon" :src="t.devicetypeicon" alt="">
          <div class="desc" :class="{'desc-selected' : t.isdefault}">{{t.devicetypename.slice(0, 4)}}</div>
        </div>
      </div>
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
      selected: 0,
      descSelected: -1,
      showState: false
    }
  },
  methods: {
    switchType (item, index) {
      if (this.selected !== index) {
        this.showState = true
        this.selected = index
        this.$emit('switch', item)
      } else {
        this.showState = !this.showState
      }
    },
    selectItem (name, id) {
      this.$emit('select', {name, id})
    }
  },
  watch: {
    list () {
      this.selected = 0
      this.descSelected = -1
      this.showState = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .switch-sys
    display flex
    .sys
      position relative
      .name
        width 100px
        line-height 35px
        text-align center
        font-size $font-size-small-s
        color $color-text
        cursor pointer
        &.selected
          background $color-background-button
        &:hover
          background $color-background-button
      .children
        position absolute
        right 0
        top 40px
        width 250px
        height 150px
        display flex
        flex-wrap wrap
        background rgba(0, 0, 0, .9)
        z-index $z-index-medium-x
        overflow auto
        &::-webkit-scrollbar
          display none
        .child
          width 25%
          box-sizing border-box
          padding-top 10px
          display flex
          flex-direction column
          align-items center
          cursor pointer
          .icon
            width 29px
            height 29px
          .desc
            margin-top 5px
            font-size $font-size-small-s
            color #666
            &.desc-selected
              color $color-text
</style>

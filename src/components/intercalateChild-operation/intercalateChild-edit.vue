<template>
    <div class="edit">
      <section class="editSection">
        <h4 class="editH4">
          编辑
        </h4>
        <div class="information">
          <div class="alteration">
            <p class="alterationP">
              上级部门：
            </p>
            <div class="alterationDiv">
              <el-input v-model="higherUps" placeholder=""></el-input>
            </div>
          </div>
          <div class="alteration">
            <p class="alterationP">
              部门名称：
            </p>
            <div class="alterationDiv">
              <el-input v-model="department" placeholder=""></el-input>
            </div>
          </div>
          <div class="alteration">
            <p class="alterationP">
              负 责 人：
            </p>
            <div class="alterationDiv">
              <el-input v-model="charge" placeholder=""></el-input>
            </div>
          </div>
        </div>
        <div class="fastener">
          <div @click="conserve" class="conserve">
            保存
          </div>
          <div @click="closedown" class="closedown">
            关闭
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'intercalateChild-edit',
  props: ['examine'],
  data () {
    return {
      // 显示隐藏
      distrBoolean: '',
      // 数据
      higherUps: '',
      department: '',
      charge: ''
    }
  },
  methods: {
    conserve () {
      this.distrBoolean = this.examine
      this.distrBoolean = !this.distrBoolean
      this.$emit('dist', this.distrBoolean)
    },
    closedown () {

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .edit
    init()
    .editSection
      overflow hidden
      position relative
      margin 0 336px
      .editH4
        color $color-text
        margin-bottom 145px
        font-size $font-size-medium-x
      .information
        position relative
        margin 0 0 200px 250px
        overflow hidden
        .alteration
          overflow hidden
          position relative
          margin-bottom 20px
          .alterationP
            float left
            width 100px
            line-height 40px
            font-size $font-size-medium
            color $color-border-b-fault
          .alterationDiv
            float left
            width 500px
            overflow hidden
      .fastener
         init()
         color $color-text
         text-align center
         .conserve
           conserve()
           margin-right 110px
         .closedown
           closedown()
</style>

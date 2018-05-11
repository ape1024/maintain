<template>
  <section class="distriBution">
    <div class="distriBution_div">
      <h4 class="distriButionH">
        任务分配
      </h4>
      <div class="distriButionDiv">
        <div class="distriButionDiv_div">
          <p class="distriButionDiv_p">
            检查项目
          </p>
          <p class="distriButionDiv_line"></p>
        </div>
        <div class="distriButionOption">
          <el-radio-group v-model="radio2">
            <el-radio :label="1">项目一</el-radio>
            <el-radio :label="2">项目二</el-radio>
            <el-radio :label="3">项目三</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="explain">
        <div class="distriButionDiv_div">
          <p class="distriButionDiv_p">
            任务说明
          </p>
          <p class="distriButionDiv_line"></p>
        </div>
        <div class="distributionExplain">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
        <div class="personCharge">
          <p class="personChargeP">负责人：</p>
          <div class="personChargeDiv">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="explainBottom">
          <div @click.stop="conserve" class="conserve">
            安排任务
          </div>
          <div @click.stop="closedown" class="closedown">
            关闭
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'dailyChild-distribution',
  props: ['distriBoolean'],
  data () {
    return {
      radio2: 0,
      // 快速分配 显示/隐藏
      distrBoolean: false,
      textarea: '',
      value: '',
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
      }]
    }
  },
  methods: {
    conserve () {
      this.distrBoolean = this.distriBoolean
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
  .distriBution
    margin 117px auto 0
    width 894px
    height 635px
    background #111a28
    border 1px solid #444d5b
    .distriBution_div
      margin 40px 90px
      overflow hidden
      position relative
      .distriButionH
        font-size $font-size-medium-x
        color $color-text-title
      .distriButionDiv
        overflow hidden
        color $color-border-b-fault
        font-size $font-size-small
        margin-top 16px
        min-height 100px
      .distriButionDiv_div
         init()
        .distriButionDiv_p
          float left
        .distriButionDiv_line
           float right
           width 613px
           height 1px
           background #444d5b
           margin-top 6px
      .distriButionOption
         margin 22px 20px
         overflow hidden
      .explain
        init()
        .distributionExplain
          overflow hidden
          margin-top 30px
          position relative
        .personCharge
           init()
           margin-top 22px
          .personChargeP
            float left
            font-size $font-size-small
            color $color-border-b-fault
            line-height 40px
            margin-right 6px
          .personChargeDiv
            float left
            width 228px
        .explainBottom
           init()
           margin-top 70px
           overflow hidden
           text-align center
           .conserve
             conserve()
             margin-right 110px
           .closedown
             closedown()
</style>

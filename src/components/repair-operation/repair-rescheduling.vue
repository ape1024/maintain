<template>
    <div class="subject">
      <section class="content">
        <h4 class="contentH">
          任务安排
        </h4>
        <div class="situation">
          <div class="situationTop">
            <p class="situationTopP">
              任务类型：
            </p>
            <el-checkbox v-model="checked">故障维修</el-checkbox>
            <el-checkbox v-model="checked">问题处理</el-checkbox>
          </div>
          <div class="situationDiv">
            <p class="situationDivP">
              异常情况：
            </p>
            <div class="situationdivRight">
              <el-input
                type="textarea"
                :rows="4"
                resize="none"
                placeholder=""
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <div class="situationDiv">
            <p class="situationDivP">
              处理意见：
            </p>
            <div class="situationdivRight">
              <el-input
                type="textarea"
                :rows="4"
                resize="none"
                placeholder=""
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <div class="situationDiv">
            <p class="situationDivP">
              处理意见：
            </p>
            <div class="situationdivRight">
              <div class="situaRightdiv">
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
          </div>
          <div class="situationDiv">
            <div class="personnelone">
              <span class="personneloneSpan">安排人员：</span>
              <span>
              131
              </span>
            </div>
            <div class="personnelone">
              <span class="personneloneSpan">安排时间：</span>
              <span>
              131
              </span>
            </div>
          </div>
        </div>
        <div class="fastener">
          <div @click="conserve" class="conserve">
            保存
          </div>
          <div class="closedown">
            关闭
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'repair-rescheduling',
  props: ['msg'],
  data () {
    return {
      thispage: false,
      checked: true,
      textarea: '',
      options: [],
      value: ''
    }
  },
  methods: {
    conserve () {
      this.thispage = this.msg
      this.thispage = !this.thispage
      this.$emit('quipment', this.thispage)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    width 100%
    overflow hidden
    position relative
    margin-top 100px
    background #111a28
    padding 40px 0
    .content
      overflow hidden
      position relative
      width 1220px
      margin 0 auto
     .contentH
       color $color-text-title
       margin-bottom 26px
       font-size $font-size-medium-x
     .situation
        margin-left 80px
        overflow hidden
        position relative
        .situationTop
           init()
           margin-bottom 20px
           color $color-border-b-fault
           font-size $font-size-medium
           .situationTopP
              margin-right 10px
              float left
        .situationDiv
           init()
           margin-bottom 56px
        .situationdivRight
            float right
            width 1050px
       .personnelone
          float left
          width 50%
          overflow hidden
          position relative
          color $color-text
          font-size $font-size-medium
          .personneloneSpan
            color $color-border-b-fault
    .fastener
       init()
       text-align center
       .conserve
         conserve()
         margin-right 40px
       .closedown
         closedown()
  .situationDivP
    float left
    line-height 30px
    color $color-border-b-fault
    font-size $font-size-medium
</style>

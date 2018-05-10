<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        查看设备信息
      </h4>
      <div class="lookover">
        <ul class="lookover_ul">
          <li class="lookover_litwo">
            <p class="lookover_p">设施名称：</p>
            <div class="lookover_div">123</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备编码：</p>
            <div class="lookover_div">321</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">业主单位：</p>
            <div class="lookover_div">123</div>
          </li>
        </ul>
        <ul class="information">
          <li class="lookover_litwo">
            <p class="lookover_p">生产厂家：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">生产日期：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">技术参数：</p>
            <div></div>
          </li>

          <li class="lookover_litwo">
            <p class="lookover_p">规格型号：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">有效日期：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">创建人员：</p>
            <div></div>
          </li>

          <li class="lookover_litwo">
            <p class="lookover_p">设备位置：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备数量：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">编辑人员：</p>
            <div></div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">备注说明：</p>
            <div></div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">审核人员：</p>
            <div></div>
          </li>
          <li class="lookover_lithree">
            <p class="lithree_p">现场照片：</p>
            <div class="lookover_lithree_div">

            </div>
          </li>
        </ul>
      </div>
      <div class="situation">
        <div class="situation_left">
          <h4 class="situationH4">
            日常巡检情况
          </h4>
          <ul class="situation_ul">
            <li class="situation_li">
              <p class="situation_p">最近巡检时间：</p>
              <div class="situation_div">123142141</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">巡 检 人 员：</p>
              <div class="situation_div">123142141</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">巡 检 人 员：</p>
              <div class="situation_div">123142141</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">月度计划进展：</p>
              <div class="situation_div">123142141</div>
            </li>
          </ul>
        </div>
        <div class="situation_right">
          <h4 class="situationH4">
            维护保养情况
          </h4>
          <ul class="situation_ul">
            <li class="situation_li">
              <p class="situation_p">最近维保时间：</p>
              <div class="situation_div">123142141</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">维 保 人 员：</p>
              <div class="situation_div">123142141</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">维保工作总结：</p>
              <div class="situation_div">123142141</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">年度计划进展：</p>
              <div class="situation_div">123142141</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="fastener">
        <div @click.stop="conserve" class="conserve">
          保存
        </div>
        <div @click.stop="closedown" class="closedown">
          取消
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'adminChild-lookover',
  props: ['msg'],
  data () {
    return {
      // 组件 显示/隐藏
      lookoverBoolean: true
    }
  },
  methods: {
    conserve () {
      // 保存
      this.lookoverBoolean = this.msg
      this.lookoverBoolean = !this.lookoverBoolean
      this.$emit('look', this.lookoverBoolean)
    },
    closedown () {
      // 取消
      this.lookoverBoolean = this.msg
      this.lookoverBoolean = !this.lookoverBoolean
      this.$emit('look', this.lookoverBoolean)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .newlyadded
    margin 180px 0 0
    width 100%
    overflow hidden
    background #111a28
  .increase
    width 1245px
    margin 0 auto
    overflow hidden
    position relative
    padding-top 45px
    .increase_h4
      font-size $font-size-medium-x
      color $color-text-title
      margin-bottom 14px
    .lookover
      width 1170px
      margin 0 auto
      overflow hidden
      position relative
      .lookover_ul
        overflow hidden
        color $color-border-b-fault
        font-size $font-size-medium
        border-bottom 1px solid #444d5b
        .lookover_litwo
           float left
           overflow hidden
           width 33%
           margin-left 1%
           padding 12px 0
        .lookover_li
          float left
          overflow hidden
          width 33%
        .lookover_p
           float left
           margin-right 6px
           letter-spacing 2px
      .information
        overflow hidden
        color $color-border-b-fault
        font-size $font-size-medium
        border-bottom 1px solid #444d5b
        min-height 300px
        margin-bottom 20px
      .lookover_litwo
        float left
        overflow hidden
        width 33%
        margin-left 1%
        padding 12px 0
      .lookover_li
        float left
        overflow hidden
        width 33%
        padding 12px 0
      .lookover_lithree
        width 99%
        margin-left 1%
        padding 12px 0
        overflow hidden
      .lookover_p
        float left
        margin-right 6px
        letter-spacing 2px
      .lookover_lithree_div
        width 100%
        overflow hidden
        margin-top: 12px;
      .lithree_p
        letter-spacing 2px
    .situation
       overflow hidden
       width 100%
       position relative
      .situation_left
         width 50%
         float left
         overflow hidden
         position relative
      .situation_right
         width 50%
         float right
         overflow hidden
         position relative
      .situationH4
        font-size $font-size-medium-x
        color $color-text-title
        margin-bottom 14px
      .situation_ul
        margin-left 50px
        overflow hidden
        font-size $font-size-medium
        color $color-text-title
        .situation_li
         float left
         overflow hidden
         padding 12px 0
      .situation_p
         width 125px
         float left
         color $color-border-b-fault
         margin-right 6px
      .situation_div
         width 150px
         float left
         overflow hidden
         color $color-text
    .fastener
       width 100%
       overflow hidden
       position relative
       text-align center
       margin 30px 0 20px
       .conserve
         conserve()
         prohibit()
         margin-right 110px
       .closedown
         closedown()
         prohibit()
    .lookover_div
       float left
       color $color-text
</style>

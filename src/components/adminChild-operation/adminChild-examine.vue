<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        审核设施信息
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
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">生产日期：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">技术参数：</p>
            <div class="lookover_div">1231</div>
          </li>

          <li class="lookover_litwo">
            <p class="lookover_p">规格型号：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">有效日期：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">创建人员：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">设备位置：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备数量：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">编辑人员：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">备注说明：</p>
            <div class="lookover_div">1231</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">审核人员：</p>
            <div class="lookover_div">1231</div>
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
          <div class="situation_div">
            <p class="lookover_p">审核结论：</p>
            <div class="lookoverDiv">
              <el-radio-group v-model="radio">
                <el-radio :label="1">修改</el-radio>
                <el-radio :label="2">待审</el-radio>
                <el-radio :label="3">停用</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="situation_div">
            <p class="lookover_p">审核意见：</p>
            <div class="lookoverDiv">
              <el-select size="mini" v-model="view.value" placeholder="请选择">
                <el-option
                  v-for="item in view.child"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="situation_right">
          <div class="lookoverDiv">
            <p class="lookover_p">审核意见：</p>
            <p class="lookoverDivP">正常</p>
          </div>
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
  name: 'adminChild-examine',
  props: ['examine'],
  data () {
    return {
      // 审核  显示/隐藏
      examineBoolean: true,
      radio: 0,
      view: {
        child: [{
          value: '1',
          label: '默许'
        }, {
          value: '2',
          label: '拒绝'
        }, {
          value: '3',
          label: '同意'
        }, {
          value: '4',
          label: '不同意'
        }],
        value: ''
      }
    }
  },
  methods: {
    conserve () {
      this.examineBoolean = this.examine
      this.examineBoolean = !this.examineBoolean
      this.$emit('mine', this.examineBoolean)
    },
    closedown () {
      this.examineBoolean = this.examine
      this.examineBoolean = !this.examineBoolean
      this.$emit('mine', this.examineBoolean)
    }
  },
  created () {
    console.log(this.examine)
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
      width: 1170px;
      margin: 0 auto;
      position relative
    .situation_left
      width 50%
      float left
      overflow hidden
      position relative
    .situation_right
      width 30%
      float right
      overflow hidden
      position relative
    .situation_div
       init()
       margin-bottom 20px
    .lookover_p
      float left
      margin-right 6px
      letter-spacing 2px
      color $color-border-b-fault
    .lookoverDiv
      float left
      color $color-text
      width 300px
    .fastener
      init()
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
    .lookoverDivP
       float left
       color $color-text-tile-complete
</style>

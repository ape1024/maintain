<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        日常巡检查看
      </h4>
      <section class="examine">
        <header class="examine_header">
          <div class="header_left">
            <p class="examine_p">计划名称：</p>
            <div class="header_div">111</div>
          </div>
          <div class="header_right">
            <p class="examine_p">执行部门：</p>
            <div class="header_div">222</div>
          </div>
        </header>
        <div class="examine_div">
          <ul class="examine_div_ul">
            <li class="examine_div_li">
              <p>设施名称：</p>
              <div>123</div>
            </li>
            <li class="examine_div_li">
              <p>设备编码：</p>
              <div>321</div>
            </li>
            <li class="examine_div_li">
              <p>设备位置：</p>
              <div>123</div>
            </li>
            <li class="examine_div_li">
              <p>设施数量：</p>
              <div>321</div>
            </li>
          </ul>
        </div>
        <div class="proceeding">
          <div class="matters">
            <header class="matters_header">
              <ul class="matters_ul">
                <li class="matters_lithree">
                  工作事项
                </li>
                <li class="matters_li">
                  巡检人员
                </li>
                <li class="matters_li">
                  巡检时间
                </li>
                <li class="matters_litwo">
                  工作记录
                </li>
                <li class="matters_litwo">
                  工作结论
                </li>
                <li class="matters_li">
                  处理状态
                </li>
                <li class="matters_litwo">
                  现场照片
                </li>
              </ul>
            </header>
            <div class="content">
              <ul class="content_ul">
                <li class="matters_lithree">
                  工作事项
                </li>
                <li class="matters_li">
                  巡检人员
                </li>
                <li class="matters_li">
                  巡检时间
                </li>
                <li class="matters_litwo">
                  工作记录
                </li>
                <li class="matters_litwo">
                  工作结论
                </li>
                <li class="matters_li">
                  处理状态
                </li>
                <li class="matters_litwo">
                  现场照片
                </li>
              </ul>
            </div>
          </div>
          <div class="opinion">
            <div class="opinion_left">
              <div class="left_header">
                <p class="left_hederP">技术要求判定</p>
                <p class="left_hederPtwo"></p>
              </div>
              <div class="opinion_title">
                <ul class="opinion_ul">
                  <li class="opinion_li">
                    技术要求
                  </li>
                  <li class="opinion_litwo">
                    缺陷类型
                  </li>
                  <li class="opinion_litwo">
                    工作结论
                  </li>
                </ul>
                <ul class="title_ul">
                  <li class="title_li">
                    <ul class="title_li_ul">
                      <li class="opinion_li">
                        1
                      </li>
                      <li class="opinion_litwo">
                        2
                      </li>
                      <li class="opinion_litwo">
                        3
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="opinion_right">
              <div class="left_header">
                <el-checkbox v-model="checked">返工</el-checkbox>
              </div>
              <div class="differing">
                <div class="differingDiv">
                  <el-input :disabled="!checked"
                    type="textarea"
                    :rows="3"
                    resize="none"
                    placeholder=""
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="arrange">
          <div @click="assignment" class="assignment">
            安排任务
          </div>
          <div @click="preservation" class="preservation">
            保 存
          </div>
          <div @click="closeup" class="closeup">
            关闭
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'dailyChild-lookover',
  props: ['examine'],
  data () {
    return {
      // 返工按钮
      checked: false,
      radio: 0,
      textarea: '',
      examine_Boolean: false
    }
  },
  methods: {
    assignment () {
      this.examine_Boolean = this.examine
      this.examine_Boolean = !this.examine_Boolean
      this.$emit('mine', this.examine_Boolean)
    },
    preservation () {
      this.examine_Boolean = this.examine
      this.examine_Boolean = !this.examine_Boolean
      this.$emit('mine', this.examine_Boolean)
    },
    closeup () {
      this.examine_Boolean = this.examine
      this.examine_Boolean = !this.examine_Boolean
      this.$emit('mine', this.examine_Boolean)
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
    .examine
      width 1173px
      margin 0 auto
      overflow hidden
      color $color-text-title
      font-size $font-size-medium
      .examine_header
        width 100%
        padding-bottom 12px
        border-bottom 1px solid #444d5b
        overflow hidden
        .header_left
          float left
          overflow hidden
          margin-left 10px
          letter-spacing:2px
        .header_right
          float right
          overflow hidden
          letter-spacing:2px
        .header_div
          float left
          min-width: 267px;
          max-width: 267px;
          letter-spacing:2px
        .examine_p
          float left
          margin-right 6px
          color $color-border-b-fault
    .proceeding
      width 100%
      min-height 400px
      max-height 400px
      height calc(100% - 50px)
      overflow-y auto
      overflow-x hidden
    .examine_div
      margin-left 6px
      overflow hidden
      position relative
      .examine_div_ul
        overflow hidden
        font-size $font-size-medium
        color $color-text-title
        padding-top 30px
        .examine_div_li
          float left
          overflow hidden
          margin-right 40px
          margin-bottom 30px
          p
            float left
            margin-right 6px
            color $color-border-b-fault
          div
            width 276px
            float left
      .examine_div_ul li:nth-child(3)
        margin-right 0
    .matters
      width 100%
      overflow hidden
      position relative
      margin-bottom 20px
      .matters_header
        width 100%
        overflow hidden
        background #202f49
        color $color-text-title
        font-size $font-size-small
      .content
        width 100%
        overflow hidden
        background #0c121b
        color $color-header-b-normal
        font-size $font-size-small
      .matters_ul
        overflow hidden
        padding 7px 0
        .matters_li
          float left
          width 10%
        .matters_litwo
          float left
          width 20%
        .matters_lithree
          float left
          padding-left 2%
          width 8%
      .content_ul
        overflow hidden
        padding 30px 0
        .matters_li
          float left
          width 10%
        .matters_litwo
          float left
          width 20%
        .matters_lithree
          float left
          padding-left 2%
          width 8%
    .opinion
      width 100%
      overflow hidden
      font-size $font-size-small
      color $color-text-title
      position relative
      .opinion_left
        float left
        width 45%
        overflow hidden
      .opinion_right
        float right
        width 45%
        overflow hidden
      .left_header
        overflow hidden
        width 100%
        margin-bottom 12px
      .left_hederPtwo
        float right
        width 400px
        height 1px
        background #444d5b
        margin-top 6px
      .left_hederP
        color $color-border-b-fault
        float left
      .opinion_title
        width 100%
        background #0e1520
        overflow hidden
        .opinion_ul
          width 100%
          background #202f49
          overflow hidden
          padding 5px 0
        .opinion_li
          float left
          padding-left 5%
          width 55%
          overflow hidden
        .opinion_litwo
          float left
          width 20%
        .title_ul
          width 100%
          overflow hidden
          color $color-header-b-normal
      .title_li
        width 100%
        padding 18px 0
        overflow hidden
      .title_li_ul
        overflow hidden
      .choices
        overflow hidden
        position relative
        margin: 20px 0;
      .choicesP
        float left
        margin-right 20px
      .choicesDiv
        float left
      .differing
        overflow hidden
        position relative
        margin 10px 0
      .differingDiv
        width 430px
        float left
        overflow hidden
    .arrange
      width 100%
      text-align center
      overflow hidden
      margin-bottom: 20px;
      .assignment
        display inline-block
        cursor pointer
        width 107px
        height 36px
        background #32a692
        border-radius 5px
        text-align center
        line-height 36px
        transition .2s
        margin-right 30px
        &:hover
          background #4eb7a5
      .preservation
        display inline-block
        cursor pointer
        width 107px
        height 36px
        background $color-background-query
        border-radius 5px
        text-align center
        line-height 36px
        transition .2s
        margin-right 30px
        prohibit()
        &:hover
          background: #4b92bf;
      .closeup
        closedown()
        prohibit()
</style>

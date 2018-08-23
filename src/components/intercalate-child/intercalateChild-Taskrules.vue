<template>
  <div @click="shutdown" class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../common/img/department.png" alt="">
        <p class="subjectP">设备</p>
        <p v-if="JurisdictionApproval" @click="subjectpCreate" class="subjectptwo">新增</p>
      </header>
      <div class="leftBottom">
        <div class="leftBottomDiv">
          <el-tree node-click="changClick" :data="data" :props="defaultProps" highlight-current @node-click="handleNodeClick">
          </el-tree>
        </div>
      </div>
    </section>
    <section class="subjectRight">
      <div class="information">
        <ul class="informationUl">
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpantwo">
                工作事项:
              </span>
              <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
              </el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <ul class="informationLiDivUU">
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                工作方式:
              </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
              </el-input>
              </span>
                </li>
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                工作周期:
              </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
              </el-input>
              </span>
                </li>
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                抽签比例:
              </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
              </el-input>
              </span>
                </li>
              </ul>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <ul class="informationLiDivUU">
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                    修订级别:
                  </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
              </el-input>
              </span>
                </li>
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                     测量范围:
                  </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="input10"
                  clearable>
              </el-input>
              </span>
                </li>
              </ul>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                工作方法:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="textarea">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                质量要求:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="textarea">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                安全要求:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="textarea">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                工具适用:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="textarea">
</el-input>
              </span>
            </div>
          </li>
        </ul>
        <div class="bottom_header">
          <p class="bottom_headerP">规则信息</p>
          <p class="bottom_headerthread"></p>
        </div>
        <div class="communication">
          <div class="communicationTop">
            <div class="communicationTopLeft">
              <p class="communicationTopLeftP">技术要求:</p>
              <span class="communicationTopLeftSpan">
                <el-input size="mini" v-model="input" placeholder="请输入内容"></el-input>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'intercalateChild-structure',
  data () {
    return {

    }
  },
  watch: {
  },
  methods: {
  },
  created () {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 30px
      /*margin-right 56px*/
      .leftHeader
        width 100%
        overflow hidden
        position relative
        height 40px
        line-height 40px
        background #354d76
      .subjectImg
        margin 0 4px
        display inline-block
        width 40px
        float left
        height 40px
      .subjectP
        float left
        color $color-text
        line-height 40px
      .subjectptwo
        float right
        cursor pointer
        color $color-text-tile-complete
        margin-right 20px
      .leftBottom
        width 100%
        min-height 700px
        max-height 700px
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      height 740px
      background rgba(000,000,000,.47)
      overflow hidden
      position relative
      .rightHeader
        init()
        background #354d76
        padding 10px 0
      .rightLi
        float left
        width 10%
        overflow hidden
        text-align left
        color $color-header-b-normal
      .rightliTwo
        float left
        width 36%
        height 16px
        margin-right 2%
        word-break keep-all
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        color $color-header-b-normal
      .rightliThree
        width 32%
        overflow hidden
        position relative
        float left
        color $color-header-b-normal
      .rightliFour
        width 8%
        padding-left 2%
        overflow hidden
        position relative
        float left
        color $color-header-b-normal
      .content
        width 100%
        position relative
      .contentLi
        init()
        padding 10px 0
      .contentliUl
        init()
      .jurisdiction
        float left
        cursor pointer
        color $color-background-query
        margin-right 28px
      .member
        float left
        cursor pointer
        color $color-background-newly
        margin-right 28px
      .edit
        float left
        cursor pointer
        color $color-background-introduce
        margin-right 28px
      .copy
        float left
        color #e59a42
        cursor pointer
        margin-right 28px
      .amputate
        float left
        cursor pointer
        color #a63232
    .popup
      position fixed
      top 0
      left 0
      background rgba(000, 000, 000, .4)
      z-index 11
      width 100%
      height 100%
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
  .information
    overflow-y auto
    position relative
    margin 12px 30px
    .informationUl
      overflow hidden
      border 1px solid #444d5b
      background #0b111a
      position relative
      .informationLi
       padding 20px 0
       overflow hidden
       border-bottom 1px solid #444d5b
       width 100%
       .informationLiDiv
         margin 0 30px
         color #999
         font-size 16px
         overflow hidden
         .informationLiDivSpan
           display inline-block
         .informationLiDivSpantwo
           margin-right 20px
         .informationLiDivSpanThree
           display inline-block
           margin-right 20px
           width 1000px
         .informationLiDivSpanFour
           float left
           line-height 54px
           margin-right 20px
  .bottom_header
    overflow hidden
    color #d5d5d5
    font-size 16px
    margin 20px 0
    position relative
    .bottom_headerP
      float left
      color #444d5b
      margin-right 20px
    .bottom_headerthread
      float right
      width 1330px
      height 1px
      background #444d5b
      margin-top 8px
  .communication
    padding-left 30px
    overflow hidden
    .communicationTop
       width 100%
       overflow hidden
       margin-bottom 20px
      .communicationTopLeft
        float left
        overflow hidden
        width 50%
        .communicationTopLeftP
          color #fff
          float left
        .communicationTopLeftSpan
          display inline-block
          overflow hidden
          width 520px
  .informationUl .informationLi:last-child
    border none
  .informationLiDivUU
    position relative
    width 100%
    overflow hidden
    .informationLiDivUULi
      float left
      overflow hidden
      width 30%
</style>

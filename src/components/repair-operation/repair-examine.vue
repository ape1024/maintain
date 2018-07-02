<template>
    <div class="subject">
      <section class="content">
        <h4 class="contentH">
          故障维修审核
        </h4>
        <div class="information">
          <div class="informationTop">
            <ul class="informationTopUl">
              <li class="informationTopLitwo">
                <span>设施名称：</span>
                <span class="informationTopSpan">{{examine.devicename}}</span>
              </li>
              <li class="informationTopLi">
                <span>设备编码：</span>
                <span class="informationTopSpan">{{examine.devicecode}}</span>
              </li>
              <li class="informationTopLi">
                <span>设施数量：</span>
                <span class="informationTopSpan">
                  {{examine.devicecount}}
                </span>
              </li>
            </ul>
          </div>
          <ul class="informationTopUl">
            <li class="informationTopLitwo">
              <span>设施位置：</span>
              <span class="informationTopSpan">
                  {{examine.areaname}}
                  {{examine.position}}
              </span>
            </li>
          </ul>
          <div class="tabulation">
            <div class="tabulationLeft">
              <div class="tleftTop">
                <div class="tlefttopHeader">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">安排人员：</span>
                    <span>
                       {{examine.creatername}}
                    </span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">安排时间：</span>
                    <span>{{examine.createtime}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">审核人员：</span>
                    <span>111</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">审核时间：</span>
                    <span></span>
                  </p>
                </div>
                <ul class="tlefttopUl">
                  <li class="tlefttopli">
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">处理意见：</span>
                      <span class="tlefttopli_Spantwo">{{examine.creater}}</span>
                    </div>
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">审核结论：</span>
                      <span class="tlefttopli_Spantwo">131231</span>
                    </div>
                  </li>
                  <li class="tlefttopli">
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">异常情况：</span>
                      <span class="tlefttopli_Spantwo">{{examine.exception}}</span>
                    </div>
                    <div class="tlefttopli__Div">
                      <span class="tlefttopli_Span">审核意见：</span>
                      <span class="tlefttopli_Spantwo">131231</span>
                    </div>
                  </li>
                  <li class="tlefttopli">
                    <span class="tlefttopli__Span">现场照片：</span>
                    <img class="tlefttopli_Img" :key="index" v-for="(item, index) in srcData" :src="item" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section class="classification">
          <header class="ficationHeader">
            <p class="ficationHeaderP">故障维修验证</p>
            <p class="ficationHeaderX"></p>
          </header>
          <div class="verification">
            <ul class="verificationUl">
              <li class="verificationLi">
                验证意见
              </li>
              <li class="verificationLitwo">
                <div class="verificationLitwoDiv">
                 <p class="verificationLiP">
                   <el-radio v-model="radio" label="1">经确认，故障问题已处理</el-radio>
                 </p>
                 <p class="verificationLiP">
                   <el-radio v-model="radio" label="2">
                     其他意见
                     <div class="inputDiv">
                       <el-input v-model="input" placeholder="请输入内容"></el-input>
                     </div>
                   </el-radio>
                 </p>
                </div>
              </li>
              <li class="verificationLithree">
                <div class="verificationLithreeDiv">
                  <p>
                    <span>验证人员：</span>
                    <span class="verificationLithreeDivSpan">{{examine.checktime}}</span>
                  </p>
                </div>
                <div class="verificationLithreeDivtwo">
                  <p>
                    <span>验证时间：</span>
                    <span class="verificationLithreeDivSpan">
                      {{examine.checkpersonname}}
                    </span>
                  </p>
                </div>
              </li>
              <li class="verificationLifour">
                <div class="verificationLithreeDiv">
                  <span>审核结论：</span>
                  <el-radio-group v-model="approvalradio">
                    <el-radio :key="index" v-for="(item, index) in approvaloptions" :label="item.value">{{item.name}}</el-radio>
                  </el-radio-group>
                </div>
                <div class="verificationLithreeDivtwo">
                  审核意见：
                  <span class="differingOpinion"><el-input v-model="input" placeholder="请输入内容"></el-input></span>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section class="classification">
          <header class="ficationHeader">
            <p class="ficationHeaderP">维修记录</p>
          </header>
          <ul class="ficationUl">
            <li class="ficationLi">
              <div @click="ficationClick" class="ficationLiDiv">
                <p class="ficationLiDivP">
                    <span class="ficationLiDivSpan">
                 {{examine.repairtime}}
                </span>
                  <span class="ficationLiDivSpantwo">
                  {{examine.repairstate}}
                </span>
                </p>
                <p class="ficationLiDivPtwo">
                  <i v-show="ficationBoolean" class="el-icon-arrow-down
"></i>
                  <i v-show="!ficationBoolean" class="el-icon-arrow-up"></i>
                </p>
              </div>
              <div v-show="ficationBoolean" class="ficationEnsconce">
                <ul class="ficationEnsconceUl">
                  <li class="ficationEnsconceLi">
                    <p class="ficationEnsconceLiP">
                      <span class="ficationEnsconceLiSpan">
                        处理时间:
                      </span>
                      <span class="ficationEnsconceLiSpantwo">
                        {{examine.repairtime}}
                      </span>
                    </p>
                    <p class="ficationEnsconceLiPtwo">
                      <span class="ficationEnsconceLiSpan">
                        处理人员:
                      </span>
                      <span class="ficationEnsconceLiSpantwo">
                        {{examine.repairpersonname}}
                      </span>
                    </p>
                    <p class="ficationEnsconceLiPtwo">
  <span class="ficationEnsconceLiSpan">
                        处理结果:
                      </span>
                      <span class="ficationEnsconceLiSpantwo">
                        {{examine.repairstate}}
                      </span>
                    </p>
                  </li>
                  <li class="ficationEnsconceLitwo">
                    <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        问题原因:
                      </span>
                      <span class="ficationEnsconceLitwoSpantwo">
1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                      </span>
                    </div>
                    <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        处理情况:
                      </span>
                      <span class="ficationEnsconceLitwoSpantwo">
1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                      </span>
                    </div>
                  </li>
                  <li class="ficationEnsconceLitwo">
                      <span class="ficationEnsconceLitwoSpan">
                        现场照片:
                      </span>
                    <span class="ficationEnsconceLitwoSpanThree">
1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                      </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="assortment">
            <div class="fastener">
              <div class="examine">重新安排</div>
              <div @click="conserve" class="conserve">保存</div>
              <div class="closedown">关闭</div>
            </div>
          </div>
        </section>
      </section>
    </div>
</template>

<script>
export default {
  name: 'repair-examine',
  props: ['examine', 'rework', 'examina'],
  data () {
    return {
      options: [],
      thisPage: false,
      value: '',
      radio: '',
      input: '',
      ficationBoolean: true,
      srcData: [],
      approvaloptions: '',
      approvalradio: ''
    }
  },
  methods: {
    conserve () {
      this.$emit('mine', this.thisPage)
      console.log('222222222')
    },
    closedown () {

    },
    ficationClick () {
      this.ficationBoolean = !this.ficationBoolean
    }
  },
  created () {
    // beforephotos  上面的现场照片
    if (this.examine.beforephotos === null) {
      this.srcData = []
    } else {
      let src = this.examine.beforephotos.split(',')
      this.srcData = src
    }
    //  维修记录
    console.log(this.rework)
    //  审批
    console.log(this.examina)
    //  审批状态
    this.axios.post(`http://172.16.6.181:8920/task/getTaskApprovalItems`).then((response) => {
      if (response.data.code === 0) {
        this.approvaloptions = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    width 100%
    overflow hidden
    position relative
    margin-top 10px
    background #111a28
    padding 10px 0
    .content
      overflow hidden
      position relative
      width 1220px
      margin 0 auto
     .contentH
       color $color-text-title
       margin-bottom 26px
       font-size $font-size-medium-x
     .information
       overflow hidden
       position relative
       margin-left 70px
       .informationTop
          overflow hidden
          position relative
          padding-bottom 14px
          margin-bottom 14px
          border-bottom 1px solid $color-border-list
         .informationTopUl
           init()
           .informationTopLitwo
             width 33%
             margin-left 1%
             font-size $font-size-medium
             color $color-border-b-fault
             float left
           .informationTopLi
             width 33%
             font-size $font-size-medium
             color $color-border-b-fault
             float left
           .informationTopSpan
             color $color-text
             margin-left 10px
         .tabulation
           init()
           margin-top 20px
           .tabulationLeft
              overflow hidden
           .tabulationRight
             overflow hidden
             float right
           .tleftTop
              background #0b111a
              overflow hidden
              margin-bottom 10px
              border 1px solid $color-border-list
           .tleftBottomTwo
             float right
             width 543px
             background #0b111a
             overflow hidden
             margin-bottom 14px
             font-size $font-size-small
             border 1px solid $color-border-list
             justify-content center
             align-items center
             display -webkit-flex
           .tleftBottom
             float left
             width 543px
             background #0b111a
             overflow hidden
             margin-bottom 14px
             font-size $font-size-small
             border 1px solid $color-border-list
             justify-content center
             align-items center
             display -webkit-flex
           .tlefttopHeader
              init()
              padding 10px 0
              border-bottom 1px solid $color-border-list
              color $color-text
              font-size $font-size-medium
           .tlefttopHeaderP
             width 25%
             float left
           .tlefttopHeaderSpan
             margin 0 12px
             color $color-border-b-fault
           .tlefttopUl
              init()
           .tlefttopli
             overflow hidden
             position relative
             border-bottom 1px solid $color-border-list
             height 80px
             .tlefttopli_Span
               float left
               color #999
               line-height 40px
             .tlefttopli_Spantwo
               color #fff
               float left
               width 480px
               padding-top 12px
           .tlefttopUl .tlefttopli:last-child
             border none
           .tlefttopLeft
              float left
              text-align center
              font-size $font-size-small
              width 80px
              color #999
              vertical-align middle
           .tlefttopRight
              float right
              border-left 1px solid $color-border-list
              width 462px
           .tlefttopRight .tlefttoprightLi:last-child
                border none
           .tlefttoprightLi
               init()
               border-bottom 1px solid $color-border-list
               padding 10px 0
           .tlefttoprightliP
              float left
              width 50%
              color $color-text
           .tlefttoprightliSpan
              margin 0 10px
              color $color-border-b-fault
     .classification
       overflow hidden
       position relative
       margin-left 30px
       .ficationHeader
         init()
         margin 10px 0
         font-size $font-size-small
         color $color-header-b-normal
         .ficationHeaderP
           float left
           background #111a28
           padding-right 40px
           color #999
         .ficationHeaderX
           height 1px
           width 100%
           margin-top 5px
           background $color-border-list
       .assortment
         overflow hidden
         position relative
         margin-left 40px
         margin-top 10px
         .assortmentUl
           init()
           margin-bottom 30px
           .assortmentLi
             float left
             width 33%
             margin-top 20px
             color $color-border-b-fault
             font-size $font-size-medium
             overflow hidden
             .assortmentliP
                float left
                line-height 30px
             .assortmentliDiv
                float left
                overflow hidden
                width 217px
       .fastener
         init()
         text-align center
         .examine
           examine()
           margin-right 30px
           display inline-block
         .conserve
           conserve()
           margin-right 30px
           display inline-block
         .closedown
           closedown()
           display inline-block
  .arrange
    overflow hidden
    position relative
    width 100%
  .verification
    background #0b111a
    overflow hidden
    margin-bottom 14px
    margin-left 40px
    border 1px solid $color-border-list
    .verificationUl
     init()
     height 97px
     .verificationLi
       float left
       line-height 97px
       text-align center
       color #999
       border-right 1px solid $color-border-list
       width 80px
     .verificationLitwo
       width 340px
       height 97px
       overflow hidden
       border-right 1px solid $color-border-list
       float left
     .verificationLifour
        overflow hidden
        float left
  .verificationLiP
     margin 16px 0 0 20px
     overflow hidden
  .inputDiv
    display inline-block
    margin-left 6px
    width 200px
  .verificationLithree
    width calc(20% - 1px)
    height 97px
    float left
    overflow hidden
    position relative
    border-right 1px solid $color-border-list
  .verificationLithreeDiv
    width 496px
    height 48px
    line-height 48px
    color #999
    text-indent 1em
    border-bottom 1px solid $color-border-list
  .verificationLithreeDivSpan
     color #fff
  .verificationLithreeDivtwo
    width 100%
    height 48px
    line-height 48px
    color #999
    text-indent 1em
  .ficationUl
    overflow hidden
    position relative
    height: 250px
    overflow-y: scroll
    margin-left 40px
  .ficationLi
    width 100%
    margin-bottom 10px
    position relative
    overflow hidden
    .ficationLiDiv
      overflow hidden
      height 30px
      cursor pointer
      line-height 30px
      font-size 14px
      background #1c273a
      position relative
      width 100%
    .ficationLiDivP
      float left
    .ficationLiDivSpan
      color #fff
      margin 0 60px 0 15px
  .ficationLiDivPtwo
    float right
    color #fff
    font-size 18px
    cursor pointer
    margin-right 20px
  .ficationEnsconce
    margin-top 10px
    border 1px solid $color-border-list
    position relative
    overflow hidden
  .ficationEnsconceUl
    width 100%
    background #0b111a
    position relative
    overflow hidden
  .ficationEnsconceLi
    border-bottom 1px solid $color-border-list
    height 40px
    line-height 40px
    width 100%
  .ficationEnsconceLiP
    float left
    overflow hidden
    width 33%
    padding-left 1%
  .ficationEnsconceLiSpan
    color #999
    margin-right 10px
  .ficationEnsconceLiSpantwo
    color #fff
  .ficationEnsconceLiPtwo
    float left
    overflow hidden
    width 33%
  .ficationEnsconceLitwo
    border-bottom 1px solid $color-border-list
    height 80px
    width 100%
  .ficationEnsconceLitwoDiv
    float left
    position relative
    overflow hidden
    width 50%
  .ficationEnsconceLitwoSpan
    float left
    margin 0 15px
    line-height 40px
    color #999
  .ficationEnsconceLitwoSpantwo
    float left
    color #fff
    width 460px
    padding: 10px 0;
    word-break break-all
    word-wrap break-word
  .ficationEnsconceLitwoSpanThree
    float left
    color #fff
    width 1030px
    padding 10px 0
    word-break break-all
    word-wrap break-word
  .tlefttopli__Div
    float left
    width 49%
    position relative
    overflow hidden
    padding-left 1%
  .tlefttopli_Img
    width 40px
    height 40px
    display inline-block
    margin-top 22px
    margin-right 20px
  .tlefttopli__Span
    float left
    color #999
    padding-left 1%
    line-height 80px
  .ficationLiDivSpantwo
    color #fff
  .differingOpinion
    width 350px
    display inline-block
</style>

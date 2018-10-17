<template>
  <div class="subject">
    <section class="content">
      <h4 class="contentH">
        现场反馈信息 查看
      </h4>
      <div class="information">
        <div class="tabulation">
          <div class="tabulationLeft">
            <div class="tleftTop">
              <ul class="tlefttopUl">
                <!--消防设施 设备编码 设备位置-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">消防设施：</span>
                    <span class="tlefttopli_Span">{{msg.devicename}}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">设备编码：</span>
                    <span class="tlefttopli_Span">{{msg.devicecode}}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">设备位置：</span>
                    <span class="tlefttopli_Span">{{msg.areaname}}{{msg.position}}</span>
                  </p>
                </li>
                <!--维保单位 项目负责人 联系电话-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">维保单位：</span>
                    <span class="tlefttopli_Span">{{msg.vindicatorname}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">项目负责人：</span>
                    <span class="tlefttopli_Span">{{msg.leader}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">联系电话：</span>
                    <span class="tlefttopli_Span">{{msg.leadertel}}</span>
                  </p>
                </li>
                <!--反馈情况-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP100">
                    <span class="tlefttopHeaderSpan">反馈情况：</span>
                    <span class="tlefttopli_Span">{{msg.feedbackinfo}}</span>
                  </p>
                </li>
                <!--处理意见-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP100">
                    <span class="tlefttopHeaderSpan">处理意见：</span>
                    <span class="tlefttopli_Span">{{msg.disposeopinion}}</span>
                  </p>
                </li>
                <!--反馈人员 反馈时间 处理人员 处理时间-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">反馈人员：</span>
                    <span class="tlefttopli_Span">{{msg.creatername}}</span>
                  </p>
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">反馈时间：</span>
                    <span class="tlefttopli_Span">{{fmtDate(msg.createtime)}}</span>
                  </p>
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">处理人员：</span>
                    <span class="tlefttopli_Span">{{msg.repairpersonname}}</span>
                  </p>
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">处理时间：</span>
                    <span class="tlefttopli_Span">{{fmtDate(msg.repairtime)}}</span>
                  </p>
                </li>
                <!--处理状态 确认状态 确认人员 确认时间-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">处理状态：</span>
                    <span class="tlefttopli_Span">{{disposeExhibition}}</span>
                  </p>
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">确认状态：</span>
                    <span class="tlefttopli_Span">{{confirmExhibition}}</span>
                  </p>
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">确认人员：</span>
                    <span class="tlefttopli_Span">{{msg.confirmpersonname}}</span>
                  </p>
                  <p class="tlefttopHeaderP25">
                    <span class="tlefttopHeaderSpan">确认时间：</span>
                    <span class="tlefttopli_Span">{{fmtDate(msg.confirmpertime)}}</span>
                  </p>
                </li>
                <!--现场照片-->
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP100">
                    <span class="tlefttopHeaderSpan">现场照片：</span>
                    <img :key="index" @click="selectImg(index)"  v-for="(item, index) in photograph" class="photograph" :src="item" alt="">
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!--操作-->
      <section class="classification">
        <div class="assortment">
          <div class="fastener">
            <div class="closedown" @click="closedown">关闭</div>
          </div>
        </div>
      </section>
    </section>
    <dialog-img ref="dialogImg" :list="photograph"></dialog-img>
  </div>
</template>

<script>
import DialogImg from 'base/dialog-img/dialog-img'
import { maintainReportgetFeedbackstateStates, maintainReportgetConfrimStates } from '../../api/user'
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
export default {
  name: 'reportChild-lookover-',
  props: ['msg'],
  data () {
    return {
      // 显示/隐藏 查看组件
      lookoverBoolean: false,
      textarea: '',
      checked: false,
      //  确认状态
      confirmExhibition: '',
      //  处理状态
      disposeExhibition: '',
      //  照片
      photograph: []
    }
  },
  methods: {
    closedown () {
      this.$emit('look', this.lookoverBoolean)
    },
    selectImg (index) {
      this.$refs.dialogImg.switchIndex(index)
      this.$refs.dialogImg.open()
    },
    fmtDate (obj) {
      return formatDate(obj, 'yyyy/MM/dd HH:mm:ss')
    }
  },
  components: {
    DialogImg
  },
  created () {
    this.photograph = this.msg.photos !== '' ? this.msg.photos.split(',') : ''
    //  确认状态
    let confirm = []
    let confirmName = this.msg.comfirmstate
    this.axios.post(maintainReportgetConfrimStates()).then((response) => {
      confirm = response.data
      confirm.forEach((val) => {
        if (val.value === confirmName) {
          this.confirmExhibition = val.name
        }
      })
    })
    //  处理状态
    let dispose = []
    let disposeName = this.msg.feedbackstate
    this.axios.post(maintainReportgetFeedbackstateStates()).then((response) => {
      dispose = response.data
      dispose.forEach((val) => {
        if (val.value === disposeName) {
          this.disposeExhibition = val.name
        }
      })
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
    margin-top 100px
    background #111a28
    padding 40px 0
    .content
      overflow hidden
      position relative
      width 1400px
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
        border-bottom 1px solid #444d5b
      .informationTopUl
        init()
        .informationTopLitwo
          width 33%
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
        margin 20px 0
        .tabulationLeft
          overflow hidden
          float left
        .tabulationRight
          overflow hidden
          float right
        .tleftTop
          width 1300px
          background #0b111a
          overflow hidden
          margin-bottom 14px
          border 1px solid #444d5b
        .tleftBottom
          width 1300px
          background #0b111a
          overflow hidden
          margin-bottom 14px
          font-size $font-size-small
          border 1px solid #444d5b
          justify-content center
          align-items center
          display -webkit-flex
        .tlefttopHeader
          init()
          padding 10px 0
          border-bottom 1px solid #444d5b
          color $color-text
          font-size $font-size-medium
        .tlefttopHeaderP
          width 33%
          overflow hidden
          float left
          line-height 30px
        .tlefttopHeaderP25
          width 25%
          overflow hidden
          float left
          line-height 30px
        .tlefttopHeaderP100
          width 100%
          overflow hidden
          float left
          line-height 30px
        .tlefttopHeaderText
          width 100%
          overflow hidden
          float left
          line-height 30px
        .tlefttopHeaderSpan
          margin 0 12px
          color $color-border-b-fault
        .tlefttopUl
          init()
        .tlefttopli
          overflow hidden
          position relative
          border-bottom 1px solid #444d5b
          padding 26px 0
        .tlefttopUl .tlefttopli:last-child
          border none
        .tlefttopLeft
          float left
          text-align center
          font-size $font-size-small
          width 80px
          vertical-align middle
        .tlefttopRight
          float right
          border-left 1px solid #444d5b
          width 462px
        .tlefttopRight .tlefttoprightLi:last-child
          border none
        .tlefttoprightLi
          init()
          border-bottom 1px solid #444d5b
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
        font-size $font-size-small
        color $color-header-b-normal
        .ficationHeaderP
          float left
          background #111a28
          padding-right 40px
        .ficationHeaderX
          height 1px
          width 100%
          margin-top 5px
          background #444d5b
      .assortment
        overflow hidden
        position relative
        margin-left 40px
        .assortmentUl
          init()
          margin-bottom 10px
          .assortmentLi
            float left
            width 60%
            margin-top 20px
            color $color-border-b-fault
            font-size $font-size-medium
            overflow hidden
            .assortmentLi_div
              width 100%
              overflow hidden
              margin-bottom 10px
              position relative
            .assortmentliP
              float left
              line-height 30px
            .assortmentliDiv
              float left
              overflow hidden
              width 490px
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
  .tree
    background transparent
    color $color-text-desc
    .custom-tree-node
      padding-top 7px
      font-size $font-size-small
      .tree-checkbox
        padding 10px 0 0 10px
        .tree-checkbox-item
          padding 5px 0
    .el-tree-node__children .custom-tree-node
      background none
    .el-tree-node__content
      height auto
      align-items flex-start
  .personChargeDiv
    overflow hidden
    max-height 300px
  .personnel
    init()
    margin-bottom 20px
    .assortmentliP
      float left
      color $color-border-b-fault
      line-height 30px
    .assortmentLi_div
      width 50%
      max-height 150px
      min-height 150px
      overflow-y scroll
  .assortmentLi_divtwo
    float left
    width 44%
    margin-right 6%
    margin-bottom 10px
    overflow hidden
  .tree-wrapper
    overflow hidden
  .assortmentLitwo
    width 40%
    float left
    margin-top 20px
    .assortmentLi_div
      init()
      .assortmentLi_divP
        color $color-border-b-fault
        margin-bottom 20px
  .tlefttopli_Span
    color #fff
  .tlefttopli_img
    display inline-block
    margin-right 20px
    width 40px
    height 40px
    margin-top 0px
  .tlefttopHeaderSpantwo
    margin 0 12px
    display inline-block
    color #999
  .tlefttoplitwo
    overflow hidden
    position relative
    border-bottom 1px solid #444d5b
    padding 10px 0 26px
  .tlefttopHeaderPDivtwo
    float left
    line-height 26px
  .tlefttopHeaderPDiv
    float left
  .photograph
    display inline-block
    margin-right 20px
    width 40px
    height 40px
</style>

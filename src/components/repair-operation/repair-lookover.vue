<template>
  <div class="subject">
    <section class="content">
      <h4 class="contentH">
        故障维修查看
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
              <span>设施位置：</span>
              <span class="informationTopSpan">{{examine.areaname}}{{examine.position}}</span>
            </li>
          </ul>
        </div>
        <ul class="informationTopUl">
          <li class="informationTopLitwo">
            <span>设施数量：</span>
            <span class="informationTopSpan">{{examine.devicecount}}</span>
          </li>
        </ul>
        <div class="tabulation">
          <div class="tabulationLeft">
            <div class="tleftTop">
              <div class="tlefttopHeader">
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">检查时间：</span>
                  <span>{{fmtDate(inspectUp.checktime)}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">检查人员：</span>
                  <span>{{inspectUp.checkpersonname}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="">
                    <span class="tlefttopHeaderSpan">检查项目：</span>
                    <span class="tlefttoprightLiSpans">{{inspectUp.conclusion}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="">
                    <span class="tlefttopHeaderSpan">检查记录：</span>
                    <span class="tlefttoprightLiSpans">{{inspectUp.workitem}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderImg">
                    <span class="tlefttopHeaderSpan">现场照片：</span>
                    <span>
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphoto(examine.beforephotos), index)" :key="index" v-for="(data, index) in fieldphoto(examine.beforephotos)" :src="data" alt="">
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="tleftBottom">
              <ul class="tlefttopRight">
                <li class="tlefttoprightLi">
                  <p class="tlefttoprightliP">
                    <span class="tlefttoprightliSpan">安排人员：</span>
                    <span>{{examine.creatername}}</span>
                  </p>
                  <p class="tlefttoprightliP">
                    <span class="tlefttoprightliSpan">安排时间：</span>
                    <span >{{fmtDate(examine.createtime)}}</span>
                  </p>
                </li>
                <li class="tlefttoprightLi">
                  <span class="tlefttoprightliSpan">处理意见：</span>
                  <span class="tlefttoprightLiSpans">{{examine.disposeopinion}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="tabulationRight">
            <div class="tleftTop">
              <div class="tlefttopHeader">
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">处理时间：</span>
                  <span>{{fmtDate(examine.repairtime)}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">检查人员：</span>
                  <span>{{examine.repairpersonname}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">问题原因：</span>
                    <span class="tlefttoprightLiSpans">{{examine.reason}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">处理情况：</span>
                    <span class="tlefttoprightLiSpans">{{examine.treatment}}</span>
                  </p>
                </li>
                <li class="tlefttopli">
                    <span class="tlefttopHeaderSpan">处理结果：</span>
                    <span class="tlefttoprightLiSpans">{{examine.repairpersonname}}</span>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderImg">
                    <span class="tlefttopHeaderSpan">现场照片：</span>
                    <span>
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphoto(examine.afterphotos), index)"  :key="index" v-for="(data, index) in fieldphoto(examine.afterphotos)" :src="data" alt="">
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="tleftBottom">
              <ul class="tlefttopRight">
                <li class="tlefttoprightLi">
                  <p class="tlefttoprightliP">
                    <span class="tlefttoprightliSpan">审核人员：</span>
                    <span>{{AuditorsPersonnel}}</span>
                  </p>
                  <p class="tlefttoprightliP">
                    <span class="tlefttoprightliSpan">审核时间：</span>
                    <span>{{AuditorsTimer}}</span>
                  </p>
                </li>
                <li class="tlefttoprightLi">
                  <span class="tlefttoprightliSpan">审核结论：</span>
                  <span>{{Auditorsstate}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section class="classification">
        <header class="ficationHeader">
          <p class="ficationHeaderP">维修记录</p>
        </header>
        <ul class="ficationUl">
          <li :key="index" v-for="(item ,index) in reworkData" class="ficationLi">
            <div @click.stop="ficationClick(item, reworkData)" class="ficationLiDiv">
              <p class="ficationLiDivP">
                    <span class="ficationLiDivSpan">
                 {{fmtDate(item.repairtime)}}
                </span>
                <span class="ficationLiDivSpantwo">
                  {{obtainState(item.repairstate)}}
                </span>
              </p>
              <p class="ficationLiDivPtwo">
                <i v-show="item.flag" class="el-icon-arrow-down"></i>
                <i v-show="!item.flag" class="el-icon-arrow-up"></i>
              </p>
              <p class="ficationLiDivPthree">
                返工
              </p>
            </div>
            <div v-show="item.flag" class="ficationEnsconce">
              <ul class="ficationEnsconceUl">
                <li class="ficationEnsconceLi">
                  <p class="ficationEnsconceLiP">
                      <span class="ficationEnsconceLiSpan">
                        处理时间:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{fmtDate(item.repairtime)}}
                      </span>
                  </p>
                  <p class="ficationEnsconceLiPtwo">
                      <span class="ficationEnsconceLiSpan">
                        处理人员:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{item.repairpersonname}}
                      </span>
                  </p>
                  <p class="ficationEnsconceLiPtwo">
                      <span class="ficationEnsconceLiSpan">
                        处理结果:
                      </span>
                    <span class="ficationEnsconceLiSpantwo">
                        {{obtainState(item.repairstatename)}}
                      </span>
                  </p>
                </li>
                <li class="ficationEnsconceLitwo">
                  <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        问题原因:
                      </span>
                    <span class="ficationEnsconceLitwoSpantwo">
                        {{item.reason}}
                      </span>
                  </div>
                  <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        处理情况:
                      </span>
                    <span class="ficationEnsconceLitwoSpantwo">
                        {{item.treatment}}
                      </span>
                  </div>
                </li>
                <li class="ficationEnsconceLitwo">
                      <span class="ficationEnsconceLitwoSpan">
                        现场照片:
                      </span>
                  <span class="ficationEnsconceLitwoSpanThree">
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphoto(item.afterphotos), imgIndex)" :key="imgIndex" v-for="(data , imgIndex) in fieldphoto(item.afterphotos)" :src="data" alt="">
                    </span>
                </li>
              </ul>
            </div>
          </li>
          <li class="ficationLi">
            <div @click="approvalClick" class="ficationLiDiv">
              <p class="ficationLiDivP">
                    <span class="ficationLiDivSpan">
                 {{fmtDate(examine.repairtime)}}
                </span>
                <span class="ficationLiDivSpantwo">
                  {{obtainState(examine.repairstate)}}
                </span>
              </p>
              <p class="ficationLiDivPtwo">
                <i v-show="ficationBoolean" class="el-icon-arrow-down"></i>
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
                        {{fmtDate(examine.repairtime)}}
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
                        {{obtainState(examine.repairstate)}}
                      </span>
                  </p>
                </li>
                <li class="ficationEnsconceLitwo">
                  <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        问题原因:
                      </span>
                    <span class="ficationEnsconceLitwoSpantwo">
                        {{examine.reason}}
                      </span>
                  </div>
                  <div class="ficationEnsconceLitwoDiv">
                      <span class="ficationEnsconceLitwoSpan">
                        处理情况:
                      </span>
                    <span class="ficationEnsconceLitwoSpantwo">
                        {{examine.treatment}}
                      </span>
                  </div>
                </li>
                <li class="ficationEnsconceLitwo">
                      <span class="ficationEnsconceLitwoSpan">
                        现场照片:
                      </span>
                  <span class="ficationEnsconceLitwoSpanThree">
                      <img class="ficationEnsconceLitwoSpanThreeImg" @click="selectImg(fieldphoto(examine.afterphotos), index)" v-for="(data ,index) in fieldphoto(examine.afterphotos)" :key="index" :src="data" alt="">
                      </span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
      <section class="classification">
        <div class="assortment">
          <div class="fastener">
            <!--<div @click="conserve" class="conserve">确认</div>-->
            <div @click="conserve" class="closedown">关闭</div>
          </div>
        </div>
      </section>
    </section>
    <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
  </div>
</template>

<script>
import DialogImg from 'base/dialog-img/dialog-img'
import { maintainRepairfindReworksByTaskid, maintainRepairgetApprovalInfos, getCheckTaskByRepairTaskId } from '../../api/user'
export default {
  name: 'repair-lookover',
  props: ['examine', 'state'],
  data () {
    return {
      options: [],
      thisPage: false,
      value: '',
      reworkData: '',
      ficationBoolean: false,
      getApprovalInfos: '',
      AuditorsPersonnel: '',
      AuditorsTimer: '',
      Auditorsstate: '',
      Auditorsopinion: '',
      inspectUp: {
        checktime: '',
        checkpersonname: '',
        conclusion: '',
        workitem: ''
      },
      imgList: []
    }
  },
  methods: {
    approvalClick () {
      this.ficationBoolean = !this.ficationBoolean
    },
    ficationClick (item, data) {
      item.flag = !item.flag
    },
    conserve () {
      this.$emit('look', this.thisPage)
    },
    closedown () {
      this.$emit('look', this.thisPage)
    },
    fmtDate (obj) {
      if (!obj) return ''
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    //  现场照片
    fieldphoto (src) {
      console.log(src)
      let arr = []
      if (src === '' || src === null) {
        return arr
      } else {
        src.split(',').forEach((val) => {
          arr.push(val)
        })
        return arr
      }
    },
    selectImg (list, index) {
      this.imgList = list
      setTimeout(() => {
        this.$refs.dialogImg.switchIndex(index)
        this.$refs.dialogImg.open()
      }, 200)
    },
    //  获取任务状态
    obtainState (number) {
      let arr = ''
      this.state.forEach((val) => {
        if (val.value === number) {
          arr = val.name
        }
      })
      if (arr === '') {
        return number
      }
      return arr
    }
  },
  components: {
    DialogImg
  },
  created () {
    console.log(this.examine)
    function fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
    this.axios.post(maintainRepairfindReworksByTaskid(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.length !== 0) {
          response.data.data.forEach((val) => {
            val.flag = false
          })
          this.reworkData = response.data.data
        } else {
          this.ficationBoolean = true
        }
      }
    })
    this.axios.post(maintainRepairgetApprovalInfos(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        this.getApprovalInfos = response.data.data
        if (this.getApprovalInfos !== undefined) {
          this.AuditorsPersonnel = this.getApprovalInfos.approvername
          this.AuditorsTimer = this.getApprovalInfos.approvaltime === undefined ? '' : fmtDate(this.getApprovalInfos.approvaltime)
          this.Auditorsstate = this.getApprovalInfos.approvalstate
          this.Auditorsopinion = this.getApprovalInfos.approvalopinion
        }
      }
    })
    this.axios.post(getCheckTaskByRepairTaskId(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        console.log(response)
        if (!response.data.data) return
        this.inspectUp = response.data.data
      }
    })
    this.axios.post(maintainRepairfindReworksByTaskid(this.examine.repairtaskid)).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.length !== 0) {
          response.data.data.forEach((val) => {
            val.flag = false
          })
          response.data.data[0].flag = true
          this.reworkData = response.data.data
        } else {
          this.ficationBoolean = true
        }
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
    margin-top 50px
    background #111a28
    padding 30px 0
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
          float left
        .tabulationRight
          overflow hidden
          float right
        .tleftTop
          width 543px
          background #0b111a
          overflow hidden
          margin-bottom 14px
          border 1px solid $color-border-list
        .tleftBottom
          width 543px
          background #0b111a
          overflow hidden
          margin-bottom 14px
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
          float left
          width 50%
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .tlefttopHeaderSpan
          margin 0 12px
          color $color-border-b-fault
        .tlefttopUl
          init()
        .tlefttopli
          overflow hidden
          position relative
          border-bottom 1px solid $color-border-list
          padding 28px 0
        .tlefttopUl .tlefttopli:last-child
          border none
        .tlefttopLeft
          float left
          text-align center
          font-size $font-size-small
          width 80px
          vertical-align middle
        .tlefttopRight
          init()
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
          background $color-border-list
      .assortment
        overflow hidden
        position relative
        margin-top 20px
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
  .tlefttoprightLiSpans
    color #fff
  .ficationEnsconceLitwoSpanThreeImg
    display inline-block
    margin-right 20px
    width 40px
    height 40px
    cursor pointer
  .tlefttopHeaderImg
    min-height 40px
    overflow hidden
    position relative
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
    margin 0 15px 0
    line-height 40px
    color #999
  .ficationEnsconceLitwoSpantwo
    float left
    color #fff
    width 460px
    padding 10px 0
    word-break break-all
    word-wrap break-word
  .ficationEnsconceLitwoSpanThree
    float left
    color #fff
    width 1030px
    margin-top 12px
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
  .ficationEnsconceLitwoSpanThreeImg
    display inline-block
    margin-right 20px
    width 40px
    height 40px
  .ficationLiDivPthree
    float right
    margin-right 20px
    color #cf763a
  .classificationLeft
    overflow hidden
    position relative
  .classificationRight
    float right
    overflow hidden
    position relative
    width 49%
  .classificationDiv
    margin-left 40px
    overflow hidden
    position relative
  .verificationLithreeDivPP
    width 50%
    overflow hidden
    float left
  .verificationLithreeDivPPtwo
    width 50%
    float right
  .verificationLithreeDiv_Spantwo
    margin-right 12px
  .verificationdiv
    width 107px
    border-radius 5px
    height 36px
    text-align center
    line-height 36px
    background #3292a6
    -webkit-transition 0.2s
    transition 0.2s
    cursor pointer
    color #fff
    margin-right 30px
    display inline-block
  .verificationdiv:hover
    background #44a7bb
  .classificationDDiv
    position fixed
    top 200px
    left 50%
    margin-left -450px
    background #111a28
    text-align center
    padding 20px 40px 40px
    border 1px solid #444d5b
    width 820px
  .classificationDDivH4
    font-size 20px
    margin-bottom 40px
    text-align left
    color #eee
  .classificationDDivUl
    margin-bottom 20px
    init()
  .classificationDDivUlLi
    width 50%
    overflow hidden
    position relative
    margin-bottom 20px
    float left
  .classificationDDivUlLiSpan
    line-height 48px
    margin-right 10px
    color #999
  .classificationDDivUlLiexamine
    color #fff
    examine()
    margin-right 30px
  .closeDialog
    color #fff
    closedown()
  .ficationClass
    width 210px
    display inline-block
  .tlefttopli_SpanThree
    width 460px
    overflow hidden
    color #fff
    display inline-block
    margin 12px 0
</style>

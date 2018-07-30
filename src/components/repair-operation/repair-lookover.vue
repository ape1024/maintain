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
                  <span>{{examine.createtime}}</span>
                </p>
                <p class="tlefttopHeaderP">
                  <span class="tlefttopHeaderSpan">检查人员：</span>
                  <span>{{examine.creatername}}</span>
                </p>
              </div>
              <ul class="tlefttopUl">
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">检查项目：</span>
                    <span>111</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">检查记录：</span>
                    <span>111</span>
                  </p>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">现场照片：</span>
                    <span>
                      <img class="ficationEnsconceLitwoSpanThreeImg" :key="index" v-for="(data, index) in examine.beforephotos" :src="data" alt="">
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
                  <span class="tlefttoprightLiSpans">{{examine.creater}}</span>
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
                  <span class="tlefttopHeaderSpan">问题原因：</span>
                  <span>{{examine.reason}}</span>
                </li>
                <li class="tlefttopli">
                  <span class="tlefttopHeaderSpan">处理情况：</span>
                  <span>{{examine.treatment}}</span>
                </li>
                <li class="tlefttopli">
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">处理结果：</span>
                    <span>{{examine.repairstate}}</span>
                  </p>
                  <p class="tlefttopHeaderP">
                    <span class="tlefttopHeaderSpan">现场照片：</span>
                    <span>
                      <img :key="index" v-for="(data, index) in examine.afterphotos" :src="data" alt="">
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
        <div class="assortment">
          <div class="fastener">
            <!--<div @click="conserve" class="conserve">确认</div>-->
            <div @click="conserve" class="closedown">关闭</div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { maintainRepairfindReworksByTaskid, maintainRepairgetApprovalInfos } from '../../api/user'
export default {
  name: 'repair-lookover',
  props: ['examine'],
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
      Auditorsopinion: ''
    }
  },
  methods: {
    conserve () {
      this.$emit('look', this.thisPage)
    },
    closedown () {
      this.$emit('look', this.thisPage)
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
  },
  created () {
    function fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
    console.log(maintainRepairfindReworksByTaskid(this.examine.repairtaskid))
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
          width 50%
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
        margin-left 40px
        margin-top 40px
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
</style>

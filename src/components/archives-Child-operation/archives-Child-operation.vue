<template>
  <div class="newmodification">
    <div class="newmodification">
      <div class="newmodificationTable">
        <!--第一层-->
        <div class="cephalosome">
          <ul class="cephalosomeUl">
            <li class="cephalosomeOne">
              设备名称
            </li>
            <li class="cephalosomeOne">
              设备编码
            </li>
            <li class="cephalosomeOne">
              位置
            </li>
            <div class="heavyPlayLiDiv">
              <ul class="heavyPlayLiUl">
                <li class="cephalosomeTwo">工作事项</li>
                <li class="cephalosomeThree">工作人员</li>
                <li class="cephalosomeThree">工作时间</li>
                <li class="cephalosomeThree">工作结论</li>
                <li class="cephalosomeThree">审核状态</li>
              </ul>
            </div>
          </ul>
        </div>
        <!--list-->
        <div class="list">
          <ul class="listUl">
            <li :key="index" v-for="(item, index) in dailychild" class="listLi">
              <ul class="heavyPlay">
                <li :title="item.deviceName" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.deviceName}}
                </li>
                <li :title="item.devicecode" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.devicecode}}
                </li>
                <li :title="item.position" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.position}}
                </li>
                <div class="heavyPlayLiDiv">
                  <ul :key="$index" v-for="(data, $index) in item.details" class="heavyPlayLiUl">
                    <li :title="data.workitem" class="heavyPlayLi cephalosomeTwo" >
                      {{data.workitem}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree">
                      {{data.checkperson}} {{data.others ? ', ' + data.others : data.others }}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree">
                      {{!data.checktime ? '' : fmtDate(data.checktime)}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree" :class="data.conclusion !== 1 ? 'conkoutClass' : 'regularClass'">
                      {{data.conclusionname}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree">
                      {{data.approvalstatename}}
                    </li>
                  </ul>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'archives-Child-operation',
  props: ['dailychild'],
  data () {
    return {
      information: [],
      checked: false,
      parentData: '',
      correspondingData: '',
      examineBoolean: false,
      distributionBoolean: false,
      DistributionData: '',
      equipmentID: ''
    }
  },
  methods: {
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .newmodification
    width 100%
    position relative
    overflow hidden
    background rgba(000,000,000,.2)
    .newmodificationTable
      overflow hidden
      position relative
      box-sizing border-box
      border 1px solid #3f4856
      margin 12px 10px
  .cephalosome
    overflow hidden
    position relative
    width 100%
  .cephalosomeUl
    overflow hidden
    text-align left
    font-size 16px
    color #999999
    width 100%
    border-bottom 1px solid #3f4856
  .cephalosomeUl li
    float left
    height 40px
    line-height 40px
    box-sizing border-box
    border-right 1px solid #3f4856
  .cephalosomeOne
    width 10%
    padding-right .5%
    text-indent .4em!important
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeTwo
    width 40%
    text-indent .4em
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeThree
    width 15%
    text-align center
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeFour
    width 8%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeFive
    width 20%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-indent 1em
  .cephalosomeFive span
    margin-right 20px
  .cephalosomeFive span:last-child
    margin-right 0
  .list
    position relative
    width 100%
    overflow hidden
    .listUl
      overflow hidden
      position relative
      width 100%
    .listLi
      overflow hidden
      position relative
      width 100%
      border-bottom 1px solid #3f4856
  .heavyPlay
    width 100%
    line-height 40px
    overflow hidden
    color #cdcdcd
  .heavyPlay .heavyPlayLi
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    min-height 40px
    float left
    border-right 1px solid #3f4856
    box-sizing border-box
  .listUl li:last-child
    border-bottom none
  .heavyPlayDivUl
    width 100%
    position relative
    overflow hidden
    .heavyPlayDivLi
      width 100%
      height 40px
      box-sizing border-box
      border-bottom 1px solid #3f4856
      line-height 40px
  .heavyPlayLiSpan
    color #3abfcf
  .heavyPlayLiSpantwo
    color #3acf6b
  .heavyPlayLiSpanThree
    color #c7a038
  .heavyPlayLiDiv
    width 70%
    overflow hidden
    position relative
    float left
    .heavyPlayLiUl
      overflow hidden
      position relative
      box-sizing border-box
      border-bottom 1px solid #3f4856
      height 40px
      width 100%
  .heavyPlayLiDiv .heavyPlayLiUl:last-child
    border none
  .cephalosomeFiveSpan
    cursor pointer
    color #3279a6
  .cephalosomeFiveSpanTwo
    color #a63232
    cursor pointer
  .matters_problem
    color #cfb53a
  .martters_normal
    color #3acf76
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-barckground-transparent
    z-index 11
    overflow hidden
  .regularClass
    color #3acf76!important
  .conkoutClass
    color #cfb53a!important
  .UnarrangedClass
    color #ffaa00!important
  .cephalosomelv
    text-indent 0!important
    text-align center
</style>

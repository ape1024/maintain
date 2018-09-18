<template>
  <div class="newmodification">
    <div class="newmodification">
      <div class="newmodificationTable">
        <!--第一层-->
        <div class="cephalosome">
          <ul class="cephalosomeUl">
            <li class="cephalosomeOne">
              <span><el-checkbox v-model="checked" @change="checkedChang"></el-checkbox></span>
              设备名称
            </li>
            <li class="cephalosomeOne">
              设备编码
            </li>
            <li class="cephalosomeOne">
              进度
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
                <li class="cephalosomeThree">处理状态</li>
                <li class="cephalosomeFive">操作</li>
              </ul>
            </div>
          </ul>
        </div>
        <!--list-->
        <div class="list">
          <ul class="listUl">
            <li :key="index" v-for="(item, index) in dailychild" class="listLi">
              <ul class="heavyPlay">
                <li :style="{height: item.detail.length * 40 + 'px', lineHeight: item.detail.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  <el-checkbox v-model="item.choose"></el-checkbox>
                  {{item.deviceName}}
                </li>
                <li :style="{height: item.detail.length * 40 + 'px', lineHeight: item.detail.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.deviceCode}}
                </li>
                <li :style="{height: item.detail.length * 40 + 'px', lineHeight: item.detail.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  <span>{{item.sumcount }}</span> / <span class="heavyPlayLiSpanThree">{{item.errcount}}</span>  / <span class="heavyPlayLiSpantwo">{{item.waitapprovalcount }}</span> / <span class="heavyPlayLiSpan">{{item.finshedcount }}</span> / <span>{{item.assigncount}}</span>
                </li>
                <li :style="{height: item.detail.length * 40 + 'px', lineHeight: item.detail.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.position}}
                </li>
                <div class="heavyPlayLiDiv">
                  <ul>
                    <li class="heavyPlayLi cephalosomeTwo">

                    </li>
                    <li class="heavyPlayLi cephalosomeThree">

                    </li>
                    <li class="heavyPlayLi cephalosomeFour">

                    </li>
                    <li class="heavyPlayLi cephalosomeThree">

                    </li>
                    <li class="heavyPlayLi cephalosomeThree">

                    </li>
                    <li class="heavyPlayLi cephalosomeThree">

                    </li>
                    <li class="heavyPlayLi cephalosomeOne">

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
  name: 'dailyChild-Newmodification',
  props: [ 'dailychild' ],
  data () {
    return {
      information: [],
      checked: false
    }
  },
  methods: {
    checkedChang (ev) {
      console.log(ev)
      if (ev) {

      }
    }
  },
  created () {
    console.log('////////')
    console.log(this.dailychild)
    this.information = this.dailychild
    this.information.forEach((val) => {
      val.choose = false
      val.detail.forEach((data) => {
        data.flag = false
      })
    })
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
      border 1px solid rgba(255,255,255,.6)
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
    border-bottom 1px solid rgba(255,255,255,.6)
  .cephalosomeUl li
    float left
    height 40px
    line-height 40px
    box-sizing border-box
    text-indent 1em
    border-right 1px solid rgba(255,255,255,.8)
  .cephalosomeUl li:last-child
    border none
  .cephalosomeOne
    width 10%
    text-indent .4em!important
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeTwo
    width 30%
    text-align 2em!important
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeThree
    width 10%
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
       border-bottom 1px solid rgba(255,255,255,.6)
  .heavyPlay
    width 100%
    line-height 40px
    overflow hidden
    color #cdcdcd
  .heavyPlay .heavyPlayLi
    min-height 40px
    text-indent 1em
    float left
    border-right 1px solid rgba(255,255,255,.8)
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
      border-bottom 1px solid rgba(255,255,255,.8)
      line-height 40px
  .heavyPlayLiSpan
    color #3abfcf
  .heavyPlayLiSpantwo
    color #3acf6b
  .heavyPlayLiSpanThree
     color #c7a038
  .heavyPlayLiDiv
    width 60%
    overflow hidden
    position relative
    float left
    .heavyPlayLiUl
      overflow hidden
      position relative
      width 100%
</style>

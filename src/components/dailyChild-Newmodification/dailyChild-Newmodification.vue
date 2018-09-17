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
              进度
            </li>
            <li class="cephalosomeOne">
              位置
            </li>
            <li class="cephalosomeTwo">工作事项</li>
            <li class="cephalosomeThree">工作人员</li>
            <li class="cephalosomeFour">工作时间</li>
            <li class="cephalosomeThree">工作结论</li>
            <li class="cephalosomeThree">审核状态</li>
            <li class="cephalosomeThree">处理状态</li>
            <li class="cephalosomeOne">操作</li>
          </ul>
        </div>
        <!--list-->
        <div class="list">
          <ul class="listUl">
            <li :key="index" v-for="(item, index) in data" class="listLi">
              <ul class="heavyPlay">
                <li :style="{height: item.g.length * 40 + 'px', lineHeight: item.g.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.a}}
                </li>
                <li :style="{height: item.g.length * 40 + 'px', lineHeight: item.g.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.s}}
                </li>
                <li :style="{height: item.g.length * 40 + 'px', lineHeight: item.g.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.d}}
                </li>
                <li :style="{height: item.g.length * 40 + 'px', lineHeight: item.g.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.f}}
                </li>
                <li class="heavyPlayLi cephalosomeTwo">
                  <ul class="heavyPlayDivUl">
                    <li :key="indexG" v-for="(data, indexG) in item.g" class="heavyPlayDivLi">
                      {{data}}
                    </li>
                  </ul>
                </li>
                <li class="heavyPlayLi cephalosomeThree">
                  <ul class="heavyPlayDivUl">
                    <li :key="indexG" v-for="(data, indexG) in item.h" class="heavyPlayDivLi">
                      {{data}}
                    </li>
                  </ul>
                </li>
                <li class="heavyPlayLi cephalosomeFour">
                  <ul class="heavyPlayDivUl">
                    <li :key="indexG" v-for="(data, indexG) in item.j" class="heavyPlayDivLi">
                      {{data}}
                    </li>
                  </ul>
                </li>
                <li class="heavyPlayLi cephalosomeThree">
                  <ul class="heavyPlayDivUl">
                    <li :key="indexG" v-for="(data, indexG) in item.k" class="heavyPlayDivLi">
                      {{data}}
                    </li>
                  </ul>
                </li>
                <li class="heavyPlayLi cephalosomeThree">
                  <ul class="heavyPlayDivUl">
                    <li :key="indexG" v-for="(data, indexG) in item.l" class="heavyPlayDivLi">
                      {{data}}
                    </li>
                  </ul>
                </li>
                <li class="heavyPlayLi cephalosomeThree">
                  <ul class="heavyPlayDivUl">
                    <li :key="indexG" v-for="(data, indexG) in item.q" class="heavyPlayDivLi">
                      {{data}}
                    </li>
                  </ul>
                </li>
                <li class="heavyPlayLi cephalosomeOne">操作</li>
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
  data () {
    return {
      data: [
        {
          a: 1,
          s: 2,
          d: 3,
          f: 4,
          g: [1, 2, 3, 4],
          h: [1, 2, 3, 4],
          j: [1, 2, 3, 4],
          k: [1, 2, 3, 4],
          l: [1, 2, 3, 4],
          q: [1, 2, 3, 4]
        },
        {
          a: 11,
          s: 22,
          d: 33,
          f: 44,
          g: [11, 22, 33, 44],
          h: [11, 22, 33, 44],
          j: [11, 22, 33, 44],
          k: [11, 22, 33, 44],
          l: [11, 22, 33, 44],
          q: [11, 22, 33, 44]
        }
      ]
    }
  },
  methods: {

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
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeTwo
    width 18%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeThree
    width 6%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeFour
    width 8%
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
</style>

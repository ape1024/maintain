<template>
    <div>
      <ul class="threelevel_header">
        <li class="threelevel_lithree">
          巡查项
        </li>
        <li class="threelevel_li">
          巡查人
        </li>
        <li class="threelevel_li">
          状态
        </li>
        <li class="threelevel_litwo">
          检测时间
        </li>
        <li class="threelevel_li">
          工作方式
        </li>
        <li class="threelevel_li">
          审核状态
        </li>
        <li class="threelevel_li">
          分配状态
        </li>
        <li class="threelevel_litwo">
          操作
        </li>
      </ul>
      <ul class="threelevel_list">
        <li :key="dataset.id" :id="dataset.id"  v-for="(dataset, $index) in content" class="threelevel_list_li">
          <ul :id="dataset.id" class="threelevel_list_ul">
            <li class="threelevel_lithree">
              {{dataset.inspectionitem}}
            </li>
            <li class="threelevel_li">
              {{dataset.inspectingperson}}
            </li>
            <li class="threelevel_li">
              {{dataset.state}}
            </li>
            <li class="threelevel_litwo">
              {{dataset.timer}}
            </li>
            <li class="threelevel_li">
              {{dataset.mode}}
            </li>
            <li class="threelevel_li">
              <p class="header_p_seven" v-if="dataset.examine == '1'">已归档</p>
              <p class="header_p_two" v-if="dataset.examine == '2'">待审核</p>
              <p class="header_p_six" v-if="dataset.examine == '3'">已审核</p>
            </li>
            <li class="threelevel_li">
              <p class="header_p_seven"  v-if="dataset.distribution == '1'">-</p>
              <p class="header_p_eight"  v-if="dataset.distribution == '2'">已分配</p>
            </li>
            <li class="threelevel_litwo">
              <p class="header_p_nine" v-if="dataset.operation == '0'">
                审核
              </p>
              <p class="header_p_eight threelevel_litwo_p" v-if="dataset.operation == '1'">
                审核
              </p>
              <p>查看</p>
              <p v-on:click="amputate($event, $index, content)">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'maintain-dailythree',
  methods: {
    amputate ($event, $index, content) {
      $event.cancelBubble = true
      content.splice([$index], 1)
    }
  },
  data () {
    return {
    // 第三级组件
      defined: false,
      content: [{
        id: '1-1-1',
        inspectionitem: '01项',
        inspectingperson: '张三',
        state: '正常',
        timer: '2018-04-10 12:00',
        mode: '日常巡检',
        examine: '1',
        distribution: '1',
        operation: '0'
      }, {
        id: '1-1-2',
        inspectionitem: '02项',
        inspectingperson: '李四',
        state: '正常',
        timer: '2018-04-10 12:00',
        mode: '日常巡检',
        examine: '3',
        distribution: '2',
        operation: '1'
      }]
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    margin 12px
    overflow hidden
    position relative
    background #141e30
  .subject_top
    margin 38px 15px 20px 15px
    overflow hidden
    background #111a28
    padding 38px 0 58px
  .ul_input
    margin-left 30px
    overflow hidden
    float left
    position relative
  .li_input
    float left
    overflow hidden
    margin-right 20px
    .div_p
      float left
      font-size $color-text-title
      color $color-text-title
      margin-right 10px
      line-height: 40px;
    .div_input
      float left
      width 167px
  .button
    float right
    overflow hidden
    position relative
    margin-right 60px
    text-align center
    line-height 36px
    font-size $font-size-medium
    color $color-text-title
    .query
      width 106px
      height 36px
      border-radius 5px
      float left
      margin-right 30px
      background $color-background-query
      cursor pointer
      transition .2s
    .query:hover
      background #4b92bf
    .newly
      width 106px
      height 36px
      border-radius 5px
      float right
      background $color-background-newly
      cursor pointer
      transition .2s
    .newly:hover
      background #4baabe
  .table
    width 100%
    overflow hidden
    position relative
    color $color-text-title
    font-size $font-size-medium
    text-align left
    th,td
      padding 10px 0
    .table_header
      background yellowgreen

  .header_ul
    width 100%
    overflow hidden
    position relative
    color $color-header-b-normal
    font-size $font-size-medium
    padding 12px 0
    background #354d76
  .header_li
    float left
    width 7.2%
  .header_litwo
    float left
    width 10.3%
  .header_lithree
    float left
    width 6.4%
    padding-left 1%
  .header_li_four
    float left
    width 7.2%
    color $color-text-tile-project
  .header_li_five
    float left
    width 7.2%
    color  $color-text-tile-complete
  .header_li_six
    float left
    width 7.2%
    color  $color-text-tile-fault
  .header_p_one
    color $color-text-tile-state
  .header_p_two
    color $color-text-tile-state-two
  .header_p_three
    color $color-text-tile-complete
  .header_p_four
    color $color-text-tile-handle
  .header_p_six
    color $color-text-tile-complete
  .header_p_seven
    color $color-text
  .header_p_eight
    color $color-background-query
  .header_p_nine
    color #333333
  .table_ul
    width 100%
    overflow hidden
    position relative
    color $color-text
    font-size $font-size-medium
  .table_li
    width 100%
    overflow hidden
    position relative
    .inline_ul
      width: 100%;
      overflow: hidden;
      position: relative;
      padding: 4px 0;
      line-height: 32px;
  .table_ul .table_li:nth-child(odd)
    background #1c273a
  .table_ul .table_li:nth-child(even)
    background #141D2C
  .modify
    width 106px
    height 32px
    background $color-background-newly
    text-align center
    line-height 32px
    font-size $font-size-medium
    color $color-text-title
    cursor pointer
    transition .2s
  .modify:hover
    background #4baabe
  .examine
    width 106px
    height 32px
    background $color-background-query
    text-align center
    line-height 32px
    font-size $font-size-medium
    color $color-text-title
    cursor pointer
    transition .2s
  .examine:hover
    background #4b92bf
  .inline_div
    width 100%
    overflow hidden
    position relative
    background #0b111a
    .inline_fill
      margin 6px 10px
      overflow hidden
      position relative
      .list_heder
        margin 4px
        overflow hidden
        position relative
        background #354d76
        padding 12px 0
        .list_heder_li
          float left
          width 16%
          overflow hidden
        .list_heder_litwo
          float left
          width 14%
          overflow hidden
          padding-left 2%
      .inline_list
        width 100%
        overflow hidden
        position relative
      .inline_list_li
        width 100%
        overflow hidden
        position relative
        font-size $font-size-medium
        color $color-text-title
      .list_data
        width 100%
        padding 12px 0
        overflow hidden
        .list_data_li
          float left
          overflow hidden
          width 16%
        .list_data_litwo
          float: left;
          width: 14%;
          overflow: hidden;
          padding-left: 2%;
        .list_data_li_p
          float left
          color #3279A6
          margin-right 37px
          cursor pointer
          text-decoration underline
        .list_data_li_ptwo
          float left
          color $color-text-tile-project
          cursor pointer
          text-decoration underline
  .threelevel
    margin 0 10px
    overflow hidden
    position relative
    color $color-text-title
    font-size $font-size-medium
    .threelevel_header
      margin: 4px;
      overflow: hidden;
      position: relative;
      padding: 12px 0;
      background: #354d76;
      .threelevel_li
        float left
        width 11%
      .threelevel_litwo
        float left
        width 17%
        overflow hidden
      .threelevel_lithree
        float left
        width 9%
        padding-left 2%
    .threelevel_list
      margin: 4px;
      overflow: hidden;
      position: relative;
      .threelevel_list_li
        width 100%
        overflow hidden
        position relative
        .threelevel_list_ul
          width 100%
          overflow hidden
          padding: 12px 0;
          .threelevel_li
            float left
            width 11%
          .threelevel_litwo
            float left
            width 17%
            overflow hidden
          .threelevel_lithree
            float left
            width 9%
            padding-left 2%
  .threelevel_litwo p
    float left
    margin-right 35px
    text-decoration underline
    cursor pointer
</style>

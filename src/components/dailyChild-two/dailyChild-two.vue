<template>
  <div class="inline_fill">
    <ul class="list_heder">
      <li class="list_heder_litwo">
        设备名称
      </li>
      <li class="list_heder_li">
        待巡检
      </li>
      <li class="list_heder_li">
        已巡检
      </li>
      <li class="list_heder_li">
        问题数量
      </li>
      <li class="list_heder_li">
        已分配任务项
      </li>
      <li class="list_heder_li">
        操作
      </li>
    </ul>
    <ul class="inline_list">
      <li :key="index" v-for="(item,index) in dailyData" class="inline_list_li" @click.stop="">
        <ul :id="item.id" :class="[item.error + item.problem > 0?'list_dataUl':'list_data']">
          <li class="list_data_litwo">
            {{item.deviceName}}
          </li>
          <li class="list_data_li">
            {{item.sum - item.finish}}
          </li>
          <li class="list_data_li">
            {{item.finish}}
          </li>
          <li class="list_data_li">
            {{item.error + item.problem}}
          </li>
          <li class="list_data_li">
            {{item.assign}}
          </li>
          <li class="list_data_li">
            <p @click.stop="examine(item.deviceID)" class="list_data_li_p">审核</p>
            <p @click.stop="distriBoolean" class="list_data_li_ptwo">快速分配</p>
          </li>
        </ul>
        <!--第三级，目前不需要了-->
        <!--<transition enter-active-class="fadeInUp"-->
          <!--leave-active-class="fadeOutDown">-->
        <!--<div v-show="item.active" class="threelevel">-->
          <!--<dailythree></dailythree>-->
        <!--</div>-->
        <!--</transition>-->
      </li>
      <section v-if="examineBoolean" @click.stop class="review">
        <!--审核-->
        <childExamine :examine="examineBoolean" :childDate="examineDate" :examineName="taskName" @mine="Mine" @examineMine="examineDistribution"></childExamine>
      </section>
      <!--快速分配-->
      <section v-if="distributionBoolean" @click.stop class="distribution">
        <childDistribution :distriBoolean="distributionBoolean" @dist="Dist"></childDistribution>
      </section>
    </ul>
  </div>
</template>

<script>
import dailythree from '../dailyChild-three/dailyChild-three'
import childExamine from '../dailyChild-operation/dailyChild-examine'
import childDistribution from '../dailyChild-operation/dailyChild-distribution'
export default {
  name: 'dailyChild-two',
  props: ['dailyData', 'taskid', 'taskName'],
  components: {
    dailythree,
    childExamine,
    childDistribution
  },
  data () {
    return {
      // 审核 显示/隐藏
      examineBoolean: false,
      // 快速分配
      distributionBoolean: false,
      content: [{
        active: false,
        index: 0,
        id: '1-1',
        name: '防火门',
        inspecting: '1',
        haveinspecting: '2',
        problems: '2',
        distribution: '1'
      }, {
        active: false,
        index: 1,
        id: '1-2',
        name: '防火门',
        inspecting: '2',
        haveinspecting: '3',
        problems: '4',
        distribution: '2'
      }],
      examineDate: ''
    }
  },
  methods: {
    // selectStyle (item, index, content, $event) {
    //   $event.cancelBubble = true
    //   this.content.forEach(function (item) {
    //     if (index !== item.index) {
    //       item.active = false
    //     }
    //   })
    //   item.active = !item.active
    // },
    // 开启审核
    examine (deviceID) {
      console.log(this.taskid)
      console.log(deviceID)
      this.axios.post(`http://172.16.6.181:8920/task/getDetailsByDeviceId?taskId=${this.taskid}&deviceId=${deviceID}`).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.examineDate = response.data.data
          console.log(response.data.data)
          this.examineBoolean = true
        }
      })
    },
    examineDistribution (ev) {
      console.log(ev)
      this.examineBoolean = ev
      this.distributionBoolean = true
    },
    // 快速分配
    distriBoolean () {

    },
    // 审核
    Mine (ev) {
      this.examineBoolean = ev
    },
    // 快速分配
    Dist (ev) {
      this.distributionBoolean = ev
    }
  },
  created () {
    console.log('3333333333333333333333333')
    console.log(this.dailyData)
    console.log(this.taskName)
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
        margin 4px 0
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
      .list_dataUl
        width 100%
        padding 12px 0
        overflow hidden
        background #4a1c06
      .list_data
        width 100%
        padding 12px 0
        overflow hidden
      .list_data_li
        float left
        overflow hidden
        width 16%
      .list_data_litwo
        float left
        width 14%
        overflow hidden
        padding-left 2%
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
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(000,000,000,.4)
    z-index 11
    overflow hidden
  .distribution
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background transparent
    z-index 11
    overflow hidden
</style>

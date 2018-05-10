<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域：</p>
          <div class="div_input">
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">设备类型</p>
          <div class="div_input">
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">执行班组：</p>
          <div class="div_input">
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">巡查状态：</p>
          <div class="div_input">
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">审核状态：</p>
          <div class="div_input">
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div class="query">
          查 询
        </div>
        <!--新增-->
        <div class="newly">
         新 增
        </div>
      </div>
    </section>
    <section class="subject_bottom">
      <ul class="header_ul">
        <li class="header_lithree">
         日期
        </li>
        <li class="header_li">
         任务名称
        </li>
        <li class="header_li">
          执行班组
        </li>
        <li class="header_li">
          执行内容
        </li>
        <li class="header_litwo">
          开始时间
        </li>
        <li class="header_litwo">
          结束时间
        </li>
        <li class="header_li">
          巡查项
        </li>
        <li class="header_li">
          已完成项
        </li>
        <li class="header_li">
          故障问题
        </li>
        <li class="header_li">
          巡查状态
        </li>
        <li class="header_li">
          处理状态
        </li>
        <li class="header_li">
          已分配任务项
        </li>
        <li class="header_li">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li v-for="(item,$index) in tableData" class="table_li" :key="item.id" :id="item.id" @click="selectStyle (item, $index, tableData, $event)">
          <ul :id="item.id" class="inline_ul">
            <li class="header_lithree">{{item.date}}</li>
            <li class="header_li">{{item.name}}</li>
            <li class="header_li">{{item.implement}}</li>
            <li class="header_li">{{item.content}}</li>
            <li class="header_litwo">{{item.starttime}}</li>
            <li class="header_litwo">{{item.endtime}}</li>
            <li class="header_li_four">{{item.project}}</li>
            <li class="header_li_five">{{item.complete}}</li>
            <li class="header_li_six">{{item.fault}}</li>
            <li class="header_li">
              <p class="header_p_one" v-if="item.state =='1'">未开始</p>
              <p class="header_p_two" v-if="item.state =='2'">已开始</p>
              <p class="header_p_three" v-if="item.state =='3'">已完成</p>
            </li>
            <li class="header_li">
              <p class="header_p_four" v-if="item.handle == '1'">
                未处理
              </p>
              <p class="header_p_six" v-if="item.handle == '2'">
                已处理
              </p>
            </li>
            <li class="header_li">{{item.distribution}}</li>
            <li class="header_li">
              <div v-on:click="amend($event)" class="modify" v-if="item.operation =='true'">修 改</div>
              <div class="examine" v-if="item.operation =='false'">审 核</div>
            </li>
          </ul>
          <transition enter-active-class="fadeInUp"
            leave-active-class="fadeOutDown">
          <div v-show="item.active" class="inline_div">
              <dailytwo></dailytwo>
          </div>
          </transition>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import dailytwo from '../dailyChild-two/dailyChild-two'
export default {
  name: 'maintain-daily',
  components: {
    dailytwo
  },
  methods: {
    selectStyle (item, index, tableData, $event) {
      console.log(item.id)
      $event.cancelBubble = true
      this.tableData.forEach(function (item) {
        if (index !== item.index) {
          item.active = false
        }
      })
      item.active = !item.active
    },
    // 修改逻辑
    amend ($event) {
      $event.cancelBubble = true
    }
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      // 获取点击的id
      click_id: '',
      tableData: [{
        active: false,
        index: 0,
        id: '1',
        date: '2016-05-03',
        name: '王小虎',
        implement: '一班',
        content: '普陀区',
        starttime: '2018-07-07',
        endtime: '2018-07-07',
        project: '90',
        complete: '90',
        fault: '10',
        state: '1',
        handle: '1',
        distribution: '123',
        operation: 'true'
      },
      {
        active: false,
        index: 1,
        id: '2',
        date: '2016-05-03',
        name: '王小虎',
        implement: '一班',
        content: '普陀区',
        starttime: '2018-07-07',
        endtime: '2018-07-07',
        project: '90',
        complete: '90',
        fault: '10',
        state: '2',
        handle: '2',
        distribution: '456',
        operation: 'false'
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
        display flex
      .ul_input
         margin-left 30px
         overflow hidden
         float left
         position relative
         display flex
        .li_input
          float left
          overflow hidden
          margin-right 20px
          display flex
          .div_p
           float left
           font-size $color-text-title
           color $color-text-title
           margin-right 10px
           line-height: 30px;
          .div_input
           float left
           width 167px
           display flex
      .button
         display flex
         float right
         overflow hidden
         position relative
         margin-left 90px
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

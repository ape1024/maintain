<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域</p>
          <div class="div_input"><el-input v-model="input1" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">设备类型</p>
          <div class="div_input"><el-input v-model="input2" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">执行班组</p>
          <div class="div_input"><el-input v-model="input3" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">巡查状态</p>
          <div class="div_input"><el-input v-model="input4" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">审核状态</p>
          <div class="div_input"><el-input v-model="input5" placeholder=""></el-input></div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div class="query">
          查 询
        </div>
        <!--导入-->
        <div class="introduce">
          导 入
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
          区域
        </li>
        <li class="header_li">
          设备数量
        </li>
        <li class="header_li">
          待审核设备数量
        </li>
        <li class="header_li">
          正常运行数量
        </li>
        <li class="header_li">
          审核
        </li>
      </ul>
      <ul class="table_ul">
        <li v-for="(item,$index) in tableData" class="table_li" :key="item.id" :id="item.id" @click="selectStyle (item, $index, tableData)">
          <ul :id="item.id" class="inline_ul">
            <li class="header_lithree">{{item.date}}</li>
            <li class="header_li">{{item.quantum}}</li>
            <li class="header_li">{{item.await}}</li>
            <li class="header_li">{{item.normal}}</li>
            <li class="header_li">
              <div v-show="item.auditin" @click.stop="auditing(item, $index, tableData)" class="examine">审 核</div>
              <div class="admin_show" v-show="item.admin_show">
                <div class="admin_selve">
                    <el-select v-model="item.value" placeholder="">
                      <el-option
                        v-for="data in item.child"
                        :key="data.value"
                        :label="data.label"
                        :value="data.label">
                      </el-option>
                    </el-select>
                </div>
                <div @click.stop="preservation(item)" class="admin_preservation">
                  保存
                </div>
                <div @click.stop="cancel(item)" class="cancel">
                  取消
                </div>
              </div>
            </li>
          </ul>
          <transition enter-active-class="fadeInUp"
            leave-active-class="fadeOutDown">
            <div v-show="item.active" class="inline_div">
              <adminchild></adminchild>
            </div>
          </transition>
        </li>
      </ul>

    </section>
  </div>
</template>

<script>
import adminchild from '../admin-child/admin-child'
export default {
  name: 'maintain-admin',
  components: {
    adminchild
  },
  methods: {
    selectStyle (item, index, tableData) {
      console.log(item.id)
      this.tableData.forEach(function (item) {
        if (index !== item.index) {
          item.active = false
        }
      })
      item.active = !item.active
    },
    auditing (item, $index) {
      item.auditin = false
      item.admin_show = true
      console.log(item)
      console.log($index)
    },
    preservation (item) {
      //  保存
      console.log(item.value)
      item.admin_show = !item.admin_show
      item.auditin = !item.auditin
    },
    cancel (item) {
      // 取消
      item.admin_show = !item.admin_show
      item.auditin = !item.auditin
    }
  },
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      // 获取点击的id
      click_id: '',
      tableData: [{
        active: false,
        // 审核按钮 显示 隐藏
        auditin: true,
        // 一级列表 审核  显示 隐藏
        admin_show: false,
        index: 0,
        id: '1',
        date: '1号车间',
        quantum: '100',
        await: '30',
        normal: '1000',
        child: [{
          value: '选项1',
          label: '111'
        }, {
          value: '选项2',
          label: '222'
        }, {
          value: '选项3',
          label: '333'
        }, {
          value: '选项4',
          label: '444'
        }, {
          value: '选项5',
          label: '555'
        }],
        value: ''
      }, {
        active: false,
        // 审核按钮 显示 隐藏
        auditin: true,
        // 一级列表 审核  显示 隐藏
        admin_show: false,
        index: 1,
        id: '2',
        date: '2号车间',
        quantum: '10',
        await: '303',
        normal: '1',
        child: [
          {
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
          }
        ],
        value: ''
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
      margin-top 5px
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
      &:hover
        background #4b92bf
    .newly
      width 106px
      height 36px
      border-radius 5px
      float right
      background $color-background-newly
      cursor pointer
      transition .2s
      &:hover
        background #4baabe
    .introduce
      width 106px
      height 36px
      border-radius 5px
      float left
      margin-right 30px
      background $color-background-introduce
      cursor pointer
      transition .2s
      &:hover
        background #4275ba
  .table
    width 100%
    overflow hidden
    position relative
    color $color-text-title
    font-size $font-size-medium
    text-align left
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
    width 22.5%
    .admin_show
      overflow hidden
      font-size $font-size-small
      color $color-text-title
      .admin_selve
        width 106px
        float left
        margin-right 35px
        .admin_select
          width: 100px
          overflow: hidden
          padding: 5px 0
          border-radius: 5px
          padding-left 6px
      .admin_preservation
        float: left
        margin 4px 18px 0 0
        width 72px
        height 24px
        text-align center
        line-height 24px
        border-radius 5px
        cursor pointer
        background $color-background-newly
      .cancel
        float left
        width 72px
        margin-top 4px
        height 24px
        text-align center
        line-height 24px
        border-radius 5px
        cursor pointer
        background $color-background-introduce
  .header_lithree
    float left
    width 9%
    padding-left 1%
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
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
      height 30px
</style>

<template>
  <section class="increase">
    <h4 class="increase_h4">
      新增设备
    </h4>
    <div class="increase_top">
      <div class="top_header">
        <p class="header_p">
          集中录入各类设施的公共信息
        </p>
        <p class="thread"></p>
      </div>
      <ul class="top_ul">
        <li class="top_left">
          <div class="left_list">
            <p class="left_list_p">业主单位:</p>
            <div class="left_list_div">
              <el-input v-model="company" placeholder=""></el-input>
            </div>
          </div>
          <div class="left_list">
            <p class="left_list_p"><span class="left_list_span">*</span>设施类别:</p>
            <div class="left_list_div">
              <el-select v-model="facilities.value" placeholder="请选择">
                <el-option
                  v-for="item in facilities.child"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left_list">
            <p class="left_list_p"><span class="left_list_span">*</span>生产厂家:</p>
            <div class="left_list_divtwo">
              <el-select v-model="production.value" placeholder="请选择">
                <el-option
                  v-for="item in production.child"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="left_list">
            <p class="left_list_p"><span class="left_list_span">*</span>规格型号:</p>
            <div class="left_list_divtwo">
              <el-select v-model="version.value" placeholder="请选择">
                <el-option
                  v-for="item in version.child"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="left_list">
            <p class="left_list_p">现场照片:</p>
          </div>
        </li>
        <li class="top_left">
          <div class="left_list">
            <p class="left_list_p">生产日期:</p>
            <div class="left_list_div">
              <el-date-picker
                v-model="manufacture"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>

          <div class="left_list">
            <p class="left_list_p">技术参数:</p>
            <div class="left_list_divthree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder=""
                v-model="textareaone">
              </el-input>
            </div>
          </div>

          <div class="left_list">
            <p class="left_list_p">备注说明:</p>
            <div class="left_list_divthree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder=""
                v-model="textareatwo">
              </el-input>
            </div>
          </div>
        </li>
        <li class="top_right">
          <div class="right_list">
            <p class="left_list_p">有效日期:</p>
            <div class="left_list_div">
              <el-date-picker
                v-model="effective"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="increase_bottom">
      <div class="top_header">
        <p class="header_p">
          逐一录入每隔设施的具体信息
        </p>
        <p class="thread"></p>
      </div>
      <ul class="bottom_ul">
        <li class="bottom_left">
          <div class="left_list">
            <p class="left_list_p"><span class="left_list_span">*</span>设施位置:</p>
            <div class="left_list_select">
              <el-select v-model="location.value" placeholder="请选择">
                <el-option
                  v-for="item in location.child"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="specific">
              <el-input v-model="specific" placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="left_list">
            <p class="left_list_p">地址编码:</p>
            <div class="encrypt">
              <el-input v-model="encoded" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </li>
        <li class="bottom_left">
          <div class="left_list">
            <p class="left_list_p">设施数量:</p>
            <div class="left_list_div">
              <el-input v-model="quantum" placeholder=""></el-input>
            </div>
          </div>
        </li>
        <li class="bottom_left">
          <div class="left_list">
            <p class="left_list_p">
              <el-checkbox v-model="checked"></el-checkbox>
              批量编码:
            </p>
            <div class="left_list_div">
              <el-input-number :disabled="!checked" v-model="num" controls-position="right" @change="handleChange" :min="1" size="mini" :max="10"></el-input-number>
            </div>
          </div>
          <div class="left_list">
            <p class="left_list_p">报警回路:</p>
            <div class="left_list_div">
              <el-input v-model="syntony" placeholder=""></el-input>
            </div>
          </div>
        </li>
        <li class="bottom_right">
          <div class="addcontent">
            增 加
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'maintain-increase',
  data () {
    return {
      // 公司
      company: '',
      // 技术参数 输入框
      textareaone: '',
      // 备注说明 输入框
      textareatwo: '',
      // 生产日期
      manufacture: '',
      // 有效日期
      effective: '',
      // 具体地址
      specific: '',
      // 实施数量
      quantum: '',
      // 地址编码
      encoded: '',
      // 报警回路
      syntony: '',
      // 批量 复选框
      checked: false,
      num: 1,
      // 设施类别 facilities.value
      facilities: {
        value: '',
        child: [{
          value: '1',
          label: '灭火器'
        }, {
          value: '2',
          label: '消防栓'
        }, {
          value: '3',
          label: '消防斧'
        }]
      },
      production: {
        value: '',
        child: [{
          value: '1',
          label: '大众'
        }, {
          value: '2',
          label: '丰田'
        }, {
          value: '3',
          label: '本田'
        }]
      },
      version: {
        value: '',
        child: [{
          value: '1',
          label: 'NO.1'
        }, {
          value: '2',
          label: 'NO.2'
        }, {
          value: '3',
          label: 'NO.3'
        }]
      },
      location: {
        value: '',
        child: [{
          value: '1',
          label: '丰台区'
        }, {
          value: '2',
          label: '朝阳区'
        }, {
          value: '3',
          label: '海淀区'
        }]
      },
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
      value: ''
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .increase
    width 1245px
    margin 0 auto
    overflow hidden
    position relative
    padding-top 45px
    .increase_h4
     font-size $font-size-medium-x
     color $color-text-title
     margin-bottom 14px
   .increase_top
     width 100%
     overflow hidden
     position relative
   .increase_bottom
     width 100%
     overflow hidden
     position relative
    .top_header
       overflow hidden
       font-size $font-size-medium
       color $color-header-b-normal
       .header_p
         float left
         color #444D5B
         padding-left 40px
       .thread
         float right
         width 960px
         height 1px
         background #444d5b
         margin-top: 5px
     .top_ul
       overflow hidden
       position relative
       margin-left: 50px
       font-size $font-size-medium
       color $color-header-b-normal
       margin-top 28px
       .top_left
         float left
         margin-right 90px
         overflow hidden
         .left_list
           overflow hidden
           margin-bottom 14px
           .left_list_p
             width 100px
             text-align right
             letter-spacing 2px
             float left
             line-height 27px
             margin-right 10px
             .left_list_span
               color $color-border-b-alarm
           .left_list_div
             width 167px
             overflow hidden
             border-radius: 5px;
           .left_list_divtwo
             width: 218px;
             overflow hidden
           .left_list_divthree
             width 296px
             overflow hidden
       .top_right
         float right
         overflow hidden
         position relative
         .right_list
           overflow hidden
           position relative
           .left_list_p
             width 100px
             text-align right
             letter-spacing 2px
             float left
             line-height 27px
             margin-right 10px
           .left_list_div
             width 167px
             overflow hidden
             border-radius 5px
    .bottom_ul
      overflow hidden
      position relative
      margin-left 50px
      font-size 16px
      color #d5d5d5
      margin-top 28px
      .bottom_left
        margin-right: 30px;
        float left
        overflow hidden
        .left_list
          overflow hidden
          margin-bottom 14px
          .left_list_div
            width 137px
            overflow hidden
            float left
            margin-right 12px
           .left_list_select
              width 167px
              overflow hidden
              position relative
              float left
              margin-right: 13px;
          .left_list_p
            width 100px
            text-align right
            letter-spacing 2px
            float left
            line-height 27px
            margin-right 10px
            .left_list_span
              color $color-border-b-alarm
          .specific
            float left
            width 167px
            overflow hidden
        .encrypt
          float left
          width 348px
          overflow hidden
      .bottom_right
        float right
        overflow hidden
        position relative
        .addcontent
          width 106px
          height 36px
          text-align center
          line-height 36px
          background $color-background-newly
          font-size $font-size-medium
          color $color-text-title
          border-radius 5px
          cursor pointer
          transition .2s
          &:hover
            background: #4baabe;

</style>
<style>
  .el-input__icon{
    line-height: 20px;
  }
</style>

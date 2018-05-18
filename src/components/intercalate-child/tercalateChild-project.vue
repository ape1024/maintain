<template>
  <div class="subject">
    <div class="subjectDiv">
      <div class="subjectLeft">
      <p class="subjectP">项目名称：</p>
      <div class="subjectRight">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
     </div>
      <div class="subjectLeft">
        <p class="subjectP">项目名称：</p>
        <div class="subjectRight">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="conserve">
        增 加
      </div>
    </div>
    <div class="content">
      <ul class="headerUl">
        <li class="headerLione">项目名称</li>
        <li class="headerLitwo">项目编号</li>
        <li class="headerLitwo">项目地址</li>
        <li class="headerLitwo">项目状态</li>
        <li class="headerLitwo">业主单位</li>
        <li class="headerLitwo">服务机构</li>
        <li class="headerLitwo">项目开始时间</li>
        <li class="headerLitwo">项目结束时间</li>
        <li class="headerLitwo">创建人</li>
        <li class="headerLithree">操作</li>
      </ul>
      <ul class="contentUl">
        <li class="contentLi">
          <ul class="contentLi_ul">
            <li class="headerLione">1</li>
            <li class="headerLitwo">2</li>
            <li class="headerLitwo">3</li>
            <li class="headerLitwo">4</li>
            <li class="headerLitwo">5</li>
            <li class="headerLitwo">6</li>
            <li class="headerLitwo">7</li>
            <li class="headerLitwo">8</li>
            <li class="headerLitwo">9</li>
            <li class="headerLithree">
              <p class="contentLi_ulP">查看明细</p>
              <p class="contentLi_ulPtwo">修改</p>
              <p class="contentLi_ulPthree">删除</p>
            </li>
          </ul>
        </li>
        <li class="contentLi">
          <ul class="contentLi_ul">
            <li class="headerLione">1</li>
            <li class="headerLitwo">2</li>
            <li class="headerLitwo">3</li>
            <li class="headerLitwo">4</li>
            <li class="headerLitwo">5</li>
            <li class="headerLitwo">6</li>
            <li class="headerLitwo">7</li>
            <li class="headerLitwo">8</li>
            <li class="headerLitwo">9</li>
            <li class="headerLithree">
              <p class="contentLi_ulP">查看明细</p>
              <p class="contentLi_ulPtwo">修改</p>
              <p class="contentLi_ulPthree">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="subject_bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tercalateChild-project',
  data () {
    return {
      input: '',
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
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectDiv
      overflow hidden
      padding 28px 0
      background #111a28
      position relative
      .subjectLeft
        float left
        margin-left 20px
        margin-right 70px
        overflow hidden
        .subjectP
          color $color-text-title
          line-height 30px
          float left
          font-size $font-size-medium
      .conserve
        conserve()
        margin-top -3px
      .subjectRight
        float left
    .content
      init()
    .headerUl
      init()
      background #354d76
      padding 8px 0
      color $color-header-b-normal
    .headerLione
        float left
        padding-left 1%
        width 8%
    .headerLitwo
      float left
      width 9%
    .headerLithree
      float left
    .contentUl
      init()
    .contentUl .contentLi:nth-child(even)
        background #141d2c
    .contentUl .contentLi:nth-child(odd)
      background #1c273a
    .contentLi
      padding 10px 0
      init()
    .contentLi_ul
      inti()
      color $color-text-title
    .contentLi_ulP
       float left
       color $color-background-query
       margin-right 30px
       cursor pointer
       text-decoration underline
       font-size $font-size-medium
    .contentLi_ulPtwo
       float left
       font-size $font-size-medium
       margin-right 30px
       cursor pointer
       text-decoration underline
       color $color-background-newly
    .contentLi_ulPthree
       float left
       cursor pointer
       text-decoration underline
       font-size $font-size-medium
       color #a63232
    .subject_bottom
       init()
       margin 20px 0
       text-align center
</style>
<style>
  .el-input--suffix .el-input__inner {
    height:30px;
    line-height:30px;
  }
  .el-input__inner{
    height:30px!important;
    line-height:30px!important;
  }
</style>

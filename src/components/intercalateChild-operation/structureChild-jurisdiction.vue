<template>
    <div class="jurisdiction">
      <div class="jurisdictionDiv">
        <h4 class="jurisdictionH">
          权限
        </h4>
        <div class="jurisdictionBottom">
          <div class="header">
            <p class="headerP">角色名称：</p>
            <div class="headerDiv">
              <el-select size="mini" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="definition">
            <ul class="definitionUl">
              <li class="definitionLi">
                模块
              </li>
              <li class="definitionLitwo">
                权限
              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
            <ul class="content">
              <li class="contentLi">
                <el-checkbox v-model="checked">模块一</el-checkbox>
              </li>
              <li class="contentLitwo">

              </li>
            </ul>
          </div>
          <div class="fastener">
            <div @click="conserve" class="conserve">保存</div>
            <div class="closedown">保存</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'structureChild-jurisdiction',
  props: ['pBoolean'],
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
      pageBoolean: false,
      checked: false
    }
  },
  methods: {
    conserve () {
      this.pageBoolean = this.pBoolean
      this.pageBoolean = !this.pageBoolean
      this.$emit('say', this.pageBoolean)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .jurisdiction
    width 100%
    overflow hidden
    background #111a28
    padding 60px 0 40px
    margin-top 210px
    position relative
    .jurisdictionDiv
      width 1220px
      margin 0 auto
      overflow hidden
      position relative
      .jurisdictionH
         margin-bottom 30px
         font-size $font-size-medium-x
         color $color-text
      .jurisdictionBottom
         margin-left 76px
         position relative
         overflow hidden
         .header
           init()
           margin-bottom 20px
           .headerP
              float left
              line-height 30px
              margin-right 8px
              color $color-border-b-fault
              font-size $font-size-medium
           .headerDiv
              float left
              overflow hidden
         .definition
            init()
            margin-bottom 55px
            .definitionUl
              text-align center
              color $color-text
              border-left 1px solid #444d5b
              border-top 1px solid #444d5b
              border-right 1px solid #444d5b
              .definitionLi
                float left
                padding 10px 0
                border-right 1px solid #444d5b
                width 338px
              .definitionLitwo
                padding 10px 0
            .content
              border 1px solid #444d5b
              position relative
              overflow hidden
              .contentLi
                float left
                padding 10px 0
                border-right 1px solid #444d5b
                width 338px
                text-align center
              .contentLitwo
                padding 10px 0
         .fastener
            init()
            color $color-text
            text-align center
            .conserve
              conserve()
              margin-right 100px
            .closedown
              closedown()
</style>
<style>
  .el-table tr{
    background:#0b111a;
  }
  .el-table th.is-leaf{
    background:#0b111a;
    border-bottom: 1px solid #444d5b
  }
  .el-table td{
    border-bottom: 1px solid #444d5b
  }
  .el-table::before{
    height:0;
  }
</style>

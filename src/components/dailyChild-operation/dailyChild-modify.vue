<template>
    <div class="subjecT">
      <div class="content">
        <h4 class="subjectH">
          修改
        </h4>
        <div class="subjectDiv">
          <div class="contentTop">
            <div class="contentLeft">
              <p class="contentLeftP">计划名称：</p>
              <div class="contentLeftDiv">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="contentLeft">
              <p class="contentLeftP">计划编号：</p>
              <div class="contentLeftDivtwo">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="contentRight">
              <p class="contentLeftP">
                计划状态：
              </p>
              <div class="contentLeftDivthree">
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
          </div>
          <div class="contentBottom">
            <div class="bottomHeder">
              <div class="contentLeft">
                <p class="contentLeftP">定制人员：</p>
                <div class="contentLeftDiv">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="contentLeft">
                <p class="contentLeftP">定制时间：</p>
                <div class="contentLeftDivtwo">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
              </div>
            </div>
            <div class="contenttwo">
              <p class="contentLeftP">计划说明：</p>
              <div class="contenttwoDiv">
                <el-input
                  type="textarea"
                  :rows="3"
                  resize="none"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </div>
          <div class="dendrogram">
            <ul class="dendrogramUl">
              <li class="dendrogramLi">
                <div class="dendrogramheade">
                  <p>
                    选择执行人
                  </p>
                </div>
                <div class="dendrogramLiDiv">
                  <div class="dendrogramLiDivD">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                  </div>
                </div>
              </li>
              <li class="dendrogramLitwo">
                <div class="dendrogramheade">
                  <p>
                    选择巡检范围
                  </p>
                </div>
                <div class="dendrogramLiDiv">
                  <div class="dendrogramLiDivD">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                  </div>
                </div>
              </li>
              <li class="dendrogramLithree">
                <div class="dendrogramheade">
                  <p>
                    选择消防范围
                  </p>
                </div>
                <div class="dendrogramLiDiv">
                  <div class="dendrogramLiDivD">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                  </div>
                </div>
              </li>
              <li class="dendrogramLifrou">
                <div class="dendrogramheade">
                  <p>
                    选择巡检频次
                  </p>
                </div>
                <div class="dendrogramLiDiv">
                  <div class="dendrogramLiDivD">
                    <div class="dendrogramDIV">
                      <el-checkbox v-model="checked">每日巡检一次 ( 消防安全重点单位 )</el-checkbox>
                    </div>
                    <div class="dendrogramDIV">
                      <el-checkbox v-model="checked">每周巡检一次 ( 一般单位 )</el-checkbox>
                    </div>
                    <div class="dendrogramDIV">
                      <el-checkbox v-model="checked">每班巡检一次 ( 特殊单位 )</el-checkbox>
                    </div>
                  </div>
                  <div class="dendrogramheade">
                    <p>
                      选择工作标准
                    </p>
                  </div>
                  <div class="dendrogramLiDivD">
                    <div class="dendrogramDIV">
                      <el-checkbox v-model="checked">业主单位</el-checkbox>
                    </div>
                    <div class="dendrogramDIV">
                      <el-checkbox v-model="checked">服务机构</el-checkbox>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fastener">
            <div @click="conserve" class="conserve">
              保存
            </div>
            <div class="closedown">
              关闭
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'dailyChild-modify',
  props: ['sag'],
  data () {
    return {
      input: '',
      textarea: '',
      concealment: false,
      checked: false,
      value: '',
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
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    conserve () {
      this.concealment = this.sag
      this.concealment = !this.concealment
      this.$emit('say', this.concealment)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subjecT
    init()
    margin-top 100px
    background #111a28
    padding 40px 0
    .content
     width 1223px
     margin 0 auto
     position relative
     overflow hidden
     .subjectH
       margin-bottom 38px
       font-size $font-size-medium-x
       color $color-text-title
     .subjectDiv
       overflow hidden
       position relative
       margin-left 70px
       .contentTop
          init()
          padding 10px 0
          border-bottom 1px solid #444d5b
          .contentLeft
            float left
            margin-right 55px
            overflow hidden
            .contentLeftP
                float left
                width 80px
                line-height 30px
                margin-right 10px
                text-align right
                color $color-header-b-normal
                font-size $font-size-medium
            .contentLeftDiv
                float left
                width 300px
            .contentLeftDivtwo
                float left
                width 220px
          .contentRight
             float left
             overflow hidden
             .contentLeftP
               float left
               width 80px
               line-height 30px
               margin-right 10px
               text-align right
               color $color-header-b-normal
               font-size $font-size-medium
             .contentLeftDivthree
                float left
                width 220px
       .contentBottom
         init()
         padding 18px 0 24px
         .bottomHeder
            init()
            margin-bottom 18px
            .contentLeft
              float left
              margin-right 55px
              overflow hidden
              .contentLeftP
                float left
                width 80px
                line-height 30px
                margin-right 10px
                text-align right
                color $color-header-b-normal
                font-size $font-size-medium
            .contentLeftDiv
              float left
              width 300px
            .contentLeftDivtwo
               float left
               width 220px
       .contenttwo
          init()
          .contentLeftP
            float left
            width 80px
            line-height 30px
            margin-right 10px
            text-align right
            color $color-header-b-normal
            font-size $font-size-medium
          .contenttwoDiv
            float left
            width 1053px
            overflow hidden
     .dendrogram
         init()
         .dendrogramUl
            init()
            .dendrogramLi
               float left
               margin-right 5px
               width 250px
               position relative
               overflow hidden
            .dendrogramLitwo
              float left
              margin-right 5px
              width 295px
              position relative
              overflow hidden
            .dendrogramLithree
              float left
              margin-right 5px
              width 305px
              position relative
              overflow hidden
            .dendrogramLifrou
              float left
              width 288px
              position relative
              overflow hidden
  .dendrogramheade
      init()
      padding 10px 0
      background #354d76
     p
      font-size $font-size-medium
      color $color-text-title
      padding-left 10px
  .dendrogramLiDiv
     width 100%
     height: calc(100% - 50px);
     overflow-y: auto;
     overflow-x: hidden;
     height 320px
     background #0b111a
     .dendrogramLiDivD
        overflow hidden
        position relative
        margin 15px 0 0 20px
     .dendrogramDIV
        margin-bottom 20px
  .fastener
     init()
     margin-top 20px
     text-align center
    .conserve
      conserve()
      margin-right 110px
    .closedown
      closedown()
  .el-tree
  .el-tree-node:focus>.el-tree-node__content
    background none

  .el-tree-node__content:hover
    background none

  .el-tree-node__content:active
    background none
</style>

<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../../static/img/department.png" alt="">
        <p class="subjectP">角色管理</p>
      </header>
      <div class="leftBottom">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
    </section>
    <section class="subjectRight">
      <div class="rightHeader"></div>
      <div class="karakters">
        <div class="jurisdictionBottom">
          <div class="header">
            <div @click="increasd" class="increased">
              新增角色信息
            </div>
          </div>
          <div class="definition">
            <div class="definitionHeader">
              <ul class="definitionHeaderul">
                <li class="definitionHeaderli">模块</li>
                <li class="definitionHeaderlitwo">查看</li>
                <li class="definitionHeaderlitwo">新增</li>
                <li class="definitionHeaderlitwo">修改</li>
                <li class="definitionHeaderlitwo">删除</li>
              </ul>
            </div>
            <div class="content">
             <div :key='index' v-for="(item, index) in fullFunctionality" class="contentDiv">
               <div class="contentDivtwo">
                 <ul class="definitionHeaderul">
                   <li @click="definitionLi(item)" class="definitionHeaderli">
                     {{item.first}}
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox v-model="checked"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox v-model="checked"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox v-model="checked"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox v-model="checked"></el-checkbox>
                   </li>
                 </ul>
               </div>
               <ul v-show="item.flag" class="contentDivthree">
                 <li class="contentLi" :key="index" v-for="(data, index) in item.second">
                   <ul class="definitionHeaderul">
                     <li class="definitionHeaderli">
                       {{data.functionname}}
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-model="checked"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-model="checked"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-model="checked"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-model="checked"></el-checkbox>
                     </li>
                   </ul>
                 </li>
               </ul>
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="basis" class="popup">
      <increased :increaSed="basis" @baSis="Basis"></increased>
    </section>
  </div>
</template>

<script>
import increased from '../intercalateChild-operation/karaktersChild-increased'
export default {
  name: 'intercalateChild-karakters',
  components: {
    increased
  },
  data () {
    return {
      data: [{
        label: '项目一',
        personnel: '王大，曹大，赵大，越大',
        children: [{
          label: '部门一',
          personnel: '曹大',
          children: [{
            label: '研发部',
            personnel: '王大',
            children: [{
              label: '下属',
              personnel: '李大，赵大'
            }]
          }]
        }]
      }, {
        label: '项目二',
        personnel: '邱大，慕大，乔大，刘大',
        children: [{
          label: '人事部',
          personnel: '习大',
          children: [{
            label: '下属',
            personnel: '邱大，慕大，乔大'
          }]
        }, {
          label: '工程部',
          personnel: '朱大，蔺大，王大，习大',
          children: [{
            label: '下属',
            personnel: '曹大'
          }]
        }]
      }, {
        label: '项目三',
        personnel: '孙大，搭大，港大，泽大, 姬大，周大，红大',
        children: [{
          label: '人事部',
          personnel: '孙大',
          children: [{
            label: '下属',
            personnel: '搭大，港大'
          }]
        }, {
          label: '后勤部',
          personnel: '姬大',
          children: [{
            label: '下属',
            personnel: '周大，红大'
          }]
        }]
      }],
      basis: false,
      value: '',
      checked: false,
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      structureDate: {
        label: '',
        personnel: ''
      },
      fullFunctionality: ''
    }
  },
  methods: {
    increasd () {
      this.basis = true
    },
    Basis (ev) {
      this.basis = ev
    },
    handleNodeClick (data) {

    },
    definitionLi (item) {
      item.flag = !item.flag
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(`http://172.16.6.181:8920/roles/FindAllFunctions`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        console.log(response.data.data)
        response.data.data.forEach((val) => {
          val.flag = false
          // console.log()
        })
        this.fullFunctionality = response.data.data
      }
    })
    this.axios.post(`http://172.16.6.181:8920/roles/FindAllRoles?token=${token}`).then((response) => {
      if (response.data.code === 0) {
      //
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 56px
      .leftHeader
        width 100%
        overflow hidden
        position relative
        height 40px
        line-height 40px
        background #354d76
      .subjectImg
        margin 0 4px
        display inline-block
        width 40px
        float left
        height 40px
      .subjectP
        float left
        color $color-text
        line-height 40px
      .leftBottom
        width 100%
        min-height 800px
        max-height 800px
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      overflow hidden
      position relative
      .rightHeader
        init()
        background #354d76
        height 40px
      .karakters
        height calc(100% - 50px)
        overflow hidden
        overflow-y auto
        min-height 800px
        max-height 800px
        position relative
        background #101826
      .jurisdictionBottom
        margin 20px 30px
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
          .increased
            float right
            margin-right 20px
            background $color-background-newly
            text-align center
            padding 8px 28px
            color $color-text-title
            border-radius 5px
            cursor pointer
            transition .2s
            &:hover
              background #4baabe
        .definition
          init()
          margin-bottom 55px
        .fastener
          init()
          color $color-text
          text-align center
          .conserve
            conserve()
            margin-right 100px
          .closedown
            closedown()
  .popup
    position fixed
    top 0
    left 0
    background rgba(000, 000, 000, .4)
    z-index 11
    width 100%
    height 100%
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
  .contentDivtwo
    color #eee
    line-height 30px
    padding 6px 0
    init()
  .definitionHeader
     width 100%
     position relative
     overflow hidden
     background #354d76
  .contentLi
    line-height 30px
    color $color-text-title
    padding 6px 0
    height 30px
  .contentLeft
    width 40%
    height 30px
    overflow hidden
    float left
  .contentRight
     height 30px
     overflow hidden
     float left
     width 60%
  .definitionHeaderul
    init()
    color #d5d5d5
    line-height 30px
    text-align center
    height 30px
    .definitionHeaderli
      float left
      overflow hidden
      width 40%
      cursor pointer
    .definitionHeaderlitwo
      float left
      overflow hidden
      position relative
      text-align center
      width 15%
  .contentDiv
    overflow hidden
  .contentDivthree
    color #eee
    line-height 30px
    background #0b111a
    init()
  .content .contentDiv:nth-child(even){
    background #141d2c
  }
</style>

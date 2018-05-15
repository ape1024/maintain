<template>
    <div class="subject">
      <section class="subjectLeft">
        <header class="leftHeader">
          <img class="subjectImg" src="../../../static/img/department.png" alt="">
          <p class="subjectP">结构组织权限管理</p>
        </header>
        <div class="leftBottom">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </section>
      <section class="subjectRight">
        <ul class="rightHeader">
          <li class="rightliFour">
            编号
          </li>
          <li class="rightLi">
            部门
          </li>
          <li class="rightLi">
            分组名称
          </li>
          <li class="rightliTwo">
            成员
          </li>
          <li class="rightliThree">
            操作
          </li>
        </ul>
        <ul class="content">
          <li class="contentLi">
            <ul class="contentliUl">
              <li class="rightliFour">
              1
              </li>
              <li class="rightLi">
               {{structureDate.label}}
              </li>
              <li class="rightLi">
               分组
              </li>
              <li class="rightliTwo">
                {{structureDate.personnel}}
              </li>
              <li class="rightliThree">
                <!--权限-->
                <p @click="power" class="jurisdiction">
                  权限
                </p>
                <!--成员-->
                <p @click="leaguer" class="member">
                  成员
                </p>
                <!--编辑-->
                <p @click="bluepencil" class="edit">
                  编辑
                </p>
                <!--复制-->
                <p @click="printoff" class="copy">
                  复制
                </p>
                <!--删除-->
                <p @click="amputate" class="amputate">
                  删除
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <!--弹出层-->
      <div v-show="popupBoolean" class="popup">
        <!--权限-->
        <Jurisdiction :pBoolean="popupBoolean" @say="Say"></Jurisdiction>
      </div>
    </div>
</template>

<script>
import Jurisdiction from '../intercalateChild-operation/structureChild-jurisdiction'
export default {
  name: 'intercalateChild-structure',
  components: {
    Jurisdiction
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      popupBoolean: false,
      structureDate: {
        label: '',
        personnel: ''
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
      console.log(this.structureDate)
      this.structureDate.label = data.label
      this.structureDate.personnel = data.personnel
    },
    power () {
      // 点击权限
      this.popupBoolean = true
    },
    Say (ev) {
      // 点击权限 保存/关闭
      console.log(ev)
      this.popupBoolean = ev
    },
    leaguer () {
      // 点击成员
      alert('成员')
    },
    bluepencil () {
      // 点击编辑
      alert('编辑')
    },
    printoff () {
      // 点击复制
      alert('复制')
    },
    amputate () {
      // 点击删除
      alert('删除')
    }
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
        overflow hidden
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
        padding 10px 0
      .rightLi
        float left
        width 10%
        overflow hidden
        text-align left
        color $color-header-b-normal
      .rightliTwo
         float left
         width 36%
         height 16px
         margin-right 2%
         word-break keep-all
         white-space nowrap
         overflow hidden
         text-overflow ellipsis
         color $color-header-b-normal
      .rightliThree
         width 32%
         overflow hidden
         position relative
         float left
         color $color-header-b-normal
      .rightliFour
         width 8%
         padding-left 2%
         overflow hidden
         position relative
         float left
         color $color-header-b-normal
      .content
         init()
      .contentLi
         init()
         padding 10px 0
      .contentliUl
         init()
      .content .contentLi:nth-child(odd)
         background #1c273a!important
      .content .contentLi:nth-child(even)
        background #141d2c
      .jurisdiction
         float left
         cursor pointer
         color $color-background-query
         margin-right 28px
      .member
        float left
        cursor pointer
        color $color-background-newly
        margin-right 28px
      .edit
        float left
        cursor pointer
        color $color-background-introduce
        margin-right 28px
      .copy
        float left
        color #e59a42
        cursor pointer
        margin-right 28px
      .amputate
        float left
        cursor pointer
        color #a63232
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

</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  /*.el-tree-node__label
    color $color-text*/
</style>

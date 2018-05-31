<template>
    <div class="subject">
      <section class="subjectLeft">
        <header class="leftHeader">
          <img class="subjectImg" src="../../../static/img/department.png" alt="">
          <p class="subjectP">结构组织权限管理</p>
          <p class="subjectptwo">新增</p>
        </header>
        <div class="leftBottom">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </section>
      <section class="subjectRight">
        <div class="information">
          <ul class="informationUl">
            <li class="informationLi">
              <div class="informationDiv">
                <p class="informationP">
                  单位名称：
                </p>
                <div class="content">
                  <el-input v-model="projectName" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  单位简称：
                </p>
                <div class="content">
                  <el-input v-model="abbreviation" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  单位编码：
                </p>
                <div class="content">
                  <el-input v-model="encrypt" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  所在区域：
                </p>
                <div class="content">
                  <el-input v-model="region" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  所在地址：
                </p>
                <div class="content">
                  <el-input v-model="address" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  专业类别：
                </p>
                <div class="content">
                  <el-input v-model="category" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  业务类别：
                </p>
                <div class="content">
                  <el-input v-model="business" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  资质等级：
                </p>
                <div class="content">
                  <el-input v-model="grading" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  资质编号：
                </p>
                <div class="content">
                  <el-input v-model="identifier" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  单位联系人：
                </p>
                <div class="content">
                  <el-input v-model="linkman" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  联系人手机：
                </p>
                <div class="content">
                  <el-input v-model="CellPhone" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLithree">
              <div class="informationDivthree">
                <p class="informationP">
                  组织机构图标：
                </p>
                <div class="contenttwo">
                  <el-upload class="upload-demo" ref="upload" action="" :on-change="onChange" :file-list="fileList" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
              </div>
            </li>
            <li class="informationLithree">
              <div class="informationDivthree">
                <p class="informationP">
                  备注说明：
                </p>
                <div class="contentthree">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder=""
                    resize="none"
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
            </li>
            <li class="informationLifour">
              <div class="conserve">
                保存
              </div>
            </li>
          </ul>
        </div>
      </section>
      <!--弹出层-->
      <div v-show="popupBoolean" class="popup">
        <!--权限-->
        <Jurisdiction :pBoolean="popupBoolean" @say="Say"></Jurisdiction>
      </div>
      <div v-show="memberBoolean" class="popup">
        <!--成员-->
        <member :menBer="memberBoolean" @back="Back"></member>
      </div>
      <div v-show="bluepencilBoolean" class="popup">
        <bluepencil :bluePencil="bluepencilBoolean" @circle="Circle"></bluepencil>
      </div>
      <div v-show="copyBoolean" class="popup">
        <structureCopy @wind="Wind" :copyboolean="copyBoolean"></structureCopy>
      </div>
    </div>
</template>

<script>
import Jurisdiction from '../intercalateChild-operation/structureChild-jurisdiction'
import member from '../intercalateChild-operation/structureChild-member'
import bluepencil from '../intercalateChild-operation/structureChild-bluepencil'
import structureCopy from '../intercalateChild-operation/structureChild-copy'
export default {
  name: 'intercalateChild-structure',
  components: {
    Jurisdiction,
    member,
    bluepencil,
    structureCopy
  },
  data () {
    return {
      data: [],
      textarea: '',
      defaultProps: {
        children: 'subOrgnizations',
        label: 'organizationName'
      },
      popupBoolean: false,
      memberBoolean: false,
      bluepencilBoolean: false,
      copyBoolean: false,
      //  单位名称
      projectName: '',
      //  单位简称
      abbreviation: '',
      //  单位编码
      encrypt: '',
      //  所在区域
      region: '',
      //  所在地址
      address: '',
      //  专业类别
      category: '',
      //  业务类别
      business: '',
      //  资质等级
      grading: '',
      //  资质编号
      identifier: '',
      //  单位联系人
      linkman: '',
      //  联系人手机
      CellPhone: '',
      //  组织机构图标
      fileList: [],
      structureDate: {
        label: '',
        personnel: ''
      }
    }
  },
  methods: {
    onChange (file, fileList) {
      this.Headportrait = file.url
      if (fileList.length > 1) {
        this.fileList = fileList.slice(1, 2)
      }
    },
    handleNodeClick (data) {
      console.log(data)
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
      this.memberBoolean = true
    },
    Back (ev) {
      this.memberBoolean = ev
    },
    bluepencil () {
      // 点击编辑
      this.bluepencilBoolean = true
    },
    Circle (ev) {
      this.bluepencilBoolean = ev
    },
    printoff () {
      // 点击复制
      this.copyBoolean = true
    },
    Wind (ev) {
      this.copyBoolean = ev
    },
    amputate () {
      // 点击删除
      alert('删除')
    }
  },
  created () {
    this.axios.post('http://172.16.6.16:8920/organization/getOrganizationTrees').then((response) => {
      if (response.data.code === 0) {
        this.data = response.data.data
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
      /*margin-right 56px*/
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
       .subjectptwo
         float right
         cursor pointer
         color $color-text-tile-complete
         margin-right 20px
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
.information
  width 900px
  overflow hidden
  margin 50px auto
  .informationUl
    init()
    .informationLi
      overflow hidden
      position relative
    .informationLitwo
      overflow hidden
      position relative
    .informationDiv
      overflow hidden
      position relative
      float left
      margin-bottom 30px
    .informationDivtwo
      overflow hidden
      position relative
      float right
      margin-bottom 15px
    .informationP
      color $color-border-b-fault
      font-size $font-size-medium
      line-height 30px
      margin-right 10px
      width 120px
      text-align right
      float left
    .content
      float left
      width 267px
      overflow  hidden
    .contenttwo
       float left
       width 770px
       height 68px
       overflow hidden
    .contentthree
      float left
      width 770px
      overflow hidden
  .informationDivthree
    overflow hidden
    position relative
    margin-bottom 10px
  .informationLithree
     overflow hidden
     position relative
  .informationLifour
    overflow hidden
    text-align center
    margin-top 10px
    position relative
  .conserve
    conserve()

</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
</style>

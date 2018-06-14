<template>
  <div class="subject">
    <section class="section">
      <h4 class="subjectH">
        查看项目信息
      </h4>
      <div class="information">
        <ul class="informationUl">
          <li class="informationLi">
            <div class="informationDiv">
              <p class="informationP">
                项目名称：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.projectname}}
              </div>
            </div>
            <div class="informationDiv">
              <p class="informationP">
                项目开始：
              </p>
              <div class="examine">
                {{fmtDate(projectsinfosviewdetail.startdate)}}
              </div>
            </div>
            <div class="informationDiv">
              <p class="informationP">
                业主单位：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.proprietorname}}
              </div>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <p class="informationP">
                项目编号：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.projectcode}}
              </div>
            </div>
            <div class="informationDiv">
              <p class="informationP">
                项目结束：
              </p>
              <div class="examine">
                {{fmtDate(projectsinfosviewdetail.enddate)}}
              </div>
            </div>
            <div class="informationDiv">
              <p class="informationP">
                服务机构：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.vindicatorname}}
              </div>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <p class="informationP">
                项目类别：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.projecttypename}}
              </div>
            </div>
            <div class="informationDiv">
              <p class="informationP">
                创建人员：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.creatername}}
              </div>
            </div>
            <div class="informationDiv">
              <p class="informationP">
                项目地址：
              </p>
              <div class="examine">
                {{projectsinfosviewdetail.address}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">合同范围</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDiv">
          <div class="substance">
            <div class="substanceDiv">
              <el-input v-model="input" :disabled="true" placeholder=""></el-input>
            </div>
            <p class="substanceP">
              建筑范围：
            </p>
          </div>
          <div class="substance">
            <div class="substanceDiv">
              <table class="substancedivTable">
                <tr class="substancedivTr" :key="item.id" v-for="item in devtypes">
                  <td class="substancedivSpantwo">{{item.name}}</td>
                  <td class="substancedivtableTb">
                    <span class="substancedivSpanone" :key="data.id" v-for="data in item.children">{{data.name}}</span>
                    </td>
                </tr>
              </table>
            </div>
            <p class="substanceP">
              消防设备：
            </p>
          </div>
        </div>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">维保内容</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDivtwo">
          <el-input
            :disabled="true"
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
        </div>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">维保要求</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDivtwo">
          <el-input
            type="textarea"
            :rows="3"
            :disabled="true"
            resize="none"
            placeholder="请输入内容"
            v-model="requirement">
          </el-input>
        </div>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">备注信息</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDivtwo">
          <el-input
            type="textarea"
            :rows="3"
            :disabled="true"
            resize="none"
            placeholder="请输入内容"
            v-model="comment">
          </el-input>
        </div>
      </div>
      <div class="upload">
        <p class="uploadP">附属文件：</p>
        <div class="uploadDiv">

        </div>
      </div>
      <!--<div class="personnel">-->
        <!--<p class="personnelP">项目人员配备：</p>-->
        <!--<div class="personnelDiv">-->
          <!--<el-input v-model="input" :disabled="true" placeholder=""  clearable>></el-input>-->
        <!--</div>-->
      <!--</div>-->
      <div class="fastener">
        <div @click="closedown" class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'consumerChild-examine',
  props: ['examine', 'exaDate'],
  data () {
    return {
      // 本页面的显示隐藏
      Thispage: false,
      input: '嘤嘤嘤',
      input1: '喔喔喔',
      value1: '',
      value2: '',
      textarea: '',
      projectsinfosviewdetail: '',
      devtypes: '',
      content: '',
      requirement: '',
      comment: ''
    }
  },
  methods: {
    closedown () {
      this.Thispage = this.examine
      this.Thispage = !this.Thispage
      this.$emit('mine', this.Thispage)
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    }
  },
  created () {
    this.projectsinfosviewdetail = this.exaDate.projectsinfosviewdetail
    console.log(this.exaDate.projectsinfosviewdetail.content)
    this.devtypes = this.exaDate.devtypes
    console.log(this.devtypes)
    this.content = this.exaDate.projectsinfosviewdetail.content
    this.requirement = this.exaDate.projectsinfosviewdetail.requirement
    this.comment = this.exaDate.projectsinfosviewdetail.comment
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    padding 20px 0 20px
    margin-top 70px
    background #111a28
    .section
      width 1245px
      margin 0 auto
      overflow-y scroll
      height 800px
      position relative
    .subjectH
      margin-bottom 35px
      font-size $font-size-medium-x
      color $color-text-title
    .information
      margin-left 55px
      overflow hidden
      .informationUl
        init()
        .informationLi
          float left
          overflow hidden
          position relative
          width 33%
      .informationLitwo
        float left
        overflow hidden
        margin-left .5%
        position relative
        width 33%
      .informationDiv
        init()
        margin-bottom 15px
      .informationP
        color $color-border-b-fault
        font-size $font-size-medium
        line-height 40px
        margin-left 24px
        margin-right 10px
        float left
      .content
        width 267px
        float right
    .purview
      init()
    .contentHeader
      init()
      .headerP
        float left
        margin-right 18px
        color $color-border-b-fault
        font-size $font-size-medium
      .headerLine
        width 1149px
        height 1px
        background #444d5b
        margin-top -8px
        float right
    .purviewDivtwo
      width 1066px
      float right
      overflow hidden
      margin 10px 0 10px 10px
    .purviewDiv
      margin-left 30px
      overflow hidden
      margin-top 10px
      .substance
        init()
        margin-bottom 10px
        .substanceP
          float right
          color $color-border-b-fault
          margin-right 25px
          line-height 30px
          font-size $font-size-medium
        .substanceDiv
          width 1065px
          margin-right 1px
          float right
    .upload
      init()
      margin-top 10px
      .uploadP
        font-size $font-size-medium
        color $color-border-b-fault
        margin-left 86px
        float left
      .uploadDiv
        overflow hidden
        float left
    .personnel
      init()
      margin-top 10px
      .personnelP
        margin-left 65px
        line-height 40px
        font-size $font-size-medium
        color $color-border-b-fault
        float left
      .personnelDiv
        width 412px
        float left
    .fastener
      init()
      margin-top 10px
      text-align center
      .conserve
        conserve()
        margin-right 110px
      .closedown
        closedown()
  .substancedivTable
    overflow hidden
    background #0a111b
    width 100%
    margin-right -1px
    border 1px solid #444d5b
    line-height 26px
    .substancedivTr
      border-bottom 1px solid #444d5b
    .substancedivSpantwo
      width 250px
      margin-left 6px
      padding 2px 0px
      color $color-text-desc
      font-weight bold
    .substancedivSpanone
      color $color-border-b-fault
      width 200px
      margin-right 10px
    .substancedivtableTb
      border-left 1px solid #444d5b
      padding-left 6px
  .examine
    width: 267px;
    float: right;
    color $color-text-title
    line-height 40px
  .el-date-editor.el-input, .el-date-editor.el-input__inner
    width 100%!important
</style>

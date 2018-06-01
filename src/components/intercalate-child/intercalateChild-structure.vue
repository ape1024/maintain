<template>
    <div @click="shutdown" class="subject">
      <section class="subjectLeft">
        <header class="leftHeader">
          <img class="subjectImg" src="../../../static/img/department.png" alt="">
          <p class="subjectP">结构组织权限管理</p>
          <p class="subjectptwo">新增</p>
        </header>
        <div class="leftBottom">
          <el-tree node-click="changClick" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </section>
      <section class="subjectRight">
        <div class="information">
          <ul class="informationUl">
            <li class="informationLi">
              <div class="informationDiv">
                <p class="informationP">
                  上级主管单位：
                </p>
                <div class="companyContent">
                  <el-cascader
                    :options="data"
                    :props="defaultProps"
                    change-on-select
                  ></el-cascader>
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
            <li class="informationLifive">
              <div class="informationDiv">
                <p class="informationP">
                  所在区域：
                </p>
                <div class="content">
                  <div @click.stop="accessarea" class="region">
                    {{regionDate}}
                  </div>
                  <ul v-show="regionUl" class="region_ul">
                    <li :id="item.provinceid" :key="item.provinceid" v-for="item in province" class="region_li">
                      <i @click.stop="deploy($event, item.provinceid)" class="el-icon-circle-plus-outline region_i"></i><span @click="provinceSpan($event, item)" class="provinceSpan">{{item.provincename}}</span><ul class="regionliUl">
                        <li :id="data.cityid" :key="data.cityid" v-for="data in conurbation" class="regionliul_li">
                          <i @click.stop="count($event, data.cityid)" class="el-icon-circle-plus-outline region_itwo"></i>
                          <span class="countSpen" @click="citySpan($event, data)">{{data.cityname}}</span>
                          <ul class="countUl">
                            <li @click="countytownSpan(coundata)" :key="coundata.countyid" :id="coundata.countyid" v-for="coundata in countytown" class="countLi">
                              {{coundata.countyname}}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
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
                  <el-cascader
                    :options="category"
                    v-model="selectedOptions"
                    @change="handleChange">
                  </el-cascader>
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
import $ from 'jquery'
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
      selectedOptions: [],
      data: [],
      specialty: [],
      textarea: '',
      defaultProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationCode'
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
      //  省份
      province: '',
      //  省份下所有的城市
      conurbation: '',
      //  县城/区
      countytown: '',
      //  判断区域ul 是否存在
      regionUl: false,
      //  省份ID
      provinceId: '',
      //  城市ID
      conurbationId: '',
      //  县城ID
      countytownId: '',
      //  展示用户选取的地区
      regionDate: '',
      structureDate: {
        label: '',
        personnel: ''
      }
    }
  },
  methods: {
    handleChange () {
    },
    onChange (file, fileList) {
      this.Headportrait = file.url
      if (fileList.length > 1) {
        this.fileList = fileList.slice(1, 2)
      }
    },
    handleNodeClick (data) {
      const organization = data.organizationId
      const url = `http://172.16.6.181:8920/organization/getOrganization?organizationid=${organization}`
      const urltwo = `http://172.16.6.181:8920/organization/getOrganizationInfo?organizationid=${organization}`
      this.axios.post(urltwo).then((response) => {
        console.log(response.data.data)
      })
      this.axios.post(url).then((response) => {
        console.log(response.data.data)
        // cityid:1
        // countyid:2
        // creater:null
        // creatername:""
        // createtime:1525833639000
        // icon:"http://172.16.5.34/group1/M00/33/56/3356a9d703734d2caed5eaa973f6c55d.jpg"
        // organizationcode:"10002"
        // organizationid:3
        // organizationname:"海淀项目部"
        // organizationshortname:""
        // organizationstate:0
        // parentid:1
        // provinceid:1
      })
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
    },
    changClick (a) {
      console.log(a)
    },
    //  点击最父级，关闭地址框
    shutdown () {
      this.regionUl = false
    },
    accessarea () {
      this.regionUl = !this.regionUl
    },
    deploy (event, provinceid) {
      if ($(event.currentTarget).siblings('.regionliUl').css('display') === 'block') {
        $(event.currentTarget).siblings('.regionliUl').slideToggle()
        $(event.currentTarget).removeClass('el-icon-remove-outline').addClass('el-icon-circle-plus-outline')
        return false
      } else {
        $('.region_i').each(function (index, item) {
          if ($(item).hasClass('el-icon-circle-plus-outline')) {
          } else {
            $(item).removeClass('el-icon-remove-outline').addClass('el-icon-circle-plus-outline')
          }
        })
        $(event.currentTarget).removeClass('el-icon-circle-plus-outline').addClass('el-icon-remove-outline')
        $('.regionliUl').each(function (index, item) {
          $(item).css('display', 'none')
        })
        $(event.currentTarget).siblings('.regionliUl').slideDown()
        let url = `http://172.16.6.181:8920/organization/getCitiesByProvinceId?provinceid=${provinceid}`
        this.axios.post(url).then((response) => {
          if (response.data.code === 0) {
            this.conurbation = response.data.data
            console.log(response.data.data)
          }
        })
      }
    },
    count (event, countid) {
      if ($(event.currentTarget).siblings('.countUl').css('display') === 'block') {
        $(event.currentTarget).siblings('.countUl').slideToggle()
        $(event.currentTarget).removeClass('el-icon-remove-outline').addClass('el-icon-circle-plus-outline')
        return false
      } else {
        $('.region_itwo').each(function (index, item) {
          if ($(item).hasClass('el-icon-circle-plus-outline')) {
          } else {
            $(item).removeClass('el-icon-remove-outline').addClass('el-icon-circle-plus-outline')
          }
        })
        $(event.currentTarget).removeClass('el-icon-circle-plus-outline').addClass('el-icon-remove-outline')
        $('.countUl').each(function (index, item) {
          $(item).css('display', 'none')
        })
        $(event.currentTarget).siblings('.countUl').slideDown()
        let url = `http://172.16.6.181:8920/organization/getCountiesByCityId?cityid=${countid}`
        this.axios.post(url).then((response) => {
          if (response.data.code === 0) {
            this.countytown = response.data.data
          }
        })
      }
    },
    provinceSpan (event, provincename) {
      //  直接选择省份
      this.regionDate = provincename.provincename
      this.provinceId = provincename.provinceid
    },
    citySpan (event, cityDate) {
      let cout = $(event.currentTarget).parents('.region_li').children('.provinceSpan').text()
      let city = cityDate.cityname
      let url = `${cout}-${city}`
      this.regionDate = url
      console.log()
      //  省份id
      this.conurbationId = cityDate.cityid
      //  城市ID
      this.provinceId = cityDate.provinceid
    },
    countytownSpan (coundata) {
      let cout = $(event.currentTarget).parents('.region_li').children('.provinceSpan').text()
      let city = $(event.currentTarget).parents('.regionliul_li').children('.countSpen').text()
      let url = `${cout}-${city}-${coundata.countyname}`
      this.regionDate = url
      console.log($(event.currentTarget).parents('.region_li').attr('id'))
      console.log(coundata.cityid)
      console.log(coundata.countyid)
      //  省份ID
      this.provinceId = $(event.currentTarget).parents('.region_li').attr('id')
      //  城市ID
      this.conurbationId = coundata.cityid
      //  县城ID
      this.countytownId = coundata.countyid
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    console.log(token)
    //  左边的树状结构
    this.axios.post(`http://172.16.6.181:8920/organization/getOrganizationTreeByUser?token=${token}`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.data.push(response.data.data)
      }
    })
    //  省份
    this.axios.post('http://172.16.6.181:8920/organization/getAllProvince').then((response) => {
      if (response.data.code === 0) {
        this.province = response.data.data
      }
    })
    //   专业类别
    this.axios.post('http://172.16.6.181:8920/organization/getAllLevels').then((response) => {
      console.log(response.data.data)
      if (response.data.code === 0) {
        this.category = response.data.data
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
        width 100%
        position relative
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
      width 100%
      position relative
    .informationDiv
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
      position relative
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
 .informationLifive
    position relative
 .region
    width 100%
    cursor pointer
    height  30px
    line-height 30px
    border-radius 5px
    background #fff
    text-indent 2em
  .region_ul
     position absolute
     top 30px
     left 0
     width  100%
     min-height 300px
     overflow-y scroll
     z-index 111
     max-height 300px
     background #fff
     border-radius  5px
     .region_li
       cursor pointer
       width 100%
       color #000
       padding 10px 0
       .region_i
         cursor pointer
         margin 0 10px
        .region_itwo
          cursor pointer
          margin 0 10px
        .regionliUl
          display none
          overflow hidden
          .regionliul_li
            padding 10px 0
            text-indent 1em
            .countUl
              display none
              overflow hidden
              .countLi
                padding 10px 0
                text-indent 5em
 .companyContent
   false left
   overflow hidden
   width 770px
 .el-cascader
    width 100%
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
</style>

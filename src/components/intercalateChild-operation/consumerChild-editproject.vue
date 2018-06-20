<template>
  <div class="subject" @click="subjectClick">
    <section class="section">
      <h4 class="subjectH">
        修改项目信息
      </h4>
      <div class="information">
        <ul class="informationUl">
          <li class="informationLi">
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="projectName" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目名称：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-date-picker
                  v-model="startdate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <p class="informationP">
                项目开始：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-select v-model="proprieTor" placeholder="请选择">
                  <el-option
                    v-for="item in proprieTorDate"
                    :key="item.organizationid"
                    :label="item.organizationname"
                    :value="item.organizationid">
                  </el-option>
                </el-select>
              </div>
              <p class="informationP">
                业主单位：
              </p>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="projectCode" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目编号：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-date-picker
                  v-model="endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <p class="informationP">
                项目结束：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-select v-model="proprietornameDate" placeholder="请选择">
                  <el-option
                    v-for="item in proprietorName"
                    :key="item.organizationid"
                    :label="item.organizationname"
                    :value="item.organizationid">
                  </el-option>
                </el-select>
              </div>
              <p class="informationP">
                服务机构：
              </p>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <div class="content">
                <el-select v-model="projectDate" multiple placeholder="请选择">
                  <el-option
                    v-for="item in projectType"
                    :key="item.worktypeid"
                    :label="item.worktypename"
                    :value="item.worktypeid">
                  </el-option>
                </el-select>
              </div>
              <p class="informationP">
                项目类别：
              </p>
            </div>
            <div class="informationDiv">
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
              <p class="informationP">
                项目地址：
              </p>
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
              <!--<el-input v-model="projectRange" placeholder="请输入内容"></el-input>-->
              <div @click.stop="firecontrolClick" class="firecontrol">
                {{buildscope}}
              </div>
              <div v-if="buildscopeBoolean" class="firecontrolDiv">
                <el-tree
                  :data="purview"
                  :props="purviewProps"
                  node-key="areaid"
                  show-checkbox
                  @check="purviewCheck">
                </el-tree>
              </div>
            </div>
            <p class="substanceP">
              建筑范围：
            </p>
          </div>
          <div class="substance">
            <div class="substanceDiv">
              <div class="firecontrol" @click.stop="fireconboolean">
                {{firecontrolda}}
              </div>
              <div v-if="firecontrolBoolean" class="firecontrolDiv">
                <el-tree
                  :data="firecontrol"
                  :props="firecontrolProps"
                  node-key="id"
                  show-checkbox
                  @check="firecontrolCheck">
                </el-tree>
              </div>
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
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容"
            v-model="conTent">
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
            resize="none"
            placeholder="请输入内容"
            v-model="comment">
          </el-input>
        </div>
      </div>
      <div class="upload">
        <p class="uploadP">附属文件：</p>
        <div class="uploadDiv">
          <el-upload
            class="upload-demo"
            action="http://172.16.6.16:8920/upload/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handlesuccess"
            :before-remove="beforeRemove"
            multiple
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div @click="closedown" class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'consumerChild-editproject',
  props: ['edit', 'project'],
  data () {
    return {
      //  范围 传给后台
      buildscopeDate: [],
      buildscope: '',
      buildscopeBoolean: false,
      regionUl: false,
      regionDate: '',
      //  省份
      province: '',
      //  省份下所有的城市
      conurbation: '',
      //  县城/区
      countytown: '',
      //  省份ID
      provinceId: '',
      //  城市ID
      conurbationId: '',
      //  县城ID
      countytownId: '',
      //  消防设备
      firecontrolda: '',
      firecontrolDate: [],
      // 本页面的显示隐藏
      Thispage: false,
      fileList3: [],
      //  项目名称
      projectName: this.project.projectname,
      //  项目开始时间
      startdate: this.project.startdate,
      //  业主单位
      proprieTor: this.project.projecttype,
      //  项目编号
      projectCode: this.project.projectcode,
      //  项目结束时间
      endDate: this.project.enddate,
      //  服务机构
      proprietorName: [],
      proprietornameDate: [],
      //  项目类别
      projectType: [],
      projectDate: [],
      proprieTorDate: [],
      //  项目地址
      ddress: this.project.address,
      //  建筑范围
      projectrange: [],
      //  维保内容
      conTent: this.project.content ? this.project.content : '',
      //  维保要求
      requirement: this.project.requirement,
      //  备注信息
      comment: this.project.comment ? this.project.comment : '',
      exaMineDate: '',
      firecontrol: [],
      firecontrolBoolean: false,
      myfileImg: [],
      picName: [],
      purview: [],
      purviewModel: [],
      purviewProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      firecontrolProps: {
        children: 'children',
        label: 'name'
      },
      formData: [],
      fileList: [],
      documentPapers: [],
      arrayAddresses: []
    }
  },
  methods: {
    handlesuccess (response, file, fileList) {
      console.log('0-0-0-0-0-0-0-0-0-0-')
      console.log(file.name)
      console.log(response.data)
      this.documentPapers.push({
        'name': `${file.name}`,
        'url': `${response.data}`
      })
    },
    handleRemove (file) {
      console.log(file.name)
      this.documentPapers.forEach((val, index) => {
        if (val.name === file.name) {
          this.documentPapers.splice(index, 1)
        }
      })
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    firecontrolClick () {
      this.buildscopeBoolean = !this.buildscopeBoolean
    },
    purviewCheckbox (item) {
      if (item.areas.length !== 0) {
      } else {
        return false
      }
    },
    purviewCheck (checkedNodes, checkedKeys) {
      let data = ''
      this.buildscopeDate = checkedKeys.checkedKeys
      for (let i = 0; i < checkedKeys.checkedNodes.length; i++) {
        data += checkedKeys.checkedNodes[i].areaname + ' '
      }
      this.buildscope = data
    },
    firecontrolCheck (checkedNodes, checkedKeys) {
      let data = ''
      this.firecontrolDate = checkedKeys.checkedKeys
      for (let i = 0; i < checkedKeys.checkedNodes.length; i++) {
        data += checkedKeys.checkedNodes[i].name + ' '
      }
      this.firecontrolda = data
    },
    subjectClick () {
      this.firecontrolBoolean = false
      this.buildscopeBoolean = false
      this.regionUl = false
    },
    fireconboolean () {
      this.firecontrolBoolean = !this.firecontrolBoolean
    },
    conserve () {
      console.log(this.project)
      if (this.projectName === '' || this.startdate === '' || this.proprieTor === '' || this.projectCode === '' || this.endDate === '' || this.proprietornameDate === '' || this.projectDate.length === 0 || this.buildscope === '' || this.firecontrolda === '') {
        alert('您的信息没有填写完整')
        return false
      } else {
        let token = window.JSON.parse(window.sessionStorage.token)
        let areas = []
        for (let i = 0; i < this.buildscopeDate.length; i++) {
          let areasObj = {
            'areaid': this.buildscopeDate[i]
          }
          areas.push(areasObj)
        }
        let baseDevices = []
        for (let i = 0; i < this.firecontrolDate.length; i++) {
          let base = {
            'basedeviceid': this.firecontrolDate[i]
          }
          baseDevices.push(base)
        }
        let worktypes = []
        for (let i = 0; i < this.projectDate.length; i++) {
          let work = {
            'worktypeid': this.projectDate[i]
          }
          worktypes.push(work)
        }
        let pr = {
          'areas': areas,
          'baseDevices': baseDevices,
          'files': this.documentPapers,
          'project': {
            'enddate': `${this.endDate}`,
            'projectid': `${this.project.projectid}`,
            'proprietor': `${this.proprieTor}`,
            'startdate': `${this.startdate}`,
            'vindicator': `${this.proprietornameDate}`
          },
          'projectInfo': {
            'address': `${this.regionDate}`,
            'comment': `${this.comment}`,
            'content': `${this.conTent}`,
            'projectrange': `${this.firecontrolda}`,
            'requirement': `${this.requirement}`
          },
          'worktypes': worktypes
        }
        console.log(pr)
        this.axios.post(`http://172.16.6.181:8920/projects/createOrUpdateProject?token=${token}`, pr).then((response) => {
          if (response.data.code === 0) {
            alert('修改成功！')
            this.$emit('editt', this.Thispage)
          }
        })
      }
    },
    closedown () {
      this.$emit('editt', this.Thispage)
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
        let url = `http://172.16.6.16:8920/organization/getCitiesByProvinceId?provinceid=${provinceid}`
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
        let url = `http://172.16.6.16:8920/organization/getCountiesByCityId?cityid=${countid}`
        this.axios.post(url).then((response) => {
          if (response.data.code === 0) {
            this.countytown = response.data.data
          }
        })
      }
    },
    //  点击最父级，关闭地址框
    provinceSpan (event, provincename) {
      //  直接选择省份
      this.regionDate = provincename.provincename
      this.provinceId = provincename.provinceid
    },
    citySpan (event, cityDate) {
      let cout = $(event.currentTarget).parents('.region_li').children('.provinceSpan').text()
      let city = cityDate.cityname
      let url = `${cout} ${city}`
      this.regionDate = url
      //  省份id
      this.conurbationId = cityDate.cityid
      //  城市ID
      this.provinceId = cityDate.provinceid
    },
    countytownSpan (coundata) {
      let cout = $(event.currentTarget).parents('.region_li').children('.provinceSpan').text()
      let city = $(event.currentTarget).parents('.regionliul_li').children('.countSpen').text()
      let url = `${cout} ${city} ${coundata.countyname}`
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
      this.arrayAddresses = []
      this.arrayAddresses.push(Number(this.provinceId))
      this.arrayAddresses.push(this.conurbationId)
      this.arrayAddresses.push(this.countytownId)
    }
  },
  created () {
    this.axios.post(`http://172.16.6.181:8920/projects/findAllDevType`).then((response) => {
      this.firecontrol = response.data
    })
    this.axios.post(`http://172.16.6.16:8920/areas/findAllAreaTrees`).then((response) => {
      if (response.data.code === 0) {
        this.purview = response.data.data[0]
      }
    })
    this.axios.post(`http://172.16.6.16:8920/projects/getWorkTypes`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.projectType = response.data.data
      }
    })
    //  服务机构
    this.axios.post(`http://172.16.6.16:8920/organization/getRootOrganizationsNotProprietor`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.proprietorName = response.data.data
      }
    })
    //  获取业主单位
    this.axios.post(`http://172.16.6.16:8920/organization/getProprietorOrganization`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.proprieTorDate = response.data.data
        console.log(this.proprieTorDate)
      }
    })
    this.axios.post(`http://172.16.6.16:8920/organization/getAllProvince`).then((response) => {
      if (response.data.code === 0) {
        this.province = response.data.data
      }
    })
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    padding 20px 0 20px
    margin-top 20px
    background #111a28
    .section
      width 1245px
      margin 0 auto
      overflow hidden
      position relative
    .subjectH
      margin-bottom 35px
      font-size $font-size-medium-x
      color $color-text-title
    .information
      margin-left 55px
      .informationUl
        width 100%
        position relative
        .informationLi
          float left
          overflow hidden
          position relative
          width 33%
      .informationLitwo
        float left
        margin-left .5%
        position relative
        width 33%
      .informationDiv
        width 100%
        position relative
        display inline-block
        margin-bottom 15px
      .informationP
        color $color-border-b-fault
        font-size $font-size-medium
        line-height 30px
        margin-right 10px
        float right
      .content
        width 267px
        float right
    .purview
      width 100%
      display inline-block
      position relative
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
        margin-top 7px
        float right
    .purviewDivtwo
      width 1066px
      float right
      overflow hidden
      margin 10px 0
    .purviewDiv
      margin-left 30px
      display inline-block
      margin-top 10px
      .substance
        width 100%
        position relative
        display inline-block
        margin-bottom 10px
        .substanceP
          float left
          color $color-border-b-fault
          margin-left  66px
          line-height 30px
          font-size $font-size-medium
        .substanceDiv
          width 1066px
          float right
    .upload
      init()
      margin-top 10px
      .uploadP
        font-size $font-size-medium
        color $color-border-b-fault
        margin-left 96px
        float left
      .uploadDiv
        max-height 140px
        min-height 140px
        overflow-y scroll
    .personnel
      init()
      margin-top 10px
      .personnelP
        margin-left 64px
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
  .firecontrol
    position relative
    float left
    cursor pointer
    width 1066px
    height 30px
    background #fff
    text-indent 1em
    white-space nowrap
    white-space nowrap
    text-overflow ellipsis
    line-height 30px
    color $color-border-b-fault
    border-radius 5px
  .firecontrolDiv
    position absolute
    top 40px
    right  0
    color #999
    background #fff
    border-radius 5px
    overflow-y scroll
    width 1066px
    min-height 250px
    max-height 250px
    z-index 11
  .firecontrolBooleanLi
    padding 4px 0 4px 20px
  .firecontrolLi
    text-indent 1.2em
  .firecontrolII
    cursor pointer
  .el-checkbox, .el-checkbox__input
    display inline
  .firecontrolUL
    display none
  .uploadInput
    display inline-block
    width 100px
    height 30px
    line-height 30px
    font-size 14px
    color #eee
    border-radius 10px
    background #3263a6
    position relative
    text-align center
    -webkit-transition 0.4s
    transition 0.2s
    cursor pointer
    input
      position: absolute;
      top 0
      left 0
      width 100%
      height 100%
      opacity 0
      cursor pointer
  .uploadInput:hover
    background #3f72b7
  .myFileUl
    overflow hidden
    position relative
    padding-top 10px
    min-height 52px
  .myFileLi
    float left
    padding 6px 0
    margin-right 6px
    overflow hidden
  .myFileLi:hover .myFileLiSPanTwo
    opacity 1
  .myFileLi:hover .myFileLiSPan
    background #999
  .myFileLiSPan
    cursor pointer
    padding  6px 10px
    background #555
    border-radius 10px
    height 20px
    font-size 16px
    color #fff
    overflow hidden
    position relative
  .myFileLiSPanTwo
    opacity 0
    font-size 16px
    cursor pointer
    margin-left 6px
    transition .2s
    color red
  .myFileLiimg
    display inline-block
    width 50px
    height 50px
  .el-date-editor.el-input, .el-date-editor.el-input__inner
    width 100%!important
  .purviewUl
    overflow hidden
    position relative
    .purviewli
      padding 4px 0 4px 20px
      .purviewI
        cursor pointer
  .content
    width 210px
    position relative
  .region
    width 100%
    cursor pointer
    height  30px
    line-height 30px
    border-radius 5px
    background #fff
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-indent 1em
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
  .el-select
    width  100%
  .el-input__icon
    line-height 30px

</style>
<style>
  .el-input__icon {
    line-height: 30px;
  }
</style>

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
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <p class="informationP">
                项目开始：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="proprieTor" placeholder="请输入内容"  clearable>></el-input>
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
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <p class="informationP">
                项目结束：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="proprietorName" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                服务机构：
              </p>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="projectType" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目类别：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="createrName" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                创建人员：
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
          <div class="uploadInput">
            上传文件
            <input id="file" type="file" accept="*" @change='changeFile()'>
          </div>
          <ul class="myFileUl">
            <li  class="myFileLi" :key="$index" v-for="(item, $index) in myfileImg">
              <span class="myFileLiSPan">{{item}} </span>
              <span @click="myfileliSpan($index)" class="myFileLiSPanTwo"><i class="el-icon-delete myFileLiI"></i></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
// import $ from 'jquery'
export default {
  name: 'consumerChild-editproject',
  props: ['edit', 'project'],
  data () {
    return {
      //  范围 传给后台
      buildscopeDate: [],
      buildscope: '',
      buildscopeBoolean: false,
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
      proprieTor: this.project.proprietorname,
      //  项目编号
      projectCode: this.project.projectcode,
      //  项目结束时间
      endDate: this.project.enddate,
      //  服务机构
      proprietorName: this.project.vindicatorname,
      //  项目类别
      projectType: this.project.projecttype,
      //  创建人员
      createrName: this.project.creatername,
      //  项目地址
      address: this.project.address,
      //  建筑范围
      projectrange: [],
      //  维保内容
      conTent: this.project.content,
      //  维保要求
      requirement: this.project.requirement,
      //  备注信息
      comment: this.project.comment,
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
      }
    }
  },
  methods: {
    firecontrolClick () {
      this.buildscopeBoolean = !this.buildscopeBoolean
    },
    purviewCheckbox (item) {
      console.log(item)
      if (item.areas.length !== 0) {

      } else {
        return false
      }
    },
    myfileliSpan (index) {
      this.myfileImg.splice(index, 1)
      this.picName.splice(index, 1)
    },
    changeFile () {
      let pic = document.getElementById('file').files[0]
      let reader = new FileReader()
      reader.readAsDataURL(pic)
      this.myfileImg.push(pic.name)
      // let formDate = new FormData()
      // formDate.append(pic.name, pic)
      this.picName.push(pic)
      // console.log(pic)
    },
    purviewCheck (checkedNodes, checkedKeys) {
      console.log('101')
      console.log(checkedKeys.checkedNodes)
      let data = ''
      this.buildscopeDate = checkedKeys.checkedKeys
      for (let i = 0; i < checkedKeys.checkedNodes.length; i++) {
        data += checkedKeys.checkedNodes[i].areaname + ' '
        console.log(this.buildscope)
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
    },
    fireconboolean () {
      this.firecontrolBoolean = !this.firecontrolBoolean
    },
    conserve () {
      this.$emit('editt', this.Thispage)
      console.log(this.edit)
    },
    closedown () {
    }
  },
  created () {
    this.axios.post(`http://172.16.6.181:8920/projects/findAllDevType`).then((response) => {
      this.firecontrol = response.data
      console.log(this.firecontrol)
    })
    this.axios.post(`http://172.16.6.16:8920/areas/findAllAreaTrees`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.purview = response.data.data[0]
        console.log(this.purview)
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
        overflow hidden
        float left
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
</style>

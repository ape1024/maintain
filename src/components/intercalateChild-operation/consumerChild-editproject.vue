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
                <el-input size="mini" v-model="projectName" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目名称：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-date-picker
                  size="mini"
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
                <el-select size="mini" v-model="proprieTor" placeholder="请选择">
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
                <el-input size="mini" v-model="projectCode" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目编号：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-date-picker
                  size="mini"
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
                <el-select size="mini" v-model="proprietornameDate" @change="proprietornameChange" placeholder="请选择">
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
                <el-select size="mini" v-model="projectDate" multiple placeholder="请选择">
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
              <div @click.stop="firecontrolClick" class="firecontrol">
                {{buildscope}}
              </div>
              <div v-show="buildscopeBoolean" class="firecontrolDiv">
                <div class="firecontrolDiv_div">
                  <el-tree
                    :data="purview"
                    :props="purviewProps"
                    node-key="areaid"
                    ref="one"
                    :default-checked-keys=this.buildscopeDate
                    show-checkbox
                    @check="purviewCheck">
                  </el-tree>
                </div>
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
              <div v-show="firecontrolBoolean" class="firecontrolDiv">
                <div class="firecontrolDiv_div">
                  <el-tree
                    :default-checked-keys=this.firecontrolDate
                    :data="firecontrol"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    @check="firecontrolDateClick"
                    :props="firecontrolProps">
                  </el-tree>
                </div>
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
          <p class="headerP">组织机构</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDiv">
          <div class="substance">
            <div class="substanceDiv">
              <div @click.stop="organizeChange" class="firecontrol">
                {{organizeText}}
              </div>
              <div @click.stop v-show="organizeboolean" class="firecontrolDiv">
                <div class="firecontrolDiv_div">
                  <el-checkbox-group v-model="checkedCities">
                    <el-tree :data="organize" :props="organizeProps" node-key="id" :expand-on-click-node="false">
                      <div class="custom-tree-node" slot-scope="{ node, data }">
                        <el-checkbox :label="data.organizationId" @change="checkboxChange(data)" :disabled="data.disabled">{{checkboxDefaultVal}}</el-checkbox>
                        <div class="custom-tree-node-expand" @click="checkboxClick(node)">               {{data.organizationName}}</div>
                      </div>
                    </el-tree>
                    </el-checkbox-group>
                </div>
              </div>
            </div>
            <p class="substanceP">
              组织机构：
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
            size="mini"
            type="textarea"
            :rows="1"
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
            size="mini"
            type="textarea"
            :rows="1"
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
            size="mini"
            type="textarea"
            :rows="1"
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
            :action="uploadUrl"
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
        <div @click="conserve" class="conserve" v-loading.fullscreen.lock="fullscreenLoading">保存</div>
        <div @click="closedown" class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
import { getProjectDevices, increasefindAllDevType, increasegetWorkTypes, getProprietorOrganization, getRootOrganizationsNotProprietor, getCountiesByCityId, getCitiesByProvinceId, createOrUpdateProject, findAllRootAreasTree, upload, getOrganizationTreeTion } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  name: 'consumerChild-editproject',
  mixins: [projectMixin],
  props: ['edit', 'project'],
  data () {
    return {
      fullscreenLoading: false,
      //  范围 传给后台
      buildscopeDate: [],
      buildscope: '',
      buildscopeBoolean: false,
      regionUl: false,
      regionDate: '',
      //  省份
      province: '',
      firecontrolDData: [],
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
      //  项目名称
      projectName: '',
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
      arrayAddresses: [],
      uploadUrl: upload(JSON.parse(window.sessionStorage.token)),
      organizationtype: '', // 机构类型
      organizationDisable: false,
      organize: [],
      organizeText: '',
      organizeboolean: false,
      checkedCities: [],
      organizeProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      selectedAndActive: []
    }
  },
  methods: {
    checkboxChange (el) {
      //  label 关联整个对象 ,给每个对象加两个值, 一个控制其 是否选中 一个控制其 是否可选  通过这个对象来 筛选获取,id 和 name
      //  el-checkbox :label="data"
      el.selected = !el.selected
      el.subOrgnizations = this.resetTreeChildrenData(el.selected, el.subOrgnizations)
      // 显示文字
      // 发送给后台数据
      // 找到选中病可操作的数据
      // this.selectedAndActive = []
      this.checkboxText()
      // selected && !disabled
    },
    resetTreeChildrenData (flag, data) {
      if (!data) return []
      return data.map(t => {
        return {
          ...t,
          disabled: flag,
          subOrgnizations: this.resetTreeChildrenData(flag, t.subOrgnizations)
        }
      })
    },
    checkboxText () {
      this.selectedAndActive = []
      this.organizeText = ''
      let findata = (data) => {
        let flag = true
        data.forEach((data) => {
          if (data.selected && !data.disabled) {
            this.selectedAndActive.push(data.organizationId)
            flag = false
          } else if (flag && data.subOrgnizations) {
            findata(data.subOrgnizations)
          }
        })
      }
      findata(this.organize)
      let finText = (data, id) => {
        let flag = true
        data.forEach((data) => {
          if (data.organizationId === id) {
            this.organizeText += ` ${data.organizationName} `
            flag = false
          } else if (flag && data.subOrgnizations) {
            finText(data.subOrgnizations, id)
          }
        })
      }
      this.selectedAndActive.forEach((val) => {
        finText(this.organize, val)
      })
    },
    proprietornameChange (data) {
      this.axios.post(getOrganizationTreeTion(data)).then((response) => {
        if (response.data.code === 0) {
          if (!response.data.data) {
            this.organize = []
          } else {
            this.checkedCities = []
            this.organize = []
            this.organizeText = ''
            response.data.data = [response.data.data]
            let finData = (data) => {
              data.forEach((item) => {
                item.disabled = false
                item.selected = false
                if (data.subOrgnizations) {
                  finData(data.subOrgnizations)
                }
              })
            }
            finData(response.data.data)
            this.checkedCities = []
            this.organize = []
            this.organizeText = ''
            this.organize = response.data.data
          }
        }
      })
    },
    checkboxClick (data) {
      data.expanded = !data.expanded
    },
    organizeCheck (checkedNodes, checkedKeys) {
      let data = ''
      this.firecontrolDate = checkedKeys.checkedNodes
      for (let i = 0; i < checkedKeys.checkedNodes.length; i++) {
        if (checkedKeys.checkedNodes[i].parentFlag !== true) {
          data += checkedKeys.checkedNodes[i].name + ' '
        }
      }
      this.organizeText = data
    },
    firecontrolDateClick (checkedNodes, checkedKeys) {
      let data = ''
      this.firecontrolDate = checkedKeys.checkedNodes
      for (let i = 0; i < checkedKeys.checkedNodes.length; i++) {
        if (checkedKeys.checkedNodes[i].parentFlag !== true) {
          data += checkedKeys.checkedNodes[i].name + ' '
        }
      }
      this.firecontrolda = data
    },
    handlesuccess (response, file, fileList) {
      this.documentPapers.push({
        'name': `${file.name}`,
        'url': `${response.data}`
      })
    },
    handleRemove (file) {
      this.documentPapers.forEach((val, index) => {
        if (val.name === file.name) {
          this.documentPapers.splice(index, 1)
        }
      })
    },
    handlePreview (file) {
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
      this.organizeboolean = false
    },
    // 项目地址
    accessarea () {
      this.regionUl = !this.regionUl
      this.firecontrolBoolean = false
      this.buildscopeBoolean = false
      this.organizeboolean = false
    },
    // 合同范围
    firecontrolClick () {
      this.buildscopeBoolean = !this.buildscopeBoolean
      this.firecontrolBoolean = false
      this.regionUl = false
      this.organizeboolean = false
    },
    // 建筑范围
    fireconboolean () {
      this.firecontrolBoolean = !this.firecontrolBoolean
      this.buildscopeBoolean = false
      this.regionUl = false
      this.organizeboolean = false
    },
    // 组织机构
    organizeChange () {
      this.organizeboolean = !this.organizeboolean
      this.firecontrolBoolean = false
      this.buildscopeBoolean = false
      this.regionUl = false
    },
    conserve () {
      //  项目名称 项目开始 业主单位 项目编号 项目结束 服务机构 项目类别  建筑范围  消防设备
      if (this.projectName === '' || this.startdate === '' || this.proprieTor === '' || this.projectCode === '' || this.endDate === '' || this.proprietornameDate === '' || this.projectDate.length === 0 || this.buildscope === '' || this.firecontrolda === '') {
        this.$message({
          message: '您的信息没有填写完整',
          type: 'warning'
        })
        return false
      } else {
        this.$confirm('是否修改该项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.fullscreenLoading = true
          let token = window.JSON.parse(window.sessionStorage.token)
          let getCheckedNodes = this.$refs.one.getCheckedNodes()
          let areas = []
          getCheckedNodes.forEach((val) => {
            let obj = {
              areacode: val.areacode,
              areaid: val.areaid,
              areaname: val.areaname
            }
            areas.push(obj)
          })
          let getCheckedNodesData = this.$refs.tree.getCheckedNodes()
          let baseDevices = []
          getCheckedNodesData.forEach((val) => {
            if (!val.children) {
              let base = {
                'basedeviceid': val.id,
                'basedevicecode': val.code
              }
              baseDevices.push(base)
            }
          })
          let worktypes = []
          for (let i = 0; i < this.projectDate.length; i++) {
            let work = {
              'worktypeid': this.projectDate[i]
            }
            worktypes.push(work)
          }
          this.fileList.forEach((val) => {
            let obj = {
              'name': `${val.name}`,
              'url': `${val.url}`
            }
            this.documentPapers.push(obj)
          })
          let rp = {
            'areas': areas,
            'baseDevices': baseDevices,
            'files': this.documentPapers,
            'organizations': this.selectedAndActive,
            'project': {
              'enddate': `${this.endDate}`,
              'projectid': `${this.project.projectid}`,
              'proprietor': `${this.proprieTor}`,
              'startdate': `${this.startdate}`,
              'vindicator': `${this.proprietornameDate}`,
              'projectname': `${this.projectName}`,
              'projectcode': `${this.projectCode}`
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
          this.axios.post(createOrUpdateProject(token), rp).then((response) => {
            if (response.data.code === 0) {
              this.fullscreenLoading = false
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.$emit('editt', this.Thispage)
            }
          })
        })
      }
    },
    closedown () {
      this.$emit('editt', this.Thispage)
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
        this.axios.post(getCitiesByProvinceId(provinceid)).then((response) => {
          if (response.data.code === 0) {
            this.conurbation = response.data.data
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
        this.axios.post(getCountiesByCityId(countid)).then((response) => {
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
    //  获取项目设备
    this.buildscopeDate = this.edit.areaids
    this.projectDate = this.edit.workTypeids
    //  组织机构
    if (!this.edit.organization) {
      this.checkedCities = []
    } else {
      this.edit.organization.forEach((data) => {
        this.checkedCities.push(data.organizationid)
      })
    }
    //  服务机构
    this.proprietornameDate = this.edit.projectsinfosviewdetail.vindicatorid
    //  组织机构
    this.axios.post(getOrganizationTreeTion(this.proprietornameDate)).then((data) => {
      if (data.data.code === 0) {
        if (!data.data.data) {
          this.organize = []
          return false
        } else {
          this.organize = []
          data.data.data = [data.data.data]
          let finData = (data) => {
            data.forEach((item) => {
              item.disabled = false
              item.selected = false
              if (data.subOrgnizations) {
                finData(data.subOrgnizations)
              }
            })
          }
          finData(data.data.data)
          this.organize = data.data.data
          let Downwardslookup = (data) => {
            if (!data) return
            data.forEach((item) => {
              item.disabled = true
              Downwardslookup(item.subOrgnizations)
            })
          }
          let fainData = (data, val) => {
            let flag = true
            data.forEach((item) => {
              if (item.organizationId === val) {
                item.selected = true
                Downwardslookup(item.subOrgnizations)
              } if (flag && item.subOrgnizations) {
                fainData(item.subOrgnizations, val)
              }
            })
          }
          this.checkedCities.forEach((val) => {
            fainData(this.organize, val)
          })
          this.checkboxText()
        }
      }
    })
    //  建筑范围
    this.buildscope = this.edit.projectsinfosviewdetail.areas
    //  设备
    this.firecontrolda = this.edit.projectsinfosviewdetail.projectrange
    //  维保要求
    this.requirement = this.edit.projectsinfosviewdetail.requirement
    //  业主单位
    this.proprieTor = this.edit.projectsinfosviewdetail.proprietorid
    //  地址
    this.regionDate = this.edit.projectsinfosviewdetail.address
    //  维保内容
    this.conTent = this.edit.projectsinfosviewdetail.content
    //  备注
    this.comment = this.edit.projectsinfosviewdetail.comment
    //  项目名称
    this.projectName = this.edit.projectsinfosviewdetail.projectname
    //  项目code
    this.projectCode = this.edit.projectsinfosviewdetail.projectcode
    if (this.edit.filenames) {
      this.edit.filenames.forEach((val, index) => {
        let obj = {
          name: val,
          url: this.edit.fullnames[index]
        }
        this.fileList.push(obj)
      })
    }
    if (this.edit.devtypes) {
      this.edit.devtypes.forEach((val) => {
        val.children.forEach((data) => {
          this.firecontrolDate.push(data.id)
        })
      })
    }
    this.axios.post(getProjectDevices(this.project.projectid)).then((response) => {
      if (response.data.code === 0) {
        let data = response.data.data
        data.forEach((val) => {
          this.firecontrolDate.push(val.basedeviceid)
        })
      }
    })
    //  获取范围 默认值
    this.axios.post(findAllRootAreasTree()).then((response) => {
      if (response.data.code === 0) {
        this.purview = response.data.data
      }
    })

    this.axios.post(increasefindAllDevType()).then((response) => {
      this.firecontrol = response.data
    })
    this.axios.post(increasegetWorkTypes()).then((response) => {
      if (response.data.code === 0) {
        this.projectType = response.data.data
      }
    })
    //  服务机构
    this.axios.post(getRootOrganizationsNotProprietor()).then((response) => {
      if (response.data.code === 0) {
        this.proprietorName = response.data.data
      }
    })
    //  获取业主单位
    this.axios.post(getProprietorOrganization()).then((response) => {
      if (response.data.code === 0) {
        this.proprieTorDate = response.data.data
      }
    })
    // 定义空值
    this.checkboxDefaultVal = ''
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    padding 20px 0 20px
    margin-top 50px
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
        overflow-y auto
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
    .firecontrolDiv_div
      position relative
      line-height 24px
      margin 20px 10px
      overflow hidden
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
  .el-date-editor.el-input
    width 100%
  .information_Maintain:before
    content: ''
    width: 0
    height: 0
    border-top: 20px solid transparent
    border-right: 20px solid transparent
    border-bottom: 20px solid lightblue
    border-left: 20px solid transparent
    position: absolute
    left: 53%
    margin-top: -40px
  .information_Maintain-change:before
    content: ''
    width: 0
    height: 0
    border-top: 20px solid transparent
    border-right: 20px solid transparent
    border-bottom: 20px solid lightblue
    border-left: 20px solid transparent
    position: absolute
    left: 20%
    // top: 50%
    margin-top: -40px
  .information_Maintain:after
    content: ''
    width: 0
    height: 0
    border-top: 18px solid transparent
    border-top: 20px solid transparent
    border-right: 20px solid transparent
    border-bottom: 20px solid #111a28
    border-left: 20px solid transparent
    position: absolute
    left: 53%
    margin-top: -38px
  .information_Maintain-change:after
    content: ''
    width: 0
    height: 0
    border-top: 18px solid transparent
    border-top: 20px solid transparent
    border-right: 20px solid transparent
    border-bottom: 20px solid #111a28
    border-left: 20px solid transparent
    position: absolute
    left: 20%
    margin-top: -38px
  .firecontrolDiv_div
    position relative
    line-height 24px
    margin 20px 10px
    overflow hidden
    .custom-tree-node
      display flex
      .custom-tree-node-expand
        font-size 14px
</style>

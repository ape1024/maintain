<template>
  <div class="subject" @click="subjectClick">
    <div class="information" >
      <ul class="informationUl">
        <!--上级主管单位-->
        <li class="informationLi" v-show="dataRoot">
          <div class="informationDiv">
            <p class="informationP">
              <span class="structureSpan">*</span>上级主管单位：
            </p>
            <div class="companyContent">
              <el-cascader
                size="mini"
                :options="data"
                :props="defaultProps"
                change-on-select
                v-model="companyDate"
                @change="comchange">
              </el-cascader>
            </div>
          </div>
        </li>
        <!--组织机构类型 单位全称-->
        <li class="informationLitwo">
          <div class="informationDivtwo" v-show=" regimentaValue !== 4 &&  regimentaValue !== 5">
            <p class="informationP">
              <span class="structureSpan">*</span>单位全称：
            </p>
            <div class="content">
              <el-input size="mini" v-model="organizationname" placeholder="请输入单位名称"  clearable>></el-input>
            </div>
          </div>
          <div class="informationDivtwo" v-show=" regimentaValue === 4 ||  regimentaValue === 5">
            <p class="informationP">
              <span class="structureSpan">*</span>部门名称：
            </p>
            <div class="content">
              <el-input size="mini" v-model="organizationname" placeholder="请输入部门名称"  clearable>></el-input>
            </div>
          </div>
          <div class="informationDiv" v-show="dataRoot">
            <p class="informationP">
              <span class="structureSpan">*</span>组织机构类型：
            </p>
            <div class="content">
              <el-select size="mini"
                         v-model="regimentaValue" placeholder="请选择">
                <el-option
                  v-for="item in regimentation"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </li>
        <!--单位简称 单位编码-->
        <li class="informationLitwo" v-show="regimentaValue !== 4 && regimentaValue !== 5">
          <div class="informationDiv">
            <p class="informationP">
              单位简称：
            </p>
            <div class="content">
              <el-input size="mini" v-model="organizationshortname" placeholder="用于在系统中描述本单位"  clearable>></el-input>
            </div>
          </div>
          <div class="informationDivtwo">
            <p class="informationP">
              <span class="structureSpan">*</span>单位编码：
            </p>
            <div class="content">
              <el-input size="mini" v-model="encrypt" placeholder="请输入单位简称的大写首字母"  clearable>></el-input>
            </div>
          </div>
        </li>
        <!--所在区域 所在地址-->
        <li class="informationLifive">
          <div class="informationDiv">
            <p class="informationP">
              所在区域：
            </p>
            <div class="content" tabindex="0" @blur="blur">
              <div @click.stop="accessarea" class="region" >
                {{regionDate}}
              </div>
              <ul v-if="regionUl" class="region_ul">
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
              <el-input size="mini" v-model="address" placeholder="请输入地址"  clearable>></el-input>
            </div>
          </div>
        </li>
        <!--专业类别 业务范围-->
        <li class="informationLitwo" v-show=" regimentaValue !== 4 &&  regimentaValue !== 5">
          <div class="informationDiv">
            <p class="informationP">
              专业类别：
            </p>
            <div class="content">
              <el-cascader
                size="mini"
                @change="getLevels"
                :options="business"
                :props="categoryProps"
                v-model="businessOptions">
              </el-cascader>
            </div>
          </div>
          <div class="informationDivtwo">
            <p class="informationP">
              业务范围：
            </p>
            <div class="content">
              <div class="content">
                <el-input size="mini" :disabled="true" v-model="businessCategoryDataString" placeholder="" :title="businessCategoryDataString" ></el-input>
                <el-cascader
                  v-show="false"
                  size="mini"
                  placeholder=""
                  :disabled="true"
                  :options="category"
                  :props="rangeProps"
                  v-model="businessCategoryData">
                </el-cascader>
              </div>
            </div>
          </div>
        </li>
        <!--资质等级 资质编号-->
        <li class="informationLitwo" v-show=" regimentaValue !== 4 &&  regimentaValue !== 5">
          <div class="informationDiv">
            <p class="informationP">
              资质等级：
            </p>
            <div class="content">
              <el-cascader
                @change="levelChange"
                size="mini"
                :disabled="levelFlag"
                :options="category"
                :props="categoryProps"
                v-model="selectedOptions">
              </el-cascader>
            </div>
          </div>
          <div class="informationDivtwo">
            <p class="informationP">
              资质编号：
            </p>
            <div class="content">
              <el-input size="mini" v-model="identifier" placeholder="请输入资质编号"  clearable>></el-input>
            </div>
          </div>
        </li>
        <!--单位联系人 联系人手机-->
        <li class="informationLitwo">
          <div class="informationDiv">
            <p class="informationP">
              <span class="structureSpan">*</span>单位联系人：
            </p>
            <div class="content">
              <el-input size="mini" v-model="linkman" placeholder="请输入联系人"  clearable>></el-input>
            </div>
          </div>
          <div class="informationDivtwo">
            <p class="informationP">
              <span class="structureSpan">*</span>联系人手机：
            </p>
            <div class="content">
              <el-input size="mini" v-model="CellPhone" placeholder="请输入联系人手机"  clearable>></el-input>
            </div>
          </div>
        </li>
        <!--上传图标-->
        <li class="informationLithree" v-show=" regimentaValue !== 4 &&  regimentaValue !== 5">
          <div class="informationDivthree">
            <p class="informationP">
              组织机构图标：
            </p>
            <div class="contenttwo">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrlData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </li>
        <!--备注说明-->
        <li class="informationLithree">
          <div class="informationDivthree">
            <p class="informationP">
              备注说明：
            </p>
            <div class="contentthree">
              <el-input
                size="mini"
                type="textarea"
                :rows="3"
                placeholder=""
                resize="none"
                v-model="textarea">
              </el-input>
            </div>
          </div>
        </li>
        <!--操作按钮-->
        <li class="informationLifour">
          <div v-show="conserveBoolean" @click="conserve" class="conserve">
            保存
          </div>
          <div v-show="!conserveBoolean" @click="newConserve" class="conserve">
            新增保存
          </div>
          <div v-show="conserveBoolean" class="amputateDIv" @click="amputate">
            删除
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import {managementAuthority, getAllHigherOrgIDs, managementCreatedProvince, managementhandleNodeClickTwo, getCitiesByProvinceId, getCountiesByCityId, managementCreatedbusiness, managementCreatedorganization, getIndustrycategory, upload, organizationDelete, managementhandleNodeClickOne, getLevelsByProfessionalCategory, getOrganizationTrees} from '../../api/user'
export default {
  props: {
    info: {
      organization: Object,
      required: true
    }
  },
  watch: {
    info (data) {
      if (data.organizationId === '') {
        this.conserveBoolean = false
        this.dataRoot = true
        if (data.organization.organizationType === 1 || data.organization.organizationType === 2) {
          this.regimentaValue = ''
        } else {
          this.regimentaValue = data.organization.organizationType // 组织类别
        }
        if (this.regimentaValue === 5 || this.regimentaValue === 4) {
          this.regimentation = this.initRegimentation.filter(t => t.value !== 3)
        } else {
          this.regimentation = [...this.initRegimentation]
        }
        // 初始化
        this.ormatting()
      } else {
        this.ownerType = data.organization.organizationType
        this.conserveBoolean = true
        const organizationId = data.organizationId
        this.DataorganizationId = data.organizationId
        if (data.organization.root) {
          this.dataRoot = false
        } else {
          this.dataRoot = true
        }
        this.organizationId = organizationId
        const url = managementhandleNodeClickOne(organizationId)
        const urlTwo = managementhandleNodeClickTwo(organizationId)
        // 优先判断上级组织机构改变事件
        this.getSuperiorOrganization(organizationId)
        this.changeType(organizationId)
        this.axios.post(urlTwo).then((response) => {
          let urlDate = response.data.data
          if (!urlDate) {
            this.address = ''
            this.textarea = ''
            this.identifier = ''
            this.CellPhone = ''
            this.businessOptions = []
            this.categoryfireFightingData = ''
            this.superVisionData = ''
            return false
          }
          // 专业类别
          this.businessOptions = []
          if (!urlDate.professionalcategory) {
            this.businessOptions = []
          } else {
            this.businessOptions.push(urlDate.professionalcategory)
            this.getLevels(urlDate.professionalcategory)
          }
          // 资质等级
          if (!urlDate.level) {
            this.selectedOptions = []
          } else {
            this.selectedOptions.push(urlDate.level)
            this.businessCategoryData.push(urlDate.level)
          }
          // 所在地址
          this.address = urlDate.address
          // 资质编号
          this.identifier = !urlDate.qualificationnumber ? '' : urlDate.qualificationnumber
          // 联系人
          this.linkman = urlDate.linkman
          // 电话
          this.CellPhone = !urlDate.tel ? '' : urlDate.tel
          // 备注信息
          this.textarea = !urlDate.memo ? '' : urlDate.memo
        })
        this.axios.post(url).then((response) => {
          let urlData = JSON.parse(response.data.data)
          // 图标
          this.imageUrl = urlData.icon.indexOf('null') === -1 ? urlData.icon : ''
          this.imageUrlTwo = ''
          // 所在区域
          this.regionDate = urlData.pcc
          // 单位简称
          this.organizationshortname = urlData.organizationshortname === 'undefined' ? '' : urlData.organizationshortname
          // 单位编码
          this.encrypt = urlData.organizationcode
          // 组织机构名称
          this.organizationname = urlData.organizationname === 'undefined' ? '' : urlData.organizationname
          // 组织类型
          if (data.organizationType === 1 || data.organizationType === 2) {
            this.regimentaValue = ''
          } else {
            this.regimentaValue = urlData.organizationtype
          }
          // 判断是否是根节点单位
          // 省份
          this.provinceId = urlData.provinceid
          // 省下的市
          this.conurbationId = urlData.cityid
          // 县城
          this.countytownId = urlData.countyid
          // 父级id
          this.parentid = urlData.parentid
        })
      }
    }
  },
  data () {
    return {
      // 上级单位
      data: [],
      defaultProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      // 上级主管单位
      companyDate: [],
      // 单位名称
      projectName: '',
      // 组织id
      organizationId: '',
      // 单位简称
      organizationshortname: '',
      // 单位编码
      encrypt: '',
      // 所在区域
      region: '',
      // 所在地址
      address: '',
      // 资质类别
      category: [],
      // 专业类别
      business: [],
      // 业务类别获取
      businessOptions: [],
      // 业务范围
      businessCategoryData: [],
      businessCategoryDataString: '',
      // 资质编号
      identifier: '',
      // 单位联系人
      linkman: '',
      // 联系人手机
      CellPhone: '',
      // 图标
      filelistDate: '',
      // 组织机构图标
      fileList: [],
      // 判断区域ul 是否存在
      regionUl: false,
      // 省份
      province: '',
      // 省份下所有的城市
      conurbation: '',
      // 县城/区
      countytown: '',
      // 省份ID
      provinceId: '',
      // 城市ID
      conurbationId: '',
      // 县城ID
      countytownId: '',
      // 展示用户选取的地区
      regionDate: '',
      // 组织机构名称
      organizationname: '',
      // 组织机构类型
      regimentation: [],
      regimentaValue: '',
      // 资质等级
      selectedOptions: [],
      categoryProps: {
        label: 'name',
        value: 'value'
      },
      // 业务范围
      rangeProps: {
        label: 'stringValue',
        value: 'value'
      },
      // 组织机构图片
      imageUrl: '',
      // 上传
      uploadUrlData: upload(JSON.parse(window.sessionStorage.token)),
      // 备注说明
      textarea: '',
      // 是否是新增保存
      conserveBoolean: true,
      // 是否可以选择资质等级
      levelFlag: true,
      dataRoot: true,
      // 用于删除组织
      DataorganizationId: ''
    }
  },
  methods: {
    subjectClick () {
      this.firecontrolBoolean = false
      this.buildscopeBoolean = false
      this.regionUl = false
    },
    // 上级单位变化事件
    comchange (data) {
      if (!data.length) return
      const organizationId = data[data.length - 1]
      this.changeType(organizationId)
    },
    // 判断是否显示单位类别
    changeType (organizationId) {
      this.axios.post(managementhandleNodeClickOne(organizationId)).then((response) => {
        if (response.data.code === 0) {
          let organization = JSON.parse(response.data.data)
          if (organization.organizationtype === 5 || organization.organizationtype === 4) {
            this.regimentation = this.initRegimentation.filter(t => t.value !== 3)
            this.regimentaValue = 4
          } else {
            this.regimentation = [...this.initRegimentation]
            this.regimentaValue = 3
          }
        }
      })
    },
    // 失去焦点
    blur () {
      this.regionUl = false
    },
    accessarea () {
      this.regionUl = !this.regionUl
    },
    // 资质等级改变事件
    levelChange (data) {
      this.businessCategoryData = data
      this.businessCategoryDataString = this.category.filter(t => t.value === data[0])[0].stringValue
    },
    // 省份点击事件
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
    // 城市点击事件
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
    // 省份
    provinceSpan (event, provincename) {
      //  直接选择省份
      this.regionDate = provincename.provincename
      this.provinceId = provincename.provinceid
      // 清空城市 县城信息
      this.conurbationId = ''
      this.countytownId = ''
    },
    // 城市
    citySpan (event, cityDate) {
      let cout = $(event.currentTarget).parents('.region_li').children('.provinceSpan').text()
      let city = cityDate.cityname
      let url = `${cout} ${city}`
      this.regionDate = url
      //  城市ID
      this.conurbationId = cityDate.cityid
      //  省份id
      this.provinceId = cityDate.provinceid
      // 清空县城
      this.countytownId = ''
    },
    // 县城
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
    },
    // 新增的确认
    newConserve () {
      // 点击保存
      const token = JSON.parse(window.sessionStorage.token)
      // 组织类型
      let organizationtype = this.regimentaValue
      if (organizationtype === '') {
        this.$message({
          message: '组织机构类型不能为空',
          type: 'warning'
        })
        return
      }
      // 区县
      const countyid = this.countytownId === undefined ? '' : this.countytownId
      // 城市
      const city = this.conurbationId === undefined ? '' : this.conurbationId
      // 省
      const province = !this.provinceId ? '' : this.provinceId
      // 单位编码
      const organizationcode = this.encrypt
      if (!organizationcode && organizationtype === 3) {
        this.$message({
          message: '请填写单位编码',
          type: 'warning'
        })
        return false
      }
      // 单位名称
      const organizationname = this.organizationname
      // 组织缩写
      const organizationshortname = !this.organizationshortname ? this.organizationname : this.organizationshortname
      // 详细地址
      const address = this.address === undefined ? '' : this.address
      // 专业类别
      let professionalcategory = !this.businessOptions[0] ? '' : this.businessOptions[0]
      let scope = !this.grading ? '' : this.grading
      // 组织机构的父节点ID  目前没有
      // 资质等级  level
      const level = !this.selectedOptions[0] ? '' : this.selectedOptions[0]
      // 资质编号
      const qualificationnumber = !this.identifier ? '' : this.identifier
      // 联系人
      const linkman = !this.linkman ? '' : this.linkman
      // 联系电话
      const tel = !this.CellPhone ? '' : this.CellPhone
      // 图标
      let file = this.imageUrlTwo === '' ? this.imageUrl : this.imageUrlTwo
      // 备注
      const memo = !this.textarea ? '' : this.textarea
      // 新建组织id 可以为空
      let organization = ''
      let fireBrigadeId = ''
      let fireControlCategoryId = ''
      let industryCategoryId = ''
      //  父级的id
      let parentid = ''
      if (this.companyDate.length === 0) {
        parentid = ''
      } else {
        parentid = this.companyDate[this.companyDate.length - 1]
      }
      this.axios.post(managementAuthority(token, organizationtype, fireBrigadeId, fireControlCategoryId, industryCategoryId, file, organization, parentid, countyid, city, province, organizationcode, organizationname, organizationshortname, address, professionalcategory, scope, level, qualificationnumber, linkman, tel, memo)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.$emit('refresh')
        }
      })
    },
    // 修改确认
    conserve () {
      // 点击保存
      const token = JSON.parse(window.sessionStorage.token)
      // 组织编号
      const organization = this.organizationId
      if (organization === '') {
        this.$message({
          message: '请选择组织机构',
          type: 'warning'
        })
        return false
      }
      // 组织类型
      let organizationType = ''
      if (this.ownerType !== 1 && this.ownerType !== 2) {
        organizationType = this.regimentaValue
        if (organizationType === '') {
          this.$message({
            message: '组织机构类型不能为空',
            type: 'warning'
          })
          return false
        }
      } else {
        organizationType = this.ownerType
      }
      // 区县
      const countyid = this.countytownId === undefined ? '' : this.countytownId
      // 城市
      const city = this.conurbationId === undefined ? '' : this.conurbationId
      // 省
      const province = !this.provinceId ? '' : this.provinceId
      // 单位编码
      const organizationcode = this.encrypt
      if (!organizationcode && organizationType === 3) {
        this.$message({
          message: '请填写单位编码',
          type: 'warning'
        })
        return false
      }
      // 单位名称
      const organizationname = this.organizationname
      // 组织缩写
      const organizationshortname = !this.organizationshortname ? this.organizationname : this.organizationshortname
      // 详细地址
      const address = this.address === undefined ? '' : this.address
      // 专业类别
      let professionalcategory = !this.businessOptions[0] ? '' : this.businessOptions[0]
      let scope = !this.grading ? '' : this.grading
      // 组织机构的父节点ID  目前没有
      // 资质等级  level
      const level = !this.selectedOptions[0] ? '' : this.selectedOptions[0]
      // 资质编号
      const qualificationnumber = !this.identifier ? '' : this.identifier
      // 联系人
      const linkman = !this.linkman ? '' : this.linkman
      // 联系电话
      const tel = !this.CellPhone ? '' : this.CellPhone
      // 图标
      let file = this.imageUrlTwo === '' ? this.imageUrl : this.imageUrlTwo
      // 备注
      const memo = !this.textarea ? '' : this.textarea

      let fireBrigadeId = ''
      let fireControlCategoryId = ''
      let industryCategoryId = ''
      // 父级的id
      let parentid = ''
      if (this.companyDate.length === 0) {
        parentid = ''
      } else {
        parentid = this.companyDate[this.companyDate.length - 1]
      }
      this.axios.post(managementAuthority(token, organizationType, fireBrigadeId, fireControlCategoryId, industryCategoryId, file, organization, parentid, countyid, city, province, organizationcode, organizationname, organizationshortname, address, professionalcategory, scope, level, qualificationnumber, linkman, tel, memo)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('refresh')
        }
      })
    },
    // 删除
    amputate () {
      // 点击删除
      this.$confirm('是否删除此组织?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.DataorganizationId) {
          this.$message({
            message: '请选择结构组织',
            type: 'warning'
          })
        } else {
          this.axios.post(organizationDelete(this.DataorganizationId)).then((response) => {
            if (response.data.code === 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              // 刷新
              this.$emit('refresh')
            } else {
              this.$message.error('删除失败')
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 上传前校验
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图标上传成功
    handleAvatarSuccess (response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrlTwo = response.data
    },
    getLevels (data) {
      // 清空业务范围
      this.businessCategoryData = []
      // 清空专业类别
      this.selectedOptions = []
      // 专业类别
      this.levelFlag = false
      const Createdcategory = getLevelsByProfessionalCategory(data)
      this.axios.post(Createdcategory).then((response) => {
        if (response.data.code === 0) {
          this.category = response.data.data
        }
      })
    },
    // 获取专业类别
    getProfessional () {
      // 专业类别
      const Createdbusiness = managementCreatedbusiness()
      this.axios.post(Createdbusiness).then((response) => {
        if (response.data.code === 0) {
          this.business = response.data.data
        }
      })
    },
    // 获取上级单位
    getSuperiorOrganization (organizationId) {
      this.axios.post(getAllHigherOrgIDs(organizationId)).then((response) => {
        this.companyDate = []
        if (response.data.code === 0) {
          if (response.data.data.length <= 1) {
            this.companyDate = []
          } else {
            let data = response.data.data
            data.pop()
            this.companyDate = data
          }
        }
      })
    },
    // 初始化
    ormatting () {
      this.organizationshortname = ''
      this.organizationname = ''
      this.imageUrl = ''
      this.imageUrlTwo = ''
      this.categoryfireFightingData = ''
      // 业务范围
      this.businessCategoryData = []
      this.superVisionData = ''
      this.companyDate = []
      this.abbreviation = ''
      this.encrypt = ''
      this.regionDate = ''
      this.address = ''
      this.selectedOptions = []
      this.businessOptions = []
      this.identifier = ''
      this.linkman = ''
      this.CellPhone = ''
      this.fileList = []
      this.textarea = ''
      this.organization = ''
      this.conserveBoolean = false
      this.businessCategoryDataString = ''
    },
    getOrganizationTree (token) {
      // 左边的树状结构
      this.axios.post(getOrganizationTrees(token)).then((response) => {
        if (response.data.code === 0) {
          this.data = response.data.data
        }
      })
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.getOrganizationTree(token)
    this.getProfessional()
    // 组织类别
    const Createdorganization = managementCreatedorganization(token)
    this.axios.post(Createdorganization).then((response) => {
      let regimentaDate = response.data.data
      // 给组织类别赋值
      this.initRegimentation = regimentaDate
      // regimentaDate
      this.regimentation = [...this.initRegimentation]
    })
    // 行业类别
    this.axios.post(getIndustrycategory()).then((response) => {
      if (response.data.code === 0) {
        this.businessCategory = response.data.data
      }
    })
    // 省份
    const CreatedProvince = managementCreatedProvince()
    this.axios.post(CreatedProvince).then((response) => {
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
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 30px
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
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      height 840px
      background rgba(000,000,000,.47)
      overflow hidden
      position relative
      padding-right 59px
      padding-left 50px
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
  .information
    width 900px
    overflow hidden
    margin 30px auto
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
        margin-bottom 36px
      .informationDivtwo
        overflow hidden
        position relative
        float right
        margin-bottom 36px
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
        height 100px
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
  .avatar-uploader .el-upload
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden
  .avatar-uploader .el-upload:hover
    border-color #409EFF
  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 100px
    height 100px
    line-height 100px
    text-align center
  .companyContent
    false left
    overflow hidden
    width 770px
  .amputateDIv
    amputateDIv()
    margin-left 20px
  .structureSpan
    color #dd514c
</style>

<template>
    <div @click="shutdown" class="subject">
      <section class="subjectLeft">
        <header class="leftHeader">
          <img class="subjectImg" src="../../common/img/department.png" alt="">
          <p class="subjectP">组织机构</p>
          <p v-if="JurisdictionInsert" @click="subjectpCreate" class="subjectptwo">新增</p>
        </header>
        <div class="leftBottom">
          <div class="leftBottomDiv">
            <el-tree node-click="changClick"
                     :data="data"
                     :props="defaultProps"
                     highlight-current
                     @node-click="handleNodeClick">
            </el-tree>
          </div>
        </div>
      </section>
      <section class="subjectRight">
        <div v-if="amputateStr" class="subjectRightDiv">
        </div>
        <div class="information">
          <!--1-->
          <!--维保单位-->
          <ul v-show="handoverClass === 1" class="informationUl">
            <li class="informationLi">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>上级主管单位：
                </p>
                <div v-if="dataRoot" class="companyContent">
                  <el-cascader
                    size="mini"
                    :options="data"
                    :props="defaultProps"
                    change-on-select
                    v-model="companyDate"
                    @change="comchange"
                  ></el-cascader>
                </div>
                <div v-if="!dataRoot" class="companyContent">
                  <el-input
                    size="mini"
                    v-model="dataRootInput"
                    :disabled="true">
                  </el-input>
                </div>
              </div>
            </li>
            <!--所在区域-->
            <li class="informationLifive">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>所在区域：
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
                  <span class="structureSpan">*</span>所在地址：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="address" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--单位简称-->
            <li class="informationLitwo" v-show="dataRoot">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>部门名称：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="organizationname" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  <span class="structureSpan">*</span>组织类别：
                </p>
                <div class="content">
                  <el-select size="mini" v-model="regimentaValue" placeholder="请选择">
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
            <!--专业类别-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  专业类别：
                </p>
                <div class="content">
                  <el-cascader
                    size="mini"
                    :options="business"
                    :props="categoryProps"
                    v-model="businessOptions"
                    @change="handleChange">
                  </el-cascader>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  业务类别：
                </p>
                <div class="content">
                  <el-select size="mini" v-model="businessCategoryData" placeholder="请选择">
                    <el-option
                      v-for="item in businessCategory"
                      :key="item.industrycategoryid"
                      :label="item.industrycategoryname"
                      :value="item.industrycategoryid">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <!--资质等级-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  资质等级：
                </p>
                <div class="content">
                  <el-cascader
                    size="mini"
                    :options="category"
                    :props="categoryProps"
                    v-model="selectedOptions"
                    @change="handleChange">
                  </el-cascader>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  资质编号：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="identifier" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--单位联系人-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>单位联系人：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="linkman" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  <span class="structureSpan">*</span>联系人手机：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="CellPhone" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--上传图标-->
            <li class="informationLithree">
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
          <!--业主单位-->
          <ul v-show="handoverClass === 2" class="informationUl">
            <li class="informationLi">
              <div class="informationDiv">
                <p class="informationP">
                  上级主管单位：
                </p>
                <div v-if="dataRoot" class="companyContent">
                  <el-cascader
                    size="mini"
                    :options="data"
                    :props="defaultProps"
                    change-on-select
                    v-model="companyDate"
                    @change="comchange"
                  ></el-cascader>
                </div>
                <div v-if="!dataRoot" class="companyContent">
                  <el-input
                    size="mini"
                    v-model="dataRootInput"
                    :disabled="true">
                  </el-input>
                </div>
              </div>
            </li>
            <!--组织机构名称-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>组织机构名称：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="organizationname" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  单位简称：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="organizationshortname" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--单位简称-->
            <li class="informationLitwo">
              <div class="informationDivtwo">
                <p class="informationP">
                  <span class="structureSpan">*</span>组织类别：
                </p>
                <div class="content">
                  <el-select size="mini" v-model="regimentaValue" placeholder="请选择">
                    <el-option
                      v-for="item in regimentation"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>单位编码：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="encrypt" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--所在区域-->
            <li class="informationLifive">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>所在区域：
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
                  <span class="structureSpan">*</span>所在地址：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="address" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">消防监管机构:</p>
                <div class="content">
                  <el-select size="mini" v-model="superVisionData" placeholder="请选择">
                    <el-option
                      v-for="item in supervision"
                      :key="item.firebrigadeid"
                      :label="item.firebrigadename"
                      :value="item.firebrigadeid">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">消防单位类别</p>
                <div class="content">
                  <el-select size="mini" v-model="categoryfireFightingData" placeholder="请选择">
                    <el-option
                      v-for="item in categoryfireFighting"
                      :key="item.firecontrolcategoryid"
                      :label="item.firecontrolcategoryname"
                      :value="item.firecontrolcategoryid">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <!--单位联系人-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>单位联系人：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="linkman" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  <span class="structureSpan">*</span>联系人手机：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="CellPhone" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--上传图标-->
            <li class="informationLithree">
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
          <!--部门-->
          <ul v-show="handoverClass !== 1 && handoverClass !== 2" class="informationUl">
            <li class="informationLi">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>上级主管单位：
                </p>
                <div v-if="dataRoot" class="companyContent">
                  <el-cascader
                    size="mini"
                    :options="data"
                    :props="defaultProps"
                    change-on-select
                    v-model="companyDate"
                    @change="comchange"
                  ></el-cascader>
                </div>
                <div v-if="!dataRoot" class="companyContent">
                  <el-input
                    size="mini"
                    v-model="dataRootInput"
                    :disabled="true">
                  </el-input>
                </div>
              </div>
            </li>
            <!--组织机构名称-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>组织机构名称：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="organizationname" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  单位简称：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="organizationshortname" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--单位简称-->
            <li class="informationLitwo">
              <div class="informationDivtwo">
                <p class="informationP">
                  <span class="structureSpan">*</span>组织类别：
                </p>
                <div class="content">
                  <el-select size="mini" v-model="regimentaValue" placeholder="请选择">
                    <el-option
                      v-for="item in regimentation"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="informationDiv">
                <p class="informationP">
                  <span class="structureSpan">*</span>单位编码：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="encrypt" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--单位联系人-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">
                  单位联系人：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="linkman" placeholder=""  clearable>></el-input>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">
                  联系人手机：
                </p>
                <div class="content">
                  <el-input size="mini" v-model="CellPhone" placeholder=""  clearable>></el-input>
                </div>
              </div>
            </li>
            <!--所在区域-->
            <li class="informationLitwo">
              <div class="informationDiv">
                <p class="informationP">消防监管机构:</p>
                <div class="content">
                  <el-select size="mini" v-model="superVisionData" placeholder="请选择">
                    <el-option
                      v-for="item in supervision"
                      :key="item.firebrigadeid"
                      :label="item.firebrigadename"
                      :value="item.firebrigadeid">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="informationDivtwo">
                <p class="informationP">消防单位类别</p>
                <div class="content">
                  <el-select size="mini" v-model="categoryfireFightingData" placeholder="请选择">
                    <el-option
                      v-for="item in categoryfireFighting"
                      :key="item.firecontrolcategoryid"
                      :label="item.firecontrolcategoryname"
                      :value="item.firecontrolcategoryid">
                    </el-option>
                  </el-select>
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
            <li class="informationLifour">
              <div v-show="conserveBoolean&&JurisdictionUpdate" @click="conserve" class="conserve">
                保存
              </div>
              <div v-show="!conserveBoolean" @click="newConserve" class="conserve">
                新增保存
              </div>
              <div v-show="conserveBoolean&&JurisdictionDelete" class="amputateDIv" @click="amputate">
                删除
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
import {managementAuthority, managementhandleNodeClickOne, managementhandleNodeClickTwo, managementCreatedtree, managementCreatedProvince, managementCreatedcategory, managementCreatedbusiness, managementCreatedorganization, getFirebrigades, getFirecontrolcategory, getIndustrycategory, getCitiesByProvinceId, getCountiesByCityId, getAllHigherOrgIDs, organizationDelete, upload, getOrganizationTrees} from '../../api/user'
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
      organizationdata: [],
      amputateStr: true,
      selectedOptions: [],
      data: [],
      specialty: [],
      textarea: '',
      //  专业类别遍历
      categoryDate: '',
      defaultProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      popupBoolean: false,
      memberBoolean: false,
      bluepencilBoolean: false,
      copyBoolean: false,
      //  保存于新增保存
      conserveBoolean: true,
      //  上级主管单位
      companyDate: [],
      //  单位名称
      projectName: '',
      //  组织id
      organizationId: '',
      //  单位简称
      organizationshortname: '',
      //  单位编码
      encrypt: '',
      //  所在区域
      region: '',
      //  所在地址
      address: '',
      //  专业类别
      category: [],
      //  业务类别
      business: [],
      //  业务类别获取
      businessOptions: [],
      //  资质等级
      grading: '',
      //  资质编号
      identifier: '',
      //  单位联系人
      linkman: '',
      //  联系人手机
      CellPhone: '',
      //  图标
      filelistDate: '',
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
      //  组织机构名称
      organizationname: '',
      //  设备类别
      regimentation: [],
      regimentaValue: '',
      //  父级id 保存使用
      parentid: '',
      structureDate: {
        label: '',
        personnel: ''
      },
      categoryProps: {
        label: 'name',
        value: 'value'
      },
      //  组织类别切换
      classification: true,
      imageUrl: '',
      imageUrlTwo: '',
      supervision: '',
      superVisionData: '',
      categoryfireFighting: '',
      categoryfireFightingData: '',
      businessCategory: '',
      businessCategoryData: '',
      JurisdictionApproval: '',
      JurisdictionUpdate: '',
      DataorganizationId: '',
      uploadUrlData: upload(JSON.parse(window.sessionStorage.token)),
      dataRoot: false,
      dataRootInput: '',
      handoverClass: '',
      identificationVariable: '',
      JurisdictionInsert: '',
      JurisdictionDelete: ''
    }
  },
  watch: {
    regimentaValue (val) {
      if (val !== 3) {
        this.handoverClass = this.identificationVariable
        return
      }
      this.handoverClass = val
    }
  },
  methods: {
    // 上级单位变化事件
    comchange (data) {
      if (!data.length) return
      const organizationId = data[data.length - 1]
      this.axios.post(managementhandleNodeClickOne(organizationId)).then((response) => {
        if (response.data.code === 0) {
          let organization = JSON.parse(response.data.data)
          console.log(organization)
          if (organization.organizationtype === 1) {
            this.regimentaValue = ''
          }
          if (organization.organizationtype === 5 || this.organizationtype === 4) {
            this.regimentation = this.initRegimentation.filter(t => t.value !== 3)
          } else {
            this.regimentation = [...this.initRegimentation]
          }
        }
      })
    },
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
    handleAvatarSuccess (response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrlTwo = response.data
    },
    subjectpCreate () {
      //  点击新增
      this.axios.post(getAllHigherOrgIDs(this.organizationdata.organizationId)).then((response) => {
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
      if (this.organizationdata.organizationType === 1) {
        this.regimentaValue = ''
      } else {
        this.regimentaValue = this.organizationdata.organizationType // 组织类别
      }
      if (this.regimentaValue === 5 || this.regimentaValue === 4) {
        this.regimentation = this.initRegimentation.filter(t => t.value !== 3)
      } else {
        this.regimentation = [...this.initRegimentation]
      }
      this.dataRoot = true
      this.amputateStr = false
      this.ormatting()
    },
    // 新增的确认
    newConserve () {
      // 备注
      let memo = this.textarea
      //  点击新增保存
      let token = JSON.parse(window.sessionStorage.token)
      //  类型
      let organizationtype = this.regimentaValue
      if (organizationtype === '') {
        this.$message({
          message: '组织类型不能为空',
          type: 'warning'
        })
        return
      }
      //  *单位编码
      let organizationcode = this.encrypt
      //  *单位名称
      let organizationname = this.organizationname
      //  详细地址
      let address = this.address
      //  专业类别
      let professionalcategory = !this.businessOptions[0] ? '' : this.businessOptions[0]
      //  资质等级
      let level = ''
      if (this.selectedOptions.length !== 0) {
        level = parseInt(this.selectedOptions)
      } else {
        level = ''
      }
      //  资质编号
      let qualificationnumber = this.identifier
      //  联系人
      let linkman = !this.linkman ? '' : this.linkman
      //  联系人手机
      let tel = !this.CellPhone ? '' : this.CellPhone

      //  图片
      // let file = this.Headportrait
      //  消防监管机构
      let firebrigadeid = this.superVisionData
      //   消防单位类别
      let firecontrolcategoryid = this.categoryfireFightingData
      //  业务类别
      let industrycategoryid = this.businessCategoryData
      //  url
      //  图片
      let file = this.imageUrlTwo
      //  新建组织id 可以为空
      let organization = ''
      //  父级组织id 为空
      let parentid = this.companyDate.length !== 0 ? this.companyDate[this.companyDate.length - 1] : ''
      //  区县
      const countyid = !this.countytownId ? '' : this.countytownId
      //  城市
      const city = !this.conurbationId ? '' : this.conurbationId
      //  省
      const province = !this.provinceId ? '' : this.provinceId
      //  组织缩写
      const organizationshortname = !this.organizationshortname ? this.organizationname : this.organizationshortname
      let scope = !this.grading ? '' : this.grading
      const url = managementAuthority(token, organizationtype, firebrigadeid, firecontrolcategoryid, industrycategoryid, file, organization, parentid, countyid, city, province, organizationcode, organizationname, organizationshortname, address, professionalcategory, scope, level, qualificationnumber, linkman, tel, memo)
      let commitflag = false
      // 判断如果是部门，单位编码可以为空
      if (organizationtype === 4 || organizationtype === 5) {
        if (organizationname !== '') {
          commitflag = true
        }
      } else {
        if (organizationcode !== '' && organizationname !== '') {
          commitflag = true
        }
      }
      if (commitflag) {
        this.axios.post(url).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.ormatting()
            this.amputateStr = true
            this.axios.post(managementCreatedtree(token)).then((response) => {
              if (response.data.code === 0) {
                this.data = response.data.data
              }
            })
            //  获取到 对应的数组
          } else if (response.data.code === -1) {
            this.$message({
              message: response.data.message,
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          message: '红色星号标记不能为空！',
          type: 'warning'
        })
      }
    },
    // 修改确认
    conserve () {
      if (this.JurisdictionUpdate === false) {
        return false
      }
      //  点击保存
      const token = JSON.parse(window.sessionStorage.token)
      //  组织id
      const organization = this.organizationId
      if (organization === '') {
        this.$message({
          message: '请选择结构组织',
          type: 'warning'
        })
        return false
      }
      //  组织节点parentid
      //  组织类型
      const organizationtype = this.regimentaValue
      if (organizationtype === '') {
        this.$message({
          message: '请选择组织机构',
          type: 'warning'
        })
        return false
      }
      //  区县
      const countyid = this.countytownId === undefined ? '' : this.countytownId
      //  城市
      const city = this.conurbationId === undefined ? '' : this.conurbationId
      //  省
      const province = !this.provinceId ? '' : this.provinceId
      //  单位编码
      const organizationcode = this.encrypt
      if (!organizationcode) {
        this.$message({
          message: '请填写单位编码',
          type: 'warning'
        })
        return false
      }
      // 单位名称
      const organizationname = this.organizationname
      if (!organizationname) {
        this.$message({
          message: '请填写单位名称',
          type: 'warning'
        })
        return false
      }
      //  组织缩写
      const organizationshortname = !this.organizationshortname ? this.organizationname : this.organizationshortname
      //  详细地址
      const address = this.address === undefined ? '' : this.address
      //  专业类别
      let professionalcategory = !this.businessOptions[0] ? '' : this.businessOptions[0]
      let scope = !this.grading ? '' : this.grading
      //  组织机构的父节点ID  目前没有
      //  资质等级  level
      const level = !this.selectedOptions[0] ? '' : this.selectedOptions[0]
      //  资质编号
      const qualificationnumber = !this.identifier ? '' : this.identifier
      //  联系人
      const linkman = !this.linkman ? '' : this.linkman
      //  联系电话
      const tel = !this.CellPhone ? '' : this.CellPhone
      //  备注
      const memo = !this.textarea ? '' : this.textarea
      //  父级的id
      let parentid = ''
      if (this.companyDate.length === 0) {
        parentid = ''
      } else {
        parentid = this.companyDate[this.companyDate.length - 1]
      }
      //  消防监管机构
      let firebrigadeid = this.superVisionData
      //  消防单位类别
      let firecontrolcategoryid = this.categoryfireFightingData
      //  业务类别
      let industrycategoryid = this.businessCategoryData
      //  图标
      let file = this.imageUrlTwo === '' ? this.imageUrl : this.imageUrlTwo
      //  备注信息
      // let textarea = this.textarea
      this.axios.post(managementAuthority(token, organizationtype, firebrigadeid, firecontrolcategoryid, industrycategoryid, file, organization, parentid, countyid, city, province, organizationcode, organizationname, organizationshortname, address, professionalcategory, scope, level, qualificationnumber, linkman, tel, memo)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.ormatting()
          this.amputateStr = true
          this.axios.post(managementCreatedtree(token)).then((response) => {
            if (response.data.code === 0) {
              this.data = response.data.data
            }
          })
        }
      })
    },
    handleChange () {
    },
    onChange (file, fileList) {
      this.Headportrait = file.url
      if (fileList.length > 1) {
        this.fileList = fileList.slice(1, 2)
      }
    },
    handleNodeClick (data) {
      this.organizationdata = data
      this.amputateStr = false
      this.DataorganizationId = data.organizationId
      if (data.root) {
        this.dataRoot = false
        this.identificationVariable = data.organizationType
        this.dataRootInput = data.parentName
      } else {
        this.dataRoot = true
        this.dataRootInput = ''
      }
      this.axios.post(getAllHigherOrgIDs(data.organizationId)).then((response) => {
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
      // 判断组织类别
      if (data.organizationType === 5 || data.organizationType === 4) {
        this.regimentation = this.initRegimentation.filter(t => t.value !== 3)
      } else {
        this.regimentation = [...this.initRegimentation]
      }
      this.conserveBoolean = true
      const organization = data.organizationId
      this.organizationId = organization
      const url = managementhandleNodeClickOne(organization)
      const urltwo = managementhandleNodeClickTwo(organization)
      this.axios.post(urltwo).then((response) => {
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
        //  专业类别
        // let categoryId = urlDate.professionalcategory
        this.businessOptions = []
        if (!urlDate.professionalcategory) {
          this.businessOptions = []
        } else {
          this.businessOptions.push(urlDate.professionalcategory)
        }
        this.linkman = urlDate.linkman
        //  上级主管单位
        this.selectedOptions = []
        this.selectedOptions.push(urlDate.level)
        //  所在地址
        this.address = urlDate.address
        //  备注信息
        this.textarea = !urlDate.memo ? '' : urlDate.memo
        //  资格编号
        this.identifier = !urlDate.qualificationnumber ? '' : urlDate.qualificationnumber
        //  电话
        this.CellPhone = !urlDate.tel ? '' : urlDate.tel
        //  业务类别
        this.businessOptions.push(urlDate.professionalcategory)
        //  资质等级
        this.grading = urlDate.scope
        //  业务类别
        this.businessCategoryData = urlDate.industrycategoryid === null ? '' : urlDate.industrycategoryid
        //  消防单位类别
        this.categoryfireFightingData = urlDate.firecontrolcategoryid === null ? '' : urlDate.firecontrolcategoryid
        //  消防监管机构
        this.superVisionData = urlDate.firebrigadeid === null ? '' : urlDate.firebrigadeid
      })
      this.axios.post(url).then((response) => {
        let urlData = JSON.parse(response.data.data)
        //  联系人
        //  图标
        this.imageUrl = urlData.icon.indexOf('null') === -1 ? urlData.icon : ''
        this.imageUrlTwo = ''
        //  所在区域
        this.regionDate = urlData.pcc
        //  单位简称
        this.organizationshortname = urlData.organizationshortname === 'undefined' ? '' : urlData.organizationshortname
        //  单位编码
        this.encrypt = urlData.organizationcode
        //  组织机构名称
        this.organizationname = urlData.organizationname === 'undefined' ? '' : urlData.organizationname
        //  组织类型
        this.regimentaValue = urlData.organizationtype
        // 判断是否是根节点单位
        //  省份
        this.provinceId = urlData.provinceid
        //  省下的市
        this.conurbationId = urlData.cityid
        //  县城
        this.countytownId = urlData.countyid
        //  父级id
        this.parentid = urlData.parentid
      })
    },
    power () {
      // 点击权限
      this.popupBoolean = true
    },
    Say (ev) {
      // 点击权限 保存/关闭
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
              this.ormatting()
              this.amputateStr = true
              let token = JSON.parse(window.sessionStorage.token)
              this.axios.post(managementCreatedtree(token)).then((response) => {
                if (response.data.code === 0) {
                  this.data = response.data.data
                }
              })
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
    changClick (a) {
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
    },
    organizationCategory (data) {
      if (data === 4 || data === 5) {
        this.classification = false
      } else {
        this.classification = true
      }
    },
    ormatting () {
      this.organizationshortname = ''
      this.organizationname = ''
      this.imageUrl = ''
      this.imageUrlTwo = ''
      this.categoryfireFightingData = ''
      this.businessCategoryData = ''
      this.superVisionData = ''
      this.companyDate = []
      this.abbreviation = ''
      this.encrypt = ''
      this.regionDate = ''
      this.address = ''
      this.selectedOptions = []
      this.businessOptions = []
      this.grading = ''
      this.identifier = ''
      this.linkman = ''
      this.CellPhone = ''
      this.fileList = []
      this.textarea = ''
      this.organization = ''
      this.conserveBoolean = false
      // this.regimentaValue = ''
    }
  },
  created () {
    // 初始化组织类别
    this.initRegimentation = []
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'organization') {
        this.JurisdictionInsert = val.insert
        this.JurisdictionUpdate = val.update
        this.JurisdictionDelete = val.delete
      }
    })
    let token = JSON.parse(window.sessionStorage.token)
    //  左边的树状结构
    this.axios.post(getOrganizationTrees(token)).then((response) => {
      if (response.data.code === 0) {
        this.data = response.data.data
      }
    })
    //  省份
    const CreatedProvince = managementCreatedProvince()
    this.axios.post(CreatedProvince).then((response) => {
      if (response.data.code === 0) {
        this.province = response.data.data
      }
    })
    //   专业类别
    const Createdcategory = managementCreatedcategory()
    this.axios.post(Createdcategory).then((response) => {
      if (response.data.code === 0) {
        this.category = response.data.data
        this.categoryDate = response.data.data
      }
    })
    //  业务类别
    const Createdbusiness = managementCreatedbusiness()
    this.axios.post(Createdbusiness).then((response) => {
      if (response.data.code === 0) {
        this.business = response.data.data
      }
    })
    //  组织类别
    const Createdorganization = managementCreatedorganization(token)
    this.axios.post(Createdorganization).then((response) => {
      let regimentaDate = response.data.data
      // 给组织类别赋值
      this.initRegimentation = regimentaDate
      // regimentaDate
      this.regimentation = [...this.initRegimentation]
    })
    //  消防监管机构
    this.axios.post(getFirebrigades()).then((response) => {
      if (response.data.code === 0) {
        this.supervision = response.data.data
      }
    })
    //  消防单位类别
    this.axios.post(getFirecontrolcategory()).then((response) => {
      if (response.data.code === 0) {
        this.categoryfireFighting = response.data.data
      }
    })
    //  行业类别
    this.axios.post(getIndustrycategory()).then((response) => {
      if (response.data.code === 0) {
        this.businessCategory = response.data.data
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
.el-tree
  background transparent
.custom-tree-node
  color $color-text
.el-button--text
  color $color-border-b-fault
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
 .informationLifive
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
  .leftBottomDiv
    init()
    line-height 28px
    margin-top 10px
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
  .avatar
    width 100px
    height 100px
    display block
  .amputateDIv
    amputateDIv()
    margin-left 20px
  .subjectRightDiv
    position absolute
    left 0
    top 0
    z-index 1111
    background rgba(000, 000, 000, .6)
    height 100%
    width 100%
  .structureSpan
    color #dd514c
</style>

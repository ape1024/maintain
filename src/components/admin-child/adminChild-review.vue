<template>
  <div class="newlyadded" @click="shutdown">
    <section class="increase">
      <h4 class="increase_h4">
        新增设备
      </h4>
      <div class="increase_top">
        <div class="top_header">
          <p class="header_p">
            集中录入各类设施的公共信息
          </p>
          <p class="thread"></p>
        </div>
        <section class="modify">
          <ul class="modify_ul">
            <li class="modify_li">
              <div class="modify_liDivthree">
                <p class="modify_li_p"><span class="increaseSpan">*</span>设施类别：</p>
                <div class="modify_li_div">
                  <el-cascader
                    size="mini"
                    :options="category"
                    :props="equipmentProps"
                    v-model="categoryDate"
                    @change="categoryChange"
                  ></el-cascader>
                </div>
              </div>
              <div class="modify_liDivthree">
                <p class="modify_li_p"><span class="increaseSpan">*</span>生产厂家：</p>
                <div class="modify_li_div">
                  <el-select size="mini" @focus="focus" @change="manufacturerChange" v-model="manufactorModel" placeholder="">
                    <el-option
                      v-for="item in manufactor"
                      :key="item.manufacturerid"
                      :label="item.name"
                      :value="item.manufacturerid">
                    </el-option>
                  </el-select>
                </div>
                <div class="modify_lidivRight">
                  <el-input size="mini" v-show="customManufacturer" v-model="customManufacturerDate" placeholder="请输入厂家"></el-input>
                </div>
              </div>
              <div class="modify_liDivthree">
                <p class="modify_li_p"><span class="increaseSpan">*</span>规格型号：</p>
                <div class="modify_li_div">
                  <el-select size="mini" @change="versionChang(versionValue)" v-model="versionValue" placeholder="">
                    <el-option
                      v-for="item in version"
                      :key="item.divecemodelid"
                      :label="item.divecemodelname"
                      :value="item.divecemodelid">
                    </el-option>
                  </el-select>
                </div>
                <div class="modify_lidivRight">
                  <el-input size="mini" v-show="versionManufacturer" v-model="versionCustom" placeholder="请输入规格型号"></el-input>
                </div>
              </div>
              <div class="modify_liDivthree">
                <p class="modify_li_p"><span class="increaseSpan"> </span>设施单位：</p>
                <div class="modify_li_div">
                  <el-select @change="CompanyChange" size="mini" v-model="Company" placeholder="请选择">
                    <el-option
                      v-for="item in CompanyData"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="modify_lidivRight">
                  <el-input v-if="CompanyShow" size="mini" v-model="CompanyInput" placeholder="请输入单位"></el-input>
                </div>
              </div>
              <div class="modify_liDivthree">
                <p class="modify_li_p">
                  技术参数：
                </p>
                <div class="modify_li_divthree">
                  <el-input
                    size="mini"
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder=""
                    v-model="technicalParameter">
                  </el-input>
                </div>
              </div>
            </li>
            <li class="modify_li">
              <div class="modify_liDiv">
                <p class="modify_li_p">生产日期：</p>
                <div class="modify_li_divtwo">
                  <el-date-picker
                    size="mini"
                    v-model="productionValue1"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="modify_liDiv">
                <p class="modify_li_p">
                  有效日期：
                </p>
                <div class="modify_li_divtwo">
                  <el-date-picker
                    size="mini"
                    v-model="validity"
                    value-format="timestamp"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <div class="modify_liDiv">
                <p class="modify_li_p">
                  业主单位：
                </p>
                <div class="modify_li_divtwo">
                  <el-input
                    size="mini"
                    v-model="proprietorUnit"
                    :disabled="true">
                  </el-input>
                </div>
              </div>
              <div class="modify_liDiv">
                <p class="modify_li_p">
                  备注说明：
                </p>
                <div class="modify_li_divthree">
                  <el-input
                    size="mini"
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder=""
                    v-model="textarea">
                  </el-input>
                </div>
              </div>
              <div class="modify_liDiv">
                <p class="modify_li_p">
                  上传图片:
                </p>
                <div class="modify_li_divfour">
                  <el-upload
                    :action="uploadFun"
                    list-type="picture-card"
                    :on-success="handlesuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-error="handlePictureerror"
                    :on-exceed="handlePicturexceed"
                    :limit='10'
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div class="increase_bottom">
        <div class="top_header">
          <p class="header_p">
            逐一录入每台设施的具体信息
          </p>
          <p class="thread"></p>
        </div>
        <ul class="bottom_ul">
          <li class="bottom_left">
            <div class="left_listTwo">
              <div class="modify_liDivtwo">
                <p class="left_list_p"><span class="increaseSpan">*</span>设施位置:</p>
                <div class="modify_li_div">
                  <el-cascader
                    :options="facilityLocation"
                    :props="facilityLocationProps"
                    v-model="facilityLocationDate"
                    size="mini"
                    change-on-select
                  ></el-cascader>
                </div>
              </div>
              <div class="specific">
                <el-input size="mini" v-model="specific" placeholder="请输入详细地址"></el-input>
              </div>
            </div>
          </li>
          <li class="bottom_left">
            <div class="left_list">
              <p class="left_list_p">设施数量:</p>
              <div class="left_list_div">
                <el-input size="mini" v-model="quantum" placeholder=""></el-input>
              </div>
            </div>
          </li>
          <li class="bottom_left">
            <div class="left_list">
              <p class="left_list_p">
                <el-checkbox v-model="checked"></el-checkbox>
                批量编码:
              </p>
              <div class="left_list_div">
                <el-input-number :disabled="!checked" v-model="num" controls-position="right" :min="1" size="mini"></el-input-number>
              </div>
            </div>
          </li>
          <li class="bottom_right">
            <div @click.stop="addincrease" class="addcontent">
              增 加
            </div>
          </li>
        </ul>
        <div class="tabulation">
          <div class="tabulation_header">
            <ul class="tabulation_ul">
              <li class="tabulation_li">设施编码</li>
              <li class="tabulation_li">设施位置</li>
              <li class="tabulation_li">设施数量</li>
              <li class="tabulation_liTwo">编码</li>
              <li class="tabulation_li">操作</li>
            </ul>
          </div>
          <div class="tabulation_title">
            <ul class="title_ul">
              <li v-for="(item,$index) in tabulationtitle" :key="item.id" :id="item.id" class="title_li">
                <ul class="title_li_ul">
                  <li class="title_lili">
                    <div class="title_liliTwoDiv">
                      <el-input size="mini" v-model="item.dCoding" placeholder="设备编码"></el-input>
                    </div>
                  </li>
                  <li class="title_lili">
                    {{item.positionName}}{{item.position}}
                  </li>
                  <li class="title_lili">
                    {{item.devcount}}
                  </li>
                  <li class="title_liliTwo">
                    <!--控制器编码-->
                    <div class="title_liliTwoDiv">
                      <el-input v-model="item.a" placeholder="控制器编码"></el-input>
                    </div>
                    <!--回路号-->
                    <div class="title_liliTwoDiv">
                      <el-input v-model="item.b" placeholder="回路号"></el-input>
                    </div>
                    <!--一次码-->
                    <div class="title_liliTwoDiv">
                      <el-input v-model="item.c" placeholder="一次码"></el-input>
                    </div>
                    <!--地址编码-->
                    <div class="title_liliTwoDiv">
                      <el-input v-model="item.d" placeholder="地址编码"></el-input>
                    </div>
                  </li>
                  <li class="title_lili">
                    <div @click.stop="amputate($index)" class="title_lili_div">
                      删除
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class=" bottomside">
        <div @click.stop="preser" class="preservation">
          保存
        </div>
        <div @click.stop="calloff" class="cancel">
          取消
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
import { maintainReportfindManufactures, maintainReportAddManufacture, maintainReportAddDevice, findAllDeviceType,
  maintainReportfindDivecemodels, findAreasTreeByProjectid, AddDivecemodels, findAllDeviceUnit, getProprietorOrganization, upload } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  name: 'adminChild-review',
  mixins: [projectMixin],
  props: ['msg'],
  data () {
    return {
      // 显示\隐藏
      lyaddedShow: true,
      // 公司
      company: '',
      // 技术参数 输入框
      textareaone: '',
      // 备注说明 输入框
      textareatwo: '',
      // 生产日期
      manufacture: '',
      // 有效日期
      effective: '',
      // 具体地址
      specific: '',
      // 实施数量
      quantum: '',
      // 地址编码
      encoded: '',
      // 报警回路
      syntony: '',
      // 批量 复选框
      checked: false,
      // 设备编码 需要后台传值
      devicecoding: '',
      num: 1,
      regionDate: '',
      // 点击添加
      tabulationtitle: [],
      regionUl: false,
      // 显示/隐藏
      modifyBoolean: true,
      // 类别
      category: [],
      categoryDate: [],
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        code: 'code'
      },
      //   类别初始值
      categoryinitialValue: true,
      categoryValue: '',
      // 厂家
      manufactorModel: '',
      manufactor: [],
      // 型号
      version: [],
      versionValue: '',
      versionManufacturer: false,
      //  自定义型号
      versionCustom: '',
      // 生产日期
      productionValue1: '',
      // 有效期
      validity: '',
      // 技术参数
      textarea: '',
      // 备注说明
      explain: '',
      //  自定义厂家
      customManufacturer: false,
      customManufacturerDate: '',
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
      //  技术参数
      technicalParameter: '',
      //  具体位置
      Specificposition: '',
      categoryDateOne: [],
      myfileImg: [],
      myfileImgTwo: [],
      basedevicecode: '',
      //  图片dome
      picName: [],
      facilityLocation: [],
      facilityLocationProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      facilityLocationDate: [],
      CompanyData: [],
      Company: '',
      CompanyInput: '',
      CompanyShow: false,
      dialogImageUrl: '',
      dialogVisible: false,
      proprietorUnit: '',
      proprietorUnitData: '',
      uploadFun: upload(JSON.parse(window.sessionStorage.token)),
      uploadData: []
    }
  },
  methods: {
    handlePicturexceed () {
      this.$message({
        message: '不可以超过十张照片',
        type: 'warning'
      })
    },
    handlePictureerror (err, file, fileList) {
      if (!fileList.length) {
        this.uploadData = []
      } else {
        fileList.forEach((val) => {
          this.uploadData.push(val.response.data)
        })
      }
    },
    handlesuccess (response, file, fileList) {
      this.uploadData.push(response.data)
    },
    handleRemove (file, fileList) {
      this.uploadData = []
      fileList.forEach((val) => {
        this.uploadData.push(val.response.data)
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    versionChang (data) {
      if (this.versionValue === '-9999') {
        this.versionManufacturer = true
        return false
      } else {
        this.versionManufacturer = false
        let result = this.version.find(val => val.divecemodelid === data)
        this.technicalParameter = result.parameters
        return false
      }
    },
    focus (event) {
      let region = this.categoryDate
      if (region.length === 0) {
        this.$message({
          message: '设备类型！',
          type: 'warning'
        })
        return false
      } else if (region[0] === null) {
        let result = this.manufactor.find(val => val.manufacturerid === '-9999')
        if (result === undefined) {
          this.manufactor.push({
            name: '自定义',
            manufacturerid: '-9999'
          })
        } else {
          return ''
        }
      } else {
        region = region[region.length - 1]

        this.axios.post(maintainReportfindManufactures(region)).then((response) => {
          if (response.data.code === 0) {
            this.manufactor = response.data.data
            this.manufactor.push({
              name: '自定义',
              manufacturerid: '-9999'
            })
          }
        })
      }
    },
    ergodic (data) {
      let result = ''
      let findData = (data, val) => {
        let flag = true
        data.forEach((item) => {
          if (item.areaid === val) {
            result += item.areaname
            flag = false
          } else if (flag && item.areas) {
            findData(item.areas, val)
          }
        })
      }
      data.forEach((val) => {
        findData(this.facilityLocation, val)
      })
      return result
    },
    addincrease () {
      console.log(this.Company)
      return
      let obtainCode = this.specific
      let areaid = this.facilityLocationDate
      let areaidName = this.ergodic(areaid)
      // let devicecoding = this.devicecoding
      let quantum = this.quantum
      // let encoded = this.encoded
      if (this.checked) {
        for (let i = 1; i <= this.num; i++) {
          this.tabulationtitle.unshift({
            // // 编码
            // code: devicecoding,
            positionName: areaidName,
            // 位置
            position: obtainCode,
            areaid: areaid[areaid.length - 1],
            // 数量
            devcount: quantum,
            //  设备编码
            dCoding: '',
            //  控制器编码
            a: '',
            //  回路号
            b: '',
            //  一次码
            c: '',
            //  地址编码
            d: ''
          })
        }
      } else {
        this.tabulationtitle.unshift({
          // // 编码
          dCoding: '',
          // code: devicecoding,
          positionName: areaidName,
          // 位置
          position: obtainCode,
          areaid: areaid[areaid.length - 1],
          // 数量
          devcount: quantum,
          //  控制器编码
          a: '',
          //  回路号
          b: '',
          //  一次码
          c: '',
          //  地址编码
          d: ''

        })
      }
    },
    amputate (index) {
      this.tabulationtitle.splice(index, 1)
    },
    calloff () {
      // 取消
      this.$emit('say', false)
    },
    categoryChange () {
      let organizationId = this.categoryDate[this.categoryDate.length - 1]
      let result = null
      let findData = (data) => {
        let flag = true
        data.forEach(val => {
          if (val.id === organizationId) {
            result = val.code
            flag = false
          } else if (flag && val.children) {
            findData(val.children)
          }
        })
      }
      findData(this.category)
      this.basedevicecode = result
    },
    preser () {
      // 保存
      //  批量编码 个数
      let rowcount = this.tabulationtitle.length ? this.tabulationtitle.length : 0
      //  token
      let token = JSON.parse(window.sessionStorage.token)
      //  设备id
      let devicetypeid = this.categoryDate[this.categoryDate.length - 1]
      //  厂家id
      let manufacturerid = ''
      //  型号
      let devicemodel = ''
      if (this.versionManufacturer) {
        devicemodel = this.versionCustom ? this.versionCustom : ''
      } else {
        devicemodel = this.versionValue ? this.versionValue : ''
      }
      //  单位
      let unit = ''
      if (!this.Company) {
        if (!this.CompanyShow) {
          unit = this.CompanyInput
        } else {
          unit = this.CompanyInput
        }
      } else if (this.Company === '自定义') {
        unit = this.CompanyInput
      } else {
        unit = this.Company
      }
      //  设备参数
      let parameters = this.technicalParameter ? this.technicalParameter : ''
      // 备注
      let memo = this.textarea ? this.textarea : ''
      //  生产日期
      let madedate = this.productionValue1 ? this.productionValue1 : ''
      //  有效日期
      let effectivedate = this.validity ? this.validity : ''
      //  地址编码
      let tabulationtitle = []
      //  图片
      let icons = ''
      if (!this.uploadData.length) {
        icons = ''
      } else {
        icons = this.uploadData.join()
      }
      this.tabulationtitle.forEach((val) => {
        let obj = {
          a: val.a,
          areaid: val.areaid ? val.areaid : '',
          b: val.b,
          c: val.c,
          d: val.d,
          devicecode: val.dCoding,
          devcount: val.devcount,
          position: val.position
        }
        tabulationtitle.push(obj)
      })
      if (this.categoryDate.length !== 0) {
        if (this.customManufacturer === true) {
          if (!this.customManufacturerDate) {
            this.$message({
              message: '请输入厂家',
              type: 'warning'
            })
            return false
          }
          this.axios.post(maintainReportAddManufacture(this.customManufacturerDate, devicetypeid)).then((response) => {
            if (response.data.code === 0) {
              // 厂家id
              manufacturerid = response.data.data.manufacturerid
              if (this.versionManufacturer === true) {
                this.axios.post(AddDivecemodels(manufacturerid, devicetypeid, this.versionCustom, this.technicalParameter)).then((data) => {
                  if (data.data.code === 0) {
                    devicemodel = data.data.data.divecemodelid
                    this.requestCreation(rowcount, token, this.maintainProject, devicetypeid, manufacturerid, this.basedevicecode, devicemodel, unit, parameters, memo, madedate, effectivedate, icons, tabulationtitle)
                  }
                })
              } else {
                devicemodel = this.versionValue
                this.requestCreation(rowcount, token, this.maintainProject, devicetypeid, manufacturerid, this.basedevicecode, devicemodel, unit, parameters, memo, madedate, effectivedate, icons, tabulationtitle)
              }
            }
          })
        } else if (this.versionManufacturer === true) {
          //  厂家 id
          this.axios.post(AddDivecemodels(manufacturerid, devicetypeid, this.versionCustom, this.technicalParameter)).then((Item) => {
            if (Item.data.code === 0) {
              devicemodel = Item.data.data.divecemodelid
              manufacturerid = this.manufactorModel
              this.requestCreation(rowcount, token, this.maintainProject, devicetypeid, manufacturerid, this.basedevicecode, devicemodel, unit, parameters, memo, madedate, effectivedate, icons, tabulationtitle)
            }
          })
        } else {
          devicemodel = this.versionValue
          manufacturerid = this.manufactorModel
          this.requestCreation(rowcount, token, this.maintainProject, devicetypeid, manufacturerid, this.basedevicecode, devicemodel, unit, parameters, memo, madedate, effectivedate, icons, tabulationtitle)
        }
      } else {
        this.$message({
          message: '请先选择设备类型！',
          type: 'warning'
        })
      }
    },
    requestCreation (rowcount, token, maintainProject, devicetypeid, manufacturerid, basedevicecode, devicemodel, unit, parameters, memo, madedate, effectivedate, icons, tabulationtitle) {
      this.axios.post(maintainReportAddDevice(rowcount, token, maintainProject, devicetypeid, manufacturerid, basedevicecode, devicemodel, unit, parameters, memo, madedate, effectivedate, icons), tabulationtitle).then((data) => {
        if (data.data.code === 0) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$emit('transmission', false)
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    accessarea () {
      this.regionUl = !this.regionUl
    },
    //  点击最父级，关闭地址框
    shutdown () {
      this.regionUl = false
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
    manufacturerChange () {
      if (this.manufactorModel === '-9999') {
        this.versionValue = '自定义'
        this.version = []
        this.customManufacturer = true
        this.versionManufacturer = true
        return false
      } else {
        this.versionValue = ''
        this.customManufacturer = false
        this.versionManufacturer = false
        let region = this.categoryDate
        region = region[region.length - 1]
        this.axios.post(maintainReportfindDivecemodels(region, this.manufactorModel)).then((response) => {
          if (response.data.code === 0) {
            this.version = response.data.data
            this.version.push({
              divecemodelname: '自定义',
              divecemodelid: '-9999'
            })
          }
        })
      }
    },
    CompanyChange (el) {
      if (el === '自定义') {
        this.CompanyShow = true
      } else {
        this.CompanyShow = false
      }
    }
  },
  created () {
    //  设备类型
    // let token = JSON.parse(sessionStorage.token)
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.category = response.data.data
      }
    })

    this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.facilityLocation = response.data.data
      }
    })
    this.axios.post(findAllDeviceUnit(token)).then((response) => {
      if (response.data.code === 0) {
        let obj = {
          name: '自定义'
        }
        response.data.data.push(obj)
        this.CompanyData = response.data.data
      }
    })
    this.axios.post(getProprietorOrganization()).then((response) => {
      if (response.data.code === 0) {
        console.log(response.data.data)
        this.proprietorUnit = response.data.data[0].organizationname
        //  业主单位id
        this.proprietorUnitData = response.data.data[0].organizationid
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .increase
    width 1245px
    margin 0 auto
    overflow hidden
    position relative
    padding-top 45px
    .increase_h4
     font-size $font-size-medium-x
     color $color-text-title
     margin-bottom 14px
   .increase_top
     width 100%
     position relative
   .increase_bottom
     width 100%
     overflow hidden
     position relative
    .top_header
       overflow hidden
       font-size $font-size-medium
       color $color-header-b-normal
       .header_p
         float left
         color #444D5B
         padding-left 40px
       .thread
         float right
         width 960px
         height 1px
         background #444d5b
         margin-top: 5px
     .top_ul
       overflow hidden
       position relative
       margin-left: 50px
       font-size $font-size-medium
       color $color-header-b-normal
       margin-top 28px
       .top_left
         float left
         margin-right 90px
         overflow hidden
         .left_list
           overflow hidden
           margin-bottom 14px
           .left_list_p
             width 100px
             text-align right
             letter-spacing 2px
             float left
             line-height 27px
             margin-right 10px
             .left_list_span
               color $color-border-b-alarm
           .left_list_div
             width 167px
             overflow hidden
             border-radius: 5px;
           .left_list_divtwo
             width: 218px;
             overflow hidden
           .left_list_divthree
             width 296px
             overflow hidden
       .top_right
         float right
         overflow hidden
         position relative
         .right_list
           overflow hidden
           position relative
           .left_list_p
             width 100px
             text-align right
             letter-spacing 2px
             float left
             line-height 27px
             margin-right 10px
           .left_list_div
             width 167px
             overflow hidden
             border-radius 5px
    .bottom_ul
      display inline-block
      position relative
      margin-left 50px
      font-size 16px
      color #d5d5d5
      margin-top 28px
      .bottom_left
        margin-right: 30px;
        float left
        .left_list
          overflow hidden
          margin-bottom 14px
          .left_list_div
            width 137px
            overflow hidden
            float left
            margin-right 12px
           .left_list_select
              width 167px
              overflow hidden
              position relative
              float left
              margin-right: 13px;
          .left_list_p
            width 100px
            text-align right
            letter-spacing 2px
            float left
            line-height 27px
            margin-right 10px
            .left_list_span
              color $color-border-b-alarm
          .specific
            float right
            width 130px
            overflow hidden
        .encrypt
          float left
          width 348px
          overflow hidden
      .bottom_right
        float right
        overflow hidden
        position relative
        .addcontent
          width 106px
          height 36px
          text-align center
          line-height 36px
          background $color-background-newly
          font-size $font-size-medium
          color $color-text-title
          border-radius 5px
          cursor pointer
          transition .2s
          &:hover
            background: #4baabe;
    .tabulation
      width 100%
      position relative
      font-size $font-size-medium
      color $color-text-title
      max-height 240px
      min-height 240px
      margin-bottom 8px
      height calc(100% - 50px)
      overflow-y auto
      overflow-x hidden
      .tabulation_header
       width 100%
       overflow hidden
       background #354d76
       .tabulation_ul
         overflow hidden
         padding 12px 0
         .tabulation_li
          float left
          width 15%
          text-align center
         .tabulation_liTwo
           float left
           width 40%
           text-align center
      .tabulation_title
         width 100%
         overflow hidden
         position relative
         .title_ul
           overflow hidden
           .title_li
             float left
             width 100%
             overflow hidden
             .title_li_ul
               width 100%
               overflow hidden
               position relative
             .title_lili
               line-height: 40px;
               width 15%
               height 40px
               float left
               text-align center
               .title_lili_div
                 color #83292b
                 line-height 32px
                 text-align center
                 cursor pointer
                 margin 4px auto
                 transition .2s
         .title_ul .title_li:nth-child(odd)
           background #1c273a
         .title_ul .title_li:nth-child(even)
           background #141d2c
   .bottomside
     width 100%
     overflow hidden
     position relative
     color $color-text-title
     font-size $font-size-medium
     text-align center
     margin-bottom 10px
     .preservation
       margin-right 20px
       conserve()
     .cancel
       closedown()
  .newlyadded
    margin 30px 0 0
    width 100%
    background #111a28
  .increase
    width 1245px
    margin 0 auto
    position relative
    padding-top 45px
    .increase_h4
      font-size $font-size-medium-x
      color $color-text-title
      margin-bottom 14px
    .top_header
      overflow hidden
      font-size $font-size-medium
      color $color-header-b-normal
    .thread
      float:right
      width 960px
      height 1px
      background #444d5b
      margin-top 8px
    .header_p
      float left
      color #444d5b
      padding-left 40px
  .modify
    position relative
    width 100%
    display inline-block
    margin-bottom 10px
    .modify_ul
      width 100%
      position relative
      display inline-block
      margin-left 20px
      margin-top 25px
      .modify_li
        width 46%
        float left
        margin 0 0 0 20px
        color $color-header-b-normal
        font-size $font-size-medium
      .modify_liDiv
        init()
        margin-bottom 20px
      .modify_liDivtwo
        position relative
        display inline-block
        width 100%
        margin-bottom 30px
      .modify_li_p
        float left
        margin-right 6px
        margin-bottom 10px
        line-height 30px
      .modify_li_div
        float left
        width 217px
        position relative
      .modify_li_divtwo
        width 220px
        float left
        line-height 40px
        margin-top -6px
      .modify_li_divthree
        float left
        width 280px
        position relative
      .modify_right
        width 100%
        overflow hidden
        position  relative
        .modify_li_p
          float left
          margin-right 6px
          color $color-header-b-normal
          margin-left 20px
          line-height 30px
  .modify_bottom
    init()
    text-align center
    margin-bottom 20px
    .conserve
      conserve()
      margin-right 110px
    .closedown
      closedown()
  .modify_lidivRight
    width 202px
    margin-left 20px
    float left
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
  .myFileUl
     overflow hidden
     position relative
     padding-top 10px
     padding-left 110px
     min-height 52px
  .myFileLi
    float left
    width 50px
    height 50px
    overflow hidden
    position relative
    margin-right 20px
    .myFileLiimg
       display inline-block
       width 50px
       height 50px
  .myFileDiv
     position absolute
     top 0
     left 0
     opacity 0
     font-size 18px
     line-height 50px
     color $color-border-b-alarm
     text-align center
     width 100%
     height 100%
     cursor pointer
     background rgba(000,000,000,.4)
     transition .4s
  .myFileLi:hover .myFileDiv
    opacity 1
  .modify_liDivtwo
    display inline-block
    position relative
  .left_listTwo
     display inline-block
     position relative
     margin-bottom 14px
    .left_list_p
      width 100px
      text-align right
      letter-spacing 2px
      float left
      line-height 27px
      margin-right 10px
    .modify_li_div
      float left
      position relative
  .specific
    float right
    width 130px
    margin-left 10px
  .modify_liDivthree
    width 100%
    overflow hidden
    position relative
    margin-bottom 20px
  .upload
    display inline-block
    width 100px
    height 30px
    line-height 30px
    font-size 14px
    color $color-text-title
    border-radius 10px
    background $color-background-introduce
    position relative
    text-align center
    transition .4s
    cursor pointer
  .upload > input
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    opacity 0
    cursor pointer
  .upload:hover
     cursor pointer
     background $color-background-query
  .title_liliTwo
    line-height 40px
    width 40%
    height 40px
    float left
    text-align center
  .title_liliTwoDiv
     display inline-block
     width 106px
     height 30px
     line-height 30px
     margin 5px 10px 0 0
     position relative
     overflow hidden
     text-align center
     border-radius 5px
  .increaseSpan
    color #dd514c
  .modify_li_divfour
    overflow-x hidden
    overflow-y auto
    position relative
    width 100%
    height 90px
</style>
<style>
  .modify_li_divfour .el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height: 80px;
  }
  .modify_li_divfour .el-upload--picture-card{
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
</style>

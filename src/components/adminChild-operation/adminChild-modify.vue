<template>
  <div class="newlyadded" @click="shutdown">
    <section class="increase">
      <h4 class="increase_h4">
        设施信息 修改
      </h4>
      <div class="top_header">
        <p class="header_p">新录入信息将替换原对应的内容</p>
        <p class="thread"></p>
      </div>
      <section class="modify">
        <ul class="modify_ul">
          <li class="modify_li">
            <div class="modify_liDiv">
              <p class="modify_li_p"><span class="increaseSpan">*</span>设施类别：</p>
              <div class="modify_li_div">
                   <el-cascader
                     size="mini"
                     @change="categoryChange"
                     :options="category"
                     :props="equipmentProps"
                     v-model="categoryDate"
                   ></el-cascader>
              </div>
            </div>
            <div class="modify_liDiv">
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
                <el-input size="mini" v-if="customManufacturer" v-model="customManufacturerDate" placeholder="请输入厂家"></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">规格型号：</p>
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
                <el-input size="mini" v-if="versionManufacturer" v-model="versionCustom" placeholder="请输入规格型号"></el-input>
              </div>
            </div>
            <!--<div class="modify_liDiv">-->
              <!--<p class="modify_li_p">-->
                <!--<span class="modifySpantwo">*</span>设施单位：-->
              <!--</p>-->
              <!--<div class="modify_li_div">-->
                <!--<el-select @change="CompanyChange" @focus="ompanyfocus" size="mini" v-model="Company" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in CompanyData"-->
                    <!--:key="item.devunitId"-->
                    <!--:label="item.unitname"-->
                    <!--:value="item.devunitId">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <!--<div v-if="CompanyShow" class="modify_lidivRight">-->
                <!--<el-input size="mini" v-model="Companymake" placeholder="请输入设备单位"></el-input>-->
              <!--</div>-->
            <!--</div>-->
            <div class="modify_liDivtwo">
              <p class="modify_li_p"><span class="increaseSpan">*</span>设施位置：</p>
              <div class="modify_li_div">
                <div class="content">
                  <el-cascader
                    :options="facilityLocation"
                    :props="facilityLocationProps"
                    v-model="facilityLocationDate"
                    size="mini"
                    change-on-select
                  ></el-cascader>
                </div>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p"><span class="modifySpantwo">*</span>具体位置：</p>
              <div class="modify_li_div">
                <el-input size="mini" v-model="Specificposition" placeholder=""></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">生产日期：</p>
              <div class="modify_li_divtwo">
                <el-date-picker
                  v-model="productionValue1"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="logTimeChange"
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
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">审批时间：</p>
              <div class="modify_li_div">
                <el-input :disabled="true" size="mini" v-model="conclusionExamination" placeholder=""></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">审批意见：</p>
              <div class="modify_li_div">
                <el-input :disabled="true" size="mini" v-model="approvalOpinion" placeholder=""></el-input>
              </div>
            </div>
          </li>
          <li class="modify_li">
            <div class="modify_liDiv">
              <p class="modify_li_p">设施编码：</p>
              <div class="modify_li_div">
                <el-input size="mini" v-model="facilityCode" placeholder="控制器编码"></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">控制器编码：</p>
              <div class="modify_li_div">
                <el-input size="mini" v-model="controllerCoding" placeholder="控制器编码"></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">回路号：</p>
              <div class="modify_li_divtwo">
                <div class="modify_li_div">
                  <el-input size="mini" v-model="loopNumber" placeholder="回路号"></el-input>
                </div>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">一次码：</p>
              <div class="modify_li_divtwo">
                <div class="modify_li_div">
                  <el-input size="mini" v-model="oneTimeCode" placeholder="一次码"></el-input>
                </div>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">地址编码：</p>
              <div class="modify_li_divtwo">
                <div class="modify_li_div">
                  <el-input size="mini" v-model="addressCode" placeholder="地址编码"></el-input>
                </div>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">
                技术参数：
              </p>
              <div class="modify_li_divthree">
                <el-input
                  type="textarea"
                  size="mini"
                  :rows="2"
                  resize="none"
                  placeholder=""
                  v-model="technicalParameter">
                </el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">
                备注说明：
              </p>
              <div class="modify_li_divthree">
                <el-input
                  type="textarea"
                  :rows="2"
                  size="mini"
                  resize="none"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </li>
          <li class="modify_right">
            <p class="modify_li_p"><span class="modifySpantwo">*</span>现场照片：</p>
            <div class="modify_rightDiv">
              <el-upload
                :action="uploadFun"
                list-type="picture-card"
                :file-list="fileList"
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
          </li>
        </ul>
      </section>
      <div class="modify_bottom">
        <div @click.stop="conserve" class="conserve">
          保存
        </div>
        <div @click.stop="closedown" class="closedown">
          关闭
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
import { maintainReportAddManufacture, AddDivecemodels, updateDevice, maintainReportfindManufactures, maintainReportfindDivecemodels, findAllRootAreasTree, findAllDeviceType, upload, GetDevUnit } from '../../api/user'
import { dateTransfer } from '../../common/js/utils'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [ projectMixin ],
  name: 'adminChild-modify',
  props: ['msg', 'modify', 'Examinedataset'],
  data () {
    return {
      // 显示/隐藏
      modifyBoolean: true,
      // 类别
      category: [],
      categoryDate: [],
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'id'
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
      //  展示用户选取的地区
      regionDate: '',
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
      //  判断区域ul 是否存在
      regionUl: false,
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
      facilityLocation: [],
      facilityLocationProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      facilityLocationDate: [],
      photoArray: [],
      photoArrayBoolean: false,
      Company: '',
      CompanyData: [],
      watchequipment: '',
      Companymake: '',
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadData: [],
      uploadFun: upload(JSON.parse(window.sessionStorage.token)),
      CompanyShow: false,
      controllerCoding: '',
      loopNumber: '',
      oneTimeCode: '',
      addressCode: '',
      facilityCode: '',
      conclusionExamination: '',
      approvalOpinion: ''
    }
  },
  watch: {
    watchequipment (data) {
      //  修改基础设备  单位 重新请求
    }
  },
  methods: {
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    ompanyfocus () {
      if (!this.categoryDate.length) {
        this.$message({
          message: '请先选择设备类别!',
          type: 'warning'
        })
        return false
      } else {
        let token = JSON.parse(window.sessionStorage.token)
        let devicetypeid = this.categoryDate[0]
        this.axios.post(GetDevUnit(token, devicetypeid)).then((response) => {
          if (response.data.code === 0) {
            // let obj = {
            //   devunitId: -999,
            //   unitname: '自定义'
            // }
            // response.data.data.push(obj)
            this.CompanyData = response.data.data
          }
        })
      }
    },
    CompanyChange (el) {
      if (el === -999) {
        this.CompanyShow = true
      } else {
        this.CompanyShow = false
      }
    },
    handlePicturexceed () {
      this.$message({
        message: '不可以超过十张照片',
        type: 'warning'
      })
    },
    handlePictureerror (errText, file, fileList) {
      if (!fileList.length) {
        this.uploadData = []
      } else {
        fileList.forEach((val) => {
          this.uploadData.push(val.response.data)
        })
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlesuccess (response, file, fileList) {
      this.uploadData.push(response.data)
    },
    handleRemove (file, fileList) {
      this.uploadData = []
      fileList.forEach((val) => {
        this.uploadData.push(val.url)
      })
    },
    categoryChange (data) {
      this.watchequipment = data[0]
      this.manufactorModel = ''
      this.versionValue = ''
    },
    myFileLidelete (index) {
      this.photoArray.splice(index, 1)
    },
    logTimeChange (val) {
      this.productionValue1 = val
    },
    conserve: async function () {
      //  图片
      let files = []
      if (!this.uploadData.length) {
        this.fileList.forEach((val) => {
          files.push(val.url)
        })
      } else {
        this.uploadData.forEach((val) => {
          files.push(val)
        })
      }
      files = files.join()
      let areaid = this.facilityLocationDate[this.facilityLocationDate.length - 1]
      if (!areaid) {
        this.$message({
          message: '请先选择设施位置',
          type: 'warning'
        })
        return false
      }
      // token
      let token = JSON.parse(window.sessionStorage.token)
      //   设备 id
      let Deviceid = (this.modify).deviceid
      //  设施类别
      let devicetypeid = ''
      if (!this.categoryDate.length) {
        this.$message({
          message: '请先选择设备类型',
          type: 'warning'
        })
        return false
      } else {
        devicetypeid = this.categoryDate[0]
      }
      //  生产厂家
      let manufacturerid = ''
      //  设备型号
      let devicemodel = ''
      //  设施位置
      let position = this.Specificposition ? this.Specificposition : ''
      //  技术参数
      let parameters = this.technicalParameter ? this.technicalParameter : ''
      //  备注说明
      let memo = this.textarea ? this.textarea : ''
      //  生产日期
      let madedate = this.productionValue1
      //  有效日期
      let effectivedate = this.validity
      //  单位
      let devunitid = ''
      // 设施编码
      let devicecode = this.facilityCode
      //  mac地址
      let mac = `${this.controllerCoding}.${this.loopNumber}.${this.oneTimeCode}.${this.addressCode}`
      let basedeviceid = this.categoryDate[this.categoryDate.length - 1]
      if (this.customManufacturer === true) {
        this.axios.post(maintainReportAddManufacture(this.customManufacturerDate, basedeviceid)).then((response) => {
          if (response.data.code === 0) {
            manufacturerid = response.data.data.manufacturerid
            if (this.versionManufacturer === true) {
              this.axios.post(AddDivecemodels(manufacturerid, basedeviceid, this.versionCustom, this.technicalParameter)).then((data) => {
                if (data.data.code === 0) {
                  devicemodel = data.data.data.divecemodelid
                  this.requestModification(token, Deviceid, this.maintainProject, areaid, manufacturerid, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitid, files)
                }
              })
            } else {
              devicemodel = this.versionValue
              this.requestModification(token, Deviceid, this.maintainProject, areaid, manufacturerid, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitid, files)
            }
          }
        })
      } else if (this.versionManufacturer === true) {
        if (!this.manufactorModel) {
          this.$message({
            message: '请先选择生产厂家！',
            type: 'warning'
          })
          return false
        }
        this.axios.post(AddDivecemodels(manufacturerid, devicetypeid, this.versionCustom, this.technicalParameter)).then((Item) => {
          if (Item.data.code === 0) {
            devicemodel = Item.data.data.divecemodelid
            this.requestModification(token, Deviceid, this.maintainProject, areaid, this.manufactorModel, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitid, files)
          }
        })
      } else {
        if (!this.manufactorModel) {
          this.$message({
            message: '请先选择生产厂家！',
            type: 'warning'
          })
          return false
        }
        devicemodel = this.versionValue
        manufacturerid = this.manufactorModel
        this.requestModification(token, Deviceid, this.maintainProject, areaid, manufacturerid, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitid, files)
      }
    },
    requestModification (token, deviceid, projectid, areaid, manufacturerid, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitId, files) {
      this.axios.post(updateDevice(token, deviceid, projectid, areaid, manufacturerid, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitId, files)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('modifysay', false)
        }
      })
    },
    closedown () {
      this.$emit('say', false)
    },
    focus (event) {
      let region = this.categoryDate
      if (region.length === 0) {
        this.$message({
          message: '设备选择设备类型！',
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
            if (!response.data.data.length) {
              this.manufactor.push({
                name: '自定义',
                manufacturerid: '-9999'
              })
            }
          }
        })
      }
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
    //  点击最父级，关闭地址框
    shutdown () {
      this.regionUl = false
    },

    accessarea () {
      this.regionUl = !this.regionUl
    },
    tiemerIf (timer) {
      if (!timer) {
        return ''
      } else {
        return dateTransfer(timer)
      }
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
    }
  },
  created () {
    //  审核日期
    this.conclusionExamination = this.tiemerIf(this.modify.approvaltime)
    //  审核意见
    this.approvalOpinion = this.modify.approvalopinion
    //  findAllRootAreasTree  下午写
    //  控制器编码
    this.controllerCoding = this.modify.mac_a
    //  回路号
    this.loopNumber = this.modify.mac_b
    //  一次码
    this.oneTimeCode = this.modify.mac_c
    //  地址编码
    this.addressCode = this.modify.mac_d
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(findAllRootAreasTree(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.facilityLocation = response.data.data
      }
    })
    this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        this.category = response.data.data
        this.categoryDate = (this.modify).devicetypeArray
        this.manufactorModel = (this.modify).manufacturerid
        let region = this.categoryDate[this.categoryDate.length - 1]
        this.axios.post(maintainReportfindManufactures(region)).then((data) => {
          if (data.data.code === 0) {
            this.manufactor = data.data.data
          }
        })
        if (this.modify.manufacturerid) {
          this.axios.post(maintainReportfindDivecemodels(region, (this.modify).manufacturerid)).then((response) => {
            if (response.data.code === 0) {
              this.version = response.data.data
              this.version.push({
                divecemodelname: '自定义',
                divecemodelid: '-9999'
              })
            }
          })
        }
        this.versionValue = this.modify.devicemodel ? parseInt(this.modify.devicemodel) : ''
        this.Specificposition = (this.modify).position
        this.productionValue1 = this.fmtDate((this.modify).madedate)
        this.validity = this.fmtDate((this.modify).effectivedate)
        this.textarea = (this.modify).memo
        this.technicalParameter = (this.modify).parameters
        this.Company = (this.modify).devunitid
        this.facilityCode = this.modify.devicecode
        if (!this.modify.photoArray.length) {
          this.fileList = []
        } else {
          this.modify.photoArray.forEach((val, index) => {
            let obj = {
              name: index,
              url: val
            }
            this.fileList.push(obj)
          })
        }
        if (!this.modify.fullareaid.length) {
          this.facilityLocationDate = []
        } else {
          this.modify.fullareaid.forEach((val) => {
            let nub = parseInt(val)
            this.facilityLocationDate.push(nub)
          })
        }
        if (this.modify.photoArray.length) {
          this.photoArrayBoolean = false
          this.photoArray = []
        } else {
          this.photoArrayBoolean = true
          this.photoArray = this.modify.photoArray
        }
        this.axios.post(GetDevUnit(token, this.modify.devicetypeid)).then((data) => {
          if (data.data.code === 0) {
            // let obj = {
            //   devunitId: -999,
            //   unitname: '自定义'
            // }
            // data.data.data.push(obj)
            this.CompanyData = data.data.data
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .newlyadded
    margin 80px 0 0
    width 100%
    background #111a28
  .increase
    width 1245px
    margin 0 auto
    position relative
    padding 45px 0
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
    margin-bottom 50px
    .modify_ul
      position relative
      display inline-block
      width 100%
      margin-top 25px
      .modify_li
        float left
        margin 0 0 0 20px
        color $color-header-b-normal
        font-size $font-size-medium
      .modify_liDiv
        init()
        margin-bottom 17px
      .modify_liDivtwo
        position relative
        display inline-block
        width 100%
        margin-bottom 17px
      .modify_li_p
        width 100px
        text-align right
        float left
        margin-right 6px
        line-height 30px
      .modify_li_div
        float left
        width 217px
        position relative
      .modify_li_divtwo
        float left
        line-height 40px
        margin-top -6px
      .modify_li_divthree
        float left
        width 218px
        position relative
      .modify_right
        width 100%
        float left
        color $color-header-b-normal
        font-size $font-size-medium
        .modify_li_p
          float left
          margin-left 20px
        .modify_rightDiv
           float left
           overflow hidden
           position relative
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
  .modify_rightDiv:hover .myFileDiv
     opacity 1
  .increaseSpan
    color #dd514c
  .modifySpantwo
    opacity 0
  .v-modal
    display none!important
</style>
<style>
  .modify_rightDiv .el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height: 80px;
  }
  .modify_rightDiv .el-upload--picture-card{
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
</style>

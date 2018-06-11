<template>
  <div class="newlyadded" @click="shutdown">
    <section class="increase">
      <h4 class="increase_h4">
        修改设备信息
      </h4>
      <div class="top_header">
        <p class="header_p">新录入信息将替换原对应的内容</p>
        <p class="thread"></p>
      </div>
      <section class="modify">
        <ul class="modify_ul">
          <li class="modify_li">
            <div class="modify_liDiv">
              <p class="modify_li_p">设施类别：</p>
              <div class="modify_li_div">
                   <el-cascader
                     :options="category"
                     :props="equipmentProps"
                     v-model="categoryDate"
                     change-on-select
                   ></el-cascader>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">生产厂家：</p>
              <div class="modify_li_div">
                <el-select @focus="focus" @change="manufacturerChange" v-model="manufactorModel" placeholder="">
                  <el-option
                    v-for="item in manufactor"
                    :key="item.manufacturerid"
                    :label="item.name"
                    :value="item.manufacturerid">
                  </el-option>
                </el-select>
              </div>
              <div class="modify_lidivRight">
                <el-input v-show="customManufacturer" v-model="customManufacturerDate" placeholder="请输入厂家"></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">规格型号：</p>
              <div class="modify_li_div">
                <el-select @change="versionChang(versionValue)" v-model="versionValue" placeholder="">
                  <el-option
                    v-for="item in version"
                    :key="item.divecemodelid"
                    :label="item.divecemodelname"
                    :value="item.divecemodelid">
                  </el-option>
                </el-select>
              </div>
              <div class="modify_lidivRight">
                <el-input v-show="versionManufacturer" v-model="versionCustom" placeholder="请输入规格型号"></el-input>
              </div>
            </div>
            <div class="modify_liDivtwo">
              <p class="modify_li_p">设施位置：</p>
              <div class="modify_li_div">
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
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">具体位置：</p>
              <div class="modify_li_div">
                <el-input v-model="Specificposition" placeholder=""></el-input>
              </div>
            </div>
          </li>
          <li class="modify_li">
            <div class="modify_liDiv">
              <p class="modify_li_p">生产日期：</p>
              <div class="modify_li_divtwo">
                <el-date-picker
                  v-model="productionValue1"
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
                  v-model="validity"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">
                技术参数：
              </p>
              <div class="modify_li_divthree">
                <el-input
                  type="textarea"
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
                  resize="none"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </li>
          <li class="modify_right">

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
import { fmtDate } from '../../common/js/utils'
export default {
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
      categoryDateOne: []
    }
  },
  beforeMount () {
    // console.log('111')
  },
  methods: {
    logTimeChange (val) {
      this.productionValue1 = val
    },
    conserve () {
      // token
      let token = JSON.parse(window.sessionStorage.token)
      //   设备 id
      let Deviceid = (this.modify).deviceid
      //  设施类别
      console.log(this.categoryDate)
      let devicetypeid = ''
      if (this.categoryDate[0] === null) {
        devicetypeid = ''
      } else {
        devicetypeid = this.categoryDate
        devicetypeid = devicetypeid[devicetypeid.length - 1]
      }
      //  生产厂家
      let manufacturerid = ''

      //  设备型号 devicemodel
      let devicemodel = ''
      if (this.versionManufacturer === true) {
        // devicemodel = this.versionCustom
      } else {
        devicemodel = this.versionValue ? this.versionValue : ' '
      }
      console.log(devicemodel)
      //  设施位置
      let position = `${this.regionDate ? this.regionDate : ' '} ${this.Specificposition ? this.Specificposition : ' '}`
      console.log(position)
      //  技术参数
      let parameters = this.technicalParameter ? this.technicalParameter : ' '
      console.log(parameters)
      //  备注说明
      let memo = this.textarea ? this.textarea : ' '
      //  生产日期
      let madedate = this.productionValue1
      console.log(this.productionValue1)
      //  有效日期
      let effectivedate = this.validity
      console.log(this.validity)
      if (this.customManufacturer === true) {
        // manufacturerid = this.customManufacturerDate
        console.log('1')
        if (devicetypeid.length !== 0) {
          if (this.customManufacturer === true) {
            console.log('2')
            this.axios.post(`http://172.16.6.16:8920/dev/AddManufacture?name=${this.customManufacturerDate}&basedeviceid=${devicetypeid}`).then((response) => {
              if (response.data.code === 0) {
                console.log('3')
                manufacturerid = response.data.data.manufacturerid
                if (this.versionManufacturer === true) {
                  console.log('4')
                  this.axios.post(`http://172.16.6.16:8920/dev/AddDivecemodels?manufactureId=${manufacturerid}&baseDeviceId=${Deviceid}&modelName=${this.versionCustom}&para=${this.technicalParameter}`).then((response) => {
                    if (response.data.code === 0) {
                      console.log('5')
                      devicemodel = response.data.data.divecemodelid
                      this.axios.post(` http://172.16.6.16:8920/dev/updateDevice?token=${token}&deviceid=${Deviceid}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&devicemodel=${devicemodel}&position=${position}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}`).then((response) => {
                        if (response.data.code === 0) {
                          alert('修改成功')
                          this.modifyBoolean = this.msg
                          this.modifyBoolean = !this.modifyBoolean
                          this.$emit('say', this.modifyBoolean)
                        }
                      })
                    }
                  })
                } else {

                }
              }
            })
          } else {
            this.axios.post(` http://172.16.6.16:8920/dev/updateDevice?token=${token}&deviceid=${Deviceid}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&devicemodel=${devicemodel}&position=${position}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}`).then((response) => {
              if (response.data.code === 0) {
                alert('修改成功')
                this.modifyBoolean = this.msg
                this.modifyBoolean = !this.modifyBoolean
                this.$emit('say', this.modifyBoolean)
              }
            })
          }
        } else {
          alert('请先选择设备类型!')
        }
      } else {
        manufacturerid = this.manufactorModel
        if (this.versionManufacturer === true) {
          this.axios.post(`http://172.16.6.16:8920/dev/AddDivecemodels?manufactureId=${manufacturerid}&baseDeviceId=${Deviceid}&modelName=${this.versionCustom}&para=${this.technicalParameter}`).then((response) => {
            if (response.data.code === 0) {
              console.log('5')
              console.log(response.data.data)
              devicemodel = response.data.data.divecemodelid
              this.axios.post(` http://172.16.6.16:8920/dev/updateDevice?token=${token}&deviceid=${Deviceid}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&devicemodel=${devicemodel}&position=${position}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}`).then((response) => {
                if (response.data.code === 0) {
                  alert('修改成功')
                  this.modifyBoolean = this.msg
                  this.modifyBoolean = !this.modifyBoolean
                  this.$emit('say', this.modifyBoolean)
                }
              })
            }
          })
        } else {
          this.axios.post(` http://172.16.6.16:8920/dev/updateDevice?token=${token}&deviceid=${Deviceid}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&devicemodel=${devicemodel}&position=${position}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}`).then((response) => {
            console.log(response)
          })
        }
      }
    },
    closedown () {
      this.modifyBoolean = this.msg
      this.modifyBoolean = !this.modifyBoolean
      this.$emit('say', this.modifyBoolean)
    },
    focus (event) {
      let region = this.categoryDate
      console.log(region)
      if (region.length === 0) {
        this.$message({
          message: '设备类型！',
          type: 'warning'
        })
        return false
      } else if (region[0] === null) {
        console.log(this.manufactor)
        let result = this.manufactor.find(val => val.manufacturerid === '-9999')
        console.log('212')
        console.log(result)
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
        this.axios.post(`http://172.16.6.16:8920/dev/findManufactures?baseDeviceId=${region}`).then((response) => {
          if (response.data.code === 0) {
            this.manufactor = response.data.data
            console.log(this.manufactor)
            this.manufactor.push({
              name: '自定义',
              manufacturerid: '-9999'
            })
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
        this.axios.post(`http://172.16.6.16:8920/dev/findDivecemodels?baseDeviceId=${region}&manufacturerId=${this.manufactorModel}`).then((response) => {
          if (response.data.code === 0) {
            console.log(response)
            this.version = response.data.data
            console.log(response.data.data)
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
        console.log(data)
        let result = this.version.find(val => val.divecemodelid === data)
        console.log(result.parameters)
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
      console.log()
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
    }
  },
  created () {
    this.axios.post('http://172.16.6.16:8920/dev/findAllDeviceType').then((response) => {
      if (response.data.code === 0) {
        this.category = response.data.data
        this.categoryDate = (this.modify).devicetypeArray
        console.dir(this.categoryDate)
        this.manufactorModel = (this.modify).manufacturerid
        this.versionValue = (this.modify).devicemodel
        this.regionDate = (this.modify).position
        this.productionValue1 = fmtDate((this.modify).madedate)
        this.validity = fmtDate((this.modify).effectivedate)
        this.textarea = (this.modify).memo
        this.technicalParameter = (this.modify).parameters
      }
    })
    //  省份
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
  .newlyadded
    margin 180px 0 0
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
    margin-bottom 120px
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
        width 280px
        position relative
      .modify_right
        float right
        color $color-header-b-normal
        font-size $font-size-medium
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
</style>

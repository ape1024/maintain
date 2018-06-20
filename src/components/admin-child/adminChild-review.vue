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
                <p class="modify_li_p">设施类别：</p>
                <div class="modify_li_div">
                  <el-cascader
                    :options="category"
                    :props="equipmentProps"
                    v-model="categoryDate"
                    @change="categoryChange"
                  ></el-cascader>
                </div>
              </div>
              <div class="modify_liDivthree">
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
              <div class="modify_liDivthree">
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
              <div class="modify_liDivthree">
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
            </li>
            <li class="modify_li">
              <div class="modify_liDiv">
                <p class="modify_li_p">生产日期：</p>
                <div class="modify_li_divtwo">
                  <el-date-picker
                    v-model="productionValue1"
                    type="date"
                    value-format="yyyy-MM-dd"
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
          </ul>
        </section>
      </div>
      <div class="increase_bottom">
        <div class="top_header">
          <p class="header_p">
            逐一录入每隔设施的具体信息
          </p>
          <p class="thread"></p>
        </div>
        <ul class="bottom_ul">
          <li class="bottom_left">
            <div class="left_listTwo">
              <div class="modify_liDivtwo">
                <p class="left_list_p">设施位置:</p>
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
              <div class="specific">
                <el-input v-model="specific" placeholder="请输入详细地址"></el-input>
              </div>
            </div>
            <div class="left_list">
              <p class="left_list_p">地址编码:</p>
              <div class="encrypt">
                <el-input v-model="encoded" placeholder="请输入内容"></el-input>
              </div>
            </div>
          </li>
          <li class="bottom_left">
            <div class="left_list">
              <p class="left_list_p">设施数量:</p>
              <div class="left_list_div">
                <el-input v-model="quantum" placeholder=""></el-input>
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
              <li class="tabulation_li">设施位置</li>
              <li class="tabulation_li">设施数量</li>
              <li class="tabulation_li">地址编码</li>
              <li class="tabulation_li">操作</li>
            </ul>
          </div>
          <div class="tabulation_title">
            <ul class="title_ul">
              <li v-for="(item,$index) in tabulationtitle" :key="item.id" :id="item.id" class="title_li">
                <ul class="title_li_ul">
                  <li class="title_lili">
                    {{item.seat}}
                  </li>
                  <li class="title_lili">
                    {{item.amount}}
                  </li>
                  <li class="title_lili">
                    {{item.seatcode}}
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
export default {
  name: 'adminChild-review',
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
      dialogImageUrl: '',
      dialogVisible: false,
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
      picName: []
    }
  },
  methods: {
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
    addincrease () {
      let obtainCode = this.regionDate + this.specific
      let devicecoding = this.devicecoding
      let quantum = this.quantum
      let encoded = this.encoded
      let data = {
        // 编码
        code: devicecoding,
        // 位置
        seat: obtainCode,
        // 数量
        amount: quantum,
        // 地址编码
        seatcode: encoded
      }
      if (this.checked) {
        for (let i = 1; i <= this.num; i++) {
          this.tabulationtitle.unshift(data)
        }
      } else {
        this.tabulationtitle.unshift(data)
      }
    },
    amputate (index) {
      this.tabulationtitle.splice(index, 1)
    },
    calloff () {
      // 取消
      this.lyaddedShow = this.msg
      this.lyaddedShow = !this.lyaddedShow
      this.$emit('say', this.lyaddedShow)
    },
    categoryChange () {
      let organizationId = this.categoryDate[this.categoryDate.length - 1]
      console.log(organizationId)
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
      console.log(result)
      this.basedevicecode = result
    },
    preser () {
      console.log(this.productionValue1)
      console.log(this.validity)
      // 保存
      // this.lyaddedShow = this.msg
      // this.lyaddedShow = !this.lyaddedShow
      // this.$emit('say', this.lyaddedShow)
      //  批量编码 个数
      let rowcount = this.num ? this.num : 1
      console.log(rowcount + '编码个数')
      //  token
      let token = JSON.parse(window.sessionStorage.token)
      console.log(token + 'token')
      //  厂家id
      let manufacturerid = ''
      //  型号
      let devicemodel = ''
      if (this.versionManufacturer) {
        devicemodel = this.versionCustom ? this.versionCustom : ' '
      } else {
        devicemodel = this.versionValue ? this.versionValue : ' '
      }
      //  位置
      let position = this.regionDate ? `${this.regionDate} ${this.specific}` : ' '
      console.log(position + '位置')
      //  数量
      let devicecount = this.quantum ? this.quantum : ' '
      console.log(devicecount + '数量')
      //  设备参数
      let parameters = this.technicalParameter ? this.technicalParameter : ' '
      console.log(parameters + '参数')
      // 备注
      let memo = this.textarea ? this.textarea : ' '
      console.log(memo + '备注')
      //  生产日期
      let madedate = this.productionValue1 ? this.productionValue1 : ' '
      console.log(madedate + '生产日期')
      //  有效日期
      let effectivedate = this.validity ? this.validity : ' '
      console.log(effectivedate + '有效日期s')
      //  地址编码
      let mac = this.encoded ? this.encoded : ' '
      if (this.categoryDate.length !== 0) {
        //  设备id
        console.log('1')
        let devicetypeid = this.categoryDate[this.categoryDate.length - 1]
        if (this.customManufacturer === true) {
          console.log('2')
          this.axios.post(`http://172.16.6.16:8920/dev/AddManufacture?name=${this.customManufacturerDate}&basedeviceid=${devicetypeid}`).then((response) => {
            console.log(response)
            if (response.data.code === 0) {
              // 厂家id
              manufacturerid = response.data.data.manufacturerid
              this.axios.post(`http://172.16.6.16:8920/dev/AddDevice?rowcount=${rowcount}&token=${token}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&basedevicecode=${this.basedevicecode}&devicemodel=${devicemodel}&position=${position}&devicecount=${devicecount}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}&mac=${mac}`).then((response) => {
                if (response.data.code === 0) {
                  alert('创建成功！')
                  this.lyaddedShow = this.msg
                  this.lyaddedShow = !this.lyaddedShow
                  this.$emit('say', this.lyaddedShow)
                }
              })
            }
          })
        } else {
          //  厂家 id
          manufacturerid = this.manufactorModel
          this.axios.post(`http://172.16.6.16:8920/dev/AddDevice?rowcount=${rowcount}&token=${token}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&basedevicecode=${this.basedevicecode}&devicemodel=${devicemodel}&position=${position}&devicecount=${devicecount}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}&mac=${mac}`).then((response) => {
            if (response.data.code === 0) {
              alert('创建成功！')
              this.lyaddedShow = this.msg
              this.lyaddedShow = !this.lyaddedShow
              this.$emit('say', this.lyaddedShow)
            }
          })
        }
      } else {
        alert('请先选择设备类型！')
      }
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
    }
  },
  created () {
    //  设备类型
    this.axios.post('http://172.16.6.16:8920/dev/findAllDeviceType').then((response) => {
      if (response.data.code === 0) {
        console.log(response.data.data)
        this.category = response.data.data
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
      max-height 180px
      min-height 180px
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
          width 25%
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
               width 25%
               height 40px
               float left
               text-align center
               .title_lili_div
                 width 107px
                 height 32px
                 border-radius 5px
                 line-height 32px
                 text-align center
                 background $color-border-b-alarm
                 cursor pointer
                 margin 4px auto
                 transition .2s
                 &:hover
                   background #dc4d5f
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
       display inline-block
       width 167px
       height 36px
       border-radius 5px
       text-align center
       line-height 36px
       background $color-background-query
       margin-right 110px
       cursor pointer
       transition .2s
       &:hover
         background: #4b92bf;
     .cancel
       display inline-block
       width 167px
       height 36px
       border-radius 5px
       text-align center
       line-height 36px
       background $color-background-button
       cursor pointer
       transition .2s
       &:hover
         background #304364
  .newlyadded
    margin 40px 0 0
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
      position relative
      display inline-block
      margin-left 20px
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
    margin-bottom 17px
  .el-cascader
     line-height 30px
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
    position: absolute;
    top 0
    left 0
    width 100%
    height 100%
    opacity 0
    cursor pointer
  .upload:hover
     cursor pointer
     background $color-background-query
</style>
<style>
  .el-input__icon{
    line-height: 20px;
  }
</style>

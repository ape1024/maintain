<template>
  <section>
    <div class="rightHeader">
      <ul class="rightHeaderUl">
        <li class="rightHeaderLi">
          <p class="rightHeaderLiP">建筑区域：</p>
          <div class="rightHeaderLiDiv">
            <el-cascader
              size="mini"
              clearable
              v-model="locationDate"
              :options="locationformation"
              :props="locationProps"
              change-on-select
            ></el-cascader>
          </div>
        </li>
      </ul>
      <div class="query" @click="query">
        查询
      </div>
      <div class="rightHeaderRight">
        <!--明细表-->
        <div class="schedule" @click="schedule">
          明细表
        </div>
        <div class="maintenance">
          运维记录
        </div>
        <div class="Information" @click="information">
          信息卡
        </div>
      </div>
    </div>
    <div class="principalPart">
      <div class="principalHeader">
        <ul class="principalHeaderUl">
          <li class="principalHeaderLi principalHeaderLiOne">
            <el-checkbox @change="checkedChang" v-model="checked"></el-checkbox>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">设施类别
            <i class="el-icon-caret-bottom"></i>
            <div class="threelevel_ensconce">
              <el-select v-model="equipmentDate" placeholder="请选择">
                <el-option
                  v-for="item in equipmentinformation"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </li>
          <!--<li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">管理编码-->
          <!--</li>-->
          <li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">
            设置位置
            <div class="threelevel_ensconce">

            </div>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            数量
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            设备编码
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            生产厂家
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            规格型号
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            生产日期
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            有效日期
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            运行状态
            <i class="el-icon-caret-bottom"></i>
            <div class="threelevel_ensconce">
              <el-select size="mini" v-model="processingData" placeholder="请选择">
                <el-option
                  v-for="item in processing"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">现场照片</li>
          <li class="principalHeaderLi principalHeaderLiOne">操作</li>
        </ul>
      </div>
      <ul class="principalMainbody">
        <li class="principalMainbodyLi principalMainbodyLiBorDer" :key="index" v-for="(item, index) in principalmainbody">
          <ul class="principalHeaderUl">
            <li class="principalHeaderLi principalHeaderLiOne">
              <el-checkbox v-model="item.flag"></el-checkbox>
            </li>
            <li :title="item.devicetypename" class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">
              {{item.devicetypename}}
            </li>
            <!--<li :title="item.devivccode" class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">-->
              <!--{{item.devivccode}}-->
            <!--</li>-->
            <li :title="item.fullareaname" class="principalHeaderLi heavyPlayLiDivLiOne">
              {{item.fullareaname}}
            </li>
            <li :title="item.devicecount" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.devicecount}}
            </li>
            <li :title="item.devicecode" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.devicecode}}
            </li>
            <li :title="item.manafacutename" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.manafacutename}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.devicemodel}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.devicecreatetime}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.effectivedate}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo" :class="[item.devicestatename === '正常' ? 'conclusionClassOne' : 'conclusionClassThree']">
              {{item.devicestatename}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              <img class="principalHeaderLiImg" :key="urlIndex" v-for="(url, urlIndex) in item.photosArr" :src="url" alt="">
            </li>
            <li class="principalHeaderLi principalHeaderLiOne cephalosomeFiveSpan" @click.stop="examine(item.deviceid)">查看</li>
          </ul>
        </li>
      </ul>
      <section v-if="lookoverBoolean" @click.stop class="review">
        <!--查看-->
        <childLookover :inspection="examineInspection" :information="examineInformation" :msg="lookoverBoolean" @look="Onlook"></childLookover>
      </section>
      <div class="pagination">
        <div v-if="paginationFlag" class="paginationDiv">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="numberPagesChange"
            :current-page="currentPage"
            :page-count="numberPages">
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { projectMixin } from 'common/js/mixin'
import childLookover from '../adminChild-operation/adminChild-lookover'
import { findAreasTreeByProjectid, findAllDeviceType, getAllTaskDevstate, statTaskDevListInfo, adminfindDeviceDetail, adminFindInspectionMaintenance, generateTaskDevDetailInfo, generateTaskTaizgangInfo } from '../../api/user'
export default {
  name: 'pigeonhole-protectionFacilities',
  mixins: [projectMixin],
  components: {
    childLookover
  },
  data () {
    return {
      input: '',
      endTime: '',
      options: [],
      regionModel: [],
      principalmainbody: [],
      urlPhotos: '',
      equipmentDate: '',
      equipmentinformation: [],
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'code'
      },
      locationDate: [],
      locationformation: [],
      locationProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      pagination: '',
      paginationFlag: false,
      currentPage: 1,
      numberPages: 1,
      conclusion: [],
      conclusionData: '',
      checked: false,
      taskType: '',
      processingData: '',
      picPath: '',
      processing: [],
      examineInformation: '',
      lookoverBoolean: false,
      examineInspection: ''
    }
  },
  watch: {
    equipmentDate (data) {
      if (data) {
        this.paginationFlag = false
        let token = JSON.parse(window.sessionStorage.token)
        let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
        this.getData(token, this.maintainProject, data, locationDate, this.processingData, 1, 15)
      }
    },
    processingData (data) {
      if (data) {
        this.paginationFlag = false
        let token = JSON.parse(window.sessionStorage.token)
        let equipmentDate = this.equipmentDate ? this.equipmentDate : ''
        let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
        this.getData(token, this.maintainProject, equipmentDate, locationDate, data, 1, 15)
      }
    }
  },
  methods: {
    schedule () {
      let arr = []
      this.principalmainbody.forEach((val) => {
        if (val.flag) {
          arr.push(val.deviceid)
        }
      })
      if (arr.length) {
        let token = JSON.parse(window.sessionStorage.token)
        let String = arr.join()
        let areaid = this.locationDate[this.locationDate.length - 1]
        this.axios.post(generateTaskTaizgangInfo(token, this.maintainProject, String, areaid)).then((response) => {
          if (response.data.code === 0) {
            console.log(response.data.data)
            if (response.data.data) {
              let array = []
              if (response.data.data.indexOf(',') === -1) {
                array.push(response.data.data)
              } else {
                array = response.data.data.split(',')
              }
              array.forEach((val) => {
                window.open(val, '_blank')
              })
            }
          }
        })
      }
    },
    information () {
      let token = JSON.parse(window.sessionStorage.token)
      let arr = []
      this.principalmainbody.forEach((val) => {
        if (val.flag) {
          arr.push(val.deviceid)
        }
      })
      if (arr.length) {
        let String = arr.join()
        this.axios.post(generateTaskDevDetailInfo(token, this.maintainProject, String)).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data) {
              let array = []
              if (response.data.data.indexOf(',') === -1) {
                array.push(response.data.data)
              } else {
                array = response.data.data.split(',')
              }
              array.forEach((val) => {
                window.open(val, '_blank')
              })
            }
          }
        })
      } else {
        this.$message({
          message: '请选择设备',
          type: 'warning'
        })
      }
    },
    init () {
      this.Initialization()
    },
    Onlook () {
      this.lookoverBoolean = false
    },
    examine (deviceid) {
      // 点击查看
      this.axios.post(adminfindDeviceDetail(deviceid)).then((response) => {
        if (response.data.code === 0) {
          this.examineInformation = response.data.data
          this.axios.post(adminFindInspectionMaintenance(deviceid)).then((data) => {
            if (data.data.code === 0) {
              this.examineInspection = data.data.data
              this.lookoverBoolean = true
            }
          })
        }
      })
    },
    query () {
      let token = JSON.parse(window.sessionStorage.token)
      this.equipmentDate = ''
      this.processingData = ''
      this.paginationFlag = false
      let areaid = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
      this.getData(token, this.maintainProject, '', areaid, '', 1, 15)
    },
    Initialization () {
      this.paginationFlag = false
      let token = JSON.parse(window.sessionStorage.token)
      this.equipmentDate = ''
      this.locationDate = []
      this.processingData = ''
      //  设施类别
      this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.equipmentinformation = response.data.data
        }
      })
      //  设施位置
      this.axios.post(findAreasTreeByProjectid(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.locationformation = response.data.data
          console.log(response.data.data)
          console.log(response.data.data)
          if (response.data.data.length) {
            this.locationDate.push(response.data.data[0].areaid)
            this.getData(token, this.maintainProject, this.equipmentDate, response.data.data[0].areaid, this.processingData, 1, 15)
          }
        }
      })
    },
    checkedChang (data) {
      if (data) {
        this.principalmainbody.forEach((val) => {
          val.flag = true
        })
      } else {
        this.principalmainbody.forEach((val) => {
          val.flag = false
        })
      }
    },
    numberPagesChange (el) {
      let token = JSON.parse(window.sessionStorage.token)
      let equipmentDate = this.equipmentDate ? this.equipmentDate : ''
      let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
      this.getData(token, this.maintainProject, equipmentDate, locationDate, this.processingData, el, 15)
    },
    viewProcessing (data) {
      let text = ''
      this.processing.forEach((val) => {
        if (val.value === data) {
          text = val.name
        }
      })
      return text
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    recurrence (obj) {

    },
    getData (token, projectid, devtypeid, areaid, devstate, pageIndex, pageSize) {
      this.axios.post(statTaskDevListInfo(token, projectid, devtypeid, areaid, devstate, pageIndex, pageSize)).then((response) => {
        if (response.data.code === 0) {
          response.data.data.devs.datas.forEach((val) => {
            val.flag = false
            val.photosArr = []
            if (val.photos) {
              if (val.photos.indexOf(',') !== -1) {
                let arr = val.photos.split(',')
                arr.forEach((item) => {
                  val.photosArr.push(`${item}`)
                })
              } else {
                val.photosArr.push(val.photos)
              }
            }
          })
          this.paginationFlag = true
          this.numberPages = response.data.data.devs.totalPage
          this.principalmainbody = response.data.data.devs.datas
        }
      })
    }
  },
  created () {
    //  时间节点
    let token = JSON.parse(window.sessionStorage.token)
    this.Initialization()
    //  处理结果
    this.axios.post(getAllTaskDevstate(token)).then((response) => {
      if (response.data.code === 0) {
        this.processing = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .rightHeader
    overflow hidden
    background #111a28
    padding 20px 0
    display flex
    .rightHeaderUl
      margin-left 30px
      overflow hidden
      float left
      position relative
      display flex
      .rightHeaderLi
        float left
        overflow hidden
        line-height 40px
        margin-right 20px
        display flex
        .rightHeaderLiP
          color #eee
          float left
          margin-right 10px
          line-height 40px
        .rightHeaderLiDiv
          float left
          overflow hidden
          width 167px
        .rightHeaderLiDivOne
          float left
          display flex
          width 260px
  .principalPart
    width 100%
    position relative
    overflow hidden
    .principalHeader
      width 100%
      overflow hidden
      position relative
      color #d5d5d5
      font-size 16px
      height 32px
      padding 2px 0 6px
      background #354d76
  .principalHeaderLiOne
    width 6%
  .heavyPlayLiDivLiOne
    width 15.5%
    padding 0 .5%
  .heavyPlayLiDivLiTwo
    padding 0 .5%
    width 7%
  .heavyPlayLiDivLiThree
    padding-right 1%
    width 25%
  .heavyPlayLiDiv
    width 66%
    font-size 16px
    color #fff
    overflow hidden
    position relative
    float left
    .heavyPlayLiDivUl
      overflow hidden
      position relative
      box-sizing border-box
      line-height 40px
      height 40px
      float left
      width 100%
  .principalPartI
    cursor pointer
  .rightHeaderLiPtwo
    color #eee
    float left
    line-height 40px
    margin-right 20px
  .query
    queryDiv()
    float left
    margin-top 5px
  .rightHeaderRight
    float right
    position relative
    overflow hidden
    margin-top 5px
  .schedule, .summary
    newlyDiv()
    float left
    color #fff
  .principalMainbody
    overflow hidden
    position relative
    min-height 640px
    width 100%
    .principalMainbodyLi
      overflow hidden
      position relative
      width 100%
      .principalMainbodyLiUl
        overflow hidden
        position relative
        width 100%
        .principalMainbodyLiUlLi
          font-size 16px
          color #fff
          overflow hidden
          line-height 40px
          text-overflow ellipsis
          white-space nowrap
          min-height 40px
          float left
          -webkit-box-sizing border-box
          box-sizing border-box
  .principalHeaderLi
    overflow hidden
    position relative
    text-overflow ellipsis
    text-align center
    white-space nowrap
    min-height 36px
    max-height 36px
    line-height 36px
    color #fff
    float left
    box-sizing border-box
  .principalHeaderLiTwo
    overflow hidden
    text-align left
    text-overflow ellipsis
    white-space nowrap
    min-height 40px
    float left
    box-sizing border-box
  .principalHeaderLiImg
    margin 5px 6px 0 0
    display inline-block
    height 30px
    width 30px
  .principalMainbodyLiBorDer
    border-bottom 1px solid #3f4856
  .lookover
    overflow hidden
    float right
    font-size 16px
    color #3279a6
    text-align center
    width 6%
  .lookoverTwo
    overflow hidden
    float right
    font-size 16px
    line-height 38px
    color #fff
    text-align center
    width 6%
  .threelevel_ensconce
    overflow hidden
    z-index 1
    position absolute
    top 0
    height 100%
    width 100%
    left 0
    opacity 0
  .pagination
    overflow hidden
    margin-top 40px
    min-height 32px
    position relative
    width 100%
    .paginationDiv
      overflow hidden
      position relative
      text-align center
  .principalHeaderLiImg
    margin 5px 6px 0 0
    display inline-block
    height 30px
    width 30px
  .principalHeaderUl
    overflow hidden
    position relative
    padding 2px 0
  .lookover
    overflow hidden
    float right
    font-size 16px
    color #3279a6
    cursor pointer
    text-align center
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-barckground-transparent
    z-index 1111
    overflow hidden
  .cephalosomeFiveSpan
    cursor pointer
    color #3279a6
  .conclusionClassOne
    color #3acf76!important
  .conclusionClassThree
    color #cfb53a!important
  .Information
    width 106px
    height 29px
    color #fff
    line-height 29px
    border-radius 5px
    font-size 14px
    text-align center
    display inline-block
    margin-right 20px
    cursor pointer
    -webkit-transition 0.2s
    transition 0.2s
    background #8d8877
    &:hover
     background #a29c89
  .maintenance
    width 106px
    height 29px
    color #fff
    line-height 29px
    border-radius 5px
    font-size 14px
    text-align center
    display inline-block
    margin-right 20px
    cursor pointer
    -webkit-transition 0.2s
    transition 0.2s
    background #3acf76
    &:hover
      background #42e583
</style>
<style>
  .principalHeaderLi .el-checkbox__label {
    font-size: 16px;
    color: #fff;
  }
</style>

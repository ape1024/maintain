<template>
  <section>
    <div class="rightHeader">
      <ul class="rightHeaderUl">
        <li class="rightHeaderLi">
          <p class="rightHeaderLiP">时间：</p>
          <div class="rightHeaderLiDiv">
            <el-date-picker
              size="mini"
              v-model="startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li class="rightHeaderLi">
          <p class="rightHeaderLiPtwo">—</p>
          <div class="rightHeaderLiDiv">
            <el-date-picker
              size="mini"
              v-model="endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
      </ul>
      <div class="query" @click="query">
        查询
      </div>
      <div class="rightHeaderRight">
        <!--明细表-->
        <div class="schedule">
          明细表
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
              <el-cascader
                size="mini"
                clearable
                v-model="equipmentDate"
                :options="equipmentinformation"
                :props="equipmentProps"
                change-on-select
              ></el-cascader>
            </div>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">设施位置
            <i class="el-icon-caret-bottom"></i>
            <div class="threelevel_ensconce">
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
          <li class="principalHeaderLi heavyPlayLiDivLiOne">
            异常情况
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            反馈人员
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            反馈时间
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            确认人员
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            确认时间
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            处理结果
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
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            现场照片
          </li>
          <li class="principalHeaderLi principalHeaderLiOne">操作</li>
        </ul>
      </div>
      <ul class="principalMainbody">
        <li class="principalMainbodyLi principalMainbodyLiBorDer" :key="index" v-for="(item, index) in principalmainbody">
          <ul class="principalHeaderUl">
            <li class="principalHeaderLi principalHeaderLiOne">
              <el-checkbox v-model="item.flag"></el-checkbox>
            </li>
            <li :title="item.devicename" class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">
              {{item.devicename}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">
              {{item.fullareanasme}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiOne">
              {{item.feedbackinfo}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.feedbackperson}}
            </li>
            <li :title="item.feedbacktime ? fmtDate(item.feedbacktime) : ''" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.feedbacktime ? fmtDate(item.feedbacktime) : ''}}
            </li>
            <li :title="item.confirmpersonname" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.confirmpersonname}}
            </li>
            <li :title="item.confirmpertime ? fmtDate(item.confirmpertime) : ''" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.confirmpertime ? fmtDate(item.confirmpertime) : ''}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.disposestate ? viewProcessing(item.disposestate) : ''}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              <img class="principalHeaderLiImg" :key="urlIndex" v-for="(url, urlIndex) in item.photosArr" :src="url" alt="">
            </li>
            <li class="principalHeaderLi principalHeaderLiOne lookover">
              查看
            </li>
          </ul>
        </li>
      </ul>
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
import { statFeedBackInfo, findAreasTreeByProjectid, findAllDeviceType, getAllFeedbackstate } from '../../api/user'
export default {
  name: 'pigeonhole-feedback',
  mixins: [projectMixin],
  data () {
    return {
      input: '',
      startTime: '',
      endTime: '',
      options: [],
      regionModel: [],
      principalmainbody: [],
      urlPhotos: '',
      equipmentDate: [],
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
      checked: '',
      taskType: '',
      processingData: '',
      picPath: '',
      processing: []
    }
  },
  watch: {
    equipmentDate (data) {
      if (data.length >= 2) {
        let token = JSON.parse(window.sessionStorage.token)
        let equipmentDate = data[data.length - 1]
        let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
        this.getData(token, this.maintainProject, equipmentDate, locationDate, this.processingData, this.startTime, this.endTime, 1, 20)
      }
    },
    locationDate (data) {
      if (data.length) {
        let token = JSON.parse(window.sessionStorage.token)
        let locationDate = data[data.length - 1]
        let equipmentDate = this.equipmentDate.length >= 2 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        this.getData(token, this.maintainProject, equipmentDate, locationDate, this.processingData, this.startTime, this.endTime, 1, 20)
      }
    },
    processingData (data) {
      if (data) {
        let token = JSON.parse(window.sessionStorage.token)
        let equipmentDate = this.equipmentDate.length >= 2 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
        this.getData(token, this.maintainProject, equipmentDate, locationDate, data, this.startTime, this.endTime, 1, 20)
      }
    }
  },
  methods: {
    init () {
      this.Initialization()
    },
    query () {

    },
    Initialization () {
      let token = JSON.parse(window.sessionStorage.token)
      this.equipmentDate = []
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
        }
      })
      this.getData(token, this.maintainProject, this.equipmentDate, this.locationDate, this.processingData, this.startTime, this.endTime, 1, 20)
    },
    checkedChang (data) {
    },
    numberPagesChange (el) {

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
    getData (token, projectid, devtypeid, areaid, devstate, start, end, pageIndex, pageSize) {
      this.axios.post(statFeedBackInfo(token, projectid, devtypeid, areaid, devstate, start, end, pageIndex, pageSize)).then((response) => {
        if (response.data.code === 0) {
          console.log(response)
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
    let timestamp = (new Date()).getTime()
    this.startTime = this.fmtDate(timestamp - 3600 * 24 * 30 * 1000)
    this.endTime = this.fmtDate(timestamp + 3600 * 24 * 1000)
    this.Initialization()
    //  处理结果
    this.axios.post(getAllFeedbackstate(token)).then((response) => {
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
          display flex
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
    width 13%
    padding 0 .5%
  .heavyPlayLiDivLiTwo
    padding 0 1%
    width 8%
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
    min-height 40px
    max-height 40px
    line-height 38px
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
  .lookover
    overflow hidden
    float right
    font-size 16px
    color #3279a6
    cursor pointer
    text-align center
</style>
<style>
  .principalHeaderLi .el-checkbox__label {
    font-size: 16px;
    color: #fff;
  }
</style>

<template>
  <section>
    <div class="rightHeader">
      <ul class="rightHeaderUl">
        <li class="rightHeaderLi">
          <p class="rightHeaderLiP">计划名称：</p>
          <div class="rightHeaderLiDivOne">
            <el-select size="mini" clearable v-model="regionDate" placeholder="请选择">
              <el-option
                v-for="item in regionModel"
                :key="item.checkplanid"
                :label="item.planname"
                :value="item.checkplanid">
              </el-option>
            </el-select>
          </div>
        </li>
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
        <div class="schedule" @click="schedule">
          明细表
        </div>
        <!--汇总表-->
        <div class="summary" @click="summary">
          汇总表
        </div>
      </div>
    </div>
    <div class="principalPart">
      <div class="principalHeader">
        <ul class="principalHeaderUl">
          <li class="principalHeaderLi principalHeaderLiOne principalPartI">设施类别
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
          <li class="principalHeaderLi principalHeaderLiOne principalPartI">设施位置
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
          <div class="heavyPlayLiDiv">
            <ul>
              <li class="principalHeaderLi heavyPlayLiDivLiOne">工作方式</li>
              <li class="principalHeaderLi heavyPlayLiDivLiThree">工作事项</li>
              <li class="principalHeaderLi heavyPlayLiDivLiThree">工作记录</li>
              <li class="principalHeaderLi heavyPlayLiDivLiOne">工作人员</li>
              <li class="principalHeaderLi heavyPlayLiDivLiTwo">工作时间</li>
              <li class="principalHeaderLi heavyPlayLiDivLiOne">工作结论
                <i class="el-icon-caret-bottom"></i>
                <div class="threelevel_ensconce">
                  <el-select v-model="conclusionData" placeholder="请选择">
                    <el-option
                      v-for="item in conclusion"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li class="principalHeaderLi heavyPlayLiDivLiTwo">现场照片</li>
            </ul>
          </div>
          <li class="lookoverTwo">操作</li>
        </ul>
      </div>
      <ul class="principalMainbody">
        <li class="principalMainbodyLi principalMainbodyLiBorDer" :key="index" v-for="(item, index) in principalmainbody">
          <ul class="principalMainbodyLiUl">
            <li :title="item.devicename" :style="{height: item.checktaskdetail.length * 40 + 'px', lineHeight: item.checktaskdetail.length * 40 + 'px'}" class="principalMainbodyLiUlLi principalHeaderLiOne">
              {{item.devicename}}
            </li>
            <li :style="{height: item.checktaskdetail.length * 40 + 'px', lineHeight: item.checktaskdetail.length * 40 + 'px'}" :title="item.areaname" class="principalMainbodyLiUlLi principalHeaderLiOne">
              {{item.areaname}}
            </li>
            <div class="heavyPlayLiDiv">
              <ul class="heavyPlayLiDivUl" :key="sumIndex" v-for="(data, sumIndex) in item.checktaskdetail">
                <li :title="data.workmodename" class="principalHeaderLiTwo heavyPlayLiDivLiOne">
                  {{data.workmodename}}
                </li>
                <li :title="data.workitem" class="principalHeaderLiTwo heavyPlayLiDivLiThree">
                  {{data.workitem}}
                </li>
                <li class="principalHeaderLiTwo heavyPlayLiDivLiThree" :title="data.workrecord">
                  {{data.workrecord}}
                </li>
                <li :title="data.checkperson + data.others" class="principalHeaderLiTwo heavyPlayLiDivLiOne">
                  {{data.checkperson}} {{data.others}}
                </li>
                <li :title="!data.submittime ? '' : fmtDate(data.submittime)" class="principalHeaderLi heavyPlayLiDivLiTwo">
                  {{!data.submittime ? '' : fmtDate(data.submittime)}}
                </li>
                <li :title="data.conclusionData" class="principalHeaderLi heavyPlayLiDivLiOne">
                  {{data.conclusionData}}
                </li>
                <li :title="data.photosArr" class="principalHeaderLiTwo heavyPlayLiDivLiTwo">
                  <img class="principalHeaderLiImg" :key="photosIndex" v-for="(photosItem, photosIndex) in data.photosArr" :src="`${photosItem}`" alt="">
                </li>
              </ul>
            </div>
            <li :style="{height: item.checktaskdetail.length * 40 + 'px', lineHeight: item.checktaskdetail.length * 40 + 'px'}" class="principalHeaderLi heavyPlayLiDivLiOne lookover">
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
import { maintainArrangegetAllPlansTwo, getChecktaskdetailsByPlanid, findAllDeviceType, getTreeByProjectId, getWorkconclusion, exportTaskReport } from '../../api/user'
export default {
  name: 'pigeonhole-Inspection',
  mixins: [projectMixin],
  props: [`planid`],
  data () {
    return {
      input: '',
      startTime: '',
      endTime: '',
      options: [],
      regionDate: '',
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
      conclusionData: ''
    }
  },
  watch: {
    equipmentDate (data) {
      if (data.length >= 2) {
        this.paginationFlag = false
        let basedevicecode = data[data.length - 1]
        let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
        this.getData(this.regionDate, 0, 15, this.startTime, this.endTime, basedevicecode, locationDate, this.conclusionData)
      }
    },
    locationDate (data) {
      if (data.length) {
        this.paginationFlag = false
        let equipmentDate = this.equipmentDate.length ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        let areaid = data[data.length - 1]
        this.getData(this.regionDate, 0, 15, this.startTime, this.endTime, equipmentDate, areaid, this.conclusionData)
      }
    },
    conclusionData (data) {
      if (data) {
        this.paginationFlag = false
        let equipmentDate = this.equipmentDate.length ? this.equipmentDate[this.equipmentDate.length - 1] : ''
        let locationDate = this.locationDate.length ? this.locationDate[this.locationDate.length - 1] : ''
        let conclusion = Number(data) === -999 ? '' : data
        this.getData(this.regionDate, 0, 15, this.startTime, this.endTime, equipmentDate, locationDate, conclusion)
      }
    }
  },
  methods: {
    init () {
      this.Initialization()
    },
    derivation (type) {
      let token = JSON.parse(window.sessionStorage.token)
      let planid = this.regionDate
      let begindate = this.startTime
      let endTime = this.endTime
      let devicecode = this.equipmentDate.length >= 2 ? this.equipmentDate[this.equipmentDate.length - 1] : ''
      let areaid = this.locationDate.length ? this.locationDate[this.locationDate.length] : ''
      let conclusion = this.conclusionData ? this.conclusionData : ''
      this.axios.post(exportTaskReport(token, type, planid, begindate, endTime, devicecode, areaid, conclusion)).then((response) => {
        if (response.data.code === 0) {
          window.open(response.data.data, '_blank')
        }
      })
    },
    schedule () {
      this.derivation(3)
    },
    summary () {
      this.derivation(4)
    },
    query () {
      this.equipmentDate = []
      this.locationDate = []
      this.conclusionData = ''
      this.paginationFlag = false
      this.getData(this.regionDate, 0, 15, this.startTime, this.endTime, this.equipmentDate, this.locationDate, this.conclusionData)
    },
    numberPagesChange (el) {
      let index = el - 1
      this.getData(this.regionDate, index, 15, this.startTime, this.endTime, this.equipmentDate, this.locationDate, this.conclusionData)
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    recurrence (obj) {
      obj.forEach((val) => {
        if (val.conclusion === -1) {
          val.conclusionData = `问题`
        } else if (val.conclusion === 1) {
          val.conclusionData = `正常`
        } else if (val.conclusion === -2) {
          val.conclusionData = `故障`
        }
      })
    },
    photoprint (obj) {
      obj.forEach((val) => {
        val.photosArr = []
        if (val.photos) {
          if (val.photos.indexOf(',') !== -1) {
            let arr = val.photos.split(',')
            arr.forEach((item) => {
              val.photosArr.push(`${this.urlPhotos}${item}`)
            })
          } else {
            val.photosArr.push(`${this.urlPhotos}${val.photos}`)
          }
        }
      })
    },
    getData (planid, pageindex, pagesize, begindate, enddate, basedevicecode, areaid, conclusion) {
      this.axios.post(getChecktaskdetailsByPlanid(planid, pageindex, pagesize, begindate, enddate, basedevicecode, areaid, conclusion)).then((data) => {
        if (data.data.code === 0) {
          this.urlPhotos = data.data.data.url
          this.numberPages = data.data.data.sum
          this.paginationFlag = true
          if (data.data.data.data.length) {
            let finData = (data) => {
              data.forEach((item) => {
                if (item.checktaskdetail.length) {
                  this.recurrence(item.checktaskdetail)
                  this.photoprint(item.checktaskdetail)
                }
              })
            }
            finData(data.data.data.data)
            this.principalmainbody = data.data.data.data
          } else {
            this.principalmainbody = []
          }
        }
      })
    },
    Initialization () {
      this.equipmentDate = []
      this.locationDate = []
      this.conclusionData = ''
      this.principalmainbody = []
      this.regionModel = []
      this.equipmentDate = []
      this.locationformation = []
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(maintainArrangegetAllPlansTwo(this.maintainProject, 3)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length) {
            this.regionModel = response.data.data
            this.regionDate = response.data.data[0].checkplanid
            this.getData(this.regionDate, 0, 15, this.startTime, this.endTime, this.equipmentDate, this.locationDate, this.conclusionData)
          }
        }
      })
      this.axios.post(findAllDeviceType(token, this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.equipmentinformation = response.data.data
        }
      })
      //  获取位置
      this.axios.post(getTreeByProjectId(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          this.locationformation = response.data.data
        }
      })
    }
  },
  created () {
    //  时间节点
    let timestamp = (new Date()).getTime()
    this.startTime = this.fmtDate(timestamp - 3600 * 24 * 30 * 1000)
    this.endTime = this.fmtDate(timestamp + 3600 * 24 * 1000)
    //  获取计划名称
    this.Initialization()
    //  审核结论
    this.axios.post(getWorkconclusion()).then((response) => {
      if (response.data.code === 0) {
        let obj = {
          name: '所有',
          value: '-999'
        }
        response.data.data.unshift(obj)
        this.conclusion = response.data.data
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
      .principalHeaderUl
        overflow hidden
        position relative
  .principalHeaderLiOne
    width 14%
    padding 0 1%
  .heavyPlayLiDivLiOne
    width 8%
  .heavyPlayLiDivLiTwo
    padding-right 1%
    width 13%
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
    text-align center
    white-space nowrap
    min-height 40px
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
</style>

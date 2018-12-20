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
        <div class="schedule" @click="schedule">
          导出
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
              <el-select size="mini" v-model="equipmentDate" placeholder="请选择">
                <el-option
                  v-for="item in equipmentinformation"
                  :key="item.deviceTypeId"
                  :label="item.deviceTypeName"
                  :value="item.deviceTypeId">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">设施位置
            <i class="el-icon-caret-bottom"></i>
            <div class="threelevel_ensconce">
              <el-select size="mini" v-model="locationDate" placeholder="请选择">
                <el-option
                  v-for="item in locationformation"
                  :key="item.deviceAreaId"
                  :label="item.deviceAreaName"
                  :value="item.deviceAreaId">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            任务类型
            <i class="el-icon-caret-bottom"></i>
            <div class="threelevel_ensconce">
              <el-select size="mini" v-model="taskTypeData" placeholder="请选择">
                <el-option
                  v-for="item in taskType"
                  :key="item.workmodeid"
                  :label="item.workmodename"
                  :value="item.workmodeid">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiOne">
            异常情况
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            安排人员
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            安排时间
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            处理人员
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            处理时间
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">
            处理结果
            <i class="el-icon-caret-bottom"></i>
            <div class="threelevel_ensconce">
              <el-select size="mini" v-model="processingData" placeholder="请选择">
                <el-option
                  v-for="item in processing"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
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
            <li :title="item.basedevicename" class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">
              {{item.basedevicename}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiOne principalPartI">
              {{item.areaname}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.worktypename}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiOne">
              {{item.exception}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.creatername}}
            </li>
            <li :title="item.createtime ? fmtDate(item.createtime) : ''" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.createtime ? fmtDate(item.createtime) : ''}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.repairpersonname}}
            </li>
            <li :title="item.repairtime ? fmtDate(item.repairtime) : ''" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.repairtime ? fmtDate(item.repairtime) : ''}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.taskstatusText}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiTwo">
              <img @click="selectImg(item.beforephotosArr, urlIndex)" class="principalHeaderLiImg" :key="urlIndex" v-for="(url, urlIndex) in item.beforephotosArr" :src="url" alt="">
            </li>
            <li class="principalHeaderLi principalHeaderLiOne lookover" @click="examine(item)">
              查看
            </li>
          </ul>
        </li>
      </ul>
      <section v-if="lookoverBoolean" @click.stop class="review">
        <!--查看-->
        <childLookover :examine="examineData" :title="examinationTitle" :state="taskState" :repairtasks="repairtasksName" @look="Onlook"></childLookover>
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
      <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
    </div>
  </section>
</template>

<script>
import childLookover from '../repair-operation/repair-lookover'
import { projectMixin } from 'common/js/mixin'
import DialogImg from 'base/dialog-img/dialog-img'
import { findTaskType, findFaultProblem, findDeviceType, findDeviceArea, generateProblemRecordInfo, maintainRepairfindTaskByTaskid, getRepairUsers, maintainRepairgetRepairStates } from '../../api/user'
export default {
  name: 'pigeonhole-faultproblem',
  mixins: [projectMixin],
  components: {
    childLookover,
    DialogImg
  },
  data () {
    return {
      input: '',
      startTime: '',
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
      locationDate: '',
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
      taskTypeData: '',
      processingData: '',
      picPath: '',
      processing: [{
        id: -999,
        name: '所有'
      },
      {
        id: 5,
        name: '已处理'
      }, {
        id: -5,
        name: '未处理'
      }],
      lookoverBoolean: false,
      examinationTitle: '',
      examineData: '',
      repairtasksName: '',
      imgList: []
    }
  },
  watch: {
    taskTypeData (data) {
      let token = JSON.parse(window.sessionStorage.token)
      let locationDate = this.locationDate ? this.locationDate : ''
      let equipmentDate = this.equipmentDate ? this.equipmentDate : ''
      this.getData(token, this.maintainProject, this.startTime, this.endTime, equipmentDate, locationDate, data, this.processingData, 0, 15)
    },
    equipmentDate (data) {
      this.paginationFlag = false
      let token = JSON.parse(window.sessionStorage.token)
      let equipmentDate = data
      let locationDate = this.locationDate ? this.locationDate : ''
      this.getData(token, this.maintainProject, this.startTime, this.endTime, equipmentDate, locationDate, this.taskTypeData, this.processingData, 0, 15)
    },
    locationDate (data) {
      this.paginationFlag = false
      let token = JSON.parse(window.sessionStorage.token)
      let locationDate = data
      let equipmentDate = this.equipmentDate ? this.equipmentDate : ''
      this.getData(token, this.maintainProject, this.startTime, this.endTime, equipmentDate, locationDate, this.taskTypeData, this.processingData, 0, 15)
    },
    processingData (data) {
      if (data) {
        this.paginationFlag = false
        let processingData = data === -999 ? '' : data
        let token = JSON.parse(window.sessionStorage.token)
        let equipmentDate = this.equipmentDate ? this.equipmentDate : ''
        let locationDate = this.locationDate ? this.locationDate : ''
        this.getData(token, this.maintainProject, this.startTime, this.endTime, equipmentDate, locationDate, this.taskTypeData, processingData, 0, 15)
      }
    }
  },
  methods: {
    selectImg (list, index) {
      this.imgList = list
      setTimeout(() => {
        this.$refs.dialogImg.switchIndex(index)
        this.$refs.dialogImg.open()
      }, 200)
    },
    init () {
      this.Initialization()
    },
    getTaskState () {
      //  获取维修任务状态
      this.axios.post(maintainRepairgetRepairStates()).then((response) => {
        if (response.data.code === 0) {
          this.taskState = response.data.data
        }
      })
    },
    Onlook () {
      this.lookoverBoolean = false
    },
    examine (item) {
      // 点击查看
      let id = !item.refid ? item.repairtaskid : item.refid
      this.examinationTitle = item.repairtypename
      this.axios.post(maintainRepairfindTaskByTaskid(id)).then((response) => {
        if (response.data.code === 0) {
          this.axios.post(getRepairUsers(id)).then((data) => {
            if (data.data.data.length !== 0) {
              let arr = []
              data.data.data.forEach((val) => {
                arr.push(val.username)
              })
              this.repairtasksName = arr.join(',')
            }
            this.examineData = response.data.data
            this.lookoverBoolean = true
          })
        }
      })
      this.getTaskState()
    },
    schedule () {
      let arr = []
      this.principalmainbody.forEach((val) => {
        if (val.flag) {
          arr.push(val.repairtaskid)
        }
      })
      if (arr.length) {
        let String = arr.join()
        let token = JSON.parse(window.sessionStorage.token)
        this.axios.post(generateProblemRecordInfo(token, String)).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data.length) {
              response.data.data.forEach((val) => {
                window.location.href = val
              })
            }
          }
        })
      } else {
        this.$message({
          message: '请选择故障设备',
          type: 'warning'
        })
      }
    },
    query () {
      if (this.startTime && this.endTime) {
        this.equipmentDate = ''
        this.locationDate = ''
        this.taskTypeData = ''
        this.processingData = ''
        let token = JSON.parse(window.sessionStorage.token)
        this.paginationFlag = false
        this.getData(token, this.maintainProject, this.startTime, this.endTime, '', '', '', '', 0, 15)
      } else {
        this.$message({
          message: '请选择时间',
          type: 'warning'
        })
      }
    },
    Initialization () {
      this.equipmentDate = ''
      this.locationDate = ''
      this.taskTypeData = ''
      this.processingData = ''
      //  设施类别
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(findDeviceType(token, this.maintainProject, this.startTime, this.endTime)).then((response) => {
        if (response.data.code === 0) {
          this.equipmentinformation = response.data.data
        }
      })
      //  设施位置
      this.axios.post(findDeviceArea(token, this.maintainProject, this.startTime, this.endTime)).then((response) => {
        if (response.data.code === 0) {
          this.locationformation = response.data.data
        }
      })
      this.getData(token, this.maintainProject, this.startTime, this.endTime, this.equipmentDate, this.locationDate, this.taskTypeData, this.processingData, 0, 15)
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
      let locationDate = this.locationDate ? this.locationDate : ''
      this.getData(token, this.maintainProject, this.startTime, this.endTime, equipmentDate, locationDate, this.taskTypeData, this.processingData, el, 15)
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
    getData (token, maintainProject, startTime, endTime, equipmentDate, locationDate, taskTypeData, processingData, pageIndex, pageSize) {
      this.axios.post(findFaultProblem(token, maintainProject, startTime, endTime, equipmentDate, locationDate, taskTypeData, processingData, pageIndex, pageSize)).then((response) => {
        if (response.data.code === 0) {
          this.picPath = response.data.data.picPath
          response.data.data.data.forEach((val) => {
            val.flag = false
            val.beforephotosArr = []
            if (val.beforephotos) {
              if (val.beforephotos.indexOf(',') !== -1) {
                let arr = val.beforephotos.split(',')
                arr.forEach((data) => {
                  val.beforephotosArr.push(`${this.picPath}${data}`)
                })
              } else {
                val.beforephotosArr.push(`${this.picPath}${val.beforephotos}`)
              }
            }
            if (val.taskstatus === -5) {
              val.taskstatusText = '未处理'
            } else {
              val.taskstatusText = '已处理'
            }
          })
          this.paginationFlag = true
          this.numberPages = response.data.data.sum
          this.principalmainbody = response.data.data.data
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
    //  任务类型
    this.axios.post(findTaskType(token)).then((response) => {
      if (response.data.code === 0) {
        this.taskType = response.data.data
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
    .rightHeaderUl
      margin-left 30px
      overflow hidden
      float left
      position relative
      .rightHeaderLi
        float left
        overflow hidden
        line-height 40px
        margin-right 20px
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
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-barckground-transparent
    z-index 11
    overflow hidden
</style>
<style>
  .principalHeaderLi .el-checkbox__label {
    font-size: 16px;
    color: #fff;
  }
</style>

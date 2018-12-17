<template>
  <section>
    <div class="rightHeader">
      <ul class="rightHeaderUl">
        <li class="rightHeaderLi">
          <p class="rightHeaderLiP">关键字：</p>
          <div class="rightHeaderLiDivOne">
            <el-input size="mini" v-model="Keyword" placeholder="请输入内容"></el-input>
          </div>
        </li>
      </ul>
      <div class="query" @click="query">
        查询
      </div>
      <div class="rightHeaderRight">
        <!--导出-->
        <div class="schedule">
          导出
        </div>
      </div>
    </div>
    <div class="principalPart">
      <div class="principalHeader">
        <ul class="principalHeaderUl">
          <li class="principalHeaderLi heavyPlayLiDivLiOne">
            <el-checkbox v-model="checked"></el-checkbox>
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">项目编号
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">项目名称
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiTwo">业主单位
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiThree">服务机构
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiFour">
            开始日期
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiFour">
            结束日期
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiFour">
            创建人员
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiFour">
            创建日期
          </li>
          <li class="principalHeaderLi heavyPlayLiDivLiFour">
            操作
          </li>
        </ul>
      </div>
      <ul class="principalMainbody">
        <li :key="index" v-for="(item, index) in subject" class="principalMainbodyLi principalMainbodyLiBorDer">
          <ul class="principalMainbodyLiUl">
            <li class="principalHeaderLi heavyPlayLiDivLiOne">
              <el-checkbox v-model="item.choice"></el-checkbox>
            </li>
            <li :title="item.projectcode" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.projectcode}}
            </li>
            <li :title="item.projectname" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.projectname}}
            </li>
            <li :title="item.proprietorname" class="principalHeaderLi heavyPlayLiDivLiTwo">
              {{item.proprietorname}}
            </li>
            <li :title="item.vindicatorname" class="principalHeaderLi heavyPlayLiDivLiThree">
              {{item.vindicatorname}}
            </li>
            <li :title="item.startdate ? fmtDate(item.startdate) : ''" class="principalHeaderLi heavyPlayLiDivLiFour">
              {{item.startdate ? fmtDate(item.startdate) : ''}}
            </li>
            <li :title="item.enddate ? fmtDate(item.enddate) : ''" class="principalHeaderLi heavyPlayLiDivLiFour">
              {{item.enddate ? fmtDate(item.enddate) : ''}}
            </li>
            <li :title="item.creatername" class="principalHeaderLi heavyPlayLiDivLiFour">
              {{item.creatername}}
            </li>
            <li :title="item.createtime ? fmtDate(item.createtime) : ''" class="principalHeaderLi heavyPlayLiDivLiFour">
              {{item.createtime ? fmtDate(item.createtime) : ''}}
            </li>
            <li class="principalHeaderLi heavyPlayLiDivLiFour cephalosomeFiveSpan" @click="exaMine(item.projectid)">
              查看
            </li>
          </ul>
        </li>
      </ul>
      <section v-if="examineBoolean"  class="adhibit">
        <examine :examine="examineBoolean" :exaDate="exaMineDate" @mine="Mine"></examine>
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
import examine from '../intercalateChild-operation/consumerChild-examine'
import { findAllMaintenanceProject, findDetailByProjectid } from '../../api/user'
export default {
  name: 'pigeonhole-Maintenanceproject',
  components: {
    examine
  },
  data () {
    return {
      checked: '',
      paginationFlag: '',
      currentPage: 1,
      numberPages: 1,
      Keyword: '',
      subject: [],
      examineBoolean: false,
      exaMineDate: ''
    }
  },
  methods: {
    Mine () {
      this.examineBoolean = false
    },
    exaMine (itemId) {
      this.axios.post(findDetailByProjectid(itemId)).then((response) => {
        if (response.data.code === 0) {
          this.exaMineDate = response.data.data
          this.examineBoolean = true
        }
      })
    },
    numberPagesChange (index) {
      let token = JSON.parse(window.sessionStorage.token)
      this.getData(token, this.Keyword, index, 15)
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    query () {
      let token = JSON.parse(window.sessionStorage.token)
      this.getData(token, this.Keyword, 0, 15)
    },
    getData (token, Keyword, pageIndex, pageSize) {
      this.axios.post(findAllMaintenanceProject(token, Keyword, pageIndex, pageSize)).then((response) => {
        if (response.data.code === 0) {
          this.numberPages = response.data.data.sum
          response.data.data.data.forEach((val) => {
            val.choice = false
          })
          this.subject = response.data.data.data
          this.paginationFlag = true
        }
      })
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.getData(token, this.Keyword, 0, 15)
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
    width 5%
  .heavyPlayLiDivLiTwo
    padding 0 1%
    width 13%
  .heavyPlayLiDivLiThree
    padding 0 1%
    width 13%
  .heavyPlayLiDivLiFour
    padding 0 1%
    width 8%
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
    text-overflow ellipsis
    color #fff
    float left
    box-sizing border-box
  .principalHeaderLiTwo
    overflow hidden
    text-align left
    text-overflow ellipsis
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
  .cephalosomeFiveSpan
    cursor pointer
    color #3279a6
  .adhibit
    width 100%
    height 100%
    background rgba(000,000,000,.4)
    z-index 111
    position fixed
    left 0
    top 0
</style>
<style>
  .principalHeaderLi .el-checkbox__label {
    font-size: 16px;
    color: #fff;
  }
</style>

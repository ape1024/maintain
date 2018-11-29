<template>
  <div class="subject">
    <div class="info-manage">
      <div class="header">
        <div class="header-info-search">
          <el-input size="mini" v-model="searchVal" placeholder="关键字搜索">
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="searchData">
            </i>
          </el-input>
        </div>
        <div v-if="JurisdictionInsert" class="header-info-add" @click="add">新 增</div>
      </div>
      <div class="content">
        <div class="content-header">
          <div class="item type">消息类型</div>
          <div class="item title">标题</div>
          <div class="item person">发布人员</div>
          <div class="item time">发布时间</div>
          <div class="item state">消息状态</div>
          <div class="item important">重要程度</div>
          <div class="item handle">操作</div>
        </div>
        <div class="content-body">
          <div class="content-body-wrap" :key="index" v-for="(item, index) in list">
            <div class="item type">{{resetType(item.msgtype)}}</div>
            <div class="item title">{{item.msgtitle}}</div>
            <div class="item person">{{item.sendername}}</div>
            <div class="item time">{{resetTimeModel(item.createtime)}}</div>
            <div class="item state" :style="{'color' : resetMsgStateColor(item.msgtype, item.msgstate)}">{{resetMsgState(item.msgtype, item.msgstate)}}</div>
            <div class="item important" :style="{'color' : resetMsgLevelColor(item.msglevel)}">{{resetMsgLevel(item.msglevel)}}</div>
            <div class="item handle" @click="examineMsg(item.msgtype, item.messageid, item.content)">查看</div>
          </div>
        </div>
      </div>
      <div class="footer" v-if="totalPage !== 0">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-count="totalPage"
          :current-page="pageIndex"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </div>
    </div>
    <info-child-add :show.sync="addState" @success="updateMessageList"></info-child-add>
    <info-child-examine :show.sync="examineState" :message="examineMessage"></info-child-examine>
  </div>
</template>

<script>
import InfoChildAdd from '../intercalateChild-operation/infoChild-add'
import InfoChildExamine from '../intercalateChild-operation/infoChild-examine'
import { getMessageList, updateMsgState } from '../../api/user'
import { resetTime } from '../../common/js/utils'
const LEN = 15
export default {
  data () {
    return {
      addState: false,
      examineState: false,
      examineMessage: '',
      searchVal: '',
      pageIndex: 1,
      totalPage: 0,
      list: [],
      JurisdictionInsert: ''
    }
  },
  methods: {
    add () {
      this.addState = true
    },
    examineMsg (type, id, msg) {
      if (type === this.msgType.send) {
        this.examineMessage = msg
        this.examineState = true
      } else {
        this.axios.post(updateMsgState(id)).then((res) => {
          if (res.data.code === 0) {
            this.examineMessage = msg
            this.examineState = true
          }
        })
      }
    },
    resetTimeModel (time) {
      return resetTime(time, 'all')
    },
    resetType (type) {
      switch (type) {
        case this.msgType.receive:
          return '收件'
        case this.msgType.send:
          return '发件'
      }
    },
    resetMsgState (type, state) {
      if (type === this.msgType.send) return '---'
      switch (state) {
        case 0:
          return '未读'
        case 1:
          return '已读'
      }
    },
    resetMsgStateColor (type, state) {
      if (type === this.msgType.send) return ''
      switch (state) {
        case 0:
          return '#E03D40'
        case 1:
          return ''
      }
    },
    resetMsgLevel (level) {
      switch (level) {
        case 1:
          return '紧急'
        case 2:
          return '重要'
        case 3:
          return '一般'
      }
    },
    resetMsgLevelColor (level) {
      switch (level) {
        case 1:
          return '#DC7634'
        case 2:
          return '#E9D369'
        case 3:
          return '#99D965'
      }
    },
    searchData () {
      this.searchVal = ''
      this.getMessageList(1, LEN, this.searchVal)
    },
    handleCurrentChange (val) {
      this.getMessageList(val, LEN, this.searchVal)
    },
    updateMessageList () {
      this.getMessageList(1, LEN, '')
    },
    getMessageList (pageIndex, pageSize, msg) {
      // 重置分页
      const totalPage = this.totalPage
      this.totalPage = 0
      this.axios.post(getMessageList(this.msgType.total, pageIndex, pageSize, msg)).then((response) => {
        if (response && response.data.code === 0) {
          const data = response.data.data
          this.totalPage = data.pageTotal
          this.pageIndex = data.pageIndex
          this.list = data.data
        } else {
          this.totalPage = totalPage
        }
      })
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'info') {
        this.JurisdictionInsert = val.insert
      }
    })
    this.msgType = {
      total: 2,
      receive: 1,
      send: 0
    }
    this.getMessageList(1, LEN, '')
  },
  components: {
    InfoChildAdd,
    InfoChildExamine
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .info-manage
      min-height 840px
      overflow hidden
      position relative
      background rgba(000,000,000,.47)
      .header
        overflow hidden
        padding 20px 0
        .header-info-add
          color #fff
          float right
          newlyDiv()
        .header-info-search
          float right
          margin-right 20px
          .el-icon-search
            cursor pointer
      .content
        position absolute
        top 70px
        left 10px
        right 10px
        bottom 60px
        .content-header
          overflow hidden
          background #354D76
          padding 10px 0
          .item
            float left
            padding-left 10px
            box-sizing border-box
            color #d5d5d5
            font-size $font-size-medium
            height 14px
        .content-body
          position relative
          .content-body-wrap
            overflow hidden
            padding 15px 0
            &:nth-child(odd)
              background #1C273A
            &:nth-child(even)
              background #141D2C
            .item
              float left
              padding-left 10px
              box-sizing border-box
              color #d5d5d5
              font-size $font-size-medium
              height 14px
              &:last-child
                color #296186
        .type
          width 12%
        .title
          width 40%
        .person
          width 10%
        .time
          width 10%
        .state
          width 10%
        .important
          width 10%
        .handle
          width 8%
          cursor pointer
      .footer
        position absolute
        left 10px
        right 10px
        bottom 0
        height 60px
        box-sizing border-box
        text-align center
        padding-top 15px
</style>

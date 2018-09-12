<template>
  <div class="subject">
    <div class="info-manage">
      <div class="header">
        <div class="header-info-search">
          <el-input size="small" v-model="searchVal" placeholder="关键字搜索">
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="searchData">
            </i>
          </el-input>
        </div>
        <div class="header-info-add" @click="add">增 加</div>
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
          <div class="content-body-wrap" :key="index" v-for="(item, index) in 15">
            <div class="item type">{{item}}</div>
            <div class="item title">标题</div>
            <div class="item person">发布人员</div>
            <div class="item time">发布时间</div>
            <div class="item state">消息状态</div>
            <div class="item important">重要程度</div>
            <div class="item handle" @click="examineMsg">查看</div>
          </div>
        </div>
      </div>
      <div class="footer" v-show="totalPage !== 0">
        <el-pagination
          @current-change="currentChangeHandle"
          background
          :page-count="totalPage"
          :page-size="pageSize"
          :current-page="pageIndex"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </div>
    </div>
    <info-child-add :show.sync="addState"></info-child-add>
    <info-child-examine :show.sync="examineState" :message="examineMessage"></info-child-examine>
  </div>
</template>

<script>
// const LEN = 15
import InfoChildAdd from '../intercalateChild-operation/infoChild-add'
import InfoChildExamine from '../intercalateChild-operation/infoChild-examine'
export default {
  data () {
    return {
      addState: false,
      examineState: false,
      examineMessage: '',
      searchVal: '',
      pageIndex: 0,
      totalPage: 1,
      pageSize: 15
    }
  },
  methods: {
    add () {
      this.addState = true
    },
    examineMsg () {
      this.examineMessage = '11111111111111111111'
      this.examineState = true
    },
    searchData () {},
    currentChangeHandle (val) {
      this.pageIndex = val
    }
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
          float right
          margin-right 20px
          display inline-block
          width 107px
          border-radius 5px
          height 32px
          text-align center
          line-height 32px
          background $color-background-query
          transition .2s
          color $color-text
          cursor pointer
          &:hover
            background: #4b92bf
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
        bottom 70px
        .content-header
          overflow hidden
          background #354D76
          padding 10px 0
          .item
            float left
            padding-left 10px
            box-sizing border-box
            color #d5d5d5
            font-size $font-size-small-s
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
              font-size $font-size-small
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
        height 70px
        box-sizing border-box
        text-align center
        padding-top 15px
</style>

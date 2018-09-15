<template>
  <div class="info-add info-add-tree-change" v-show="show">
    <div class="info-add-pos">
      <div class="info-add-wrap">
        <div class="title">发布通知</div>
        <div class="content">
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="key"><span class="space-change">标</span>题：</div>
              <div class="val">
                <el-input class="long-change" v-model="titleName" size="mini" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="content-wrap-item">
              <div class="key">消息级别：</div>
              <div class="val">
                <el-radio-group v-model="messageLevel">
                  <el-radio :label="3">一般</el-radio>
                  <el-radio :label="2">重要</el-radio>
                  <el-radio :label="1">紧急</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="key">截止日期：</div>
              <div class="val">
                <el-date-picker
                  class="long-change"
                  size="mini"
                  v-model="finishTimeVal"
                  type="datetime"
                  placeholder="选择截止时间">
                </el-date-picker>
              </div>
            </div>
            <div class="content-wrap-item">
              <div class="key">发送日期：</div>
              <div class="val">
                <el-date-picker
                  class="long-change"
                  size="mini"
                  v-model="sendTimeVal"
                  type="datetime"
                  placeholder="选择发送时间">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-desc">
              <div class="key">通知内容：</div>
              <div class="val">
                <el-input
                  resize="none"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="messageDesc">
                </el-input>
              </div>
            </div>
          </div>
          <div class="content-wrap">
            <div class="content-wrap-item">
              <div class="key">接收对象：</div>
              <div class="val-tree">
                <el-checkbox-group v-model="maintenanceList">
                  <el-tree
                    :expand-on-click-node="false"
                    class="tree"
                    :data="maintenance"
                    node-key="id"
                    :props="proprietorProps">
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                      <div>{{ node.label }}</div>
                      <div class="tree-checkbox">
                        <div :key="index" class="tree-checkbox-item" v-for="(item, index) in (data.users ? data.users : [])">
                          <el-checkbox :label="item.userid">
                            <svg class="icon" style="color: lightblue;width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1593"><path d="M717.664 612.195c-52.734 47.461-121.289 79.102-200.391 79.102s-147.656-31.641-205.664-79.102c-131.836 68.555-221.484 158.203-221.484 321.68l843.75 0c0-163.477-89.648-247.852-216.211-321.68zM512 628.016c131.836 0 237.305-110.742 237.305-242.578s-105.469-242.578-237.305-242.578-237.305 110.742-237.305 242.578c0 137.109 110.742 242.578 237.305 242.578z" p-id="1594"></path></svg>
                            <span class="nodeLabel">{{item.username}}</span>
                          </el-checkbox>
                        </div>
                      </div>
                    </div>
                  </el-tree>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="handle">
          <div class="handle-val save" @click="save">保存</div>
          <div class="handle-val close" @click="close">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deliverAnnouncement, getReceivePer } from 'api/user'
import { resetTime } from 'common/js/utils'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      titleName: '',
      messageLevel: 0,
      finishTimeVal: '',
      sendTimeVal: '',
      messageDesc: '',
      maintenanceList: [],
      maintenance: [],
      proprietorProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
      this.reset()
    },
    reset () {
      this.titleName = ''
      this.messageLevel = 0
      this.finishTimeVal = ''
      this.sendTimeVal = ''
      this.messageDesc = ''
      this.maintenanceList = []
    },
    save () {
      // 标题名称
      if (!this.titleName) {
        this.$message({
          message: '请填写标题名称',
          type: 'warning'
        })
        return
      }
      // 截止时间
      if (!this.finishTimeVal) {
        this.$message({
          message: '请选择截止时间',
          type: 'warning'
        })
        return
      }
      // 发送时间
      if (!this.sendTimeVal) {
        this.$message({
          message: '请选择发送时间',
          type: 'warning'
        })
        return
      }
      // 信息等级
      if (!this.messageLevel) {
        this.$message({
          message: '请选择消息级别',
          type: 'warning'
        })
        return
      }
      // 通知内容
      if (!this.messageDesc) {
        this.$message({
          message: '请填写通知内容',
          type: 'warning'
        })
        return
      }
      // 通知人员
      if (!this.maintenanceList.length) {
        this.$message({
          message: '请选择通知人员',
          type: 'warning'
        })
        return
      }
      const sendTimeVal = resetTime(new Date(this.sendTimeVal).getTime(), 'all')
      const finishTimeVal = resetTime(new Date(this.finishTimeVal).getTime(), 'all')
      const ids = this.maintenanceList.join(',')

      this.axios.post(deliverAnnouncement(this.titleName, sendTimeVal, finishTimeVal, this.messageLevel, this.messageDesc, ids)).then((response) => {
        if (response && response.data.code === 0 && response.data.data.result) {
          this.$emit('success')
          this.close()
        } else {
          this.$message({
            message: '发布失败',
            type: 'warning'
          })
        }
      })
    },
    getReceivePer () {
      this.axios.post(getReceivePer()).then((response) => {
        if (response.data.code === 0) {
          this.maintenance = [response.data.data]
        }
      })
    }
  },
  created () {
    this.getReceivePer()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .info-add
    full-screen()
    z-index $z-index-small-s
    background $color-background-black-o
    .info-add-pos
      width 100%
      box-sizing border-box
      margin-top 8%
      background #111A28
      .info-add-wrap
        width 800px
        margin 0 auto
        .title
          padding 50px 0
          font-size $font-size-medium
          color #fff
        .content
          padding 0 20px
          color #d5d5d5
          .content-wrap
            padding 10px 0
            overflow hidden
            .content-wrap-item
              float left
              width 50%
              box-sizing border-box
              .key
                float left
                width 25%
                box-sizing border-box
                text-align center
                height 30px
                line-height 30px
                .space-change
                  margin-right 34px
              .val
                float left
                width 65%
                box-sizing border-box
                height 30px
                line-height 30px
                .long-change
                  width 100%
              .val-tree
                float left
                width 65%
                box-sizing border-box
                height 200px
                overflow auto
                .tree
                  background transparent
                  color $color-text-desc
                  .custom-tree-node
                    padding-top 7px
                    font-size $font-size-small
                    .tree-checkbox
                      padding 10px 0 0 10px
                      .tree-checkbox-item
                        padding 5px 0
                  .el-tree-node__children .custom-tree-node
                    background none
                  .el-tree-node__content
                    height auto
                    align-items flex-start
            .content-wrap-desc
              float left
              width 100%
              box-sizing border-box
              .key
                float left
                width 12.5%
                box-sizing border-box
                text-align center
                height 30px
                line-height 30px
              .val
                float left
                width 82.5%
                box-sizing border-box
                .long-change
                  width 100%
        .handle
          padding 120px 0 50px
          text-align center
          .handle-val
            display inline-block
            margin 0 35px
            padding 10px 30px
            border-radius 5px
            font-size $font-size-small
            color #fff
            cursor pointer
            &.save
              background #3279A6
            &.close
              background #202F49
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .info-add-tree-change
    .el-tree
      color #d5d5d5 !important

      .el-tree-node:focus>.el-tree-node__content
        background none

      .el-tree-node__content:hover
        background none

      .el-tree-node__content:active
        background none
</style>

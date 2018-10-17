<template>
  <div class="jurisdiction">
    <div class="jurisdictionDiv">
      <h4 class="jurisdictionH">
        新增角色信息
      </h4>
      <div class="jurisdictionBottom">
        <div class="header">
          <div class="headerLeft">
            <p class="headerP">角色名称：</p>
            <div class="headerDiv">
              <el-input size="mini" v-model="designation" placeholder="请输入角色名称"></el-input>
            </div>
          </div>
        </div>
        <div class="karakters">
          <div class="jurisdictionBottom">
            <div class="definition">
              <div class="definitionHeader">
                <ul class="definitionHeaderul">
                  <li class="definitionHeaderli">模块</li>
                  <li class="definitionHeaderlitwo">查看</li>
                  <li class="definitionHeaderlitwo">新增</li>
                  <li class="definitionHeaderlitwo">修改</li>
                  <li class="definitionHeaderlitwo">删除</li>
                  <li class="definitionHeaderlitwo">审批</li>
                  <li class="definitionHeaderlitwo">分配</li>
                  <li class="definitionHeaderlitwo">检验</li>
                </ul>
              </div>
              <div class="content">
                <div :key='index' v-for="(item, index) in fullFunctionality" class="contentDiv">
                  <div class="contentDivtwo">
                    <ul  class="definitionHeaderul">
                      <li @click.stop="definitionLi(item)" class="definitionHeaderli">
                        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1929"><path d="M433.230769 708.923077c0-53.169231 17.723077-114.215385 45.292308-161.476923 33.476923-59.076923 70.892308-82.707692 100.430769-126.030769 49.230769-72.861538 59.076923-177.230769 27.569231-256C575.015385 84.676923 500.184615 37.415385 413.538462 39.384615s-157.538462 55.138462-185.107693 135.876923c-31.507692 88.615385-17.723077 194.953846 53.169231 261.907693 29.538462 27.569231 57.107692 70.892308 41.353846 112.246154-13.784615 39.384615-61.046154 57.107692-94.523077 72.861538-76.8 33.476923-169.353846 80.738462-185.107692 171.323077C27.569231 868.430769 78.769231 945.230769 159.507692 945.230769h334.769231c15.753846 0 25.6-19.692308 15.753846-31.507692C460.8 856.615385 433.230769 783.753846 433.230769 708.923077z m315.076923-236.307692c-129.969231 0-236.307692 106.338462-236.307692 236.307692s106.338462 236.307692 236.307692 236.307692 236.307692-106.338462 236.307693-236.307692-106.338462-236.307692-236.307693-236.307692z m41.353846 257.96923c-5.907692 0-13.784615-1.969231-19.692307-3.938461l-90.584616 90.584615c-5.907692 5.907692-13.784615 7.876923-19.692307 7.876923-7.876923 0-13.784615-1.969231-19.692308-7.876923-9.846154-9.846154-9.846154-27.569231 0-39.384615l90.584615-90.584616c-1.969231-5.907692-3.938462-11.815385-3.938461-19.692307-3.938462-41.353846 29.538462-78.769231 70.892308-78.769231 5.907692 0 13.784615 1.969231 19.692307 3.938462 3.938462 0 3.938462 3.938462 1.969231 5.907692l-39.384615 41.353846c-3.938462 1.969231-3.938462 7.876923 0 9.846154l27.56923 27.569231c3.938462 3.938462 7.876923 3.938462 11.815385 0l39.384615-39.384616c1.969231-1.969231 5.907692-1.969231 5.907693 1.969231 1.969231 5.907692 3.938462 13.784615 3.938461 19.692308 0 41.353846-35.446154 74.830769-78.769231 70.892307z" p-id="1930"></path></svg>
                        {{item.first}}
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.examinePart" v-if="item.examineShow" @change="definitionExamine(item, item.examine,0,item.examinePart)" v-model="item.examine"></el-checkbox>
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.insertPart" v-if="item.insertShow" @change="definitionExamine(item, item.insert,1,item.insertPart)" v-model="item.insert"></el-checkbox>
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.modifyPart" v-if="item.modifyShow" @change="definitionExamine(item, item.modify,2,item.modifyPart)" v-model="item.modify"></el-checkbox>
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.deletePart" v-if="item.deleteShow" @change="definitionExamine(item, item.delete,3,item.deletePart)" v-model="item.delete"></el-checkbox>
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.approvalPart" v-if="item.approvalShow" @change="definitionExamine(item, item.approval,4,item.approvalPart)" :disabled="checkedFlag" v-model="item.approval"></el-checkbox>
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.assignPart" v-if="item.assignShow" @change="definitionExamine(item, item.assign,5,item.assignPart)" v-model="item.assign"></el-checkbox>
                      </li>
                      <li class="definitionHeaderlitwo">
                        <el-checkbox :indeterminate="item.checkPart" v-if="item.checkShow" @change="definitionExamine(item, item.check,6,item.checkPart)" v-model="item.check"></el-checkbox>
                      </li>
                    </ul>
                  </div>
                  <ul v-show="item.flag" class="contentDivthree">
                    <li class="contentLi" :key="index" v-for="(data, index) in item.second">
                      <ul class="definitionHeaderul">
                        <li class="definitionHeaderli">
                          {{data.functionname}}
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'examinePart', 'examine', 'second', 'selectBoolean')" v-if="data.select === 1" v-model="data.selectBoolean"></el-checkbox>
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'insertPart', 'insert', 'second', 'insertBoolean')" v-if="data.insert === 1" v-model="data.insertBoolean"></el-checkbox>
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'modifyPart', 'update', 'second', 'updateBoolean')" v-if="data.update === 1" v-model="data.updateBoolean"></el-checkbox>
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'deletePart', 'delete', 'second', 'deleteBoolean')" v-if="data.delete === 1" v-model="data.deleteBoolean"></el-checkbox>
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'approvalPart', 'approval', 'second', 'approvalBoolean')" v-if="data.approval === 1" :disabled="checkedFlag" v-model="data.approvalBoolean"></el-checkbox>
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'assignPart', 'assign', 'second', 'assignBoolean')" v-if="data.assign === 1" v-model="data.assignBoolean"></el-checkbox>
                        </li>
                        <li class="definitionHeaderlitwo">
                          <el-checkbox @change="definitionExamineChild(item, 'checkPart', 'check', 'second', 'checkBoolean')" v-if="data.check === 1" v-model="data.checkBoolean"></el-checkbox>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fastener">
          <div @click="conserve" class="conserve">保存</div>
          <div @click="closedown" class="closedown">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { karaktersFindAllFunctions, getRoleOrganizations, increasedcreateAdminRole } from '../../api/user'
export default {
  name: 'karaktersChild-increased2',
  props: ['organizationid', 'increaSed2'],
  data () {
    return {
      options: [],
      value: '',
      pageBoolean: false,
      checked: false,
      fullFunctionality: '',
      designation: '',
      organization: '',
      organizationData: ''
    }
  },
  methods: {
    conserve () {
      let token = JSON.parse(window.sessionStorage.token)
      let organizationinfoid = this.organizationid
      let roleName = this.designation
      let roleFunctions = []
      this.fullFunctionality.forEach((val) => {
        val.second.forEach((item) => {
          let obj = {
            //  id
            'functionid': item.functionid,
            //  增加
            'approval': item.approvalBoolean,
            //  删除
            'delete': item.deleteBoolean,
            //  查看
            'select': item.selectBoolean,
            //  修改
            'update': item.updateBoolean,
            // 审批
            'insert': item.insertBoolean,
            // 分配
            'assign': item.assignBoolean,
            // 检查
            'check': item.checkBoolean
          }
          roleFunctions.push(obj)
        })
      })
      if (roleName === '') {
        this.$message({
          message: '请填写角色名称',
          type: 'warning'
        })
        return false
      }

      this.axios.post(increasedcreateAdminRole(roleName, organizationinfoid, token), roleFunctions).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$emit('Basis2', false)
        }
      })
    },
    closedown () {
      this.$emit('Basis2', false)
    },
    definitionLi (item) {
      item.flag = !item.flag
    },
    definitionExamine (data, flag, number, showflag) { // showflag 标识indeterminate 状态
      if (number === 0) {
        if (showflag === true) {
          data.examinePart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.selectBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.selectBoolean = false
          })
        }
      } else if (number === 4) {
        if (showflag === true) {
          data.approvalPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.approvalBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.approvalBoolean = false
          })
        }
      } else if (number === 2) {
        if (flag === true) {
          if (showflag === true) {
            data.modifyPart = false
          }
          data.second.forEach((val) => {
            val.updateBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.updateBoolean = false
          })
        }
      } else if (number === 3) {
        if (showflag === true) {
          data.deletePart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.deleteBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.deleteBoolean = false
          })
        }
      } else if (number === 1) {
        if (showflag === true) {
          data.insertPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.insertBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.insertBoolean = false
          })
        }
      } else if (number === 5) {
        if (showflag === true) {
          data.assignPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.assignBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.assignBoolean = false
          })
        }
      } else if (number === 6) {
        if (showflag === true) {
          data.checkPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.checkBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.checkBoolean = false
          })
        }
      }
    },
    definitionExamineChild (data, part, parentFlag, currentFlag, childFlag) {
      let flag = true
      let len = 0
      data[currentFlag].forEach(t => {
        flag = flag && t[childFlag]
        if (t[childFlag]) {
          len += 1
        }
      })
      data[part] = len > 0 && len < data[currentFlag].length
      data[parentFlag] = flag
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(karaktersFindAllFunctions(token)).then((response) => {
      if (response.data.code === 0) {
        response.data.data.forEach((val) => {
          let examineShow = 0
          let approvalShow = 0
          let modifyShow = 0
          let deleteShow = 0
          let insertShow = 0
          let assignShow = 0
          let checkShow = 0
          val.second.forEach((val) => {
            //  添加
            val.approvalBoolean = false
            //  删除
            val.deleteBoolean = false
            //  修改
            val.updateBoolean = false
            //  查看
            val.selectBoolean = false
            //  审核
            val.insertBoolean = false
            //  分配
            val.assignBoolean = false
            //  检验
            val.checkBoolean = false
            // 显示状态
            if (val.select === 1) {
              examineShow = 1
            }

            if (val.approval === 1) {
              approvalShow = 1
            }

            if (val.update === 1) {
              modifyShow = 1
            }

            if (val.delete === 1) {
              deleteShow = 1
            }

            if (val.insert === 1) {
              insertShow = 1
            }

            if (val.assign === 1) {
              assignShow = 1
            }

            if (val.check === 1) {
              checkShow = 1
            }
          })
          //  二级开关
          val.flag = false
          //  查看
          val.examine = false
          val.examinePart = false
          val.examineShow = examineShow
          //  新增
          val.approval = false
          val.approvalPart = false
          val.approvalShow = approvalShow
          //  修改
          val.modify = false
          val.modifyPart = false
          val.modifyShow = modifyShow
          //  删除
          val.delete = false
          val.deletePart = false
          val.deleteShow = deleteShow
          //  审核
          val.insert = false
          val.insertPart = false
          val.insertShow = insertShow
          //  分配
          val.assign = false
          val.assignPart = false
          val.assignShow = assignShow
          //  检验
          val.check = false
          val.checkPart = false
          val.checkShow = checkShow
        })
        this.fullFunctionality = response.data.data
      }
    })
    this.axios.post(getRoleOrganizations(token)).then((response) => {
      if (response.data.code === 0) {
        this.organizationData = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .jurisdiction
    width 100%
    overflow hidden
    background #111a28
    padding 60px 0 40px
    margin-top 100px
    position relative
    .jurisdictionDiv
      width 1243px
      margin 0 auto
      overflow hidden
      position relative
      .jurisdictionH
        margin-bottom 30px
        font-size $font-size-medium-x
        color $color-text
      .jurisdictionBottom
        margin-left 76px
        position relative
        overflow hidden
        .header
          init()
          margin-bottom 20px
          .headerP
            float left
            line-height 30px
            margin-right 8px
            color $color-border-b-fault
            font-size $font-size-medium
          .headerDiv
            float left
            overflow hidden
        .definition
          init()
          margin-bottom 55px
          height 400px
          overflow auto
          .definitionUl
            text-align center
            color $color-text
            border-left 1px solid #444d5b
            border-top 1px solid #444d5b
            border-right 1px solid #444d5b
            .definitionLi
              float left
              padding 10px 0
              border-right 1px solid #444d5b
              width 338px
            .definitionLitwo
              padding 10px 0
          .content
            position relative
            overflow hidden
            .contentLi
              float left
              padding 10px 0
              width 100%
              text-align center
            .contentLitwo
              padding 10px 0
        .fastener
          init()
          color $color-text
          text-align center
          .conserve
            conserve()
            margin-right 100px
          .closedown
            closedown()
    .karakters
      height calc(100% - 50px)
      overflow hidden
      overflow-y auto
    .jurisdictionBottom
      margin 20px 30px
      overflow hidden
      .header
        init()
        margin-bottom 20px
        .headerP
          float left
          line-height 30px
          margin-right 8px
          color $color-border-b-fault
          font-size $font-size-medium
        .headerDiv
          float left
          overflow hidden
        .increased
          float right
          margin-right 20px
          background $color-background-newly
          text-align center
          padding 0 20px
          height 36px
          line-height 36px
          color $color-text-title
          border-radius 5px
          cursor pointer
          transition .2s
          &:hover
            background #4baabe
      .definition
        init()
        margin-bottom 55px
      .fastener
        init()
        color $color-text
        text-align center
        .conserve
          conserve()
          margin-right 100px
        .closedown
          closedown()
  .popup
    position fixed
    top 0
    left 0
    background rgba(000, 000, 000, .4)
    z-index 11
    width 100%
    height 100%
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
  .contentDivtwo
    color #eee
    line-height 30px
    padding 6px 0
    init()
  .definitionHeader
    width 100%
    position relative
    overflow hidden
    background #354d76
  .contentLi
    line-height 30px
    color $color-text-title
    padding 6px 0
    height 30px
  .contentLeft
    width 40%
    height 30px
    overflow hidden
    float left
  .contentRight
    height 30px
    overflow hidden
    float left
    width 60%
  .definitionHeaderul
    init()
    color #d5d5d5
    line-height 30px
    text-align center
    height 30px
    .definitionHeaderli
      float left
      overflow hidden
      width 40%
      cursor pointer
    .definitionHeaderlitwo
      float left
      overflow hidden
      position relative
      text-align center
      height 31px
      width 8.5%
  .contentDiv
    overflow hidden
  .contentDivthree
    color #eee
    line-height 30px
    background #0b111a
    init()
  .content .contentDiv:nth-child(even){
    background #141d2c
  }
  .leftBottomUl
    font-size 16px
    color #d5d5d5
    margin-top 10px
    .leftBottomLl
      text-indent 1em
      cursor pointer
      overflow hidden
      padding 10px 0
  .leftBottomLltwo
    text-indent 2em
    cursor pointer
    overflow hidden
    color #999
    padding 10px 0
  .conserveDiv
    float right
    conserve()
  .headerLeft
    overflow hidden
    position relative
    margin-right 50px
    float left
</style>

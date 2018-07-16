<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../../static/img/department.png" alt="">
        <p class="subjectP">角色管理</p>
      </header>
      <div class="leftBottom">
        <ul class="leftBottomUl">
          <li class="leftBottomLl">
            系统角色
          </li>
          <li @click="systemroleClick(item.roleid)" :key="index" v-for="(item, index) in systemRole" class="leftBottomLltwo">
            {{item.creatername}}
          </li>
        </ul>
        <ul class="leftBottomUl">
          <li class="leftBottomLl">
            自定义角色
          </li>
          <li @click="systemroleClick(item.roleid)" :key="index" v-for="(item, index) in customRoles" class="leftBottomLltwo">
            {{item.creatername}}
          </li>
        </ul>
      </div>
    </section>
    <section class="subjectRight">
      <div class="rightHeader"></div>
      <div class="karakters">
        <div class="jurisdictionBottom">
          <div class="header">
            <div class="conserveDiv" @click="conserve">
              保 存
            </div>
            <div @click="increasd" class="increased">
              新增角色信息
            </div>
          </div>
          <div class="definition">
            <div class="definitionHeader">
              <ul class="definitionHeaderul">
                <li class="definitionHeaderli">模块</li>
                <li class="definitionHeaderlitwo">查看</li>
                <li class="definitionHeaderlitwo">新增</li>
                <li class="definitionHeaderlitwo">修改</li>
                <li class="definitionHeaderlitwo">删除</li>
                <li class="definitionHeaderlitwo">审批</li>
              </ul>
            </div>
            <div class="content">
             <div :key='index' v-for="(item, index) in fullFunctionality" class="contentDiv">
               <div class="contentDivtwo">
                 <ul  class="definitionHeaderul">
                   <li @click.stop="definitionLi(item)" class="definitionHeaderli">
                     {{item.first}}
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox @change="definitionExamine(item, item.examine,0)" v-model="item.examine"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox @change="definitionExamine(item, item.added,1)" v-model="item.added"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox @change="definitionExamine(item, item.modify,2)" v-model="item.modify"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox @change="definitionExamine(item, item.delete,3)" v-model="item.delete"></el-checkbox>
                   </li>

                   <li class="definitionHeaderlitwo">
                     <el-checkbox @change="definitionExamine(item, item.insert,4)" v-model="item.insert"></el-checkbox>
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
                       <el-checkbox v-if="data.select === 1" v-model="data.selectBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-if="data.approval === 1" v-model="data.approvalBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-if="data.update === 1" v-model="data.updateBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-if="data.delete === 1" v-model="data.deleteBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox v-if="data.insert === 1" v-model="data.insertBoolean"></el-checkbox>
                     </li>
                   </ul>
                 </li>
               </ul>
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="basis" class="popup">
      <increased :increaSed="basis" @baSis="Basis"></increased>
    </section>
  </div>
</template>

<script>
import increased from '../intercalateChild-operation/karaktersChild-increased'
export default {
  name: 'intercalateChild-karakters',
  components: {
    increased
  },
  data () {
    return {
      systemRole: [],
      customRoles: [],
      basis: false,
      value: '',
      checked: false,
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      structureDate: {
        label: '',
        personnel: ''
      },
      fullFunctionality: '',
      // 点击左侧获取其id值
      kayakersId: ''
    }
  },
  methods: {
    increasd () {
      this.basis = true
    },
    Basis (ev) {
      this.basis = ev
    },
    definitionLi (item) {
      item.flag = !item.flag
    },
    definitionExamine (data, flag, number) {
      console.log(data)
      console.log(flag)
      console.log(number)
      if (number === 0) {
        if (flag === true) {
          data.second.forEach((val) => {
            val.selectBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.selectBoolean = false
          })
        }
      } else if (number === 1) {
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
          data.second.forEach((val) => {
            val.updateBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.updateBoolean = false
          })
        }
      } else if (number === 3) {
        if (flag === true) {
          data.second.forEach((val) => {
            val.deleteBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.deleteBoolean = false
          })
        }
      }
    },
    conserve () {
      if (this.kayakersId !== '') {
        console.log('1')
        let roleid = this.kayakersId
        let data = []

        this.fullFunctionality.forEach((val) => {
          val.second.forEach((item) => {
            let obj = {}
            //  id
            obj.functionid = item.functionid
            //  增加
            obj.approval = item.approvalBoolean
            //  删除
            obj.delete = item.deleteBoolean
            //  查看
            obj.select = item.selectBoolean
            //  修改
            obj.update = item.updateBoolean
            // 审批
            data.insert = item.insertBoolean
            data.push(obj)
          })
        })
        this.axios.post(`http://172.16.6.181:8920/roles/SetRoleFunctions?roleid=${roleid}`, data).then((response) => {
          if (response.data.code === 0) {
            console.log(response)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '保存失败',
              type: 'warning'
            })
          }
        })
      } else {
      //  没有点击左侧的列表
        this.$message({
          message: '没有选中角色',
          type: 'warning'
        })
      }
    },
    systemroleClick (roleid) {
      //  临时写成10006  记得后续修改
      console.log(roleid)
      this.kayakersId = roleid
      this.axios.post(`http://172.16.6.181:8920/roles/FindRoleFunctions?roleid=${roleid}`).then((response) => {
        console.log('1111')
        console.log(response)
        if (response.data.code === 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            let functionId = response.data.data[i].functionid
            this.fullFunctionality.forEach((val) => {
              val.second.forEach((data) => {
                if (data.functionid === functionId) {
                  //  查看
                  data.selectBoolean = response.data.data[i].select
                  //  新增
                  data.approvalBoolean = response.data.data[i].approval
                  //  修改
                  data.updateBoolean = response.data.data[i].update
                  //  删除
                  data.deleteBoolean = response.data.data[i].delete
                  //  审批
                  data.insertBoolean = response.data.data[i].insert
                }
              })
            })
          }
        }
      })
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    console.log(token)
    this.axios.post(`http://172.16.6.181:8920/roles/FindAllFunctions`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        response.data.data.forEach((val) => {
          //  二级开关
          val.flag = false
          //  查看
          val.examine = false
          //  新增
          val.added = false
          //  修改
          val.modify = false
          // 删除
          val.delete = false
          val.second.forEach((val) => {
            //  添加
            val.approvalBoolean = false
            //  删除
            val.deleteBoolean = false
            //  修改
            val.updateBoolean = false
            //  查看
            val.selectBoolean = false
          })
        })
        this.fullFunctionality = response.data.data
        console.log('0002000')
        console.log(this.fullFunctionality)
      }
    })
    this.axios.post(`http://172.16.6.181:8920/roles/FindAllRoles?token=${token}`).then((response) => {
      if (response.data.code === 0) {
        console.log('0000')
        console.log(response.data.data)
        response.data.data.forEach((val) => {
          console.log(val)
          if (val.issystem === 0) {
            this.systemRole.push(val)
          } else {
            this.customRoles.push(val)
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 56px
      .leftHeader
        width 100%
        overflow hidden
        position relative
        height 40px
        line-height 40px
        background #354d76
      .subjectImg
        margin 0 4px
        display inline-block
        width 40px
        float left
        height 40px
      .subjectP
        float left
        color $color-text
        line-height 40px
      .leftBottom
        width 100%
        min-height 800px
        max-height 800px
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      overflow hidden
      position relative
      .rightHeader
        init()
        background #354d76
        height 40px
      .karakters
        height calc(100% - 50px)
        overflow hidden
        overflow-y auto
        min-height 800px
        max-height 800px
        position relative
        background #101826
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
      width 10%
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
</style>

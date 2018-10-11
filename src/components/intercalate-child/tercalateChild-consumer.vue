<template>
  <div class="subject">
    <!--左边-->
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../common/img/department.png" alt="">
        <p class="subjectP">组织机构</p>
      </header>
      <div class="leftBottom">
        <div class="leftBottomDiv">
          <el-tree node-click="changClick"
                   :data="data"
                   :props="defaultProps"
                   highlight-current
                   @node-click="handleNodeClick">
          </el-tree>
        </div>
      </div>
    </section>
    <!--右边-->
    <section class="subjectRight">
    <section class="consumer">
      <header class="header">
        <ul class="headerUl">
          <li class="headerLi">
            <p class="headerP">
              登 录 名：
            </p>
            <div class="headerDiv">
              <el-input size="mini"  v-model="Username" placeholder=""  clearable>></el-input>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              角 色：
            </p>
            <div class="headerDiv">
              <el-cascader
                size="mini"
                clearable
                :options="roleData"
                :props="selectedRole"
                :show-all-levels="false"
                v-model="role">
              </el-cascader>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              手 机：
            </p>
            <div class="headerDiv">
              <el-input size="mini" v-model="Handphone" placeholder="" clearable>></el-input>
            </div>
          </li>
        </ul>
        <div @click="search" class="search">
          搜索
        </div>
        <div v-if="JurisdictionInsert" @click="induce" class="superinduce">
          新增
        </div>
      </header>
      <div class="information">
        <p class="informationP">
          用户列表
        </p>
      </div>
      <div class="entry">
        <ul class="entryHeader">
          <li class="entryLione">
            登录名
          </li>
          <li class="entryLitwo">
            姓名
          </li>
          <li class="entryLitwo">
            角色
          </li>
          <li class="entryLifive">
            邮箱
          </li>
          <li class="entryLitwo">
            电话
          </li>
          <li class="entryLifive">
            组织机构
          </li>
          <li class="entryLithree">
            最后登录时间
          </li>
         <!-- <li class="entryLithree">
            锁定
          </li>-->
          <li class="entryLifour">
            操作
          </li>
        </ul>
        <ul class="entryList">
          <li v-for="(item, $index) in information"  :key="$index" class="listLi">
            <ul class="listLiulL">
              <li class="entryLione">
                {{item.usercode?item.usercode:' '}}
              </li>
              <li class="entryLitwo">
                {{item.username?item.username:' '}}
              </li>
              <li class="entryLitwo" :title="item.rolenames">
                {{item.rolenames?item.rolenames:' '}}
              </li>
              <li class="entryLifive">{{item.email?item.email:' '}}</li>
              <li class="entryLitwo">{{item.tel?item.tel:' '}}</li>
              <li class="entryLifive">{{item.organizationname?item.organizationname:' '}}</li>
              <li class="entryLithree">{{item.lastlogintime?fmtDate(item.lastlogintime):' '}}</li>
              <!-- <li class="entryLithree">
                {{item.userroleid?item.userroleid:' '}}
              </li>-->
              <li class="entryLifour">
                <!--查看-->
                <p v-if="JurisdictionSelect" @click="exaMine(item.userid)" class="examine">
                  查看
                </p>
                <!--修改-->
                <p v-if="JurisdictionUpdate && flagState" @click="moDify(item.userid)" class="modify">
                  修改
                </p>
                <p v-if="JurisdictionUpdate && !flagState" class="content_gray">
                  修改
                </p>
                <!--授权-->
                <p v-if="JurisdictionAssign" @click="authorization(item.userid)" class="authorization">
                  授权
                </p>
                <!--修改密码-->
                <p v-if="JurisdictionUpdate && flagState" @click="infor(item.userid)" class="password">
                  修改密码
                </p>
                <p v-if="JurisdictionUpdate && !flagState" class="content_gray">
                  修改密码
                </p>
                <!--删除-->
                <p v-if="JurisdictionDelete && flagState && item.job !== 3" @click="amputate($index, information, item.userid)" class="amputate">
                  删除
                </p>
                <p v-if="JurisdictionDelete && flagState && item.job === 3" class="content_gray">
                  删除
                </p>
                <p v-if="JurisdictionDelete && !flagState" class="content_gray">
                  删除
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="paging">
        <!--分页器-->
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
    </section>
    </section>
    <!--新增-->
    <section v-if="adhibitBoolean" class="adhibit">
      <increase :increaseBoolean="adhibitBoolean" @incr="Incr"></increase>
    </section>
    <!--查看-->
    <section v-if="examineBoolean"  class="adhibit">
      <examine :examine="examineBoolean" :exaMineCodo="exaMineCodo" @mine="Mine"></examine>
    </section>
    <!--修改-->
    <section v-if="modifyBoolean" class="adhibit">
      <information  :communication="moDifynews" @informa="inFourma"></information>
    </section>
    <!--修改密码-->
    <section v-if="inforBoolean" class="adhibit">
      <edit :UserId="itemUserId" :edit="inforBoolean" @edit="eDit"></edit>
    </section>
    <!--授权-->
    <section v-if="accreditBBoolean" class="adhibit">
      <accredit @acredit="Acredit" :userid="authorizationUserid" v-if="accreditBBoolean"></accredit>
    </section>
  </div>
</template>

<script>
import { iConsumerexamine, karaktersFindAllRoles, managementCreatedtree, getAdminUsers, managementCreatedOrganizationtree, consumerFindUser, consumerdelUser, getOrganizationTreeByUser, findAllBy } from '../../api/user'
import increase from '../intercalateChild-operation/consumerChild-augment'
import examine from '../intercalateChild-operation/consumerChild-seeinfo'
import edit from '../intercalateChild-operation/consumerChild-steganogram'
//  修改
import information from '../intercalateChild-operation/consumerChild-changeinfo'
import accredit from '../intercalateChild-operation/consumerChild-accredit'
export default {
  name: 'tercalateChild-consumer',
  components: {
    increase,
    examine,
    edit,
    information,
    accredit
  },
  data () {
    return {
      organizationId: '',
      data: [],
      defaultProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      },
      creatData: [], // 用户自己创建的组织机构
      roleData: [],
      //  用户id
      itemUserId: '',
      options: [],
      value: '',
      input: '',
      //  用户名
      Username: '',
      //  角色
      role: [],
      //  手机
      Handphone: '',
      information: [],
      adhibitBoolean: false,
      examineBoolean: false,
      modifyBoolean: false,
      inforBoolean: false,
      accreditBBoolean: false,
      //  查看：向子级传递的值
      exaMineCodo: [],
      moDifynews: '',
      authorizationUserid: '',
      selectedOptions: [],
      selectedProps: {
        label: 'organizationName',
        value: 'organizationId',
        children: 'subOrgnizations'
      },
      selectedRole: {
        label: 'organizationname',
        value: 'organizationid',
        children: 'roles'
      },
      JurisdictionSelect: '',
      JurisdictionInsert: '',
      JurisdictionDelete: '',
      JurisdictionApproval: '',
      JurisdictionUpdate: '',
      pageIndex: 1,
      pageSize: 12,
      totalPage: 0,
      flagState: true, // 判断是否可以对用户进行操作
      JurisdictionAssign: ''
    }
  },
  methods: {
    // 获取数据列表
    search () {
      //  用户名
      // this.Username
      //  所属部门
      // this.selectedOptions
      //  角色
      // this.role
      //  手机号
      // this.Handphone

      let token = JSON.parse(window.sessionStorage.token)
      // const len = this.selectedOptions.length
      // const selectOptionsData = len === 0 ? '' : this.selectedOptions[(len - 1)]
      const selectRoleId = this.role.length === 0 ? '' : this.role[1]
      this.axios.post(findAllBy(this.organizationId, selectRoleId, this.Username, this.Handphone, this.pageIndex, this.pageSize, token)).then((response) => {
        if (response.data.code === 0) {
          this.information = response.data.data.data
          this.totalPage = response.data.data.pageTotal
        }
      })
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.search()
    },
    //  时间戳
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    },
    Acredit (ev) {
      this.accreditBBoolean = ev
    },
    authorization (data) {
      this.authorizationUserid = data
      this.accreditBBoolean = true
    },
    induce () {
      this.adhibitBoolean = true
    },
    // 新增
    Incr (ev) {
      this.adhibitBoolean = ev
      this.search()
    },
    exaMine (userid) {
      let url = iConsumerexamine(userid)
      this.axios.post(url).then((response) => {
        if (response.data.code === 0) {
          this.exaMineCodo = response.data.data
          this.examineBoolean = true
        }
      })
    },
    Mine (ev) {
      this.examineBoolean = ev
    },
    moDify (user) {
      //  修改用户信息
      this.axios.post(consumerFindUser(user)).then((response) => {
        if (response.data.code === 0) {
          this.moDifynews = response.data.data
          this.modifyBoolean = true
        }
      })
    },
    eDit (ev) {
      this.inforBoolean = ev
    },
    infor (item) {
      this.itemUserId = item
      this.inforBoolean = true
    },
    // 修改用户
    inFourma (ev) {
      this.modifyBoolean = ev
      this.search()
    },
    amputate ($index, content, userId) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let Userid = JSON.parse(window.sessionStorage.userInfo).userid
        this.axios.post(consumerdelUser(userId)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            content.splice([$index], 1)
            if (userId === Userid) {
              sessionStorage.clear()
              this.$router.push({path: '/login'})
              return false
            }
          } else {
            this.$message.error('删除失败,请重试')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleNodeClick (data) {
      this.authority()
      const organization = data.organizationId
      this.organizationId = organization
      if (data.flagVal === 0) {
        this.flagState = true
        this.search()
      } else {
        this.flagState = false
        let token = JSON.parse(window.sessionStorage.token)
        this.axios.post(getAdminUsers(this.organizationId, token)).then((response) => {
          if (response.data.code === 0) {
            const infodata = response.data.data
            this.information = infodata.map(t => {
              return {
                ...t,
                organizationname: data.organizationName
              }
            })
            this.totalPage = 1
          }
        })
      }
    },
    changClick (a) {
    },
    resetData (data, prop, val) {
      let arr = []
      data.forEach(t => {
        arr.push({
          ...t,
          flagVal: val,
          [prop]: t[prop] ? this.resetData(t[prop], prop, val) : []
        })
      })
      return arr
    },
    // 权限判断
    authority () {
      let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
      Jurisdiction.forEach((val) => {
        if (val.functioncode === 'user') {
          this.JurisdictionSelect = val.select
          this.JurisdictionUpdate = val.update
          this.JurisdictionInsert = val.insert
          this.JurisdictionDelete = val.delete
          this.JurisdictionApproval = val.approval
          this.JurisdictionAssign = val.assign
        }
      })
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    //  左边的树状结构
    this.axios.post(managementCreatedOrganizationtree(token)).then((response) => {
      if (response.data.code === 0) {
        this.creatData = this.resetData(response.data.data, 'subOrgnizations', 1)
      }
    })
    this.axios.post(managementCreatedtree(token)).then((response) => {
      if (response.data.code === 0) {
        this.data = this.resetData(response.data.data, 'subOrgnizations', 0)
        this.data = this.data.concat(this.creatData)
      }
    })
    this.authority()
    this.axios.post(karaktersFindAllRoles(token)).then((response) => {
      if (response.data.code === 0) {
        this.roleData = response.data.data.map(t => {
          return {
            ...t,
            roles: t.roles.map(m => {
              return {
                ...m,
                organizationid: m.roleid,
                organizationname: `${m.organizationname}-${m.rolename}`
              }
            })
          }
        })
      }
    })
    this.axios.post(getOrganizationTreeByUser(token)).then((response) => {
      if (response.data.code === 0) {
        this.options = response.data.data
      }
    })
    this.search()
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
      margin-right 20px
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
    .consumer
      min-height 840px
      overflow hidden
      position relative
      background rgba(000,000,000,.47)
    .header
      overflow hidden
      position relative
      width 100%
      padding 28px 0 15px
      color $color-text-title
      font-size $font-size-small
      background #0e1521
      .headerUl
        float left
        overflow hidden
        position relative
        margin-left 18px
        .headerLi
          float left
          line-height 40px
          overflow hidden
          margin-right 50px
          .headerP
            float left
            margin-right 18px
            line-height 40px
          .headerDiv
           float left
      .search
        queryDiv()
        margin-top 6px
    .information
       init()
       padding-bottom 10px
       background #0e1521
       .informationP
         float left
         color $color-text
         margin-left 18px
         font-size $font-size-medium-x
       .informationDiv
         float right
         margin-right 10px
         overflow hidden

         .amputate
           float left
           width 72px
           text-align center
           font-size $font-size-small
           color $color-text
           border-radius 4px
           line-height 24px
           height 24px
           cursor pointer
           transition .2s
           background #a63232
           &:hover
             background #bb4d4d
    .entry
      min-height 550px
      margin 0 10px
      overflow hidden
      .entryHeader
        init()
        padding 10px 0
        color $color-text-title
        background #354d76
        font-size $font-size-medium
    .entryLione
      float left
      width 6%
      padding-left 1%
      text-align left
    .entryLitwo
      width 8%
      text-align left10
      float left
    .entryLithree
      width 12%
      text-align left
      float left
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .entryLifour
      width 25%
      float left
      text-align left
    .entryLifive
       float left
       width 14%
       padding-right 1%
       text-align left
    .entryList
      init()
      .listLi
        init()
        height 36px
        line-height  36px
        color $color-text-title
        font-size $font-size-medium
        .listLiulL li
           height 36px
    .examine
      float left
      margin-right 16px
      cursor pointer
      color $color-background-query
    .modify
      float left
      margin-right 16px
      cursor pointer
      color $color-background-newly
    .authorization
      float left
      margin-right 16px
      cursor pointer
      color #32a697
    .password
      float left
      margin-right 16px
      cursor pointer
      color $color-background-introduce
    .amputate
      float left
      cursor pointer
      margin-right 35px
      color #a63232
    .entryList .listLi:nth-child(even)
      background #1c273a
    .entryList .listLi:nth-child(even)
      background #141d2c
  .paging
     text-align left
     margin-left 500px
     init()
     position fixed
     bottom 40px
  .adhibit
    width 100%
    height 100%
    background rgba(000,000,000,.9)
    z-index 111
    position fixed
    left 0
    top 0
  .el-select
  width 100%
  .uploaderAvatar
    font-size $font-size-small-s
    color #555555
  .avatar-uploader
    float left
    height 100px
    line-height 100px
    overflow hidden
    width 100px
  .avatar-uploader .el-upload:hover
    border-color #409EFF
  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    height 100px
    line-height 100px
    overflow hidden
    width 100px
    text-align center
  .avatar
    width 100px
    height 100px
    display block
  .leftBottomDiv
    init()
    line-height 28px
    margin-top 10px
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .leftBottomLl
    text-indent 1em
    cursor pointer
    overflow hidden
    padding 10px 0
    font-size 14px
    color #999 !important
  .content_gray
    float left
    margin-right 16px
    color #444
    cursor initial
  .superinduce
    newlyDiv()
</style>

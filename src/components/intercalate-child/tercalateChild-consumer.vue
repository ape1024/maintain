<template>
  <div class="subject">
    <section class="consumer">
      <header class="header">
        <ul class="headerUl">
          <li class="headerLi">
            <p class="headerP">
              登 录 名
            </p>
            <div class="headerDiv">
              <el-input size="mini"  v-model="Username" placeholder=""  clearable>></el-input>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              所属部门
            </p>
            <div class="headerDiv">
              <el-cascader
                size="mini"
                clearable
                :options="options"
                :props="selectedProps"
                change-on-select
                v-model="selectedOptions">
              </el-cascader>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              角 色
            </p>
            <div class="headerDiv">
              <el-select size="mini" v-model="role" placeholder="请选择" clearable>
                <el-option
                  v-for="item in roleData"
                  :key="item.roleid"
                  :label="item.rolename"
                  :value="item.roleid">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              手 机
            </p>
            <div class="headerDiv">
              <el-input size="mini" v-model="Handphone" placeholder="" clearable>></el-input>
            </div>
          </li>
        </ul>
        <div @click="search" class="search">
          搜索
        </div>
      </header>
      <div class="information">
        <p class="informationP">
          用户列表
        </p>
        <div class="informationDiv">
          <div v-if="JurisdictionApproval" @click="induce" class="superinduce">
            添加
          </div>
        </div>
      </div>
      <div class="entry">
        <ul class="entryHeader">
          <li class="entryLione">
            登录名
          </li>
          <li class="entryLitwo">
            姓名
          </li>
         <!-- <li class="entryLitwo">
            角色
          </li>-->
          <li class="entryLitwo">
            邮箱
          </li>
          <li class="entryLitwo">
            电话
          </li>
         <!-- <li class="entryLitwo">
            组织机构
          </li>-->
          <li class="entryLitwo">
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
             <!-- <li class="entryLitwo">
                {{item.userid?item.userid:' '}}
              </li>-->
              <li class="entryLitwo">{{item.email?item.email:' '}}</li>
              <li class="entryLitwo">{{item.tel?item.tel:' '}}</li>
              <!--<li class="entryLitwo">{{item.organizationid?item.organizationid:' '}}</li>-->
              <li class="entryLitwo">{{item.lastlogintime?fmtDate(item.lastlogintime):' '}}</li>
             <!-- <li class="entryLithree">
                {{item.userroleid?item.userroleid:' '}}
              </li>-->
              <li class="entryLifour">
                <!--查看-->
                <p v-if="JurisdictionSelect" @click="exaMine(item.userid)" class="examine">
                  查看
                </p>
                <!--修改-->
                <p v-if="JurisdictionUpdate" @click="moDify(item.userid)" class="modify">
                  修改
                </p>
                <!--授权-->
                <p v-if="JurisdictionInsert" @click="authorization(item.userid)" class="authorization">
                  授权
                </p>
                <!--修改密码-->
                <p v-if="JurisdictionUpdate" @click="infor(item.userid)" class="password">
                  修改密码
                </p>
                <!--删除-->
                <p v-if="JurisdictionDelete" @click="amputate($index, information, item.userid)" class="amputate">
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
import { iConsumerexamine, karaktersFindAllRoles, consumerFindUser, consumerdelUser, getOrganizationTreeByUser, findAllBy } from '../../api/user'
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
      roleData: [],
      //  用户id
      itemUserId: '',
      options: [],
      value: '',
      input: '',
      //  用户名
      Username: '',
      //  角色
      role: '',
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
      JurisdictionSelect: true,
      JurisdictionInsert: true,
      JurisdictionDelete: true,
      JurisdictionApproval: true,
      JurisdictionUpdate: true,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
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
      console.log(this.Handphone)

      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(findAllBy(this.selectedOptions, this.role, this.Username, this.Handphone, this.pageIndex, this.pageSize, token)).then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.data)
          this.information = response.data.data.data
          this.totalPage = response.data.data.pageTotal
          console.log(this.totalPage)
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
      console.log(ev)
      this.accreditBBoolean = ev
    },
    authorization (data) {
      console.log(data)
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
      console.log(item)
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
        console.log(Userid)
        this.axios.post(consumerdelUser(userId)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            content.splice([$index], 1)
            console.log(response)
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
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    console.log(window.sessionStorage)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'device') {
        this.JurisdictionSelect = val.select
        this.JurisdictionInsert = val.insert
        this.JurisdictionDelete = val.delete
        this.JurisdictionApproval = val.approval
        this.JurisdictionUpdate = val.update
        console.log(val.select)
        console.log(val.insert)
        console.log(val.delete)
        console.log(val.approval)
        console.log(val.update)
      }
    })
    this.axios.post(karaktersFindAllRoles(token)).then((response) => {
      if (response.data.code === 0) {
        this.roleData = response.data.data
      }
    })

    console.log(token)
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
    .consumer
      overflow hidden
      position relative
      background #0e1521
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
        float left
        conserve()
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
         .superinduce
           float left
           width 72px
           margin-right 18px
           text-align center
           background #3292a6
           font-size $font-size-small
           color $color-text
           border-radius 4px
           line-height 24px
           height 24px
           cursor pointer
           transition .2s
           &:hover
             background #48a8bc
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
      width 10%
      padding-left 1%
      text-align left
    .entryLitwo
      width 14%
      text-align left
      float left
    .entryLithree
      width 5%
      text-align left
      float left
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .entryLifour
      width 30%
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
      text-decoration underline
      margin-right 16px
      cursor pointer
      color $color-background-query
    .modify
      float left
      text-decoration underline
      margin-right 16px
      cursor pointer
      color $color-background-newly
    .authorization
      float left
      text-decoration underline
      margin-right 16px
      cursor pointer
      color #32a697
    .password
      float left
      text-decoration underline
      margin-right 16px
      cursor pointer
      color $color-background-introduce
    .amputate
      float left
      cursor pointer
      text-decoration underline
      margin-right 35px
      color #a63232
    .entryList .listLi:nth-child(even)
      background #1c273a
    .entryList .listLi:nth-child(even)
      background #141d2c
  .paging
     text-align center
     margin 20px 0
     init()
  .adhibit
    width 100%
    height 100%
    background rgba(000,000,000,.4)
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
</style>

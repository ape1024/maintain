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
              <el-input v-model="input" placeholder="请输入内容"  clearable>></el-input>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              所属部门
            </p>
            <div class="headerDiv">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              角 色
            </p>
            <div class="headerDiv">
              <el-input v-model="input" placeholder="请输入内容"  clearable>></el-input>
            </div>
          </li>
          <li class="headerLi">
            <p class="headerP">
              手 机
            </p>
            <div class="headerDiv">
              <el-input v-model="input" placeholder="请输入内容" clearable>></el-input>
            </div>
          </li>
        </ul>
        <div class="search">
          搜索
        </div>
      </header>
      <div class="information">
        <p class="informationP">
          用户列表
        </p>
        <div class="informationDiv">
          <div @click="induce" class="superinduce">
            添加
          </div>
          <div class="amputate">
            删除
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
          <li class="entryLitwo">
            角色
          </li>
          <li class="entryLifive">
            邮箱
          </li>
          <li class="entryLitwo">
            电话
          </li>
          <li class="entryLitwo">
            组织机构
          </li>
          <li class="entryLitwo">
            最后登录时间
          </li>
          <li class="entryLithree">
            锁定
          </li>
          <li class="entryLifour">
            操作
          </li>
        </ul>
        <ul class="entryList">
          <li v-for="(item, $index) in information"  v-bind:key="item.id" class="listLi">
            <ul>
              <li class="entryLione">
                {{item.name}}
              </li>
              <li class="entryLitwo">
                {{item.compellation}}
              </li>
              <li class="entryLitwo">{{item.identity}}</li>
              <li class="entryLifive">{{item.mailbox}}</li>
              <li class="entryLitwo">{{item.phone}}</li>
              <li class="entryLitwo">{{item.mechanism}}</li>
              <li class="entryLitwo">{{item.logintime}}</li>
              <li class="entryLithree">
                <div v-if="item.locking == 0">
                  <img src="../../../static/img/locking.png" alt="">
                </div>
                <div v-if="item.locking == 1">
                  <img src="../../../static/img/unlock.png" alt="">
                </div>
              </li>
              <li class="entryLifour">
                <!--查看-->
                <p @click="exaMine" class="examine">
                  查看
                </p>
                <!--修改-->
                <p @click="moDify" class="modify">
                  修改
                </p>
                <!--修改密码-->
                <p @click="infor" class="password">
                  修改密码
                </p>
                <!--删除-->
                <p @click="amputate($index, information)" class="amputate">
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
          background
          layout="prev, pager, next"
          :page-count="10">
        </el-pagination>
      </div>
    </section>
    <!--新增-->
    <section v-if="adhibitBoolean" class="adhibit">
      <increase :increaseBoolean="adhibitBoolean" @incr="Incr"></increase>
    </section>
    <!--查看-->
    <section v-if="examineBoolean"  class="adhibit">
      <examine :examine="examineBoolean" @mine="Mine"></examine>
    </section>
    <!--修改-->
    <section v-if="modifyBoolean" class="adhibit">
      <information :changei="modifyBoolean" @informa="inFourma"></information>
    </section>
    <!--修改密码-->
    <section v-if="inforBoolean" class="adhibit">
      <edit :edit="inforBoolean" @edit="eDit"></edit>
    </section>
  </div>
</template>

<script>
import increase from '../intercalateChild-operation/consumerChild-increase'
import examine from '../intercalateChild-operation/consumerChild-seeinfo'
import edit from '../intercalateChild-operation/consumerChild-steganogram'
import information from '../intercalateChild-operation/consumerChild-changeinfo'
export default {
  name: 'tercalateChild-consumer',
  components: {
    increase,
    examine,
    edit,
    information
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input: '',
      information: [{
        id: '1',
        name: '啦啦啦',
        compellation: '埃克索图斯',
        identity: '独裁者',
        mailbox: '188986798@qq.com',
        phone: '1831990111',
        mechanism: '光明顶',
        logintime: '2018.9.18 17:00',
        locking: 0
      }, {
        id: '2',
        name: '嘤嘤嘤',
        compellation: '李四',
        identity: '管理者',
        mailbox: '288986798@qq.com',
        phone: '3831990111',
        mechanism: '光明顶',
        logintime: '2018.9.18 15:00',
        locking: 1
      }],
      adhibitBoolean: false,
      examineBoolean: false,
      modifyBoolean: false,
      inforBoolean: false
    }
  },
  methods: {
    induce () {
      this.adhibitBoolean = true
    },
    Incr (ev) {
      this.adhibitBoolean = ev
    },
    exaMine () {
      this.examineBoolean = true
    },
    Mine (ev) {
      this.examineBoolean = ev
    },
    moDify () {
      this.modifyBoolean = true
    },
    eDit (ev) {
      this.inforBoolean = ev
    },
    infor () {
      this.inforBoolean = true
    },
    inFourma (ev) {
      //
      this.modifyBoolean = ev
    },
    amputate ($index, content) {
      content.splice([$index], 1)
    }
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
          overflow hidden
          margin-right 94px
          .headerP
            float left
            margin-right 18px
            line-height 30px
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
      width 9%
      padding-left 1%
      text-align left
    .entryLitwo
      width 10%
      text-align left
      float left
    .entryLithree
      width 5%
      text-align left
      float left
    .entryLifour
      width 20%
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
        padding 10px 0
        color $color-text-title
        font-size $font-size-medium
    .examine
      float left
      text-decoration underline
      margin-right 35px
      cursor pointer
      color $color-background-query
    .modify
      float left
      text-decoration underline
      margin-right 35px
      cursor pointer
      color $color-background-newly
    .password
      float left
      text-decoration underline
      margin-right 35px
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
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
    height 30px
    line-height 30px
</style>

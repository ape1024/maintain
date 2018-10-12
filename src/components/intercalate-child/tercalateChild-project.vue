<template>
  <div class="subject">
    <div class="subjectDiv">
      <!--v-if="JurisdictionApproval"-->
      <div v-if="JurisdictionInsert" @click="conserve" class="conserve">
        新 增
      </div>
    </div>
    <div class="content">
      <ul class="headerUl">
        <li class="headerLione">项目名称</li>
        <li class="headerLitwo">项目编号</li>
        <li class="headerLithree">业主单位</li>
        <li class="headerLitwo">服务机构</li>
        <li class="headerLitwo">项目开始时间</li>
        <li class="headerLitwo">项目结束时间</li>
        <li class="headerLitwo">创建人</li>
        <li class="headerLiFore">操作</li>
      </ul>
      <ul class="contentUl">
        <li :key="item.projectid" v-for="(item, $index) in contentliDate" class="contentLi">
          <ul class="contentLi_ul">
            <li class="headerLione">
              {{item.projectname}}
            </li>
            <li class="headerLitwo">
              {{item.projectcode}}
            </li>
            <li class="headerLithree">
              {{item.proprietorname}}
            </li>
            <li class="headerLitwo">
              {{item.vindicatorname}}
            </li>
            <li class="headerLitwo">
              {{fmtDate(item.startdate)}}
            </li>
            <li class="headerLitwo">
              {{fmtDate(item.enddate)}}
            </li>
            <li class="headerLitwo">
              {{item.creatername}}
            </li>
            <li class="headerLiFore">
              <p v-if="JurisdictionSelect" @click="exaMine(item.projectid, item)" class="contentLi_ulP">查看</p>
              <p v-if="JurisdictionUpdate" @click="modify(item)" class="contentLi_ulPtwo">修改</p>
              <p v-if="JurisdictionDelete" @click="amputate($index, contentliDate, item.projectid)" class="contentLi_ulPthree">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--添加-->
    <section v-if="adhibitBoolean" class="adhibit">
      <increase :increaseBoolean="adhibitBoolean" @incr="Incr" @superinduce="Superinduce"></increase>
    </section>
    <!--查看-->
    <section v-if="examineBoolean"  class="adhibit">
      <examine :examine="examineBoolean" :exaDate="exaMineDate" @mine="Mine"></examine>
    </section>
    <!--修改-->
    <section v-if="modifyBoolean" class="adhibit">
      <edit :edit="modifyDate" :project="projectDate" @editt="eDit"></edit>
    </section>
  </div>
</template>

<script>
import increase from '../intercalateChild-operation/consumerChild-increase'
import examine from '../intercalateChild-operation/consumerChild-examine'
import edit from '../intercalateChild-operation/consumerChild-editproject'
import { findDetailByProjectid, removeProjectById, findAllProjects, FindDevAllstate } from '../../api/user'
export default {
  name: 'tercalateChild-project',
  components: {
    increase,
    examine,
    edit
  },
  data () {
    return {
      input: '',
      exaMineDate: '',
      runningstateDate: '',
      examineBoolean: false,
      modifyBoolean: false,
      adhibitBoolean: false,
      contentliDate: '',
      value: '',
      //  修改信息
      projectDate: '',
      modifyDate: '',
      JurisdictionSelect: '',
      JurisdictionDelete: '',
      JurisdictionApproval: '',
      JurisdictionUpdate: '',
      JurisdictionInsert: ''
    }
  },
  methods: {
    //  时间戳
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    },
    //  查看
    exaMine (itemId, data) {
      this.axios.post(findDetailByProjectid(itemId)).then((response) => {
        if (response.data.code === 0) {
          this.exaMineDate = response.data.data
          this.examineBoolean = true
        }
      })
    },
    Mine (ev) {
      this.examineBoolean = ev
    },
    eDit (ev) {
      this.modifyBoolean = ev
    },
    modify (project) {
      //  修改
      this.axios.post(findDetailByProjectid(project.projectid)).then((response) => {
        if (response.data.code === 0) {
          this.modifyDate = response.data.data
          this.projectDate = project
          this.modifyBoolean = true
        }
      })
    },
    conserve () {
      this.adhibitBoolean = true
    },
    Incr (ev) {
      this.adhibitBoolean = ev
    },
    Superinduce (ev) {
      this.adhibitBoolean = ev
      this.axios.post(findAllProjects()).then((response) => {
        if (response.data.code === 0) {
          this.contentliDate = response.data.data
        }
      })
    },
    // 删除
    amputate (index, content, projectId) {
      this.$confirm('是否删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(removeProjectById(projectId)).then((response) => {
          if (response.data.code === 0) {
            content.splice([index], 1)
            this.$message('删除成功!')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'project') {
        this.JurisdictionSelect = val.select
        this.JurisdictionDelete = val.delete
        this.JurisdictionInsert = val.insert
        this.JurisdictionUpdate = val.update
      }
    })
    this.axios.post(findAllProjects()).then((response) => {
      if (response.data.code === 0) {
        this.contentliDate = response.data.data
      }
    })
    this.axios.post(FindDevAllstate()).then((response) => {
      if (response.data.code === 0) {
        this.runningstateDate = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectDiv
      overflow hidden
      padding 20px 0
      background #111a28
      position relative
      .subjectLeft
        float left
        margin-left 20px
        margin-right 50px
        overflow hidden
        .subjectP
          color $color-text-title
          line-height 30px
          float left
          font-size $font-size-medium
      .conserve
        float right
        font-size $font-size-medium
        color $color-text-title
        newlyDiv()
      .subjectRight
        float left
    .content
      init()
      min-height 840px
      background rgba(000,000,000,.35)
    .headerUl
      init()
      background #354d76
      line-height 38px
      color $color-header-b-normal
    .headerLione
      float left
      height 38px
      padding-left 1%
      width 18%
      overflow hidden
      text-align center
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
    .headerLitwo
      float left
      width 10%
      height 38px
      overflow hidden
      text-align center
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
    .headerLithree
      width  19%
      text-align center
      height 38px
      float left
    .headerLiFore
      width  10%
      text-align left
      height 38px
      float left
    .contentUl
      init()
    .contentUl .contentLi:nth-child(even)
        background #141d2c
    .contentUl .contentLi:nth-child(odd)
      background #1c273a
    .contentLi
      height 38px
      line-height 38px
      init()
    .contentLi_ul
      inti()
      color $color-text-title
    .contentLi_ulP
       float left
       width 33%
       color $color-background-query
       cursor pointer
       font-size $font-size-medium
    .contentLi_ulPtwo
       float left
       width 33%
       font-size $font-size-medium
       cursor pointer
       color $color-background-newly
    .contentLi_ulPthree
       float left
       width 33%
       cursor pointer
       font-size $font-size-medium
       color #a63232
    .subject_bottom
       init()
       margin 20px 0
       text-align center
  .adhibit
    width 100%
    height 100%
    background rgba(000,000,000,.4)
    z-index 111
    position fixed
    left 0
    top 0
</style>

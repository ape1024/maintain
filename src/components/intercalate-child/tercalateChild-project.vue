<template>
  <div class="subject">
    <div class="subjectDiv">
      <div class="subjectLeft">
      <p class="subjectP">项目名称：</p>
      <div class="subjectRight">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
     </div>
      <div class="subjectLeft">
        <p class="subjectP">项目名称：</p>
        <div class="subjectRight">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div @click="conserve" class="conserve">
        增 加
      </div>
    </div>
    <div class="content">
      <ul class="headerUl">
        <li class="headerLione">项目名称</li>
        <li class="headerLitwo">项目编号</li>
        <li class="headerLitwo">项目地址</li>
        <li class="headerLitwo">项目状态</li>
        <li class="headerLitwo">业主单位</li>
        <li class="headerLitwo">服务机构</li>
        <li class="headerLitwo">项目开始时间</li>
        <li class="headerLitwo">项目结束时间</li>
        <li class="headerLitwo">创建人</li>
        <li class="headerLithree">操作</li>
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
            <li class="headerLitwo">{{item.address}}</li>
            <li class="headerLitwo">
              {{item.projectstate}}
            </li>
            <li class="headerLitwo">
              {{item.proprietorname}}
            </li>
            <li class="headerLitwo">
              <!--服务机构-->
              {{item.proprietorname}}
            </li>
            <li class="headerLitwo">
              {{item.startdate}}
            </li>
            <li class="headerLitwo">
              {{item.enddate}}
            </li>
            <li class="headerLitwo">
              {{item.creatername}}
            </li>
            <li class="headerLithree">
              <p @click="exaMine(item.projectid)" class="contentLi_ulP">查看明细</p>
              <p @click="modify(item)" class="contentLi_ulPtwo">修改</p>
              <p @click="amputate($index, contentliDate, item.projectid)" class="contentLi_ulPthree">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="subject_bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
    <!--添加-->
    <section v-if="adhibitBoolean" class="adhibit">
      <increase :increaseBoolean="adhibitBoolean" @incr="Incr"></increase>
    </section>
    <!--查看-->
    <section v-if="examineBoolean"  class="adhibit">
      <examine :examine="examineBoolean" @mine="Mine"></examine>
    </section>
    <!--修改-->
    <section v-if="modifyBoolean" class="adhibit">
      <edit :edit="modifyBoolean" :project="projectDate" @editt="eDit"></edit>
    </section>
  </div>
</template>

<script>
import increase from '../intercalateChild-operation/consumerChild-increase'
import examine from '../intercalateChild-operation/consumerChild-examine'
import edit from '../intercalateChild-operation/consumerChild-editproject'
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
      examineBoolean: false,
      modifyBoolean: false,
      adhibitBoolean: false,
      contentliDate: '',
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
      //  修改信息
      projectDate: ''
    }
  },
  methods: {
    //  查看
    exaMine (itemId) {
      this.axios.post(`http://172.16.6.16:8920/projects/findDetailByProjectid?projectId=${itemId}`).then((response) => {
        console.log(response)
      })
      // this.examineBoolean = true
    },
    Mine (ev) {
      this.examineBoolean = ev
    },
    eDit (ev) {
      this.modifyBoolean = ev
    },
    modify (project) {
      //  修改
      this.projectDate = project
      this.modifyBoolean = true
    },
    conserve () {
      this.adhibitBoolean = true
    },
    Incr (ev) {
      this.adhibitBoolean = ev
    },
    amputate (index, content, projectId) {
      console.log(projectId)
      const url = `http://172.16.6.16:8920/projects/removeProjectById?projectId=${projectId}`
      this.axios.post(url).then((response) => {
        if (response.data.code === 0) {
          content.splice([index], 1)
          alert('删除成功！')
        }
      })
    }
  },
  created () {
    this.axios.post('http://172.16.6.16:8920/projects/findAllProjects?pagesize=10&pageindex=1&pageindex=1').then((response) => {
      if (response.data.code === 0) {
        this.contentliDate = response.data.data.data
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
        conserve()
        margin-top -3px
      .subjectRight
        float left
    .content
      init()
    .headerUl
      init()
      background #354d76
      line-height 38px
      color $color-header-b-normal
    .headerLione
      float left
      height 38px
      padding-left 1%
      width 8%
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
    .headerLitwo
      float left
      width 9%
      height 38px
      overflow hidden
      text-overflow ellipsis
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
      text-indent 2em
    .headerLithree
      width  18%
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
       color $color-background-query
       margin-right 10px
       cursor pointer
       text-decoration underline
       font-size $font-size-medium
    .contentLi_ulPtwo
       float left
       font-size $font-size-medium
       margin-right 30px
       cursor pointer
       text-decoration underline
       color $color-background-newly
    .contentLi_ulPthree
       float left
       cursor pointer
       text-decoration underline
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
<style>
  .el-input--suffix .el-input__inner {
    height:30px;
    line-height:30px;
  }
  .el-input__inner{
    height:30px!important;
    line-height:30px!important;
  }
</style>

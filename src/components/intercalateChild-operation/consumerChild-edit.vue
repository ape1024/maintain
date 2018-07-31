<template>
  <div class="subject">
    <section class="section">
      <h4 class="subjectH">
        新增项目信息
      </h4>
      <div class="information">
        <ul class="informationUl">
          <li class="informationLi">
            <div class="informationDiv">
              <div class="content">
                <el-input size="mini" v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目名称：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <p class="informationP">
                项目开始：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input size="mini" v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                业主单位：
              </p>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <div class="content">
                <el-input size="mini" v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目编号：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <p class="informationP">
                项目结束：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input size="mini" v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                服务机构：
              </p>
            </div>
          </li>
          <li class="informationLitwo">
            <div class="informationDiv">
              <div class="content">
                <el-input size="mini" v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目类别：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input size="mini" v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                创建人员：
              </p>
            </div>
            <div class="informationDiv">
              <div class="content">
                <el-input v-model="input" placeholder="请输入内容"  clearable>></el-input>
              </div>
              <p class="informationP">
                项目地址：
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">合同范围</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDiv">
          <div class="substance">
            <div class="substanceDiv">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <p class="substanceP">
              建筑范围：
            </p>
          </div>
          <div class="substance">
            <div class="substanceDiv">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <p class="substanceP">
              消防设备：
            </p>
          </div>
        </div>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">维保内容</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDivtwo">
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">维保要求</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDivtwo">
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <div class="purview">
        <header class="contentHeader">
          <p class="headerP">备注信息</p>
          <p class="headerLine"></p>
        </header>
        <div class="purviewDivtwo">
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <div class="upload">
        <p class="uploadP">附属文件：</p>
        <div class="uploadDiv">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">按需上传PDF、Word、Execl、JPG格式的相关文件</div>
          </el-upload>
        </div>
      </div>
      <div class="personnel">
        <p class="personnelP">项目人员配备：</p>
        <div class="personnelDiv">
          <el-input v-model="input" placeholder="请输入内容"  clearable>></el-input>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">保存</div>
        <div class="closedown">关闭</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'consumerChild-edit',
  props: ['increaseBoolean'],
  data () {
    return {
      // 本页面的显示隐藏
      Thispage: false,
      input: '',
      value1: '',
      value2: '',
      textarea: '',
      fileList3: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.fileList3 = fileList.slice(-3)
    },
    conserve () {
      this.Thispage = this.increaseBoolean
      this.Thispage = !this.Thispage
      alert(this.increaseBoolean)
      this.$emit('edit', this.Thispage)
    },
    closedown () {

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    padding 20px 0 20px
    margin-top 20px
    background #111a28
    .section
      width 1245px
      margin 0 auto
      overflow hidden
      position relative
    .subjectH
      margin-bottom 35px
      font-size $font-size-medium-x
      color $color-text-title
    .information
      margin-left 55px
      overflow hidden
      .informationUl
        init()
        .informationLi
          float left
          overflow hidden
          position relative
          width 33%
      .informationLitwo
        float left
        overflow hidden
        margin-left .5%
        position relative
        width 33%
      .informationDiv
        init()
        margin-bottom 15px
      .informationP
        color $color-border-b-fault
        font-size $font-size-medium
        line-height 40px
        margin-right 10px
        float right
      .content
        width 267px
        float right
    .purview
      init()
    .contentHeader
      init()
      .headerP
        float left
        margin-right 18px
        color $color-border-b-fault
        font-size $font-size-medium
      .headerLine
        width 1149px
        height 1px
        background #444d5b
        margin-top 7px
        float right
    .purviewDivtwo
      width 1066px
      float right
      overflow hidden
      margin 10px 0
    .purviewDiv
      margin-left 30px
      overflow hidden
      margin-top 10px
      .substance
        init()
        margin-bottom 10px
        .substanceP
          float right
          color $color-border-b-fault
          margin-right 25px
          line-height 40px
          font-size $font-size-medium
        .substanceDiv
          width 1066px
          float right
    .upload
      init()
      margin-top 10px
      .uploadP
        font-size $font-size-medium
        color $color-border-b-fault
        margin-left 96px
        float left
      .uploadDiv
        overflow hidden
        float left
    .personnel
      init()
      margin-top 10px
      .personnelP
        margin-left 64px
        line-height 40px
        font-size $font-size-medium
        color $color-border-b-fault
        float left
      .personnelDiv
        width 412px
        float left
    .fastener
      init()
      margin-top 10px
      text-align center
      .conserve
        conserve()
        margin-right 110px
      .closedown
        closedown()
</style>

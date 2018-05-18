<template>
    <div class="subject">
      <div class="content">
        <h4 class="subjectH">
          更换设备
        </h4>
        <div class="subjectDiv">
          <ul class="subjectDivul">
            <li class="subjectDivli">
              <p class="subjectDivliP">
                设施类别：
              </p>
              <div class="subjectDivliDiv">
                1231
              </div>
            </li>
            <li class="subjectDivli">
              <p class="subjectDivliP">
                设施位置：
              </p>
              <div class="subjectDivliDiv">
                1231
              </div>
            </li>
            <li class="subjectDivli">
              <p class="subjectDivliP">
                生产厂家：
              </p>
              <div class="subjectDivliDiv">
                1231
              </div>
            </li>
            <li class="subjectDivli">
              <p class="subjectDivliP">
                规格型号：
              </p>
              <div class="subjectDivliDiv">
                1231
              </div>
            </li>
          </ul>
        </div>
        <div class="header">
          <p class="headerP">
            新录入信息将替代原对应内容
          </p>
          <p class="headerL"></p>
        </div>
        <ul class="contentUl">
          <li class="contentLi">
            <div class="contentLiDiv">
              <p class="contentLiDivP">设备类别：</p>
              <div class="contentLiDivR">
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
            <div class="contentLiDiv">
              <p class="contentLiDivP">生产厂家：</p>
              <div class="contentLiDivR">
                <el-select v-model="value" placeholder="">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="contentLiDiv">
              <p class="contentLiDivP">规格型号：</p>
              <div class="contentLiDivR">
                <el-input v-model="input" placeholder=""></el-input>
              </div>
            </div>
            <div class="contentLiDiv">
              <p class="contentLiDivP">报警回路：</p>
              <div class="contentLiDivR">
                <el-input v-model="input" placeholder=""></el-input>
              </div>
            </div>
          </li>
          <li class="contentLi">
            <div class="contentLiDiv">
              <p class="contentLiDivP">设备类别：</p>
              <div class="contentLiDivR">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="contentLiDiv">
              <p class="contentLiDivP">技术参数：</p>
              <div class="contentLiDivR">
                <el-input
                  type="textarea"
                  :rows="2"
                  resize="none"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </div>
            </div>
            <div class="contentLiDiv">
              <p class="contentLiDivP">备注说明：</p>
              <div class="contentLiDivR">
                <el-input
                  type="textarea"
                  :rows="2"
                  resize="none"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </li>
          <li class="contentLitwo">
            <div class="contentLiDiv">
              <p class="contentLiDivP">
                有效日期
              </p>
              <div class="contentLiDivR">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>

            </div>
          </li>
        </ul>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">
          保存
        </div>
        <div class="closedown">
          关闭
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'adminChild-quipment',
  props: ['msg'],
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
      value1: '',
      textarea: '',
      thiSpage: false
    }
  },
  methods: {
    conserve () {
      this.thiSpage = this.msg
      this.thiSpage = !this.thiSpage
      this.$emit('quipment', this.thiSpage)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    padding 60px 0 30px
    margin-top 160px
    background #111a28
    init()
  .content
      margin 0 340px
      overflow hidden
    .subjectH
       margin-bottom 38px
       font-size $font-size-medium-x
       color $color-text-title
    .subjectDiv
       overflow hidden
       position relative
       margin-left 80px
       .subjectDivul
          init()
          .subjectDivli
              float left
              overflow hidden
              width 50%
              margin-bottom 22px
              .subjectDivliP
                  float left
                  color $color-header-b-normal
                  font-size $font-size-medium
              .subjectDivliDiv
                  float left
                  color $color-text
    .header
      overflow hidden
      position relative
      margin-bottom 22px
      margin-left 40px
      .headerP
         float left
         letter-spacing 2px
         font-size $font-size-medium
         color #3a4250
      .headerL
        float right
        background #444d5b
        height 1px
        width 900px
        margin-top 8px
    .contentUl
      overflow hidden
      position relative
      margin-left 80px
      .contentLi
        float left
        margin-right 45px
        overflow hidden
      .contentLitwo
        float right
        overflow hidden
      .contentLiDiv
        overflow hidden
        color $color-header-b-normal
        margin-bottom 15px
        font-size $font-size-medium
        position relative
      .contentLiDivP
         float left
         width 80px
         line-height 30px
         margin-right 10px
         text-align right
      .contentLiDivR
         float left
         width 260px
  .el-select
     display block
  .el-date-editor.el-input, .el-date-editor.el-input__inner
     width 260px
  .fastener
     init()
     text-align center
     margin-top 160px
    .conserve
      conserve()
      margin-right 110px
    .closedown
      closedown()
</style>
<style>
  .el-input__icon{
    line-height:30px!important;
  }
</style>

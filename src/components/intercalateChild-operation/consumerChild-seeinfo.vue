<template>
  <div class="information">
    <section v-show="condition == true" class="informationDiv">
      <h4 class="informationH">
        查看用户信息
      </h4>
      <div class="subject">
        <div class="subjectLeft">
          <div class="subjectDiv">
            <p class="subjectP">
              登 录 名：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.usercode"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              用户姓名：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.username"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              邮 箱：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.email"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              用户角色：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.rolename"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              联系电话：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.tel"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              用户头像：
            </p>
            <div class="upload">
              <img class="uploadImg" :src="exaMineCodo.icon" alt="">
            </div>
          </div>
        </div>
        <div class="subjectRight">
          <div class="subjectDiv">
            <p class="subjectP">
              所属组织：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.organizationname"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              工作职务：
            </p>
            <div class="subjectRigh">
              <el-input
                :disabled="true"
                placeholder=""
                v-model="exaMineCodo.jobname"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              备注信息：
            </p>
            <div class="subjectRigh">
              <el-input
                type="textarea"
                :rows="2"
                :disabled="true"
                resize="none"
                placeholder=""
                v-model="exaMineCodo.memo">
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="closedown">
          关闭
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'consumerChild-seeinfo',
  props: ['examine', 'exaMineCodo'],
  data () {
    return {
      thisPage: false,
      condition: true,
      input: '',
      imageUrl: '',
      value: '',
      input10: '',
      textarea: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    conserve () {
      this.thisPage = this.examine
      this.thisPage = !this.thisPage
      this.$emit('mine', this.thisPage)
    },
    blockedOut () {
      this.condition = !this.condition
    }
  },
  created () {
    console.log(this.exaMineCodo)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .information
    width 100%
    padding 40px 0 30px!important
    margin-top 200px
    position relative
    overflow hidden
    background #111a28
    .informationDiv
      width 1000px
      margin 0 auto
      overflow hidden
      position relative
      .informationH
        color $color-text-title
        font-size $font-size-medium-x
      .informationP
        text-align right
        cursor pointer
        text-decoration underline
        color $color-header-b-normal
        font-size $font-size-small
    .subject
      overflow hidden
      position relative
      margin 0 120px 130px
      .subjectLeft
        float left
        overflow hidden
    .subjectDiv
      color $color-border-b-fault
      font-size $font-size-medium
      margin-bottom 15px
      overflow hidden
      .subjectP
        float left
        text-align right
        margin-right 10px
        line-height 30px
        width 80px
      .subjectRigh
        float left
        width 258px
      .upload
        width 60px
        height 60px
        text-align center
        line-height 60px
        background #0a111b
        float left
  .cryptogram
    width 360px
    margin 150px auto
    overflow hidden
    .cryptogramDiv
      overflow hidden
      margin-bottom 10px
      .cryptogramP
        float left
        width 80px
        margin-right 10px
        text-align right
        line-height 40px
        color $color-border-b-fault
        font-size $font-size-medium
      .cryptogramRight
        float left
        width 230px
        overflow hidden
      .estate
        float left
      .el-icon-error
        color #A63232
        margin-left 10px
        line-height 40px
      .el-icon-success
        color #3ACF76
        margin-left 10px
        line-height 40px
  .uploadImg
     display inline-block
     width 100%
     height 100%
  .fastener
    init()
    text-align center
  .conserve
    conserve()
    margin-right 40px
  .closedown
    closedown()
  .subjectRight
    float right
    overflow hidden
  .el-select
    width 100%
  .uploaderAvatar
    font-size $font-size-small-s
    color #555555
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
    height 30px
    line-height 30px
</style>

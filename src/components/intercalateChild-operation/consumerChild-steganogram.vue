<template>
  <div class="information">
    <section class="informationDiv">
      <h4 class="informationH">
        修改密码
      </h4>
      <div class="cryptogram">
        <div class="cryptogramDiv">
          <p class="cryptogramP">
            原始密码：
          </p>
          <div class="cryptogramRight">
            <el-input
              placeholder=""
              type="password"
              @blur="cryptogramBlur(barbarism)"
              v-model="barbarism"
              clearable>
            </el-input>
          </div>
          <div class="estate">
            <i v-show="showState" class="el-icon-error"></i>
            <i v-show="!showState" class="el-icon-success"></i>
          </div>
        </div>
        <div class="cryptogramDiv">
          <p class="cryptogramP">
            新 密 码：
          </p>
          <div class="cryptogramRight">
            <el-input
              placeholder=""
              type="password"
              v-model="newcode"
              clearable>
            </el-input>
          </div>
        </div>
        <div class="cryptogramDiv">
          <p class="cryptogramP">
            重复密码：
          </p>
          <div class="cryptogramRight">
            <el-input
              placeholder=""
              type="password"
              v-model="duplicate"
              clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div class="fastener">
        <div @click="conserve" class="conserve">
          保存
        </div>
        <div @click="closedown" class="closedown">
          关闭
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'consumerChild-steganogram',
  props: ['edit', 'UserId'],
  data () {
    return {
      //  原始密码
      barbarism: '',
      //  新密码
      newcode: '',
      //  重复密码
      duplicate: '',
      thisPage: false,
      condition: true,
      input: '',
      imageUrl: '',
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
      input10: '',
      textarea: '',
      showState: true
    }
  },
  methods: {
    cryptogramBlur (item) {
      let original = JSON.parse(window.sessionStorage.userInfo).pwd
      if (original === item) {
        this.showState = !this.showState
      } else {
        alert('原始密码错误!')
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    conserve () {
      //  首先判断 原始密码 是否和账号密码一样，其次判断 新密码和重复密码是否一样
      let original = JSON.parse(window.sessionStorage.userInfo).pwd
      let userId = JSON.parse(window.sessionStorage.userInfo).userid
      let useridCurrent = this.UserId
      console.log(useridCurrent)
      if (this.barbarism === original) {
        if (this.newcode !== '') {
          if (this.newcode !== this.barbarism) {
            if (this.newcode === this.duplicate) {
              let url = `http://172.16.6.16:8920/users/updateUser?userid=${useridCurrent}&pwd=${this.newcode}`
              this.axios.post(url).then((response) => {
                if (response.data.code === 0) {
                  if (userId === useridCurrent) {
                    alert('修改成功，请重新登录！')
                    sessionStorage.clear()
                    this.$router.push({path: '/login'})
                    return false
                  } else {
                    this.thisPage = this.edit
                    this.thisPage = !this.thisPage
                    this.$emit('edit', this.thisPage)
                    return false
                  }
                } else {
                  alert('修改失败')
                  return false
                }
              })
            } else {
              alert('新旧密码必须相同！')
              return false
            }
          } else {
            alert('新旧密码不能相同！')
            return false
          }
        } else {
          alert('新密码不能为空！')
          return false
        }
      } else {
        alert('原始密码错误！')
        return false
      }
    },
    blockedOut () {
      this.condition = !this.condition
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    closedown () {
      this.thisPage = this.edit
      this.thisPage = !this.thisPage
      this.$emit('edit', this.thisPage)
      return false
    }
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
        line-height 30px
      .el-icon-success
        color #3ACF76
        margin-left 10px
        line-height 30px
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

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
                size="mini"
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
                size="mini"
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
                size="mini"
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
                size="mini"
                :disabled="true"
                placeholder=""
                v-model="rolename"
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
                size="mini"
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
              <img class="uploadImg" :src="exaMineCodo.fullicon" alt="">
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
                size="mini"
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
                size="mini"
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
                size="mini"
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
import { FindAllRolesByOrgID } from '../../api/user'
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
      textarea: '',
      rolename: ''
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
    console.log(this.exaMineCodo.roleid)
    console.log(this.exaMineCodo.organizationid)
    console.log(FindAllRolesByOrgID(this.exaMineCodo.organizationid))
    this.axios.post(FindAllRolesByOrgID(this.exaMineCodo.organizationid)).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        if (response.data.data.length !== 0) {
          if (this.exaMineCodo.roleid.indexOf(';') !== -1) {
            let roleidArr = []
            this.exaMineCodo.roleid.split(';').forEach((val) => {
              roleidArr.push(parseInt(val))
            })
            console.log('====')
            console.log(roleidArr)
            roleidArr.forEach((val, index) => {
              response.data.data.forEach((data) => {
                console.log(val)
                if (data.roleid === val) {
                  console.log('---')
                  console.log(data)
                  this.rolename += ` ${data.rolename} `
                }
              })
            })
          } else {
            let exaRoleid = parseInt(this.exaMineCodo.roleid)
            response.data.data.forEach((val) => {
              if (val.roleid === exaRoleid) {
                console.log(val.rolename)
                this.rolename += ` ${val.rolename} `
              }
            })
          }
        } else {
          this.rolename = ''
        }
      }
    })
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
      margin 0 120px 60px
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
        width 100px
        height 100px
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

<template>
  <div class="information">
    <section  class="informationDiv">
      <h4 class="informationH">
        修改个人信息
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
                placeholder=""
                disabled
                v-model="nameoflanding"
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
                placeholder=""
                v-model="Username"
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
                placeholder=""
                v-model="Useremail"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              用户角色：
            </p>
            <div class="subjectRigh">
              <el-select size="mini" v-model="userstate" multiple placeholder="请选择" disabled>
                <el-option
                  v-for="item in roleSelect"
                  :key="item.roleid"
                  :label="item.rolename"
                  :value="item.roleid">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              联系电话：
            </p>
            <div class="subjectRigh">
              <el-input
                size="mini"
                placeholder=""
                v-model="pheneInput"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              用户头像：
            </p>
            <el-upload
              size="mini"
              class="avatar-uploader"
              :action="uploadUrlData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="subjectRight">
          <div class="subjectDiv">
            <p class="subjectP">
              所属组织：
            </p>
            <div class="subjectRigh">
              <el-cascader
                size="mini"
                disabled
                :options="organize"
                :props="defaultProps"
                @change="handleChange"
                v-model="organizeOptions"
                change-on-select
              ></el-cascader>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              工作职务：
            </p>
            <div class="subjectRigh">
              <el-select size="mini" v-model="businesspostCode" placeholder="请选择" disabled>
                <el-option
                  v-for="item in businesspost"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
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
                resize="none"
                placeholder=""
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <!--原始密码-->
            <p class="subjectP">
              旧密码：
            </p>
            <div class="subjectRigh">
              <el-input size="mini" @blur="passwordBlur" type="password" v-model="Oldcipher" placeholder=""></el-input>
            </div>
            <i v-show="!showState" class="elIcon el-icon-error elIcon_error"></i>
            <i v-show="showState" class="el-icon-success elIcon_success elIcon"></i>
          </div>
          <div class="subjectDiv">
            <!--原始密码-->
            <p class="subjectP">
              新密码：
            </p>
            <div class="subjectRigh">
              <el-input :disabled="OldcipherBoolean" size="mini" type="password" v-model="passwordInput" placeholder=""></el-input>

            </div>
          </div>
          <div class="subjectDiv">
            <!--原始密码-->
            <p class="subjectP">
              重复密码：
            </p>
            <div class="subjectRigh">
              <el-input :disabled="OldcipherBoolean" size="mini" type="password" v-model="newrepeatPassword" placeholder=""></el-input>
            </div>
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
import { getRolesList, getJobList, getOrganizationTrees, FindAllRolesByOrgID, upload, updateUserWithPwd, steganogramCheckOldPwd } from '../../api/user'
export default {
  name: 'consumerHeaderRight',
  props: ['communication'],
  components: {
  },
  data () {
    return {
      condition: true,
      //  登陆名
      nameoflanding: this.communication.usercode,
      //  用户姓名
      Username: this.communication.username,
      //  用户邮箱
      Useremail: this.communication.email,
      //  手机号
      pheneInput: this.communication.tel,
      //  照片
      Userportrait: this.communication.icon,
      //  新密码
      newpasswordInput: '',
      //  重复密码
      newrepeatPassword: '',
      input: '',
      //  职务
      businesspost: '',
      //  上传这个
      businesspostCode: '',
      //  组织结构
      organize: [],
      imageUrl: this.communication.fullicon,
      roleSelect: [],
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      value: '',
      textarea: this.communication.memo,
      organizationid: '',
      thisPage: false,
      userstate: [],
      fileList: [],
      defaultProps: {
        label: 'organizationName',
        children: 'subOrgnizations',
        value: 'organizationId'
      },
      organizeOptions: [],
      imageUrlTwo: '',
      uploadUrlData: upload(JSON.parse(window.sessionStorage.token)),
      Oldcipher: '',
      passwordInput: '',
      OldcipherBoolean: true,
      showState: false
    }
  },
  watch: {
    organizeOptions (val) {
      let data = val[val.length - 1]
      this.FindAllRolesByOrg(data)
    },
    Oldcipher (val) {
      if (!val) {
        this.OldcipherBoolean = true
        this.passwordInput = ''
        this.newrepeatPassword = ''
      } else {
        this.OldcipherBoolean = false
      }
    }
  },
  methods: {
    passwordBlur (el) {
      let usercode = JSON.parse(window.sessionStorage.userInfo).usercode
      let password = this.Oldcipher
      this.axios.post(steganogramCheckOldPwd(usercode, password)).then((response) => {
        if (response.data.data === true) {
          this.showState = true
        } else {
          this.$message({
            message: '原始密码错误!',
            type: 'warning'
          })
          this.showState = false
        }
      })
    },
    FindAllRolesByOrg (data) {
      this.axios.post(FindAllRolesByOrgID(data)).then((response) => {
        if (response.data.code === 0) {
          this.roleSelect = response.data.data
        }
      })
    },
    handleAvatarSuccess (response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrlTwo = response.data
    },
    conserve () {
      //  获取当前用户id
      let userid = this.communication.userid
      //  获取组织id
      let organizationid = this.organizeOptions[this.organizeOptions.length - 1]
      //  旧密码
      let oldpwd = this.Oldcipher
      //  新密码
      let newpwd = this.passwordInput
      //  获取用户姓名
      let username = this.Username
      //  获取邮箱
      let email = this.Useremail !== null ? this.Useremail : ''
      //  获取电话
      let tel = this.pheneInput !== null ? this.pheneInput : ''
      //  用户最后登录时间
      let userstate = []
      //  获取职位
      let job = this.businesspostCode !== null ? this.businesspostCode : ''
      //  获取备注
      let memo = this.textarea !== null ? this.textarea : ''
      //  角色信息
      let roleids = this.userstate.length !== 0 ? this.userstate : []
      //  获取上传图片
      let file = this.imageUrlTwo === '' ? this.imageUrl : this.imageUrlTwo
      let token = JSON.parse(window.sessionStorage.token)
      if (this.organizeOptions.length === 0) {
        this.$message({
          message: '请选择所属组织',
          type: 'warning'
        })
        return
      }
      if (this.Oldcipher) {
        if (this.passwordInput !== this.Oldcipher) {
          if (this.passwordInput && this.newrepeatPassword) {
            if (this.passwordInput !== this.newrepeatPassword) {
              this.$message({
                message: '新密码与重复密码不相同',
                type: 'warning'
              })
              return false
            }
          } else {
            this.$message({
              message: '新密码与重复密码都要填写',
              type: 'warning'
            })
            return false
          }
        } else {
          this.$message({
            message: '新密码与旧密码不能相同',
            type: 'warning'
          })
          return false
        }
      } else {
        newpwd = ''
      }
      this.axios.post(updateUserWithPwd(token, userid, oldpwd, newpwd, organizationid, username, email, tel, userstate, job, memo, roleids, file)).then((response) => {
        if (response.data.code === 0) {
          if (!newpwd) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$emit('informa', false)
          } else {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$router.push({path: '/login'})
            sessionStorage.clear()
          }
        } else {
          this.$message({
            message: `${response.data.message}`,
            type: 'warning'
          })
        }
      })
    },
    blockedOut () {
      this.condition = !this.condition
    },
    closedown () {
      this.$emit('informa', false)
    },
    handleChange (value) {
      let Value = value[value.length - 1]
      this.organizationid = Value
      this.userstate = []
    }
  },
  created () {
    if (this.communication.allorgid.length !== 0) {
      this.organizeOptions = this.communication.allorgid
    }
    this.businesspostCode = this.communication.job
    // this.organizeOptions.push(this.communication)
    if (this.communication.roleid !== '') {
      let roleid = this.communication.roleid.split(';')
      // this.userstate = roleid
      roleid.forEach((val) => {
        this.userstate.push(parseInt(val))
      })
    } else {
      this.userstate = []
    }

    // this.userstate.push(this.communication.roleid)
    let token = JSON.parse(window.sessionStorage.token)
    //  用户角色
    this.axios.post(getRolesList(token)).then((response) => {
      if (response.data.code === 0) {
        this.roleSelect = response.data.data
        return false
      } else {
        alert('请求失败')
        return false
      }
    })
    //  获取职务
    this.axios.post(getJobList()).then((response) => {
      if (response.data.code === 0) {
        this.businesspost = response.data.data
      }
    })
    //  获取组织结构
    this.axios.post(getOrganizationTrees(token)).then((response) => {
      if (response.data.code === 0) {
        this.organize = (response.data.data)
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
        margin-bottom 15px
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
      margin 0 100px 130px
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
    width: 40px;
    height: 40px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
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
  .elIcon
    margin-left 10px
    line-height 28px
  .elIcon_success
    color #3acf76
  .elIcon_error
    color #a63232
</style>

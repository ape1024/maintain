<template>
  <div class="information">
    <section  class="informationDiv">
      <h4 class="informationH">
        新增用户
      </h4>
      <div class="subject">
        <div class="subjectLeft">
          <div class="subjectDiv">
            <p class="subjectP">
              用户账号：
            </p>
            <div class="subjectRigh">
              <el-input
                size="mini"
                placeholder=""
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
              <el-select size="mini" :disabled="roleDisabled " v-model="userstate" multiple collapse-tags placeholder="请选择">
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
              class="avatar-uploader"
              :action="uploadUrl"
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
              <el-select size="mini" v-model="businesspostCode" placeholder="请选择">
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
              密码：
            </p>
            <div class="subjectRigh">
              <el-input
                size="mini"
                type="password"
                placeholder=""
                v-model="Userpwd"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="subjectDiv">
            <p class="subjectP">
              重复密码：
            </p>
            <div class="subjectRigh">
              <el-input
                size="mini"
                placeholder=""
                type="password"
                v-model="repwd"
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
                placeholder=""
                v-model="textarea">
              </el-input>
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
import { appUser, getRolesList, getJobList, getOrganizationTrees, upload, getRolesListByOrg } from '../../api/user'
export default {
  name: 'consumerChild-augment',
  props: ['increaseBoolean'],
  data () {
    return {
      fileList: [],
      condition: true,
      // upload
      uploadUrl: upload(JSON.parse(window.sessionStorage.token)),
      //  登陆名
      nameoflanding: '',
      //  用户姓名
      Username: '',
      //  用户邮箱
      Useremail: '',
      //  手机号
      pheneInput: '',
      //  照片
      Userportrait: '',
      input: '',
      //  职务
      businesspost: '',
      //  上传这个
      businesspostCode: '',
      //  组织结构
      organize: [],
      //  头像
      Headportrait: '',
      //  密码
      Userpwd: '',
      //  重复密码
      repwd: '',
      imageUrl: '',
      imageUrlTwo: '',
      roleSelect: '',
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      value: '',
      textarea: '',
      organizationid: '',
      userstate: [],
      organizeOptions: [],
      defaultProps: {
        label: 'organizationName',
        children: 'subOrgnizations',
        value: 'organizationId'
      },
      roleDisabled: true
    }
  },
  watch: {
    organizeOptions (val) {
      let data = val[val.length - 1]
      if (data) {
        this.roleDisabled = false
        let token = JSON.parse(window.sessionStorage.token)
        this.FindAllRolesByOrg(token, data)
      } else {
        this.roleDisabled = true
      }
    }
  },
  methods: {
    FindAllRolesByOrg (token, data) {
      this.axios.post(getRolesListByOrg(token, data)).then((response) => {
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
      let urltoken = JSON.parse(window.sessionStorage.token)
      //  获取组织id
      let organizationid = this.organizationid
      //  获取当前用户账号
      let usercode = this.nameoflanding
      //  获取用户姓名
      let username = this.Username
      //  获取邮箱
      let email = this.Useremail
      //  获取电话
      let tel = this.pheneInput
      //  获取职位
      let job = this.businesspostCode
      //  获取备注
      let memo = this.textarea
      //  获取角色
      let roleids = this.userstate.length !== 0 ? this.userstate : []
      //  获取头像
      let headportrait = this.imageUrlTwo
      //  获取当前密码
      let Userpwd = this.Userpwd
      //  获取当前重复密码
      let reowd = this.repwd
      if (organizationid === '') {
        this.$message({
          message: '请选择所属组织',
          type: 'warning'
        })
        return false
      } else if (usercode === '') {
        this.$message({
          message: '账号不能为空',
          type: 'warning'
        })
        return false
      } else if (username === '') {
        this.$message({
          message: '用户姓名不能为空',
          type: 'warning'
        })
        return false
      } else if (Userpwd === '') {
        this.$message({
          message: '用户密码不能为空',
          type: 'warning'
        })
        return false
      } else if (job === '') {
        this.$message({
          message: '请填写工作职务',
          type: 'warning'
        })
        return false
      } else if (roleids.length === 0) {
        this.$message({
          message: '请选择用户角色',
          type: 'warning'
        })
        return false
      } else if (reowd === '') {
        this.$message({
          message: '重复密码不能为空',
          type: 'warning'
        })
        return false
      } else if (Userpwd !== reowd) {
        this.$message({
          message: '密码不一致!',
          type: 'warning'
        })
        return false
      }
      let url = appUser(urltoken, organizationid, usercode, username, Userpwd, email, tel, job, memo, roleids, headportrait)
      this.axios.post(url).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$emit('incr', false)
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    closedown () {
      this.thisPage = this.increaseBoolean
      this.thisPage = !this.thisPage
      this.$emit('incr', this.thisPage)
    },
    handleChange (value) {
      let Value = value[value.length - 1]
      this.organizationid = Value
      this.userstate = []
    }
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
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

<template>
    <div>

    </div>
</template>

<script>
import { getUserFuncions, getPorjectByUserID, secede } from '../../api/user'
export default {
  name: 'loginBlank',
  data () {
    return {
      authority: [],
      deviceSelect: '',
      taskXjSelect: '',
      taskJcSelect: '',
      taskWbSelect: '',
      taskGzwxSelect: '',
      feedbackSelect: '',
      planSelect: '',
      fileSelect: '',
      organizationSelect: '',
      roleSelect: '',
      userSelect: '',
      projectSelect: '',
      standardSelect: '',
      infoSelect: '',
      basedeviceSelect: ''
    }
  },
  created () {
    let newToken = JSON.parse(window.sessionStorage.token)
    this.axios.post(getUserFuncions(newToken)).then((data) => {
      data.data.forEach((val) => {
        let approval = ''
        let deleteData = ''
        let insertData = ''
        let selectData = ''
        let updateData = ''
        let assignData = ''
        let checkData = ''
        if (val.approval === 0) {
          approval = false
        } else {
          approval = true
        }
        if (val.delete === 0) {
          deleteData = false
        } else {
          deleteData = true
        }
        if (val.insert === 0) {
          insertData = false
        } else {
          insertData = true
        }
        if (val.select === 0) {
          selectData = false
        } else {
          selectData = true
        }
        if (val.update === 0) {
          updateData = false
        } else {
          updateData = true
        }
        if (val.assign === 0) {
          assignData = false
        } else {
          assignData = true
        }
        if (val.check === 0) {
          checkData = false
        } else {
          checkData = true
        }
        let obj = {
          functioncode: val.functioncode,
          approval: approval,
          delete: deleteData,
          insert: insertData,
          select: selectData,
          update: updateData,
          assign: assignData,
          check: checkData
        }
        this.authority.push(obj)
      })
      let authority = JSON.stringify(this.authority)
      window.sessionStorage.setItem('Jurisdiction', authority)
      let token = JSON.parse(window.sessionStorage.token)
      let userid = JSON.parse(window.sessionStorage.userInfo).userid
      this.axios.post(getPorjectByUserID(token, userid)).then((response) => {
        if (response.data.code === 0) {
          if (response.data.data.length) {
            this.$router.replace('/home')
          } else {
            let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
            Jurisdiction.forEach((val) => {
              if (val.functioncode === 'device') {
                this.deviceSelect = val.select
              }
              if (val.functioncode === 'task_xj') {
                this.taskXjSelect = val.select
              }
              if (val.functioncode === 'task_jc') {
                this.taskJcSelect = val.select
              }
              if (val.functioncode === 'task_wb') {
                this.taskWbSelect = val.select
              }
              if (val.functioncode === 'task_gzwx') {
                this.taskGzwxSelect = val.select
              }
              if (val.functioncode === 'feedback') {
                this.feedbackSelect = val.select
              }
              if (val.functioncode === 'plan') {
                this.planSelect = val.select
              }
              if (val.functioncode === 'file') {
                this.fileSelect = val.select
              }
              if (val.functioncode === 'organization') {
                this.organizationSelect = val.select
              }
              if (val.functioncode === 'role') {
                this.roleSelect = val.select
              }
              if (val.functioncode === 'user') {
                this.userSelect = val.select
              }
              if (val.functioncode === 'project') {
                this.projectSelect = val.select
              }
              if (val.functioncode === 'standard') {
                this.standardSelect = val.select
              }
              if (val.functioncode === 'info') {
                this.infoSelect = val.insert
              }
              if (val.functioncode === 'device') {
                this.basedeviceSelect = val.select
              }
            })
            if (this.organizationSelect || this.roleSelect || this.userSelect || this.projectSelect || this.standardSelect || this.infoSelect || this.basedeviceSelect) {
              // blanKpage
              this.$router.replace('/home/intercalate')
            } else {
              this.axios.post(secede(token)).then((response) => {
                //   用户点击退出 清除sessionStorage
                this.$message({
                  showClose: true,
                  message: '当前用户,没有项目并没有任何权限!',
                  type: 'warning'
                })
                this.$router.push({path: '/login'})
                sessionStorage.clear()
              })
            }
          }
        }
      })
    })
  }
}
</script>

<style scoped>

</style>

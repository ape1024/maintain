<template>
    <div>

    </div>
</template>

<script>
import { getUserFuncions } from '../../api/user'
export default {
  name: 'loginBlank',
  data () {
    return {
      authority: []
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
      this.$router.replace('/home')
    })
  }
}
</script>

<style scoped>

</style>

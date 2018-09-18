<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../common/img/department.png" alt="">
        <p class="subjectP">角色管理</p>
      </header>
      <div v-if="JurisdictionSelect" class="leftBottom">
        <ul class="leftBottomUl" :key="index" v-for="(item ,index) in customRoles" >
          <li>
            <div @click="ficationClick(item)" class="leftBottomLl">{{item.organizationname}}
              <!--<div v-if="JurisdictionInsert" @click="increasd2(item)" class="addRole" v-show="index !== 0 && index !== 1 ">新增</div>-->
            </div>
          </li>
          <li v-show="item.visflag"  @click="systemroleClick(iteminfo.roleid, iteminfo, false)" :key="indexinfo" v-for="(iteminfo, indexinfo) in item.roles" v-bind:class="seletedFlag === iteminfo.roleid ? 'leftBottomLlThree' : 'leftBottomLltwo'">
            {{iteminfo.rolename}}
            <div v-if="JurisdictionInsert && iteminfo.rolestate === 0" v-show="index !== 0 && index !== 1 && iteminfo.rolename" @click="enable(iteminfo)" class="enable" >禁用</div>
            <div v-if="JurisdictionInsert && iteminfo.rolestate !== 0" v-show="index !== 0 && index !== 1 && iteminfo.rolename"  @click="enable(iteminfo)" class="unenable" >启用</div>
         </li>
       </ul>
     </div>
   </section>
   <section class="subjectRight">
     <div class="rightHeader"></div>
     <div class="karakters">
       <div class="jurisdictionBottom">
         <div class="header">
           <!--角色名称-->
            <div class="conserveRoleNameDiv" v-show="this.roleName">
               <span>{{this.roleName}}</span>
            </div>
            <div v-if="JurisdictionUpdate && btnDisabled" class="conserveDiv" @click="conserve">
              保 存
            </div>
            <div @click="amputate" class="amputateDIv" v-show="btnDisabled && JurisdictionDelete">
              删除
            </div>
            <div v-if="JurisdictionInsert" @click="increasd" class="increased" >
              新增角色
            </div>
          </div>
          <div class="definition">
            <div class="definitionHeader">
              <ul class="definitionHeaderul">
                <li class="definitionHeaderli">模块</li>
                <li class="definitionHeaderlitwo">查看</li>
                <li class="definitionHeaderlitwo">新增</li>
                <li class="definitionHeaderlitwo">修改</li>
                <li class="definitionHeaderlitwo">删除</li>
                <li class="definitionHeaderlitwo">审批(确认)</li>
                <li class="definitionHeaderlitwo">分配(授权)</li>
                <li class="definitionHeaderlitwo">检验(归档)</li>
              </ul>
            </div>
            <div class="content">
             <div :key='index' v-for="(item, index) in fullFunctionality" class="contentDiv">
               <div class="contentDivtwo">
                 <ul  class="definitionHeaderul">
                   <li @click.stop="definitionLi(item)" class="definitionHeaderli">
                     <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1929"><path d="M433.230769 708.923077c0-53.169231 17.723077-114.215385 45.292308-161.476923 33.476923-59.076923 70.892308-82.707692 100.430769-126.030769 49.230769-72.861538 59.076923-177.230769 27.569231-256C575.015385 84.676923 500.184615 37.415385 413.538462 39.384615s-157.538462 55.138462-185.107693 135.876923c-31.507692 88.615385-17.723077 194.953846 53.169231 261.907693 29.538462 27.569231 57.107692 70.892308 41.353846 112.246154-13.784615 39.384615-61.046154 57.107692-94.523077 72.861538-76.8 33.476923-169.353846 80.738462-185.107692 171.323077C27.569231 868.430769 78.769231 945.230769 159.507692 945.230769h334.769231c15.753846 0 25.6-19.692308 15.753846-31.507692C460.8 856.615385 433.230769 783.753846 433.230769 708.923077z m315.076923-236.307692c-129.969231 0-236.307692 106.338462-236.307692 236.307692s106.338462 236.307692 236.307692 236.307692 236.307692-106.338462 236.307693-236.307692-106.338462-236.307692-236.307693-236.307692z m41.353846 257.96923c-5.907692 0-13.784615-1.969231-19.692307-3.938461l-90.584616 90.584615c-5.907692 5.907692-13.784615 7.876923-19.692307 7.876923-7.876923 0-13.784615-1.969231-19.692308-7.876923-9.846154-9.846154-9.846154-27.569231 0-39.384615l90.584615-90.584616c-1.969231-5.907692-3.938462-11.815385-3.938461-19.692307-3.938462-41.353846 29.538462-78.769231 70.892308-78.769231 5.907692 0 13.784615 1.969231 19.692307 3.938462 3.938462 0 3.938462 3.938462 1.969231 5.907692l-39.384615 41.353846c-3.938462 1.969231-3.938462 7.876923 0 9.846154l27.56923 27.569231c3.938462 3.938462 7.876923 3.938462 11.815385 0l39.384615-39.384616c1.969231-1.969231 5.907692-1.969231 5.907693 1.969231 1.969231 5.907692 3.938462 13.784615 3.938461 19.692308 0 41.353846-35.446154 74.830769-78.769231 70.892307z" p-id="1930"></path></svg>
                     {{item.first}}
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.examinePart" v-if="item.examineShow" @change="definitionExamine(item, item.examine,0,item.examinePart)" :disabled="checkedFlag" v-model="item.examine"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.insertPart" v-if="item.insertShow" @change="definitionExamine(item, item.insert,1,item.insertPart)" v-model="item.insert"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.modifyPart" v-if="item.modifyShow" @change="definitionExamine(item, item.modify,2,item.modifyPart)" :disabled="checkedFlag" v-model="item.modify"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.deletePart" v-if="item.deleteShow" @change="definitionExamine(item, item.delete,3,item.deletePart)" :disabled="checkedFlag" v-model="item.delete"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.approvalPart" v-if="item.approvalShow" @change="definitionExamine(item, item.approval,4,item.approvalPart)" :disabled="checkedFlag" v-model="item.approval"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.assignPart" v-if="item.assignShow"  @change="definitionExamine(item, item.assign,5,item.assignPart)" :disabled="checkedFlag" v-model="item.assign"></el-checkbox>
                   </li>
                   <li class="definitionHeaderlitwo">
                     <el-checkbox :indeterminate="item.checkPart" v-if="item.checkShow"  @change="definitionExamine(item, item.check,6,item.checkPart)" :disabled="checkedFlag" v-model="item.check"></el-checkbox>
                   </li>
                 </ul>
               </div>
               <ul v-show="item.flag" class="contentDivthree">
                 <li class="contentLi" :key="index" v-for="(data, index) in item.second">
                   <ul class="definitionHeaderul">
                     <li class="definitionHeaderli">
                       {{data.functionname}}
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'examinePart', 'examine', 'second', 'selectBoolean')" v-if="data.select === 1" :disabled="checkedFlag" v-model="data.selectBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'insertPart', 'insert', 'second', 'insertBoolean')" v-if="data.insert === 1" v-model="data.insertBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'modifyPart', 'update', 'second', 'updateBoolean')" v-if="data.update === 1" :disabled="checkedFlag" v-model="data.updateBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'deletePart', 'delete', 'second', 'deleteBoolean')" v-if="data.delete === 1" :disabled="checkedFlag" v-model="data.deleteBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'approvalPart', 'approval', 'second', 'approvalBoolean')" v-if="data.approval === 1" :disabled="checkedFlag" v-model="data.insertBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'assignPart', 'assign', 'second', 'assignBoolean')" v-if="data.assign === 1" :disabled="checkedFlag" v-model="data.assignBoolean"></el-checkbox>
                     </li>
                     <li class="definitionHeaderlitwo">
                       <el-checkbox @change="definitionExamineChild(item, 'checkPart', 'check', 'second', 'checkBoolean')" v-if="data.check === 1" :disabled="checkedFlag" v-model="data.checkBoolean"></el-checkbox>
                     </li>
                   </ul>
                 </li>
               </ul>
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="basis" class="popup">
      <increased v-if="basis" :increaSed="basis" @baSis="Basis"></increased>
    </section>
    <section v-if="basisshow" class="popup">
      <increased2 v-if="basisshow" :increaSed="basisshow" :organizationid="organizationid" @Basis2="Basis2"></increased2>
    </section>
  </div>
</template>

<script>
import { karaktersFindAllRoles, karaktersSetRoleFunctions, karaktersFindAllFunctions, karaktersFindRoleFunctions, DeleteRole, SetRoleDisabledOrEnabled } from '../../api/user'
import increased from '../intercalateChild-operation/karaktersChild-increased'
import increased2 from '../intercalateChild-operation/karaktersChild-increased2'
export default {
  name: 'intercalateChild-karakters',
  components: {
    increased,
    increased2
  },
  data () {
    return {
      customRoles: [],
      basis: false,
      basisshow: false,
      value: '',
      checked: false,
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      structureDate: {
        label: '',
        personnel: ''
      },
      fullFunctionality: '',
      // 点击左侧获取其id值
      kayakersId: '',
      JurisdictionApproval: '',
      JurisdictionUpdate: '',
      roleName: '', // 角色名称
      checkedFlag: false,
      seletedFlag: false,
      // 系统角色是否展开
      ficationBoolean: false,
      btnDisabled: false,
      organizationid: '', // 创建用户角色的机构ID
      JurisdictionInsert: '',
      JurisdictionSelect: ''
    }
  },
  methods: {
    amputate () {
      if (!this.kayakersId) {
        this.$message({
          message: '必须选中左侧的角色,才可以删除',
          type: 'warning'
        })
      } else {
        this.axios.post(DeleteRole(this.kayakersId)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.kayakersId = ''
            let token = JSON.parse(window.sessionStorage.token)
            this.axios.post(karaktersFindAllRoles(token)).then((response) => {
              if (response.data.code === 0) {
                this.customRoles = []
                response.data.data.forEach((val) => {
                  val.visflag = false
                  val.flag = false
                  this.customRoles.push(val)
                })
              }
            })
          } else {
            this.$message.error('删除失败')
          }
        })
      }
    },
    increasd () {
      this.basis = true
    },
    // increasd2 (data) {
    //   this.organizationid = data.organizationid
    //   this.basisshow = true
    // },
    Basis (ev) {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(karaktersFindAllRoles(token)).then((response) => {
        if (response.data.code === 0) {
          this.customRoles = []
          response.data.data.forEach((val) => {
            val.visflag = false
            val.flag = false
            this.customRoles.push(val)
          })
          this.basis = ev
        }
      })
    },
    Basis2 (ev) {
      let token = JSON.parse(window.sessionStorage.token)
      this.axios.post(karaktersFindAllRoles(token)).then((response) => {
        if (response.data.code === 0) {
          this.customRoles = []
          response.data.data.forEach((val) => {
            val.visflag = false
            val.flag = false
            this.customRoles.push(val)
          })
          this.basisshow = ev
        }
      })
    },
    definitionLi (item) {
      item.flag = !item.flag
    },
    definitionExamine (data, flag, number, showflag) { // showflag 标识indeterminate 状态
      console.log(number)
      if (number === 0) {
        if (showflag === true) {
          data.examinePart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.selectBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.selectBoolean = false
          })
        }
      } else if (number === 4) {
        if (showflag === true) {
          data.approvalPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.approvalBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.approvalBoolean = false
          })
        }
      } else if (number === 2) {
        if (flag === true) {
          if (showflag === true) {
            data.modifyPart = false
          }
          data.second.forEach((val) => {
            val.updateBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.updateBoolean = false
          })
        }
      } else if (number === 3) {
        if (showflag === true) {
          data.deletePart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.deleteBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.deleteBoolean = false
          })
        }
      } else if (number === 1) {
        if (showflag === true) {
          data.insertPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.insertBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.insertBoolean = false
          })
        }
      } else if (number === 5) {
        if (showflag === true) {
          data.assignPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.assignBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.assignBoolean = false
          })
        }
      } else if (number === 6) {
        if (showflag === true) {
          data.checkPart = false
        }
        if (flag === true) {
          data.second.forEach((val) => {
            val.checkBoolean = true
          })
        } else {
          data.second.forEach((val) => {
            val.checkBoolean = false
          })
        }
      }
    },
    definitionExamineChild (data, part, parentFlag, currentFlag, childFlag) {
      let flag = true
      let len = 0
      data[currentFlag].forEach(t => {
        flag = flag && t[childFlag]
        if (t[childFlag]) {
          len += 1
        }
      })
      data[part] = len > 0 && len < data[currentFlag].length
      data[parentFlag] = flag
    },
    conserve () {
      if (this.kayakersId !== '') {
        let roleid = this.kayakersId
        let data = []
        this.fullFunctionality.forEach((val) => {
          val.second.forEach((item) => {
            let obj = {}
            //  id
            obj.functionid = item.functionid
            //  增加
            obj.insert = item.insertBoolean
            //  删除
            obj.delete = item.deleteBoolean
            //  查看
            obj.select = item.selectBoolean
            //  修改
            obj.update = item.updateBoolean
            //  审批
            obj.approval = item.approvalBoolean
            //  分配
            obj.assign = item.assignBoolean
            //  检验
            obj.check = item.checkBoolean
            data.push(obj)
          })
        })
        // return
        this.axios.post(karaktersSetRoleFunctions(roleid), data).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '保存失败',
              type: 'warning'
            })
          }
        })
      } else {
      //  没有点击左侧的列表
        this.$message({
          message: '没有选中角色',
          type: 'warning'
        })
      }
    },
    systemroleClick (roleid, data, visFlag) {
      if (data.issystem === 1) {
        this.btnDisabled = false
      } else {
        this.btnDisabled = true
      }
      this.roleName = data.rolename
      this.checkedFlag = visFlag
      data.flag = true
      this.seletedFlag = roleid
      this.customRoles.forEach((val) => {
        if (val.roleid !== data.roleid) {
          val.flag = false
        }
      })
      this.fullFunctionality.forEach((val) => {
        val.approval = false
        val.delete = false
        val.examine = false
        val.insert = false
        val.modify = false
        val.assign = false
        val.check = false

        val.examinePart = false
        val.approvalPart = false
        val.modifyPart = false
        val.deletePart = false
        val.insertPart = false
        val.assignPart = false
        val.checkPart = false
        val.second.forEach((data) => {
          data.approvalBoolean = false
          data.deleteBoolean = false
          data.insertBoolean = false
          data.selectBoolean = false
          data.updateBoolean = false
          data.assignBoolean = false
          data.checkBoolean = false
        })
      })
      this.kayakersId = roleid
      this.axios.post(karaktersFindRoleFunctions(roleid)).then((response) => {
        if (response.data.code === 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            let functionId = response.data.data[i].functionid
            this.fullFunctionality.forEach((val) => {
              val.second.forEach((data) => {
                if (data.functionid === functionId) {
                  //  查看
                  data.selectBoolean = response.data.data[i].select
                  //  新增
                  data.insertBoolean = response.data.data[i].insert
                  //  修改
                  data.updateBoolean = response.data.data[i].update
                  //  删除
                  data.deleteBoolean = response.data.data[i].delete
                  //  审批
                  data.approvalBoolean = response.data.data[i].approval
                  //  分配
                  data.assignBoolean = response.data.data[i].assign
                  //  检验
                  data.checkBoolean = response.data.data[i].check
                }
              })
            })
          }
          this.fullFunctionality.forEach((val) => {
            let examinePart = 0
            let approvalPart = 0
            let modifyPart = 0
            let deletePart = 0
            let insertPart = 0
            let assignPart = 0
            let checkPart = 0
            const len = val.second.length
            val.second.forEach((data) => {
              if (data.selectBoolean) {
                examinePart += 1
              }
              if (data.approvalBoolean) {
                approvalPart += 1
              }
              if (data.updateBoolean) {
                modifyPart += 1
              }
              if (data.deleteBoolean) {
                deletePart += 1
              }
              if (data.insertBoolean) {
                insertPart += 1
              }
              if (data.assignBoolean) {
                assignPart += 1
              }
              if (data.checkBoolean) {
                checkPart += 1
              }
            })
            val.examinePart = examinePart > 0 && examinePart < len
            val.approvalPart = approvalPart > 0 && approvalPart < len
            val.modifyPart = modifyPart > 0 && modifyPart < len
            val.deletePart = deletePart > 0 && deletePart < len
            val.insertPart = insertPart > 0 && insertPart < len
            val.assignPart = assignPart > 0 && assignPart < len
            val.checkPart = checkPart > 0 && checkPart < len

            val.approval = approvalPart === len
            val.delete = deletePart === len
            val.examine = examinePart === len
            val.insert = insertPart === len
            val.modify = modifyPart === len
            val.assign = assignPart === len
            val.check = checkPart === len
          })
        }
      })
    },
    ficationClick (item) {
      item.visflag = !item.visflag
    },
    enable (data) {
      let msg = ''
      const stateVal = data.rolestate
      if (stateVal === 0) {
        msg = '禁用该角色后,此单位下所有用户将无法使用该系统,是否继续？'
      } else {
        msg = '是否启用该角色？'
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(SetRoleDisabledOrEnabled(data.roleid)).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            data.rolestate = stateVal === 0 ? -1 : 0
          } else {
            this.$message.error(response.data.message)
          }
        })
      })
    },
    findAllRoles (token) {
      this.axios.post(karaktersFindAllRoles(token)).then((response) => {
        if (response.data.code === 0) {
          response.data.data.forEach((val) => {
            val.flag = false
            val.visflag = false
            this.customRoles.push(val)
          })
        }
      })
    }
  },
  created () {
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'role') {
        this.JurisdictionInsert = val.insert
        this.JurisdictionUpdate = val.update
        this.JurisdictionDelete = val.delete
        this.JurisdictionSelect = val.select
      }
    })
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(karaktersFindAllFunctions(token)).then((response) => {
      if (response.data.code === 0) {
        let data = response.data.data
        console.log(data)
        data.forEach((val) => {
          let examineShow = 0
          let insertShow = 0
          let modifyShow = 0
          let deleteShow = 0
          let approvalShow = 0
          let assignShow = 0
          let checkShow = 0
          val.second.forEach((val) => {
            //  添加
            val.insertBoolean = false
            //  删除
            val.deleteBoolean = false
            //  修改
            val.updateBoolean = false
            //  查看
            val.selectBoolean = false
            //  审核
            val.approvalBoolean = false
            //  分配
            val.assignBoolean = false
            //  检验
            val.checkBoolean = false
            // 显示状态
            if (val.select === 1) {
              examineShow = 1
            }

            if (val.approval === 1) {
              approvalShow = 1
            }

            if (val.update === 1) {
              modifyShow = 1
            }

            if (val.delete === 1) {
              deleteShow = 1
            }

            if (val.insert === 1) {
              insertShow = 1
            }

            if (val.assign === 1) {
              assignShow = 1
            }

            if (val.check === 1) {
              checkShow = 1
            }
          })
          //  二级开关
          val.flag = false
          //  查看
          val.examine = false
          val.examinePart = false
          val.examineShow = examineShow
          //  审批
          val.approval = false
          val.approvalPart = false
          val.approvalShow = approvalShow
          //  修改
          val.modify = false
          val.modifyPart = false
          val.modifyShow = modifyShow
          //  删除
          val.delete = false
          val.deletePart = false
          val.deleteShow = deleteShow
          //  新增
          val.insert = false
          val.insertPart = false
          val.insertShow = insertShow
          //  分配
          val.assign = false
          val.assignPart = false
          val.assignShow = assignShow
          //  检验
          val.check = false
          val.checkPart = false
          val.checkShow = checkShow
        })
        this.fullFunctionality = data
      }
    })
    this.findAllRoles(token)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
    .subjectLeft
      float left
      width 368px
      position relative
      margin-right 56px
      .leftHeader
        width 100%
        overflow hidden
        position relative
        height 40px
        line-height 40px
        background #354d76
      .subjectImg
        margin 0 4px
        display inline-block
        width 40px
        float left
        height 40px
      .subjectP
        float left
        color $color-text
        line-height 40px
      .leftBottom
        width 100%
        min-height 800px
        max-height 800px
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      overflow hidden
      position relative
      .rightHeader
        init()
        background #354d76
        height 40px
      .karakters
        height calc(100% - 50px)
        overflow hidden
        overflow-y auto
        min-height 800px
        max-height 800px
        position relative
        background #101826
      .jurisdictionBottom
        margin 20px 30px
        overflow hidden
        .header
          init()
          margin-bottom 20px
          .headerP
            float left
            line-height 30px
            margin-right 8px
            color $color-border-b-fault
            font-size $font-size-medium
          .headerDiv
            float left
            overflow hidden
          .increased
            float right
            margin-right 20px
            background $color-background-newly
            text-align center
            padding 0 20px
            height 36px
            line-height 36px
            color $color-text-title
            border-radius 5px
            cursor pointer
            transition .2s
            &:hover
              background #4baabe
        .definition
          init()
          margin-bottom 55px
        .fastener
          init()
          color $color-text
          text-align center
          .conserve
            conserve()
            margin-right 100px
          .closedown
            closedown()
  .popup
    position fixed
    top 0
    left 0
    background rgba(000, 000, 000, .9)
    z-index 11
    width 100%
    height 100%
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
  .contentDivtwo
    color #eee
    line-height 30px
    padding 6px 0
    init()
  .definitionHeader
     width 100%
     position relative
     overflow hidden
     background #354d76
  .contentLi
    line-height 30px
    color $color-text-title
    padding 6px 0
    height 30px
  .contentLeft
    width 40%
    height 30px
    overflow hidden
    float left
  .contentRight
     height 30px
     overflow hidden
     float left
     width 60%
  .definitionHeaderul
    init()
    color #d5d5d5
    line-height 30px
    text-align center
    height 30px
    .definitionHeaderli
      float left
      overflow hidden
      width 40%
      cursor pointer
    .definitionHeaderlitwo
      float left
      overflow hidden
      position relative
      text-align center
      height 31px
      width 8.5%
  .contentDiv
    overflow hidden
  .contentDivthree
    color #eee
    line-height 30px
    background #0b111a
    init()
  .content .contentDiv:nth-child(even){
    background #141d2c
  }
  .leftBottomUl
    font-size 16px
    color #d5d5d5
    margin-top 10px
    .leftBottomLl
       text-indent 1em
       cursor pointer
       overflow hidden
       padding 10px 0
       background #141d2c
  .leftBottomLltwo
    text-indent 2em
    cursor pointer
    overflow hidden
    color #999
    padding 10px 0
  .conserveDiv
    float right
    conserve()
  .conserveRoleNameDiv
    float left
    display inline-block
    min-width 100px
    border-radius 5px
    height 36px
    padding-left 4px
    padding-right 4px
    text-align center
    line-height 36px
    background $color-text-tile-project
    transition .2s
    color $color-text
  .leftBottomLlThree
    text-indent 2em
    cursor pointer
    background rgba(255, 255, 255, .2)
    overflow hidden
    color #fff
    padding 10px 0
  .amputateDIv
    amputateDIv()
    float right
    margin-right 20px
  .addRole
    float: right
    margin-right: 15px
    color: #3acf76
  .enable
    float: right
    margin-right: 15px
    color: #cf0505
  .unenable
    float: right
    margin-right: 15px
    color: #3acf76
</style>

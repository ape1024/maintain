<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../common/img/department.png" alt="">
        <p class="subjectP">设备</p>
        <p @click="subjectptwo" class="subjectptwo">新增</p>
      </header>
      <div class="leftBottom">
        <div class="leftBottomDiv">
            <el-tree
              :data="deviceTree"
              :props="facilitiesProps"
              @node-click="handleNodeClick"
              accordion
              node-key="id"
              highlight-current>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
            </el-tree>
        </div>
      </div>
    </section>
    <section class="subjectRight">
      <div class="information">
        <div v-if="maks" class="subjectRightMask"></div>
        <ul class="informationUl">
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpantwo">
                工作事项:
              </span>
              <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入内容"
                  v-model="matter"
                  clearable>
              </el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <ul class="informationLiDivUU">
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                工作方式:
              </span>
                  <span class="informationLiDivSpan">
                     <el-select size="mini" v-model="patternData" placeholder="请选择">
                    <el-option
                      v-for="item in pattern"
                      :key="item.workmodeid"
                      :label="item.workmodename"
                      :value="item.workmodeid">
                    </el-option>
                  </el-select>
              </span>
                </li>
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                工作周期:
              </span>
                  <span class="informationLiDivSpan">
                     <el-select size="mini" v-model="revolutionData" placeholder="请选择">
                    <el-option
                      v-for="item in revolution"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </span>
                </li>
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                抽签比例:
              </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  max="100"
                  min="0"
                  placeholder=""
                  type="number"
                  v-model="drawCuts">
              </el-input>
              </span>
                  <span>
                    (单位: %)
                  </span>
                </li>
              </ul>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <ul class="informationLiDivUU">
                <li class="informationLiDivUULi">
                  <span class="informationLiDivSpantwo">
                    修订级别:
                  </span>
                  <span class="informationLiDivSpan">
                    <el-select size="mini" v-model="reformulateData" placeholder="请选择">
                    <el-option
                      v-for="item in reformulate"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
              </span>
                </li>
                <li class="">
                  <span class="informationLiDivSpantwo">
                     测量范围:
                  </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  type="number"
                  placeholder="最小值"
                  v-model="MinMeasuring">
              </el-input>
              </span>
                  <span class="informationLiDivSpan">~</span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  type="number"
                  placeholder="最大值"
                  v-model="MaxMeasuring">
              </el-input>
              </span>
                  <span class="informationLiDivSpanFive">
                     测量单位:
                  </span>
                  <span class="informationLiDivSpan">
                <el-input
                  size="mini"
                  placeholder="请输入单位"
                  v-model="company"
                  clearable>
              </el-input>
              </span>
                </li>
              </ul>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                工作方法:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="workingMethods">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                质量要求:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="requirement">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                安全要求:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="safetyRequirements">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                工具适用:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="implement">
</el-input>
              </span>
            </div>
          </li>
          <li class="informationLi">
            <div class="informationLiDiv">
              <span class="informationLiDivSpanFour">
                备注信息:
              </span>
              <span class="informationLiDivSpanThree">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="comments">
</el-input>
              </span>
            </div>
          </li>
        </ul>
        <div class="bottom_header">
          <p class="bottom_headerP">规则信息</p>
          <p class="bottom_headerthread"></p>
        </div>
        <div class="communication">
          <div class="communicationTop">
            <div class="communicationTopLeft">
              <p class="communicationTopLeftP">技术要求:</p>
              <span class="communicationTopLeftSpan">
                <el-input size="mini" v-model="technical " placeholder="请输入内容"></el-input>
              </span>
            </div>
            <div class="communicationTopLeft">
              <p class="communicationTopLeftP">技术说明:</p>
              <span class="communicationTopLeftSpan">
                <el-input size="mini" v-model="technicalNote" placeholder="请输入内容"></el-input>
              </span>
            </div>
          </div>
          <div class="communicationTop">
            <div class="communicationTopLeft">
              <p class="defectP">缺陷等级:</p>
              <span class="defectSpan">
                  <el-select size="mini" v-model="faultinessData" placeholder="请选择">
                    <el-option
                      v-for="item in faultiness"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
              </span>
            </div>
            <div class="communicationTopLeft">
              <!--添加-->
              <div @click="superinduce" class="superinduce">
                添加
              </div>
            </div>
          </div>
        </div>
        <div class="taskrulesList">
          <ul class="taskrulesListUl">
            <li class="taskrulesListLi">
              序号
            </li>
            <li class="taskrulesListLi">
              技术要求
            </li>
            <li class="taskrulesListLi">
              技术说明
            </li>
            <li class="taskrulesListLi">
              缺陷等级
            </li>
            <li class="taskrulesListLi">
              操作
            </li>
          </ul>
          <ul class="taskrulesSummarizing">
            <li :key="index" v-for="(item, index) in tabulation" class="taskrulesSummarizingLi">
              <ul class="taskrulesSummarizingLiUl">
                <li class="taskrulesListLi">
                  {{index + 1}}
                </li>
                <li class="taskrulesListLi">
                  {{item.requirement}}
                </li>
                <li :title="item.requirementdesc" class="taskrulesListLi">{{item.requirementdesc}}</li>
                <li class="taskrulesListLi">{{item.faulttype}}</li>
                <li class="taskrulesListLi">
                  <span @click="elevenClick(item.checkstandardid, index)" class="eleven">删除</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="manipulation">
          <div v-if="!maksConserve" @click="newlyAdded" class="newlyAdded">
            新增保存
          </div>
          <div v-if="maksConserve" @click="conserve" class="conserve">
            保存
          </div>
          <div @click="closedown" class="closedown">
            删除
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { findAllDeviceType, getCheckStandardsByBasedevicecode, getCheckStandard, getStandardparams, getTechnicalRequirements, deleteCheckStandard, creatOrUpdateCheckStandard, getFaultTypes, getRevisionlevel, getAllWorkcycle, getWorkModes } from '../../api/user'
const LEVEL = {
  level1: 1,
  level2: 2
}
export default {
  name: 'intercalateChild-structure',
  data () {
    return {
      maksConserve: true,
      maks: true,
      //  下方列表
      tabulation: [],
      //  设备树
      deviceTree: [],
      deviceTreeData: [],
      //  工作事项
      matter: '',
      //  工作方式
      pattern: [],
      patternData: '',
      //  工作周期
      revolution: [],
      revolutionData: '',
      //  抽签比例
      drawCuts: '',
      //  修订级别
      reformulate: '',
      reformulateData: '',
      //  测量范围
      MaxMeasuring: '',
      MinMeasuring: '',
      //  工作方法
      workingMethods: '',
      //  质量要求
      requirement: '',
      //  安全要求
      safetyRequirements: '',
      //  工具适用
      implement: '',
      //  技术要求
      technical: '',
      //  技术说明
      technicalNote: '',
      //  缺陷等级
      faultiness: '',
      faultinessData: '',
      //  测量单位
      company: '',
      //  备注信息
      comments: '',
      facilitiesProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      //  点击三级渲染到右侧的对象 id code
      transmit: {
        basedevicecode: '',
        checkstandardid: '',
        devicetypeid: ''
      },
      tabulationID: '',
      basedeviceCode: '',
      checkStandardsNode: []
    }
  },
  watch: {
  },
  methods: {
    handleNodeClick (node) {
      switch (node.Identification) {
        case 1:
          this.maks = true
          this.maksConserve = true
          this.basedeviceCode = ''
          this.tabulationID = ''
          this.formatting()
          break
        case 2:
          console.log(node)
          this.maks = false
          this.maksConserve = false
          this.checkStandardsNode = node
          this.tabulation = []
          this.basedeviceCode = node.code
          this.tabulationID = ''
          this.axios.post(getCheckStandardsByBasedevicecode(node.code)).then((response) => {
            if (response.data.code === 0) {
              let responseData = response.data.data
              if (responseData.length) {
                let arr = []
                responseData.forEach((val) => {
                  let obj = {
                    name: val.workitem,
                    code: val.basedevicecode,
                    value: val.checkstandardid
                  }
                  arr.push(obj)
                })
                this.checkStandardsNode.children = arr
              }
            }
          })
          this.formatting()
          break
        default:
          this.basedeviceCode = node.code
          this.maks = false
          this.maksConserve = true
          this.formatting()
          this.axios.post(getCheckStandard(node.value)).then((response) => {
            this.tabulationID = node.value
            if (response.data.code === 0) {
              let data = response.data.data
              this.transmit.basedevicecode = data.basedevicecode
              this.transmit.checkstandardid = data.checkstandardid
              this.transmit.devicetypeid = data.devicetypeid
              //  工作事项
              this.matter = data.workitem
              //  工作方式
              this.patternData = data.workmodeid
              //  备注信息
              this.comments = data.memo
              //  质量要求
              this.requirement = data.qualityrequirement
              //  修订
              this.reformulateData = data.revisionlevel
              //  安全要求
              this.safetyRequirements = data.safetyrequirements
              //  抽选比例
              this.drawCuts = data.selectionratio
              //  工具适用
              this.implement = data.tool
              //  工作周期
              this.revolutionData = data.workcycleid
              //  工作方法
              this.workingMethods = data.workingmethods

              this.axios.post(getStandardparams(node.value)).then((item) => {
                if (item.data.code === 0) {
                  if (!item.data.data.length) {
                    return false
                  } else {
                    //  测量单位
                    this.company = item.data.data[0].unit
                    //  最小值
                    this.MinMeasuring = item.data.data[0].minvalue ? item.data.data[0].minvalue : ''
                    //  最大值
                    this.MaxMeasuring = item.data.data[0].maxvalue ? item.data.data[0].maxvalue : ''
                  }
                }
              })

              this.axios.post(getTechnicalRequirements(node.value)).then((data) => {
                if (data.data.code === 0) {
                  this.tabulation = data.data.data
                }
              })
            }
          })
          break
      }
    },
    resetTree (tree, index) {
      return tree.map(t => {
        const num = index + 1
        return {
          ...t,
          Identification: LEVEL[`level${index}`],
          children: t.children ? this.resetTree(t.children, num) : t.children
        }
      })
    },
    //  初始化,右侧所有数据
    formatting () {
      this.matter = ''
      this.patternData = ''
      this.revolutionData = ''
      this.drawCuts = ''
      this.reformulateData = ''
      this.MinMeasuring = ''
      this.MaxMeasuring = ''
      this.company = ''
      this.workingMethods = ''
      this.requirement = ''
      this.safetyRequirements = ''
      this.implement = ''
      this.comments = ''
      this.technical = ''
      this.technicalNote = ''
      this.faultinessData = ''
      this.tabulation = []
    },
    elevenClick (checkstandardid, index) {
      this.$confirm('将删除该工作准备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tabulation.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    superinduce () {
      if (!this.technical) {
        this.$message({
          message: '请填写技术要求',
          type: 'warning'
        })
        return false
      } else if (!this.technicalNote) {
        this.$message({
          message: '请填写技术说明',
          type: 'warning'
        })
        return false
      } else if (!this.faultinessData) {
        this.$message({
          message: '请填写缺陷等级',
          type: 'warning'
        })
        return false
      } else {
        let obj = {
          requirement: this.technical,
          requirementdesc: this.technicalNote,
          faulttype: this.faultinessData
        }
        this.tabulation.push(obj)
      }
    },
    closedown () {
      this.axios.post(deleteCheckStandard(this.tabulationID)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.formatting()
          this.axios.post(getCheckStandardsByBasedevicecode(this.basedeviceCode)).then((data) => {
            if (data.data.code === 0) {
              let responseData = data.data.data
              if (responseData.length) {
                let arr = []
                responseData.forEach((val) => {
                  let obj = {
                    name: val.workitem,
                    code: val.basedevicecode,
                    value: val.checkstandardid
                  }
                  arr.push(obj)
                })
                this.checkStandardsNode.children = arr
              } else {
                this.checkStandardsNode.children = []
              }
            }
          })
        }
      })
    },
    conserve () {
      let drawCutsData = this.drawCuts ? parseInt(this.drawCuts) : ''
      console.log(drawCutsData)
      if (drawCutsData > 100) {
        this.$message({
          message: '抽签比例不能超过100%',
          type: 'warning'
        })
        return false
      }
      let MinData = this.MinMeasuring
      let MaxData = this.MaxMeasuring
      if (!MinData) {
        MinData = ''
      } else if (!MaxData) {
        MaxData = ''
      } else if (MinData >= MaxData) {
        this.$message({
          message: '最小值不能大于最大值',
          type: 'warning'
        })
        return false
      }
      if (!this.matter) {
        this.$message({
          message: '工作事项不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.patternData) {
        this.$message({
          message: '工作方式不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.revolutionData) {
        this.$message({
          message: '工作周期不能为空',
          type: 'warning'
        })
        return false
      } else if (!drawCutsData) {
        this.$message({
          message: '抽签比例不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.reformulateData) {
        this.$message({
          message: '修订级别不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.workingMethods) {
        this.$message({
          message: '工作方法不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.requirement) {
        this.$message({
          message: '质量要求不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.safetyRequirements) {
        this.$message({
          message: '质量要求不能为空',
          type: 'warning'
        })
        return false
      } else {
        let unit = this.company ? this.company : ''
        let arr = []
        this.tabulation.forEach((val) => {
          let obj = {
            requirement: val.requirement,
            requirementdesc: val.requirementdesc,
            faulttype: val.faulttype
          }
          arr.push(obj)
        })
        let param = {
          checkstandards: {
            basedevicecode: this.basedeviceCode,
            checkstandardid: this.tabulationID,
            memo: this.comments,
            qualityrequirement: this.requirement,
            revisionlevel: this.reformulateData,
            safetyrequirements: this.safetyRequirements,
            selectionratio: drawCutsData,
            tool: this.implement,
            //  工作方式id
            workmodeid: this.patternData,
            //  工作周期id
            workcycleid: this.revolutionData,
            workingmethods: this.workingMethods,
            workitem: this.matter
          },
          technicalrequirements: arr
        }
        this.axios.post(creatOrUpdateCheckStandard(MinData, MaxData, unit), param).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.axios.post(getCheckStandardsByBasedevicecode(this.basedeviceCode)).then((data) => {
              if (data.data.code === 0) {
                let responseData = data.data.data
                if (responseData.length) {
                  let arr = []
                  responseData.forEach((val) => {
                    let obj = {
                      name: val.workitem,
                      code: val.basedevicecode,
                      value: val.checkstandardid
                    }
                    arr.push(obj)
                  })
                  this.checkStandardsNode.children = arr
                }
              }
            })
          }
        })
      }
    },
    newlyAdded () {
      let drawCutsData = this.drawCuts ? parseInt(this.drawCuts) : ''
      console.log(drawCutsData)
      if (drawCutsData > 100) {
        this.$message({
          message: '抽签比例不能超过100%',
          type: 'warning'
        })
        return false
      }
      let MinData = this.MinMeasuring
      let MaxData = this.MaxMeasuring
      if (!MinData) {
        MinData = ''
      } else if (!MaxData) {
        MaxData = ''
      } else if (MinData >= MaxData) {
        this.$message({
          message: '最小值不能大于最大值',
          type: 'warning'
        })
        return false
      }
      if (!this.matter) {
        this.$message({
          message: '工作事项不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.patternData) {
        this.$message({
          message: '工作方式不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.revolutionData) {
        this.$message({
          message: '工作周期不能为空',
          type: 'warning'
        })
        return false
      } else if (!drawCutsData) {
        this.$message({
          message: '抽签比例不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.reformulateData) {
        this.$message({
          message: '修订级别不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.workingMethods) {
        this.$message({
          message: '工作方法不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.requirement) {
        this.$message({
          message: '质量要求不能为空',
          type: 'warning'
        })
        return false
      } else if (!this.safetyRequirements) {
        this.$message({
          message: '质量要求不能为空',
          type: 'warning'
        })
        return false
      } else {
        let unit = this.company ? this.company : ''
        let arr = []
        this.tabulation.forEach((val) => {
          let obj = {
            requirement: val.requirement,
            requirementdesc: val.requirementdesc,
            faulttype: val.faulttype
          }
          arr.push(obj)
        })
        let param = {
          checkstandards: {
            basedevicecode: this.basedeviceCode,
            checkstandardid: -1,
            memo: this.comments,
            qualityrequirement: this.requirement,
            revisionlevel: this.reformulateData,
            safetyrequirements: this.safetyRequirements,
            selectionratio: drawCutsData,
            tool: this.implement,
            //  工作方式id
            workmodeid: this.patternData,
            //  工作周期id
            workcycleid: this.revolutionData,
            workingmethods: this.workingMethods,
            workitem: this.matter
          },
          technicalrequirements: arr
        }
        this.axios.post(creatOrUpdateCheckStandard(MinData, MaxData, unit), param).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.axios.post(getCheckStandardsByBasedevicecode(this.basedeviceCode)).then((data) => {
              if (data.data.code === 0) {
                let responseData = data.data.data
                if (responseData.length) {
                  let arr = []
                  responseData.forEach((val) => {
                    let obj = {
                      name: val.workitem,
                      code: val.basedevicecode,
                      value: val.checkstandardid
                    }
                    arr.push(obj)
                  })
                  this.checkStandardsNode.children = arr
                }
              }
            })
          }
        })
      }
    },
    subjectptwo () {
      if (!this.basedeviceCode) {
        this.$message({
          message: '请选择二级设备,才可以添加',
          type: 'warning'
        })
        return false
      } else {
        this.maks = false
        this.maksConserve = false
        this.tabulation = []
        this.formatting()
      }
    }
  },
  created () {
    this.axios.post(findAllDeviceType()).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.length) {
          const filterArr = response.data.data.filter(t => t.name !== '全部')
          const arr = this.resetTree(filterArr, 1)
          this.deviceTree = arr
        }
      }
    })
    //  获取工作缺陷
    this.axios.post(getFaultTypes()).then((response) => {
      if (response.data.code === 0) {
        response.data.data.forEach((val) => {
          val.name = val.name.toUpperCase()
        })
        this.faultiness = response.data.data
      }
    })
    //  修订级别
    this.axios.post(getRevisionlevel()).then((response) => {
      if (response.data.code === 0) {
        this.reformulate = response.data.data
      }
    })
    //  工作周期
    this.axios.post(getAllWorkcycle()).then((response) => {
      if (response.data.code === 0) {
        this.revolution = response.data.data
      }
    })
    //  获取所有的工作方式
    this.axios.post(getWorkModes()).then((response) => {
      if (response.data.code === 0) {
        this.pattern = response.data.data
      }
    })
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
      margin-right 30px
      /*margin-right 56px*/
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
      .subjectptwo
        float right
        cursor pointer
        color $color-text-tile-complete
        margin-right 20px
      .leftBottom
        width 100%
        min-height 700px
        max-height 700px
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      max-height 740px
      background rgba(000,000,000,.47)
      overflow hidden
      overflow-y auto
      position relative
      .rightHeader
        init()
        background #354d76
        padding 10px 0
      .rightLi
        float left
        width 10%
        overflow hidden
        text-align left
        color $color-header-b-normal
      .rightliTwo
        float left
        width 36%
        height 16px
        margin-right 2%
        word-break keep-all
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        color $color-header-b-normal
      .rightliThree
        width 32%
        overflow hidden
        position relative
        float left
        color $color-header-b-normal
      .rightliFour
        width 8%
        padding-left 2%
        overflow hidden
        position relative
        float left
        color $color-header-b-normal
      .content
        width 100%
        position relative
      .contentLi
        init()
        padding 10px 0
      .contentliUl
        init()
      .jurisdiction
        float left
        cursor pointer
        color $color-background-query
        margin-right 28px
      .member
        float left
        cursor pointer
        color $color-background-newly
        margin-right 28px
      .edit
        float left
        cursor pointer
        color $color-background-introduce
        margin-right 28px
      .copy
        float left
        color #e59a42
        cursor pointer
        margin-right 28px
      .amputate
        float left
        cursor pointer
        color #a63232
    .popup
      position fixed
      top 0
      left 0
      background rgba(000, 000, 000, .4)
      z-index 11
      width 100%
      height 100%
  .el-tree
    background transparent
  .el-button--text
    color $color-border-b-fault
  .information
    overflow-y auto
    position relative
    margin 30px
    .informationUl
      overflow hidden
      border 1px solid #444d5b
      background #0b111a
      position relative
      .informationLi
       padding 20px 0
       overflow hidden
       border-bottom 1px solid #444d5b
       width 100%
       .informationLiDiv
         margin 0 30px
         color #999
         font-size 16px
         overflow hidden
         .informationLiDivSpan
           display inline-block
         .informationLiDivSpantwo
           margin-right 20px
         .informationLiDivSpanThree
           display inline-block
           margin-right 20px
           width 1000px
         .informationLiDivSpanFour
           float left
           line-height 54px
           margin-right 20px
  .bottom_header
    overflow hidden
    color #d5d5d5
    font-size 16px
    margin 20px 0
    position relative
    .bottom_headerP
      float left
      color #444d5b
      margin-right 20px
    .bottom_headerthread
      float right
      width 1280px
      height 1px
      background #444d5b
      margin-top 8px
  .communication
    padding-left 30px
    overflow hidden
    .communicationTop
       width 100%
       overflow hidden
       margin-bottom 20px
      .communicationTopLeft
        float left
        overflow hidden
        width 50%
        .communicationTopLeftP
          color #fff
          line-height 28px
          margin-right 20px
          float left
        .communicationTopLeftSpan
          display inline-block
          overflow hidden
          width 520px
  .informationUl .informationLi:last-child
    border none
  .informationLiDivUU
    position relative
    width 100%
    overflow hidden
    .informationLiDivUULi
      float left
      overflow hidden
      width 30%
  .defectP
    color #fff
    line-height 28px
    margin-right 20px
    float left
  .defectSpan
     float left
  .superinduce
    display inline-block
    width 107px
    float right
    color #fff
    border-radius 5px
    margin-right 78px
    height 36px
    text-align center
    line-height 36px
    background #3292a6
    transition .2s
    cursor pointer
    &:hover
      background #369aaf
  .taskrulesList
    overflow hidden
    position relative
    font-size 16px
    width 100%
  .taskrulesListUl
    width 100%
    background #354d76
    position relative
    overflow hidden
    color #d5d5d5
  .taskrulesListLi
    float left
    height 37px
    text-align center
    line-height 37px
    position relative
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    width 20%
  .taskrulesSummarizing
    overflow hidden
    width 100%
    position relative
    .taskrulesSummarizingLiUl
      width 100%
      color #eee
      overflow hidden
  .taskrulesSummarizing .taskrulesSummarizingLi:nth-child(even)
     background #141d2c
  .taskrulesSummarizing .taskrulesSummarizingLi:nth-child(odd)
     background #1c273a
  .eleven
    cursor pointer
    color #83292b
  .manipulation
    overflow hidden
    text-align center
    color #fff
    margin 50px 0 20px
    position relative
    .newlyAdded
      display inline-block
      width 107px
      margin-right 20px
      color #fff
      border-radius 5px
      height 36px
      text-align center
      line-height 36px
      background #5ea8d7
      transition .2s
      cursor pointer
      &:hover
        background #62b4e8
    .conserve
      margin-right 20px
      conserve()
    .closedown
      closedown()
  .informationLiDivSpanFive
     margin  0 20px
  .leftBottomDiv
     font-size 14px
     color #999!important
     margin 10px 0
  .custom-tree-node
    line-height 22px
  .subjectptwo
    float right
    cursor pointer
    color #3acf76
    margin-right 20px
  .subjectRightMask
    top 0
    left 0
    position absolute
    z-index 111
    width 100%
    height 100%
    background rgba(000,000,000,.6)
</style>

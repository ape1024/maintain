<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域：</p>
          <div class="div_input">
            <el-cascader
              :options="regionDate"
              v-model="regionModel"
              :props="regionProps"
              change-on-select>>
            </el-cascader>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">维修状态：</p>
          <div class="div_input">
            <el-select v-model="maintenanceData" placeholder="">
              <el-option
                v-for="item in maintenance"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="li_input">
          <p class="div_p">审批状态：</p>
          <div class="div_input">
            <el-select v-model="Auditstatus" placeholder="">
              <el-option
                v-for="item in AuditstatusDate"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div @click="query" class="query">
          查 询
        </div>
      </div>
    </section>
    <section class="subject_bottomDIv">
      <ul class="header_ul">
        <li class="repair_li">
          设施名称
        </li>
        <li class="repair_litwo">
         设备位置
        </li>
        <li class="repair_lithree">
          数量
        </li>
        <li class="repair_lithree">
          任务类型
        </li>
        <li class="repair_lifour">
          异常情况
        </li>
        <li class="repair_lithree">
          安排人员
        </li>
        <li class="repair_lithree">
          安排时间
        </li>
        <li class="repair_lithree">
          处理人员
        </li>
        <li class="repair_lithree">
          处理结果
        </li>
        <li class="repair_lithree">
          审核状态
        </li>
        <li class="repair_litwo">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li :key="index" v-for="(item, index) in tabulationData" class="table_li">
          <ul class="inline_ul">
            <li class="repair_li">
              {{item.devicename}}
            </li>
            <li class="repair_litwo">
              {{item.areaname}}{{item.position}}
            </li>
            <li class="repair_lithree">
              {{item.devicecount}}
            </li>
            <li class="repair_lithree">
              {{item.repairtype}}
            </li>
            <li class="repair_lifour">
              {{item.exception}}
            </li>
            <li class="repair_lithree">
              {{item.creatername}}
            </li>
            <li class="repair_lithree">
              {{item.createtime}}
            </li>
            <li class="repair_lithree">
              {{item.repairperson}}{{item.others}}
            </li>
            <li class="repair_lithree">
              {{item.creater}}
            </li>
            <li class="repair_lithree">
              {{approvalStatusfn(item.approvalstate)}}
            </li>
            <li class="repair_lifive">
              <p v-if="JurisdictionInsert" @click.stop="question(item.repairtaskid, item)" class="header_p_eight threelevel_litwo_p">
                审核
              </p>
              <p v-if="JurisdictionSelect" @click.stop="examine(item.repairtaskid)" class="header_p_ten">查看</p>
              <p v-if="JurisdictionInsert" @click.stop="equipment(item.repairtaskid)" class="header_p_twelve">
                重新安排
              </p>
              <!--<p @click.stop="modify" class="header_pe_quipment">-->
                <!--安排-->
              <!--</p>-->
              <p v-if="JurisdictionDelete" class="header_p_eleven" @click.stop="amputate(index, tabulationData,item.repairtaskid)">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section v-if="review_boolean" @click.stop class="review">
      <increase v-if="review_boolean" :msg="review_boolean" @say="onSay"></increase>
    </section>
    <section v-if="examineBoolean" @click.stop class="review">
      <!--审核-->
      <childExamine v-if="examineBoolean" :examine="examineData" :rework="reworkData" :examina="examination"  :approval="approvalStatus" :state="taskState" @mine="Mine" @newly="Newly"></childExamine>
    </section>
    <section v-if="lookoverBoolean" @click.stop class="review">
      <!--查看-->
      <childLookover :examine="examineData" @look="Onlook"></childLookover>
    </section>
    <!--<section v-if="modifyBoolean" @click.stop class="review">-->
      <!--&lt;!&ndash;安排&ndash;&gt;-->
      <!--<childModify v-if="modifyBoolean" :msg="modifyBoolean" @say="Modify"></childModify>-->
    <!--</section>-->
    <section v-if="quipmentBoolean" class="review" @click.stop>
      <!--更换设备-->
      <childquipment v-if="quipmentBoolean" :msg="quipmentData" @quipment="Quipment"></childquipment>
    </section>
  </div>
</template>

<script>
import repairchild from '../repair-child/repair-child'
import increase from '../admin-child/adminChild-review'
import childLookover from '../repair-operation/repair-lookover'
import childModify from '../repair-operation/repair-arrange'
import childExamine from '../repair-operation/repair-examine'
import childquipment from '../repair-operation/repair-rescheduling'
export default {
  name: 'maintain-repair',
  components: {
    repairchild,
    increase,
    childLookover,
    childModify,
    childExamine,
    childquipment
  },
  methods: {
    approvalStatusfn (status) {
      let arr = ''
      this.approvalStatus.forEach((val) => {
        if (val.value === status) {
          arr = val.name
        }
      })
      if (arr === '') {
        return status
      }
      return arr
    },
    query () {
      let regionModel = ''
      let projectid = window.localStorage.pattern
      console.log(this.regionModel)
      console.log(this.maintenanceData)
      console.log(this.Auditstatus)
      if (this.regionModel.length !== 0) {
        regionModel = this.regionModel[this.regionModel.length - 1]
      } else {
        this.$message({
          showClose: true,
          message: '请选择区域!',
          type: 'warning'
        })
      }
      this.axios.post(`http://172.16.6.181:8920/repairtasks/findRepairTasks?projectid=${projectid}&areaid=${regionModel}&repairStates=${this.maintenanceData}&approvalStates=${this.Auditstatus}`).then((response) => {
        if (response.data.code === 0) {
          this.tabulationData = response.data.data
        }
      })
    },
    Newly (ev) {
      console.log('dadadad123')
      console.log(ev)
      this.examineBoolean = false
      this.axios.post(`http://172.16.6.181:8920/repairtasks/findTaskByTaskid?repairtaskid=${ev.repairtaskid}`).then((response) => {
        if (response.data.code === 0) {
          this.quipmentData = response.data.data
          this.quipmentBoolean = true
        }
      })
    },
    selectStyle (item, index, tableData) {
      // 点击一级出现二级
      console.log(event)
      event.cancelBubble = true
      this.tableData.forEach(function (item) {
        if (index !== item.index) {
          item.active = false
        }
      })
      item.active = !item.active
    },
    auditing () {
      // 点击新增 出现 新增组件
      this.review_boolean = true
    },
    preservation (item) {
      // 一级 审核 保存
      item.admin_show = !item.admin_show
      item.auditin = !item.auditin
    },
    cancel (item) {
      // 一级 审核 取消
      item.admin_show = !item.admin_show
      item.auditin = !item.auditin
    },
    onSay (ev) {
      // 子级组件传递 参数 让新增组件 隐藏
      this.review_boolean = ev
    },
    amputate (index, content, repairtaskid) {
      // 删除
      this.$confirm('是否删除此设施?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(`http://172.16.6.181:8920/repairtasks/removeRepairtasks?repairtaskid=${repairtaskid}`).then((response) => {
          console.log(response)
          if (response.data.code === 0) {
            content.splice([index], 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    examine (id) {
      // 点击查看
      this.axios.post(`http://172.16.6.181:8920/repairtasks/findTaskByTaskid?repairtaskid=${id}`).then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.data)
          this.examineData = response.data.data
        }
      })
      this.lookoverBoolean = true
    },
    modify () {
      // 点击修改
      this.modifyBoolean = true
    },
    question (ID, data) {
      // 点击审核
      console.log(data)
      this.axios.post(`http://172.16.6.181:8920/repairtasks/findTaskByTaskid?repairtaskid=${ID}`).then((response) => {
        if (response.data.code === 0) {
          console.log('1')
          this.examineData = response.data.data
          this.axios.post(`http://172.16.6.181:8920/reworks/findReworksByTaskid?repairtaskid=${ID}`).then((response) => {
            if (response.data.code === 0) {
              console.log('2')
              this.reworkData = response.data.data
              this.axios.post(`http://172.16.6.181:8920/repairtasks/getApprovalInfos?repairtaskid=${ID}`).then((response) => {
                if (response.data.code === 0) {
                  console.log(response)
                  console.log('3')
                  // 审批记录  目前 只要第一条,待定
                  this.examination = response.data.data[0]
                  console.log(this.examination)
                  //  获取维修任务状态
                  this.axios.post(`http://172.16.6.181:8920/repairtasks/getRepairStates`).then((response) => {
                    if (response.data.code === 0) {
                      console.log('4')
                      this.taskState = response.data.data
                      this.examineBoolean = true
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    Mine (ev) {
      // 审核 传递的参数
      this.examineBoolean = ev
    },
    Onlook (ev) {
      this.lookoverBoolean = ev
    },
    Modify (ev) {
      this.modifyBoolean = ev
    },
    equipment (ID) {
      this.axios.post(`http://172.16.6.181:8920/repairtasks/findTaskByTaskid?repairtaskid=${ID}`).then((response) => {
        if (response.data.code === 0) {
          this.quipmentData = response.data.data
          this.quipmentBoolean = true
        }
      })
    },
    Quipment (ev) {
      this.quipmentBoolean = ev
    }
  },
  data () {
    return {
      tabulationData: '',
      review_boolean: false,
      // 获取点击的id
      click_id: '',
      regionProps: {
        children: 'areas',
        label: 'areaname',
        value: 'areaid'
      },
      regionDate: [],
      regionModel: [],
      tableData: [],
      AuditstatusDate: [],
      Auditstatus: [],
      examineBoolean: false,
      lookoverBoolean: false,
      modifyBoolean: false,
      quipmentBoolean: false,
      examineData: '',
      reworkData: '',
      examination: '',
      taskState: [],
      approvalStatus: [],
      quipmentData: '',
      maintenance: '',
      maintenanceData: '',
      JurisdictionSelect: '',
      JurisdictionInsert: '',
      JurisdictionDelete: '',
      JurisdictionApproval: ''
    }
  },
  created () {
    //   权限
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'task_gzwx') {
        this.JurisdictionSelect = val.select
        this.JurisdictionInsert = val.insert
        this.JurisdictionDelete = val.delete
        this.JurisdictionApproval = val.approval
      }
    })
    //  获取区域
    this.axios.post('http://172.16.6.181:8920/areas/findAreasTreeByProjectid?projectid=1').then((response) => {
      if (response.data.code === 0) {
        this.regionDate = response.data.data
      }
    })
    //  审核状态
    this.axios.post('http://172.16.6.181:8920/task/getTaskQueryApprovalItems').then((response) => {
      if (response.data.code === 0) {
        this.AuditstatusDate = response.data.data
        console.log('1111')
        console.log(this.AuditstatusDate)
      }
    })
    //  获取列表
    console.log(window.localStorage)
    let projectid = window.localStorage.pattern
    this.axios.post(`http://172.16.6.181:8920/repairtasks/findRepairTasks?projectid=${projectid}`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.tabulationData = response.data.data
        console.log('----')
        console.log(this.tabulationData)
      }
    })
    //  获取维修状态
    this.axios.post(`http://172.16.6.181:8920/repairtasks/getRepairStates`).then((response) => {
      if (response.data.code === 0) {
        this.maintenance = response.data.data
        console.log(response.data.data)
      }
    })
    this.axios.post(`http://172.16.6.181:8920/repairtasks/getRepariTaskApprovalItem`).then((response) => {
      if (response.data.code === 0) {
        this.approvalStatus = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    margin 12px
    overflow hidden
    position relative
    background #141e30
  .subject_top
    margin 38px 15px 20px 15px
    overflow hidden
    background #111a28
    padding 38px 0 58px
    display flex
  .ul_input
    margin-left 30px
    overflow hidden
    float left
    position relative
    display flex
  .li_input
    display flex
    float left
    overflow hidden
    margin-right 20px
    .div_p
      float left
      font-size $color-text-title
      color $color-text-title
      margin-right 10px
      line-height: 40px;
    .div_input
      float left
      width 167px
      margin-top 5px
  .button
    display flex
    float right
    overflow hidden
    position relative
    margin-left 60px
    text-align center
    line-height 36px
    font-size $font-size-medium
    color $color-text-title
    .query
      width 106px
      height 36px
      border-radius 5px
      float left
      margin-right 30px
      background $color-background-query
      cursor pointer
      transition .2s
      &:hover
        background #4b92bf
    .newly
      width 106px
      height 36px
      border-radius 5px
      float right
      background $color-background-newly
      cursor pointer
      transition .2s
      &:hover
        background #4baabe
    .introduce
      width 106px
      height 36px
      border-radius 5px
      float left
      margin-right 30px
      background $color-background-introduce
      cursor pointer
      transition .2s
      &:hover
        background #4275ba
  .table
    width 100%
    overflow hidden
    position relative
    color $color-text-title
    font-size $font-size-medium
    text-align left
  .header_ul
    width 100%
    overflow hidden
    position relative
    color $color-header-b-normal
    font-size $font-size-medium
    padding 4px 0
    line-height 32px
    background #354d76
  .header_li
    float left
    width 22.5%
    .admin_show
      overflow hidden
      font-size $font-size-small
      color $color-text-title
      .admin_selve
        width 106px
        float left
        margin-right 35px
        .admin_select
          width: 100px
          overflow: hidden
          padding: 5px 0
          border-radius: 5px
          padding-left 6px
      .admin_preservation
        float: left
        margin 4px 18px 0 0
        width 72px
        height 24px
        text-align center
        line-height 24px
        border-radius 5px
        cursor pointer
        background $color-background-newly
      .cancel
        float left
        width 72px
        margin-top 4px
        height 24px
        text-align center
        line-height 24px
        border-radius 5px
        cursor pointer
        background $color-background-introduce
  .header_lithree
    float left
    width 9%
    height 32px
    padding-left 1%
  .repair_li
    width 11%
    padding-left 1%
    height 32px
    float left
    text-align left
  .repair_litwo
    width 14%
    height 32px
    float left
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-align center
  .repair_lithree
    width 6%
    height 32px
    float left
    text-align center
  .repair_lifour
    width 16%
    float left
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    height 32px
    text-align center
  .repair_lifive
    width 16%
    float left
    height 32px
    overflow hidden
  .header_p_one
    color $color-text-tile-state
  .header_p_two
    color $color-text-tile-state-two
  .header_p_three
    color $color-text-tile-complete
  .header_p_four
    color $color-text-tile-handle
  .header_p_six
    color $color-text-tile-complete
  .header_p_seven
    color $color-text
  .header_p_eight
    color $color-background-query
  .header_p_nine
    color #333333
  .table_ul
    width 100%
    overflow hidden
    position relative
    color $color-text
    font-size $font-size-medium
  .table_li
    width 100%
    overflow hidden
    position relative
    .inline_ul
      width: 100%;
      overflow: hidden;
      position: relative;
      padding: 4px 0;
      line-height: 32px;
  .table_ul .table_li:nth-child(odd)
    background #1c273a
  .table_ul .table_li:nth-child(even)
    background #141D2C
  .examine
    width 106px
    height 32px
    background $color-background-query
    text-align center
    line-height 32px
    font-size $font-size-medium
    color $color-text-title
    cursor pointer
    transition .2s
  .examine:hover
    background #4b92bf
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(000,000,000,.4)
    z-index 11
    overflow hidden
  .header_p_eight
    float left
    margin-right 20px
    color $color-background-query
  .header_p_ten
    float left
    margin-right 20px
    color $color-background-newly
  .header_p_twelve
    float left
    margin-right 20px
    color $color-background-introduce
  .header_pe_quipment
    float left
    margin-right 20px
    color #32a697
  .header_p_eleven
    float left
    margin-right 20px
    color #83292b
  .subject_bottomDIv
    margin 15px
    position relative
    overflow hidden

</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
    height 30px
</style>

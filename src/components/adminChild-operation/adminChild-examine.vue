<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        设施信息 审查
      </h4>
      <div class="lookover">
        <ul class="lookover_ul">
          <li class="lookover_litwo">
            <p class="lookover_p">设施名称：</p>
            <div class="lookover_div">{{question.devicename}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备编码：</p>
            <div class="lookover_div">{{question.devicecode}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">业主单位：</p>
            <div class="lookover_div">{{Organization}}</div>
          </li>
        </ul>
        <ul class="information">
          <li class="lookover_litwo">
            <p class="lookover_p">生产厂家：</p>
            <div class="lookover_div">{{question.name}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">生产日期：</p>
            <div class="lookover_div">{{fmtDate(question.madedate)}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">技术参数：</p>
            <div class="lookover_div">{{question.parameters}}</div>
          </li>

          <li class="lookover_litwo">
            <p class="lookover_p">规格型号：</p>
            <div class="lookover_div">{{question.devicemodelname}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">有效日期：</p>
            <div class="lookover_div">{{fmtDate(question.effectivedate)}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">创建人员：</p>
            <div class="lookover_div">{{question.creatername}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">设备位置：</p>
            <div class="lookover_div">{{question.position}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备数量：</p>
            <div class="lookover_div">{{question.devicecount}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">编辑人员：</p>
            <div class="lookover_div">{{question.creatername}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">MAC地址：</p>
            <div class="lookover_div">{{question.mac}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设施单位：</p>
            <div class="lookover_div">{{question.unit}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">审核人员：</p>
            <div class="lookover_div">{{question.approvername}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">备注说明：</p>
            <div class="lookover_div">{{question.memo}}</div>
          </li>
          <li class="lookover_lithree">
            <p class="lithree_p">现场照片：</p>
            <div class="lookover_lithree_div">
              <img  @click="selectImg(question.photoArray, index)" class="lookoverImg" :key="index" v-for="(item, index) in question.photoArray" :src="item" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="situation">
        <div class="situation_left">
          <div class="situation_div">
            <p class="lookover_p">审核结论：</p>
            <div class="lookoverDiv">
              <el-radio-group v-model="radio">
                <el-radio :key="index" v-for="(item, index) in conclusion" :label="item.value">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="situation_div">
            <p class="lookover_p">审核意见：</p>
            <div class="lookoverDiv">
              <el-input size="mini" v-model="view" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>
        <!--<div class="situation_right">-->
          <!--<div class="lookoverDiv">-->
            <!--<p class="lookover_p">审核意见：</p>-->
            <!--<p class="lookoverDivP">正常</p>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="fastener">
        <div @click.stop="conserve" class="conserve">
          保存
        </div>
        <div @click.stop="closedown" class="closedown">
          关闭
        </div>
      </div>
      <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
    </section>
  </div>
</template>

<script>
import { fmtDate } from '../../common/js/utils'
import DialogImg from 'base/dialog-img/dialog-img'
import { getProprietorOrganization, getApproveType, PojectdeviceApproval, findAreasTree } from '../../api/user'
export default {
  name: 'adminChild-examine',
  props: ['examine', 'question'],
  data () {
    return {
      // 审核  显示/隐藏
      examineBoolean: true,
      radio: '',
      Organization: '',
      view: '',
      imgList: [],
      conclusion: []
    }
  },
  methods: {
    conserve () {
      const deviceid = this.question.deviceid
      const approvalopinion = this.view
      const approvalstate = this.radio
      console.log(deviceid)
      console.log(approvalopinion)
      console.log(approvalstate)
      console.log(PojectdeviceApproval(deviceid, approvalopinion, approvalstate))
      if (!approvalstate) {
        this.$message({
          message: '请选择审核结论',
          type: 'warning'
        })
        return false
      }
      if (!approvalopinion) {
        this.$message({
          message: '请输入审核意见',
          type: 'warning'
        })
        return false
      }
      this.axios.post(PojectdeviceApproval(deviceid, approvalopinion, approvalstate)).then((response) => {
        if (response.data.code === 0) {
          this.$message({
            message: '审核成功',
            type: 'success'
          })
          this.$emit('modifysay', false)
        }
      })
    },
    closedown () {
      this.$emit('mine', false)
    },
    tiemerIf (timer) {
      if (timer !== undefined && timer !== null) {
        return fmtDate(timer)
      } else {
        return ' '
      }
    },
    selectImg (list, index) {
      this.imgList = list
      setTimeout(() => {
        this.$refs.dialogImg.switchIndex(index)
        this.$refs.dialogImg.open()
      }, 200)
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = '0' + (date.getMonth() + 1)
      let d = '0' + date.getDate()
      return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
    }
  },
  components: {
    DialogImg
  },
  created () {
    let token = JSON.parse(window.sessionStorage.token)
    this.axios.post(findAreasTree(this.question.areaid)).then((response) => {
    })
    this.axios.post(getProprietorOrganization()).then((response) => {
      if (response.data.code === 0) {
        this.Organization = (response.data.data)[0].organizationname
      }
    })
    this.axios.post(getApproveType(token)).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.conclusion = response.data.data
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .newlyadded
    margin 180px 0 0
    width 100%
    overflow hidden
    background #111a28
  .increase
    width 1245px
    margin 0 auto
    overflow hidden
    position relative
    padding-top 45px
    .increase_h4
      font-size $font-size-medium-x
      color $color-text-title
      margin-bottom 14px
    .lookover
      width 1170px
      margin 0 auto
      overflow hidden
      position relative
      .lookover_ul
        overflow hidden
        color $color-border-b-fault
        font-size $font-size-medium
        border-bottom 1px solid #444d5b
        .lookover_litwo
          float left
          overflow hidden
          width 33%
          margin-left 1%
          padding 12px 0
        .lookover_li
          float left
          overflow hidden
          width 33%
        .lookover_p
          float left
          margin-right 6px
          letter-spacing 2px
      .information
        overflow hidden
        color $color-border-b-fault
        font-size $font-size-medium
        border-bottom 1px solid #444d5b
        min-height 300px
        margin-bottom 20px
      .lookover_litwo
        float left
        overflow hidden
        width 33%
        margin-left 1%
        padding 12px 0
      .lookover_li
        float left
        overflow hidden
        width 33%
        padding 12px 0
      .lookover_lithree
        width 99%
        margin-left 1%
        padding 12px 0
        overflow hidden
      .lookover_p
        float left
        margin-right 6px
        letter-spacing 2px
      .lookover_lithree_div
        width 100%
        overflow hidden
        margin-top: 12px;
      .lithree_p
        letter-spacing 2px
    .situation
      overflow hidden
      width: 1170px;
      margin: 0 auto;
      position relative
    .situation_left
      width 50%
      float left
      overflow hidden
      position relative
    .situation_right
      width 30%
      float right
      overflow hidden
      position relative
    .situation_div
       init()
       margin-bottom 20px
    .lookover_p
      float left
      margin-right 6px
      letter-spacing 2px
      color $color-border-b-fault
    .lookoverDiv
      float left
      color $color-text
    .fastener
      init()
      text-align center
      margin 30px 0 20px
      .conserve
        conserve()
        prohibit()
        margin-right 110px
      .closedown
        closedown()
        prohibit()
    .lookover_div
      float left
      color $color-text
    .lookoverDivP
       float left
       color $color-text-tile-complete
  .lookoverImg
    width 50px
    height 50px
    display inline-block
    cursor pointer
    margin-right 20px
</style>

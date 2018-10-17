<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        设施信息 查看
      </h4>
      <div class="lookover">
        <ul class="lookover_ul">
          <li class="lookover_litwo">
            <p class="lookover_p">设施名称：</p>
            <div class="lookover_div">{{information.devicename}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备编码：</p>
            <div class="lookover_div">{{information.devicecode}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">业主单位：</p>
            <div class="lookover_div">{{Organization}}</div>
          </li>
        </ul>
        <ul class="information">
          <li class="lookover_litwo">
            <p class="lookover_p">生产厂家：</p>
            <div :title="information.name">{{information.name}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">创建人员：</p>
            <div>{{information.creatername}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">创建日期：</p>
            <div>{{tiemerIf(this.information.createtime)}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">规格型号：</p>
            <div>{{information.devicemodelname}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">审核人员：</p>
            <div>{{information.approvername}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">审核日期：</p>
            <div>{{tiemerIf(this.information.approvaltime)}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">设备位置：</p>
            <div :title="information.position">{{information.position}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">设备数量：</p>
            <div>{{information.devicecount}}{{information.unit}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">有效日期：</p>
            <div>{{tiemerIf(this.information.effectivedate)}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">MAC编码：</p>
            <div>{{information.mac}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">技术参数：</p>
            <div :title="information.parameters">{{information.parameters}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">生产日期：</p>
            <div>{{tiemerIf(this.information.madedate)}}</div>
          </li>
          <li class="lookover_litwo">
            <p class="lookover_p">备注说明：</p>
            <div :title="information.memo">{{information.memo}}</div>
          </li>
          <li class="lookover_li">
            <p class="lookover_p">审批意见：</p>
            <div :title="information.approvalopinion">{{information.approvalopinion}}</div>
          </li>
          <li class="lookover_lithree">
            <p class="lithree_p">现场照片：</p>
            <div class="lookover_lithree_div">
              <img  @click="selectImg(information.photoArray, index)" class="lookoverImg" :key="index" v-for="(item, index) in information.photoArray" :src="item" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="situation">
        <div class="situation_left">
          <h4 class="situationH4">
            日常巡检情况
          </h4>
          <ul class="situation_ul">
            <li class="situation_li">
              <p class="situation_p">最近巡检时间：</p>
              <div class="situation_div">{{fmtDate(this.inspection.inspectionTime)}}</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">巡 检 人 员：</p>
              <div class="situation_div">{{inspection.inspectionPersonName}}</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">巡检总结：</p>
              <div class="situation_div">{{inspection.inspectionConclusion}}</div>
            </li>
          </ul>
        </div>
        <div class="situation_right">
          <h4 class="situationH4">
            维护保养情况
          </h4>
          <ul class="situation_ul">
            <li class="situation_li">
              <p class="situation_p">最近维保时间：</p>
              <div class="situation_div">{{tiemerIf(this.inspection.maintenanceTime)}}</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">维 保 人 员：</p>
              <div class="situation_div">{{inspection.maintenancePersonName}}</div>
            </li>
            <li class="situation_li">
              <p class="situation_p">维保工作总结：</p>
              <div class="situation_div">{{inspection.maintenanceConclusion}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="fastener">
        <!--<div @click.stop="conserve" class="conserve">-->
          <!--保存-->
        <!--</div>-->
        <div @click.stop="closedown" class="closedown">
          关 闭
        </div>
      </div>
      <dialog-img ref="dialogImg" :list="imgList"></dialog-img>
    </section>
  </div>
</template>

<script>
import DialogImg from 'base/dialog-img/dialog-img'
import { getProprietorOrganization } from '../../api/user'
import { dateTransfer } from '../../common/js/utils'
import { formatDate } from '../../../node_modules/element-ui/packages/date-picker/src/util'
export default {
  name: 'adminChild-lookover',
  props: ['msg', 'inspection', 'information'],
  data () {
    return {
      // 组件 显示/隐藏
      lookoverBoolean: true,
      Organization: '',
      fmtDateOne: '',
      fmtDateTwo: '',
      fmtDateThree: '',
      fmtDateFour: '',
      imgList: []
    }
  },
  components: {
    DialogImg
  },
  methods: {
    // 格式化时间
    fmtDate (obj) {
      return formatDate(obj, 'yyyy/MM/dd HH:mm')
    },
    selectImg (list, index) {
      this.imgList = list
      setTimeout(() => {
        this.$refs.dialogImg.switchIndex(index)
        this.$refs.dialogImg.open()
      }, 200)
    },
    closedown () {
      // 取消
      this.lookoverBoolean = this.msg
      this.lookoverBoolean = !this.lookoverBoolean
      this.$emit('look', this.lookoverBoolean)
    },
    tiemerIf (timer) {
      if (!timer) {
        return ''
      } else {
        return dateTransfer(timer)
      }
    }
  },
  created () {
    this.axios.post(getProprietorOrganization()).then((response) => {
      if (response.data.code === 0) {
        this.Organization = (response.data.data)[0].organizationname
      } else {
        return false
      }
    })
    console.log(this.inspection)
    console.log(this.information)
    console.log(this.msg)
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
        text-overflow ellipsis
        white-space nowrap
      .lookover_li
        float left
        overflow hidden
        width 33%
        padding 12px 0
        text-overflow ellipsis
        white-space nowrap
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
       width 100%
       position relative
      .situation_left
         width 50%
         float left
         overflow hidden
         position relative
      .situation_right
         width 50%
         float right
         overflow hidden
         position relative
      .situationH4
        font-size $font-size-medium-x
        color $color-text-title
        margin-bottom 14px
      .situation_ul
        margin-left 50px
        overflow hidden
        font-size $font-size-medium
        color $color-text-title
        .situation_li
         float left
         overflow hidden
         padding 12px 0
      .situation_p
         width 125px
         float left
         color $color-border-b-fault
         margin-right 6px
      .situation_div
         width 150px
         float left
         overflow hidden
         color $color-text
    .fastener
       width 100%
       overflow hidden
       position relative
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
  .lookoverImg
    width 50px
    height 50px
    display inline-block
    cursor pointer
    margin-right 20px
</style>

<template>
  <div class="newmodification">
    <div class="newmodification">
      <div class="newmodificationTable">
        <!--第一层-->
        <div class="cephalosome">
          <ul class="cephalosomeUl">
            <li class="cephalosomeOne">
              <span><el-checkbox v-model="checked" @change="checkedChang"></el-checkbox></span>
              设施类别
            </li>
            <li class="cephalosomeOne">
              管理编码
            </li>
            <li class="cephalosomeOne">
              进度
            </li>
            <li class="cephalosomeOne">
              设置位置
            </li>
            <li class="cephalosomeOne">
              设备数量
            </li>
            <div class="heavyPlayLiDiv">
              <ul class="heavyPlayLiUl">
                <li class="cephalosomeTwo">工作事项</li>
                <li class="cephalosomeThree">工作人员</li>
                <li class="cephalosomeThree">工作时间</li>
                <li class="cephalosomeThree">工作结论</li>
                <li class="cephalosomeThree">审核状态</li>
                <li class="cephalosomeThree">处理状态</li>
              </ul>
            </div>
            <li class="cephalosomeOne cephalosomelv">操作</li>
          </ul>
        </div>
        <!--list-->
        <div class="list">
          <ul class="listUl">
            <li :key="index" v-for="(item, index) in dailychild" class="listLi">
              <ul class="heavyPlay">
                <li :title="item.devicename" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  <span class="threelevel_lithreeSSpan">
                     <el-checkbox v-if="item.isSelect === 1" @change="checkboxClick(item.choose, item)" v-model="item.choose"></el-checkbox>
                  </span>
                  {{item.devicename}}
                </li>
                <li :title="item.devicecode" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.devicecode}}                </li>
                <li :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  <span title="总数量">{{item.sumcount }}</span> / <span class="heavyPlayLiSpan" title="已完成">{{item.finshedcount }}</span> / <span class="heavyPlayLiSpanThree" title="故障问题">{{item.errcount}}</span>  / <span class="heavyPlayLiSpantwo" title="待审核">{{item.waitapprovalcount }}</span> / <span title="已安排">{{item.assigncount}}</span>
                </li>
                <li :title="item.position" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.position}}
                </li>
                <li :title="item.devicecount" :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne">
                  {{item.devicecount}}                </li>
                <div class="heavyPlayLiDiv">
                  <ul :key="$index" v-for="(data, $index) in item.details" class="heavyPlayLiUl">
                    <li :title="data.workitem" class="heavyPlayLi cephalosomeTwo" >
                      <span class="threelevel_lithreeSSpan">
                        <el-checkbox v-if="!data.disabled" v-model="data.flag" :disabled="data.disabled"></el-checkbox>
                      </span>
                      {{data.workitem}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree">
                      {{data.checkperson}}{{data.others}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree">
                      {{!data.checktime ? '' : fmtDate(data.checktime)}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree" :class="data.conclusion !== 1 ? 'conkoutClass' : 'regularClass'">
                      {{data.conclusionname}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree">
                      {{data.approvalstatename}}
                    </li>
                    <li class="heavyPlayLi cephalosomeThree" :class="!data.isassigned ? 'UnarrangedClass': 'regularClass' ">
                      {{data.isassignedName}}
                    </li>
                  </ul>
                </div>
                <!--操作-->
                <li :style="{height: item.details.length * 40 + 'px', lineHeight: item.details.length * 40 + 'px'}" class="heavyPlayLi cephalosomeOne cephalosomelv">
                  <span @click.stop="particulars(item.deviceid)" class="cephalosomeFiveSpan">详情</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <section v-if="examineBoolean" class="review">
      <childExamine :JurisdictionData="Jurisdiction" :examineName="clicktaskname" @examineMine="examineDistribution" :taskidCode="clickId" :equipmentCode="equipmentID" @mine="mineSwitch" @mineupdate="mineSwitchupdate"></childExamine>
    </section>
    <section v-if="distributionBoolean" class="review">
      <childDistribution :instruction="instructionData" @dist="Dist"  :getrepairDate="getrepair"  :equipment='equipmentID' @distribution="mineSwitchupdate"></childDistribution>
    </section>
  </div>
</template>

<script>
import childExamine from '../dailyChild-operation/dailyChild-examine'
import childDistribution from '../dailyChild-operation/dailyChild-distribution'
import { maintainDailygetRepairTypes } from '../../api/user'
export default {
  name: 'dailyChild-Newmodification',
  props: [ 'dailychild', 'clicktaskname', 'clickId', 'Jurisdiction' ],
  components: {
    childExamine,
    childDistribution
  },
  data () {
    return {
      information: [],
      checked: false,
      parentData: '',
      correspondingData: '',
      examineBoolean: false,
      distributionBoolean: false,
      DistributionData: '',
      equipmentID: ''
    }
  },
  methods: {
    checkedChang (ev) {
      if (ev) {
        this.dailychild.forEach((val, index) => {
          val.choose = true
          val.details.forEach((data) => {
            if (!data.disabled) {
              data.flag = true
            }
          })
        })
      } else {
        this.dailychild.forEach((val, index) => {
          val.choose = false
          val.details.forEach((data) => {
            if (!data.disabled) {
              data.flag = false
            }
          })
        })
      }
    },
    mineSwitchupdate () {
      this.examineBoolean = false
      this.distributionBoolean = false
      this.$emit('examinationApproval', this.clickId)
    },
    mineSwitch () {
      this.examineBoolean = false
    },
    fmtDate (obj) {
      let date = new Date(obj)
      let y = 1900 + date.getYear()
      let m = `0` + (date.getMonth() + 1)
      let d = `0` + date.getDate()
      return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
    },
    particulars (deviceID) {
      this.equipmentID = deviceID
      this.examineBoolean = true
    },
    Mine (ev) {
      this.$emit('requestdata')
      this.examineBoolean = false
    },
    Dist (ev) {
      this.distributionBoolean = ev
    },
    Examine (data) {
      this.DistributionData = data
      this.examineBoolean = false
      this.distributionBoolean = true
    },
    distriBution () {
      this.$emit('requestdata')
      this.distributionBoolean = false
    },
    examineDistribution (ev) {
      this.instructionData = ev
      this.ArrangetheviewBoolean = false
      this.examineBoolean = false
      this.axios.post(maintainDailygetRepairTypes()).then((response) => {
        if (response.data.code === 0) {
          this.getrepair = response.data.data
          this.distributionBoolean = true
        }
      })
    },
    checkboxClick (ev, data) {
      if (ev) {
        data.details.forEach((val) => {
          if (!val.disabled) {
            val.flag = true
          }
        })
      } else {
        data.details.forEach((val) => {
          if (!val.disabled) {
            val.flag = false
          }
        })
      }
    }
  },
  created () {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .newmodification
    width 100%
    position relative
    overflow hidden
    background rgba(000,000,000,.2)
    .newmodificationTable
      overflow hidden
      position relative
      box-sizing border-box
      border 1px solid #3f4856
      margin 12px 10px
  .cephalosome
    overflow hidden
    position relative
    width 100%
  .cephalosomeUl
    overflow hidden
    text-align left
    font-size 16px
    color #999999
    width 100%
    border-bottom 1px solid #3f4856
  .cephalosomeUl li
    float left
    height 40px
    line-height 40px
    box-sizing border-box
    border-right 1px solid #3f4856
  .cephalosomeUl .cephalosomeOne:last-child
     border-right none!important
  .heavyPlay .cephalosomelv:last-child
     border-right none!important
  .cephalosomeOne
    width 8%
    padding-right .5%
    padding-left .5%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeTwo
    width 36%
    padding 0 2%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeThree
    width 12.8%
    text-align center
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeFour
    width 8%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .cephalosomeFive
    width 20%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-indent 1em
  .cephalosomeFive span
     margin-right 20px
  .cephalosomeFive span:last-child
    margin-right 0
  .list
    position relative
    width 100%
    overflow hidden
    .listUl
      overflow hidden
      position relative
      width 100%
     .listLi
       overflow hidden
       position relative
       width 100%
       border-bottom 1px solid #3f4856
  .heavyPlay
    width 100%
    line-height 40px
    overflow hidden
    color #cdcdcd
  .heavyPlay .heavyPlayLi
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    min-height 40px
    float left
    border-right 1px solid #3f4856
    box-sizing border-box
  .listUl li:last-child
    border-bottom none
  .heavyPlayDivUl
    width 100%
    position relative
    overflow hidden
    .heavyPlayDivLi
      width 100%
      height 40px
      box-sizing border-box
      border-bottom 1px solid #3f4856
      line-height 40px
  .heavyPlayLiSpan
    color #3abfcf
  .heavyPlayLiSpantwo
    color #3acf6b
  .heavyPlayLiSpanThree
     color #c7a038
  .heavyPlayLiDiv
    width 50%
    overflow hidden
    position relative
    float left
    .heavyPlayLiUl
      overflow hidden
      position relative
      box-sizing border-box
      border-bottom 1px solid #3f4856
      height 40px
      width 100%
  .heavyPlayLiDiv .heavyPlayLiUl:last-child
    border none
  .cephalosomeFiveSpan
    cursor pointer
    color #3279a6
  .cephalosomeFiveSpanTwo
    color #a63232
    cursor pointer
  .matters_problem
    color #cfb53a
  .martters_normal
    color #3acf76
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-barckground-transparent
    z-index 11
    overflow hidden
  .regularClass
    color #3acf76!important
  .conkoutClass
    color #cfb53a!important
  .UnarrangedClass
     color #ffaa00!important
  .cephalosomelv
    text-indent 0!important
    text-align center
  .threelevel_lithreeSSpan
    display inline-block
    width 14px
</style>

<template>
  <div class="subject">
    <!--<section class="subject_top">-->
      <!--&lt;!&ndash;新 增&ndash;&gt;-->
    <!--</section>-->
    <section class="subject_bottomDIv">
      <ul class="header_ul">
        <li class="repair_li">
          计划名称
        </li>
        <li class="repair_litwo">
          计划类型
        </li>
        <li class="repair_litwo">
          计划编号
        </li>
        <li class="repair_litwo">
          计划状态
        </li>
        <li class="repair_litwo">
          定制时间
        </li>
        <li class="repair_litwo">
          创建人
        </li>
        <li class="repair_lithree">
          计划说明
        </li>
        <li class="repair_lithree">
          操作
        </li>
      </ul>
      <ul class="table_ul">
        <li class="table_li" :key="index" v-for="(item, index) in arrangedData">
          <ul class="inline_ul">
            <li class="repair_li">
              {{item.planname}}
            </li>
            <li class="repair_litwo">
              {{item.plandesc}}
            </li>
            <li class="repair_litwo">
              {{item.plancode}}
            </li>
            <li class="repair_litwo">
              {{item.planstate}}
            </li>
            <li class="repair_litwo">
              {{item.createtime}}
            </li>
            <li class="repair_litwo">
              {{item.creatername}}
            </li>
            <li class="repair_lithree">
              {{item.plandesc}}
            </li>
            <li class="repair_lithree">
              <p @click.stop="question()" class="header_p_eight threelevel_litwo_p">
                审核
              </p>
              <p @click.stop="examine()" class="header_p_ten">查看</p>
              <p @click.stop="equipment()" class="header_p_twelve">
                修改
              </p>
              <p class="header_p_eleven" @click.stop="amputate(index, arrangedData)">删除</p>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section v-if="review_boolean" @click.stop class="review">
      <lookup v-if="review_boolean"></lookup>
    </section>
    <div @click="superinduce" class="superinduce">
      新 增
    </div>
  </div>
</template>

<script>
import lookup from '../arrangedChild-operation/arrangedChild-lookup'
export default {
  name: 'maintain-arranged',
  components: {
    lookup
  },
  methods: {
    superinduce () {
      this.review_boolean = true
    },
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
    amputate ($index, content) {
      // 删除
      content.splice([$index], 1)
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
      maintenanceData: '',
      maintenance: [],
      repairCheckList: [],
      ownerProps: {
        children: 'subOrgnizations',
        label: 'organizationName'
      },
      proprietorCheckList: [],
      maintenanceList: [],
      arrangedData: ''
    }
  },
  created () {
    // let projectid = window.localStorage.pattern
    this.axios.post(`http://172.16.6.181:8920/plan/getAllPlans`).then((response) => {
      console.log(response)
      if (response.data.code === 0) {
        this.arrangedData = response.data.data
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
    position relative
    background #111a28
    padding 30px 0 30px
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
      line-height 40px
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
    width 9%
    padding-left 1%
    height 32px
    float left
    text-align left
  .repair_litwo
    width 10%
    height 32px
    float left
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-align center
  .repair_lithree
    width 20%
    height 32px
    float left
    text-align left
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
  .superinduce
    position absolute
    bottom 50px
    left 50%
    margin-left -53px
    background $color-background-newly
    color $color-text
    text-align center
    line-height 36px
    width 106px
    height 36px
    margin-right 20px
    border-radius 5px
    cursor pointer
    transition .2s
  .superinduce:hover
    background #4baabe
  .personCharge
    width 50%
    float left
    overflow hidden
    position relative
    .personChargeP
      float left
      font-size $font-size-small
      color $color-border-b-fault
      line-height 20px
      margin-right 6px
    .personChargeDiv
      float left
      width 228px
      overflow-y scroll
      height 130px
  .explainBottom
    init()
    margin-top 50px
    overflow hidden
    text-align center
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
    height 30px
</style>

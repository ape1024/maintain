<template>
  <div class="population">
    <div :style="{ background: 'url(static/img/population_left.png) no-repeat' }" class="population_left">
      <h4 class="popu_h4">
        区域视图
      </h4>
      <!--区域1-->
      <section class="popu_top">
        <map-city></map-city>
      </section>
      <!--区域2-->
      <section class="popu_top">
        <map-factory></map-factory>
      </section>
      <!--区域3-->
      <section class="popu_top">
        <map-building></map-building>
      </section>
    </div>
    <div class="population_middle">
      <div class="middle_top">
        <floor-plans></floor-plans>
      </div>
      <div :style="{ background: 'url(static/img/middle_bottom.png) no-repeat' }" class="middle_bottom">
        <h4 class="popu_h4">
          日巡查总览
        </h4>
        <div class="middle_bottom_div">
          <div class="middle_bottom_left">
            <!--日巡查总览-->
            <inspection></inspection>
          </div>
          <div class="middle_bottom_right">
            <!--上报故障-->
            <inspectionRight></inspectionRight>
          </div>
        </div>
      </div>
    </div>
    <div :style="{ background: 'url(static/img/population_right.png) no-repeat'}" class="population_right">
      <section class="right_top">
        <div :key="index" v-for="(item, index) in integrityRate" class="right_title">
          <h4 class="right_h4">
            {{item.name}}
          </h4>
          <div class="progress_bar">
            <div class="progress_left">
              <el-progress :text-inside="true" :stroke-width="22" :percentage="item.value" :color="item.color"></el-progress>
            </div>
            <!--<span :style="{'color':item.color}" class="equipment">{{item.value}}</span>-->
          </div>
        </div>
      </section>
      <section class="right_middle">
          <h4 class="right_h4">
            设备运行情况
          </h4>
          <stacked></stacked>
      </section>
      <section class="right_bottom">
        <h4 class="right_h4">
          维保执行情况
        </h4>
        <div class="right_bottom_div">
          <implement></implement>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import stacked from '../homeChild-stacked/homeChild-stacked'
import implement from '../homeChild-stacked/homeChild-implement'
import MapCity from 'components/map-city/map-city'
import MapFactory from 'components/map-factory/map-factory'
import MapBuilding from 'components/map-building/map-building'
import FloorPlans from 'components/floor-plans/floor-plans'
import inspection from '../homeChild-stacked/homeChild-inspection'
import inspectionRight from '../homeChild-stacked/homeChild-inspectionRight'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { maintainHomeRightTop } from '../../api/user'
import { projectMixin } from 'common/js/mixin'
export default {
  mixins: [projectMixin],
  name: 'maintain-home',
  data () {
    return {
      integrityRate: '',
      pattrenData: ''
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods: {
    init () {
      this.axios.post(maintainHomeRightTop(this.maintainProject)).then((response) => {
        if (response.data.code === 0) {
          let colorData = ['#61a0a8', '#91c7ae', '#d48265']
          response.data.data.forEach((val, index) => {
            val.value = val.value * 100
            val.color = colorData[index]
            // for (let i = 0; i < colorData.length; i++) {
            //   val.color = color[i]
            // }
          })
          this.integrityRate = response.data.data
        }
      })
    },
    ...mapActions([
      'updateMap'
    ]),
    ...mapMutations({
      updateCity: 'UPDATE_MAP_AREA_ID',
      updateFactory: 'UPDATE_FACTORY_AREA_ID',
      updateBuilding: 'UPDATE_BUILDING_AREA_ID',
      updateFloorPlans: 'UPDATE_FLOOR_PLANS_AREA_ID'
    })
  },
  mounted () {
    this.updateMap(this.userData.areaId)
  },
  beforeDestroy () {
    this.updateCity(-1)
    this.updateFactory(-1)
    this.updateBuilding(-1)
    this.updateFloorPlans(-1)
  },
  components: {
    stacked,
    implement,
    MapCity,
    MapFactory,
    MapBuilding,
    FloorPlans,
    inspection,
    inspectionRight
  },
  created () {
    if (window.sessionStorage.length === 0) {
      this.$router.replace('/login')
      return false
    }
    //  设备完好率
    this.axios.post(maintainHomeRightTop(this.maintainProject)).then((response) => {
      if (response.data.code === 0) {
        let colorData = ['#61a0a8', '#91c7ae', '#d48265']
        response.data.data.forEach((val, index) => {
          val.value = val.value * 100
          val.color = colorData[index]
          // for (let i = 0; i < colorData.length; i++) {
          //   val.color = color[i]
          // }
        })
        this.integrityRate = response.data.data
      }
    })
    //
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .population
       width 100%
       overflow hidden
       position relative
       margin-top 12px
       display flex
    .population_left
        float left
        width 430px
        height 858px
        overflow hidden
        margin 0 12px 0 16px
        background-size cover
    .popu_h4
      margin  8px 8px 26px
      font-size $font-size-medium-x
      color $color-text-title

    .popu_top
      margin 0 20px 8px
      overflow hidden
      height 260px
      .popu_header
         width 100%
         overflow hidden
         margin-bottom 5px
         color $color-text
         font-size $color-text-title
         .header_p
             margin-top: 8px;
             float left
             width 330px
             height 0px
             border-bottom 2px dashed rgba(255, 255, 255, 0.2)
         .title
             float right
             font-size $font-size-medium
             color $color-text
      .popu_top_div
         width 100%
         height 266px
         overflow hidden
         position relative
  .population_middle
    float left
    width 1110px
    overflow hidden
    position relative
    .middle_top
      width 100%
      height 531px
      overflow hidden
      .top_section
        width 1072px
        height 566px
        margin 0 auto 0
        overflow hidden
        position relative
    .middle_bottom
      margin-top 7px
      width 100%
      height 319px
      display inline-block
      position relative
  .middle_bottom_div
    width 100%
    overflow hidden
    position relative
    .middle_bottom_left
       width 500px
       float left
       overflow hidden
    .middle_bottom_right
      overflow hidden
      float right
  .population_right
    margin-left 12px
    width 300px
    height 858px
    background-size cover
    margin-right 16px
   .progress_bar
     overflow: hidden;
     margin: 0 2px 16px 12px;
     .progress_left
       width: 224px;
       float left
     .integrityrate
       float right
       line-height 20px
       color #d48265
     .problem
       float right
       line-height 20px
       color #91c7ae
     .equipment
       float right
       line-height 20px
  .right_top
     margin 0 8px
     overflow hidden
     position relative
  .right_middle
    margin 0 8px
    overflow hidden
    position relative
   .right_h4
     margin 8px 0 8px
     font-size 18px
     color #eee
  .right_top
    border-bottom 1px dashed #444d5b
  .right_bottom
    margin 0 8px
    overflow hidden
    position relative
  .right_bottom_div
    font-size $font-size-small-s
    color $color-text
    text-align center
    margin 0 7px
    overflow hidden

</style>
<style lang="stylus" rel="stylesheet/stylus">
  .el-progress__text
     display none!important
  .el-progress-bar__outer
     height 15px!important
     background-color #202f49!important
  .el-progress-bar
     padding-right 0
</style>

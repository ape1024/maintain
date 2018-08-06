<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        问题上报查看
      </h4>
      <div class="lookover">
        <div class="seat">
          <p class="seatP">设施位置：</p>
          <p class="seatPtwo">{{msg.areaname}}{{msg.position}}</p>
        </div>
        <div class="state">
          <div class="stateTop">
            <div class="stateLeft">
              <p class="seatP">上报人员：</p>
              <p class="seatPtwo">{{msg.creatername}}</p>
            </div>
            <div class="stateLeft">
              <p class="seatP">处理状态：</p>
              <p class="seatPtwo">{{disposeExhibition}}</p>
            </div>
            <div class="stateLeft">
              <p class="seatP">确认状态：</p>
              <p class="seatPtwo">{{confirmExhibition}}</p>
            </div>
          </div>
          <div class="stateText">
            <p class="seatP">问题描述：</p>
            <div class="describe">
              <el-input
                type="textarea"
                :rows="6"
                resize="none"
                placeholder=""
                :disabled="true"
                v-model="textarea">
              </el-input>
            </div>
          </div>
          <div class="stateText">
            <p class="seatP">现场照片：</p>
            <img :key="index" @click="selectImg(index)"  v-for="(item, index) in photograph" class="photograph" :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="lookoverBottom">
        <!--<div @click.stop="conserve" class="conserve">审核</div>-->
        <div @click.stop="closedown" class="closedown">关闭</div>
      </div>
    </section>
    <dialog-img ref="dialogImg" :list="photograph"></dialog-img>
  </div>
</template>

<script>
import DialogImg from 'base/dialog-img/dialog-img'
import { maintainReportgetFeedbackstateStates, maintainReportgetConfrimStates } from '../../api/user'
export default {
  name: 'reportChild-lookover',
  props: ['msg'],
  data () {
    return {
      // 显示/隐藏 查看组件
      lookoverBoolean: false,
      textarea: '',
      checked: false,
      //  确认状态
      confirmExhibition: '',
      //  处理状态
      disposeExhibition: '',
      //  照片
      photograph: []
    }
  },
  methods: {
    conserve () {
      this.$emit('look', this.lookoverBoolean)
    },
    closedown () {
      this.$emit('look', this.lookoverBoolean)
    },
    selectImg (index) {
      this.$refs.dialogImg.switchIndex(index)
      this.$refs.dialogImg.open()
    }
  },
  components: {
    DialogImg
  },
  created () {
    this.photograph = this.msg.photos !== '' ? this.msg.photos.split(',') : ''
    console.log('1111')
    console.log(this.msg.photos)
    console.log(this.msg)
    //  确认状态
    let confirm = []
    let confirmName = this.msg.comfirmstate
    this.axios.post(maintainReportgetConfrimStates()).then((response) => {
      confirm = response.data
      confirm.forEach((val) => {
        if (val.value === confirmName) {
          this.confirmExhibition = val.name
          console.log(val)
        }
      })
    })
    //  处理状态
    let dispose = []
    let disposeName = this.msg.feedbackstate
    this.axios.post(maintainReportgetFeedbackstateStates()).then((response) => {
      dispose = response.data
      console.log(dispose)
      dispose.forEach((val) => {
        if (val.value === disposeName) {
          this.disposeExhibition = val.name
        }
      })
    })
    this.textarea = this.msg.feedbackinfo
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
      .seat
        init()
        margin-bottom 14px
        font-size $font-size-medium
      .seatP
        float left
        margin-right 6px
        color $color-border-b-fault
      .seatPtwo
        float left
        color $color-text
      .state
         init()
         min-height 300px
         margin-bottom 30px
         padding 15px 0
         border-top 1px solid #444d5b
         border-bottom 1px solid #444d5b
         .stateTop
           init()
           margin-bottom 22px
           .stateLeft
             float left
             width 30%
             position relative
             overflow hidden
         .stateText
            init()
            margin-bottom 22px
            .describe
              float left
              width 1075px
              color $color-text
           .photograph
             display inline-block
             margin-right 20px
             width 40px
             height 40px
    .lookoverBottom
      init()
      margin-bottom 20px
      text-align center
      .conserve
        examine()
        margin-right 100px
      .closedown
        closedown()
    .generate
       init()
       width 1170px
       margin 20px auto 40px
</style>

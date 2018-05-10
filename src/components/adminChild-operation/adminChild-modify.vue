<template>
  <div class="newlyadded">
    <section class="increase">
      <h4 class="increase_h4">
        修改设备信息
      </h4>
      <div class="top_header">
        <p class="header_p">新录入信息将替换原对应的内容</p>
        <p class="thread"></p>
      </div>
      <section class="modify">
        <ul class="modify_ul">
          <li class="modify_li">
            <div class="modify_liDiv">
              <p class="modify_li_p">设施类别：</p>
              <div class="modify_li_div">
                <el-select v-model="category.value" placeholder="">
                  <el-option
                    v-for="item in category.child"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">生产厂家：</p>
              <div class="modify_li_div">
                <el-select v-model="manufactor.value" placeholder="">
                  <el-option
                    v-for="item in manufactor.child"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">规格型号：</p>
              <div class="modify_li_div">
                <el-select v-model="version.value" placeholder="">
                  <el-option
                    v-for="item in version.child"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">设施位置：</p>
              <div class="modify_li_div">
                <el-select v-model=" location.value" placeholder="">
                  <el-option
                    v-for="item in  location.child"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">报警回路：</p>
              <div class="modify_li_div">
                <el-select v-model="circuit.value" placeholder="">
                  <el-option
                    v-for="item in circuit.child"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </div>
          </li>
          <li class="modify_li">
            <div class="modify_liDiv">
              <p class="modify_li_p">生产日期：</p>
              <div class="modify_li_divtwo">
                <el-date-picker
                  v-model="productionValue1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">
                技术参数：
              </p>
              <div class="modify_li_div">
                <el-input
                  type="textarea"
                  :rows="2"
                  resize="none"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">
                备注说明：
              </p>
              <div class="modify_li_div">
                <el-input
                  type="textarea"
                  :rows="2"
                  resize="none"
                  placeholder=""
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </li>
          <li class="modify_right">
            <p class="modify_li_p">
              有效日期：
            </p>
            <div class="modify_li_divtwo">
              <el-date-picker
                v-model="validity"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </li>
        </ul>
      </section>
      <div class="modify_bottom">
        <div @click.stop="conserve" class="conserve">
          保存
        </div>
        <div @click.stop="closedown" class="closedown">
          关闭
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'adminChild-modify',
  props: ['msg'],
  data () {
    return {
      // 显示/隐藏
      modifyBoolean: true,
      // 类别
      category: {
        child: [{
          value: '1',
          label: '111'
        }, {
          value: '2',
          label: '222'
        }, {
          value: '3',
          label: '333'
        }, {
          value: '4',
          label: '444'
        }, {
          value: '5',
          label: '555'
        }],
        value: ''
      },
      // 厂家
      manufactor: {
        child: [{
          value: '1',
          label: '777'
        }, {
          value: '2',
          label: '222'
        }, {
          value: '3',
          label: '888'
        }, {
          value: '4',
          label: '999'
        }, {
          value: '5',
          label: '111'
        }],
        value: ''
      },
      // 型号
      version: {
        child: [{
          value: '1',
          label: 'NO.1'
        }, {
          value: '2',
          label: 'NO.2'
        }, {
          value: '3',
          label: 'NO.3'
        }, {
          value: '4',
          label: 'NO.4'
        }, {
          value: '5',
          label: 'NO.5'
        }],
        value: ''
      },
      // 位置
      location: {
        child: [{
          value: '1',
          label: '丰台'
        }, {
          value: '2',
          label: '海淀'
        }, {
          value: '3',
          label: '昌平'
        }, {
          value: '4',
          label: '朝阳'
        }, {
          value: '5',
          label: '大兴'
        }],
        value: ''
      },
      // 回路
      circuit: {
        child: [{
          value: '1',
          label: '啦啦啦'
        }, {
          value: '2',
          label: '嘤嘤嘤'
        }, {
          value: '3',
          label: '哈哈哈'
        }, {
          value: '4',
          label: '呵呵呵'
        }, {
          value: '5',
          label: '啊啊啊'
        }],
        value: ''
      },
      // 生产日期
      productionValue1: '',
      // 有效期
      validity: '',
      // 技术参数
      textarea: '',
      // 备注说明
      explain: ''
    }
  },
  methods: {
    conserve () {
      this.modifyBoolean = this.msg
      this.modifyBoolean = !this.modifyBoolean
      this.$emit('say', this.modifyBoolean)
    },
    closedown () {
      this.modifyBoolean = this.msg
      this.modifyBoolean = !this.modifyBoolean
      this.$emit('say', this.modifyBoolean)
    }
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
    .top_header
      overflow hidden
      font-size $font-size-medium
      color $color-header-b-normal
    .thread
      float:right
      width 960px
      height 1px
      background #444d5b
      margin-top 8px
    .header_p
      float left
      color #444d5b
      padding-left 40px
  .modify
    init()
    margin-bottom 170px
    .modify_ul
      init()
      margin-top 25px
      .modify_li
        float left
        margin 0 0 0 60px
        color $color-header-b-normal
        font-size $font-size-medium
      .modify_liDiv
        init()
        margin-bottom 17px
      .modify_li_p
        float left
        margin-right 6px
        line-height 30px
      .modify_li_div
        float left
        width 267px
      .modify_li_divtwo
        float left
        width 267px
        line-height 40px
        margin-top -6px
      .modify_right
        float right
        color $color-header-b-normal
        font-size $font-size-medium
  .modify_bottom
    init()
    text-align center
    margin-bottom 20px
    .conserve
      conserve()
      margin-right 110px
    .closedown
      closedown()
</style>

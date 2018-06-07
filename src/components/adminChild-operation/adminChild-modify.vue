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
                  <el-cascader
                    v-model="categoryDate"
                    :options="category"
                    :props="equipmentProps"
                    change-on-select
                  ></el-cascader>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">生产厂家：</p>
              <div class="modify_li_div">
                <el-select @focus="focus" @change="manufacturerChange" v-model="manufactorModel" placeholder="">
                  <el-option
                    v-for="item in manufactor"
                    :key="item.manufacturerid"
                    :label="item.name"
                    :value="item.manufacturerid">
                  </el-option>
                </el-select>
              </div>
              <div class="modify_lidivRight">
                <el-input v-show="customManufacturer" v-model="customManufacturerDate" placeholder="请输入厂家"></el-input>
              </div>
            </div>
            <div class="modify_liDiv">
              <p class="modify_li_p">规格型号：</p>
              <div class="modify_li_div">
                <el-select @change="versionChang" v-model="versionValue" placeholder="">
                  <el-option
                    v-for="item in version"
                    :key="item.divecemodelid"
                    :label="item.divecemodelname"
                    :value="item.divecemodelid">
                  </el-option>
                </el-select>
              </div>
              <div class="modify_lidivRight">
                <el-input v-show="versionManufacturer" v-model="customManufacturerDate" placeholder="请输入规格型号"></el-input>
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
              <p class="modify_li_p">具体位置：</p>
              <div class="modify_li_div">
                <el-input v-model="customManufacturerDate" placeholder="请输入规格型号"></el-input>
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
  props: ['msg', 'modify'],
  data () {
    return {
      // 显示/隐藏
      modifyBoolean: true,
      // 类别
      category: [],
      categoryDate: [],
      equipmentProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      // 厂家
      manufactorModel: '',
      manufactor: [],
      // 型号
      version: [],
      versionValue: '',
      versionManufacturer: false,
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
      // 生产日期
      productionValue1: '',
      // 有效期
      validity: '',
      // 技术参数
      textarea: '',
      // 备注说明
      explain: '',
      //  自定义厂家
      customManufacturer: false,
      customManufacturerDate: ''

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
    },
    focus (event) {
      let region = this.categoryDate
      if (region.length === 0) {
        this.$message({
          message: '设备类型！',
          type: 'warning'
        })
        return false
      } else {
        region = region[region.length - 1]
        this.axios.post(`http://172.16.6.16:8920/dev/findManufactures?baseDeviceId=${region}`).then((response) => {
          if (response.data.code === 0) {
            this.manufactor = response.data.data
            this.manufactor.push({
              name: '自定义',
              manufacturerid: '-9999'
            })
          }
        })
      }
    },
    manufacturerChange () {
      if (this.manufactorModel === '-9999') {
        this.versionValue = '自定义'
        this.version = []
        this.customManufacturer = true
        this.versionManufacturer = true
        return false
      } else {
        this.versionValue = ''
        this.customManufacturer = false
        this.versionManufacturer = false
        let region = this.categoryDate
        region = region[region.length - 1]
        this.axios.post(`http://172.16.6.16:8920/dev/findDivecemodels?baseDeviceId=${region}&manufacturerId=${this.manufactorModel}`).then((response) => {
          if (response.data.code === 0) {
            this.version = response.data.data
            console.log(response.data.data)
            this.version.push({
              divecemodelname: '自定义',
              divecemodelid: '-9999'
            })
          }
        })
      }
    },
    versionChang () {
      if (this.versionValue === '-9999') {
        this.versionManufacturer = true
        return false
      } else {
        this.versionManufacturer = false
        return false
      }
    }
  },
  created () {
    // console.log(this.modify)
    this.axios.post('http://172.16.6.16:8920/dev/findAllDeviceType').then((response) => {
      if (response.data.code === 0) {
        this.category = response.data.data
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
        margin 0 0 0 20px
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
        width 217px
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
  .modify_lidivRight
     width 202px
     margin-left 20px
     float left
</style>

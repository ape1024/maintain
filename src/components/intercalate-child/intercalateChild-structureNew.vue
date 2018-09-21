<template>
  <div class="subject">
    <section class="subjectLeft">
      <header class="leftHeader">
        <img class="subjectImg" src="../../common/img/department.png" alt="">
        <p class="subjectP">组织机构</p>
        <p v-if="JurisdictionInsert" class="subjectptwo">新增</p>
      </header>
      <div class="leftBottom">
        <div class="leftBottomDiv">
          <el-tree node-click="changClick"
                   :data="data"
                   :props="defaultProps"
                   highlight-current
                   @node-click="handleNodeClick">
          </el-tree>
        </div>
      </div>
    </section>
    <section class="subjectRight">
      <proprietor-unit :info="proprietorInfo"></proprietor-unit>
    </section>
    <section class="subjectRight" v-show="false">
      <vascular-unit :info="vascularInfo"></vascular-unit>
    </section>
  </div>
</template>

<script>
import VascularUnit from '../structure-child/vascular-unit'
import ProprietorUnit from '../structure-child/proprietor-unit'
import {managementhandleNodeClickOne, managementhandleNodeClickTwo, getAllHigherOrgIDs, getOrganizationTrees} from '../../api/user'
export default {
  name: 'intercalateChild-structureNew',
  components: {
    VascularUnit,
    ProprietorUnit
  },
  data () {
    return {
      proprietorInfo: {
        name: '65+',
        type: 123
      },
      vascularInfo: {
      },
      data: [],
      defaultProps: {
        children: 'subOrgnizations',
        label: 'organizationName',
        value: 'organizationId'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      // 保存业主单位 维保单位的组织累心
      this.ownerType = data.organizationType
      this.organizationdata = data
      this.amputateStr = false
      this.DataorganizationId = data.organizationId
      if (data.root) {
        this.dataRoot = false
        this.identificationVariable = data.organizationType
        this.dataRootInput = data.parentName
      } else {
        this.dataRoot = true
        this.dataRootInput = ''
      }
      this.axios.post(getAllHigherOrgIDs(data.organizationId)).then((response) => {
        this.companyDate = []
        if (response.data.code === 0) {
          if (response.data.data.length <= 1) {
            this.companyDate = []
          } else {
            let data = response.data.data
            data.pop()
            this.companyDate = data
          }
        }
      })
      // 判断组织类别
      if (data.organizationType === 5 || data.organizationType === 4) {
        this.regimentation = this.initRegimentation.filter(t => t.value !== 3)
      } else {
        this.regimentation = [...this.initRegimentation]
      }
      this.conserveBoolean = true
      const organization = data.organizationId
      this.organizationId = organization
      const url = managementhandleNodeClickOne(organization)
      const urltwo = managementhandleNodeClickTwo(organization)
      this.axios.post(urltwo).then((response) => {
        let urlDate = response.data.data
        if (!urlDate) {
          this.address = ''
          this.textarea = ''
          this.identifier = ''
          this.CellPhone = ''
          this.businessOptions = []
          this.categoryfireFightingData = ''
          this.superVisionData = ''
          return false
        }
        //  专业类别
        // let categoryId = urlDate.professionalcategory
        this.businessOptions = []
        if (!urlDate.professionalcategory) {
          this.businessOptions = []
        } else {
          this.businessOptions.push(urlDate.professionalcategory)
        }
        this.linkman = urlDate.linkman
        //  上级主管单位
        this.selectedOptions = []
        this.selectedOptions.push(urlDate.level)
        //  所在地址
        this.address = urlDate.address
        //  备注信息
        this.textarea = !urlDate.memo ? '' : urlDate.memo
        //  资格编号
        this.identifier = !urlDate.qualificationnumber ? '' : urlDate.qualificationnumber
        //  电话
        this.CellPhone = !urlDate.tel ? '' : urlDate.tel
        //  业务类别
        this.businessOptions.push(urlDate.professionalcategory)
        //  资质等级
        this.grading = urlDate.scope
        //  业务类别
        this.businessCategoryData = urlDate.industrycategoryid === null ? '' : urlDate.industrycategoryid
        //  消防单位类别
        this.categoryfireFightingData = urlDate.firecontrolcategoryid === null ? '' : urlDate.firecontrolcategoryid
        //  消防监管机构
        this.superVisionData = urlDate.firebrigadeid === null ? '' : urlDate.firebrigadeid
      })
      this.axios.post(url).then((response) => {
        let urlData = JSON.parse(response.data.data)
        //  联系人
        //  图标
        this.imageUrl = urlData.icon.indexOf('null') === -1 ? urlData.icon : ''
        this.imageUrlTwo = ''
        //  所在区域
        this.regionDate = urlData.pcc
        //  单位简称
        this.organizationshortname = urlData.organizationshortname === 'undefined' ? '' : urlData.organizationshortname
        //  单位编码
        this.encrypt = urlData.organizationcode
        //  组织机构名称
        this.organizationname = urlData.organizationname === 'undefined' ? '' : urlData.organizationname
        //  组织类型
        if (data.organizationType === 1 || data.organizationType === 2) {
          this.regimentaValue = ''
        } else {
          this.regimentaValue = urlData.organizationtype
        }
        // 判断是否是根节点单位
        //  省份
        this.provinceId = urlData.provinceid
        //  省下的市
        this.conurbationId = urlData.cityid
        //  县城
        this.countytownId = urlData.countyid
        //  父级id
        this.parentid = urlData.parentid
      })
    }
  },
  created () {
    // 初始化组织类别
    this.initRegimentation = []
    let Jurisdiction = JSON.parse(window.sessionStorage.Jurisdiction)
    Jurisdiction.forEach((val) => {
      if (val.functioncode === 'organization') {
        this.JurisdictionInsert = val.insert
        this.JurisdictionUpdate = val.update
        this.JurisdictionDelete = val.delete
      }
    })
    let token = JSON.parse(window.sessionStorage.token)
    //  左边的树状结构
    this.axios.post(getOrganizationTrees(token)).then((response) => {
      if (response.data.code === 0) {
        this.data = response.data.data
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
        min-height 800px
        max-height 800px
        position relative
        background #101826
        height calc(100% - 50px)
        overflow-y auto
        overflow-x hidden
    .subjectRight
      height 840px
      background rgba(000,000,000,.47)
      overflow hidden
      position relative
      padding-right 59px
      padding-left 50px
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
      .content .contentLi:nth-child(odd)
        background #1c273a!important
      .content .contentLi:nth-child(even)
        background #141d2c
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
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
  .information
    width 900px
    overflow hidden
    margin 30px auto
    .informationUl
      init()
      .informationLi
        overflow hidden
        position relative
      .informationLitwo
        overflow hidden
        width 100%
        position relative
      .informationDiv
        position relative
        float left
        margin-bottom 36px
      .informationDivtwo
        overflow hidden
        position relative
        float right
        margin-bottom 36px
      .informationP
        color $color-border-b-fault
        font-size $font-size-medium
        line-height 30px
        margin-right 10px
        width 120px
        text-align right
        float left
      .content
        float left
        width 267px
        position relative
      .contenttwo
        float left
        width 770px
        height 100px
        overflow hidden
      .contentthree
        float left
        width 770px
        overflow hidden
    .informationDivthree
      overflow hidden
      position relative
      margin-bottom 10px
    .informationLithree
      overflow hidden
      position relative
    .informationLifour
      overflow hidden
      text-align center
      margin-top 10px
      position relative
    .conserve
      conserve()
  .informationLifive
    position relative
  .region
    width 100%
    cursor pointer
    height  30px
    line-height 30px
    border-radius 5px
    background #fff
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-indent 2em
  .region_ul
    position absolute
    top 30px
    left 0
    width  100%
    min-height 300px
    overflow-y scroll
    z-index 111
    max-height 300px
    background #fff
    border-radius  5px
    .region_li
      cursor pointer
      width 100%
      color #000
      padding 10px 0
      .region_i
        cursor pointer
        margin 0 10px
      .region_itwo
        cursor pointer
        margin 0 10px
      .regionliUl
        display none
        overflow hidden
        .regionliul_li
          padding 10px 0
          text-indent 1em
          .countUl
            display none
            overflow hidden
            .countLi
              padding 10px 0
              text-indent 5em
  .companyContent
    false left
    overflow hidden
    width 770px
  .leftBottomDiv
    init()
    line-height 28px
    margin-top 10px
  .avatar
    width 100px
    height 100px
    display block
  .amputateDIv
    amputateDIv()
    margin-left 20px
  .subjectRightDiv
    position absolute
    left 0
    top 0
    z-index 1111
    background rgba(000, 000, 000, .6)
    height 100%
    width 100%
</style>

<template>
  <div class="area-nav area-nav-tree-change">
    <div class="switch-content">
      <img src="./map.png" alt="地图" v-show="switchState" @click="switchContent('map')">
      <img src="./table.png" alt="表格" v-show="!switchState" @click="switchContent('table')">
    </div>
    <div class="title">{{title}}</div>
    <div class="subtitle">
      <div class="text">{{subtitle}}</div>
      <div class="icon"></div>
    </div>
    <div class="search" v-show="searchState">
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @toggle="toggle" @blur="blur" @query="query" @confirm="confirm"></search-box>
      </div>
      <div class="search-list-wrapper" v-show="searchListState">
        <search-list ref="searchList" :list="searchList" @select="select" :selected="selected"></search-list>
      </div>
    </div>
    <div class="tree-wrapper">
      <el-tree class="tree" accordion :data="treeList" :props="defaultProps" node-key="id" @node-click="handleNodeClick">
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <div>{{ node.label }}</div>
          <div class="state" v-show="(data.childAlarm && !node.expanded) || data.alarmState"></div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import { findAreasTree } from 'api/tree'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { SearchData } from 'common/js/area'
const SEARCH_LEN = 18

export default {
  created () {
    this.title = '区域导航'
    this.subtitle = '玉溪卷烟厂总图'
    this.firstLoad = true
  },
  data () {
    return {
      switchState: false,
      searchState: false,
      searchList: [],
      selected: -1,
      searchListState: false,
      treeList: [],
      defaultProps: {
        children: 'areas',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters([
      'treeStructure',
      'clientId'
    ])
  },
  mounted () {
    this.getTree(this.clientId)
  },
  methods: {
    switchContent (r) {
      if (!this.treeStructure.length) return
      this.switchState = !this.switchState
      this.$router.push({
        path: `/home/maintain-home-new/${r}`
      })
      // 保存当前区域id
      this.saveCurrentAreaId(-1)
      // 更新地图
      this.$nextTick(() => {
        this.updateMap({treeData: new SearchData(this.treeStructure[0])})
      })
    },
    getTree (clientId) {
      findAreasTree(clientId).then((data) => {
        // 获取数据失败
        if (!data || !data.length) return
        // 获取数据成功
        // 显示搜索框
        this.searchState = true
        // 保存树结构
        this.updateTreeStructure(data)
        // 默认加载地图
        this.firstLoad && this.updateMap({treeData: new SearchData(data[0])})
        this.firstLoad = false
      })
    },
    handleNodeClick (data) {
      // 保存当前区域id
      this.saveCurrentAreaId(data.areaId)
      // 选择加载地图
      const treeData = this.resetMapData(this.treeStructure, data)[0]
      this.updateMap({treeData})
    },
    query (query) {
      if (!query || this.currentQuery === query) {
        this.searchListState = false
        return
      }
      const arr = this.currentList.filter((item) => {
        return item.name.indexOf(query) !== -1
      })
      const len = arr.length > SEARCH_LEN ? SEARCH_LEN : arr.length
      this.searchList = arr.slice(0, len)
      this.searchListState = true
      this.selected = -1
    },
    toggle (num) {
      const len = this.searchList.length
      this.selected = this.selected + num
      if (this.selected < 0) {
        this.selected = len - 1
      } else if (this.selected === len) {
        this.selected = 0
      }
    },
    confirm () {
      this.setQuery(this.searchList[this.selected])
    },
    select (data) {
      this.setQuery(data)
    },
    setQuery (query) {
      // 选择加载地图
      const treeData = this.resetMapData(this.treeStructure, query)[0]
      this.updateMap({treeData})
      this.currentQuery = query.name
      this.$refs.searchBox.setQuery(query.name)
      this.$refs.searchBox.setBlur()
    },
    blur () {
      setTimeout(() => {
        this.searchListState = false
        this.selected = -1
      }, 200)
    },
    resetMapData (data, query) {
      let arr = []
      data.forEach((item) => {
        if (item.areaid === query.areaId) {
          arr.push(new SearchData(item))
          return arr
        }
        const areas = this.resetMapData(item.areas ? item.areas : [], query)
        if (areas.length) {
          arr.push({
            ...new SearchData(item),
            childTree: areas.length ? areas[0] : []
          })
          return arr
        }
      })
      return arr
    },
    resetTree (data) {
      let arr = []
      data && data.forEach((item) => {
        const areas = this.resetTree(item.areas)
        let childAlarm = false
        areas.forEach((d) => {
          childAlarm = childAlarm || d.childAlarm || d.alarmState
        })
        arr.push({
          ...new SearchData(item),
          areas,
          childAlarm
        })
      })
      return arr
    },
    getCurrentList (data) {
      let arr = []
      data && data.forEach((item) => {
        arr.push(new SearchData(item))
        arr = arr.concat(this.getCurrentList(item.areas))
      })
      return arr
    },
    ...mapActions([
      'updateMap',
      'updateTreeStructure'
    ]),
    ...mapMutations({
      saveCurrentAreaId: 'SAVE_CURRENT_AREA_ID'
    })
  },
  watch: {
    treeStructure (newVal) {
      // 储存实时查询数据
      this.currentList = this.getCurrentList(newVal)
      // 设置树结构信息
      this.treeList = this.resetTree(newVal)
    }
  },
  components: {
    SearchBox,
    SearchList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .area-nav
    position relative
    width 325px
    height 710px
    background url("../../common/img/block.png")
    .switch-content
      position absolute
      right 15px
      top 10px
      width 30px
      height 30px
      display flex
      justify-content center
      align-items center
      cursor pointer
      img
        display block
    .title
      padding-left 10px
      line-height 50px
      font-size $font-size-medium-x
    .subtitle
      position relative
      padding 5px 15px 5px 10px
      font-size $font-size-small
      color $color-text-title
      display flex
      align-items center
      .icon
        width 100%
        height 2px
        background url("../../common/img/dashed.png")
      .text
        flex-shrink 0
        padding-right 10px
    .search
      position relative
      height 40px
      margin 0 20px
      box-sizing border-box
      z-index $z-index-small-s
      .search-box-wrapper
        width 100%
        height 100%
      .search-list-wrapper
        position absolute
        left 0
        right 0
        top 40px
        height 580px
    .tree-wrapper
      position absolute
      left 15px
      right 20px
      top 130px
      bottom 10px
      overflow auto
      &::-webkit-scrollbar
        display none
      .tree
        background transparent
        color $color-text-desc
        .custom-tree-node
          height 26px
          width 100%
          display flex
          align-items center
          justify-content space-between
          font-size $font-size-small
          padding-right 8px
          padding-left 5px
          background $color-background-button
          .state
            width 15px
            height 15px
            margin-right 5px
            background url("fire.png") no-repeat
            background-size cover
        .el-tree-node__children .custom-tree-node
          font-size $font-size-small-s
          background none
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .area-nav-tree-change
    .el-tree
      color #fff!important

      .el-tree-node:focus>.el-tree-node__content
        background none

      .el-tree-node__content:hover
        background none

      .el-tree-node__content:active
        background none
</style>

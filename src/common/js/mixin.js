import { layer, stateCode, iconUrl, polygonState, iconTypeStyle, errorUrl, stateLevel } from 'common/js/config'
import { osmUrl } from 'api/config'
import { IconAlarmList, createFloorData, createFactoryData, createBuildingData } from 'common/js/map'
import { findMap } from 'api/map'

/* global L:true */
export const mapMixin = {
  data () {
    return {
      title: '',
      state: false,
      loadingState: true,
      iconList: [],
      iconListPos: {x: 0, y: 0},
      details: {
        state: '',
        device: [],
        maintenance: [],
        alarm: []
      },
      iconDataPos: {x: 0, y: 0},
      polygonData: [],
      polygonPos: {x: 0, y: 0}
    }
  },
  methods: {
    addOSMMapLayer (minZoom, maxZoom) {
      L.tileLayer(`${osmUrl}/{z}/{x}/{y}.png`, {
        minZoom,
        maxZoom,
        errorTileUrl: errorUrl
      }).addTo(this.map)
    },
    setMaxBounds (bounds) {
      this.map.setMaxBounds(L.latLngBounds(
        L.latLng(bounds[0][0], bounds[0][1]),
        L.latLng(bounds[1][0], bounds[1][1])
      ))
    },
    setMinZoom (zoom) {
      this.map.setMinZoom(zoom)
    },
    setMaxZoom (zoom) {
      this.map.setMaxZoom(zoom)
    },
    setView (lat, lng, zoom) {
      this.map.setView([lat, lng], zoom)
    },
    zoomIn () {
      this.map.zoomIn()
    },
    zoomOut () {
      this.map.zoomOut()
    },
    remove () {
      this.map && this.map.remove()
    },
    removeLayer (layer) {
      this.map.removeLayer(layer)
    },
    marker (lat, lng, info, state, showState) {
      const path = this.confirmState(state)
      const url = path !== '' ? path : info.icon
      const marker = L.marker([lat, lng], {
        icon: this.createDivIcon(url, showState),
        pane: layer[state] !== layer.normal ? layer[state] : 'markerPane'
      }).addTo(this.map)

      marker.on('click', (a) => {
        const pos = a.originalEvent
        this.toggleIconInfo({
          ...info,
          deviceStateVal: state
        }, pos.clientX, pos.clientY)
      })
      return marker
    },
    markerAlarmList (lat, lng, list, state) {
      const url = this.confirmState(state)
      const marker = L.marker([lat, lng], {
        icon: this.createDivIconList(url, list.length),
        pane: 'list'
      }).addTo(this.map)

      marker.on('click', (a) => {
        const pos = a.originalEvent
        this.toggleAlarmIconList(list, pos.clientX, pos.clientY)
      })
      return marker
    },
    markerText (lat, lng, text) {
      return L.marker([lat, lng], {
        icon: this.createDivIconText(text)
      }).addTo(this.map)
    },
    polygon (points, info) {
      const polygon = L.polygon(points, {color: polygonState.unselected}).addTo(this.map)
      polygon.on('click', (a) => {
        const pos = a.originalEvent
        this.togglePolygonInfo(info, pos.clientX, pos.clientY)
      })
      return polygon
    },
    imageOverlay (imgUrl, bounds) {
      L.imageOverlay(imgUrl, bounds, {
        errorOverlayUrl: errorUrl
      }).addTo(this.map)
    },
    fitBounds (bounds) {
      this.map.fitBounds(bounds)
    },
    initMap (dom, minZoom, maxZoom) {
      // 初始化地图
      const option = {
        attributionControl: false,
        zoomControl: false
      }
      this.map = L.map(dom, option)
      this.map.invalidateSize(true)
      this.addOSMMapLayer(minZoom, maxZoom)
      // 创建窗口
      this.createPane()
    },
    initCRSMap (dom) {
      // 初始化地图
      // 开启CRS模式
      const option = {
        crs: L.CRS.Simple,
        attributionControl: false,
        zoomControl: false
      }
      this.map = L.map(dom, option)
      this.map.invalidateSize(true)
      // 创建窗口
      this.createPane()
    },
    createPane () {
      this.map.createPane(layer.fire).style.zIndex = stateLevel.fire
      this.map.createPane(layer.start).style.zIndex = stateLevel.state
      this.map.createPane(layer.feedback).style.zIndex = stateLevel.feedback
      this.map.createPane(layer.supervise).style.zIndex = stateLevel.supervise
      this.map.createPane(layer.shield).style.zIndex = stateLevel.shield
      this.map.createPane(layer.fault).style.zIndex = stateLevel.fault
      this.map.createPane(layer.state).style.zIndex = stateLevel.state
      this.map.createPane(layer.other).style.zIndex = stateLevel.other
      this.map.createPane('list').style.zIndex = 2000
    },
    createDivIcon (url, state) {
      return L.divIcon({
        html: `<div class="message-container ${state}"><img src="${url}" alt=""></div>`
      })
    },
    createDivIconList (url, length) {
      return L.divIcon({
        html: `<div class="message-container"><img src="${url}" alt=""><div class="message-number">${length}</div></div>`
      })
    },
    createDivIconText (text) {
      return L.divIcon({
        html: `<div class="message-container-text">${text}</div>`
      })
    },
    confirmState (state) {
      let url = ''
      switch (state) {
        case layer.shield:
          url = iconUrl.shield
          break
        case layer.fire:
          url = iconUrl.fire
          break
        case layer.supervise:
          url = iconUrl.supervise
          break
        case layer.start:
          url = iconUrl.start
          break
        case layer.feedback:
          url = iconUrl.feedback
          break
        case layer.fault:
          url = iconUrl.fault
          break
        case layer.state:
          url = iconUrl.state
          break
        case layer.other:
          url = iconUrl.other
          break
      }
      return url
    },
    getDeviceState (item) {
      let state = ''
      if ((item.devicestate & stateCode.shield) === stateCode.shield) {
        state = layer.shield
      } else if ((item.devicestate & stateCode.fire) === stateCode.fire) {
        state = layer.fire
      } else if ((item.devicestate & stateCode.supervise) === stateCode.supervise) {
        state = layer.supervise
      } else if ((item.devicestate & stateCode.start) === stateCode.start) {
        state = layer.start
      } else if ((item.devicestate & stateCode.feedback) === stateCode.feedback) {
        state = layer.feedback
      } else if ((item.devicestate & stateCode.fault) === stateCode.fault) {
        state = layer.fault
      } else if ((item.devicestate & stateCode.state) === stateCode.state) {
        state = layer.state
      } else if ((item.devicestate & stateCode.other) === stateCode.other) {
        state = layer.other
      } else {
        state = layer.normal
      }
      return state
    },
    resetBounds (list) {
      let minLat = 0
      let maxLat = 0
      let minLng = 0
      let maxLng = 0
      list.forEach((item, index) => {
        minLat = Math.min(item.lat, index !== 0 ? minLat : item.lat)
        maxLat = Math.max(item.lat, index !== 0 ? maxLat : item.lat)
        minLng = Math.min(item.lon, index !== 0 ? minLng : item.lon)
        maxLng = Math.max(item.lon, index !== 0 ? maxLng : item.lon)
      })
      return [[minLat, minLng], [maxLat, maxLng]]
    },
    getLatLngAverageNum (list) {
      let sumLat = 0
      let sunLng = 0
      const len = list.length
      list.forEach((n) => {
        sumLat += this.CRSState ? n.y : n.lat
        sunLng += this.CRSState ? n.x : n.lon
      })
      return {lat: (sumLat / len), lng: (sunLng / len)}
    },
    deleteMapHandle () {
      this.remove()
      this.reset()
      this.loadingState = true
    },
    configure (areaId) {
      // 发送请求
      findMap(areaId).then((data) => {
        // 请求失败
        if (!data) {
          // 获取数据失败
          this.loadingState = true
          return
        }
        // 请求成功
        const list = data.subAreaList
        const area = data.areaInfo
        // 加载第二个地图
        this.update && this.update(list.length > 0 ? list[0].areaid : '')
        // 设备是否定位
        this.devicePosition = true
        // 数据获取成功
        this.loadingState = false
        // 初始化地图
        // 判断是瓦片图还是CRS，当前是厂区信息还是建筑信息
        this.CRSState = area.picture !== ''
        this.areaInfoState = area.isSitearea
        this.areaInfoData = this.areaInfoState ? area.areaDetails : area.building
        this.minZoom = this.areaInfoState ? 8 : 15
        this.maxZoom = this.areaInfoState ? 15 : 18
        // 根据状态不同进行不同操作
        if (!this.CRSState) {
          if (!area.border.length) {
            return
          }
          // 初始化地图
          this.initMap(this.map1, this.minZoom, this.maxZoom)
          // 设置基本信息
          this.bounds = this.resetBounds(area.border)
          this.center = [area.lat, area.lon]
          // 设置区域块
          this.setPolygonInfo(list)
          // 设置周边图标信息
          this.setIconInfo(area.devices, true)
          // 设置基本数据
          this.setBaseData()
          // 地图加载完成
        } else {
          if (!area.height || !area.width) {
            return
          }
          // 加载地图
          this.initCRSMap(this.map1)
          // 设置基本信息
          this.url = area.picture
          this.bounds = [[0, 0], [area.height, area.width]]
          this.setBaseDataCRS()
          // 设置区域块
          this.setPolygonInfo(list)
          // 设置周边图标信息
          this.setIconInfo(area.devices, false)
          if (!(this.devicePosition && this.findDevice)) {
            this.setMaxBounds(this.bounds)
          }
        }
      })
    },
    openFullScreen () {
      this.state = true
    },
    closeFullScreen () {
      this.state = false
    },
    fullScreenESC () {
      if (this.state) {
        this.$refs.iconListPopup.close()
        this.$refs.iconPopup.close()
        this.$refs.polygonPopup.close()
        this.closeFullScreen()
      }
    },
    togglePolygonInfo (info, x, y) {
      const index = info.index
      const currentPolygon = this.polygonList[index]
      const lastPolygon = this.polygonList[this.polygonSelected]
      if (this.polygonSelected !== index) {
        currentPolygon.setStyle({color: polygonState.selected})
        lastPolygon.setStyle({color: polygonState.unselected})
        this.update(info.update)
      } else if (this.polygonSelected === index && info.data) {
        this.polygonData = this.areaInfoState ? createFactoryData(info.data) : createBuildingData(info.data)
        this.polygonPos = {x, y}
        this.$refs.polygonPopup.open()
      }
      this.polygonSelected = index
    },
    toggleIconInfo (info, x, y) {
      createFloorData(info).then((t) => {
        this.details = t
      })
      this.iconDataPos = {x, y}
      this.$refs.iconPopup.open()
    },
    toggleAlarmIconList (list, x, y) {
      this.iconList = list
      this.iconListPos = {x, y}
      this.$refs.iconListPopup.open()
    },
    setPolygonInfo (data) {
      data.forEach((item) => {
        if (!item.border.length) return
        // 更新下级地图的数据
        const updateData = item.areaid
        // 设置区域信息
        const polygon = item.border.map((b) => {
          if (!this.CRSState) {
            return [b.lat, b.lon]
          }
          return [b.y, b.x]
        })
        // 绘制区域
        const polygonItem = this.polygon(polygon, {
          data: this.areaInfoData,
          update: updateData,
          index: this.step += 1
        })
        // 默认区域的选中
        if (this.step === 0) {
          polygonItem.setStyle({color: polygonState.selected})
        }
        // 保存区域块信息数据
        this.polygonList.push(polygonItem)
        // 设置报警图标信息
        const center = this.getLatLngAverageNum(item.border)
        this.setAlarmIconList(item.alarmDevices, center)
      })
    },
    setIconInfo (list, flag) {
      if (!list.length) return
      // 设置报警图表信息
      list.forEach((item) => {
        let showState = ''
        const deviceState = this.getDeviceState(item)
        if (deviceState === layer.fire) {
          showState = `${showState} ${iconTypeStyle.alarm}`
        }
        if (flag && item.lat && item.lng) {
          this.iconList.push(this.marker(item.lat, item.lng, item, deviceState, showState))
        }
        if (!flag && item.y && item.x) {
          this.iconList.push(this.marker(item.y, item.x, item, deviceState, showState))
        }
      })
    },
    setAlarmIconList (list, centerPoint) {
      // 设置报警图表信息
      if (!list.length) return
      let arr = []
      let level = 0
      let state = ''
      list.forEach((item) => {
        const deviceState = this.getDeviceState(item)
        arr.push(new IconAlarmList({...item, deviceState}))
        if (stateLevel[deviceState] > level) {
          state = deviceState
          level = stateLevel[deviceState]
        }
      })
      const icon = this.markerAlarmList(centerPoint.lat, centerPoint.lng, arr, state)
      this.iconList.push(icon)
    },
    selectAlarmIconList (item) {
      this.$refs.iconListPopup.close()
      if (this.state) {
        this.state = false
      }
      this.setDeviceTree(item)
    },
    reset () {
      this.polygonSelected = 0
      this.step = -1
      this.polygonList = []
      this.iconList = []
    },
    redraw () {
      // 设置基本数据
      !this.CRSState && this.setBaseData()
      // 添加图层
      this.polygonList.forEach((item) => {
        item.addTo(this.map)
      })
      // 添加图层
      this.iconList.forEach((item) => {
        item.addTo(this.map)
      })
      this.CRSState && this.setBaseDataCRS()
    },
    setBaseData () {
      // 如果没有设备对应
      if (!(this.devicePosition && this.findDevice)) {
        // 设置边界，中心点和初始化缩放级
        this.setMaxBounds(this.bounds)
        this.setView(...this.center, this.maxZoom)
      }
    },
    setBaseDataCRS () {
      this.setMaxZoom(0)
      this.setMinZoom(-3)
      this.imageOverlay(this.url, this.bounds)
      this.fitBounds(this.bounds)
    },
    getDomCenterPos () {
      const pos = this.$refs.map.getBoundingClientRect()
      return {
        x: (pos.left + pos.width / 2),
        y: (pos.top + pos.height / 2)
      }
    }
  }
}

import * as types from './mutation-types'
import { mapType, stateData, alarmHandle, alarmHandleState, alarmHandleStateName, alarmAddOrDelete } from 'common/js/config'
import { SearchData } from 'common/js/area'
import { alarmData } from 'api/mq'
import { resetTime } from 'common/js/utils'

function resetMapData (data, areaId) {
  let arr = []
  data.forEach((item) => {
    if (item.areaid === areaId) {
      arr.push(new SearchData(item))
      return arr
    }
    const areas = resetMapData(item.areas, areaId)
    if (areas.length) {
      arr.push({
        ...new SearchData(item),
        childTree: areas.length ? areas[0] : []
      })
      return arr
    }
  })
  return arr
}

function resetAlarmItem (data, alarm = 'alarmNothing', style = '', alarmStyle = '', reason = true) {
  return {
    ...data,
    areaId: data.areaId,
    alarmTime: resetTime(data.alarmTime, 'all'),
    alarmHandleName: alarmHandleStateName[alarm],
    alarmHandleState: alarmHandleState[alarm],
    animationStyle: style,
    alarmStyle,
    reasonState: reason
  }
}

function resetAlarmItemByProcess (data, flag = true) {
  let item
  if (data.processState === alarmHandle.ALARM_NOT_ALARM || data.processState === alarmHandle.ALARM_NOT_ALARM_OVERTIME) {
    item = resetAlarmItem(data, 'alarmReceive', 'alarm', 'alarm-receiver', flag)
  } else if (data.processState === alarmHandle.ALARM_NOT_HANDLE || data.processState === alarmHandle.ALARM_NOT_HANDLE_OVERTIME) {
    item = resetAlarmItem(data, 'alarmHandle', '', 'alarm-handle', flag)
  } else {
    item = resetAlarmItem(data, 'alarmFinish', '', 'alarm-finish', flag)
  }
  return item
}

function resetAlarmItemByState (data) {
  let item
  switch (data.action) {
    case stateData.fire.name:
      item = resetAlarmItemByProcess(data, false)
      break
    case stateData.shield.name:
      item = resetAlarmItemByProcess(data)
      break
    case stateData.feedback.name:
      item = resetAlarmItemByProcess(data)
      break
    case stateData.fault.name:
      item = resetAlarmItemByProcess(data)
      break
    case stateData.supervise.name:
      item = resetAlarmItemByProcess(data)
      break
    case stateData.state.name:
      item = resetAlarmItemByProcess(data)
      break
    case stateData.start.name:
      item = resetAlarmItemByProcess(data)
      break
    case stateData.other.name:
      item = resetAlarmItemByProcess(data)
      break
    default:
      item = resetAlarmItem(data)
  }
  return item
}

function resetFirstAlarmItem (data) {
  let alarm
  if (data.processState === alarmHandle.ALARM_NOT_ALARM || data.processState === alarmHandle.ALARM_NOT_ALARM_OVERTIME) {
    alarm = 'alarmReceive'
  } else if (data.processState === alarmHandle.ALARM_NOT_HANDLE || data.processState === alarmHandle.ALARM_NOT_HANDLE_OVERTIME) {
    alarm = 'alarmHandle'
  } else {
    alarm = 'alarmFinish'
  }
  return {
    alarmId: data.alarmId,
    deviceId: data.deviceId,
    areaId: data.areaId,
    group: [
      {name: '报警时间：', val: resetTime(data.alarmTime, 'all')},
      {name: '设备类型：', val: data.deviceTypeName},
      {name: '控制器：', val: data.controllerName},
      {name: '设备编码：', val: data.deviceCode},
      {name: '位置描述：', val: data.locationDescription}
    ],
    alarmHandleName: alarmHandleStateName[alarm],
    alarmHandleState: alarmHandleState[alarm]
  }
}

function replaceDataToNet (data) {
  const result = {
    GUID: data.clientId,
    Datas: JSON.stringify({
      userList: data.userList
    })
  }
  if (!window.plugins) return
  window.plugins.common.replace(JSON.stringify(result))
}

function resetTree (tree) {
  let arr = []
  tree.forEach(t => {
    arr.push(t)
    arr = arr.concat(resetTree(t.areas))
  })
  return arr
}

function resetTreeByAlarm (tree, device) {
  let arr = []
  tree.forEach(t => {
    if (device.areaId === t.areaid) {
      switch (device.alarmType) {
        case alarmAddOrDelete.add:
          arr.push({
            ...t,
            list: t.list ? [...t.list, device] : [device]
          })
          break
        case alarmAddOrDelete.delete:
          arr.push({
            ...t,
            list: t.list.filter(d => d.alarmId !== device.alarmId)
          })
          break
        case alarmAddOrDelete.update:
          arr.push({
            ...t
          })
          break
      }
      return
    }
    arr.push({
      ...t,
      areas: resetTreeByAlarm(t.areas, device)
    })
  })
  return arr
}

const setTimeoutByAlarm = (function () {
  let timeFlag = null
  let continuity = false
  return function (func) {
    if (timeFlag !== null) {
      continuity = true
    }
    clearTimeout(timeFlag)
    timeFlag = setTimeout(() => {
      func(continuity)
      timeFlag = null
      continuity = false
    }, 300)
  }
})()

const setTimeoutByFirstAlarm = (function () {
  let timeFlag = null
  return function (func) {
    clearTimeout(timeFlag)
    timeFlag = setTimeout(() => {
      func()
    }, 300)
  }
})()

export const updateTreeStructure = function ({commit, state}, tree) {
  let newTree = resetTree(tree)
  let arr = []
  state.allList.forEach(t => {
    let newArr = newTree.filter(d => d.areaid === t.areaId)
    if (newArr.length > 0) {
      arr.push(t)
      if (t.action === stateData.fire.name) {
        // 如果是火警，添加到树形结构中
        newArr[0].list = [t]
      }
    }
  })
  commit(types.SAVE_TREE_STRUCTURE, tree)
  commit(types.RESET_ALL_LIST, arr)
}

export const updateTreeStructureByAlarm = function ({commit, state}, device) {
  if (device.action !== stateData.fire.name) return
  const tree = resetTreeByAlarm(state.treeStructure, device)
  commit(types.SAVE_TREE_STRUCTURE, tree)
}

export const updateMap = function ({commit, dispatch}, {treeData, deviceData}) {
  switch (treeData.type) {
    case mapType.map1:
      dispatch('updateMapToDeleteMap', {map1: false, map2: false, map3: false, map4: false})
      commit(types.UPDATE_MAP_CITY, {selectData: treeData, deviceData})
      break
    case mapType.map2:
      dispatch('updateMapToDeleteMap', {map1: true, map2: false, map3: false, map4: false})
      commit(types.UPDATE_MAP_FACTORY, {selectData: treeData, deviceData})
      break
    case mapType.map3:
      dispatch('updateMapToDeleteMap', {map1: true, map2: true, map3: false, map4: false})
      commit(types.UPDATE_MAP_BUILDING, {selectData: treeData, deviceData})
      break
    case mapType.map4:
      dispatch('updateMapToDeleteMap', {map1: true, map2: true, map3: true, map4: false})
      commit(types.UPDATE_FLOOR_PLANS, {selectData: treeData, deviceData})
      break
  }
}

export const updateMapToDeleteMap = function ({commit}, {map1, map2, map3, map4}) {
  commit(types.UPDATE_MAP_CITY_DELETE, map1)
  commit(types.UPDATE_MAP_FACTORY_DELETE, map2)
  commit(types.UPDATE_MAP_BUILDING_DELETE, map3)
  commit(types.UPDATE_FLOOR_PLANS_DELETE, map4)
}

export const setDeviceTree = function ({dispatch, state}, deviceData) {
  const treeData = resetMapData(state.treeStructure, deviceData.areaId)[0]
  dispatch('updateMap', {treeData, deviceData})
}

export const getAlarmData = function ({dispatch, commit, state}) {
  setTimeout(() => {
    if (!state.treeStructure.length || !state.clientId) {
      dispatch('getAlarmData')
      return
    }
    alarmData(state.clientId, (data) => {
      // 接受mq信息，地图也处于加载中
      commit(types.UPDATE_MAP_LOADING_STATE_MQ, true)
      // 格式化数据
      const item = resetAlarmItemByState(data)
      // 更新树结构
      dispatch('updateTreeStructureByAlarm', item)
      // 接受消息，更新地图
      setTimeoutByAlarm((flag) => {
        // 连续更新，将区域id换成最后一个地图
        if (flag) {
          dispatch('receiveMessageToGetTree', {
            ...item,
            areaId: state.floorData.selectData ? state.floorData.selectData.areaId : item.areaId
          })
        } else {
          // 正常更新
          dispatch('receiveMessageToGetTree', item)
        }
      })
      // 对应状态，更新列表
      switch (data.alarmType) {
        case alarmAddOrDelete.add:
          commit(types.UPDATE_ALARM_DATA_MQ, item)
          commit(types.ADD_ALL_LIST, item)
          break
        case alarmAddOrDelete.delete:
          commit(types.DELETE_ALL_LIST, item)
          break
        case alarmAddOrDelete.update:
          commit(types.UPDATE_ALL_LIST, item)
          break
      }
      // 接受mq信息，地图也处于加载中，处理完mq，结束加载
      commit(types.UPDATE_MAP_LOADING_STATE_MQ, false)
    }, (data) => {
      // 格式化数据
      const item = resetFirstAlarmItem(data)
      // 接受消息，更新地图
      setTimeoutByFirstAlarm(() => {
        dispatch('setDeviceTree', item)
      })
      // 对应状态，更新列表
      switch (data.alarmType) {
        case alarmAddOrDelete.add:
          commit(types.ADD_FIRST_LIST, item)
          break
        case alarmAddOrDelete.delete:
          commit(types.DELETE_FIRST_LIST, item)
          break
        case alarmAddOrDelete.update:
          commit(types.UPDATE_FIRST_LIST, item)
          break
      }
    })
  }, 500)
}

export const receiveMessageToGetTree = function ({dispatch, state}, deviceData) {
  const treeList = resetMapData(state.treeStructure, deviceData.areaId)
  if (treeList.length === 0) return
  const treeData = treeList[0]
  dispatch('receiveMessageToUpdateMap', {treeData, deviceData})
}

export const receiveMessageToUpdateMap = function ({commit}, {treeData, deviceData}) {
  switch (treeData.type) {
    case mapType.map1:
      commit(types.UPDATE_MAP_CITY_MQ, {treeData, deviceData})
      break
    case mapType.map2:
      commit(types.UPDATE_MAP_FACTORY_MQ, {treeData, deviceData})
      break
    case mapType.map3:
      commit(types.UPDATE_MAP_BUILDING_MQ, {treeData, deviceData})
      break
    case mapType.map4:
      commit(types.UPDATE_FLOOR_PLANS_MQ, {treeData, deviceData})
      break
  }
}

export const userLogin = function ({commit, state}, data) {
  commit(types.ADD_USER_LIST, data)
  replaceDataToNet(state)
}

export const updateProjectAndUpdateLocal = function ({commit}, projectId) {
  localStorage.pattern = projectId
  commit(types.UPDATE_MAINTAIN_PROJECT, projectId)
}

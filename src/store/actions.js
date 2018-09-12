import * as types from './mutation-types'
import { mapType, stateData } from 'common/js/config'
import { SearchData } from 'common/js/area'

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

export const userLogin = function ({commit, state}, data) {
  commit(types.ADD_USER_LIST, data)
  replaceDataToNet(state)
}

export const updateProjectAndUpdateLocal = function ({commit}, projectId) {
  localStorage.pattern = projectId
  commit(types.UPDATE_MAINTAIN_PROJECT, projectId)
}

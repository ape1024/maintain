import * as types from './mutation-types'

const mutations = {
  [types.UPDATE_MAP_AREA_ID] (state, data) {
    state.cityAreaId = data
  },
  [types.UPDATE_FACTORY_AREA_ID] (state, data) {
    state.factoryAreaId = data
  },
  [types.UPDATE_BUILDING_AREA_ID] (state, data) {
    state.buildingAreaId = data
  },
  [types.UPDATE_FLOOR_PLANS_AREA_ID] (state, data) {
    state.floorPlansAreaId = data
  },
  [types.UPDATE_MAINTAIN_PROJECT] (state, data) {
    state.maintainProject = data
  },
  [types.UPDATE_LOADING_STATE] (state, data) {
    state.loading = data
  },
  [types.SAVE_USER_LIST] (state, data) {
    state.userList = data
  },
  [types.SAVE_CLIENT_ID] (state, data) {
    state.clientId = data
  },
  [types.ADD_USER_LIST] (state, data) {
    state.userList = [data, ...state.userList]
  },
  [types.UPDATE_USER_LIST] (state, data) {
    state.userList = state.userList.filter(t => data.indexOf(t.code) === -1)
  },
  [types.DELETE_USER_LIST] (state, data) {
    state.userList = state.userList.filter((item) => item.token !== data)
  },
  [types.SAVE_TREE_STRUCTURE] (state, data) {
    state.treeStructure = data
  },
  [types.UPDATE_MAP_CITY] (state, data) {
    state.cityData = data
  },
  [types.UPDATE_MAP_FACTORY] (state, data) {
    state.factoryData = data
  },
  [types.UPDATE_MAP_BUILDING] (state, data) {
    state.buildingData = data
  },
  [types.UPDATE_FLOOR_PLANS] (state, data) {
    state.floorData = data
  },
  [types.UPDATE_MAP_CITY_MQ] (state, data) {
    state.cityDataMq = data
  },
  [types.UPDATE_MAP_FACTORY_MQ] (state, data) {
    state.factoryDataMq = data
  },
  [types.UPDATE_MAP_BUILDING_MQ] (state, data) {
    state.buildingDataMq = data
  },
  [types.UPDATE_FLOOR_PLANS_MQ] (state, data) {
    state.floorDataMq = data
  },
  [types.UPDATE_MAP_CITY_DELETE] (state, data) {
    state.cityDataDelete = data
  },
  [types.UPDATE_MAP_FACTORY_DELETE] (state, data) {
    state.factoryDataDelete = data
  },
  [types.UPDATE_MAP_BUILDING_DELETE] (state, data) {
    state.buildingDataDelete = data
  },
  [types.UPDATE_FLOOR_PLANS_DELETE] (state, data) {
    state.floorDataDelete = data
  },
  [types.UPDATE_MAP_LOADING_STATE_1] (state, data) {
    state.mapLoadingState1 = data
  },
  [types.UPDATE_MAP_LOADING_STATE_2] (state, data) {
    state.mapLoadingState2 = data
  },
  [types.UPDATE_MAP_LOADING_STATE_3] (state, data) {
    state.mapLoadingState3 = data
  },
  [types.UPDATE_MAP_LOADING_STATE_4] (state, data) {
    state.mapLoadingState4 = data
  },
  [types.UPDATE_MAP_LOADING_STATE_MQ] (state, data) {
    state.mapLoadingStateMq = data
  },
  [types.ADD_FIRST_LIST] (state, data) {
    state.firstList = [data, ...state.firstList]
  },
  [types.DELETE_FIRST_LIST] (state, data) {
    state.firstList = state.firstList.filter((t) => t.alarmId !== data.alarmId)
  },
  [types.UPDATE_FIRST_LIST] (state, data) {
    state.firstList = state.firstList.map((t) => {
      if (data.alarmId === t.alarmId) {
        return data
      }
      return t
    })
  },
  [types.RESET_FIRST_LIST] (state, data) {
    state.firstList = data
  },
  [types.ADD_ALL_LIST] (state, data) {
    state.allList = [data, ...state.allList]
  },
  [types.DELETE_ALL_LIST] (state, data) {
    state.allList = state.allList.filter((t) => t.alarmId !== data.alarmId)
  },
  [types.UPDATE_ALL_LIST] (state, data) {
    state.allList = state.allList.map((t) => {
      if (data.alarmId === t.alarmId) {
        return data
      }
      return t
    })
  },
  [types.RESET_ALL_LIST] (state, data) {
    state.allList = data
  },
  [types.UPDATE_ALARM_DATA_MQ] (state, data) {
    state.alarmMq = data
  },
  [types.UPDATE_ALARM_ID] (state, data) {
    state.alarmId = data
  }
}

export default mutations

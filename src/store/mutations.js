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
  }
}

export default mutations

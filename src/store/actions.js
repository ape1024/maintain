import * as types from './mutation-types'

export const updateMap = function ({commit}, areaId) {
  commit(types.UPDATE_MAP_AREA_ID, areaId)
}

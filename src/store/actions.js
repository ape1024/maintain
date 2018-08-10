import * as types from './mutation-types'

export const updateMap = function ({commit}, areaId) {
  commit(types.UPDATE_MAP_AREA_ID, areaId)
}

export const updateProjectAndUpdateLocal = function ({commit}, projectId) {
  localStorage.pattern = projectId
  commit(types.UPDATE_MAINTAIN_PROJECT, projectId)
}

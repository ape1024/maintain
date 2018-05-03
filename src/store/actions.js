import * as types from './mutation-types'

export const addStr = function ({commit}, {str}) {
  commit(types.SET, str)
}

import * as types from './mutation-types'

const mutations = {
  [types.SET] (state, str) {
    state.str = str
  }
}

export default mutations

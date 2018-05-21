import {
  HIDE_LOADING,
  SHOW_LOADING,
  SaveUserInfo,
} from './type'

const state = {
  loading: false,
  userInfo: {}
}

const mutations = {
  /* loading */
  [HIDE_LOADING](state) {
    state.loading = false
  },
  [SHOW_LOADING](state) {
    state.loading = true
  },
  [SaveUserInfo](state, event) {
    state.userInfo = event
  }
}

const getters = {
  userInfo(state) {
    return state.userInfo
  }
}

export default {
  state,
  mutations,
  getters
}

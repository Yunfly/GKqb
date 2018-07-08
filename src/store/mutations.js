import {
  HIDE_LOADING,
  SHOW_LOADING,
  SaveUserInfo,
  CONNECT_STATUS,
} from './type'

const state = {
  loading: false,
  userInfo: {},
  connectStatus: true,
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
  },
  [CONNECT_STATUS](state, event) {
    state.connectStatus = event.connectStatus
  },

}

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  connectStatus(state) {
    return state.connectStatus
  },
}

export default {
  state,
  mutations,
  getters
}

import * as types from './type'

export default {
  hideLoading: ({ commit }) => {
    commit(types.HIDE_LOADING)
  },
  showLoading: ({ commit }) => {
    commit(types.SHOW_LOADING)
  },
  saveUserInfo: ({ commit }, event) => {
    commit(types.SaveUserInfo, event)
  },
  changeConnectStatus: ({ commit }, event) => {
    commit(types.CONNECT_STATUS, event)
  },
}

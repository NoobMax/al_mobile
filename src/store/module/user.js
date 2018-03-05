import * as types from '../mutation-type'
import api from '@/api'
import store2 from 'store2'
const state = {
  userInfo: {},
  indexHintShow: false
}

const getters = {
  userInfo: state => state.userInfo,
  isMemberLogin: state => state.isMemberLogin,
  isGuest: state => state.isGuest,
  indexHintShow: state => state.indexHintShow
}

const actions = {
  async guestLogin ({commit}) {
    try {
      const data = await api.guest()
      if (data.status === 200) {
        commit(types.USER_INFO_RECEIVE, data.data.data)
        store2.session.set('user-info', data.data.data)
        store2.session.set('auth-token', data.data.token)
        commit(types.USER_INFO_RECEIVE)
        if (!data.data.data.user_remember_token) {
          commit(types.SHOW_INDEX_HINTDIALOG, {root: true})
          this.$store.commit('show_index_hintDialog')
        }
        return {status: 200}
      }
      Promise.reject(new Error('错误'))
    } catch (error) {
      Promise.reject(error)
    }
  }
}

const mutations = {
  [types.USER_INFO_RECEIVE] (state) {
    if (store2.session.get('user-info')) {
      state.userInfo = store2.session.get('user-info')
    } else {
      state.userInfo = {}
    }
  },
  [types.SHOW_INDEX_HINTDIALOG] (state) {
    state.indexHintShow = true
  },
  [types.HIDE_INDEX_HINTDIALOG] (state) {
    state.indexHintShow = false
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

// import _ from 'lodash'
import api from '@/api'
import * as types from '../mutation-type'
const state = {
  payData: {}
}
const getters = {
  payRechargeData: state => state.payData
}
const mutations = {
  [types.PAY_RECHARGE_DATA] (state, data) {
    state.payData = data
  }
}
const actions = {
  async fetchRechargeType ({commit}) {
    try {
      const data = await api.getRechargeType()
      if (data.status === 200) {
        commit(types.PAY_RECHARGE_DATA, data.data.data)
        return data.data.data
      }
      Promise.resolve({status: -200})
    } catch (error) {
      Promise.reject(error)
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

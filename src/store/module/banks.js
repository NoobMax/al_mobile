import * as types from '../mutation-type'
import api from '@/api'
import _ from 'lodash'
import {bankList} from '@/config/money.config'
const state = {
  bankList: []
}

const getters = {
  bankList: state => state.bankList
}

const actions = {
  async fetchBankList ({commit}) {
    try {
      const data = await api.getBanks()
      if (data.status === 200) {
        commit(types.BANK_LIST_RECEIVE, data.data.data)
        return data.data.data
      }
    } catch (error) {
      Promise.reject(error)
    }
  }
}

const mutations = {
  [types.BANK_LIST_RECEIVE] (state, data) {
    if (data.length > 0) {
      state.bankList = _.map(data, item => {
        const current = _.find(bankList, target => target.key === item.card_bank_id)
        if (current) {
          return _.assign({}, item, {isSelected: false, label: current.value, icon: current.icon})
        }
        return item
      })
    } else {
      state.bankList = data
    }
  },
  // 选择银行卡
  [types.BNAK_ITEM_SELECTED] (state, item) {
    _.forEach(state.bankList, current => {
      if (item.card_id === current.card_id) {
        item.isSelected = !item.isSelected
      } else {
        current.isSelected = false
      }
    })
  },
  // 重置银行卡状态
  [types.BANK_STATUS_RESET] (state) {
    state.bankList = _.map(state.bankList, item => _.assign({}, item, {isSelected: false}))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

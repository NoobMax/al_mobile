import * as types from '../mutation-type'
import api from '@/api'
import _ from 'lodash'
import {getCurrentLotCode} from '@/utils'
import {lotteryClassList} from '@/config/lottery.config'
const state = {
  roundData: {},
  roundpk10: {},
  roundcqssc: {},
  roundxyft: {},
  roundpcdd: {},
  roundcqxync: {},
  roundgdklsf: {},
  roundmarksix: {},
  isLotterying: false, // 开奖状态
  isLoading: false,
  winData: {},
  timestamp: 0
}
const getters = {
  roundData: state => state.roundData,
  roundpk10: state => state.roundpk10,
  roundcqssc: state => state.roundcqssc,
  roundxyft: state => state.roundxyft,
  roundpcdd: state => state.roundpcdd,
  roundcqxync: state => state.roundcqxync,
  roundgdklsf: state => state.roundgdklsf,
  roundmarksix: state => state.roundmarksix,
  isLotterying: state => state.isLotterying,
  overAllLoading: state => state.isLoading, // loading
  winData: state => state.winData,
  timestamp: state => state.timestamp
}
const actions = {
  async fetchRoundData ({commit}, params) {
    try {
      const data = await api.getLotteryTimeByName(params)
      if (data.status === 200) {
        commit(types.ROUND_DATA_RECEIVE, {data: data.data, lottery: params.lottery})
        return data.data.data
      }
      return {status: -200}
    } catch (error) {
      Promise.reject(error)
    }
  }
}
const mutations = {
  // 开奖号码
  [types.ROUND_DATA_RECEIVE] (state, {data, lottery}) {
    // state.roundData = _.assign({}, data.data, {
    //   timestamp: data.timestamp,
    //   current_time: data.data.round_time_end - data.timestamp <= 0 ? data.data.round_time_end_next - data.timestamp : data.data.round_time_end - data.timestamp,
    //   round_current: data.data.round_time_end - data.timestamp <= 0 ? data.data.round_current + 1 : data.data.round_current
    // })
    state[`round${lottery}`] = _.assign({}, data.data, {
      timestamp: data.timestamp,
      current_time: data.data.round_time_end - data.timestamp <= 0 ? data.data.round_time_end_next - data.timestamp : data.data.round_time_end - data.timestamp,
      round_current: data.data.round_time_end - data.timestamp <= 0 ? data.data.round_current + 1 : data.data.round_current
    })
  },
  // socket提供的开奖号码
  [types.GET_SYNC_ROUND_DATA] (state, {data}) {
    /* eslint-disable */
    state.isLotterying = true
    // setTimeout(() => {
    //   state.isLotterying = false
    // }, 1500)
    const classifyName = getCurrentLotCode(data.data.lot_code)
    console.log(classifyName)
    console.log(state[`round${classifyName}`]['round_numbers_prev'])
    state[`round${classifyName}`].round_numbers_prev = data.data.round_numbers_prev
    state[`round${classifyName}`].round_prev = data.data.round_prev
  },
  // 下一期的数据
  [types.ROUND_NEXT_DATA_RECEIVE] (state, {current, id}) {
    const target = _.find(lotteryClassList, item => item.id === id)
    if (current) {
      state[`round${target.value}`].round_current = state[`round${target.value}`].round_current + 1
      state[`round${target.value}`].current_time = current.round_time_end_next - state.timestamp
    }
  },
  // socket提供的时间戳
  [types.CURRENT_TIMESTAMP_RECEIVE] (state, {timestamp}) {
    state.timestamp = timestamp
  },
  [types.OVER_LOADING_RECEIVE] (state, {isLoading}) {
    state.isLoading = isLoading
  },
  // 赢钱的数据
  [types.WIN_BETAREA_RECEIVE] (state, {data}) {
    /* eslint-disable */
    let win_total = 0
    if (data.message_betslip_info.length > 0) {
      state.winData.betslip_amt_total = _.sumBy(data.message_betslip_info, item => +(item.betslip_amt))
      state.winData.betslip_rebate_total = _.sumBy(data.message_betslip_info, item => +(item.betslip_rebate))
      _.forEach(data.message_betslip_info, item => {
        if (item.betslip_is_win === 1) {
          win_total += +(item.betslip_amt_available)
        }
        state.winData.win_total = win_total
      })
    }
    console.log('赢钱是==============' + win_total)
    console.log('总投注是==============' + state.winData.betslip_amt_total)
    state.winData = _.assign({}, state.winData, {
      numbers: data.message_lottery_numbers,
      formulas: data.message_lottery_formulas,
      round_current: data.message_lottery_round,
      lottery_class: data.message_lottery_class
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

import api from '@/api'
import * as types from '../mutation-type'
import {lotterys} from '@/utils/lotterys'
import _ from 'lodash'
console.log(lotterys)
// import store2 from 'store2'
// state
const state = {
  lotteryClassify: [], // 所有玩法
  class_number: 1,
  lotteryGames: [],
  lotterySubList: [],
  currentGame: {},
  lotterySubId: 101,
  betOddsStatus: false,
  global_presetMoney: '',
  // 预设金额值
  presetMoney: '',
  // 预设金额状态
  presetStatus: true,
  // 用户投注的信息
  betOddsList: [],
  totalMoney: 0,
  elLeft: 0, // 当前点击加按钮在网页中的绝对top值
  elBottom: null, // 当前点击加按钮在网页中的绝对left值,
  elTarget: null
}

// getters
const getters = {
  lotteryClassify: state => state.lotteryClassify,
  class_number: state => state.class_number,
  lotterySubList: state => state.lotterySubList,
  currentGame: state => state.currentGame,
  lotterySubId: state => state.lotterySubId,
  betOddsStatus: state => state.betOddsStatus,
  global_presetMoney: state => state.global_presetMoney,
  presetMoney: state => state.presetMoney,
  presetStatus: state => state.presetStatus,
  betOddsList: state => state.betOddsList,
  totalMoney: state => state.totalMoney,
  elLeft: state => state.elLeft,
  elBottom: state => state.elBottom,
  elTarget: state => state.elTarget
}

// actions
const actions = {
  // 提交投注金额
  async submitBetOdds ({ commit }, params) {
    try {
      const data = await api.checkoutBetAreaOdds(params)
      if (data.status === 200) {
        commit(types.SUBMIT_BET_ODDS_STATUS, true)
        commit(types.USER_BALANCE_UPDATE, data.data.balance, {root: true})
        return {status: 200}
      } else if (data.status === 400) {
        return {status: 400, message: data.data.message}
      }
      return Promise.reject(new Error('错误'))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 当前的彩种标题
  async fetchLotteryClassify ({ commit }, params) {
    try {
      const data = await api.getLotteryClassify(params)
      if (data.status === 200) {
        commit(types.SWITCH_LOTTERY_CLASS, data.data.data)
        console.log(lotterys)
        const key = `${params.classifyName}_${lotterys.getIdByClassifyName(params.classifyName)}`
        lotterys.setClassifyCache(key, data)
        return data
      }
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  },
  // 当前的游戏玩法
  async fetchCurrentGames ({commit}, params) {
    try {
      // // const currentGameCache = await lotterys.getCurrentGameCache(params.number_class)
      // if (currentGameCache) {
      //   commit(types.CURRENT_GAMES_RECEIVE, {data: currentGameCache.data.data, type: params.type})
      //   return currentGameCache.data.data
      //   // return Promise.resolve(currentGameCache)
      // } else {
      // }
      const data = await api.getCurrentGamesByNumberClass(params)
      if (data.status === 200) {
        commit(types.CURRENT_GAMES_RECEIVE, {data: data.data.data, type: params.type})
        lotterys.setCyrrentGameCache(params.number_class, data)
        return data.data.data
      }
    } catch (error) {
      Promise.reject(error)
    }
  }
}

// mutations
const mutations = {
  // 删除当前数据
  [types.DELETE_CURRENT_ODDS] (state, index) {
    const current = state.betOddsList[index]
    if (current.amount && !isNaN(Number(current.amount))) {
      state.totalMoney -= Number(current.amount)
    }
    state.betOddsList.splice(index, 1)
  },
  // 重置所有的数据
  [types.RESET_ALL_ODDS_DATA] (state) {
    state.betOddsList = []
    state.totalMoney = ''
  },
  // 修改所有的投注金额
  [types.SET_ALL_BET_MONEY] (state, value) {
    state.betOddsList = _.map(state.betOddsList, item => {
      return _.assign({}, item, {
        amount: value
      })
    })
    state.totalMoney = state.betOddsList.length * value
  },
  // 修改当前投注的金额
  [types.SET_BET_MONEY] (state, {index, value}) {
    state.betOddsList = _.map(state.betOddsList, (item, key) => {
      if (index === key) {
        return _.assign({}, item, {
          amount: value
        })
      }
      return item
    })
    state.totalMoney = _.sumBy(state.betOddsList, item => Number(item.amount))
  },
  // 当前选中的投注信息
  [types.SUBMIT_BET_ODDS_DATA] (state, {current, elLeft, elBottom, rect}) {
    const index = state.betOddsList.findIndex(item => {
      return item.number_class === current.number_class && item.number_code === current.number_code
    })
    // const index = _.findIndex(state.betOddsList, {number_class: current.number_class, number_code: current.number_code})
    if (index > -1) {
      state.betOddsList.splice(index, 1)
    } else {
      current.amount = ''
      state.betOddsList.push(current)
      state.elLeft = elLeft
      state.elTarget = rect
    }
  },
  // 所有的彩种
  [types.LOTTERY_CLASSIFY_RECEIVE] (state, data) {
    state.lotteryClassify = data
  },
  // // 单彩种下的所有玩法
  // [types.LOTTERY_GAMES_RECEIVE] (state, data) {
  //   state.lotteryGames = data
  // },
  // 单彩种下的副标题
  [types.SWITCH_LOTTERY_CLASS] (state, data) {
    if (data.classify_code === 7) {
      lotterys.setLhcSubTitle(data)
    }
    // state.class_number = classNumber
    state.lotterySubList = data[0]._child
  },
  // 单彩种 => 单副标题 => 单玩法
  [types.CURRENT_GAMES_RECEIVE] (state, {data, type}) {
    state.currentGame = data
  },
  // 设置连码选中的值
  setBetlmChecked (state, {value, current}) {
    current.isCheck = value
  },
  // 设置赔率的值
  [types.SET_BETAREA_ODDS] (state, {id, value}) {
    _.forEach(state.currentGame, target => {
      const index = target.findIndex(current => {
        return id === (current.number_class + '' + current.number_code)
      })
      if (index > -1) {
        target[index].number_odds = value
        return false
      }
    })
  },
  // 下注
  [types.SUBMIT_BET_ODDS_STATUS] (state, status) {
    state.betOddsStatus = status
  },
  // 预设金额存储
  [types.PRESET_MONEY_RECEIVE] (state, value) {
    state.presetMoney = value
  },
  // 根据预设金额修改当前值
  [types.COUNT_MONEY] (state, {item, value}) {
    item.number_odds = value
  },
  // 清空预设金额
  [types.PRESET_MONEY_RECEIVE_CLEAR] (state) {
    state.presetMoney = ''
  },
  // 预设金额的状态
  [types.PRESET_MONEY_STATUS] (state, status) {
    state.presetStatus = status
  }
  // // 修改金额
  // [types.USER_BALANCE_UPDATE] (state, balance) {
  //   const data = store2.session.get('user_info')
  //   if (data) {
  //     data.data.userInfo.wallet.wallet_cash = balance
  //     store2.session.set('user_info', data)
  //   }
  //   state.userInfo.wallet.wallet_cash = balance
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}

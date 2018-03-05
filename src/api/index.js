import config from '../config'
import axios from 'axios'
// import qs from 'qs'
import store2 from 'store2'
import _ from 'lodash'
import { lotterys } from '@/utils/lotterys'
import { loginOut } from '@/utils'
import { querystring } from 'vux'

const alertHint = () => {
  window.__vueInstance__.$vux.toast.show({
    text: '登录超时, 请重新登录',
    type: 'warn',
    time: 1500
  })
  loginOut(window.__vueInstance__)
  window.__vueInstance__.$router.replace('/')
}

// config
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response 处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error)
})

// 检查请求状态
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else if (response.response && response.response.status === 400 && response.response.data.error === 'token_not_provided') {
    /* eslint-disable */
    alertHint()
  } else if (response.response && response.response.status === 401) {
    const res = response.response
    if (res.data.message === 'invalid_credentials') {
      window.__vueInstance__.$vux.toast.show({
        text: '用户名或密码错误',
      })
    } else if (res.data.message === 'Wrong number of segments') {
      alertHint()
    }
    // (response.response.status === 401 && response.response.data.message === 'Unauthorized')
    return false
  } else {
    // error.response = response.response
    // const error = new Error(response.statusText)
    return response.response
  }
}
// check code
const checkCode = (response) => {
  debugger
  if (response.status === 500) {

  } else if (response.status === 422) {

  }
  return response
}

// 解析参数
function _formatParams (method = 'GET', params) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store2.session.get('auth-token')
  }
  switch (method) {
    case 'POST':
    case 'PUT':
      return {
        headers,
        method,
        timeout: config.timeout,
        data: JSON.stringify(params)
      }
    case 'DELETE':
      return {
        headers,
        method,
        timeout: config.timeout
      }
    case 'GET':
      return {
        headers,
        timeout: config.timeout
      }
    default:
      return {
        headers,
        timeout: config.timeout
      }
  }
}
const api = {
  // 试玩
  guest (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/guest`
    })).then(checkStatus).then(checkCode)
  },
  // 登录
  login (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/login`
    })).then(checkStatus).then(checkCode)
  },
  // 验证用户名是否重复
  checkUserName (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/register/unique`
    })).then(checkStatus).then(checkCode)
  },
  // 注册
  regist (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/register`
    })).then(checkStatus).then(checkCode)
  },
  // 修改密码
  modifyPwd (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/password/reset`
    })).then(checkStatus).then(checkCode)
  },
  // 获取所有玩法的开奖时间和号码
  getLotteryTimer () {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/lottery/`
    })).then(checkStatus).then(checkCode)
  },
  // 根据玩法获取开奖时间
  getLotteryTimeByName (params) {
    // const result = store2.session.get(params.lottery)
    // if (result) {
    //   return Promise.resolve(result)
    // }
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/lottery/${params.lottery}`
    })).then(checkStatus).then(checkCode)
  },
  // 获取露珠的记录
  getLotteryRoundHistory (params) {
    return axios(_.assign({}, _formatParams(), {
      // url: `${config.api}/lottery/history/${params}`
      url: `${config.api}/lottery/history?lottery_class=${params.lottery_class}`
    })).then(checkStatus).then(checkCode)
  },
  // 获取单个玩法的标题
  getLotteryClassify (params) {
    const key = `${params.classifyName}_${lotterys.getIdByClassifyName(params.classifyName)}`
    if (lotterys.getClassifyCache(key)) {
      return Promise.resolve(lotterys.getClassifyCache(key))
    }
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/lottery/classify?lott_class=${lotterys.getIdByClassifyName(params.classifyName)}`
    })).then(checkStatus).then(checkCode)
  },
  // 获取单个玩法的所有游戏
  getGamesByClassNumber (params) {
    const name = lotterys.transformNameByClassNumber(params.class_number)
    if (lotterys.getGamesCache(name)) {
      return Promise.resolve(lotterys.getGamesCache(name))
    }
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/numbers?number_class=${params.class_number}`
    })).then(checkStatus).then(checkCode)
  },
  // 获取单种玩法
  getCurrentGamesByNumberClass (params) {
    const currentGameCache = lotterys.getCurrentGameCache(params.number_class)
    if (currentGameCache) {
      return Promise.resolve(currentGameCache)
    }
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/numbers?number_class=${params.number_class}`
    })).then(checkStatus).then(checkCode)
  },
  // 下注
  checkoutBetAreaOdds (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/bet/checkout`
    })).then(checkStatus).then(checkCode)
  },
  getBetslipUnsettled (params) {
    const cls = params && params.lottery_class && Number(params.lottery_class) !==0 ? `?lottery_class=${params.lottery_class}` : ''
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/betslip/unsettled?${cls}`
    })).then(checkStatus).then(checkCode)
  },
  getBetslipSettled (params) {
    const cls = params && params.lottery_class && Number(params.lottery_class) !==0 ? `?lottery_class=${params.lottery_class}` : ''
    console.log('cls==============' + cls)
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/betslip/settled${cls}`
    })).then(checkStatus).then(checkCode)
  },
  // 注单首页
  getBetslipReport (params) {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/betslip/unsettled`
    })).then(checkStatus).then(checkCode)
  },
  getBetslipInfo (params) {
    let options = params
    if (params.lottery_class === 0) {
      options = _.omit(params, ['lottery_class'])
    }
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/betslip/info?${querystring.stringify(options)}`
    })).then(checkStatus).then(checkCode)
  },
  getBetslipDetail (params) {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/betslip/detail?date=${params.date}&lottery_class=${params.lottery_class}&lottery_round=${params.lottery_round}`
    })).then(checkStatus).then(checkCode)
  },
  // 历史记录
  getLotteryHistory (params) {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/lottery/history?lottery_class=${params.lottery_class}`
    })).then(checkStatus).then(checkCode)
  },

  // 获取充值类型
  getRechargeType () {
    const data = store2.session.get('rechargeData')
    if (data) {
      return Promise.resolve(data)
    }
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/cashier/deposit`
    })).then(checkStatus).then(checkCode)
  },
  // 获取提现用户卡信息
  getWithdrawalType () {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/cashier/withdraw`
    })).then(checkStatus).then(checkCode)
  },
  // 获取充提交易记录
  getCashHistory (params) {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/cashier/history?page=${params.page}`
    })).then(checkStatus).then(checkCode)
  },
  // 提交充值信息
  submitRechargeData (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/cashier/deposit`
    })).then(checkStatus).then(checkCode)
  },
  submitWithdrawalData (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/cashier/withdraw`
    })).then(checkStatus).then(checkCode)
  },
  submitHistoryData (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/cashier/history`
    })).then(checkStatus).then(checkCode)
  },
  // 请求公告
  getMarquees () {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/marquee`
    })).then(checkStatus).then(checkCode)
  },
  // 更新token
  refreshToken () {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/authenticate/refresh`
    })).then(checkStatus).then(checkCode)
  },
  // 获取银行卡列表
  getBanks () {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/card/list`
    })).then(checkStatus).then(checkCode)
  },
  // 新增银行卡
  addBanks (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/card/create`
    })).then(checkStatus).then(checkCode)
  },
  // 获取单个银行卡
  getBankById (params) {
    return axios(_.assign({}, _formatParams(), {
      url: `${config.api}/card/edit/${params.id}`
    })).then(checkStatus).then(checkCode)
  },
  // 删除单个
  deleteBankById (params) {
    return axios(_.assign({}, _formatParams('DELETE'), {
      url: `${config.api}/card/destroy/${params.id}`
    })).then(checkStatus).then(checkCode)
  },
  // 修改银行卡
  updateBank (params) {
    return axios(_.assign({}, _formatParams('PUT', params), {
      url: `${config.api}/card/update/${params.card_id}`
    })).then(checkStatus).then(checkCode)
  },
  // 验证提现密码
  validateWalletPwd (params) {
    return axios(_.assign({}, _formatParams('POST', params), {
      url: `${config.api}/user/password/wallet`
    })).then(checkStatus).then(checkCode)
  },
  // 修改提现密码
  modifyWithDrawPwd (params) {
    return axios(_.assign({}, _formatParams('PUT', params), {
      url: `${config.api}/user/password/wallet/reset`
    })).then(checkStatus).then(checkCode)
  }
}
export default api

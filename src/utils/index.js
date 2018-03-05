import store2 from 'store2'
import _ from 'lodash'
/**
 * // 根据相对路径生成绝对路径
 * @param {*图片的相对路径} url
 */
const resolveImgPath = (url) => {
  return require(url)
}

// 返回首页，清空session
/**
 * @param {*vue实例} self
 */
const loginOut = (self) => {
  store2.session.remove('identifier')
  store2.session.remove('auth-token')
  store2.session.remove('user-info')
  self.$store.commit('user_info_receive')
}
const getCurrentLotCode = (lotCode) => {
  switch (lotCode) {
    case 10001:
      return 'pk10'
    case 10002:
      return 'cqssc'
    case 10003:
      return 'xyft'
    case 10004:
      return 'pcdd'
    case 10005:
      return 'cqxync'
    case 10006:
      return 'gdklsf'
    case 10007:
      return 'marksix'
    default:
      return 'pk10'
  }
}
/**
 * @param {*支付的信息} data
 * @param {*当前的支付方式id} id
 * @param {*线上or线下} isOnline
 */
const parseCurrentPayInfo = (data, id, isOnline) => {
  if (data) {
    return _.filter(data[id], item => item.is_online === isOnline)
  }
  return []
}

/**
 * @param {*支付的信息} data
 * @param {*当前的支付方式id} id
 * @param {*线上or线下} isOnline
 * @param {*当前银行卡id} currentBankId
 */
const parseCurrentBankInfo = (data, id, isOnline, currentBankId) => {
  const current = parseCurrentPayInfo(data, id, isOnline)
  if (current.length > 0) {
    const obj = _.find(current, item => item.detail.offline_bank_id === currentBankId)
    if (obj) {
      return obj
    }
  }
  return ''
}
export {resolveImgPath, loginOut, getCurrentLotCode, parseCurrentPayInfo, parseCurrentBankInfo}

const BetRecordIndex = () => import('@/pages/BetRecord')
const BetRecordUnsettled = () => import('@/pages/BetRecord/unsettled')
const BetRecordSettled = () => import('@/pages/BetRecord/settled')
const BetRecordDetail = () => import('@/pages/BetRecord/detail')

export default [
  {
    path: '/betrecord',
    name: 'bet_record',
    component: BetRecordIndex,
    meta: {keepAlive: true}
  },
  {
    path: '/betrecord/settled/:date/:lottery_class',
    name: 'bet_record_settled',
    component: BetRecordSettled,
    meta: {keepAlive: true}
  },
  {
    path: '/betrecord/unsettled',
    name: 'bet_record_unsettled',
    component: BetRecordUnsettled,
    meta: {keepAlive: true}
  },
  {
    path: '/betrecord/detail/:date/:lottery_class/:lottery_round',
    name: 'bet_record_detail',
    component: BetRecordDetail,
    meta: {keepAlive: false}
  }
]

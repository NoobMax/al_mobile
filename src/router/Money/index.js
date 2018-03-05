const MoneyRecharge = () => import('@/pages/MoneyMan/money_recharge')
const MoneyWithdraw = () => import('@/pages/MoneyMan/money_withdraw')
const MoneyHistory = () => import('@/pages/MoneyMan/money_history')

export default [
  {
    path: '/money/recharge',
    name: 'money_recharge',
    component: MoneyRecharge
  },
  {
    path: '/money/withdraw',
    name: 'money_withdraw',
    component: MoneyWithdraw
  },
  {
    path: '/money/history',
    name: 'money_history',
    component: MoneyHistory
  }
]

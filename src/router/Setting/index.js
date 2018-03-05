const SetIndex = () => import('@/pages/Setting/index')
const SetLoginPwd = () => import('@/pages/Setting/loginPwd')
const SetPayPwd = () => import('@/pages/Setting/payPwd')

export default [
  {
    path: '/setting',
    component: SetIndex,
    name: 'setIndex',
    meta: {title: '设置'}
  },
  {
    path: '/setting/login_pwd',
    component: SetLoginPwd,
    name: 'setLoginPwd',
    meta: {title: '登录密码设置'}
  },
  {
    path: '/setting/pay_pwd',
    component: SetPayPwd,
    name: 'setPayPwd',
    meta: {title: '支付密码设置'}
  }
]

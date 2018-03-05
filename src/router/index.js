import Vue from 'vue'
import Router from 'vue-router'
import HomeRoute from '@/pages/Home/home-route'
import Home from '@/pages/Home/home'
import Lottery from '@/pages/Lottery'
import Find from '@/pages/Find'
import User from '@/pages/User'
import MoneyIndex from '@/pages/MoneyMan'
import MoneyRoute from './Money'
import BetAreaChild from './BetArea'
import setIndex from './Setting'
import BetRecordIndex from './BetRecord'
const MoneyRechargeOnline = () => import('@/pages/MoneyMan/money_recharge_online')
const MoneyRechargeOffline = () => import('@/pages/MoneyMan/money_recharge_offline')
const MoneyOnlineFinish = () => import('@/pages/MoneyMan/money_online_finish')
const MoneyOfflineFinish = () => import('@/pages/MoneyMan/money_offline_finish')
const Banks = () => import('@/pages/Banks')
const BanksAdd = () => import('@/pages/Banks/bank_add')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const LotteryDetail = () => import('@/pages/Lottery/lottery_route')
const BetAreaRoute = () => import('@/pages/BetArea')
const SetRoute = () => import('@/pages/Setting/setRoute')
const UserDetails = () => import('@/pages/User/details')
const BetRecordRoute = () => import('@/pages/BetRecord/betRecord_route')
Vue.use(Router)

/* eslint-disable */
export default [
    {
      path: '/',
      component: HomeRoute,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {keepAlive: true}
        },
        {
          path: '/lottery',
          name: 'lottery',
          component: Lottery,
          meta: {keepAlive: false}
        },
        {
          path: '/find',
          name: 'find',
          component: Find,
          meta: {keepAlive: true}
        },
        {
          path: '/user',
          name: 'user',
          component: User,
          meta: {keepAlive: true}
        }
      ]
    },
    {
      path: '/lottery/:id',
      name: 'lottery_detail',
      component: LotteryDetail
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/register',
      component: Register,
      name: 'regist'
    },
    {
      path: '/money/recharge',
      component: MoneyIndex,
      children: MoneyRoute
    },
    {
      path: '/money/recharge/online/:id',
      name: 'money_recharge_onlie',
      component: MoneyRechargeOnline
    },
    {
      path: '/money/recharge/online/:id/finish',
      name: 'money_onlie_finish',
      component: MoneyOnlineFinish
      // beforeEnter: (to, from, next) => {
      //   if (from.name !== 'money_recharge_onlie') {
      //     next(to.fullPath.substr(0, to.fullPath.lastIndexOf('/')))
      //   }else {
      //     next()
      //   }
      // }
    },
    {
      path: '/money/recharge/offline',
      name: 'money_recharge_offline',
      component: MoneyRechargeOffline
    },
    {
      path: '/money/recharge/offline/finish',
      name: 'money_offline_finish',
      component: MoneyOfflineFinish
    },
    {
      path: '/banks',
      name: 'banks',
      component: Banks
    },
    {
      path: '/banks/add',
      name: 'banks_add',
      component: BanksAdd
    },
    {
      path: '/games',
      component: BetAreaRoute,
      children: BetAreaChild
    },
    {
      path: '/setting',
      component: SetRoute,
      children: setIndex
    },
    {
      path: '/user/info',
      component: UserDetails,
      name: 'user_details'
    },
    {
      path: '/betrecord',
      component: BetRecordRoute,
      children: BetRecordIndex
    }
  ]

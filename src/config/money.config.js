export const moneyTabList = [
  {
    url: '/money/recharge',
    title: '充值',
    query: 'money_recharge'
  },
  {
    url: '/money/withdraw',
    title: '提现',
    query: 'money_withdraw'
  },
  {
    url: '/money/history',
    title: '记录',
    query: 'money_history'
  }
]
export const onlinePayList = [
  {
    url: '/money/recharge/online/0',
    icon: require('../assets/images/money/banks_pay.png'),
    title: '网银支付',
    isLink: true
  },
  {
    url: '/money/recharge/online/2',
    icon: require('../assets/images/money/ali_pay.png'),
    title: '支付宝支付',
    isLink: true
  },
  {
    url: '/money/recharge/online/3',
    icon: require('../assets/images/money/wechat_pay.png'),
    title: '微信支付',
    isLink: true
  },
  {
    url: '/money/recharge/online/4',
    icon: require('../assets/images/money/qq_pay.png'),
    title: 'QQ钱包',
    isLink: true
  },
  {
    url: '/money/recharge/online/5',
    icon: require('../assets/images/money/ten_pay.png'),
    title: '财付通',
    isLink: true
  }
]

export const offlinePayList = [
  {
    url: '/money/recharge/offline?type=1&tag=offlineBanks',
    icon: require('../assets/images/money/company_pay.png'),
    title: '公司入款',
    isLink: true
  }
]

export const bankList = [
  {
    key: 1,
    value: '中国银行',
    swift: 'BANK_BOC',
    icon: require('../assets/images/bank/zgyh.png')
  },
  {
    key: 2,
    value: '工商银行',
    swift: 'BANK_ICBC',
    icon: require('../assets/images/bank/gsyh.png')
  },
  {
    key: 3,
    value: '建设银行',
    swift: 'BANK_CCB',
    icon: require('../assets/images/bank/jsyh.png')
  },
  {
    key: 4,
    value: '交通银行',
    swift: 'BANK_BCM',
    icon: require('../assets/images/bank/jtyh.png')
  },
  {
    key: 5,
    value: '招商银行',
    swift: 'BANK_CMB',
    icon: require('../assets/images/bank/zsyh.png')
  },
  {
    key: 6,
    value: '农业银行',
    swift: 'BANK_ABC',
    icon: require('../assets/images/bank/nyyh.png')
  },
  {
    key: 7,
    value: '民生银行',
    swift: 'BANK_CMBC',
    icon: require('../assets/images/bank/msyh.png')
  },
  {
    key: 8,
    value: '光大银行',
    swift: 'BANK_CEB',
    icon: require('../assets/images/bank//gdyh.png')
  },
  {
    key: 9,
    value: '中信银行',
    swift: 'BANK_CCB',
    icon: require('../assets/images/bank/zxyh.png')
  },
  {
    key: 11,
    value: '浦发银行',
    swift: 'BANK_SPDB',
    icon: require('../assets/images/bank/pfyh.png')
  },
  {
    key: 15,
    value: '邮政银行',
    swift: 'BANK_PSBC',
    icon: require('../assets/images/bank/zgyz.png')
  }
]

export const offlineReList = [
  {
    id: 1,
    path: '/money/recharge?type=1',
    title: '银行转账',
    query: 'offlineBanks'
  },
  {
    id: 2,
    path: '/money/recharge?type=2',
    title: '支付宝',
    query: 'offlineAliPay'
  },
  {
    id: 3,
    path: '/money/recharge?type=3',
    title: '微信支付',
    query: 'offlineWechat'
  },
  {
    id: 4,
    path: '/money/recharge?type=4',
    title: '财付通',
    query: 'offlineTenPay'
  }
]

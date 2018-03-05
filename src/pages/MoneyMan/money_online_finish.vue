<template>
  <div class="money-wrapper">
    <x-header title="充值管理" class="mobile-header__default" />
    <div class="vux-1px-b">
      <money-online-header :head-info="setHeadInfo" />
    </div>
    <template>
      <div class="money-finish__content">
        <money-success :money-info="moneyInfo"></money-success>
      </div>
     <!--  <div class="money-finish__footer">
        长按二维码保存到本地，然后扫描此二维码
      </div> -->
    </template>
  </div>
</template>
<script>
import {XHeader} from 'vux'
import moneySuccess from '@/components/Money/money-success'
import moneyOnlineHeader from '@/components/Money/money-online-header'
import _ from 'lodash'
import store2 from 'store2'
export default {
  components: {
    moneyOnlineHeader,
    moneySuccess,
    XHeader
  },
  data () {
    return {
      currentType: 1,
      moneyInfo: {}
    }
  },
  computed: {
    setHeadInfo () {
      return this.getCurrentPay(this.currentType)
    }
  },
  methods: {
    getCurrentPay (onlineId) {
      switch (onlineId) {
        case 1:
          return {
            text: '在线支付',
            word: 'Online Payment',
            img: require('../../assets/images/money/bank_big.png')
          }
        case 2:
          return {
            text: '支付宝',
            word: 'ALIPAY',
            img: require('../../assets/images/money/ali_big.png')
          }
        case 3:
          return {
            text: '微信支付',
            word: 'WECHAT',
            img: require('../../assets/images/money/wechat_big.png')
          }
        case 4:
          return {
            text: 'QQ支付',
            word: 'QQPAY',
            img: require('../../assets/images/money/qq_big.png')
          }
        case 5:
          return {
            text: '财付通',
            word: 'TENPAY',
            img: require('../../assets/images/money/ten_pay.png')
          }
      }
    }
  },
  created () {
    if (_.isEmpty(_.omitBy(this.$route.params, item => !item.id))) {
      this.moneyInfo = _.assign({}, store2.session.get('money-info'))
    } else {
      this.moneyInfo = _.assign({}, this.$route.params)
    }
    this.currentType = Number(this.$route.params.id) || 1
  }
}
</script>


<template>
  <div class="money-root__header">
      <div class="money-root__header-left">
        <p>账户余额</p>
        <span>￥{{setMoney}}</span>
      </div>
      <div class="money-root__header-right">
        <p>可提余额</p>
        <span>￥{{setUseMoney}}</span>
      </div>
    </div>
</template>
<script>
import numeral from 'numeral'
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setMoney () {
      return numeral(Number(this.userInfo.wallet && this.userInfo.wallet.wallet_cash) + Number(this.userInfo.wallet && this.userInfo.wallet.wallet_cash_bonus)).format('0,0.00')
    },
    setUseMoney () {
      const {userInfo} = this
      return userInfo.wallet && !userInfo.is_guest ? numeral(userInfo.wallet.wallet_cash).format('0,0.00') : '0.00'
    }
  },
  created () {
    console.log(this.userInfo)
  }
}
</script>

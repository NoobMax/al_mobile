<template>
  <div class="mobile-user__info-content">
    <div class="mobile-user__info vux-1px-t" @click="$router.push('/user/info')">
      <div class="mobile-user__info-left">
        <img v-lazy="require('../../assets/images/user/F01.png')" alt="">
      </div>
      <div class="mobile-user__info-body">
        <div class="user-info__body-username">
          <p class="username">{{userInfo && !userInfo.is_guest ? userInfo.user_name : '游客'}}</p><p class="userstatus">白金VIP</p>
        </div>
        <div class="user-info__body-phone">
          <span>{{'暂无'}}</span>
        </div>
      </div>
      <div class="mobile-user__info-right">
        <div class="mobile-ft"></div>
      </div>
    </div>
    <div class="mobile-user__money">
      <div class="mobile-user__money-balance">
        <div class="user-money__balance-current">
          <h4>账号余额</h4>
          <p>￥{{setBalance}}</p>
        </div>
        <div class="user-money__balance-btn" @click="$router.push('/money/recharge')">
          我要充值
        </div>
      </div>
      <div class="mobile-user__money-withdraw">
        <div class="user-money__withdraw-current">
          <h4>可提余额</h4>
          <p>￥{{setWithoutBalance}}</p>
        </div>
        <div class="user-money__withdraw-btn" @click="$router.push('/money/withdraw')">
          我要提现
        </div>
      </div>
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
    setBalance () {
      const {userInfo} = this
      if (userInfo && userInfo.wallet) {
        return numeral(Number(userInfo.wallet.wallet_cash) + Number(userInfo.wallet.wallet_cash_bonus)).format('0,000.00')
      }
    },
    setWithoutBalance () {
      const {userInfo} = this
      if (userInfo && !userInfo.is_guest && userInfo.wallet) {
        return numeral(Number(userInfo.wallet.wallet_cash)).format('0,000.00')
      }
      return '0.00'
    }
  }
}
</script>


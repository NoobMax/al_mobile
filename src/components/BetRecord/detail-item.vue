<template>
  <div class="detail-item">
    <div class="detail-item__heading vux-1px-b">
      <span>注单号：{{current.betslip_id}}</span>
      <p :class="setTitle">{{isSettled ? '已结' : '未结'}}</p>
    </div>
    <div class="detail-item__body">
      <div class="detail-item__body-title">
        <span>{{current && current.betslip_info && current.betslip_info.number_info.class}}：</span>
        <span>第{{' ' +current.betslip_round + ' '}}期</span>
      </div>
      <div class="detail-item__body-lottery">
        <span>游戏玩法：</span>
        <span>{{setLottery}}</span>
      </div>
      <div class="detail-item__body-time">
        <span>下注时间：</span>
        <span>{{current.betslip_created_at}}</span>
      </div>
      <div class="detail-item__body-money">
        <span>下注金额：</span>
        <p>{{setAmount}}</p>
      </div>
      <div class="detail-item__body-amt" v-if="!isSettled">
        <span>可赢金额：</span>
        <p>{{setBetslipAmt}}</p>
      </div>
      <div class="detail-item__body-rebate" v-else>
        <span>下注退水：</span>
        <p>{{setRebate}}</p>
      </div>
    </div>
    <div class="detail-item__footer vux-1px-t" v-if="isSettled">
      <span>最后金额：</span>
      <p :class="setResultsClass">{{setResultsTotal}}</p>
    </div>
  </div>
</template>
<script>
import numeral from 'numeral'
// import _ from 'lodash'
export default {
  props: {
    isSettled: {
      type: Boolean,
      default: true
    },
    current: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setTitle () {
      return this.isSettled ? 'is-settled' : 'is-unsettled'
    },
    setLottery () {
      const {current} = this
      if (current && current.betslip_info) {
        const betslipInfo = current.betslip_info
        return `${betslipInfo.number_info.type[0]}-${betslipInfo.number_info.type[1]}@${betslipInfo.odds}`
      }
      return ''
    },
    setResultsTotal () {
      const {current} = this
      if (current.betslip_is_win === 0) {
        return numeral(-Number(current.betslip_amt) + Number(current.betslip_rebate)).format('+0,0.00')
      }
      return numeral(Number(current.betslip_amt_available) + Number(current.betslip_rebate)).format('+0,0.00')
    },
    setRebate () {
      const {current} = this
      return numeral(current.betslip_rebate).format('+0,0.00')
    },
    // 输赢
    setResults () {
      const {current} = this
      return numeral(current.betslip_result).format('+0,0.00')
    },
    // 可赢
    setBetslipAmt () {
      const {current} = this
      return numeral(current.betslip_amt).format('+0,0.00')
    },
    // 总注额
    setAmount () {
      const {current} = this
      return numeral(current.betslip_amt).format('0,0.00')
    },
    setResultsClass () {
      if (this.current && this.current.betslip_is_win === 0) {
        return 'is-low'
      }
      return 'is-win'
    }
  }
}
</script>


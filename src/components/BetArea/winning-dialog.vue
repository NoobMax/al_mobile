<template>
<div class="hint-dialog__wrapper" :class="modalShow ? 'is-show' : ''">
  <div class="hint-dialog">
    <div class="winning-dialog__heading">
        <img v-lazy="require('../../assets/images/lottery/TOP.png')" alt="">
    </div>
    <div class="winning-dialog__body">
      <div class="winning-dialog__body-heading">
        <p>{{current.lottery_class}}</p>
        <span>第{{current.round_current}}期</span>
      </div>
      <div class="winning-dialog__body-content">
        <div class="lottery-class__body-round" ref="roundBall">
          <template v-for="(i, key) in current.numbers">
            <div class="rect-default-ball" :class="setBallColor(i, key)"  >{{i}}</div>
            <span><span>{{key | setSymbolShow(current.numbers, lotteryId)}}</span></span>
            <span v-show="setEqual(key)">{{' = '}}</span>
            <div v-show="setEqual(key)" class="rect-default-ball ball-result">{{setSum}}</div>
          </template>
        </div>
      </div>
      <div class="winning-dialog__body-foot">
        <div class="lottery-class__footer-number">
          <span>上期：</span>
          <div v-for="i in current.formulas && current.formulas[0]">{{i}}</div>
        </div>
        <div v-if="current.formulas && current.formulas[1]" class="round-driver"></div>
        <div class="lottery-class__footer-result" v-show="current.formulas && current.formulas[1]">
          <span>总和：</span>
          <div v-for="i in current.formulas && current.formulas[1]">{{i}}</div>
        </div>
      </div>
    </div>
    <div class="winning-dialog__total">
      <div class="winning-total__amt vux-1px-t vux-1px-b">
        <p><i-count-up
              :start="0"
              :end="setResult"
              :decimals="2"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up></p>
        <span>最终结果</span>
      </div>
      <div class="winning-total__money vux-1px-b">
        <div class="winning-money__amt">
          <p><i-count-up
              :start="0"
              :end="setAmt"
              :decimals="2"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up></p>
          <span>投注金额</span>
        </div>
        <div class="winning-money__win vux-1px-l vux-1px-r">
          <p> <i-count-up
              :start="0"
              :end="setBet"
              :decimals="2"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up></p>
          <span>本期输赢</span>
        </div>
        <div class="winning-money__rebate">
          <p>
            <i-count-up
              :start="0"
              :end="setRebate"
              :decimals="2"
              :duration="2.5"
              :options="options"
              :callback="callback"
            ></i-count-up></p>
          <span>本期退水</span>
        </div>
      </div>
    </div>
    <div class="winning-dialog__footer">
      <div class="mobile-btn__inline-group">
        <button class="btn-inline__default btn-primary" @click="$router.push('/lottery')">订单详情</button>
        <button class="btn-inline__default btn-success" @click="close">知道了</button>
      </div>
    </div>
  </div>
  <div class="hint-dialog__mask" @click="close" @touchmove.stop.prevent></div>
</div>
</template>
<script>
import _ from 'lodash'
// import numeral from 'numeral'
import ICountUp from 'vue-countup-v2'
export default {
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    current: {
      type: Object,
      default: () => {}
    },
    lotteryId: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  components: {
    ICountUp
  },
  filters: {
    setSymbolShow (i, numbers, activeId) {
      const len = numbers.length
      if ((activeId === 4 && i < len - 1) || (activeId === 7 && i === len - 2)) {
        return '+'
      }
      return ''
    }
  },
  computed: {
    setSum () {
      const roundNumbers = this.current.round_numbers_prev
      if (roundNumbers) {
        return _.sum(roundNumbers.numbers)
      }
      return ''
    },
    setResult () {
      // const value = numeral(this.current.win_total + this.current.betslip_rebate_total).format('+0,0.00')
      return Number(this.current.win_total + this.current.betslip_rebate_total)
    },
    // 投注
    setAmt () {
      // const value = numeral(this.current.betslip_amt_total).format('0,0.00')
      return Number(this.current.betslip_amt_total)
    },
    // 输赢
    setBet () {
      // const value = numeral(this.current.win_total).format('+0,0.00')
      console.log(this.current.win_total)
      return Number(this.current.win_total)
    },
    // 退水
    setRebate () {
      // const value = numeral(this.current.betslip_rebate_total).format('+0,0.00')
      console.log(this.current.betslip_rebate_total)
      return Number(this.current.betslip_rebate_total)
    }
  },
  methods: {
    callback (ins) {
      if (ins) {
        ins.update(ins.endVal)
      }
    },
    close () {
      this.$emit('close-handle')
    },
    register () {
      this.$router.push('/register')
      this.$emit('close-handle')
    },
    setEqual (i) {
      const len = this.current.round_numbers_prev && this.current.round_numbers_prev.numbers.length
      return this.lotteryId === 4 && len === i + 1
    },
    // 设置 + 或者 = 的显示
    setSymbolShow (i) {
      if ((this.lotteryId === 4 && i < 4) || (this.lotteryId === 7 && i === 3)) {
        return true
      }
      return false
    },
    setSymbol (i) {
      if (this.lotteryId === 4 && i > 2) {
        return '='
      }
      return '+'
    },
    // 设置球 的颜色
    setBallColor (i, key) {
      const len = this.current.round_numbers_prev && this.current.round_numbers_prev.numbers.length
      if (len > 0) {
        if (this.lotteryId === 1 || this.lotteryId === 3) {
          return `ball-${i}`
        }
        if (this.lotteryId === 7 && key === len - 1) {
          return 'ball-result'
        }
      }
      return ''
    }
  },
  mounted () {
    // this.countUp = this.initCountUp({
    //   target: '.winning-money__rebate p',
    //   start: 0,
    //   value,
    //   decimals: 2,
    //   duration: 2.5
    // })
  }
}
</script>



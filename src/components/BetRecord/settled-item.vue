<template>
  <div class="settled-item" @click="itemClick">
    <div class="settled-item__left">
      <div>
        <img v-lazy="setImg" alt="">
      </div>
    </div>
    <div class="settled-item__right">
      <div class="settled-item__right-heading">
        <div class="settled-right__heading-title">{{setSettledClass}}</div>
        <div class="settled-right__heading-round">{{current.betslip_info && current.betslip_info.betslip_round + ' '}}期</div>
        <div class="settled-right__heading-time">18:22</div>
      </div>
      <div class="settled-item__right-body">
        <div class="settled-right__body-left">
          注数：{{current.betslip_total}}注
        </div>
        <div class="settled-right__body-right">
          注额：{{setAmount}}
        </div>
      </div>
      <template v-if="isSettled">
      <div class="settled-item__right-body">
        <div class="settled-right__body-left">
          输赢：{{setResults}}
        </div>
        <div class="settled-right__body-right">
          退水：{{setRebate}}
        </div>
      </div>
      <div class="settled-item__right-footer">
        <div class="settled-right__footer-left">
          结果：<span :class="setResultsClass">{{setResultsTotal}}</span>
        </div>
      </div>
      </template>
      <div class="settled-item__right-footer" v-else>
        <div class="settled-right__footer-left">
          可赢：{{setBetslipAmt }}
        </div>
        <div class="settled-right__footer-right">
          未结
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {menuList} from '@/config/home.config'
import numeral from 'numeral'
import _ from 'lodash'
import mixins from './mixin'
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
  mixins: [mixins],
  computed: {
    setSettledClass () {
      /* eslint-disable */
      const {betslip_info} = this.current
      if (betslip_info) {
        return betslip_info.betslip_class.includes('(') ? betslip_info.betslip_class.substr(0, betslip_info.betslip_class.indexOf('(')) : betslip_info.betslip_class
      }
    },
    setResultsTotal () {
      const {current} = this
      return numeral(current.betslip_result + current.betslip_rebate).format('+0,0.00')
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
    setImg () {
      const {current} = this
      if (current && current.betslip_info) {
        const item = _.find(menuList, item => item.id === current.betslip_info.betslip_code)
        return item ? item.smImg : ''
      }
      return ''
    },
    setResultsClass () {
      if (this.current && this.current.betslip_result < 0) {
        return 'is-low'
      }
      return 'is-win'
    }
  },
  methods: {
    itemClick () {
      this.$emit('click-handle', this.current)
    }
  }
}
</script>


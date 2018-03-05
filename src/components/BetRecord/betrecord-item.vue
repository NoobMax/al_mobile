<template>
  <div class="betrecord-item" @click="itemClick">
    <div class="betrecord-item__heading vux-1px-b">
      <div class="betrecord-item__heading-left">
        <div>
          <img v-lazy="setImg" alt="">
        </div>
        <span v-if="isSettled">{{current.date}}</span>
      </div>
      <div class="betrecord-item__heading-right">
        <span :class="setTitleClass">{{setTitle}}</span>
      </div>
    </div>
    <div class="betrecord-item__body">
      <div class="betrecord-item__body-numbers betrecord-body__item">
        <span>总注数：</span>
        <h4>{{current.count || 0}}</h4>
      </div>
      <div class="betrecord-item__body-money betrecord-body__item">
        <span>总注额：</span>
        <h4>{{setAmount}}元</h4>
      </div>
      <div class="betrecord-item__body-money betrecord-body__item" v-if="!isSettled">
        <span>可赢金额：</span>
        <h4>{{setBetslipAmt}}元</h4>
      </div>
      <template v-else>
        <div class="betrecord-item__body-win betrecord-body__item">
          <span>输赢：</span>
          <h4>{{setResults}}元</h4>
        </div>
        <div class="betrecord-item__body-amt betrecord-body__item">
          <span>退水：</span>
          <h4>{{setRebate}} 元</h4>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {menuList} from '@/config/home.config'
import numeral from 'numeral'
import _ from 'lodash'
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
    setRebate () {
      const {current} = this
      return numeral(current.rebate).format('+0,0.00')
    },
    // 输赢
    setResults () {
      const {current} = this
      return numeral(current.results).format('+0,0.00')
    },
    // 可赢
    setBetslipAmt () {
      const {current} = this
      return numeral(current.betslip_amt).format('+0,0.00')
    },
    // 总注额
    setAmount () {
      const {current} = this
      return numeral(current.amount).format('0,0.00')
    },
    // 设置标题样式
    setTitleClass () {
      if (this.isSettled) {
        if (this.current.results < 0) {
          return 'is-low'
        }
        return 'is-win'
      }
      return 'is-unsettled'
    },
    setTitle () {
      return this.isSettled ? numeral(this.current.results).format('+0,0.00') : '未结'
    },
    setImg () {
      if (this.$route.query.lottery_class && Number(this.$route.query.lottery_class) !== 0) {
        const current = _.find(menuList, item => item.id === Number(this.$route.query.lottery_class))
        return current ? current.smImg : ''
      }
      return this.isSettled ? require('../../assets/images/home/all_se.png') : require('../../assets/images/home/all_un.png')
    }
  },
  methods: {
    itemClick () {
      this.$emit('click-handle', this.current, this.isSettled)
    }
  }
}
</script>


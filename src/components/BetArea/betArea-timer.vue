<template>
  <div class="betArea-round__info">
    <div class="betArea-round__info-time vux-1px-b">
      <div class="round-info__img">
        <img v-lazy="setImg" alt="">
      </div>
      <div class="round-info__periods">
        <h4>第 {{current.round_current}} 期</h4>
        <p>余额: <span>￥{{setMoney}}元</span></p>
      </div>
      <div class="round-info__clock">
        <countdown :emit-events="false" :time="setClockTime" ref="countdown" @countdownend="countdownend" @countdownprogress="countdownprogress">
            <template slot-scope="props"><clock  :hours="props.hours" :hoursShow="setHoursShow" :minutes="props.minutes" :seconds="props.seconds"/></template>
        </countdown>
      </div>
    </div>
    <div class="betArea-round__info-numbers">
      <div class="round-info__heading-group">
        <div class="round-info__heading">
          <template  v-for="(i, key) in current.round_numbers_prev && current.round_numbers_prev.numbers">
            <div class="round-heading__number" v-show="current.round_numbers_prev && current.round_numbers_prev.numbers.length > 0">
              <div class="rect-default-ball" :class="setBallColor(i,key)" >{{i}}</div>
              <span>{{key | setSymbolShow(current.round_numbers_prev, activeId)}}</span>
              <div v-show="setEqual(key)" class="number-equal">
                <span>{{' = '}}</span>
                <div class="rect-default-ball ball-result">{{setSum}}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="round-heading__periods mobile-ft is-down">
          近期
        </div>
      </div>
      <div class="round-info__body">
        <div class="round-info__body-number">
          <span>上期：</span>
          <div v-for="i in current.round_numbers_prev && current.round_numbers_prev.formulas[0]">{{i}}</div>
        </div>
        <div v-if="current.round_numbers_prev && current.round_numbers_prev.formulas[1]" class="round-driver">|</div>
        <div class="round-info__body-result" v-show="current.round_numbers_prev && current.round_numbers_prev.formulas[1]">
          <span>总和：</span>
          <div v-for="i in current.round_numbers_prev && current.round_numbers_prev.formulas[1]">{{i}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import numeral from 'numeral'
import {menuList} from '@/config/home.config'
import clock from '@/components/common/clock'
import Vue from 'vue'
import VueCountdown from '@xkeshi/vue-countdown'
Vue.component('countdown', VueCountdown)
export default {
  components: {
    clock
  },
  props: {
    activeId: {
      type: Number,
      default: 1
    },
    current: {
      type: Object,
      default: () => {}
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setMoney () {
      const {userInfo} = this
      return numeral(Number(userInfo.wallet && userInfo.wallet.wallet_cash) + Number(userInfo.wallet && userInfo.wallet.wallet_cash_bonus)).format('0,0.00')
    },
    setImg () {
      const current = _.find(menuList, item => item.id === this.activeId)
      return current ? current.smImg : ''
    },
    setSum () {
      const roundNumbers = this.current.round_numbers_prev
      if (roundNumbers) {
        return _.sum(roundNumbers.numbers)
      }
      return ''
    },
    setHoursShow () {
      return this.activeId === 7
    },
    setClockTime () {
      if (this.current && !isNaN(Number(this.current.current_time))) {
        console.log('aaaa')
        return this.current.current_time * 1000
      }
      return 100
    }
  },
  filters: {
    setSymbolShow (i, current, activeId) {
      const len = current ? current.numbers.length : 0
      if ((activeId === 4 && i < len - 1) || (activeId === 7 && i === len - 2)) {
        return '+'
      }
      return ''
    }
  },
  methods: {
    // 时间走的时候调用
    countdownprogress (item) {
      // console.log(item)
    },
    // 时间停止的时候调用
    countdownend (item) {
      console.log(item)
      // this.$store.commit('round_next_data_receive', {current: this.current, id: this.activeId})
      this.$nextTick(() => {
        this.$refs.countdown.start()
      })
    },
    setEqual (i) {
      const len = this.current.round_numbers_prev && this.current.round_numbers_prev.numbers.length
      return this.activeId === 4 && len - 1 === i
    },
    setBallColor (i, key) {
      const len = this.current.round_numbers_prev && this.current.round_numbers_prev.numbers.length
      const {name} = this.$route
      if (len > 0) {
        if (name === 'pk10' || name === 'xyft') {
          return `ball-${i} circle-default-ball`
        }
        if (name === 'marksix' && key === len - 1) {
          return 'ball-result rect-default-ball'
        }
      }
      return 'rect-default-ball'
    }
  }
}
</script>


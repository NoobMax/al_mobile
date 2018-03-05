<template>
  <group class="lottery-class-current">
    <div class="lottery-class-item" @click="itemClick">
      <div class="lottery-class-item__heading">
        <h4>{{setTitle}}</h4>
        <p>第{{current.round_current}}期</p>
      </div>
      <div class="lottery-class-item__body">
        <div class="lottery-class__body-round" ref="roundBall">
          <template v-for="(i, key) in current.round_numbers_prev && current.round_numbers_prev.numbers">
            <div :class="setBallColor(i, key)"  >{{i}}</div>
            <span><span>{{key | setSymbolShow(current.round_numbers_prev, lotteryId)}}</span></span>
            <span v-show="setEqual(key)">{{' = '}}</span>
            <div v-show="setEqual(key)" class="rect-default-ball ball-result">{{setSum}}</div>
          </template>
        </div>
        <div class="lottery-class__body-clock">
          <countdown :emit-events="false" :time="setClockTime" ref="countdown" @countdownend="countdownend" @countdownprogress="countdownprogress">
            <template slot-scope="props"><clock  :hours="props.hours" :hoursShow="setHoursShow" :minutes="props.minutes" :seconds="props.seconds"/></template>
        </countdown>
          <!-- <clock :time="current.current_time"/> -->
        </div>
      </div>
      <div class="lottery-class-item__footer">
        <div class="lottery-class__footer-number">
          <span>上期：</span>
          <div v-for="i in current.round_numbers_prev && current.round_numbers_prev.formulas[0]">{{i}}</div>
        </div>
        <div v-if="current.round_numbers_prev && current.round_numbers_prev.formulas[1]" class="round-driver"></div>
        <div class="lottery-class__footer-result" v-show="current.round_numbers_prev && current.round_numbers_prev.formulas[1]">
          <span>总和：</span>
          <div v-for="i in current.round_numbers_prev && current.round_numbers_prev.formulas[1]">{{i}}</div>
        </div>
      </div>
    </div>
  </group>
</template>
<script>
import {Group} from 'vux'
// import {stagger, spring, styler} from 'popmotion'
import _ from 'lodash'
import {mapGetters} from 'vuex'
import clock from '@/components/common/clock'
import {lotteryClassList} from '@/config/lottery.config'
import Vue from 'vue'
import VueCountdown from '@xkeshi/vue-countdown'
Vue.component('countdown', VueCountdown)
export default {
  props: {
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
      numbers: this.current.round_numbers_prev && this.current.round_numbers_prev.numbers
    }
  },
  components: {
    clock,
    Group
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
  computed: {
    ...mapGetters([
      'isLotterying'
    ]),
    setHoursShow () {
      return this.lotteryId === 7
    },
    setClockTime () {
      if (this.current && !isNaN(Number(this.current.current_time))) {
        console.log('aaaa')
        return this.current.current_time * 1000
      }
      return 100
    },
    setTitle () {
      return _.find(lotteryClassList, item => item.id === this.lotteryId).title
    },
    setSum () {
      const roundNumbers = this.current.round_numbers_prev
      if (roundNumbers) {
        return _.sum(roundNumbers.numbers)
      }
      return ''
    }
  },
  watch: {
    isLotterying (value) {
      console.log('update')
      if (value) {
        this.$nextTick(() => {
          // const stylers = Array.from(this.$refs.roundBall.children).map(styler)
          // const animations = Array(stylers.length).fill(spring({ from: -300, to: 0 }))
          // stagger(animations, 100).start((v) => v.forEach((x, i) => stylers[i].set('x', x)))
        })
      }
    }
  },
  methods: {
    // 时间走的时候调用
    countdownprogress (item) {
      // console.log(item)
    },
    // 时间停止的时候调用
    countdownend (item) {
      console.log()
      // this.$store.commit('round_next_data_receive', {current: this.current, id: this.lotteryId})
      this.$nextTick(() => {
        if (!isNaN(this.current.current_time)) {
          this.$refs.countdown.start()
        }
      })
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
          return `ball-${i} circle-default-ball`
        }
        if (this.lotteryId === 7 && key === len - 1) {
          return 'ball-result rect-default-ball'
        }
      }
      return 'rect-default-ball'
    },
    itemClick () {
      this.$emit('click-handle', this.lotteryId)
    }
  },
  created () {
    // this.numberLen = this.current.round_numbers_prev.numbers.length
  }
}
</script>


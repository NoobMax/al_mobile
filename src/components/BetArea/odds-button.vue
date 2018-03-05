<template>
  <a href="javascript:;" class="odds-btn__content vux-1px" :class="setClass" @click="clickHandle">
    <div class="odds-btn__body" :class="setBodyClass">
      <span>{{setTitle}}</span>
    </div>
    <div class="odds-btn__footer">
      <span>{{setOdds}}</span>
    </div>
  </a>
</template>
<script>
import _ from 'lodash'
import numeral from 'numeral'
export default {
  props: {
    selectList: {
      type: Array,
      default: () => []
    },
    current: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    setTitle () {
      const {title} = this.current.number_info
      if (_.isObject(title)) {
        return _.keys(this.current.number_info.title)[0]
      }
      return this.current.number_info.title
      // switch (Number(this.$route.query.number_class)) {
      //   case 719:
      //   case 718:
      //   case 717:
      //   case 716:
      //   case 714:
      //     return _.keys(this.current.number_info.title)[0]
      //   default:
      //     return this.current.number_info.title
      // }
    },
    setOdds () {
      return numeral(this.current.odds[0].odds_number_odds).format('0.000')
    },
    setBodyClass () {
      return _.find(this.selectList, item => item.number_class === this.current.number_class && item.number_code === this.current.number_code) ? 'is-active' : ''
    },
    setClass () {
      return `is-${this.size}`
    }
  },
  methods: {
    _drop (target) {
      console.log('Bet================')
    },
    clickHandle (event) {
      let elLeft = event.target.getBoundingClientRect().left
      let elBottom = event.target.getBoundingClientRect().bottom
      // this._drop(event.target)
      this.$emit('click-handle', {current: this.current, elLeft, elBottom, rect: event.target.getBoundingClientRect()})
    }
  }
}
</script>


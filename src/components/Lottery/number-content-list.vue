<template>
  <ul class="number-content__list">
    <li class="number-content__item vux-1px-b" v-for="(item, index) in list" :key="index">
      <div class="number-content__item-date">{{item.lottery_updated_at | setDate}}</div>
      <div class="number-content__item-round">{{item.lottery_round}}期</div>
      <div class="number-content__item-numbers" v-show="activeIndex !== 5">
        <div class="is-small" :class="setClass(item)" v-for="item in item.lottery_numbers.numbers">{{item | setNumber(activeIndex)}}</div>
      </div>
      <div class="number-content__item-com"  v-show="activeIndex === 5">
        <div class="item-com__number">
          <div class="rect-default-ball is-small" :class="setNameClass(item)" v-for="item in item.lottery_numbers.formulas[0]">{{item}}</div>
        </div>
        <div class="rect-default-ball is-small item-com__dragon" :class="setDragonClass(item)" v-for="item in item.lottery_numbers.formulas[1]">{{item}}</div>
      </div>
    </li>
  </ul>
</template>
<script>
import {dateFormat} from 'vux'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 2
    }
  },
  methods: {
    setDragonClass (item) {
      return item === '虎' ? 'is-number__small' : ''
    },
    setNameClass (item) {
      return (item === '单' || item === '小') ? 'is-number__small' : (item === '大' || item === '双') ? 'is-number__big' : ''
    },
    // 设置样式
    setClass (value) {
      const id = Number(this.$route.params.id)
      if (this.activeIndex === 3 || this.activeIndex === 4) {
        return Number(value) > 5 ? 'is-number__big circle-default-ball' : 'is-number__small circle-default-ball'
      } else {
        if (id === 1 || id === 3) {
          return `ball-${value} circle-default-ball`
        }
      }
      return 'rect-default-ball'
    }
  },
  filters: {
    setDate (value) {
      return dateFormat(value, 'HH:mm')
    },
    setNumber: function (value, active) {
      if (active === 3) {
        return Number(value) > 5 ? '大' : '小'
      }
      if (active === 4) {
        return Number(value) % 2 === 0 ? '双' : '单'
      }
      return value
    }
  }
}
</script>


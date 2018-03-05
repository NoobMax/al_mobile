<template>
<div :gutter="4" class="money-onlie__list">
  <div class="money-input__item" v-for="(item, index) in list" :class="index === activeIndex ? 'is-active' : ''" :key="index" :span="1/4" @click.stop="clickHandle(item, index)">
    <span>{{item.money}}</span>
  </div>
</div >
</template>
<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      list: [
        {
          money: 50
        },
        {
          money: 100
        },
        {
          money: 200
        },
        {
          money: 300
        },
        {
          money: 500
        },
        {
          money: 1000
        },
        {
          money: 2000
        },
        {
          money: 5000
        }
      ]
    }
  },
  methods: {
    clickHandle (item, index) {
      if (this.index !== this.activeIndex) {
        this.$emit('click-handle', item, index)
      }
    }
  }
}
</script>


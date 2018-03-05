<template>
  <ul class="selected-list vux-1px-b">
      <li class="selected-item" v-for="(item, index) in list" :key="index" :class="setClass(item, index)" @click="clickTab(item, index)">{{item.title}}</li>
  </ul>
</template>
<script>
import {Checker, CheckerItem} from 'vux'
export default {
  components: {
    Checker,
    CheckerItem
  },
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
    setClass (item, index) {
      if (item.disabled) {
        return 'is-disabled'
      }
      if (this.activeIndex === index) {
        return 'is-active'
      }
      return ''
    },
    clickTab (item, index) {
      if (!item.disabled && index !== this.activeIndex) {
        this.$emit('click-handle', item, index)
      }
    }
  }
}
</script>

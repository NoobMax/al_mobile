<template>
  <button-tab class="mobile-btn-tab" :class="[defaultColor, activeColor, defaultBgColor, activeBgColor]">
    <button-tab-item v-for="(item, index) in list" :key="index" @on-item-click="clickHandle(item, index)" :selected="active === index ? true : false">{{item.title || item.classify_name}}</button-tab-item>
  </button-tab>
</template>
<script>
import {ButtonTab, ButtonTabItem} from 'vux'
export default {
  props: {
    active: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    defaultColor: {
      type: String,
      default: 'btn-tab__default'
    },
    activeColor: {
      type: String,
      default: 'btn-tab__active'
    },
    defaultBgColor: {
      type: String,
      default: 'btn-tab__bg-default'
    },
    activeBgColor: {
      type: String,
      default: 'btn-tab__bg-active'
    }
  },
  methods: {
    clickHandle (item, index) {
      if (this.active !== index) {
        this.$emit('click-handle', item, index)
      }
    }
  },
  components: {
    ButtonTab,
    ButtonTabItem
  }
}
</script>


<template>
  <div class="expand-tabs" :class="isExpand ? 'is-expand' : ''">
    <div class="mobile-ft" :class="isExpand ? 'is-up' : 'is-down'" @click="expandClick"></div>
    <a href="#" @click.prevent="tabClick(item, index)" class="expand-tabs__item vux-1px-b" v-for="(item, index) in  list"
    :key="index"
     :class="setItemClass(index, item)">{{item.classify_name}}</a>
  </div>
</template>
<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isExpand: false
    }
  },
  methods: {
    setItemClass (index, item) {
      return index === this.activeIndex ? 'is-active' : ''
    },
    expandClick () {
      this.isExpand = !this.isExpand
    },
    tabClick (item, index) {
      if (this.index !== this.activeIndex) {
        this.isExpand && (this.isExpand = false)
        this.$emit('tab-click', item, index)
      }
    }
  }
}
</script>


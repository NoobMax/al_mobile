<template>
  <ul class="lottery-title__list">
    <li class="lottery-title__item vux-1px-b" @click="tabClick(item, index)" v-for="(item, index) in list" :class="activeId === item.id ? 'is-active' : ''" :key="index">{{item.title}}</li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: Number,
      default: 1
    }
  },
  methods: {
    tabClick (item) {
      this.$emit('click-handle', item)
    }
  }
}
</script>


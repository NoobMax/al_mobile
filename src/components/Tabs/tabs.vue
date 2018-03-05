<template>
  <tab :line-width="2" v-model="setTabs" :data-src="index">
    <tab-item class="vux-center" v-for="(item, index) in list" @click="clickHandle" :key="index">{{item.title}}</tab-item>
  </tab>
</template>
<script>
import {Tab, TabItem} from 'vux'
export default {
  components: {
    Tab,
    TabItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    setTabs: {
      get () {
        return this.index
      },
      set (val) {
        this.$emit('tab-click', val)
      }
    }
  },
  watch: {
    index (val) {
      console.log('index' + val)
    }
  },
  methods: {
    clickHandle () {
      this.$emit('click-handle')
    }
  }
}
</script>



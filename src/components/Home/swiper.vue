<template>
  <swiper :list="list" :auto="auto" height="155px" dots-position="center" :loop="loop" class="home-mobile__swiper">
  </swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'vux'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    auto: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    }
  }
}
</script>
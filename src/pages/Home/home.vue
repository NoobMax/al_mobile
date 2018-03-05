<template>
<div>
  <cp-swiper  :list="swiperList"/>
  <div class="mobile-wrapper__notify vux-1px-b">
    <div class="mobile-notify__logo">
      <i></i>
    </div>
    <div class="mobile-notify__content">
      <marquee>
      <marquee-item v-for="(item, i) in marqueeData" :key="i" @click.native="onClick(i)" class="align-middle">{{item.marquee_title}}</marquee-item>
     </marquee>
    </div>
    <div class="mobile-notify__allow">></div>
  </div>
  <div class="mobile-wrapper__menu">
    <cp-menu :menu-list="menuList" @click-handle="menuClickHandle"/>
  </div>
</div>
</template>
<script>
import { Marquee, MarqueeItem } from 'vux'
import {swiperList, menuList} from '@/config/home.config'
import cpSwiper from '@/components/Home/swiper'
import cpMenu from '@/components/Home/menu'
import api from '@/api'
export default {
  components: {
    cpSwiper,
    cpMenu,
    Marquee,
    MarqueeItem
  },
  data () {
    return {
      swiperList,
      menuList,
      marqueeData: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const data = await api.getMarquees()
        if (data.status === 200) {
          this.marqueeData = data.data.data
          return data.data.data
        }
        return ''
      } catch (error) {
        Promise.reject(error)
      }
    },
    menuClickHandle (item) {
      this.$router.push(item.url)
    }
  }
}
</script>




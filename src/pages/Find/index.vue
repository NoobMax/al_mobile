<template>
  <div style="height: 100%;overflow: hidden">
    <tab :line-width="2" v-model="index" :data-src="index" active-color="#453880" defaultColor="#333" bar-active-color="#7b73be" class="mobile-find__tab">
      <tab-item class="vux-center" v-for="(item, index) in tabList" :key="index" @on-item-click="tabClick(item)">{{item.title}}</tab-item>
    </tab>
    <keep-alive>
        <swiper v-model="index" height="100vh" :show-dots="false" :threshold="100">
          <swiper-item>
            <div class="mobile-find__content">
             <discount />
            </div>
          </swiper-item>
          <swiper-item>
            <div class="mobile-find__content">
              <notify />
            </div>
          </swiper-item>
          <swiper-item>
            <div class="mobile-find__content">
              <level />
            </div>
          </swiper-item>
          <swiper-item>
            <div class="mobile-find__content">
              <msg />
            </div>
          </swiper-item>
        </swiper>
        <!-- <component :is="currentView" /> -->
    </keep-alive>
  </div>
</template>
<script>
import {tabList} from '@/config/find.config'
import {Swiper, SwiperItem, Tab, TabItem} from 'vux'
import tabs from '@/components/Tabs/tabs'
import discount from '@/components/Find/discount'
import notify from '@/components/Find/notify'
import level from '@/components/Find/level'
import msg from '@/components/Find/msg'
export default {
  components: {
    tabs,
    Swiper,
    SwiperItem,
    Tab,
    TabItem,
    discount,
    notify,
    level,
    msg
  },
  data () {
    return {
      tabList,
      index: 0,
      currentView: 'discount'
    }
  },
  methods: {
    tabClick (item) {
      if (this.currentView !== item.query) {
        this.$router.replace({name: 'find', query: {tag: item.query}})
        this.currentView = item.query
        console.log(item)
        // this.index = item
      }
    }
  },
  created () {
    const tag = this.$route.query.tag || 'discount'
    this.currentView = tag
    this.index = tabList.findIndex(item => item.query === tag)
    // this.index = _.findIndex(tabList, ['query', tag]) || 0
  }
}
</script>


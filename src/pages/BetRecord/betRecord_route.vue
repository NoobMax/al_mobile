<template>
  <div class="bet-record__wrapper">
    <x-header :title="title" class="mobile-header__default"></x-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import {XHeader} from 'vux'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      title: '下注记录'
    }
  },
  methods: {
    getTitle (route) {
      const routeName = route.name
      if (routeName === 'bet_record_settled') {
        return '已结记录'
      }
      if (routeName === 'bet_record_unsettled') {
        return '未结记录'
      }
      if (routeName === 'bet_record_detail') {
        if (route.query.status === 'set') {
          return '已结详情'
        }
        return '未结详情'
      }
      return '下注记录'
    }
  },
  watch: {
    $route () {
      this.title = this.getTitle(this.$route)
    }
  },
  created () {
    this.title = this.getTitle(this.$route)
  }
}
</script>


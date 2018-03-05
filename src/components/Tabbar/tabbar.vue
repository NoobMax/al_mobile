<template>
  <tabbar slot="bottom" class="cp-mobile__tabbar">
    <tabbar-item link="/">
      <img slot="icon" v-lazy="computedGameImg">
      <span slot="label">游戏</span>
    </tabbar-item>
    <tabbar-item link="/lottery">
      <img slot="icon" v-lazy="computedLotteryImg">
      <span slot="label">开奖</span>
    </tabbar-item>
    <tabbar-item link="/find?tag=discount">
      <img slot="icon" v-lazy="computedFindImg">
      <span slot="label">发现</span>
    </tabbar-item>
    <tabbar-item link="/user">
      <img slot="icon" v-lazy="computedUserImg">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<script>
import {Tabbar, TabbarItem} from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activePath: 'home'
    }
  },
  computed: {
    computedGameImg () {
      return this.activePath === 'home' ? require('../../assets/images/home/game_active.png') : require('../../assets/images/home/game.png')
    },
    computedLotteryImg () {
      return this.activePath === 'lottery' ? require('../../assets/images/home/lottery_active.png') : require('../../assets/images/home/lottery.png')
    },
    computedFindImg () {
      return this.activePath === 'find' ? require('../../assets/images/home/find_active.png') : require('../../assets/images/home/find.png')
    },
    computedUserImg () {
      return this.activePath === 'user' ? require('../../assets/images/home/user_active.png') : require('../../assets/images/home/user.png')
    }
  },
  watch: {
    $route (route) {
      this.activePath = route.name
    }
  },
  created () {
    this.activePath = this.$route.name
  }
}
</script>


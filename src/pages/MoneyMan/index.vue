<template>
  <div class="mobile-container__wrapper">
    <x-header title="资金管理" class="mobile-header__default" />
    <money-header :user-info="userInfo"/>
    <mobile-button-tab :list="moneyTabList" :active="activeIndex" @click-handle="tabClick"></mobile-button-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import {XHeader} from 'vux'
import moneyHeader from '@/components/MoneyMan/user-info'
import mobileButtonTab from '@/components/Button/button-tab'
import {moneyTabList} from '@/config/money.config'
import {mapGetters} from 'vuex'
export default {
  components: {
    mobileButtonTab,
    moneyHeader,
    XHeader
  },
  data () {
    return {
      moneyTabList,
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    tabClick (item, index) {
      this.activeIndex = index
      this.$router.replace({name: item.query})
    }
  },
  created () {
    // this.activeIndex = _.findIndex(moneyTabList, ['query', this.$route.name || 'money_recharge'])
    this.activeIndex = moneyTabList.findIndex(item => {
      console.log(this.$route.name)
      return item.query === this.$route.name
    })
    this.$store.commit('user_info_receive')
  }
}
</script>


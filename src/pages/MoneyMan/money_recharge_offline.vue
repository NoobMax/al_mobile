<template>
  <div class="money-wrapper">
    <x-header title="公司入款" class="mobile-header__default" />
    <div class="money-wrapper__offline">
      <tab :line-width="2" v-model="index" :data-src="index" active-color="#453880" defaultColor="#333" bar-active-color="#7b73be" class="mobile-find__tab">
        <tab-item class="vux-center" v-for="(item, index) in offlineReList" :key="index" @on-item-click="tabClick(item)">{{item.title}}</tab-item>
      </tab>
      <keep-alive>
        <component :is="currentView" :payRechargeData="payRechargeData" />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import {offlineReList} from '@/config/money.config'
import {Tab, TabItem, XHeader} from 'vux'
import {mapGetters} from 'vuex'
import offlineBanks from '@/components/Money/offlineBanks'
import offlineAliPay from '@/components/Money/offlineAliPay'
import offlineWechat from '@/components/Money/offlineWechat'
import offlineTenPay from '@/components/Money/offlineTenPay'
export default {
  components: {
    Tab,
    TabItem,
    XHeader,
    offlineBanks,
    offlineAliPay,
    offlineWechat,
    offlineTenPay
  },
  computed: {
    ...mapGetters([
      'payRechargeData'
    ])
  },
  data () {
    return {
      offlineReList,
      index: 0,
      currentView: 'offlineBanks'
    }
  },
  methods: {
    tabClick (item) {
      if (this.currentView !== item.query) {
        this.$router.replace({name: 'money_recharge_offline', query: {type: item.id, tag: item.query}})
        this.currentView = item.query
        console.log(item)
        // this.index = item
      }
    }
  },
  created () {
    const {tag, type} = this.$route.query
    // this.index = _.findIndex(offlineReList, ['id', Number(type)])
    this.index = offlineReList.findIndex(item => item.id === Number(type))
    this.currentView = tag
    this.$store.dispatch('fetchRechargeType')
  }
}
</script>


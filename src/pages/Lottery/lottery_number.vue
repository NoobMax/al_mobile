<template>
  <div class="lottery-number__wrapper">
    <number-tabs :list="numberTabList" :activeIndex="activeIndex" @click-handle="tabClick"/>
    <div class="lottery-number-content">
      <number-content-list :list="data" :activeIndex="activeIndex" />
    </div>
  </div>
</template>
<script>
import api from '@/api'
import _ from 'lodash'
import {Checker, CheckerItem} from 'vux'
import {numberTabList, lotteryClassList} from '@/config/lottery.config'
import numberTabs from '@/components/Lottery/number-tabs'
import numberContentList from '@/components/Lottery/number-content-list'
export default {
  components: {
    Checker,
    CheckerItem,
    numberTabs,
    numberContentList
  },
  data () {
    return {
      numberTabList,
      // 2 是号码
      // 3 是大小
      // 4 是单双
      // 4 冠亚/龙虎
      activeIndex: 2,
      data: []
    }
  },
  methods: {
    async fetchData (params) {
      try {
        const data = await api.getLotteryHistory(params)
        if (data.status === 200) {
          this.data = data.data.data
        }
      } catch (error) {
        Promise.reject(error)
      }
    },
    tabClick (item, index) {
      this.activeIndex = index
    }
  },
  created () {
    const id = Number(this.$route.params.id) || 1
    this.fetchData({lottery_class: id})
    if (!id) {
      this.$store.dispatch('fetchRoundData', {lottery: _.find(lotteryClassList, item => item.id === id).value})
    }
  },
  watch: {
    $route (route) {
      this.fetchData({lottery_class: Number(route.params.id)})
    }
  }
}
</script>

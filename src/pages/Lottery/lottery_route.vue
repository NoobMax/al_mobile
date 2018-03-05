<template>
  <div class="lottery-wrapper">
    <x-header class="mobile-header__default">
      <div slot="default" class="header-title" @click="titleClick">{{currentLottery}}
        <div class="mobile-ft" :class="menuModalShow ? 'is-up' : 'is-down'"></div>
      </div>
      <!-- <div slot="left" @click="menuModalShow = true" class="lottery-heading__text mobile-ft">
        {{currentLottery}}
      </div> -->
    </x-header>
    <div class="lottery-wrapper__heading">
      <lottery-class-item :current="setRoundData" :lotteryId="Number($route.params.id)" />
    </div>
    <tab :line-width="2" v-model="index" :data-src="index" active-color="#453880" defaultColor="#333" bar-active-color="#7b73be" class="mobile-find__tab">
        <tab-item class="vux-center" v-for="(item, index) in tabList" :key="index" @on-item-click="tabClick(item)">{{item.title}}</tab-item>
    </tab>
    <component :is="currentView"></component>
    <div v-transfer-dom>
      <popup v-model="menuModalShow" position="left" width="50%" class="popup">
        <div class="popup-wrapper">
          <div class="mobile-close" @click="menuModalShow = false"></div>
          <lottery-title-list :list="lotteryClassList" :activeId="lotteryClassActive"
           @click-handle="lotteryTitleClick" />
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import lotteryClassItem from '@/components/Lottery/lottery-class-item'
import lotteryTitleList from '@/components/Lottery/lottery-title-list'
import lotteryNumber from './lottery_number'
import lotteryDouble from './lottery_double'
import lotteryDragon from './lottery_dragon'
import _ from 'lodash'
import {mapGetters} from 'vuex'
import lotteryDistributed from './lottery_distributed'
import {XHeader, Tab, TabItem, TransferDom, Popup} from 'vux'
import {lotteryTabList, lotteryClassList} from '@/config/lottery.config'
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    lotteryClassItem,
    lotteryTitleList,
    Tab,
    Popup,
    TabItem,
    lotteryNumber,
    lotteryDouble,
    lotteryDragon,
    lotteryDistributed
  },
  computed: {
    ...mapGetters([
      'roundpk10',
      'roundcqssc',
      'roundxyft',
      'roundpcdd',
      'roundcqxync',
      'roundgdklsf',
      'roundmarksix'
    ]),
    setRoundData () {
      const id = Number(this.$route.params.id)
      return this[`round${_.find(lotteryClassList, item => item.id === id).value}`]
    }
  },
  data () {
    return {
      tabList: lotteryTabList,
      index: 0,
      currentView: 'lotteryNumber',
      currentLottery: '北京赛车',
      menuModalShow: false,
      lotteryClassList,
      lotteryClassActive: 1,
      roundData: {}
    }
  },
  created () {
    const id = Number(this.$route.params.id)
    this.$store.dispatch('fetchRoundData', {lottery: _.find(this.lotteryClassList, item => item.id === id).value})
  },
  methods: {
    titleClick () {
      this.menuModalShow = true
    },
    // tab切换
    tabClick (item) {
      if (this.currentView !== item.query) {
        this.$router.replace({name: 'lottery_detail', query: {tag: item.query}})
        this.currentView = item.query
        console.log(item)
      }
    },
    // 弹出框点击
    lotteryTitleClick (item) {
      if (item.id !== this.lotteryClassActive) {
        this.currentLottery = item.title
        this.lotteryClassActive = item.id
        this.$router.replace({name: 'lottery_detail', params: {id: item.id}, query: {class: this.currentView}})
      }
      this.menuModalShow = false
    }
  }
}
</script>


<template>
  <div class="betArea-pk10 vux-1px-b">
      <component :is="currentView"></component>
    <!-- <div class="betArea-pk10__content">
      <tab :line-width="2" style="width: 100%" v-model="tabIndex" :data-src="tabIndex"
      
       active-color="#453880" defaultColor="#333" bar-active-color="#7b73be" class="mobile-find__tab">
        <tab-item class="vux-center" v-for="(item, index) in setsubTabs" :key="index" @on-item-click="tabClick(item)">{{item.classify_name}}</tab-item>
      </tab>
      <div class="betArea-ball__current" v-for="(item, index) in setCurrentGame" :key="index" :class="setClass(index)">
        <tab :line-width="2" style="width: 100%" v-model="tabIndex" :data-src="tabIndex"
        
        active-color="#453880" defaultColor="#333" bar-active-color="#7b73be" class="mobile-find__tab">
          <tab-item class="vux-center" v-for="(item, index) in setsubTabs" :key="index" @on-item-click="subTabClick(item)">{{item.title}}</tab-item>
        </tab>
        <div class="betArea-ball__title">{{''}}</div>
        <div class="betArea-ball__group" :class="setGroupClass(index)">
          <odds-button :current="current" :select-list="betOddsList"
          v-for="(current, key) in setOddsItem(item)" :key="key" :size="setSize(index, key, item)" @click-handle="btnClickHandle"/>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {Tab, TabItem} from 'vux'
// import _ from 'lodash'
import oddsButton from '@/components/BetArea/odds-button'
import masksixFront from './masksix_front'
import masksixMiddle from './masksix_middle'
import masksixEnd from './masksix_end'
export default {
  components: {
    oddsButton,
    Tab,
    TabItem,
    masksixFront,
    masksixMiddle,
    masksixEnd
  },
  data () {
    return {
      tabIndex: 0,
      tabList: [],
      currentView: 'masksixFront'
    }
  },
  computed: {
    ...mapGetters([
      'currentGame',
      'betOddsList'
    ])
    // setTabs () {
    //   if (Number(this.$route.query.number_class) < 711) {
    //     return true
    //   }
    //   return false
    // },
    // setCurrentGame () {
    //   if (this.checkNumberClass() === 'sub') {
    //     return this.currentGame['1']
    //   }
    //   return this.currentGame
    // },
    // setsubTabs () {
    //   if (this.checkNumberClass() === 'sub') {
    //     return _.map(this.currentGame, (item, index) => {
    //       return {
    //         id: index,
    //         classify_name: _.isArray(item[0].number_info.type[1]) ? item[0].number_info.type[1][0] : item[0].number_info.type[1]
    //       }
    //     })
    //   }
    //   return this.tabList
    // }
  },
  methods: {
    checkNumberClass () {
      switch (Number(this.$route.query.number_class)) {
        case 713:
        case 717:
        case 718:
        case 719:
        case 720:
          return 'sub'
        default:
          return ''
      }
    }
    // // 设置投注区域内容
    // setOddsItem (item) {
    //   console.log(item)
    // },
    // // 切换标签
    // tabClick (item) {
    //   if (this.checkNumberClass() !== 'sub') {
    //     this.$router.replace({name: this.$route.name, query: {number_class: item.classify_code}})
    //   }
    // },
    // // 大小的样式
    // setSize (index, key, item) {
    //   if (Number(this.$route.query.number_class) === 711) {
    //     if (key < 8) {
    //       return 'middle'
    //     }
    //     return 'small'
    //   }
    //   if (index === '1' && key > 44) {
    //     return 'middle'
    //   }
    //   if (item.length === 4) {
    //     return 'middle'
    //   }
    //   if (item.length === 3) {
    //     return 'large'
    //   }
    //   if (item.length === 2) {
    //     return 'xLarge'
    //   }
    //   return 'small'
    // },
    // btnClickHandle (item) {
    //   console.log(item)
    //   this.$store.commit('submit_bet_odds_data', item)
    // },
    // setGroupClass (index) {
    //   return 'is-horizontal'
    // },
    // setClass (index) {
    //   return 'is-full-100'
    // },
    // setSubList (number) {
    //   switch (number) {
    //     case 701:
    //     case 702:
    //       return [
    //         {
    //           classify_name: '特码B',
    //           classify_code: 702
    //         },
    //         {
    //           classify_name: '特码A',
    //           classify_code: 701
    //         }
    //       ]
    //     case 703:
    //     case 704:
    //       return [
    //         {
    //           classify_name: '正码B',
    //           classify_code: 704
    //         },
    //         {
    //           classify_name: '正码A',
    //           classify_code: 703
    //         }
    //       ]
    //     case 705:
    //     case 706:
    //     case 707:
    //     case 708:
    //     case 709:
    //     case 710:
    //       return [
    //         {
    //           classify_name: '正特一',
    //           classify_code: 705
    //         },
    //         {
    //           classify_name: '正特二',
    //           classify_code: 706
    //         },
    //         {
    //           classify_name: '正特三',
    //           classify_code: 707
    //         },
    //         {
    //           classify_name: '正特四',
    //           classify_code: 708
    //         },
    //         {
    //           classify_name: '正特五',
    //           classify_code: 709
    //         },
    //         {
    //           classify_name: '正特六',
    //           classify_code: 710
    //         }
    //       ]
    //     default:
    //       return []
    //   }
    // }
  },
  created () {
    if (this.checkNumberClass() === 'sub') {
      this.currentView = 'masksixMiddle'
    } else {
      this.currentView = 'masksixFront'
    }
    this.$store.dispatch('fetchCurrentGames', {number_class: Number(this.$route.query.number_class)})
  },
  watch: {
    $route (route, oldRoute) {
      if (this.checkNumberClass() === 'sub') {
        this.currentView = 'masksixMiddle'
      } else {
        this.currentView = 'masksixFront'
      }
      if (route.name === oldRoute.name) {
        this.$store.dispatch('fetchCurrentGames', {number_class: Number(this.$route.query.number_class)})
      }
    }
  }
}
</script>


<template>
    <div class="betArea-pk10__content">
      <tab :line-width="2" style="width:700px;" v-model="tabIndex" :data-src="tabIndex"
       active-color="#453880" defaultColor="#333" bar-active-color="#7b73be" class="mobile-find__tab">
        <tab-item class="vux-center" v-for="(item, index) in setsubTabs" :key="index" >{{item.classify_name}}</tab-item>
      </tab>
      <div class="betArea-masksix-middle__title betArea-ball__current is-full-100"></div> 
      <div class="betArea-ball__current" v-for="(item, index) in setCurrentGame" :key="index" :class="setClass(index)">
        <div class="betArea-ball__group" :class="setGroupClass(index)">
          <odds-button :current="item" :select-list="betOddsList"
           :size="setSize(item, index)" @click-handle="btnClickHandle"/>
        </div>
      </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {Tab, TabItem} from 'vux'
import _ from 'lodash'
import oddsButton from '@/components/BetArea/odds-button'
export default {
  components: {
    oddsButton,
    Tab,
    TabItem
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentGame',
      'betOddsList'
    ]),
    setCurrentGame () {
      return this.currentGame[Number(this.tabIndex) + 1]
    },
    setsubTabs () {
      return _.map(this.currentGame, (item, index) => {
        return {
          id: index,
          classify_name: _.isArray(item[0].number_info.type[1]) ? item[0].number_info.type[1][0] : item[0].number_info.type[1]
        }
      })
    }
  },
  methods: {
    // 大小的样式
    setSize (item, key) {
      return 'small'
    },
    btnClickHandle (item) {
      this.$store.commit('submit_bet_odds_data', item)
    },
    setGroupClass (index) {
      return 'is-horizontal'
    },
    setClass (index) {
      return 'is-full-20'
    }
  },
  watch: {
    $route (route, oldRoute) {
      if (route.query.number_class !== oldRoute.query.number_class) {
        // this.tabIndex = 0
      }
    }
  }
}
</script>
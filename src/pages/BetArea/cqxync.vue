<template>
  <div class="betArea-pk10 vux-1px-b">
    <component :is="currentView" />
    <div class="betArea-pk10__content">
      <div v-show="!currentView" class="betArea-ball__current" v-for="(item, index) in currentGame" :key="index" :class="setClass(index)">
        <div class="betArea-ball__title">{{item[0].number_info.type[1]}}</div>
        <div class="betArea-ball__group" :class="setGroupClass(index)">
          <odds-button :current="current" :select-list="betOddsList"
          v-for="(current, key) in item" :key="key" :size="setSize(index, key)" @click-handle="btnClickHandle"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import oddsButton from '@/components/BetArea/odds-button'
import cqxyncEnd from './cqxync_end'
export default {
  components: {
    oddsButton,
    cqxyncEnd
  },
  data () {
    return {
      currentView: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentGame',
      'betOddsList'
    ]),
    setTabs () {
      return Number(this.$route.query.number_class) === 501
    }
  },
  methods: {
    // 计算按钮大小的样式
    setSize (index, key) {
      if (Number(this.$route.query.number_class) === 501) {
        return 'middle'
      }
      return 'small'
    },
    // tab切换时
    btnClickHandle (item) {
      console.log(item)
      this.$store.commit('submit_bet_odds_data', item)
    },
    // 一组的样式
    setGroupClass (index) {
      return 'is-horizontal'
    },
    // 一组的样式
    setClass (index) {
      if (Number(this.$route.query.number_class) === 501) {
        if (index === '1') {
          return 'is-full-100'
        }
      }
      if (Number(this.$route.query.number_class) === 502) {
        return 'is-full-100'
      }
      return 'is-full-25'
    },
    setCurrentView (number) {
      if (number === 503) {
        return 'cqxyncEnd'
      }
      return ''
    }
  },
  created () {
    this.currentView = this.setCurrentView(Number(this.$route.query.number_class))
    this.$store.dispatch('fetchCurrentGames', {number_class: Number(this.$route.query.number_class)})
  },
  watch: {
    $route (route, oldRoute) {
      if (route.name === oldRoute.name) {
        this.currentView = this.setCurrentView(Number(this.$route.query.number_class))
        this.$store.dispatch('fetchCurrentGames', {number_class: Number(this.$route.query.number_class)})
      }
    }
  }
}
</script>


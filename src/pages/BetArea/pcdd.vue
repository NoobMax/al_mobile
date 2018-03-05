<template>
  <div class="betArea-pk10 vux-1px-b">
    <div class="betArea-pk10__content">
      <div class="betArea-ball__current" v-for="(item, index) in currentGame" :key="index" :class="setClass(index)">
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
export default {
  components: {
    oddsButton
  },
  computed: {
    ...mapGetters([
      'currentGame',
      'betOddsList'
    ])
  },
  methods: {
    setSize (index, key) {
      if (index === '3' && key > 2) {
        return 'small'
      }
      if (index === '1' && key < 8) {
        return 'middle'
      }
      return 'large'
    },
    btnClickHandle (item) {
      console.log(item)
      this.$store.commit('submit_bet_odds_data', item)
    },
    setGroupClass (index) {
      return 'is-horizontal'
    },
    setClass (index) {
      return 'is-full-100'
    }
  },
  created () {
    this.$store.dispatch('fetchCurrentGames', {number_class: Number(this.$route.query.number_class)})
  },
  watch: {
    $route (route, oldRoute) {
      if (route.name === oldRoute.name) {
        this.$store.dispatch('fetchCurrentGames', {number_class: Number(this.$route.query.number_class)})
      }
    }
  }
}
</script>


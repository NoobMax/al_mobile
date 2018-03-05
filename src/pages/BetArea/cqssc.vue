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
      if (Number(this.$route.query.number_class) === 201) {
        if (index === '1') {
          if (key > 3) {
            return 'large'
          }
          return 'middle'
        }
      }
      return 'small'
    },
    btnClickHandle (item) {
      console.log(item)
      this.$store.commit('submit_bet_odds_data', item)
    },
    setGroupClass (index) {
      if (Number(this.$route.query.number_class) === 201) {
        if (index > 1 && index < 7) {
          return ''
        }
      }
      return 'is-horizontal'
    },
    setClass (index) {
      if (Number(this.$route.query.number_class) === 201) {
        if (index === '1' || index > 6) {
          return 'is-full-100'
        }
      }
      return 'is-full-20'
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


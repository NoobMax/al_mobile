<template>
  <div>
    <lottery-class-item  :current="roundpk10" :lotteryId="1" @click-handle="clickHandle"/>
    <lottery-class-item  :current="roundcqssc" :lotteryId="2" @click-handle="clickHandle" />
    <lottery-class-item  :current="roundxyft" :lotteryId="3" @click-handle="clickHandle" />
    <lottery-class-item  :current="roundpcdd" :lotteryId="4" @click-handle="clickHandle" />
    <lottery-class-item  :current="roundcqxync" :lotteryId="5" @click-handle="clickHandle" />
    <lottery-class-item  :current="roundgdklsf" :lotteryId="6" @click-handle="clickHandle" />
    <lottery-class-item  :current="roundmarksix" :lotteryId="7" @click-handle="clickHandle" />
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import lotteryClassItem from '@/components/Lottery/lottery-class-item'
export default {
  components: {
    lotteryClassItem
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
    ])
  },
  methods: {
    clickHandle (id) {
      // const {id} = this.$route.params
      this.$router.push({name: 'lottery_detail', params: {id}, query: {class: 'lotteryNumber'}})
    }
  },
  created () {
    this.$store.dispatch('fetchRoundData', {lottery: 'pk10'})
    this.$store.dispatch('fetchRoundData', {lottery: 'cqssc'})
    this.$store.dispatch('fetchRoundData', {lottery: 'xyft'})
    this.$store.dispatch('fetchRoundData', {lottery: 'pcdd'})
    this.$store.dispatch('fetchRoundData', {lottery: 'cqxync'})
    this.$store.dispatch('fetchRoundData', {lottery: 'gdklsf'})
    this.$store.dispatch('fetchRoundData', {lottery: 'marksix'})
  }
}
</script>


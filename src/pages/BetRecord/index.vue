<template>
  <div class="bet-record__content">
    <div class="bet-record__tab vux-1px-b">
      <div class="bet-record__tab-title" @click="tabClick"><span>{{title}}</span>
        <div class="mobile-ft" :class="menuModalShow ? 'is-up' : 'is-down'"></div>
      </div>
      <div class="bet-record__popup" v-show="menuModalShow">
        <div class="bet-record__popup-content">
          <lottery-title-list :list="lotteryClassList" :activeId="lotteryClassActive"
            @click-handle="lotteryTitleClick" />
          </div>
        <div class="bet-record__popup-mask"></div>
      </div>
    </div>
    <div class="bet-record__list">
      <betrecord-item :current="unsettledData"  :is-settled="false" @click-handle="itemClick" />
      <betrecord-item v-for="(item, index) in settledData.last_week" :current="item" :key="index" :is-settled="true" @click-handle="itemClick"  />
      <betrecord-item v-for="(item, index) in settledData.this_week" :current="item" :key="index" :is-settled="true" @click-handle="itemClick" />
    </div>
  </div>
</template>
<script>
import api from '@/api'
import {XHeader, Divider} from 'vux'
import betrecordItem from '@/components/BetRecord/betrecord-item'
import lotteryTitleList from '@/components/Lottery/lottery-title-list'
import {lotteryClassList} from '@/config/lottery.config'
import _ from 'lodash'
export default {
  components: {
    XHeader,
    betrecordItem,
    Divider,
    lotteryTitleList
  },
  data () {
    return {
      title: '全部游戏',
      settledData: [],
      unsettledData: {},
      menuModalShow: false,
      lotteryClassList: [{id: 0, title: '全部游戏', value: ''}, ...lotteryClassList],
      lotteryClassActive: 0
    }
  },
  methods: {
    itemClick (item, status) {
      if (status) {
        this.$router.push({name: 'bet_record_settled', params: {date: item.date, lottery_class: this.lotteryClassActive}})
      } else {
        this.$router.push({name: 'bet_record_detail', query: {lottery_class: this.$route.query.lottery_class, status: 'unset'}})
      }
    },
    lotteryTitleClick (item) {
      if (item.title !== this.title) {
        this.title = item.title
        this.lotteryClassActive = item.id
        this.$router.replace({name: 'bet_record', query: {lottery_class: item.id}})
      }
      this.menuModalShow = false
      console.log(item)
    },
    tabClick () {
      this.menuModalShow = !this.menuModalShow
    },
    formatUnset (array) {
      if (array.length > 0) {
        return {
          count: array.length,
          amount: _.sumBy(array, item => Number(item.betslip_amt)),
          betslip_amt: _.sumBy(array, item => Number(item.betslip_amt_available))
        }
      }
      return {}
    },
    fetchSettled (params) {
      api.getBetslipSettled(params).then(data => {
        if (data.status === 200) {
          this.settledData = data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchUnsettled (params) {
      api.getBetslipUnsettled(params).then(data => {
        if (data.status === 200) {
          this.unsettledData = _.assign({}, this.formatUnset(data.data.data))
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    $route (route) {
      if (route.name === 'bet_record') {
        this.fetchSettled({lottery_class: route.query.lottery_class})
        this.fetchUnsettled({lottery_class: route.query.lottery_class})
      }
    }
  },
  created () {
    const lottery = this.$route.query.lottery_class ? Number(this.$route.query.lottery_class) : 0
    const current = _.find(this.lotteryClassList, item => item.id === lottery)
    if (current) {
      this.title = current.title
      this.lotteryClassActive = current.id
    }
    this.fetchSettled({lottery_class: lottery})
    this.fetchUnsettled({lottery_class: lottery})
  }
}
</script>


<template>
  <div class="bet-record__content">
    <div class="bet-record__list">
      <div class="bet-record__list-title">
        <div class="record-list__date">{{setDate}}</div>
        <div class="record-list__total">
          <span>输赢：{{setAmtTotal}}</span>
          <span>退水：{{setRetateTotal}}</span>
          <span>最终：{{setResultTotal}}</span>
        </div>
      </div>  
      <settled-item v-for="(item, index) in settledData" :key="index" :current="item" :is-settled="true" @click-handle="itemClick" />
    </div>
  </div>
</template>
<script>
import api from '@/api'
import numeral from 'numeral'
import settledItem from '@/components/BetRecord/settled-item'
import {Divider, dateFormat} from 'vux'
import _ from 'lodash'
export default {
  components: {
    Divider,
    settledItem
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
    setDate () {
      return dateFormat(this.$route.params.date, 'MM-DD')
    },
    // 输赢
    setAmtTotal () {
      return numeral(this.getTotal(this.settledData, 'betslip_result')).format('+0,0.00')
    },
    // 退水
    setRetateTotal () {
      return numeral(this.getTotal(this.settledData, 'betslip_rebate')).format('+0,0.00')
    },
    // 结果
    setResultTotal () {
      return numeral(this.getTotal(this.settledData, 'betslip_rebate') + this.getTotal(this.settledData, 'betslip_result')).format('+0,0.00')
    }
  },
  methods: {
    getTotal (obj, key) {
      if (_.size(obj) > 0) {
        let num = 0
        _.forEach(obj, item => {
          num += item[key]
        })
        return num
      }
      return 0
    },
    itemClick (item) {
      this.$router.push({name: 'bet_record_detail', query: {status: 'unset'}})
    },
    lotteryTitleClick (item) {
      if (item.title !== this.title) {
        this.title = item.title
        this.lotteryClassActive = item.id
        this.$router.replace({name: 'bet_record_settled', params: {lottery_class: item.id, date: this.$route.params.date}})
      }
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
    fetchUnsettled (params) {
      api.getBetslipUnsettled(params).then(data => {
        if (data.status === 200) {
          this.data = _.assign({}, this.formatUnset(data.data.data))
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    $route (route) {
      /* eslint-disable */
      const {lottery_class, date} = this.$route.params
      this.fetchSettled({date, lottery_class: Number(lottery_class) || 0})
    }
  },
  created () {
    /* eslint-disable */
    const {lottery_class, date} = this.$route.params
    this.fetchUnsettled({date, lottery_class: Number(lottery_class) || 0})
  }
}
</script>



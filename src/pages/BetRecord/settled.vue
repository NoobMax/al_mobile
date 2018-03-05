<template>
  <div class="bet-record__content vux-fix-safari-overflow-scrolling">
    <div class="bet-record__tab vux-1px-b">
      <div class="bet-record__tab-title" @click="tabClick"><span>{{title}}</span>
        <div class="mobile-ft" :class="menuModalShow ? 'is-up' : 'is-down'"></div>
      </div>
      <div class="bet-record__tab-date" @click="openDate">
        <img v-lazy="require('../../assets/images/date.png')" alt="">
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
import lotteryTitleList from '@/components/Lottery/lottery-title-list'
import {lotteryClassList} from '@/config/lottery.config'
import _ from 'lodash'
export default {
  components: {
    Divider,
    lotteryTitleList,
    settledItem
  },
  data () {
    return {
      title: '全部游戏',
      settledData: [],
      unsettledData: {},
      menuModalShow: false,
      lotteryClassList: [{id: 0, title: '全部游戏', value: ''}, ...lotteryClassList],
      lotteryClassActive: 0,
      currentDate: ''
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
    // 时间
    openDate () {
      const self = this
      this.$vux.datetime.show({
        cancelText: '取消',
        confirmText: '确定',
        format: 'YYYY-MM-DD',
        value: this.currentDate,
        onConfirm (val) {
          if (val !== self.currentDate) {
            self.currentDate = val
            self.$router.replace({name: 'bet_record_settled', params: {date: val, lottery_class: self.$route.params.lottery_class}})
          }
          console.log('plugin confirm', val)
        },
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        }
      })
    },
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
      this.$router.push({name: 'bet_record_detail', query: {status: 'set'}, params: ({date: this.$route.params.date, lottery_class: item.betslip_info.betslip_code, lottery_round: item.betslip_info.betslip_round})})
    },
    lotteryTitleClick (item) {
      if (item.title !== this.title) {
        this.title = item.title
        this.lotteryClassActive = item.id
        this.$router.replace({name: 'bet_record_settled', params: {lottery_class: item.id, date: this.$route.params.date}})
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
      api.getBetslipInfo(params).then(data => {
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
    $route (route, oldRoute) {
      /* eslint-disable */
      const {lottery_class, date} = this.$route.params
      if (route.name === 'bet_record_settled') {
        this.fetchSettled({date, lottery_class: Number(lottery_class) || 0})
      }
    }
  },
  created () {
    /* eslint-disable */
    const {lottery_class, date} = this.$route.params
    this.currentDate = date
    this.fetchSettled({date, lottery_class: Number(lottery_class) || 0})
    const current = _.find(this.lotteryClassList, item => item.id === Number(lottery_class))
    if (current) {
      this.title = current.title
      this.lotteryClassActive = current.id
    }
  }
}
</script>



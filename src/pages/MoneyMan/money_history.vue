<template>
<div style="height: 100%;overflow: hidden;">
  <div class="money-history__wrapper">
    <div class="money-history__item vux-1px-t mobile-ft" v-for="(item, index) in data" :key="index">
        <div class="money-history__left">
          <div class="money-history__left-date">{{item.cashier_updated_at}}</div>
          <div class="money-history__left-money">
            <p>{{item.cashier_type === 1 ? '取出：' : '存入：'}}</p>
            <span> {{item.cashier_relate_amount | setMoney(item.cashier_type)}}</span>
          </div>
        </div>
        <div class="money-history__right">{{setStatus}}</div>
    </div>
  </div>
</div>
</template>
<script>
import numeral from 'numeral'
import api from '@/api'
import {Group, CellBox} from 'vux'
export default {
  components: {
    Group,
    CellBox
  },
  data () {
    return {
      data: []
    }
  },
  filters: {
    setMoney (val, status) {
      return status === 0 ? numeral(Number(val)).format('+0,0.00') : numeral(-Number(val)).format('0,0.00')
    }
  },
  computed: {
    setStatus () {
      return '等待审核'
    }
  },
  methods: {
    fetchData (params) {
      api.getCashHistory(params).then(data => {
        if (data.status === 200) {
          this.data = data.data.data
        }
      })
    }
  },
  created () {
    this.fetchData({page: 1})
  }
}
</script>

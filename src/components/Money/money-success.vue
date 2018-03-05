<template>
  <div class="money-finish__success">
    <h4>订单提交成功，请扫描以下二维码付款</h4>
    <h5>订单号：{{setOrderId}}</h5>
    <span>应付金额：<span class="money-success__money">{{setMoney}} </span>元</span>
    <qrcode v-if="setShow" :size="200" :value="moneyInfo && moneyInfo.qrcode" class="money-success__qrcode"></qrcode>
    <div v-else>
      <img v-lazy="require('../../assets/images/success_icon.png')" alt="" >
      <form method="POST" ref="form" target="_blank">
          <input v-for="(item, index) in moneyInfo.form_params" :key="index" :name="index" type="hidden" :value="item"/>
          <div class="mobile-btn__blok-group finish-btn-group" style="margin-top:0">
            <button class="btn-block__default btn-primary" style="border-radius: 30px;" @click="open">确定</button>
          </div>
      </form>
    </div>
  </div>
</template>
<script>
import {Qrcode} from 'vux'
export default {
  props: {
    moneyInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setMoney () {
      const {moneyInfo} = this
      if (moneyInfo) {
        if (Number(this.$route.params.id) !== 0) {
          return moneyInfo.order_amount
        }
        return moneyInfo.form_params.order_amount
      }
      return ''
    },
    setOrderId () {
      const {moneyInfo} = this
      if (moneyInfo) {
        if (Number(this.$route.params.id) !== 0) {
          return moneyInfo.order_id
        }
        return moneyInfo.form_params.orderid
      }
      return ''
    },
    setShow () {
      return Number(this.$route.params.id) !== 0
    }
  },
  methods: {
    open () {
      this.$refs.form.setAttribute('action', 'http://new_pay.ubssp.com/request/online')
      this.$refs.form.submit()
    }
  },
  components: {
    Qrcode
  }
}
</script>


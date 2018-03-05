<template>
  <div class="money-offline__banks">
    <group>
      <cell title="微信收款信息"></cell>
      <x-input placeholder="" title="收款人:"  :value="setName" readonly class="vux-px1-b"></x-input>
      <qrcode :size="200" :value="setQrCode" class="money-success__qrcode"></qrcode>
    </group>
    <offline-form :offline-form="offlineForm"/>
    <div class="withdraw-btnGroup offline-btn">
      <button class="btn-block__default btn-primary radius-lg" :class="setSubmitClass" @click="submit">确认存款</button>
    </div>
  </div>
</template>
<script>
import {Group, Cell, XInput, dateFormat, Qrcode} from 'vux'
import _ from 'lodash'
import api from '@/api'
import offlineForm from './offline-form'
import {bankList} from '@/config/money.config'
/* eslint-disable */
import {parseCurrentBankInfo, parseCurrentPayInfo} from '@/utils'
export default {
   props: {
    payRechargeData: {}
  },
  components: {
    Group,
    Cell,
    XInput,
    Qrcode,
    offlineForm
  },
  computed: {
    setName () {
      const array = this.getCurrentPayInfo()
      if (array.length > 0){
        return _.sample(array).detail.offline_holder
      }
      return ''
    },
    setQrCode () {
      const array = this.getCurrentPayInfo()
      if (array.length > 0){
        return _.sample(array).detail.offline_qr_code
      }
      return ''
    },
    setSubmitClass () {
      return this.checkStatus() ? '' : 'btn-disabled'
    }
  },
  methods: {
    getCurrentPayInfo () {
      const {type} = this.$route.query
      return parseCurrentPayInfo(this.payRechargeData, type, false)
    },
    checkStatus () {
      const current = _.omitBy(_.omit(this.offlineForm, ['note']), item => item)
      if (_.isEmpty(current)) {
        return true
      }
      return false
    },
    submit () {
      if (this.checkStatus()) {
        console.log('submit')
        const current = this.getCurrentPayInfo()
        if (current.length > 0) {
          this.$vux.loading.show({
            text: '提交中...'
          })
          api.submitRechargeData(_.assign({}, this.offlineForm, {payment: _.sample(current).payment_id})).then(data => {
            this.$vux.loading.hide()
            if (data.status === 200) {
              console.log('success')
              this.$router.push({name: 'money_offline_finish'})
            }
          }).catch(err => {
            console.log(err)
            this.$vux.loading.hide()
          })
        }
      }
    }
  },
  data () {
    return {
      name: '',
      bankList,
      currentBankId: 1,
      offlineForm: {
        cashier_relate_name: '',
        cashier_relate_amount: '',
        cashier_relate_date: dateFormat(new Date(), 'YYYY-MM-DD HH:mm'),
        cashier_relate_note: ''
      },
      current: this.payRechargeData
    }
  },
  created () {
    this.checkStatus()
  }
}
</script>

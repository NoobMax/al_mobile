<template>
  <div class="money-offline__banks">
    <group>
      <popup-radio title="请选择银行"  :options="setBankList" v-model="currentBankId">
        <template slot-scope="props" slot="each-item">
          <div class="money-online__banks">
            <span>{{props.label}}</span>
          </div>
        </template>
      </popup-radio>
      <x-input placeholder="" title="开户行:" :value="setAddress" readonly></x-input>
      <x-input placeholder="" title="卡号:"   :value="setNo" readonly></x-input>
      <x-input placeholder="" title="收款人:" :value="setName" readonly></x-input>
    </group>
    <offline-form :offline-form="offlineForm"/>
    <div class="withdraw-btnGroup offline-btn">
      <button class="btn-block__default btn-primary radius-lg" :class="setSubmitClass" @click="submit">确认充值</button>
    </div>
  </div>
</template>
<script>
import {Group, PopupRadio, XInput, dateFormat} from 'vux'
import _ from 'lodash'
import api from '@/api'
import offlineForm from './offline-form'
import {bankList} from '@/config/money.config'
import {parseCurrentBankInfo, parseCurrentPayInfo} from '@/utils'
export default {
  props: {
    payRechargeData: {}
  },
  components: {
    Group,
    PopupRadio,
    XInput,
    offlineForm
  },
  computed: {
    setName () {
      return this.getCurrentPayInfo() ? this.getCurrentPayInfo().detail.offline_holder : ''
    },
    setNo () {
      return this.getCurrentPayInfo() ? this.getCurrentPayInfo().detail.offline_account : ''
    },
    setAddress () {
      return this.getCurrentPayInfo() ? this.getCurrentPayInfo().detail.offline_acc_open_address : ''
    },
    setBankList () {
      const current = this.getBankInfoById()
      if (current.length > 0) {
        const arr = _.filter(this.bankList, item => {
          return _.find(current, target => target.detail.offline_bank_id === item.key)
        })
        return arr
      }
      return []
    },
    setSubmitClass () {
      return this.checkStatus() ? '' : 'btn-disabled'
    }
  },
  methods: {
    getCurrentPayInfo () {
      const {type} = this.$route.query
      return parseCurrentBankInfo(this.payRechargeData, type, false, this.currentBankId)
    },
    getBankInfoById () {
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
        const payment = this.getCurrentPayInfo().payment_id
        this.$vux.loading.show({
          text: '提交中...'
        })
        api.submitRechargeData(_.assign({}, this.offlineForm, {payment})).then(data => {
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
  },
  data () {
    return {
      bankList,
      currentBankId: 1,
      banksInfo: {
        address: '',
        bank_no: '',
        name: ''
      },
      offlineForm: {
        cashier_relate_name: '',
        cashier_relate_amount: '',
        cashier_relate_date: dateFormat(new Date(), 'YYYY-MM-DD HH:mm'),
        cashier_relate_note: ''
      }
    }
  },
  created () {
    this.checkStatus()
  }
}
</script>


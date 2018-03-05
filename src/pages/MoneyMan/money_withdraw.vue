<template>
  <div class="money-withdraw__wrapper mobile-cell__wrapper">
    <group>
      <div class="withdraw-banks is-add mobile-ft" @click="bankClick">
        <template v-if="bankList.length === 0">
          <div class="withdraw-banks__add-icon"><img v-lazy="require('../../assets/images/add.png')" alt=""></div>
          <div class="winthdraw-banks__add-text">添加/删除银行账户</div>
        </template>
        <template v-else>
          <img v-lazy="bankInfo.icon" alt="">
          <div class="withdraw-banks__bankInfo">
            <p>{{bankInfo.label}}</p>
            <span>{{bankInfo.card_no}}</span>
          </div>
          <actionsheet v-model="actionShow" :menus="bankList" @on-click-menu="clickMenu"></actionsheet>
        </template>
      </div>
      <div class="withdraw-money vux-1px-t">
        <div class="withdraw-money__label">
          <span>账户余额: ￥{{setMoney}}</span>
        </div>
        <x-input placeholder="请输入金额" type="number" v-model="amount"  @keypress.native="keypress" ref="moneyInput" pattern="\d*"></x-input>
      </div>
      <div class="withdraw-pwd vux-1px-t">
        <x-input placeholder="请输入提现密码" type="password" pattern="\d*" v-model="wallet_passwd" :mix="6" :max="6"></x-input>
      </div>
    </group>
    <div class="withdraw-btnGroup">
      <button class="btn-block__default btn-success radius-lg" :class="setConfirmClass" @click="submit">确认提现</button>
      <button class="btn-block__default btn-primary radius-lg" @click="reset">重置金额</button>
    </div>
  </div>
</template>
<script>
import {Group, XInput, Actionsheet} from 'vux'
import {mapGetters} from 'vuex'
import numeral from 'numeral'
import _ from 'lodash'
import api from '@/api'
import keypressMixins from '@/mixins/keypress'
export default {
  components: {
    Group,
    XInput,
    Actionsheet
  },
  mixins: [keypressMixins],
  data () {
    return {
      amount: '',
      wallet_passwd: '',
      actionShow: false,
      bankInfo: {
        label: '',
        card_id: '',
        card_no: '',
        icon: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'bankList'
    ]),
    setLabel () {

    },
    setMoney () {
      const {userInfo} = this
      if (userInfo) {
        return numeral(Number(userInfo.wallet.wallet_cash) + Number(userInfo.wallet.wallet_cash_bonus)).format('0,0.00')
      }
    },
    setConfirmClass () {
      if (!this.checkStatus()) {
        return 'btn-disabled'
      }
      return ''
    }
  },
  methods: {
    // 点击菜单
    clickMenu (key, item) {
      this.bankInfo = _.assign({}, item)
      console.log(key, item)
    },
    checkStatus () {
      if (this.amount && this.wallet_passwd && this.bankInfo.card_id) {
        return true
      }
      return false
    },
    submit () {
      if (this.checkStatus()) {
        this.$vux.loading.show({
          text: '提现中'
        })
        api.submitWithdrawalData({cashier_relate_amount: this.amount, wallet_passwd: this.wallet_passwd, card_id: this.bankInfo.card_id}).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200) {
            this.$router.push('/money/history')
          }
        })
      }
    },
    reset () {

    },
    bankClick () {
      if (this.bankList.length === 0) {
        this.$router.push('/banks/add')
      } else {
        this.actionShow = true
      }
    }
  },
  created () {
    if (this.$store.getters.bankList.length === 0) {
      this.$store.dispatch('fetchBankList').then(() => {
        this.bankInfo = _.assign({}, this.$store.getters.bankList[0])
      })
    } else {
      this.bankInfo = _.assign({}, this.$store.getters.bankList[0])
    }
  },
  mounted () {
    // this.$refs.moneyInput.focus()
  }
}
</script>


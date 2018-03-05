<template>
  <div class="banks-wrapper">
    <x-header title="银行卡管理" class="mobile-header__default" fixed>
    </x-header>
    <div class="banks-add__heading">
      <p>为了您的账号安全,真实姓名要与绑定的银行卡姓名一致</p>
    </div>
    <div class="banks-wrapper__form">
      <group>
        <x-input placeholder="请输入姓名" title="用户姓名:" v-model="bankForm.card_holder" :max="8"></x-input>
        <popup-radio title="选择银行" :options="banks" v-model="bankForm.card_bank_id">
          <template slot-scope="props" slot="each-item">
            <div class="money-online__banks">
              <span>{{props.label}}</span>
            </div>
          </template>
        </popup-radio>
        <x-input placeholder="请输入银行卡号" title="银行卡号:"  v-model="bankForm.card_no" @keypress.native="keypress"  mask="9999 9999 9999 9999 999" :max="23"></x-input>
        <x-input placeholder="请再次输入银行卡号" title="重复卡号:" @keypress.native="keypress" v-model="bankForm.card_no_confirmation" ref="confirmCardNo" :is-type="bankForm.checkCardNo" mask="9999 9999 9999 9999 999" :max="25"></x-input>
        <x-input v-if="passwordShow" autocomplete="off" placeholder="请输入6位提现密码" title="提现密码:" ref="password" :min="6" :max="6" :is-type="setPassword"  v-model="bankForm.wallet_passwd" type="password"></x-input>
        <x-input placeholder="请输入开户地址" title="开户地址:" v-model="bankForm.card_open_address"></x-input>
      </group>
    </div>
    <div class="withdraw-btnGroup">
      <button class="btn-block__default btn-primary radius-lg" :class="setBtnClass" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
import {bankList} from '@/config/money.config'
import {Group, XInput, PopupRadio, XHeader} from 'vux'
import api from '@/api'
import _ from 'lodash'
import {mapGetters} from 'vuex'
import keypressMixins from '@/mixins/keypress'
export default {
  components: {
    Group,
    XInput,
    PopupRadio,
    XHeader
  },
  mixins: [keypressMixins],
  computed: {
    ...mapGetters([
      'bankList'
    ]),
    passwordShow () {
      return this.bankList.length === 0
    },
    setBtnClass () {
      return this.checkStatus() ? '' : 'btn-disabled'
    }
  },
  methods: {
    checkStatus () {
      const obj = _.omitBy(this.bankForm, item => !item)
      if (this.bankList.length > 0 && _.size(obj) === 6 && this.$refs.confirmCardNo.valid) {
        return true
      }
      if (this.bankList.length === 0 && _.size(obj) === 7 && this.$refs.confirmCardNo.valid && this.$refs.password && this.$refs.password.valid) {
        return true
      }
      return false
    },
    submit () {
      if (this.checkStatus()) {
        this.$vux.loading.show({
          text: '提交中'
        })
        const self = this
        const params = this.bankList.length > 0 ? _.omit(this.bankForm, ['wallet_passwd']) : this.bankForm
        api.addBanks(params).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200 || data.status === 201) {
            self.$router.go(-1)
          }
        }).catch(err => {
          console.log(err)
          this.$vux.loading.hide()
        })
        console.log('submit')
      }
    }
  },
  data () {
    const self = this
    return {
      banks: bankList,
      setPassword: function (value) {
        return {
          valid: /^[0-9]*$/g.test(value),
          msg: '请输入纯数字'
        }
      },
      bankForm: {
        card_holder: '',
        card_bank_id: 1,
        card_no: '',
        card_no_confirmation: '',
        card_open_address: '',
        wallet_passwd: '',
        checkCardNo: function (value) {
          return {
            valid: value === self.bankForm.card_no,
            msg: '两次输入不一致'
          }
        }
      }
    }
  },
  created () {
    if (this.$store.getters.bankList.length === 0) {
      this.$store.dispatch('fetchBankList').then()
    }
  }
}
</script>

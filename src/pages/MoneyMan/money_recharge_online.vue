<template>
  <div class="money-wrapper">
    <x-header title="充值管理" class="mobile-header__default" />
    <div class="money-online__content">
      <money-online-header :head-info="setHeadInfo" />
      <group v-if="currentType === 1">
        <popup-radio title="请选择银行" :options="bankList" v-model="currentBankId">
          <template slot-scope="props" slot="each-item">
            <div class="money-online__banks">
              <span>{{props.label}}</span>
            </div>
          </template>
        </popup-radio>
      </group>
      <div class="money-onlie__input">
        <group>
          <x-input :max="7" placeholder="请输入金额" title="￥" type="number" @keypress.native="keypress"  pattern="\d*" v-model="currentMoney"></x-input>
        </group>
      </div>
      <money-list-input :active-index="activeIndex" @click-handle="moneyClick" />
      <div class="withdraw-btnGroup">
        <button class="btn-block__default btn-success radius-lg" :class="setConfirmClass" @click.prevent="submit">确认充值</button>
        <button class="btn-block__default btn-primary radius-lg" @click="reset">重置金额</button>
    </div>
    </div>
  </div>
</template>
<script>
import {PopupRadio, Group, XInput, XHeader} from 'vux'
import moneyOnlineHeader from '@/components/Money/money-online-header'
import moneyListInput from '@/components/Money/money-list'
import {bankList} from '@/config/money.config'
import api from '@/api'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import keypressMixins from '@/mixins/keypress'
import store2 from 'store2'
export default {
  components: {
    PopupRadio,
    Group,
    XInput,
    moneyListInput,
    moneyOnlineHeader,
    XHeader
  },
  mixins: [keypressMixins],
  data () {
    return {
      // 当前是哪种支付类型
      currentType: 1,
      activeIndex: -1,
      currentBankId: 1,
      bankList: [...bankList],
      currentMoney: ''
    }
  },
  computed: {
    ...mapGetters([
      'payRechargeData'
    ]),
    setConfirmClass () {
      if (!this.currentBankId || !this.currentMoney) {
        return 'btn-disabled'
      }
      return ''
    },
    /**
     * 1 为银行在线支付
     * 2 为支付宝
     * 3 为微信
     * 4 QQ支付
     */
    setHeadInfo () {
      return this.getCurrentPay(this.currentType)
    }
  },
  methods: {
    getCurrentPay (onlineId) {
      switch (onlineId) {
        case 0:
          return {
            text: '在线支付',
            word: 'Online Payment',
            img: require('../../assets/images/money/bank_big.png')
          }
        case 2:
          return {
            text: '支付宝',
            word: 'ALIPAY',
            img: require('../../assets/images/money/ali_big.png')
          }
        case 3:
          return {
            text: '微信支付',
            word: 'WECHAT',
            img: require('../../assets/images/money/wechat_big.png')
          }
        case 4:
          return {
            text: 'QQ支付',
            word: 'QQPAY',
            img: require('../../assets/images/money/qq_big.png')
          }
        case 5:
          return {
            text: '财付通',
            word: 'TENPAY',
            img: require('../../assets/images/money/ten_pay.png')
          }
      }
    },
    checkStatus () {
      if (this.currentType === 1) {
        if (this.currentBankId && this.currentMoney) {
          return true
        }
        return false
      } else {
        if (this.currentMoney) {
          return true
        }
        return false
      }
    },
    parseParams () {
      const current = this.payRechargeData[this.$route.params.id]
      if (current && _.isArray(current)) {
        const array = _.filter(current, 'is_online')
        if (array.length > 0) {
          return _.sample(array)
        }
      }
      return ''
    },
    reset () {
      this.currentMoney && (this.currentMoney = '')
      this.currentBankId !== 1 && (this.currentBankId = 1)
    },
    submit () {
      if (this.checkStatus()) {
        const current = this.parseParams()
        if (current) {
          this.$vux.loading.show({
            text: '生成中...'
          })
          api.submitRechargeData({cashier_relate_amount: this.currentMoney, cashier_payment_id: current.payment_id}).then(data => {
            this.$vux.loading.hide()
            if (data.status === 200) {
              console.log('success')
              store2.session.set('money-info', data.data.data)
              this.$router.push({name: 'money_onlie_finish', params: _.assign({}, {id: this.currentType}, data.data.data)})
            }
          }).catch(err => {
            console.log(err)
            this.$vux.loading.hide()
          })
        } else {
          this.$vux.toast.show({
            text: '生成信息失败',
            type: 'warn'
          })
        }
        console.log('submit')
      }
    },
    iconClick () {
      this.activeIndex = -1
    },
    moneyClick (item, index) {
      this.currentMoney = item.money
      this.activeIndex = index
    }
  },
  created () {
    this.currentType = Number(this.$route.params.id)
    this.$store.dispatch('fetchRechargeType')
  }
}
</script>

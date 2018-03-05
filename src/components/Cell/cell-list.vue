<template>
  <group class="mobile-cell__wrapper">
    <div class="cell-wrapper__heading" v-if="title">{{title}}</div>
    <template v-for="(item, index) in list">
      <cell :key="index" :title="item.title" :is-link="item.isLink" :value="item.text | setValue(userInfo)" 
        :link="item.url" :class="item.text === 'balance' ? 'balance-active' : ''">
        <img slot="icon" v-lazy="item.icon" width="25" style="margin-right: 10px"/>
      </cell>
    </template>
  </group>
</template>
<script>
import {Cell, Group} from 'vux'
import numeral from 'numeral'
import _ from 'lodash'
export default {
  components: {
    Cell,
    Group
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    setValue (value, userInfo) {
      if (!_.isEmpty(userInfo)) {
        if (value === 'play') {
          return userInfo.user_name
        }
        if (value === 'balance') {
          return `￥${numeral(Number(userInfo.wallet.wallet_cash) + Number(userInfo.wallet.wallet_cash_bonus)).format('0,0.00')} 元`
        }
      }
    }
  }

}
</script>


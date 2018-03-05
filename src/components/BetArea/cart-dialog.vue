<template>
  <div class="cart-dialog">
   <div class="cart-dialog__heading">
     <span>{{title}}</span>
     <i @click="clearAll"></i>
  </div>
  <div class="cart-dialog__body">
    <ul>
      <li class="cart-dialog__body-item vux-1px-b" v-for="(item, index) in list" :key="index">
        <swipeout>
          <swipeout-item transition-mode="follow">
            <div slot="right-menu">
              <!-- <swipeout-button type="default">取消</swipeout-button> -->
              <swipeout-button type="warn" @click.native="deleteClick(index)">删除</swipeout-button>
            </div>
            <div slot="content" class="cart-dialog__body-content">
              <div class="cart-dialog__body-left">
                <span class="cart-dialog__body-title">{{`${item.number_info.type[0]}/${item.number_info.type[1]}`}}：</span>
                <span class="cart-dialog__body-bet">{{item.number_info.title}} @{{item.odds[0].odds_number_odds}}</span>
              </div>  
              <div class="cart-dialog__body-right">
                <span class="cart-dialog__body-number">{{setBetNumber(item)}}</span>
                <span class="cart-dialog__body-caption">注</span>
                <input class="default-input vux-1px" pattern="\d*" maxlength="8" @keypress="keypress" type="number"  placeholder="单注金额" :value="item.amount" @change="inputChange(index, $event)" />
              </div>  
            </div>
          </swipeout-item>
      </swipeout>
      </li>
    </ul>
  </div> 
  <div class="cart-dialog__footer">
    <div class="cart-dialog__footer-left">
      <p class="cart-dialog__group">
        共<span>{{setTotalGroup}}</span>组
      </p>
      <p class="cart-dialog__total">
        （累计<span>{{setTotalBet}}</span>注）
      </p>
    </div>
    <div class="cart-dialog__footer-right">
      <p>
        总计：
      </p>
      <span>{{setTotalMoney}}</span>
    </div>
  </div> 
  </div>
</template>
<script>
import keypressMixins from '@/mixins/keypress'
import numeral from 'numeral'
import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  mixins: [keypressMixins],
  props: {
    modelShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    totalMoney: {},
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    setTotalGroup () {
      return this.list.length
    },
    setTotalBet () {
      return this.list.length
    },
    setTotalMoney () {
      return numeral(this.totalMoney).format('0.00')
      // if (this.modelShow) {
      //   return numeral(_.sumBy(this.list, item => {
      //     return Number(item.amount)
      //   })).format('0.00')
      // }
    }
  },
  methods: {
    inputChange (index, event) {
      this.$store.commit('set_bet_money', {index, value: event.target.value})
    },
    setBetNumber () {
      return 1
    },
    deleteClick (index) {
      this.$emit('delete-click', index)
    },
    clearAll () {
      const self = this
      this.$vux.confirm.show({
        content: '确认清空嘛?',
        onCancel () {
          console.log(this)
        },
        onConfirm () {
          self.$emit('clear-click')
        }
      })
    }
  }
}
</script>


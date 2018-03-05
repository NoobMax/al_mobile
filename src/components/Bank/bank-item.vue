<template>
<swipeout>
      <swipeout-item transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button type="default">取消</swipeout-button>
          <swipeout-button type="warn" @click.native="deleteClick">删除</swipeout-button>
        </div>
        <div slot="content">
          <div class="bank-item vux-1px-b" @click.prevent="clickHandle">
            <div class="bank-item__icon" v-show="deleteShow">
              <icon :type="setType"></icon>
            </div>
            <div class="bank-item__img">
              <img v-lazy="setImg" alt="">
            </div>
            <div class="bank-item__bankInfo">
              <p>{{setName}}</p>
              <span>{{current.card_no}}</span>
            </div>
          </div>  
        </div>
      </swipeout-item>
  </swipeout>
  
</template>
<script>
import {Icon, Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
import {bankList} from '@/config/money.config'
import _ from 'lodash'
export default {
  components: {
    Icon,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  props: {
    deleteShow: {
      type: Boolean,
      default: false
    },
    activeId: {
      type: Number,
      default: -1
    },
    current: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setName () {
      return _.find(bankList, item => item.key === this.current.card_bank_id).value
    },
    setImg () {
      return _.find(bankList, item => item.key === this.current.card_bank_id).icon
    },
    setType () {
      return this.current.isSelected ? 'success-circle' : 'circle'
    }
  },
  methods: {
    deleteClick () {
      this.$emit('delete-handle', this.current)
    },
    clickHandle () {
      if (this.deleteShow) {
        this.$store.commit('bank_item_selected', this.current)
      }
    }
  }
}
</script>


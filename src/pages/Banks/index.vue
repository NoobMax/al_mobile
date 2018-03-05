<template>
  <div class="banks-wrapper">
    <x-header title="银行卡管理" class="mobile-header__default" fixed>
      <span slot="right" @click="modify" v-show="isAdd">管理</span>
      <span slot="right" @click="finish" v-show="!isAdd">完成</span>
    </x-header>
    <div class="banks-wrapper__table">
      <div class="banks-table__delete vux-1px-b" v-show="!isAdd">
        <div class="banks-table__delete-btn">
          <button class="btn-block__default btn-success radius-lg" @click="deleteItem">删除</button>
        </div>
      </div>
      <bank-item v-for="(item, index) in bankList" :key="index" :current="item" :delete-show="!isAdd" @delete-handle="bankItemDelete"></bank-item>
    </div>
    <div class="withdraw-btnGroup">
      <button class="btn-block__default btn-primary radius-lg" :class="setBtnClass" @click="submit">添加银行卡</button>
    </div>
  </div> 
</template>
<script>
import {XHeader} from 'vux'
import bankItem from '@/components/Bank/bank-item'
import {mapGetters} from 'vuex'
import api from '@/api'
import _ from 'lodash'
export default {
  components: {
    bankItem,
    XHeader
  },
  data () {
    return {
      isAdd: true
    }
  },
  computed: {
    ...mapGetters([
      'bankList'
    ]),
    setBtnClass () {
      return this.checkStatus() ? '' : 'btn-disabled'
    }
  },
  created () {
    this.$store.dispatch('fetchBankList')
  },
  methods: {
    fetchDelete (params) {
      this.$vux.loading.show()
      api.deleteBankById(params).then(data => {
        this.$vux.loading.hide()
        if (data.status === 200) {
          this.$store.dispatch('fetchBankList')
        }
      }).catch(() => {
        this.$vux.loading.hide()
      })
    },
    deleteItem () {
      const current = _.find(this.bankList, item => item.isSelected)
      if (current) {
        this.fetchDelete({id: current.card_id})
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '请选择'
        })
      }
    },
    bankItemDelete (current) {
      this.fetchDelete({id: current.card_id})
      console.log(current)
    },
    submit () {
      if (this.isAdd) {
        this.$router.push({name: 'banks_add'})
      }
    },
    checkStatus () {
      return this.isAdd
    },
    modify () {
      if (this.bankList.length > 0) {
        this.isAdd = false
      }
    },
    finish () {
      this.$store.commit('bank_status_reset')
      this.isAdd = true
    }
  }
}
</script>


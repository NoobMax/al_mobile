<template>
  <div class="money-recharge__wrapper">
      <cell-menu :list="onlinePayList" title="在线支付 ONLINE PAYMENT"></cell-menu>
      <cell-menu :list="offlinePayList" title="线下支付 OFFLINE PAYMENT"></cell-menu>
  </div>
</template>
<script>
import {onlinePayList, offlinePayList} from '@/config/money.config'
import cellMenu from '@/components/Cell/cell-list'
export default {
  components: {
    cellMenu
  },
  data () {
    return {
      onlinePayList,
      offlinePayList
    }
  }
}
</script>

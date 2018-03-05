<template>
  <group>
    <div class="cell-wrapper__heading">付款账户</div>
    <x-input placeholder="请输入姓名" title="用户姓名:" v-model="offlineForm.cashier_relate_name"></x-input>
    <x-input placeholder="请输入金额" title="存款金额:" type="number" @keypress.native="keypress" pattern="\d*" :max="8" v-model="offlineForm.cashier_relate_amount"></x-input>
    <datetime
      v-model="offlineForm.cashier_relate_date"
      format="YYYY-MM-DD HH:mm"
      @on-change="DateTimechange"
      title="汇款日期:"
      @on-cancel="log('cancel')"
      @on-confirm="log('confirm')"
      @on-hide="log('hide', $event)"></datetime>
    <x-input placeholder="" title="备注:" v-model="offlineForm.cashier_relate_note"></x-input>
  </group>
</template>
<script>
import keypressMixins from '@/mixins/keypress'
import {Group, XInput, Datetime} from 'vux'
export default {
  props: {
    offlineForm: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [keypressMixins],
  components: {
    Group,
    XInput,
    Datetime
  },
  methods: {
    DateTimechange (val) {
      console.log(val)
    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    }
  }
}
</script>


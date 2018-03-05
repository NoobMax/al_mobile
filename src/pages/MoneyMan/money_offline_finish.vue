<template>
  <div class="money-wrapper">
    <x-header title="充值" class="mobile-header__default" />
    <div class="money-offline__finish">
      <img v-lazy="require('../../assets/images/success_icon.png')" alt="">
      <h3>提交成功</h3> 
      <h4>等待审核中</h4> 
    </div>
  </div>
</template>
<script>
import {XHeader} from 'vux'
export default {
  components: {
    XHeader
  }
}
</script>


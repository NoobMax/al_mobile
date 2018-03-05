<template>
  <div class="hint-dialog__wrapper" :class="modalShow ? 'is-show' : ''">
  <div class="hint-dialog">
    <div class="hint-dialog__heading">

    </div>
    <div class="hint-dialog__body">
      <div class="balance-dialog__body-left">
        <img v-lazy="require('../../assets/images/fail_icon.png')" alt="">
      </div>
      <div class="balance-dialog__body-right">
        <p>您好, <span>{{setUser}}</span></p>
        <span class="balance-hint__text">您的余额不足</span>
      </div>
    </div>
    <div class="hint-dialog__footer">
      <div class="mobile-btn__inline-group">
        <button class="btn-inline__default btn-primary" @click="close">取消</button>
        <button class="btn-inline__default btn-success" @click="recharge">我要充值</button>
      </div>
    </div>
  </div>  
  <div class="hint-dialog__mask" @click="close" @touchmove.stop.prevent></div>
</div>
</template>
<script>
export default {
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    setUser () {
      return this.userInfo ? this.userInfo.user_name : ''
    }
  },
  methods: {
    close () {
      this.$emit('close-handle')
    },
    recharge () {
      this.$router.push('/money/recharge')
    }
  }
}
</script>

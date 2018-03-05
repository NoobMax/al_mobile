<template>
<div class="hint-dialog__wrapper" :class="modalShow ? 'is-show' : ''">
  <div class="hint-dialog">
    <div class="hint-dialog__heading">

    </div>
    <div class="hint-dialog__body">
      <div class="hint-dialog__body-left">
        <img v-lazy="setImg" alt="">
      </div>
      <div class="hint-dialog__body-right">
        <p>您好, <span>{{setUser}}</span></p>
        <span>欢迎来到 大金彩票</span>
        <h5 v-if="userInfo && userInfo.is_guest">新用户注册 充值就送 <span>100</span></h5>
        <h5 v-else>祝您游戏愉快</h5>
      </div>
    </div>
    <div class="hint-dialog__footer">
      <div class="mobile-btn__inline-group" v-if="userInfo && userInfo.is_guest">
        <button class="btn-inline__default btn-primary" @click="close">取消</button>
        <button class="btn-inline__default btn-success" @click="register">我要注册</button>
      </div>
      <div class="mobile-btn__blok-group" v-if="userInfo && !userInfo.is_guest">
        <button class="btn-block__default btn-primary" @click="close">确定</button>
      </div>
    </div>
  </div>
  <div class="hint-dialog__mask" @click.stop="close" @touchmove.stop.prevent></div>
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
      const {userInfo} = this
      return userInfo && userInfo.is_guest ? '游客' : userInfo.user_name
    },
    setImg () {
      return this.userInfo && this.userInfo.is_guest ? require('../../assets/images/home/hint-money.png') : require('../../assets/images/user/F01.png')
    }
  },
  methods: {
    close () {
      this.$emit('close-handle')
    },
    register () {
      this.$router.push('/register')
      this.$emit('close-handle')
    }
  }
}
</script>


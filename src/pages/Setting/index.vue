<template>
  <div class="setting-wrapper__index">
    <group class="mobile-cell__wrapper">
      <cell title="修改登录密码" is-link link="/setting/login_pwd">
      </cell>
      <cell title="修改支付密码" is-link link="/setting/pay_pwd">
      </cell>
    <!--  <x-switch title="" ></x-switch> -->
      <x-switch title="开奖弹窗"></x-switch>
      <x-switch title="喜报提醒"></x-switch>
      </group>
      <div class="withdraw-btnGroup form-btnGroup">
        <button class="btn-block__default btn-primary radius-lg" @click="offOut">账号退出</button>
        <button class="btn-block__default btn-primary radius-lg" @click="switchOffOut">切换账号</button>
      </div>
  </div>
</template>
<script>
import {Group, Cell, XSwitch} from 'vux'
import {loginOut} from '@/utils'
export default {
  components: {
    Group,
    Cell,
    XSwitch
  },
  methods: {
    switchOffOut () {
      loginOut(this)
      this.$router.replace('/login')
    },
    offOut () {
      loginOut(this)
      this.$router.replace('/')
    }
  }
}
</script>


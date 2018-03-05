<template>
  <div class="mobile-login-form">
      <group>
        <x-input class="mobile-input vux-1px-b" v-model="loginForm.user_name" placeholder="请输入用户名">
          <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/user.png')" alt="用户">
        </x-input>
        <x-input class="mobile-input vux-1px-b" type="password" v-model="loginForm.pass_wd" placeholder="请输入密码">
          <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/passwd.png')" alt="密码">
        </x-input>
      </group>
  </div>
</template>
<script>
import {XInput, Group} from 'vux'
export default {
  components: {
    XInput,
    Group
  },
  data () {
    return {
      loginForm: {
        user_name: 'tiger',
        pass_wd: '123123'
      }
    }
  }
}
</script>


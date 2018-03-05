<template>
  <div class="setting-wrapper__index">
      <group>
        <x-input class="mobile-input" :min="6" :max="6" type="password" required
         v-model="form.wallet_passwd_old" :is-type="form.setPasswordOld" placeholder="请输入旧密码(6位纯数字)" ref="oldPwd">
          <img class="input-img" slot="label"  v-lazy="require('../../assets/images/login/passwd.png')" alt="用户">
        </x-input>
      </group>
      <group>
        <x-input class="mobile-input" required
        type="password" :min="6" :max="6" v-model="form.wallet_passwd" :is-type="form.setPasswordOld" placeholder="请输入新密码(6位纯数字)" ref="pwd">
          <img 
            class="input-img" 
            slot="label" 
            v-lazy="require('../../assets/images/login/passwd.png')" 
            alt="密码">
        </x-input>
        <x-input class="mobile-input" required
        ref="pwdConfirm" type="password" :min="6" :max="6" v-model="form.wallet_passwd_confirmation"  :is-type="form.setPassword_confirmation" placeholder="请确认密码(6位纯数字)">
          <img 
            class="input-img" 
            slot="label" 
            v-lazy="require('../../assets/images/login/passwd.png')" 
            alt="密码">
        </x-input>
      </group>
      <div class="withdraw-btnGroup form-btnGroup">
        <button class="btn-block__default btn-primary radius-lg" :class="setBtnClass"  @click="submit">确认修改</button>
      </div>
    </div>
</template>
<script>
import {XInput, Group} from 'vux'
import api from '@/api'
export default {
  components: {
    XInput,
    Group
  },
  data () {
    const self = this
    return {
      form: {
        wallet_passwd_old: '',
        wallet_passwd: '',
        wallet_passwd_confirmation: '',
        setPasswordOld: function (value) {
          return {
            valid: /^[0-9]*$/g.test(value),
            msg: '请输入纯数字'
          }
        },
        setPassword: function (value) {
          return {
            valid: /^[0-9]*$/g.test(value),
            msg: '请输入纯数字'
          }
        },
        setPassword_confirmation: function (value) {
          return {
            valid: value === self.form.wallet_passwd,
            msg: '输入不一致'
          }
        }
      }
    }
  },
  computed: {
    setBtnClass () {
      /* eslint-disable */
      return this.checkStatus() ? '' : 'btn-disabled'
    }
  },
  methods: {
    checkStatus () {
      /* eslint-disable */
      const {oldPwd, pwd, pwdConfirm} = this.$refs
      const {wallet_passwd_old, wallet_passwd, wallet_passwd_confirmation} = this.form
      if (wallet_passwd_old && wallet_passwd && wallet_passwd_confirmation && oldPwd.valid && pwd.valid && pwdConfirm.valid) {
        return true
      }
      return false
    },
    submit () {
      if (this.checkStatus()) {
        console.log('submit')
        this.$vux.loading.show({
          text: '修改中...'
        })
        api.modifyWithDrawPwd(this.form).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200) {
             this.$vux.toast.show({
              text: '修改成功',
              time: 1000
            })
            this.$router.back()
          }
        }).catch(() => {
          this.$vux.loading.hide()
        })
      }
    }
  }
}
</script>

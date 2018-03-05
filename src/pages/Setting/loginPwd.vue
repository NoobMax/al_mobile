<template>
  <div class="setting-wrapper__index">
      <group>
        <x-input class="mobile-input" type="password" required  :is-type="form.setPasswordOld" ref="oldPwd"
        :min="6" :max="15"  v-model="form.password_old" placeholder="请输入旧密码">
          <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/passwd.png')" alt="用户">
        </x-input>
      </group>
      <group>
        <x-input class="mobile-input" type="password" required :is-type="form.setPassword" ref="pwd"
         :min="6" :max="15" v-model="form.password" placeholder="请输入新密码(6-15位数字字母组合)">
          <img 
            class="input-img" 
            slot="label" 
            v-lazy="require('../../assets/images/login/passwd.png')" 
            alt="密码">
        </x-input> 
        <x-input class="mobile-input" type="password" required :min="6" :is-type="form.setPassword_confirmation" ref="pwdConfirm"
         :max="15" v-model="form.password_confirmation" placeholder="请确认密码">
          <img 
            class="input-img" 
            slot="label" 
            v-lazy="require('../../assets/images/login/passwd.png')" 
            alt="密码">
        </x-input>
      </group>
      <div class="withdraw-btnGroup form-btnGroup">
        <button class="btn-block__default btn-primary radius-lg" :class="setBtnClass" @click="submit" >确认修改</button>
      </div>
    </div>
</template>
<script>
import {XInput, Group} from 'vux'
import api from '@/api'
import {loginOut} from '@/utils'
export default {
  components: {
    XInput,
    Group
  },
  data () {
    const self = this
    return {
      form: {
        password_old: '',
        password: '',
        password_confirmation: '',
        setPasswordOld: function (value) {
          return {
            valid: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(value),
            msg: '请输入6-15位'
          }
        },
        setPassword: function (value) {
          return {
            valid: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(value),
            msg: '请输入6-15位'
          }
        },
        setPassword_confirmation: function (value) {
          return {
            valid: value === self.form.password_confirmation,
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
      const {oldPwd, pwd, pwdConfirm} = this.$refs
      const {password_old, password, password_confirmation} = this.form
      if (password_old && password && password_confirmation && oldPwd.valid && pwd.valid && pwdConfirm.valid) {
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
        api.modifyPwd(this.form).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200) {
             this.$vux.toast.show({
              text: '修改成功',
              time: 1000
            })
            loginOut(this)
            this.$router.replace('/')
          }
        })
      }
    }
  }
}
</script>

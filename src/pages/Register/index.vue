<template>
  <div class="mobile-container__wrapper">
    <x-header title="用户注册" class="mobile-header__default"></x-header>
    <div class="mobile-login">
      <div class="mobile-form">
        <group>
          <x-input class="mobile-input vux-1px-b" v-model="registForm.user_name" :debounce="500"
           placeholder="请输入用户账号">
            <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/user.png')" alt="用户">
          </x-input>
          <x-input class="mobile-input vux-1px-b" type="password" v-model="registForm.user_passwd" placeholder="请输入登录密码">
            <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/passwd.png')" alt="密码">
          </x-input>
          <x-input class="mobile-input vux-1px-b" type="password" v-model="registForm.user_passwd_confirmation" placeholder="请输入确认密码">
            <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/repeatPwd.png')" alt="密码">
          </x-input>
          <div class="mobile-form__msg">
            <p>如何得知本站：</p>
            <checker v-model="registForm.user_reg_source" default-item-class="form-msg__default" selected-item-class="form-msg__active">
              <checker-item value="0">网络广告</checker-item>
              <checker-item value="1">比分网</checker-item>
              <checker-item value="2">朋友推荐</checker-item>
              <checker-item value="3">论坛</checker-item>
            </checker>
          </div>
        </group>
        <div class="mobile-form__footer">
          <router-link to="/">联系客服</router-link>
        </div>
      </div>
      <div class="withdraw-btnGroup form-btnGroup">
        <button class="btn-block__default btn-success radius-lg" :class="setConfirmClass" @click="submit">确认注册</button>
      </div>
      <div class="mobile-login__footer">
        <router-link to="/login">已有账号</router-link>
        <a href="javascript:;" @click="guestLogin">免费试玩</a>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import _ from 'lodash'
import store2 from 'store2'
import {XInput, Group, XHeader, Checker, CheckerItem} from 'vux'
export default {
  components: {
    XInput,
    Group,
    XHeader,
    Checker,
    CheckerItem
  },
  data () {
    return {
      registForm: {
        user_name: '',
        user_passwd: '',
        user_passwd_confirmation: '',
        user_reg_source: '0'
      }
    }
  },
  methods: {
    guestLogin () {
      this.$vux.loading.show()
      api.guest().then(data => {
        this.$vux.loading.hide()
        if (data.status === 200) {
          store2.session.set('user-info', data.data.data)
          store2.session.set('auth-token', data.data.token)
          this.$store.commit('user_info_receive')
          if (!data.data.data.user_remember_token) {
            this.$store.commit('show_index_hintDialog')
            setTimeout(() => {
              this.$store.commit('hide_index_hintDialog')
            }, 4000)
          }
          this.$router.replace('/')
        }
      }).catch(err => {
        console.log(err)
        this.$vux.loading.hide()
      })
    },
    async checkUserName (params) {
      try {
        const data = await api.checkUserName(params)
        if (data.status === 200) {
          return data.data.status
        }
        return Promise.reject(new Error('错误'))
      } catch (error) {
        return Promise.reject(error)
      }
    },
    checkStatus () {
      const obj = _.omitBy(this.registForm, item => !item)
      if (_.size(obj) === 4) {
        return true
      }
      return false
    },
    submit () {
      if (this.checkStatus()) {
        this.$vux.loading.show({
          text: '注册中...'
        })
        api.regist(this.registForm).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200) {
            this.$vux.toast.show({
              text: '注册成功',
              time: 1000
            })
            this.$router.replace({name: 'login', params: {registForm: this.registForm}})
            // this.$router.push('/money/recharge')
          }
        }).catch(err => {
          console.log(err)
          this.$vux.loading.hide()
        })
      }
    }
  },
  computed: {
    setConfirmClass () {
      return !this.checkStatus() ? 'btn-disabled' : ''
    }
  }
}
</script>


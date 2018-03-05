<template>
  <div class="mobile-container__wrapper">
    <x-header title="用户登录" class="mobile-header__default" :left-options="{preventGoBack: true}" @on-click-back="$router.replace('/')"></x-header>
    <div class="mobile-login">
      <div class="mobile-form">
        <group>
          <x-input class="mobile-input vux-1px-b" v-model="loginForm.user_name" placeholder="请输入用户名">
            <img class="input-img" slot="label" v-lazy="require('../../assets/images/login/user.png')" alt="用户">
          </x-input>
          <x-input class="mobile-input vux-1px-b" type="password" v-model="loginForm.user_passwd" placeholder="请输入密码">
            <img 
              class="input-img" 
              slot="label" 
              v-lazy="require('../../assets/images/login/passwd.png')" 
              alt="密码">
          </x-input>
        </group>
        <div class="mobile-form__footer">
          <router-link to="/">联系客服</router-link>
        </div>
      </div>
      <div class="withdraw-btnGroup form-btnGroup">
        <button class="btn-block__default btn-success radius-lg" :class="setConfirmClass" @click="submit">确认登录</button>
        <button class="btn-block__default btn-primary radius-lg" @click="$router.push('/register')">马上注册</button>
      </div>
      <div class="mobile-login__footer">
        <router-link to="/">忘记密码</router-link>
        <a href="javascript:;" @click="guestLogin">免费试玩</a>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import store2 from 'store2'
import {XInput, Group, XHeader} from 'vux'
export default {
  components: {
    XInput,
    Group,
    XHeader
  },
  data () {
    return {
      loginForm: {
        user_name: 'leo456',
        user_passwd: 'xiacan12'
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
    checkStatus () {
      if (this.loginForm.user_name && this.loginForm.user_passwd) {
        return true
      }
      return false
    },
    submit () {
      if (this.checkStatus()) {
        this.$vux.loading.show({
          text: '登录中...'
        })
        api.login(this.loginForm).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200) {
            store2.session.set('user-info', data.data.data)
            store2.session.set('auth-token', data.data.token)
            store2.session.set('identifier', data.data.identifier)
            if (!data.data.data.user_remember_token) {
              this.$store.commit('show_index_hintDialog')
            }
            this.$router.push({name: 'home'})
          }
        }).catch(error => {
          console.log('error===========' + error)
          this.$vux.loading.hide()
        })
      }
    }
  },
  computed: {
    setConfirmClass () {
      return !this.checkStatus() ? 'btn-disabled' : ''
    }
  },
  created () {
    const {registForm} = this.$route.params
    if (registForm) {
      this.loginForm.user_name = registForm.user_name
      this.loginForm.user_passwd = registForm.user_passwd
    }
  }
}
</script>


<template>
  <div class="cp-mobile__header">
    <div class="cp-mobile__header-logo">
      <i></i>
    </div>
    <div class="cp-mobile__header-userInfo" v-if="$route.path !== '/user'">
      <template  v-if="setLogin">
        <div @click="show">
          <p>{{userInfo && !userInfo.is_guest ? userInfo.user_name : '游客'}}</p>
          <div class="mobile-plus" :class="isShow ? 'is-rotate' : ''"></div>
        </div>
      </template>
      <template v-else>
        <button class="mobile-default-btn" @click="guestLogin">试玩</button>
        <button class="mobile-default-btn" @click="$router.push('/login')">登录</button>
      </template>
    </div>
    <div class="cp-mobile__header-setting" v-if="$route.path === '/user'" @click="$router.push('/setting')">
      设置
    </div>
    <div class="mobile-header__user-wrapper" :class="isShow ? 'is-show' : ''">
      <div class="mobile-header__usermenu">
        <i class="triangle-default mobile-header__usermenu-triangle"></i>
        <cell-menu :list="cellList" :user-info="userInfo"/>
        <div class="mobile-btn__inline-group">
          <button class="btn-inline__default btn-primary" @click="closeUser">账户退出</button>
          <button class="btn-inline__default btn-primary" @click="closeUser">切换账号</button>
        </div>
      </div>
      <div class="mobile-header__mask" @click="close" @touchmove.stop.prevent></div>
    </div>
  </div>
</template>
<script>
import {cellList} from '@/config/home.config'
import cellMenu from '@/components/Cell/cell-list'
import _ from 'lodash'
import {loginOut} from '@/utils'
export default {
  components: {
    cellMenu
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cellList
    }
  },
  computed: {
    setLogin () {
      return this.userInfo && !_.isEmpty(this.userInfo)
    }
  },
  methods: {
    guestLogin () {
      this.$emit('guest-login')
    },
    show () {
      this.$emit('click-handle')
    },
    close () {
      this.$emit('hidden-change')
    },
    closeUser (value) {
      loginOut(this)
      this.$router.replace('/login')
    }
  }
}
</script>


<template>
<div class="cp-mobile-home">
  <cp-header :is-show="isShow" @click-handle="headerMenuHandle" @hidden-change="headerMenuClose"
  @guest-login="guestLogin"
   :user-info="userInfo" />
   <div class="app-mask" v-show="!userInfo || (userInfo && !userInfo.user_name)" @click="maskHint"></div>
  <div class="cp-mobile__wrapper" :class="isShow ? 'is-blur' : ''">
      <transition name="move">
    <keep-alive>
      <router-view class="view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    </transition>
    <transition name="move">
    <router-view class="view" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
  <cp-tabbar />
</div>
</template>
<script>
import {swiperList} from '@/config/home.config'
import {mapGetters} from 'vuex'
import cpSwiper from '@/components/Home/swiper'
import cpHeader from '@/components/Header/header'
import cpTabbar from '@/components/Tabbar/tabbar'
import store2 from 'store2'
import api from '@/api'
export default {
  components: {
    cpSwiper,
    cpHeader,
    cpTabbar
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
      swiperList,
      isShow: false
    }
  },
  methods: {
    maskHint () {
      this.$vux.toast.show({
        text: '请先登录',
        type: 'warn',
        time: 1000
      })
      this.$router.push('/login')
    },
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
        }
      }).catch(err => {
        console.log(err)
        this.$vux.loading.hide()
      })
    },
    headerMenuHandle () {
      debugger
      this.isShow = !this.isShow
    },
    headerMenuClose () {
      this.isShow = false
    }
  },
  created () {
    // if (this.userInfo.user_remember_token) {
    //   setTimeout(() => {
    //     this.$store.commit('show_index_hintDialog')
    //   }, 400)
    // }
    this.$store.commit('user_info_receive')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>




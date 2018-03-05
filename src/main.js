// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import routes from './router'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'animate.css'
import 'vux/src/styles/1px.less'
import '@/utils/computedFont'
import {LoadingPlugin, ToastPlugin, DatetimePlugin, ConfirmPlugin} from 'vux'
FastClick.attach(document.body)
// window.store2 = require('store2')
// window._ = require('lodash')
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(VueLazyload)
/* eslint-disable */
// const VConsole = require('vconsole')
// var vConsole = new VConsole()
Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
// router loading ...
router.beforeEach((to, from, next) => {
  store.commit('over_loading_receive', {isLoading: true})
  next()
})
router.afterEach((to) => {
	store.commit('over_loading_receive', {isLoading: false})
})
/* eslint-disable no-new */
window.__vueInstance__ = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

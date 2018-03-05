
<template>
  <div class="betArea-wrapper">
    <x-header class="mobile-header__default" :left-options="{preventGoBack: true}" @on-click-back="$router.go(-1)">
      <div slot="default" class="header-title" @click="titleClick">{{title}}
        <div class="mobile-ft" :class="menuModalShow ? 'is-up' : 'is-down'"></div>
      </div>
    </x-header>
    <div class="betArea-wrapper__container" :class="cartModalShow || menuModalShow ? 'is-blur' : ''" >
      <bet-area-timer :user-info="userInfo" :current="setRoundData" :activeId="lotteryClassActive"/>
      <div style="position: absolute; left:0; right:0; z-index: 200">
        <button-tabs v-show="$route.name !=='marksix'" @click-handle="tabClick" :list="lotterySubList" :active="activeIndex"/>
        <expand-tabs v-show="$route.name ==='marksix'" :list="lotterySubList" :activeIndex="markActiveIndex" @tab-click="expandTabsClick"/>
      </div>
      <div class="betArea-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
    <div v-transfer-dom class="cart-popup">
      <popup v-model="cartModalShow" position="bottom" style="overflow-x: hidden;" class="cartPopup">
        <div>
          <cart-dialog :list="betOddsList" :model-show="cartModalShow" :total-money="totalMoney" @clear-click="clearAll"
           @delete-click="deleteCurrent" title="注：最新注额单位为 元" />
        </div>
      </popup>
    </div>
    <div class="betArea-cart" :class="!isClose ? 'is-collapse' : ''">
      <div class="betArea-cart__icon" @click="cratClick" ref="cartContainer" :class="setCartClass">
        <i v-show="betOddsList.length > 0">{{setTotalNumber}}</i>
        <img v-lazy="require('../../assets/images/lottery/cart.png')" alt="">
      </div>
      <div class="betArea-cart__body">
        <span>{{betOddsList.length === 0 ? '请选择投注号码' : `已选择${betOddsList.length} 组`}}</span>
        <div class="betArea-cart__body-input" v-show="cartModalShow">
          <input class="default-input"  maxlength="8" @keypress="keypress" type="number"  v-model="setMoney" pattern="\d*">
        </div>
        <div class="betArea-cart__body-button" v-show="cartModalShow">
          <button class="btn-block__default btn-success" :class="setBtnClass" @click="submit">确认</button>
        </div>
      </div>
    </div>
   <!-- 飞行小球 -->
    <div class="ball-content">
      <div v-for="(ball, key) in balls" :key="key">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show" ref="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="menuModalShow" position="left" width="50%" class="popup">
        <div class="popup-wrapper">
          <div class="mobile-close" @click="menuModalShow = false"></div>
          <lottery-title-list :list="lotteryClassList" :activeId="lotteryClassActive"
           @click-handle="lotteryTitleClick" />
        </div>
      </popup>
    </div>
    <balance-dialog :modalShow="balanceModalShow" :user-info="userInfo" @close-handle="balanceModalClose" />
  </div>
</template>
<script>
import {XHeader, TransferDom, Popup} from 'vux'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import api from '@/api'
import buttonTabs from '@/components/Button/button-tab'
import betAreaTimer from '@/components/BetArea/betArea-timer'
import cartDialog from '@/components/BetArea/cart-dialog'
import lotteryTitleList from '@/components/Lottery/lottery-title-list'
import expandTabs from '@/components/BetArea/expand-tabs'
import {lotteryClassList} from '@/config/lottery.config'
import keypressMixins from '@/mixins/keypress'
import balanceDialog from '@/components/BetArea/balance-dialog'
export default {
  directives: {
    TransferDom
  },
  mixins: [keypressMixins],
  components: {
    XHeader,
    Popup,
    betAreaTimer,
    buttonTabs,
    cartDialog,
    expandTabs,
    lotteryTitleList,
    balanceDialog
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'roundData',
      'lotterySubList',
      'betOddsList',
      'totalMoney',
      'elLeft',
      'elBottom',
      'elTarget',
      'roundpk10',
      'roundcqssc',
      'roundxyft',
      'roundpcdd',
      'roundcqxync',
      'roundgdklsf',
      'roundmarksix'
    ]),
    setRoundData () {
      const {name} = this.$route
      return this[`round${name}`]
    },
    setTotalNumber () {
      return this.betOddsList.length
    },
    setCartClass () {
      if (this.betOddsList.length > 0) {
        if (this.carting) {
          return 'is-active is-drop'
        }
        return 'is-active'
      }
      return ''
    },
    setBtnClass () {
      console.log('status=======' + this.checkBtnStatus())
      return !this.checkBtnStatus() ? 'btn-disabled' : ''
    },
    setMoney: {
      get () {
        return this.money
      },
      set (val) {
        this.$store.commit('set_all_bet_money', val)
        this.money = val
      }
    }
  },
  data () {
    return {
      balanceModalShow: false,
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      carting: false,
      activeIndex: 0, // 除六合彩tab切换时的index
      isClose: false,
      cartModalShow: false, // 打开购物车
      money: '', // 总的金额
      menuModalShow: false, // 打开侧边栏
      lotteryClassList, // 彩种tab的列表
      lotteryClassActive: 1, // 彩种的id
      markActiveIndex: 0, // 六合彩tab的index
      title: '北京赛车' // 标题
    }
  },
  methods: {
    balanceModalClose () {
      this.balanceModalShow = false
    },
    clearAll () {
      if (this.betOddsList.length > 0) {
        this.$store.commit('reset_all_odds_data')
        setTimeout(() => {
          this.cartModalShow = false
          this.money = ''
        }, 400)
      }
    },
    // 删除当前目录
    deleteCurrent (index) {
      this.$store.commit('delete_current_odds', index)
      if (this.betOddsList.length === 0) {
        setTimeout(() => {
          this.cartModalShow = false
          this.money = ''
        }, 400)
      }
    },
    drop (el) {
      for (var i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = this.$store.getters.elTarget
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        this.carting = true
        el.addEventListener('transitionend', () => {
        })
      })
    },
    afterDrop (el) {
      this.$nextTick(() => {
        this.carting = false
      })
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    lotteryTitleClick (item) {
      if (this.betOddsList.length > 0) {
        this.$store.commit('reset_all_odds_data')
      }
      this.money && (this.money = '')
      this.title = item.title
      this.lotteryClassActive = item.id
      this.menuModalShow = false
      this.$router.replace({name: item.value, query: {number_class: item.id + '01'}})
    },
    // 切换彩种
    titleClick () {
      this.menuModalShow = true
    },
    // 检查按钮的状态
    checkBtnStatus () {
      console.log('btn')
      if (this.betOddsList.length === 0 || _.find(this.betOddsList, item => !item.amount)) {
        return false
      }
      return true
    },
    // 解析提交数据
    formatOdds (array) {
      const rootObj = _.groupBy(array, item => item.number_class)
      let result = {}
      _.forEach(rootObj, (item, index) => {
        let current = []
        var obj = _.groupBy(item, current => current.number_code)
        _.forEach(obj, (item, index) => {
          current.push({
            [index]: item[0].amount
          })
        })
        result[index] = current
      })
      return result
    },
    // 提交
    submit () {
      if (this.checkBtnStatus()) {
        const data = this.formatOdds(this.betOddsList)
        this.$vux.loading.show({
          text: '投注中...'
        })
        api.checkoutBetAreaOdds(data).then(data => {
          this.$vux.loading.hide()
          if (data.status === 200) {
            this.$vux.toast.show({
              text: '投注成功',
              time: 1000
            })
            this.cartModalShow = false
            this.money = ''
            this.$store.commit('reset_all_odds_data')
            console.log('投注成功')
          } else if (data.status === 400) {
            if (data.data.message.trim() === '余额不足！') {
              this.balanceModalShow = true
              return false
            }
            this.$vux.toast.show({
              text: data.data.message,
              type: 'warn',
              time: 1500
            })
          }
        }).catch(err => {
          console.log(err)
          this.$vux.loading.hide()
        })
      }
    },
    // 点击购物车按钮
    cratClick () {
      if (this.betOddsList.length > 0) {
        this.cartModalShow = true
      } else {
        this.$vux.toast.show({
          type: 'warn',
          text: '请先投注',
          time: 1000
        })
      }
      // this.isClose = false
    },
    // 六合彩的切换
    expandTabsClick (item, index) {
      let number = 701
      if (item.classify_name === '特码') {
        number = 701
      } else if (item.classify_name === '正码') {
        number = 703
      } else if (item.classify_name === '正特码') {
        number = 705
      } else {
        number = item.classify_code
      }
      this.markActiveIndex = index
      this.$router.replace({name: this.$route.name, query: {number_class: number}})
    },
    // 切换按钮
    tabClick (item, index) {
      console.log(index)
      this.activeIndex = index
      this.$router.replace({name: this.$route.name, query: {number_class: item.classify_code}})
    }
  },
  watch: {
    elLeft () {
      console.log('elLeft')
      this.drop(this.$refs.ball[0])
    },
    $route (route, oldRoute) {
      if (route.name !== oldRoute.name) {
        this.$store.dispatch('fetchLotteryClassify', {classifyName: route.name})
        this.$store.dispatch('fetchRoundData', {lottery: route.name})
        if (route.name === 'marksix') {
          this.markActiveIndex = 0
        } else {
          this.activeIndex = 0
        }
      }
    }
  },
  created () {
    const {name} = this.$route
    const number = Number(this.$route.query.number_class)
    this.title = _.find(lotteryClassList, item => item.value === name).title
    this.lotteryClassActive = _.find(lotteryClassList, item => item.value === name).id
    this.$store.commit('user_info_receive')
    this.$store.dispatch('fetchRoundData', {lottery: name})
    this.$store.dispatch('fetchLotteryClassify', {classifyName: name}).then(() => {
      if (name === 'marksix') {
        if (number < 711 && number > 704) {
          this.markActiveIndex = 2
        } else if (number > 702 && number < 705) {
          this.markActiveIndex = 1
        } else if (number > 700 && number < 703) {
          this.markActiveIndex = 0
        } else {
          // this.markActiveIndex = _.findIndex(this.$store.getters.lotterySubList, ['classify_code', number])
          this.markActiveIndex = this.$store.getters.lotterySubList.findIndex(item => item.classify_code === number)
        }
      } else {
        // this.activeIndex = _.findIndex(this.$store.getters.lotterySubList, ['classify_code', number])
        this.activeIndex = this.$store.getters.lotterySubList.findIndex(item => item.classify_code === number)
      }
    })
  },
  mounted () {
    this.windowHeight = window.innerHeight
  }
}
</script>


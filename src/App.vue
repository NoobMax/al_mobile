<template>
  <div id="app">
    <loading :visible="overAllLoading" />
    <router-view  :class="indexHintShow ? 'is-blur' : ''"></router-view>
    <hint-dialog :modal-show="indexHintShow" @close-handle="closeDialog" :user-info="userInfo" />
    <component :is="currentCom" :modalShow="winDialogShow" :current="winData" @close-handle="winDialogClose" />
    <!-- <winning-dialog :modalShow="winDialogShow" :current="winData" @close-handle="winDialogClose" /> -->
  </div>
</template>

<script>
import config from '@/config'
import io from 'socket.io-client'
import store2 from 'store2'
import hintDialog from '@/components/common/hint-dialog'
import winningDialog from '@/components/BetArea/winning-dialog'
import {mapGetters} from 'vuex'
import _ from 'lodash'
import loading from '@/components/common/loading'
import { initAudio } from '@/utils/audio'
export default {
  name: 'app',
  components: {
    hintDialog,
    loading,
    winningDialog
  },
  methods: {
    closeDialog () {
      this.$store.commit('hide_index_hintDialog')
    },
    winDialogClose () {
      this.winDialogShow = false
      this.currentCom = ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'indexHintShow',
      'overAllLoading',
      'winData'
    ])
  },
  watch: {
    // indexHintShow (val) {
    //   debugger
    //   console.log('hintDialog =================' + val)
    //   if (val) {
    //     this.hintShow = true
    //     setTimeout(() => {
    //       this.hintShow = false
    //     }, 3000)
    //   }
    // }
  },
  data () {
    return {
      hintShow: false,
      winDialogShow: false,
      currentCom: ''
      // winData: {
      //   betslip_amt_total: 2000,
      //   win_total: 5000,
      //   betslip_rebate_total: 200,
      //   round_current: 657364,
      //   /* eslint-disable */
      //   round_numbers_prev: {
      //     numbers: [1, 2, 3, 5, 10, 9, 7, 8, 9, 3],
      //     formulas: [[5,"小","单"],["虎","虎","虎","龙","虎"]]
      //   }
      // }
    }
  },
  created () {
    this.$store.commit('user_info_receive')
    const {userInfo} = this.$store.getters
    if (!_.isEmpty(userInfo)) {
      let ws
      if (store2.session.get('identifier')) {
        ws = io(config.api, {
          query: {
            identifier: store2.session.get('identifier')
          }
        })
      } else {
        ws = io(config.api)
      }
      // 中奖信息推送
      ws.on('receive.message', (data) => {
        if (data && data.type === 'sync') {
          this.$store.commit('current_timestamp_receive', {timestamp: data.currentTime})
        } else {
          this.$store.commit('get_sync_round_data', {data})
        }
        // if (data.data && getCurrentLotCode(this.activeRoute) === data.data.lot_code) {
        // }
        console.log('data==============' + JSON.stringify(data) + '\n===========' + this.activeRoute)
      })
      // 异地登录
      ws.on('cp6686:pKick', (data) => {
        // if (data && data.token !== this.$store.getters.userInfo.user_remember_token) {
        //   // kickingOff(this, data)
        // }
      })
      // 开奖
      ws.on('cp6686:pMessage', (data) => {
        if (data && data.message_type === 1) {
          this.winDialogShow = true
          setTimeout(() => {
            this.winDialogShow = false
            this.currentCom = ''
          }, 8000)
          this.$store.commit('win_betarea_receive', {data: data})
          this.currentCom = 'winningDialog'
          this.sound.play()
        }
        console.log('开奖啦=============' + JSON.stringify(data))
      })
    }
  },
  mounted () {
    this.sound = initAudio({
      src: [require('./assets/media/6c0bc97ad75aee55f91bce84efa7813e.mp3')]
    })
  }
}
</script>
<style lang="scss">
  @import './assets/styles/base/rest.scss';
  @import './assets/styles/base/public.scss';
  @import './assets/styles/base/login.scss';
  @import './assets/styles/base/home.scss';
  @import './assets/styles/base/user.scss';
  @import './assets/styles/base/lottery.scss';
  @import './assets/styles/base/find.scss';
  @import './assets/styles/base/money.scss';
  @import './assets/styles/base/banks.scss';
  @import './assets/styles/base/betArea.scss';
  @import './assets/styles/base/setting.scss';
  @import './assets/styles/base/setting.scss';
  @import './assets/styles/base/betRecord.scss';
</style>


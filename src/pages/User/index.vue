<template>
  <div>
    <div class="mobile-user">
      <div class="mobile-user__info-content">
        <user-info :user-info="userInfo" />
      </div>
      <div class="mobile-user__money"></div>
      <group class="mobile-cell__wrapper">
        <cell title="交易记录" is-link link="/money/history">
          <img slot="icon" v-lazy="require('../../assets/images/user/user_tr.png')"  width="25" style="margin-right: 10px" alt="">
        </cell>
        <cell title="下注记录" is-link link="/betrecord?lottery_class=0">
          <img slot="icon" v-lazy="require('../../assets/images/user/user_history.png')"  width="25" style="margin-right: 10px" alt="">
        </cell>
        <cell title="银行卡" is-link link="/banks">
          <img slot="icon" v-lazy="require('../../assets/images/user/user_bank.png')"  width="25" style="margin-right: 10px" alt="">
        </cell>
      </group>
      <group class="mobile-cell__wrapper">
        <cell title="游戏规则" is-link>
          <img slot="icon" v-lazy="require('../../assets/images/user/user_rule.png')"  width="25" style="margin-right: 10px" alt="">
        </cell>
        <cell title="关于我们" is-link>
          <img slot="icon" v-lazy="require('../../assets/images/user/user_me.png')"  width="25" style="margin-right: 10px" alt="">
        </cell>
        <cell title="联系我们" is-link>
          <img slot="icon" v-lazy="require('../../assets/images/user/user_call.png')"  width="25" style="margin-right: 10px" alt="">
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import {Cell, Group} from 'vux'
import {mapGetters} from 'vuex'
import userInfo from '@/components/User/user-info'
// import _ from 'lodash'
export default {
  components: {
    Cell,
    Group,
    userInfo
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    // if (_.isEmpty(this.$store.getters.userInfo)) {
    //   this.$store.commit('user_info_receive')
    // }
  }
}
</script>


<template>
  <div class="details-wrapper">
    <x-header title="个人信息" class="mobile-header__default" />
    <div class="setting-wrapper__index">
     <group class="mobile-cell__wrapper">
        <cell title="我的头像" align-items="center">
          <img  v-lazy="require('../../assets/images/user/F01.png')" style="width: 40px; vertical-align: middle" alt="">
        </cell>
        <cell title="我的账号" primary="content" :value="userInfo ? userInfo.user_name : '--'">
        </cell>
        <cell title="真实姓名" primary="content" :value="userInfo ? userInfo.name : ''">
        </cell>
        <cell title="我的等级" primary="content" :value="userInfo ? userInfo.level : '--'">
        </cell>
        <cell title="手机号码" primary="content" :value="userInfo ? userInfo.phone : '--'">
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import {XHeader, Group, Cell} from 'vux'
import {mapGetters} from 'vuex'
export default {
  components: {
    XHeader,
    Group,
    Cell
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
    }
  }
}
</script>

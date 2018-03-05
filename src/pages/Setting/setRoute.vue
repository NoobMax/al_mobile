<template>
  <div class="setting-wrapper">
    <x-header :title="title" class="mobile-header__default" />
    <router-view></router-view>
  </div>
</template>
<script>
import {XHeader} from 'vux'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      title: '设置'
    }
  },
  watch: {
    $route () {
      this.title = this.$route.meta.title
    }
  },
  created () {
    this.title = this.$route.meta.title
  }
}
</script>


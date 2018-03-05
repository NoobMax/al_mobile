<template>
  <ul class="mobile-home-menu">
    <li v-for="(item, index) in menuList" :key="index" class="mobile-home-menu__item" @click="enterGames(item)">
      <div class="mobile-home-menu__body">
        <img v-lazy="item.img" :alt="item.title">
      </div>
      <div class="mobile-home-menu-footer">
        <span>{{item.title}}</span>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    enterGames (item) {
      this.$emit('click-handle', item)
    }
  }
}
</script>

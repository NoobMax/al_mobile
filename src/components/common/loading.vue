<template>
  <transition name="cp-loading">
    <div class="cp-loading" v-show="visible">
      <div class="cp-loading__wrapper">
       <div class="loader-inner line-scale-pulse-out-rapid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
        <!-- <span class="cp-loading__text" v-show="text">{{ text }}</span> -->
     <!--  <div class="cp-loading__wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
      </div> -->
      <div class="cp-loading__mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>


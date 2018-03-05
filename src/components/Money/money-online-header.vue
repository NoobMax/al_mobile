<template>
  <div class="money-online__heading">
      <img v-lazy="headInfo.img" alt="">
      <div class="money-onlie__heading-body">
        <p>{{headInfo.text}}</p>
        <span>{{headInfo.word}}</span>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    headInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>


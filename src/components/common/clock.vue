<template>
 <div id="clock">
        <span class="group hours" v-if="hoursShow">
          <span class="num" id="hours0">{{setHour0}}</span>
          <span class="num" id="hours1">{{setHour1}}</span>
          <b>:</b>
        </span>
        <span class="num" id="minutes0">{{setMin0}}</span>
        <span class="num" id="minutes1">{{setMin1}}</span>
        <span class="group seconds">
          <b>:</b>
        <span class="num" id="seconds0">{{setSecond0}}</span>
        <span class="num" id="seconds1">{{setSecond1}}</span>
      </span>
    </div>
</template>
<script>
export default {
  props: {
    hours: {},
    minutes: {},
    seconds: {},
    hoursShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: this.time,
      isAnimated: false,
      hour: 0
    }
  },
  computed: {
    setHour0 () {
      return (this.hours + '').split('')[0]
    },
    setHour1 () {
      return (this.hours + '').split('')[1]
    },
    setMin0 () {
      return (this.minutes + '').split('')[0]
    },
    setMin1 () {
      return (this.minutes + '').split('')[1]
    },
    setSecond0 () {
      return (this.seconds + '').split('')[0]
    },
    setSecond1 () {
      return (this.seconds + '').split('')[1]
    }
  },
  watch: {
    value (val) {
      this.value = val
    }
  },
  created () {
    // this.timer = setInterval(this.startAnimate, 1000)
  },
  methods: {
    startAnimate () {
      this.value -= 1
      this.$emit('on-tick', this.value)
      if (this.value === 0) {
        this.$emit('on-finish')
        clearInterval(this.timer)
        this.timer = null
      }
      // this.isAnimated = !this.isAnimated
    },
    formatTime (time) {
      if (time) {
        if (time < 10) {
          return [0, time]
        }
        return (time + '').split('')
      }
      return [0, 0]
    },
    getHours (time) {
      if (isNaN(Number(time))) {
        return [0, 0]
      }
      const hour = Math.floor(Number(time) / 3600)
      return this.formatTime(hour)
    },
    getMinutes (time) {
      if (isNaN(Number(time))) {
        return [0, 0]
      }
      const min = Math.floor(Number(time) / 60)
      return this.formatTime(min)
    },
    getSeconds (time) {
      const second = Math.floor(Number(time) % 60)
      return this.formatTime(second)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/base/fn.scss';
:host {
  display: block;
}

#clock {
  font-size: 0;
  font-family: Arial, Verdana, sans-serif;
  display: flex;
  align-items: center;
  // font-weight: bold;
}

#clock span:not(.group) {
  font-size: px2Rem(24px);
}

#clock .num {
  position: relative;
  display: inline-block;
  margin-right: px2Rem(6px);
  padding: px2Rem(10px) px2Rem(6px);
  border-radius: 4px;
  color: #fff;
  box-shadow: 1px 1px 1px #555;
  background-color: #333;
}

#clock .num:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  //height: 1px;
  background-color: rgb(248, 248, 248);
}

#clock b {
  color: #333;
  font-size: px2Rem(36px);
  // margin-right: px2Rem(10px);
}

.buttons {
  margin: 20px 0 10px 0;
}

.btn {
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #000;
  border-radius: 2px;
  cursor: pointer;
  color: #dedede;
  background-color: #333;
}

.btn[disabled] {
  opacity: .5;
}

</style>


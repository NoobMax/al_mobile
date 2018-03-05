<template>
  <div class="record-detailt__wrapper">
    <detail-item  :is-settled="isSettled" v-for="(item, index) in data" :current="item" :key="index" />
  </div>
</template>
<script>
import detailItem from '@/components/BetRecord/detail-item'
import api from '@/api'
import {Divider} from 'vux'
export default {
  components: {
    detailItem,
    Divider
  },
  data () {
    return {
      isSettled: true,
      data: []
    }
  },
  methods: {
    fetchData (params) {
      api.getBetslipDetail(params).then(data => {
        if (data.status === 200) {
          this.data = data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchUnsetData (params) {
      api.getBetslipUnsettled(params).then(data => {
        if (data.status === 200) {
          this.data = data.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    const {status} = this.$route.query
    this.isSettled = status === 'set'
    if (this.isSettled) {
      this.fetchData(this.$route.params)
    } else {
      this.fetchUnsetData(this.$route.query)
    }
  }
}
</script>


import {menuList} from '@/config/home.config'
import numeral from 'numeral'
import _ from 'lodash'
export default {
  computed: {
    setRebate () {
      const {current} = this
      return numeral(current.rebate).format('+0,0.00')
    },
    // 输赢
    setResults () {
      const {current} = this
      return numeral(current.results).format('+0,0.00')
    },
    // 可赢
    setBetslipAmt () {
      const {current} = this
      return numeral(current.betslip_amt).format('+0,0.00')
    },
    // 总注额
    setAmount () {
      const {current} = this
      return numeral(current.amount).format('0,0.00')
    },
    // 设置标题样式
    setTitleClass () {
      if (this.isSettled) {
        if (this.current.results < 0) {
          return 'is-low'
        }
        return 'is-win'
      }
      return 'is-unsettled'
    },
    setTitle () {
      return this.isSettled ? numeral(this.current.results).format('+0,0.00') : '未结'
    },
    setImg () {
      if (this.$route.query.lottery_class && Number(this.$route.query.lottery_class) !== 0) {
        const current = _.find(menuList, item => item.id === Number(this.$route.query.lottery_class))
        return current ? current.smImg : ''
      }
      return this.isSettled ? require('../../assets/images/home/all_se.png') : require('../../assets/images/home/all_un.png')
    }
  }
}

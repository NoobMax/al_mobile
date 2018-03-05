import Vue from 'vue'
import User from './module/user'
import BetArea from './module/betArea'
import Golbal from './module/global'
import Money from './module/money'
import Banks from './module/banks'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
const Debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    User,
    BetArea,
    Golbal,
    Money,
    Banks
  },
  strict: Debug,
  plugins: Debug ? [createLogger()] : []
})

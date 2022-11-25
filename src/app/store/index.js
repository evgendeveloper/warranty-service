import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

import chess from './chess'

Vue.use(Vuex)

export default new Vuex.Store({
  state, getters, actions, mutations,
  modules: {
    chess,
  },
  strict: process.env.NODE_ENV !== 'production',
})

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import filing from './modules/filing'
import account from './modules/account'
import contract from './modules/contract'
import stores from './modules/store'
import area from './modules/area'
import inspects from './modules/inspects'
import system from './modules/system'
import commonData from './modules/commonData'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    filing,
    account,
    stores,
    area,
    inspects,
    system,
    contract,
    commonData,
  },
  getters
})

export default store

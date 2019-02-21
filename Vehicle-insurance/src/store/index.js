import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import commonData from './modules/commonData'
import order from './modules/order'
import car from './modules/car'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    commonData,
    order,
    car
  },
  getters
})

export default store

import * as service from '@/api/commonData'
import { recordStatus, merchantType } from '@/utils/statusCode'
import { formatToTree, formatTomMnueTree, formatAreasTree } from '@/utils/tool'
import { getToken, setToken, removeToken } from '@/utils/auth'


const commonData = {
  state: {
    dataPermissions: [],
    tuancheStup:0
  },

  mutations: {
    SET_DATA_PERMISSIONS: (state, dataPermissions) => {
      state.dataPermissions = dataPermissions
    },
    SET_TUANCHESTUP: (state, tuancheStup) => {
      state.tuancheStup = tuancheStup
    },
  },

  actions: {
    GetPermissions({ commit }, userId) {
      return new Promise((resolve, reject) => {
        service.dataPermissions(userId).then(response => {
          commit('SET_DATA_PERMISSIONS', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetTuancheStup({ commit }, tuancheStup) {
      commit('SET_TUANCHESTUP', tuancheStup)
    },
    GetImgToken({ commit }) {
      return new Promise((resolve, reject) => {
        service.getImgToken().then(response => {
          commit('SET_DATA_PERMISSIONS', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default commonData

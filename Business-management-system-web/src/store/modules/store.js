import * as service from '@/api/store'
const store = {
  state: {
    storesRelation:[],
    signed:[],
    reports:{}
  },
  mutations: {
    SET_STORE_RELATION_LIST: (state, storesRelation) => {
      state.storesRelation = storesRelation
    },
    SET_STORE_SIGNED: (state, signed) => {
      state.signed = signed
    },
    SET_STORE_REPORTS: (state, reports) => {
      state.reports = reports
    }
  },

  actions: {
    SetStoreList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getStoreList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ChangeSigns({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.changeSigns(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    StoreDetails({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.storeDetails(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    StoreRelationList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getStoreRelationList(param).then(response => {
          commit('SET_STORE_RELATION_LIST', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    StoreSigned({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.storeSigned(param).then(response => {
          commit('SET_STORE_SIGNED', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddStoreRalation({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addStoreRalation(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRalationList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getRalationList(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyStoreRatation({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyStoreRatation(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteRatation({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.deleteRatation(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetReports({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getReports(param).then(response => {
          commit('SET_STORE_REPORTS', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default store

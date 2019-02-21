import * as service from '@/api/contract'
const filing = {
  state: {
  },

  mutations: {
  },

  actions: {
    SetContract({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.contractList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ContractTidy({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.contractTidy(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ContractDiely({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.contractDiely(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ChangeStatus({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.changeStatus(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default filing

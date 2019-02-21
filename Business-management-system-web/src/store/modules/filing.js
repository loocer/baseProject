import * as service from '@/api/filing'
const filing = {
  state: {
  },

  mutations: {
  },

  actions: {
    SetRecord({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.setFilingList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ToFiling({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.toFiling(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FiledList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.filedList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Lists({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.Lists(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ToFilingAgain({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.toFilingAgain(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default filing

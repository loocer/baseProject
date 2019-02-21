import * as service from '@/api/area'
const area = {
  state: {
  },

  mutations: {
  },

  actions: {
    GetAreaList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getAreaList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddArea({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addArea(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DleteArssea({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.deleteArssea(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyArssea({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyArssea(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetArea({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getArea(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default area

 

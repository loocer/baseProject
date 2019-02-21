import * as service from '@/api/inspects'
const inspects = {
  state: {
  },

  mutations: {
  },

  actions: {
    SetInspects({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getInspectsList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default inspects

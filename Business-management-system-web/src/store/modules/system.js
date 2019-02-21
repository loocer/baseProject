import * as service from '@/api/system'
const system = {
  state: {
    roleList: [],
  },

  mutations: {
    SET_ROLE_LIST: (state, roleList) => {
      state.roleList = roleList
    },
  },

  actions: {
    SetRouter({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getRouterList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetRolesTree({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getRolesList(param).then(response => {
          commit('SET_ROLE_LIST', response.data.list)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetRoles({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getRolesList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addRouter({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addRouter(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRouter({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getRouter(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyRouter({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyRouter(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteRouter({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.deleteRouter(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteRoles({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.deleteRoles(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddRoles({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addRoles(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default system

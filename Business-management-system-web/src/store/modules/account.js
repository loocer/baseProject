import * as service from '@/api/account'
const filing = {
  state: {
  },

  mutations: {
  },

  actions: {
    SetAccount({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.accountList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserList({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.userList(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddAccountBase({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addAccountBase(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addAccount({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.addAccount(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAccountConfig({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getAccountConfig(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyAccountConfig({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyAccountConfig(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserDilel({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.getUserDilel(param).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ModifyUser({ commit }, param) {
      return new Promise((resolve, reject) => {
        service.modifyUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}
export default filing
